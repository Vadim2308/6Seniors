/**
 * Метод fetch позволяет отслеживать процесс (!) получения данных.
 * Способов отслеживать процесс отправки данных нет, для этого надо юзать XMLHttpRequest
 */

/**
 * Чтобы отслеживать ход загрузки данных с сервера, можно использовать свойство response.body
 * Это ReadableStream – особый объект, который предоставляет тело ответа по частям, по мере его поступления.
 * Также он позволяет подсчитать какое количество данных получено в каждый момент
 */
{
    // вместо response.json() и других методов
    const reader = response.body.getReader();
    // бесконечный цикл, пока идёт загрузка
    while(true) {
        // done становится true в последнем фрагменте
        // value - Uint8Array из байтов каждого фрагмента
        const {done, value} = await reader.read();
        if (done) {
            break;
        }
        console.log(`Получено ${value.length} байт`)
    }
}

// Более полный пример

{
    // Шаг 1: начинаем загрузку fetch, получаем поток для чтения
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');
    const reader = response.body.getReader();

    // Шаг 2: получаем длину содержимого ответа
    const contentLength = +response.headers.get('Content-Length');

    // Шаг 3: считываем данные:
    let receivedLength = 0; // количество байт, полученных на данный момент
    let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
    while(true) {
        const {done, value} = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
        receivedLength += value.length;
        console.log(`Получено ${receivedLength} из ${contentLength}`)
    }

    // Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // Cоздаем типизированный массив той же длины
    let position = 0;
    for(let chunk of chunks) {
        chunksAll.set(chunk, position); // Используем .set(chunk, position) для копирования каждого фрагмента друг за другом в него.
        position += chunk.length;
    }
    // Шаг 5: декодируем Uint8Array обратно в строку
    let result = new TextDecoder("utf-8").decode(chunksAll);

    // (!) Но если нам нужны данные в бинарном виде, а не в строке, заменаем 4 и 5 на создание блоба
    {
        let blob = new Blob(chunks);
    }

    let commits = JSON.parse(result);
    alert(commits[0].author.login);
}\