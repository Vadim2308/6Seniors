/**
 * Объект File наследуется от объекта Blob и обладает возможностями по взаимодействию с файловой системой.
 * File просто интерфейс для итема в input.files
 * Можно также самому создать File через: new File(fileParts, fileName, [options])
 *      fileName - имя файла
 *      options - необязательный объект со свойством lastModified – дата последнего изменения в формате таймстамп (целое число).
 *
 * Чаще всего мы получаем файл из <input type="file"> или через перетаскивание с помощью мыши, или из других интерфейсов браузера
 */
{
    // <input type="file" onChange="showFile(this)">
    //
    //     <script>
            function showFile(input) {
            let file = input.files[0]; // input.files – псевдомассив выбранных файлов. Здесь у нас только один файл, поэтому мы просто берём input.files[0].

            alert(`File name: ${file.name}`); // например, my.png
            alert(`Last modified: ${file.lastModified}`); // например, 1552830408824

            const fileURL = URL.createObjectURL(file);
            console.log('Ссылка на файл:', fileURL);
        }
    //     </script>
}

/**
 * FileReader - объект, цель которого читать данные из Blob (и, следовательно, из File тоже).
 * (!) Однако, во многих случаях нам не нужно читать содержимое файла. Как и в случае с Blob, мы можем создать короткий URL с помощью URL.createObjectURL(file) и использовать его в теге <a> или <img>
 * Данные передаются при помощи событий, так как чтение с диска может занять время.
 * let reader = new FileReader(); // без аргументов
 * у reader есть много методов, таких как считать как строку, как base64, навесить обработчики на процесс ошибку и т.д. Глянуть методы в доке learnjs
 *  Основной метод: reader.readAsDataURL – когда мы хотим использовать данные в src для img или другого тега. Есть альтернатива – можно не читать файл, а вызвать URL.createObjectURL(file)
 */
{
    // <input type="file" onChange="readFile(this)">

        // <script>
            function readFile(input) {
            let file = input.files[0];

            let reader = new FileReader();

            reader.readAsText(file); // считать данные как строку (кодировка по умолчанию: utf-8) альтернатива TextDecoder

            reader.onload = function() {
            console.log(reader.result);
            };

            reader.onerror = function() {
            console.log(reader.error);
            };
        }
        // </script>
}

// Для Web Worker также доступен FileReaderSync