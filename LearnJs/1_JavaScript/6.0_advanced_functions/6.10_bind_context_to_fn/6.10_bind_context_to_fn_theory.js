/**
 * Потеря «this» главная причина привязки конкретного контекста
 * setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции типа FD
 */
{
    let user = {
        firstName: "Вася",
        sayHi() {
            alert(`Привет, ${this.firstName}!`);
        }
    };
    setTimeout(user.sayHi, 1000); // Привет, undefined!
    /**
     * let f = user.sayHi;
     * setTimeout(f, 1000); // контекст user потеряли
     */

    /*
       Решение 1
       user достаётся из замыкания, а затем вызывается его метод sayHi.
       Но проблема в том, что если метод sayHi изменится до выполнения cb, то мы получим другой результат
     */
    {
        setTimeout(function() {
            user.sayHi(); // Привет, Вася!
        }, 1000);
        // Или через стрелку (аналогично)
        setTimeout(() => user.sayHi(), 1000); // Привет, Вася!
    }

    /**
     * Решение 2
     * Привязка с помощью bind.
     * Результатом вызова func.bind(context) является особый «экзотический объект» (термин взят из спецификации), который вызывается как функция и прозрачно передаёт вызов в func, при этом устанавливая this=context.
     */
    {
        let user = {
            firstName: "Вася"
        };

        function func(phrase) {
            alert(phrase + ', ' + this.firstName);
        }

        // привязка this к user
        let funcUser = func.bind(user);
        funcUser("Привет"); // Привет, Вася (аргумент "Привет" передан, при этом this = user)
    }
}

/**
 * Привязка аргументов
 */
{
    function mul(a, b) {
        return a * b;
    }
    let double = mul.bind(null, 2);
    alert( double(3) ); // = mul(2, 3) = 6

    // --------------------------------------------------- //

    function partial(func, ...argsBound) {
        return function(...args) {
            return func.call(this, ...argsBound, ...args);
        }
    }

    let user = {
        firstName: "John",
        say(name, phrase) {
            console.log(`${name}-${phrase}`)
        }
    };

    user.sayNow = partial(user.say, "Vadim");

    user.sayNow("Hello"); // Vadim-Hello
}


/**
 * Пример стрелки и таймаута
 */
{
    function d (){
        setTimeout(()=>{
            console.log(this.srn) // Выведется 1, т.к. контекст в стрелке биндится на момент создания. Была б FD => было б undefined
        },1e3)
    }
    d.call({srn:`1`})
}