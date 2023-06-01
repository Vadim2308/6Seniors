/**
 * При создании объекта (с помощью литерала {...} или new Object()) свойство [[Prototype]] этого объекта устанавливается на Object.prototype
 *
 */
{
    let obj = {};
    const obj2 = new Object();
    const obj3 = Object.create(null); // Создание без __proto__.  al ert(obj3); //Uncaught TypeError: Cannot convert object to primitive value
    alert(obj.__proto__ === Object.prototype); // true
    // obj.toString === obj.__proto__.toString === Object.prototype.toString
    // Object.prototype.__proto__  === null // true , Наверху иерархии встроенных прототипов находится Object.prototype. Поэтому иногда говорят, что «всё наследует от объектов».
}

/**
 * Object.prototype.constructor ссылается на функцию-конструктор, с помощью которой и создаются объекты.
 */

/**
 * Встроенные прототипы
 *                                    null
 *                                     |
 *                             Object.prototype
 *                       /             |                     \
 *                     /               |                       \
 *                  /                  |                         \
 *  Array.prototype.__proto__   Function.prototype.__proto__   Number.prototype.__proto__
 */
{
    let arr = [1, 2, 3];

    // наследует ли от Array.prototype?
    alert( arr.__proto__ === Array.prototype ); // true

   // затем наследует ли от Object.prototype?
    alert( arr.__proto__.__proto__ === Object.prototype ); // true

    // и null на вершине иерархии
    alert( arr.__proto__.__proto__.__proto__ ); // null

    function f() {}

    alert(f.__proto__ === Function.prototype); // true
    alert(f.__proto__.__proto__ === Object.prototype); // true, наследует от Object
    console.log(Function.prototype.__proto__.__proto__ === null) // true

    /**
     * Некоторые методы в прототипах могут пересекаться, например, у Array.prototype есть свой метод toString
     * И т.к. он находится "ближе" в цепочке прототипов, поэтому приведение к строке у массивов берется у Array.prototype, а не идет в Object
     */
    {
        let arr = [1, 2, 3]
        alert(arr); // 1,2,3 <-- результат Array.prototype.toString
    }
}

/**
 * Примитивы
 * Примитивы не являются объектами, но если мы попытаемся получить доступ к их свойствам, то тогда будет создан временный объект-обёртка с использованием встроенных конструкторов String, Number и Boolean, который предоставит методы и после этого исчезнет.
 */
{
    const str = 'str';
    console.log(str.length);     // Output: 3'
    console.log(str.__proto__);  // Output: String.prototype

}

/**
 * null и undefined не имеют прототипов и св-в.
 */
{
    console.log(null.__proto__);         // TypeError: Cannot read properties of null (reading '__proto__')
    console.log(undefined.__proto__);    // TypeError: Cannot read properties of undefined (reading '__proto__')
}

/**
 * Изменение встроенных прототипов
 * (!) изменение встроенных прототипов считается плохой идеей. Только в одном случае одобряется изменение встроенных прототипов. Это создание полифила
 * Полифил – это термин, который означает эмуляцию метода, который существует в спецификации JavaScript, но ещё не поддерживается текущим движком JavaScript.
 */
{
    String.prototype.show = function() {
        alert(this);
    };

    "BOOM!".show(); // BOOM!

    /**
     * Пример полифила
     */
    {
        if (!String.prototype.repeat) { // Если такого метода нет добавляем его в прототип
            String.prototype.repeat = function(n) {
                // повторить строку n раз
                // на самом деле код должен быть немного более сложным
                // (полный алгоритм можно найти в спецификации)
                // но даже неполный полифил зачастую достаточно хорош для использования
                return new Array(n + 1).join(this);
            };
        }

        alert( "La".repeat(3) ); // LaLaLa
    }
}

/**
 * Заимствование у прототипов
 */
{
    let obj = {
        0: "Hello",
        1: "world!",
        length: 2,
    };

    obj.join = Array.prototype.join;
    alert( obj.join(',') ); // Hello,world!
    obj.__proto__ = Array.prototype
    const filled = obj.fill(1) // [1, 1]
}