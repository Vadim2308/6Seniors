/**
 * Что будет в консоли и почему
 */
{
    let x = 10;
    function foo() {
        console.log(x);
    }
    function bar(f) {
        let x = 20;
        f(); // 10 т.к. ссылка на внешнее лексическое окружение с переменными формируется в момент создания функции.
    }
    bar(foo);
}

/**
 * Что покажет консоль ?
 */
{
    function Counter() {
        let count = 0;

        this.up = function() {
            return ++count;
        };

        this.down = function() {
            return --count;
        };
    }

    let counter = new Counter();

    alert( counter.up() ); // 1
    alert( counter.up() ); // 2
    alert( counter.down() ); // 1
}

/**
 * Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b.
 */
{
    const sum = a => b => a + b

    sum(1)(2) //3
    sum(5)(-1) //4
}

/**
 * Фильтрация с помощью функции inBetween inArray
 * Пример:
 *   let arr = [1, 2, 3, 4, 5, 6, 7];
 *   alert(arr.filter(inBetween(3, 6)) ); // 3,4,5,6
 *   alert(arr.filter(inArray([1, 2, 10])) ); // 1,2
 */

{
    let arr = [1, 2, 3, 4, 5, 6, 7];
    const inBetween = (a,b) => (item) => {
        return item >= a && item <= b
    }
    const inArray = (range)=> item => {
        return range.includes(item)
    }
}

/**
 * Сортировать по полю
 */

{
    let users = [
        { name: "John", age: 20, surname: "Johnson" },
        { name: "Pete", age: 18, surname: "Peterson" },
        { name: "Ann", age: 19, surname: "Hathaway" }
    ];

    const byField = (fieldName) => (a,b) => a[fieldName] > b[fieldName] ? 1 : -1
}

/**
 * Армия функций
 * Следующий код создаёт массив из стрелков (shooters).
 * Каждая функция предназначена выводить их порядковые номера. Но что-то пошло не так…
 */

{
    function makeArmy() {
        let shooters = [];

        let i = 0;
        while (i < 10) {
            const shooter = (i) => () => {
                console.log(i);
            }
            shooters.push(shooter(i));
            i++;
        }

        return shooters;
    }

    let army = makeArmy();

    army[0]();
    army[5]();

    /**
     * Вариант 2
     */
    {
        function makeArmy() {

            let shooters = [];

            for(let i = 0; i < 10; i++) {
                let shooter = function() { // функция shooter
                    alert( i ); // должна выводить порядковый номер
                };
                shooters.push(shooter);
            }

            return shooters;
        }
    }
}

/**
 * tasks from LC
 */
{
    (function immediateA(a) {
        return (function immediateB(b) {
            console.log(a);
        })(1);
    })(0);   //0

}

{
    let count = 0;
    (function immediate() {
        if (count === 0) {
            let count = 1;
            console.log(count);
        }
        console.log(count);
    })(); //1 0
}

{
    for (var i = 0; i < 3; i++) {
        setTimeout(function log() {
            console.log(i);  //3 3 3
        }, 1000);
    }
}

{
    function createIncrement() {
        let count = 0;
        function increment() {
            count++;
        }

        let message = `task - ${count}`;
        function log() {
            console.log(message);
        }

        return [increment, log];
    }

    const [increment, log] = createIncrement();
    increment();
    increment();
    increment();
    log(); // task - 0
}

{
    let counter = 0;

    function test() {
        console.log(++counter);
    }

    test(); // 1
}

{
    let counter = 0;

    function test() {
        console.log(++counter);
    }

    test();

    function test2(cb) {
        let counter = 5;

        cb();
    }

    test2(test); //1 2
}

{
    function two() {
        console.log(a);
    }

    function one() {
        var a = 2;
        console.log(a);
        two();
    }

    var a = 1;
    console.log(a);
    one(); // 1 2 1
}

/**
 * Вызов счетчика сразу
 */
{
    function makeCounter() {
        let count = 0;
        return function() {
            return count++;
        };
    }
    console.log(makeCounter()()); // 0
    console.log(makeCounter()()); // 0
}

/**
 * Function Constructor closure and this
 */
{
    function Creator(){
        this.test = 'test'
        this.arrow = () => this.test
        this.nonArrow = function(){
            return this.test
        }
    }

    console.log(new Creator().nonArrow()) // 'test'
    console.log(new Creator().arrow()) // 'test'
}

/**
 * Пример работы замыкания + this
 */
{
    let testArrow = () => this.aboba

    const obj = {
        test:'testObj',
        method(){
            testArrow = () => this.test
        }
    }

    const objectAboba = {
        aboba:"aboba"
    }

    obj.method()
    objectAboba.testArrow = testArrow

    console.log(testArrow()) // testObj
    console.log(objectAboba.testArrow()) // testObj
}