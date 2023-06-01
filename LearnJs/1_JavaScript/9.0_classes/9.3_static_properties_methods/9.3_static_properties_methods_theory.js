/**
 * Статические св-ва и методы принадлежат не экземплярам класса, а конструктору
 * В объявление класса они добавляются с помощью ключевого слова static
 */
{
    class User {
        static staticMethod() {
            alert(this === User);
        }
    }

    User.staticMethod(); // true
    // Или
    {
        class User { }
        User.staticMethod = function() {
            alert(this === User);
        };
    }
}

/**
 * Статические методы также наследуются
 */
{
    class User {
        name = 'user'
        customMethod(){}
        static staticMethod() {                      // Объявление статического св-ва то же самое, что и присвоение св-ва к классу
            console.log('this is static method');
        }
    }
    class Extends extends User{
        extendMethod(){}
    }
    Extends.staticMethod() // console.log('this is static method');

    console.log(Extends.__proto__ === User) // для статики
    // Extends prototype содержит конструктор и extendMethod
    // Extends.prototype.__proto__ содержит конструктор User и customMethod
    console.log(Extends.prototype.__proto__ === User.prototype) // для обычных методов
}

/**
 * Статические свойства (!) Новая возможность добавлена недавно
 */
{
    class User {
        static author = 'Vadim'
    }
    User.author // 'Vadim
    // Это тоже самое что и  User.author = "Vadim"
}