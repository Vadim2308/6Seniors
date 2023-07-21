/**
 * Promise - это объект(обещание), на который можно подписаться для получения результатов, когда они станут доступны.
 * Объект Promise используется для отложенных и асинхронных вычислений.
 */


/**
 * Синтаксис создания Promise
 * Функция, переданная в конструктор промиса - executor
 * Его аргументы - resolve и reject
 *     resolve(value) — если работа завершилась успешно, с результатом value.
 *     reject(error) — если произошла ошибка, error – объект ошибки.
 *
 */
{
    let promise = new Promise(function(resolve, reject) {
        // функция-исполнитель (executor)
    });
}

/**
 *  Объект Promise.
 *   У объекта promise, (!)возвращаемого конструктором new Promise, есть внутренние свойства:
 *   state - вначале "pending" («ожидание»), потом меняется на "fulfilled" («выполнено успешно») при вызове resolve или на "rejected" («выполнено с ошибкой»)
 *   result («результат») — вначале undefined, далее изменяется на value при вызове resolve(value) или на error при вызове reject(error).
 *
 *   Первоначальное значение
 *   {
 *     [[Prototype]]:Promise
 *     [[PromiseState]]: 'pending'
 *     [[PromiseResult]]: undefined
 *   }
 */
{

    let promise = new Promise(function(resolve, reject) {
        // эта функция выполнится автоматически, при вызове new Promise
        // ОНА СИНХРОННАЯ!
        // через 1 секунду сигнализировать, что задача выполнена с результатом "done"
        setTimeout(() => resolve("done"), 1000);

        // можно сразу зарезолвить промис, никаких проблем с этим нет
        resolve(3)

        /**
         * Или reject
         * setTimeout(() => reject(new Error("Whoops!")), 1000);
         */
    });
}
/**
 *  Вызывать надо что-то одно, состояние промиса может быть изменено только (!) 1 раз. Все последующие вызовы resolve/reject будут проигнорированы
 */

{
    let promise = new Promise(function (resolve, reject) {
        resolve("done");
        reject(new Error("…")); // игнорируется
        setTimeout(() => resolve("…")); // игнорируется
    });
}

/**
 * Свойства state и result – это внутренние свойства объекта Promise и мы не имеем к ним прямого доступа.
 * Для обработки результата следует использовать методы .then/.catch/.finally
 */

/**
 * then
 * Первый аргумент метода .then – функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат.
 * Второй аргумент .then – функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку.
 * (!)
 * Все, что возвращает метод then при выполнении промиса в JavaScript, оборачивается в новый промис.
 * Это происходит для того, чтобы можно было последовательно выполнять цепочки промисов и обрабатывать результаты выполнения каждого из них.
 * Если метод then возвращает какое-то значение, то оно оборачивается в промис с состоянием "resolved".
 * Если при выполнении метода then происходит ошибка, то она оборачивается в промис с состоянием "rejected".
 */

{
    const promise = new Promise(()=>{})
    // синтаксис
    promise.then(
        function(result) { /* обработает успешное выполнение */ },
        function(error) { /* обработает ошибку */ }
    );

    {
        let promise = new Promise(function(resolve, reject) {
            setTimeout(() => resolve("done!"), 1000);
        });

        // resolve запустит первую функцию, переданную в .then
        promise.then(
            result => console.log(result), // выведет "done!" через одну секунду
            error => console.log(error) // не будет запущена
        );
    }
    // Если нам не нужно обрабатывать ошибки, то можем просто передать 1 функцию
    // promise.then(console.log); // выведет "done!" спустя одну секунду
    {
        let promise = new Promise(function(resolve, reject) {
            setTimeout(() => reject(new Error("Whoops!")), 1000);
        });
        // reject запустит вторую функцию, переданную в .then
        promise.then(
            result => console.log(result), // не будет запущена
            error => console.log(error) // выведет "Error: Whoops!" спустя одну секунду
        );
    }
}
/**
 * catch
 * Если бы хотели обработать только ошибку, можно пропустить первый аргумент .then(null, errorHandlingFunction)
 * Или можно воспользоваться методом .catch(errorHandlingFunction), который сделает то же самое:
 */
{
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Ошибка!")), 1000);
    });

   // .catch(f) это то же самое, что promise.then(null, f)
    promise.catch(console.log); // выведет "Error: Ошибка!" спустя одну секунду
}

/**
 * finally
 * Идея finally состоит в том, чтобы настроить обработчик для выполнения очистки/доведения после завершения предыдущих операций. (остановка индикаторов загрузки, закрытие больше не нужных соединений и т.д.)
 */
{
    new Promise((resolve, reject) => {resolve('data')})
        .finally(() => console.log('stop loading'))
        .then(console.log, console.error)
        // Output: "stop loading, data"
        // (!) Если бы мы поменяли местами finally и then, то результат был бы: "data, stop loading"

    // finally не имеет аргументов, и "пропускает" результат или ошибку дальше, к следующим обработчикам
    // finally также не должен ничего возвращать. Возвращаемое значение игнорируется
    {
        new Promise((resolve, reject) => {
            setTimeout(() => resolve("value"), 2000);
        })
            .finally(() => console.log("Промис завершён")) // срабатывает первым
            .then(result => console.log(result)); // <-- .then показывает "value"

        // ---------------------- //
        new Promise((resolve, reject) => {
            throw new Error("error"); // (!) <== можно выкидывать ошибку, без использования reject
        })
        .finally(() => console.log("Промис завершён")) // срабатывает первым
        .catch(err => console.log(err));  // <-- .catch показывает ошибку

        // ---------------------- //
        Promise.resolve()
        .finally(()=>{ throw 1 })
        .then(()=>console.log(2)) // не сработает
        .catch(()=>console.log(4)) // 4
}

/**
 * На завершенных промисах обработчики запускаются сразу (после синхронного кода)
 */
{
    console.log('1')
    let promise = new Promise(resolve => resolve("готово!"));
    promise.then(console.log);
    console.log('2')
    console.log('3')
    // Output: 1 2 3 готово!
}

/**
 * Подписываться на состояние промиса уже можно после того, как он поменял свой статус, например
 */
{
    const promise = new Promise((resolve)=>{
        setTimeout(resolve,100)
    })

    setTimeout(()=>{
        promise.then(()=>console.log('fromThen')) // Вызовется без проблем fromThen
        setTimeout(()=>{
            promise.then(()=>console.log('fromThen2')) // Вызовется без проблем fromThen 2
        },2000)
    },2000)
}

/**
 * Неявный try{...}catch{...}
 * (!) Тело функции, внутри промиса, а также внутри then имеет обертку в виде try catch
 * Если там происходит ошибка, мы попадаем в catch()
 */
{
    const promise = new Promise(resolve=>{
        // создаст неявно try{...}catch{...}
        variabke
    })
    promise.then(console.log).catch(console.error) // Попало в catch. ReferenceError: variabke is not defined

    promise.then(result=>{
        asdasd // Также будет обертка try{...}catch{...}
    }).catch(console.error) // Ошибка выше попадет сюда
}

/**
 * Пример: loadScript
 */
{
    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

            document.head.append(script);
        });
    }
    let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

    promise.then(
        script => console.log(`${script.src} загружен!`),
        error => console.log(`Ошибка: ${error.message}`)
    );
    promise.then(script => console.log('Ещё один обработчик...')); // Мы можем вызывать .then у Promise столько раз, сколько захотим
    promise.then(script => console.log('И еще один обработчик...')); // Мы можем вызывать .then у Promise столько раз, сколько захотим
}