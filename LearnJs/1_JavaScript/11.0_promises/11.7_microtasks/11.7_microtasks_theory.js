/**
 * Обработчики .then/.catch/.finally всегда асинхронны.
 * Если цепочка (then/catch/finally) - то каждый ставится в очередь, а потом выполняется после текущего кода
 */
{
    let promise = Promise.resolve();
    promise.then(() => alert("промис выполнен")).then(() => alert("промис выполнен 2"));
    alert("код выполнен"); // этот alert показывается первым. Потом "промис выполнен" "промис выполнен 2"
}

/**
 *  microtask queue
 *  Стандарт предусматривает внутреннюю очередь PromiseJobs, более известную как 'очередь микрозадач'
 *
 *  Очередь определяется как первым-пришёл-первым-ушёл (FIFO)
 *  Выполнение задачи происходит только в том случае, если ничего больше не запущено. (Стек пустой)
 */

/**
 * Необработанные ошибки
 * "Необработанная ошибка" возникает в случае, если ошибка промиса не обрабатывается в конце очереди микрозадач.
 */
{
    let promise = Promise.reject(new Error("Ошибка в промисе!"));
    promise.catch(err => alert('поймана!')); // Но если мы забудем добавить .catch, то, когда очередь микрозадач опустеет, движок сгенерирует событие

   // не запустится, ошибка обработана
    window.addEventListener('unhandledrejection', event => {
        alert(event.reason);
    });
}

/**
 * Event-loop не является часть движка. Он предоставляется средой. (браузерной или NodeJS)
 * Устройство Event-loop может быть разным
 *
 */

// micro tasks
Promise.resolve()
await sleep()
queueMicrotask(()=>{})
MutationObserver
IntersectionObserver

process.nextTick // для NodeJs

//macro tasks
window.addEventListener()
setInterval()
setTimeout()
MessageChannel //  интерфейс, который позволяет установить двухстороннюю связь для передачи сообщений между двумя окнами или воркерами (worker'ами) веб-приложения. О
