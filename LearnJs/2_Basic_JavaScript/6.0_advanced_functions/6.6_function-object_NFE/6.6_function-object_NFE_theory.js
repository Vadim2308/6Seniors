/**
 * В JavaScript функции – это объекты.
 * Функции можно не только вызывать, но и использовать их как обычные объекты: добавлять/удалять свойства, передавать их по ссылке и т.д.
 */

/**
 * «name»
 * Name определяется из контекста
 * Бывает, что корректное имя определить невозможно. В таких случаях свойство name имеет пустое значение.
 */
{
    function sayHi() {
        alert("Hi");
    }
    alert(sayHi.name); // sayHi

    {
        function f(sayHi = function() {}) {
            alert(sayHi.name); // sayHi (работает!)
        }
        f();
    }

    const foo = function () {return 'g'};
    console.log(foo.name);            // Output: 'foo'
    const fooArrow = () => 'arrow';
    console.log(fooArrow.name);       // Output: 'fooArrow'
}

{
    // Методы объекта также имеют имена
    const obj = {
        counter: 10,
        methodExample() {
            return 'method';
        },
    };
    console.log(obj.methodExample.name);       // Output: 'methodExample'
}

/**
 * «length»
 * «length» содержит количество параметров функции в её объявлении.
 * rest params в length не учитываются
 */
{
    function f1(a) {}
    function f2(a, b) {}
    function many(a, b, ...more) {}

    alert(f1.length); // 1
    alert(f2.length); // 2
    alert(many.length); // 2
}

/**
 * Пользовательские свойства
 * Мы можем добавить свои собственные свойства.
 *
 * Мы можем использовать функцию как объект, хранить в ней свойства, но они никак не влияют на её выполнение.
 */

{
    function sayHi() {
        alert("Hi");
        // давайте посчитаем, сколько вызовов мы сделали
        sayHi.counter++;
    }
    sayHi.counter = 0; // начальное значение

    sayHi(); // Hi
    sayHi(); // Hi

    alert( `Вызвана ${sayHi.counter} раза` ); // Вызвана 2 раза

    /**
     * sayHi.counter = 0, не объявляет локальную переменную counter внутри неё.
     * Другими словами, свойство counter и переменная let counter – это две независимые вещи.
     */
}

{

   // Если поменять функции контекст, то св-ва не передадутся
    const fn = () => {}
    fn.counter = 3

    const obj3 = {
        counter: 1,
    };

    let fn2 = fn;
    console.log(fn2.counter); // Output: 3 - Все норм, тут мы не меняем контекст, ссылка та же

    fn2 = fn2.bind(obj3);
    console.log(fn2.counter); // Output: undefined - Поменяли контекст - св-ва обнулились

    fn2.counter = 1000;
    console.log(fn2.counter);  // Output: 1000 - Присвоили новое значение св-ву
}

/**
 * NFE - Named Function Expression
 * Именованное Функциональное Выражение
 */

{
    /**
     * Добавление "func" после function не превращает объявление в Function Declaration
     */
    let sayHi = function func(who) {
        alert(`Hello, ${who}`);
    };
    /**
     * Есть две важные особенности имени func, ради которого оно даётся:
     *   Оно позволяет функции ссылаться на себя же.
     *   Оно не доступно за пределами функции.
     */
    {
        let sayHi = function func(who) {
            if (who) {
                alert(`Hello, ${who}`);
            } else {
                func("Guest"); // использует func, чтобы снова вызвать себя же
            }
        };

        sayHi(); // Hello, Guest
        // А вот так - не cработает:
        func(); // Ошибка, func не определена (недоступна вне функции)
    }
}
/**
 * Проблематика в том, если дальше по коду sayHi может быть изменено.
 * Функция может быть присвоена другой переменной, и тогда код начнёт выдавать ошибки
 */
{
    let sayHi = function(who) {
        if (who) {
            alert(`Hello, ${who}`);
        } else {
            sayHi("Guest"); // Ошибка: sayHi не является функцией
        }
    };
    let welcome = sayHi;
    sayHi = null;
    welcome(); // Ошибка, вложенный вызов sayHi больше не работает!

    /**
     * Исправленный вариант работы
     */
    {
        let sayHi = function func(who) {
            if (who) {
                alert(`Hello, ${who}`);
            } else {
                func("Guest"); // Теперь всё в порядке
            }
        };
        let welcome = sayHi;
        sayHi = null;
        welcome(); // Hello, Guest (вложенный вызов работает)
    }
}
