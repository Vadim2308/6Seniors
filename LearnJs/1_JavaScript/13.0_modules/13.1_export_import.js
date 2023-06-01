/**
 * Импорт можно писать и в конце файла, но это очень неудобно
 * Инструкции import/export не работают внутри {...}.
 */


/**
 * Экспорт до объявления
 */
{
    export function sayHi(user) {
        alert(`Hello, ${user}!`);
    }  // без ; в конце
    export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    export const MODULES_BECAME_STANDARD_YEAR = 2015;
    export class User {
        constructor(name) {
            this.name = name;
        }
    }// без ; в конце
}

/**
 * Экспорт отдельно от объявления
 */
{
    function sayHi(user) {alert(`Hello, ${user}!`);}
    function sayBye(user) {alert(`Bye, ${user}!`);}

export {sayHi, sayBye}; // список экспортируемых переменных
}

/**
 * Импорт *
 * Если есть много экспортируемых элементов, можно испльзовать import * as ...
 * Если мы импортируем "as *" то вебпак не сможет удалить неиспользованные функции. (three_shaking)
 *
 */
{
    // 📁 main.js
    import * as say from './say.js';

    say.sayHi('John');
    say.sayBye('John');
}

/**
 * Импорт «как»
 * {
 *     📁 main.js
 *     import {sayHi as hi, sayBye as bye} from './say.js';
 *     hi('John'); // Hello, John!
 *     bye('John'); // Bye, John!
 * }
 */

/**
 * Экспортировать «как»
 * {
 *     📁 say.js
 *     export { sayHi as hi, sayBye as bye };  <== переименовали
 *     📁 main.js
 *     import * as say from './say.js';  <== импортнули как say
 *     say.hi('John'); // Hello, John!
 *     say.bye('John'); // Bye, John!
 * }
 */


/**
 * Экспорт по умолчанию
 * В файле может быть не более одного export default.
 * Фигурные скобки необходимы в случае именованных экспортов, для export default они не нужны.
 * В одном модуле может быть как эспорт по умолчанию, так и именованные экспорты
 */
{
    // 📁 user.js
    export default class User {
        constructor(name) {
            this.name = name;
        }
    }

    // 📁 main.js
    import User from './user.js'; // не {User}, просто User
    new User('John');
}
{
    // Экспортируемые сущности могут не иметь имени. Мы можем их дать во время импорта
    export default function(user) { // у функции нет имени
        alert(`Hello, ${user}!`);
    }
    export default class { // у класса нет имени
        constructor() { ... }
    }
    export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

/**
 * Имя «default»
 * В некоторых ситуациях для обозначения экспорта по умолчанию в качестве имени используется default.
 */
{
    function sayHi(user) {
        alert(`Hello, ${user}!`);
    }
    export {sayHi as default} // то же самое, как если бы мы добавили "export default" перед функцией;
}
{
    // Примеры импортов, когда в модуле имеются экспорты и по умолчанию, и именованные
    // 📁 user.js
    export default class User {
        constructor(name) {
            this.name = name;
        }
    }
    export function sayHi(user) {
        alert(`Hello, ${user}!`);
    }
    // 📁 main.js
     import {default as User, sayHi} from './user.js';
     new User('John');
      // Или вот так
      // 📁 main.js
     import * as user from './user.js';
     let User = user.default; // экспорт по умолчанию
     new User('John');
}

/**
 * Реэкспорт
 * Синтаксис «реэкспорта» export ... from ... позволяет импортировать что-то и тут же экспортировать, возможно под другим именем
 */
{
    // 📁 index.js
    export {sayHi} from './say.js'; // реэкспортировать sayHi
    export {default as User} from './user.js'; // реэкспортировать default
    // 📁 main.js
    import { User,sayHi } from './index.js'
}

/**
 * Реэкспорт экспорта по умолчанию. Например если в 1 файле и дефолт и именованный. В index.ts указать:
 * export * from './user.js'; // для реэкспорта именованных экспортов
 * export { default } from './user.js'; // для реэкспорта по умолчанию
 */
{
    import User, { fn1 } from "./folder";
    console.log(User(), fn1());
}

/**
 * Реэкспорт с переименованием
 * 📁 index.js
 * export * as LibFn from "./file2.js";
 *
 * import { LibFn } from "./folder";
 * console.log(LibFn); <== Объект с эспортируемымы сущностями
 */

{
    function first () {
        console.log('func first');
    }
    function second() {
        console.log('func second');
    }
    function third() {
        console.log('func third');
    }

     export default { first, second, third}
    /**
     * import expObject from './script.js';
     * expObject.first();
     * expObject.second();
     * expObject.third();
     */
}