/**
 * В классе Promise есть 6 статических методов.
 *    1. Promise.all(promises) – ожидает выполнения всех промисов, и возвращает массив с результатами.
 *       Если любой из указанных промисов вернёт ошибку, то результатом работы Promise.all будет эта ошибка, результаты остальных промисов будут игнорироваться.
 *       Если один из промисов отклоняется, Promise.all() также отклоняется со значением отклоненного промиса.
 *
 *    2. Promise.allSettled(promises) (добавлен недавно) – ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
*         status: "fulfilled", если выполнен успешно или "rejected", если ошибка,
*         value – результат, если успешно или reason – ошибка, если нет.
 *
 *    3. Promise.race(promises) – ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.
 *
 *    4. Promise.any(promises) (добавлен недавно) – ожидает ПЕРВЫЙ УСПЕШНО выполненный промис, который становится его результатом, остальные игнорируются. Если все переданные промисы отклонены, AggregateError становится ошибкой Promise.any.
 *
 *    5. Promise.resolve(value) – возвращает успешно выполнившийся промис с результатом value.
 *
 *    6. Promise.reject(error) – возвращает промис с ошибкой error
 */

/**
 * Promise.all
 * Принимает массив промисов (может принимать любой перебираемый объект, но обычно используется массив) и возвращает новый промис.
 * Очередность результатов в массиве определяется порядком объявления промисов
 * Если любой промис в `Promise.all()` завершится ошибкой, то Promise.all() завершится с этой ошибкой.
 */
{
    Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
        new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
        new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
    ]).then(alert); // когда все промисы выполнятся, результат будет 1,2,3

    //  Promise.all(iterable) разрешает передавать не-промисы в iterable (перебираемом объекте)
    {
        Promise.all([
            new Promise((resolve, reject) => {
                setTimeout(() => resolve(1), 1000)
            }),
            2,
            3
        ]).then(alert); // 1, 2, 3
    }
}

/**
 * Promise.allSettled
 * Синтаксис: let promise = Promise.allSettled(iterable)
 * Метод Promise.allSettled всегда ждёт завершения всех промисов. В массиве результатов будет
 *       { status:"fulfilled", value:результат } для успешных завершений,
 *       { status:"rejected", reason:ошибка } для ошибок.
 * catch использовать бесмыссленно!
 */
{
    Promise.allSettled([
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Error!'), 1000));
        }),
        new Promise(resolve => {
            setTimeout(() => resolve('good'), 2000);
        }),
        1,
    ]).then(console.log);   // Output:  [ { "status": "rejected", "reason": Error }, { "status": "fulfilled", "value": "good" }, { "status": "fulfilled", "value": 1 } ]
}

/**
 * Promise.race
 * Ждёт только первый выполненный промис, из которого берёт результат (или ошибку).
 * Синтаксис: let promise = Promise.race(iterable);
 */
{
    Promise.race([
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 1000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).then(console.log).catch(console.log); // Error: Ошибка!
}

/**
 * Promise.any
 * Ждёт только первый успешно выполненный промис, из которого берёт результат.
 * Если ни один из переданных промисов не завершится успешно, тогда возвращённый объект Promise будет отклонён с помощью AggregateError
 */
{
    Promise.any([
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 1000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).then(alert); // Output: 1

    // Пример AgreagationError
    Promise.any([
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ещё одна ошибка!")), 2000))
    ]).catch(error => {
        console.log(error.constructor.name); // AggregateError
        console.log(error.errors[0]); // Error: Ошибка!
        console.log(error.errors[1]); // Error: Ещё одна ошибка!
    });
}

/**
 * Promise.resolve
 * Promise.resolve(value) создаёт успешно выполненный промис с результатом value.
 * Можно использовать для кеширования
 */
{
    let cache = new Map();

    function loadCached(url) {
        if (cache.has(url)) {
            return Promise.resolve(cache.get(url)); //
        }
        return fetch(url)
            .then(response => response.text())
            .then(text => {
                cache.set(url,text);
                return text;
            });
    }
    loadCached('').then(console.log)
}

/**
 * Promise.reject
 * Promise.reject(error) создаёт промис, завершённый с ошибкой error.
 */