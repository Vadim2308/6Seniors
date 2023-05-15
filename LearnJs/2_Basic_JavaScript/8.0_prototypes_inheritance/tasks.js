/**
 * Задачки на определение прото
 */
    {
       // 1
       console.log((10).__proto__ === Number.prototype) // true
    }
    {
       //2
        const n = 1n
        console.log(n.__proto__ === BigInt.prototype) // true
    }
    {   //3
        const n = true
        console.log(n.__proto__ === Boolean.__proto__) // false. Boolean.__proto__ === Function.prototype
    }
    {// 4
        const n = {name:"alex",age:45}
        console.log(n.__proto__.__proto__ == undefined) // true
    }
    {//5
        const n = Symbol('A')
        console.log(n.prototype === Symbol.prototype) // false
    }
//6
    {function foo(){}
        class Person {}
        console.log(foo.__proto__ === Person.__proto__) // true
    }
    {//7
        function foo(){}
        console.log(foo.__proto__.__proto__ === Object.prototype) // false (!) //true. foo.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype
    }
    {//8
        const bar = () => {}
        function foo(){}
        console.log(bar.prototype === foo.prototype) // false, т.к. bar.prototype === undefined
    }
    {//9
        function foo(){}
        function bar(){}
        console.log(bar.prototype === foo.prototype) // false
    }
    {//10
        const n = 10;
        console.log(n.__proto__.constructor.prototype.__proto__.constructor.name === 'Number') // false. Т.к. === "Object"
        // n => (__proto__) => Number.prototype => Number.prototype.(constructor) => Number => Number.prototype.__proto__ => Object.prototype => Object.prototype.constructor => Object => Object.name === 'Object'
    }
    {//11
        const person = {name:'xs',age:21}
        console.log(person.hasOwnProperty('toString')) // false. Т.к. toString унаследованное свойство, а не собственное
    }
    {//12
        const person = {name:'xs',age:21}
        console.log('toString' in person) // true. Оператор in проверяет во всей цепочке прототипа
    }
}

/**
 * QA Max
 */
{
    class Example {
        aboba(){}
    }
    console.log(Example.__proto__ === Function.prototype) // Когда мы создаем класс Example, мы создаем функцию-конструктор, поэтому Example наследует прототип от встроенной функции-конструктор Function, а значит его прототипом будет Function.prototype
    console.log(Example.prototype) // {constructor:Example,aboba:f}

    const a = new Example()
    a.__proto__ //  a.__proto__=== Example.prototype === {constructor:Example,aboba:f}
    a.prototype // undefined. prototype есть у классов и у функций

   // ----- //
    a.prototype = {abobus(){ console.log(1)} }

    a.abobus() // a.abobus is not a function. a.prototype.abobus() -> окей. Работает

    a.__proto__.abobus = function(){console.log('a')} // || Example.prototype.abobus = function(){console.log('a')}

    const b = new Example()
    a.abobus() // a
    b.abobus() // a
}
{
    /**
     * Статические методы и методы инстанса
     */
    Array.from(), Array.isArray // и т.д. являются статическими методами. Они лежат в Array.constructor.
    // методы push, slice и т.д. являются методами инстанса. [1,2,3].push(). Они лежат в Array.prototype
}

/**
 * QA Max
 */
{
    class Test {
        test = 123;
        fun(){
            return 123
        }
    }
    console.log(Test.prototype) // {constructor:Test,fun} <== здесь не будет свойства test
    /**
     * Функции, объявленные в теле класса, автоматически добавляются в прототип класса, что означает, что fun является методом, который доступен через Test.prototype
     * Однако, свойство test объявляется в теле класса с использованием ‘свойства класса’, запись test = 123, не добавляя свойство test в прототип класса Test.prototype.
     * Поэтому, console.log (new Test ()) увидим свойство test, но в console.log (Test.prototype), свойства test не будет.
     */

    //-------------------------------//
    const parentObj = {test:123}
    const childObj = {
        __proto__:parentObj
    }
    console.log(childObj.test) // 123

    //----------------------------//
    null.test // TypeError. Не смог создать объектную обертку
}

/**
 * QA Katana
 */
{
    {
        const obj = {a:1}
        obj.__proto__ = null
        console.log(Object.getPrototypeOf(obj)) // null
    }
    //------------------------------------------//
    {
        function Bar(){
            this.name = "Vadim"
        }
        function Foo(){
            this.age = 25;
            this.myFunc = function(){
                return this.age + 5
            }
        }
        Foo.prototype = new Bar()
        const foo = new Foo()
        console.log(foo.name) // "Vadim"
    }
    //------------------------------------------//
    {
        function Fruit(options){
            this.name = options.name;
            this.color = options.color;
        }
        function Apple(options){
            Fruit.call(this,options)
            this.appleType = options.appleType
        }

        const apple = new Apple({name:'apple',color:"yellow",appleType:'golden'})
        console.log(apple.color) // "yellow"
    }
}
{
    const myProto = {
        isExtended:true
    }

    Object.setPrototypeOf(myProto,Array.prototype)

    function MyArray(){
        this.size = this.length
    }

    MyArray.prototype = myProto

    console.log(MyArray.isExtended) // undefined
    console.log(MyArray.prototype.isExtended) // true
    console.log(new MyArray().isExtended) // true


    console.log(MyArray.size) // undefined
    console.log(MyArray.prototype.size) // undefined
    console.log(new MyArray().prototype.size) // TypeError: Cannot read properties of undefined (reading 'prototype')
    console.log(new MyArray().size) // 0

    console.log(MyArray.length) // 0
    console.log(MyArray.prototype.length) // 0
    console.log(new MyArray().length) // 0

    const arr = new MyArray()
    console.log(arr.length,arr.size) // 0 0
    arr.push(1)
    console.log(arr.length,arr.size) // 1 0
}
/////////-------------------------------/////////////////
{
    function User() { }
    User.prototype = { admin: false };

    let user = new User();

    User.prototype = { admin: true };

    alert(user.admin); // false
}