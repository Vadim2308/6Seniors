/**
 * Использование "this" в литерале объекта
 * Здесь функция makeUser возвращает объект.
 * Каким будет результат при обращении к свойству объекта ref? Почему?
 */
{
    "use strict"
    function makeUser() {
        return {
            name: "John",
            ref: this
        };
    }
    let user = makeUser();
    console.log(user.ref.name); // Каким будет результат?
    // Ошибка, т.к. при use strict значение this внутри FE === undefined. undefined.name === Error

    {
        // Решение
        function makeUser() {
            return {
                name: "John",
                ref() {
                    return this;
                }
            };
        }
        let user = makeUser();
        alert( user.ref().name ); // John
    }
}

/**
 * Создайте объект calculator (калькулятор) с тремя методами:
 *      read() (читать) запрашивает два значения и сохраняет их как свойства объекта.
 *      sum() (суммировать) возвращает сумму сохранённых значений.
 *      mul() (умножить) перемножает сохранённые значения и возвращает результат.
 */

{
    let calculator = {
        a:0,
        b:0,
        read(){
            const firstValue = prompt('a?',"0")
            const secondValue = prompt('b?',"0")
            this.a = +firstValue;
            this.b = +secondValue
        },
        sum() {
            return this.a + this.b
        },
        mul() {
            return this.a * this.b
        }
    }
    calculator.read();
    console.log( calculator.sum() );
    console.log( calculator.mul() );
}

/**
 * Цепь вызовов
 * У нас есть объект ladder (лестница), который позволяет подниматься и спускаться:
 */
{
    let ladder = {
        step: 0,
        up() {
            this.step++;
            //return this
        },
        down() {
            this.step--;
            //return this
        },
        showStep: function() { // показывает текущую ступеньку
            console.log(this.step);
            //return this;
        }
    };
    // Теперь, если нам нужно выполнить несколько последовательных вызовов, мы можем сделать это так:
    ladder.up();
    ladder.up();
    ladder.down();
    ladder.showStep(); // 1
    ladder.down();
    ladder.showStep(); // 0
    // Измените код методов up, down и showStep таким образом,
    // чтобы их вызов можно было сделать по цепочке, например так: ladder.up().up().down().showStep().down().showStep();

    // Решение
    // Добавить return this
}

/**
 * Викторина по определению this
 */
{
    function test() {
      console.log(this);
    }
    test();
    /**
     * A) undefined
     * B) null
     * C) Window object
     * D) Global object
     */
}
{
    var obj = {
        prop: "Hello",
        test: function() {
            console.log(this.prop);
        }
    }
    obj.test();
    /**
     * A) "Hello"
     * B) undefined
     * C) null
     * D) Window object
     */
}
{
    function test() {
        console.log(this);
    }
    var obj = {
        prop: "Hello",
        test: test
    }
    obj.test();
    /**
     * A) undefined
     * B) null
     * C) Window object
     * D) Object {prop: "Hello", test: function}
     */
}
{
    function test() {
        console.log(this);
    }
    var obj = {
        prop: "Hello",
        test: function() {
            test();
        }
    }
    obj.test()
    /**
     * A) undefined
     * B) null
     * C) Window object
     * D) Object {prop: "Hello", test: function}
     */
}
{
    function test() {
    console.log(this);
}

    var obj = {
        prop: "Hello",
        test: function() {
            var self = this;
            function inner() {
                console.log(self.prop);
            }
            inner();
        }
    }
    obj.test();
    /**
     * A) "Hello"
     * B) undefined
     * C) null
     * D) Window objec
     */
}
/**
 * Ответы:
 * 1. C
 * 2. A
 * 3. D
 * 4. C
 * 5. A
 */
{
    "use strict";
    function get (){
        console.log(this) // undefined. Если строгий режим, и функция вызывается от window, то this === Undefined. Без cТрого режим будет this === window
    }
    const obj = {
        name: 'xxxxx',
        method() {
            console.log(this.name);
            get()
        },
    };

    obj.method()
}