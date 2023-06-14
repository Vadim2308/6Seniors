/**
 * Для отмены запроса мы можем использовать AbortController
 */
{
    let controller = new AbortController();
    let signal = controller.signal;

    // срабатывает при вызове controller.abort()
    signal.addEventListener('abort', () => console.log("отмена!"));

    controller.abort(); // отмена!

    alert(signal.aborted); // true
}

// Добавление AbortController в fetch
{
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    try {
        let response = await fetch('/article/fetch-abort/demo/hang', {
            signal: controller.signal
        });
    } catch(err) {
        if (err.name == 'AbortError') { // обработать ошибку от вызова abort()
            alert("Прервано!");
        } else {
            throw err;
        }
    }
}

/**
 * AbortController – масштабируемый, он позволяет отменить несколько вызовов fetch одновременно.
 */
{
    let urls = []; // список URL для параллельных fetch

    let controller = new AbortController();

    let fetchJobs = urls.map(url => fetch(url, {
        signal: controller.signal
    }));
    let results = await Promise.all(fetchJobs);
    // если откуда-то вызвать controller.abort() то это прервёт все вызовы fetch
}
// Также eсли у нас есть собственные асинхронные задачи, отличные от fetch, мы можем использовать один AbortController для их остановки вместе с fetch.
{
    let urls = [];
    let controller = new AbortController();

    let ourJob = new Promise((resolve, reject) => { // наша задача
        controller.signal.addEventListener('abort', reject);
    });

    let fetchJobs = urls.map(url => fetch(url, { // запросы fetch
        signal: controller.signal
    }));

    // ожидать выполнения нашей задачи и всех запросов
    let results = await Promise.all([...fetchJobs, ourJob]);

   // вызов откуда-нибудь ещё controller.abort() прервёт все вызовы fetch и наши задачи
}