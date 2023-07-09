/**
 * декоратор - специальная функция, которая принимает другую функцию и изменяет её поведение. (Фу́нкция вы́сшего поря́дка)
 */
{
    function slow(x) {
        // здесь могут быть ресурсоёмкие вычисления
        alert(`Called with ${x}`);
        return x;
    }

    function cachingDecorator(func) {
        let cache = new Map();

        return function(x) {
            if (cache.has(x)) {    // если кеш содержит такой x,
                return cache.get(x); // читаем из него результат
            }
            let result = func(x); // иначе, вызываем функцию
            cache.set(x, result); // и кешируем (запоминаем) результат
            return result;
        };
    }

    const withCache = cachingDecorator(slow);

    alert( withCache(1) ); // slow(1) кешируем
    alert( "Again: " + withCache(1) ); // возвращаем из кеша

    alert( withCache(2) ); // slow(2) кешируем
    alert( "Again: " + withCache(2) ); // возвращаем из кеша
}

{
    let callCount = 0;
    const memoizedFn = memoize(function(a,b){
        callCount += 1;
        return a + b;
    })
    function memoize(fn){
        const hash = new Map()
        return function(){
            const key = JSON.stringify(arguments) // {0:"", 1:'' и так далее}
            if(hash.has(key)){
                return hash.get(key)
            } else {
                const result = fn.apply(this,arguments)
                hash.set(key,result)
                return result
            }
        }
    }

    console.log(memoizedFn(2,3)) //5
    console.log(memoizedFn(2,3)) //5
    console.log(callCount)
}

/**
 * Однако если функция, которую декорируют, имеет this, то после оборачивания вышестоящим декоратором этот контекст может потеряться.
 */
{
    // сделаем worker.slow кеширующим
    let worker = {
        someMethod() {
            return 1;
        },
        slow(x) {
            alert("Called with " + x);
            return x * this.someMethod(); // (*)
        }
    };
    function cachingDecorator(func) {
        let cache = new Map();
        return function(x) {
            if (cache.has(x)) {
                return cache.get(x);
            }
            let result = func(x); // (**)
            //  let result = func.call(this, x); // теперь 'this' передаётся правильно
            //  let result = func.call(this, ...arguments); // Если нужен универсальный декоратор без привязки к количеству аргументов
            cache.set(x, result);
            return result;
        };
    }

    alert( worker.slow(1) ); // оригинальный метод работает

    worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим

    alert( worker.slow(2) ); // Ой! Ошибка: не удаётся прочитать свойство 'someMethod' из 'undefined'
}

/**
 * Применение «func.call» для передачи контекста.
 * Cинтаксис: func.call(context, arg1, arg2, ...)
 */
{
    function sayHi() {
        alert(this.name);
    }

    let user = { name: "John" };
    let admin = { name: "Admin" };

    // используем 'call' для передачи различных объектов в качестве 'this'
    sayHi.call(user); // John
    sayHi.call(admin); // Admin

    {
        function say(phrase) {
            alert(this.name + ': ' + phrase);
        }
        let user = { name: "John" };
        // 'user' становится 'this', и "Hello" становится первым аргументом
        say.call( user, "Hello" ); // John: Hello
    }
}

/**
 * «func.apply»
 * func.apply(this, arguments)
 * Он выполняет func, устанавливая this=context и принимая в качестве списка аргументов псевдомассив arguments.
 *
 * func.call(context, ...args) почти эквивалетно func.apply(context, args). Однако есть разница:
 *      1. Оператор расширения ... позволяет передавать ПЕРЕБИРАЕМЫЙ объект args в виде списка в call.
 *      2. А apply принимает псевдомассив args
 */

{
    // Передача всех аргументов вместе с контекстом другой функции называется «перенаправлением вызова» (call forwarding).
    let wrapper = function() {
        return func.apply(this, arguments);
    };
}
{
    const user = {name: 'boba', value: 10};
    const admin = {name: 'admin', value: 15};
    function sendMessage(...phrases) {
        console.log(this.name + phrases.join(' '));
    }
    sendMessage.call(user, ': Hello', 'nice', 'call');
    sendMessage.call(admin, ': Hello', 'nice', 'call');

    // `.bind()()` и `.apply()` сделают тоже самое, только bind не вызовет функцию сразу, а apply принимает аргументы псевдомассивом
    sendMessage.bind(user, ': Hello', 'nice', 'bind')();
    sendMessage.apply(user, [': Hello', 'nice', 'apply']);
}

// Пример с псевдомассивом в apply
{
    function F () {
        console.log({name:this.name,arg:arguments})
        /**
         * {
         *   name: 'Vadim',
         *   arg: [Arguments] { '0': undefined, '1': undefined, '2': undefined }
         * }
         */
    }

    const obj = { name:'Vadim' }

    F.apply(obj,{length:3})
}

/**
 * Заимствование метода это мощный инструмент, который позволяет переиспользовать методы из разных объектов без необходимости дублирования кода.
 */

{
    const obj1 = {
        name: "John",
        foo() {
            console.log(`Hello, ${this.name}!`);
        }
    }
    const obj2 = {
        name: "Jane"
    }
    obj1.foo.call(obj2); // Output: Hello, Jane!
}

{
    function hash() {
        alert([].join.call(arguments)); // 1,2
    }

    hash(1, 2);

    const pseudoArr = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        length: 5,
    };
    Array.prototype.reverse.call(pseudoArr) // || [].reverse.call(pseudoArr)
    // pseudoArr.reverse();     // TypeError: pseudoArr.reverse is not a function
    console.log(pseudoArr);     // Output: { '0': 5, '1': 4, '2': 3, '3': 2, '4': 1, length: 5 }
}

{
    const withReverse = Array.prototype.reverse.bind([1,2,3])
    console.log(withReverse()) // [3,2,1]
}