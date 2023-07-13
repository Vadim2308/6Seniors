/**
 * Класс - это расширяемый шаблон кода для создания объектов, который устанавливает в них начальные значения (свойства) (по аналогии с `new function`)
 * В JavaScript класс – это разновидность функции.
 *
 * Можно писать классы как с большой, так с маленькой, ограничений с точки зрения JS нет. class User || class user
 */

{
    class User {
        city = "Moscow" // Свойство city не устанавливается в User.prototype. Вместо этого оно создаётся оператором new перед запуском конструктора, это именно свойство объекта.
        constructor(name) {
            this.name = name;
        }

        sayHi() {
            alert(this.name);
        }

    }
   // Использование:
    let user = new User("Иван");
    alert(typeof User); // function
    // ...или, если точнее, это метод constructor
    alert(User === User.prototype.constructor); // true
    user.sayHi();

    /**
     * Этапы:
     *  1.Создаёт функцию с именем User.Код функции берётся из метода constructor
     *  2.Сохраняет все методы, такие как sayHi, в User.prototype.
     *  {
     *      city:"Moscow"
     *      name:"Ivan"
     *      [[Prototype]]:{
     *          constructor:User
     *          sayHi: f
     *      }
     *  }
     *  console.log(Object.getOwnPropertyNames(User.prototype)) // ['constructor', 'sayHi']
     */
}

/**
 * Не совсем синтаксический сахар
 * Отличия от функции конструктора:
 *      1. функция, созданная с помощью class, помечена специальным внутренним свойством [[IsClassConstructor]]: true
 *      2. В отличие от обычных функций, конструктор класса не может быть вызван без new:  Error: Class constructor User cannot be invoked without 'new'
 *      3. Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".
 *      4. Классы всегда используют use strict.
 */

/**
 * Class Expression
 * Как и функции, класс можно присвоить переменной.
 */
{
    let User = class {
        sayHi() {
            alert("Привет");
        }
    };
    new User().sayHi()
}

/**
 * Аналогично Named Function Expression, Class Expression может иметь имя. Если у Class Expression есть имя, то оно видно только внутри класса
 */
{
    // "Named Class Expression"(в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
    let User = class MyClass {
        sayHi() {
            alert(MyClass); // имя MyClass видно только внутри класса
        }
    };

    new User().sayHi(); // работает, выводит определение MyClass

    alert(MyClass); // ошибка, имя MyClass не видно за пределами класса
}

/**
 * Функция может возвращать (return) класс. То есть можно создавать классы по запросу.
 */

function makeClass(phrase) {
    // объявляем класс и возвращаем его
    return class {
        sayHi() {
            alert(phrase);
        };
    };
}

// Создаём новый класс
let User = makeClass("Привет");

new User().sayHi(); // Привет

/**
 * Геттеры/сеттеры
 */
{
    class User {

        constructor(name) {
            // вызывает сеттер
            this.name = name;
        }
        get name() {
            return this._name;
        }
        set name(value) {
            if (value.length < 4) {
                alert("Имя слишком короткое.");
                return;
            }
            this._name = value;
        }

    }
    let user = new User("Иван");
    alert(user.name); // Иван
    user = new User(""); // Имя слишком короткое.

    /**
     * При объявлении класса геттеры/сеттеры создаются на User.prototype, вот так:
     */
    {
        Object.defineProperties(User.prototype, {
            name: {
                get() {
                    return this._name
                },
                set(name) {
                    // ...
                }
            }
        });
    }
    // Пример с вычисляемым свойством в скобках [...]:
    {
        class User {
            ['say' + 'Hi']() {
                alert("Привет");
            }
        }
        new User().sayHi();
    }
}
