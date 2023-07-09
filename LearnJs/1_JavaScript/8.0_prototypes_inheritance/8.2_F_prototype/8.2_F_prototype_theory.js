/**
 *  Новые объекты могут быть созданы с помощью функции-конструктора new F().
 */
{
    let animal = {
        eats: true
    };

    function Rabbit(name) {
        this.name = name;
    }

    Rabbit.prototype = animal; // Rabbit.prototype = animal буквально говорит интерпретатору следующее: "При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]"

    let rabbit = new Rabbit("White Rabbit"); //

    console.log( rabbit.eats ); // true
}

/**
 * У каждой функции по умолчанию уже есть свойство "prototype" (!) Но не у стрелочных функций! ()=>{}.prototype === undefined.
 * function F () {}. В F.prototype  лежит обычное свойство с именем "prototype". И внутри – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
 * (!) Если в F.prototype содержится объект, оператор new устанавливает его в качестве [[Prototype]] для нового объекта.
 */
{
    function Rabbit() {}
    /* прототип по умолчанию
    Rabbit.prototype = { constructor: Rabbit };
    Rabbit.__proto__ === Function.prototype
    */
    console.log( Rabbit.prototype.constructor === Rabbit ); // true

    let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}
    console.log(rabbit.constructor === Rabbit); // true (свойство получено из прототипа)
    console.log(rabbit.__proto__.constructor === Rabbit); // true Одно и тоже что и выше запись

    /**
     * Мы можем использовать свойство constructor существующего объекта для создания нового.
     * Удобно использовать, если мы не знаем какой конструктор использовался для создания объекта.
     */
    let rabbit2 = new rabbit.constructor("Black Rabbit");

}

/**
 * (!) JavaScript  не гарантирует правильное значение свойства "constructor"
 *  Оно является свойством по умолчанию в "prototype" у функций, но что случится с ним позже – зависит только от нас.
 */
{
    function Rabbit() {}

    Rabbit.prototype = {
        jumps: true
    };

    let rabbit = new Rabbit();
    console.log(rabbit.constructor === Rabbit); // false. Т.к. перезаписали объект prototype на новый.
    // Чтобы сохранить мы можем либо добавить свойство, либо заново создать свойство constructor
    {
        Rabbit.prototype.jumps = true
        // или
        Rabbit.prototype = {
            jumps: true,
            constructor: Rabbit
        };

    }

}

/**
 *  (!) Если объект создается через функцию конструктор, то у созданного объекта будет доп.свойство (constructor)
 */
{
    function F(){}
    const obj = new F()
    console.log(obj.__proto__.constructor === F) // т.е. появиллся новый прото объект {constructor:F}
    // А далее __proto__ уже ссылается на Object.prototype
    console.log(obj.__proto__.__proto__ === Object.prototype) // true
}

/**
 * String.__proto__ Number.__proto__ и т.д. ссылаются на Function.prototype
 */