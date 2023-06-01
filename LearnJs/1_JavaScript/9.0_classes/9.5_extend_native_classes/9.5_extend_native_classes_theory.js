/**
 * Классы можно наследовать от стандартных классов
 */
{
    class PowerArray extends Array {
        isEmpty() {
            return this.length === 0;
        }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    alert(arr.isEmpty()); // false

    let filteredArr = arr.filter(item => item >= 10);
    alert(filteredArr); // 10, 50
    alert(filteredArr.isEmpty()); // false

    /**
     * Методы filter reduce и т.д. лежат дальше в прототипе (arr.__proto__.__proto__)
     */
}

/**
 * [Symbol.species]
 * Можно воспользоваться геттером `[Symbol.species]` для того чтобы вручную указать родительскую конструктор,
 * который будут использовать встроенные методы
 */

{
    class PowerArray extends Array {
        isEmpty() {
            return this.length === 0;
        }

        // встроенные методы массива будут использовать этот метод как конструктор
        static get [Symbol.species]() {
            return Array;
        }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    console.log(arr.constructor,arr.isEmpty()) // PowerArray false
    let filteredArr = arr.filter(item => item >= 10);
    console.log(filteredArr.constructor,filteredArr.isEmpty()) // Array, TypeError: filteredArr.isEmpty is not a function
}

{
    class MyArray extends Array {
        static get [Symbol.species]() {
            return Array;  // возвращаем Array как функцию-конструктор
        }
    }

    let a = new MyArray(1, 2, 3);
    let b = a.map(x => x * 2);

    console.log(b instanceof MyArray); // false
    console.log(b instanceof Array); // true

    /**
     * Когда мы вызываем метод map на переменной a, он возвращает новый массив b.
     * Но мы ожидаем, что этот массив должен быть типа MyArray, а не Array.
     * Но поскольку Symbol.species возвращает Array, методы map и другие методы, использующие Symbol.species, возвращают новый объект Array.
     * Когда мы проверяем, является ли b экземпляром MyArray или Array, мы видим, что это экземпляр Array.
     *
     * Однако, если мы изменим Symbol.species в MyArray, чтобы возвращался объект MyArray вместо Array, мы сможем получить ожидаемый результат:
     */
    {
        class MyArray extends Array {
            static get [Symbol.species]() {
                return this; // возвращает объект MyArray как функцию-конструктор
            }
        }

        let a = new MyArray(1, 2, 3);
        let b = a.map(x => x * 2);

        console.log(b instanceof MyArray); // true
        console.log(b instanceof Array); // true
    }
}


/**
 * Обычно классы наследуют статические методы. НО ВСТРОЕННЫЕ НЕ НАСЛЕДУЮТ
 * Благодаря этому у Array отсутствует Array.keys()
 */