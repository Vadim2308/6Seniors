/**
 * async/await - более удобной способ работы над промисами.
 * Асинхронная функция всегда возвращает промис
 * Возвращаемое значение оборачивается в зарезовленный промис
 */
{
    async function f() {
        return 1; // || Promise.resolve(1);
    }
    f().then(alert); // 1
}

/**
 * await
 * await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится.
 * После чего оно вернёт его результат, и выполнение кода продолжится.
 * это просто «синтаксический сахар» для получения результата промиса, более наглядный, чем promise.then.
 *
 * (!) await нельзя использовать в обычных функциях (SyntaxError)
 */
{
    async function f() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("готово!"), 1000)
        });

        let result = await promise; // будет ждать, пока промис не выполнится

        alert(result); // "готово!"
    }
    f();
    // (!) await нельзя использовать на верхнем уровне вложенности
    // Можно обернутькод в анонимную async–функцию, тогда всё заработает
    {
        (async () => {
            let response = await fetch('/article/promise-chaining/user.json');
            let user = await response.json();
        })();
    }
}

/**
 * await и thenable объекты.
 * Если у объекта можно вызвать метод then, то можно использовать с await
 */
{
    const obj = {
        name: 'Vadim',
        then(resolve) {
            setTimeout(() => {
                resolve(this.name)
            }, 1e3)
        }
    };

    (async () => {
        const res = await obj;
        console.log(res); // спустя 1 секунды выведет Vadim
    })()
}

/**
 * Асинхронные методы классов
 * (!) Функции конструкторы и геттеры/сеттеры не могут быть асинхронными
 */
{
    class Waiter {
        async wait() {
            return 1;
        }
    }
    new Waiter()
        .wait()
        .then(alert); // 1
}

/**
 * Обработка ошибок
 * Когда промис с ошибкой – будет выброшено исключение. Как если бы на этом месте находилось выражение throw.
 */
{
    async function f() {
        await Promise.reject(new Error("Упс!")); // аналогично throw new Error("Упс!");
    }
}
{
    // Перехват ошибок в асинхронной функции через try catch
    async function f() {
        try {
            let response = await fetch('/no-user-here');
            let user = await response.json();
        } catch(err) {
            // перехватит любую ошибку в блоке try: и в fetch, и в response.json
            alert(err);
        }
    }
    f();

    // если нет try catch можно использовать catch промиса
    {
        async function f() {
            let response = await fetch('http://no-such-url');
        }
        f().catch(alert); // TypeError: failed to fetch // (*)
    }
}

// await && Promise.all
{
    let results = await Promise.all([
        fetch(url1),
        fetch(url2),
    ]);
}