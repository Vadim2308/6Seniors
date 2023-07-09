/**
 * Возобновляемая загрузка файлов
 * Позволяет возобновить загрузку, если прервалось соединение, пользователь сам нажал на паузу и т.д.
 */

// Алгоритм
{
    const file = new File(
        [new Blob(['Hello, world!'], { type: 'text/plain' })],
        'file.txt',
        { lastModified: new Date().getTime() }
    );

    /**
     *     1. Создадим уникальный идентификатор для файла, который собираемся загружать
     *     Это нужно, чтобы при возобновлении загрузки серверу было понятно, какой файл мы продолжаем загружать.
     *     Если имя или размер или дата модификация файла изменятся, то у него уже будет другой fileId.
     */

    let fileId = file.name + '-' + file.size + '-' + +file.lastModified; // 'file.txt-13-1688651187709'

    /**
     * 2. Далее, посылаем запрос к серверу с просьбой указать количество уже полученных байтов
     */

    let response = await fetch('/status', { // Должен быть урл, умеющий обрабатывать запросы на получение статуса
        headers: {
            'X-File-Id': fileId // кастомный заголовок 'X-File-Id', может быть любым.
        }
    });
    // сервер получил столько-то байтов
    let startByte = await response.text();

    /**
     * 3. Затем мы можем использовать метод slice объекта Blob, чтобы отправить данные, начиная со startByte байта
     */

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");

    // Идентификатор файла, чтобы сервер знал, что мы загружаем
    xhr.setRequestHeader('X-File-Id', fileId);

    // Номер байта, начиная с которого мы будем отправлять данные.
    // Таким образом, сервер поймёт, с какого момента мы возобновляем загрузку
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
        console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // файл file может быть взят из input.files[0] или другого источника
    xhr.send(file.slice(+startByte));
}

// Полный пример
{
    class Uploader {

        constructor({file, onProgress}) {
            this.file = file;
            this.onProgress = onProgress;

            // создаём уникальный идентификатор файла
            // для большей уникальности мы также могли бы добавить идентификатор пользовательской сессии (если она есть)
            this.fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
        }

        async getUploadedBytes() {
            let response = await fetch('status', {
                headers: {
                    'X-File-Id': this.fileId
                }
            });

            if (response.status !== 200) {
                throw new Error("Can't get uploaded bytes: " + response.statusText);
            }

            let text = await response.text();

            return +text;
        }

        async upload() {
            this.startByte = await this.getUploadedBytes();

            let xhr = this.xhr = new XMLHttpRequest();
            xhr.open("POST", "upload", true);

            // Идентификатор файла, чтобы сервер знал, что мы загружаем
            xhr.setRequestHeader('X-File-Id', this.fileId);

            // Номер байта, начиная с которого мы будем отправлять данные.
            // Таким образом, сервер поймёт, с какого момента мы возобновляем загрузку
            xhr.setRequestHeader('X-Start-Byte', this.startByte);

            xhr.upload.onprogress = (e) => {
                this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
            };

            console.log("send the file, starting from", this.startByte);
            xhr.send(this.file.slice(this.startByte));

            // возвращаем
            //   true, если загрузка успешно завершилась
            //   false, если она отменена
            // выбрасываем исключение в случае ошибки
            return await new Promise((resolve, reject) => {

                xhr.onload = xhr.onerror = () => {
                    console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);

                    if (xhr.status === 200) {
                        resolve(true);
                    } else {
                        reject(new Error("Upload failed: " + xhr.statusText));
                    }
                };

                // этот обработчик срабатывает, только когда вызывается xhr.abort()
                xhr.onabort = () => resolve(false);

            });

        }

        stop() {
            if (this.xhr) {
                this.xhr.abort();
            }
        }

    }
}

// Переписанный uploader на axios
const axios = require('axios');

class Uploader {
    constructor({ file, onProgress }) {
        this.file = file;
        this.onProgress = onProgress;

        // создаём уникальный идентификатор файла
        // для большей уникальности мы также могли бы добавить идентификатор пользовательской сессии (если она есть)
        this.fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    }

    async getUploadedBytes() {
        try {
            const response = await axios.get('status', {
                headers: {
                    'X-File-Id': this.fileId
                }
            });

            return +response.data;
        } catch (error) {
            throw new Error("Can't get uploaded bytes: " + error.message);
        }
    }

    async upload() {
        this.startByte = await this.getUploadedBytes();

        const config = {
            headers: {
                'X-File-Id': this.fileId,
                'X-Start-Byte': this.startByte
            },
            onUploadProgress: (progressEvent) => {
                const loaded = this.startByte + progressEvent.loaded;
                const total = this.startByte + progressEvent.total;
                this.onProgress(loaded, total);
            }
        };

        console.log("send the file, starting from", this.startByte);
        const slice = this.file.slice(this.startByte);
        try {
            await axios.post('upload', slice, config);
            console.log('Upload completed successfully');
            return true;
        } catch (error) {
            console.error('Upload failed:', error.message);
            throw new Error('Upload failed: ' + error.message);
        }
    }

    stop() {
        // Cюда добавить signal
    }
}

const uploader = new Uploader({
    file: document.getElementById('fileInput').files[0],
    onProgress: (loaded, total) => {
        const progress = Math.round((loaded / total) * 100);
        console.log('Upload progress:', progress + '%');
    }
});

uploader.upload()
    .then(() => {
        console.log('Upload completed!');
    })
    .catch((error) => {
        console.error('Upload failed:', error.message);
    });