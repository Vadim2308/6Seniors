{
    const arr = [1]
    console.log(arr.__proto__ === Array.prototype) // true
    console.log(arr.__proto__.__proto__ === Object.prototype) // true
    console.log(arr.__proto__.__proto__.__proto__ === null) // true
 }
{
    const str = ''
    console.log(str.__proto__ === String.prototype) // true
    console.log(str.__proto__.__proto__ === Object.prototype) // true
    console.log(str.__proto__.__proto__.__proto__ === null) // true
}

// Task 1
// Каковы будут результаты выполнения? Почему?
{
    function Rabbit() {}

    Rabbit.prototype = {
        eats: true
    };

    let rabbit = new Rabbit();

    Rabbit.prototype = {};

    alert( rabbit.eats ); // true. Т.к. объект создавался еще в момент, когда в Rabbit.prototype лежал объект
}

// Task 2
// А если код будет такой? (заменена одна строка):
{
    function Rabbit(name) {}

    Rabbit.prototype = {eats: true};

    let rabbit = new Rabbit();

    Rabbit.prototype.eats = false; // (*)

    console.log(rabbit.eats); // Output: false. Т.к. на 35 строчке создали объект, потом изменили его. При rabbit.eats мы обращаемся к существующему объекту, а не к новому
}


// Task 3
// А такой? (заменена одна строка)
{
    function Rabbit(name) {}

    Rabbit.prototype = {eats: true};

    const rabbit = new Rabbit();

    delete Rabbit.prototype.eats; // (*)

    console.log(rabbit.eats); // undefined

}
// Task 4
// А если бы в последнем коде вместо строки (*) было delete rabbit.eats?
{
    function Rabbit(name) {}

    Rabbit.prototype = {eats: true};

    const rabbit = new Rabbit();

    delete rabbit.eats; // (*)

    console.log(rabbit.eats); // true, т.к. оператор delete удаляет только собственные свойства и не лезет в прототип. rabbit.eats берется из прототипа.
}

// Task 5
// Представьте, что у нас имеется некий объект obj, созданный функцией-конструктором – мы не знаем какой именно, но хотелось бы создать ещё один объект такого же типа.
// Можем ли мы сделать так?
// Приведите пример функции-конструктора для объекта obj, с которой такой вызов корректно сработает.
// И пример функции-конструктора, с которой такой код поведёт себя неправильно.
{
    {
        // Сработает например если так
        function F(){}
        const obj = new F()
        const obj2 = new obj.constructor()
        // Или так
        {
            const obj = {};
            let obj2 = new obj.constructor(); // obj.constructor === Object Output:true
        }
    }
    {
        // Не сработает если так
        function F(){}
        F.prototype = {
            constructor:null
        }
        const obj = new F()
        let obj2 = new obj.constructor(); // Error
    }
}