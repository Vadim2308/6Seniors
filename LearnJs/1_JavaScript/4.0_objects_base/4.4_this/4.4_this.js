/**
 * This — это ключевое слово в JavaScript, которое позволяет получить доступ к контексту;
 * Грубо говоря, this — это ссылка на некий объект, к свойствам которого можно получить доступ внутри вызова функции.
 * Этот this — и есть контекст выполнения.
 */

/**
 * Cинтаксисы добавления методов в объект
 */
{
    let user = {
        name: "John",
        age: 30
    };
    /**
     * Вариант 1
     */
    user.sayHi = function() {
        alert("Привет!");
    };
    user.sayHi(); // Привет!

    /**
     * Вариант 2
     */
    function sayBye() {
        alert("Пока!");
    }
    // затем добавляем в качестве метода
    user.sayBye = sayBye;

    /**
     * Вариант 3
     */
    user = {
        sayHi: function() {
            alert("Привет");
        }
    };
    // сокращённая запись выглядит лучше, не так ли?
    user = {
        sayHi() { // то же самое, что и "sayHi: function(){...}"
            alert("Привет");
        }
    };
}

/**
 * Как правило, методу объекта обычно требуется доступ к информации, хранящейся в объекте, для выполнения своей работы.
 * Для доступа к информации внутри объекта метод может использовать ключевое слово this.
 */
{
    let user = {
        name: "John",
        age: 30,
        sayHi() {
            // "this" - это "текущий объект".
            alert(this.name);
        }
    };
    user.sayHi(); // Здесь во время выполнения кода user.sayHi() значением this будет являться user (ссылка на объект user).

}
/**
 * Значение this вычисляется во время выполнения кода, в зависимости от контекста.
 * В JavaScript this является «свободным», его значение вычисляется в момент вызова метода и не зависит от того, где этот метод был объявлен
 * Например, здесь одна и та же функция назначена двум разным объектам и имеет различное значение «this» в вызовах:
 */
{
    let user = { name: "John" };
    let admin = { name: "Admin" };

    function sayHi() {
        console.log( this.name );
    }
    // используем одну и ту же функцию в двух объектах
    user.f = sayHi;
    admin.f = sayHi;
    // эти вызовы имеют  разное значение this
    // "this" внутри функции - это объект "перед точкой"
    user.f(); // John  (this == user)
    admin.f(); // Admin  (this == admin)
    admin['f'](); // Admin (нет разницы между использованием точки или квадратных скобок для доступа к объекту)
}
/**
 * Если записать метод объекта в переменную и вызвать её, значение this изменится.
 */
{
    const user = {
        name: 'Alex',
        greet() {
            console.log(`Hello, my name is ${this.name}`)
        },
    }
    const greet = user.greet
    greet() // // Hello, my name is
}
/**
 * 'use strict'
 */
{
    /**
     * В строгом режиме ("use strict") в таком коде значением this будет являться undefined.
     * Если мы попытаемся получить доступ к this.name – это вызовет ошибку.
     */
    "use strict";
    function sayHi() {
        alert(this);
    }
    sayHi(); // undefined

    /**
     *  В нестрогом режиме значением this в таком случае будет глобальный объект
     *  Глобальный объект — это, так скажем, корневой объект в программе.
     *  Если мы запускаем JS-код в браузере, то глобальным объектом будет window.
     *  Если мы запускаем код в Node-окружении, то global.
     */
    {
        function sayHi() {
            alert(this);
        }
        sayHi(); // window
    }
    {
        'use strict';
        const user = {
            name: 'Alex',
            greet() {
                console.log(`Hello, my name is ${this.name}`);
            },
        };
        const greet = user.greet;
        greet(); // Error: Cannot read properties of undefined (reading 'name')
    }
}

/**
 * У стрелочных функций нет «this»
 * Стрелочные функции особенные: у них нет своего «собственного» this. Если мы ссылаемся на this внутри такой функции,
 * то оно берётся из внешней «нормальной» функции.
 * Они связываются с ближайшим по иерархии контекстом, в котором они определены.
 */
{
    let user = {
        firstName: "Ilya",
        sayHi() {
            let arrow = () => console.log(this.firstName);
            arrow();
        }
    };
    user.sayHi(); // Ilya
}
{
    var name = 'Kolya';
    const obj = {
        name: 'Vadim',
        method: () => {
            console.log(this.name);
        },
    };
    obj.method(); // 'Kolya'
}
{
    let user = {
        firstName: 'Ilya',
        sayHi() {
            function foo() {
                console.log(this.firstName);
            }
            foo();
        },
    };
    user.sayHi(); // undefined
    /**
     * Но если var в глобальной области, то иначе
     */
    {
        var firstName = 'VADIM'
        let user = {
            firstName: 'Ilya',
            sayHi() {
                function foo() {
                    console.log(this.firstName);
                }
                foo();
            },
        };
        user.sayHi(); // 'VADIM'
    }
}
{
    ;(function () {
    console.log(this === window) // true
})()
}
/**
 * чему равен this
 */
{
    const obj = {
        name: 'Vadim',
        car: this, // this  === window. Даже если this в объекте или в стрелке лежит на самом глубоком уровне, все равно возьмет из самого верха.т.е. из window
        method() {
            const obj2 = {
                name: 'obj2',
                age: this, // this === obj, т.к. method сформировал свой this, и внутри объекта this ссылается на obj. А вот внутри  obj.car === window
            };
            console.log(obj2);
        },
    };
    obj.method(); // obj['method']();
}

/**
 * this в массиве
 */
{
    let arr = ["a",function() {console.log(this);}];
    arr[1]() // this === ['a', ƒ]
    let foo = arr[1]
    foo() // this === window
}