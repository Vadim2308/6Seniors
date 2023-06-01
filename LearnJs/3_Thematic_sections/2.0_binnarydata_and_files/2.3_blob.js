/**
 * Blob – тип данных, который предназначается специально для хранения большого количества материалов. Представляет собой «бинарные данные с типом»
 * Сюда относят:музыку;аудиозаписи;картинки;анимацию;
 * Cинтаксис new Blob(blobParts, options);
 * Blob не изменяем (immutable)
 */
{
    // создадим Blob из строки
    let blob = new Blob(["<html lang='en'>…</html>"], {type: 'text/html'});

    // создадим Blob из типизированного массива и строк
    let hello = new Uint8Array([72, 101, 108, 108, 111]); // "hello" в бинарной форме
    let blob2 = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
}

/**
 * Можно получить срез блоба, используя blob.slice([byteStart], [byteEnd], [contentType]);
 */

/**
 * Blob как URL
 */
{
    let link = document.createElement('a');
    link.download = 'hello.txt';
    let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

    link.href = URL.createObjectURL(blob); // берёт Blob и создаёт уникальный URL для него в формате blob:<origin>/<uuid>. blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
    link.click();
    URL.revokeObjectURL(link.href);
}

/**
 * URL.createObjectURL
 * Статический метод URL.createObjectURL() создает строку, содержащую URL-адрес, представляющий объект, указанный в параметре.
 * Браузер для каждого урла, сгенерированного через createObjectURL сохраняет соответствие URL → Blob
 * Сгенерированный url действителен, только пока текущий документ открыт.
 * (!) Пока в карте соответствия существует ссылка на Blob, он находится в памяти. Браузер не может освободить память, занятую Blob-объектом.
 * (!) Ссылка в карте соответствия автоматически удаляется при выгрузке документа, после этого также освобождается память
 */

/**
 * URL.revokeObjectURL(url)
 * URL.revokeObjectURL(url) удаляет внутреннюю ссылку на объект, что позволяет удалить его (если нет другой ссылки) сборщику мусора, и память будет освобождена.
 */

/**
 * Blob to base64
 * Альтернатива URL.createObjectURL – конвертация Blob-объекта в строку с кодировкой base64.
 * base64 - это кодировка которая представляет двоичные данные в виде строки
 * Есть потеря производительности и памяти при декодировании больших Blob-объектов
 * Для трансформации Blob в base64 можно использовать встроенный в браузер объект типа FileReader
 */
{
    let link = document.createElement('a');
    link.download = 'hello.txt';

    let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

    let reader = new FileReader();
    reader.readAsDataURL(blob); // конвертирует Blob в base64 и вызывает onload

    reader.onload = function() {
        link.href = reader.result; // url с данными (data:text/plain;base64,SGVsbG8sIHdvcmxkIQ==)
        link.click();
    };
}

/**
 * Изображение в Blob
 * Мы можем создать Blob для изображения, части изображения или даже создать скриншот страницы. Что удобно для последующей загрузки куда-либо.
 *
 *
 */
{
    // берём любое изображение
    let img = document.querySelector('img');

    // создаём <canvas> того же размера
    let canvas = document.createElement('canvas');
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    let context = canvas.getContext('2d');

    // копируем изображение в  canvas (метод позволяет вырезать часть изображения)
    context.drawImage(img, 0, 0);
    // мы можем вращать изображение при помощи context.rotate() и делать множество других преобразований

    // И например юзер че то порисовал, и решил скачать. Для этого фомрируем блоб. toBlob является асинхронной операцией, для которой callback-функция вызывается при завершении
    canvas.toBlob(function(blob) {
        // после того, как Blob создан, загружаем его
        let link = document.createElement('a');
        link.download = 'example.png';

        link.href = URL.createObjectURL(blob);
        link.click();

        // удаляем внутреннюю ссылку на Blob, что позволит браузеру очистить память
        URL.revokeObjectURL(link.href);
    }, 'image/png');

    // (!) Но можно использовать async/await вместо колбека
    let blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
}