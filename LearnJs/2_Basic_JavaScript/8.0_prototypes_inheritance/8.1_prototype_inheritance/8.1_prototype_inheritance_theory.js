/**
 * Links:
     * 1.https://www.youtube.com/watch?v=JJub3mZ31H8
     * 2.https://www.youtube.com/watch?v=ntwLUBjOi8U
 */

/**
 * Прототип - это механизм, который используется для наследования свойств и методов между объектами в JavaScript.
 * Прототипное наследование - возможность создавать объекты на базе других объектов (наследовать свойства)
 * Объекты имеют специальное внутреннee скрытое свойство [[Prototype]] которое либо равно null, либо ссылается на другой объект - прототип
 */

/**
 * Когда мы обращаемся к свойству, которого нет, оно будет искаться в [[Prototype]] (прототипе)
 */

/**
 * С помощью `__proto__` можно задать/изменить [[Prototype]].
 * `__proto__` не то же самое что [[Prototype]]. Это геттер/сеттер для [[Prototype]] (Т.е. при обращении к someObj._proto_ на самом деле вызывается геттер, который возвращает объект по ссылке из [[Prototype]], а через знак = прототип можно переопределить)
 * __proto__ устарело. Мы должны использовать функции Object.getPrototypeOf (узнать прототип объекта )/Object.setPrototypeOf (задать прототип для объекта)
 * нет __proto__ у null и undefined
 */

/**
 * когда alert пытается прочитать свойство 'rabbit.eats' его нет в rabbit, поэтому JavaScript следует по ссылке [[Prototype]] и находит его в animal
 */
{
    let animal = {
        eats: true
    };
    let rabbit = {
        jumps: true
    };

    rabbit.__proto__ = animal; // (*)

    // теперь мы можем найти оба свойства в rabbit:
    alert( rabbit.eats ); // true
    alert( rabbit.jumps ); // true

    // {
    //     jumps:true,
    //     [[Prototype]]:{
    //         eats:true,
    //         [[Prototype]]: Object.prototype
    //     }
    //
    // }
}

{
    let animal = {
        eats: true,
        walk() {
            alert("Animal walk");
        }
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    let longEar = {
        earLength: 10,
        __proto__: rabbit
    };

    // walk взят из цепочки прототипов
    longEar.walk(); // Animal walk
    alert(longEar.jumps); // true (из rabbit)

    // (!) Ссылки не могут идти по-кругу
    // animal.__proto__ = longEar;       // TypeError: Cyclic __proto__ value

    // (!) Значение __proto__ может быть объектом или null. Другие типы игнорируются.

    // // Объект обращается к [[Prototype]] только для чтения - нельзя перезаписать или удалить св-во прототипа через объект-наследник
    delete rabbit.eats
    console.log(animal.eats) // true
}

/**
 * Св-ва асессоры (гетеры, сетеры) прототипа работают как методы - благодаря this они обращаются к наследнику и работают с его св-ми.
 */

{
    let user = {
        name: "John",
        surname: "Smith",

        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        },

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    let admin = {
        __proto__: user, // admin теперь наследник user
        isAdmin: true
    };

    alert(admin.fullName); // John Smith

    // срабатывает сеттер!
    admin.fullName = "Alice Cooper"; // (**)

    console.log(admin) // { isAdmin: true, name: 'Alice', surname: 'Cooper' }
    console.log(user) // { name: 'John', surname: 'Smith', fullName: [Getter/Setter] }
}

/**
 * this
 * прототипы никак не влияют на this.
 * (!) Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.
 * admin.fullName= в качестве this использует admin, а не user.
 */
{
    let animal = {
        walk() {
            if (!this.isSleeping) {
                alert(`I walk`);
            }
        },
        sleep() {
            this.isSleeping = true;
        }
    };

    let rabbit = {
        name: "White Rabbit",
        __proto__: animal
    };

   // модифицирует rabbit.isSleeping (this === rabbit)
    rabbit.sleep();

    alert(rabbit.isSleeping); // true
    alert(animal.isSleeping); // undefined
}

/**
 * Цикл for…in
 * Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта.
 * Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи встроенного метода obj.hasOwnProperty(key): он возвращает true, если у obj есть собственное, не унаследованное, свойство с именем key.
 */
{
    let animal = {
        eats: true
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    // Object.keys возвращает только собственные ключи
    alert(Object.keys(rabbit)); // jumps

    // for..in проходит и по своим, и по унаследованным ключам
    for(let prop in rabbit) alert(prop); // jumps, затем eats

    // Однако если мы не указываем __proto__  в объекте, цикл по прототипу не пройдет. Т.е. для обхода протипа должен быть установлен __proto__
    {
        const person = {name:"Alex",age:22}

        for(let value in person){
            console.log(value) // name age
        }
    }
}

/**
 * Object.getOwnPropertyNames (возвращает свойства, не лезет в прототип)
 */
{
    const person = {name:"Alex",age:22}

    console.log(Object.getOwnPropertyNames(person)) // [ 'name', 'age' ]
    console.log(Object.getOwnPropertyNames(person.__proto__)) //     ['constructor','__defineGetter__','__defineSetter__','hasOwnProperty','__lookupGetter__','__lookupSetter__','isPrototypeOf','propertyIsEnumerable','toString','valueOf','__proto__','toLocaleString']

}

/**
 * https://www.youtube.com/watch?v=rJsL21Lv3M8&t=1496s
 * Как методы попадают в прототип ? через вызов constructor
 * constructor есть у class и functions
 */
{
    console.log(Object.getOwnPropertyNames(person.__proto__.constructor)) // Разобрать отдельно constructor
}
