/**
 * примесь – это класс, объект, методы которого предназначены для использования в других классах, причём без наследования от примеси.
 *
 * С примесями могут возникнуть конфликты, если они перезаписывают существующие методы класса.
 * Стоит помнить об этом и быть внимательнее при выборе имён для методов примеси, чтобы их избежать.
 */
{
    // примесь
    let sayHiMixin = {
        sayHi() {
            alert(`Привет, ${this.name}`);
        },
        sayBye() {
            alert(`Пока, ${this.name}`);
        }
    };

    class User {
        constructor(name) {
            this.name = name;
        }
    }

    Object.assign(User.prototype, sayHiMixin); // (!)Это не наследование, а просто копирование методов.

    new User("Вася").sayHi(); // Привет, Вася

    class Person extends User {}

    new Person('Person').sayBye() // Пока, Person
}

/**
 * Примеси могут наследовать друг друга и создавать микс-цепочки
 * Можно пользоваться `super` для обращения к родительской примеси - методы ищутся в прототипе примеси, а не класса.
 *
 * Так как super ищет родительские методы в [[HomeObject]].[[Prototype]], это означает sayHiMixin.[[Prototype]], а не User.[[Prototype]].
 */
{
    let sayMixin = {
        say(phrase) {
            alert(phrase);
        }
    };

    let sayHiMixin = {
        sayHi() {
            // вызываем метод родителя. [[HomeObject]] ссылается на sayHiMixin
            super.say(`Привет, ${this.name}`); // (*)
        },
        sayBye() {
            super.say(`Пока, ${this.name}`); // (*)
        },
        __proto__: sayMixin,
    };

    class User {
        constructor(name) {
            this.name = name;
        }
    }

        Object.assign(User.prototype, sayHiMixin);

        // теперь User может сказать Привет
        new User("Вася").sayHi(); // Привет, Вася!
}