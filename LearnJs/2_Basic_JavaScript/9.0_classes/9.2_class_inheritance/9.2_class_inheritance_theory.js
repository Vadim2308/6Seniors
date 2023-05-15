/**
 * Наследование классов, extends
 * Классы могут быть созданы на базе других классов (наследованы) - с помощью `extends`
 * Таким образом, мы можем добавить новый функционал к уже существующему.
 */
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        run(speed) {
            this.speed = speed;
            console.log(`${this.name} бежит со скоростью ${this.speed}.`);
        }
        stop() {
            this.speed = 0;
            console.log(`${this.name} стоит неподвижно.`);
        }
    }

    let animal = new Animal("Мой питомец");

    class Rabbit extends Animal {
        hide() {
            console.log(`${this.name} прячется!`);
        }
    }

    let rabbit = new Rabbit("Белый кролик");

    rabbit.run(5); // Белый кролик бежит со скоростью 5.
    rabbit.hide(); // Белый кролик прячется!
}

/**
 * После extends разрешены любые выражения
 * Синтаксис создания класса допускает указывать после extends не только класс, но и любое выражение.
 */
{
    function f(phrase) {
        return class {
            sayHi() { console.log(phrase); }
        };
    }

    class User extends f("Привет") {}
    new User().sayHi(); // Привет
}

/**
 * Переопределение методов
 * Eсли мы укажем собственный метод, например stop(), то он будет использован вместо него:
 */
{
    class Base {
        stop(){
            console.log('stop in Base')
        }
    }
    class Ins extends Base {
        stop(){
            console.log('stop in Ins')
        }
    }
    new Ins().stop() // stop in Ins
}

/**
 * super
 * super.method(...) вызывает родительский метод.
 * super(...) для вызова родительского конструктора (работает только внутри нашего конструктора!).
 */
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        run(speed) {
            this.speed = speed;
            console.log(`${this.name} бежит со скоростью ${this.speed}.`);
        }
        stop() {
            this.speed = 0;
            console.log(`${this.name} стоит неподвижно.`);
        }

    }
    class Rabbit extends Animal {
        hide() {
            console.log(`${this.name} прячется!`);
        }
        stop() {
            super.stop(); // вызываем родительский метод stop
            this.hide(); // и затем hide
        }
        test(){
            setTimeout(() => super.stop(), 1000); // стрелочные функции не имеют super. При обращении к super стрелочной функции он берётся из внешней функции
            // setTimeout(function() { super.stop() }, 1000); // была б ошибка
        }
    }

    let rabbit = new Rabbit("Белый кролик");

    rabbit.run(5); // Белый кролик бежит со скоростью 5.
    rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!
}

/**
 * Переопределение конструктора
 * Согласно спецификации, если класс расширяет другой класс и не имеет конструктора, то автоматически создаётся такой «пустой» конструктор:
 * Так будет происходить, пока мы не создадим собственный конструктор.
 */
{
    class Rabbit extends Animal {
        // генерируется для классов-потомков, у которых нет своего конструктора
        constructor(...args) {
            super(...args);
        }
    }
}
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        // ...
    }

    class Rabbit extends Animal {
        constructor(name, earLength) {
           //super(name)
            this.speed = 0;
            this.name = name;
            this.earLength = earLength;
        }
    }

    // Не работает! (!) Конструкторы в наследуемых классах должны обязательно вызывать super(...), и (!) делать это перед использованием this..
    let rabbit = new Rabbit("Белый кролик", 10); // Error: this is not defined.
    /**
     * Почему не работает ?
     *  1. В наследующем классе соответствующая функция-конструктор помечена специальным внутренним свойством [[ConstructorKind]]:"derived"
     *  2. Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его this. Т.е this === {}
     *  3. Когда запускается конструктор унаследованного класса, он этого не делает. Он ждет пока это сделает коструктор родителя. Поэтому если этого не сделать, this просто не будет создан)
     */
}

/**
 * родительский конструктор ВСЕГДА использует своё собственное значение поля, а не переопределённое
 * Т.е. если есть класс, который наследуется, при обращении к полю мы будем использовать поле родителя. Если метод - то будем обращаться к переопределенному полю
 */
{
    class Car {
        name = 'empty'
        constructor() {
            console.log(this.name)
        }
    }
    class BMW extends Car {
        name= "BMW"
        constructor() {
            super()
            console.log(this.name)
        }
    }
    new BMW() // 'empty' 'BMW'

    {
        class Animal {
            name = 'animal';
            constructor() {
                console.log(this.name);
            }
        }
        class Rabbit extends Animal {
            name = 'rabbit';
            // Вызывается неявно constructor(){super()}
        }

        new Animal(); // animal
        new Rabbit(); // animal
    }

    /**
     * Но с методами по другому
     * Причина в порядке инициализации полей. Поле класса инициализируется
     *      - Перед конструктором для базового класса (который ничего не расширяет),
     *      - Сразу после super() для производного класса.
     * Поэтому, new Rabbit() выполняется метод super(). После этого инициализируется поле name = 'rabbit';
     * На момент выполнения родительского конструктора поля   name = 'rabbit'; еще не было, поэтому идет обращение к родительскому полю
     */
    {
        class Animal {
            constructor() {
                this.showName()
            }
            showName(){
                console.log('animal')
            }
        }

        class Rabbit extends Animal {
            showName(){
                console.log('Rabbit')
            }
        }

        new Animal(); // animal
        new Rabbit(); // Rabbit
    }
}

/**
 * [[HomeObject]]
 * Когда функция объявлена как метод внутри класса или объекта, ему присваивается скрытое св-во `[[HomeObject]]`, которое всегда ссылается на объект, в котором был объявлен метод.
 * Затем super использует его, чтобы получить прототип родителя и его методы.
 * метод создается только с синтаксисом - `method() {}`, `method: function() {}` - не работает, тк не создает св-во `[[HomeObject]]`
 */
{
    let animal = {
        name: "Животное",
        eat() {         // animal.eat.[[HomeObject]] == animal
            console.log(`${this.name} ест.`);
        }
    };

    let rabbit = {
        __proto__: animal,
        name: "Кролик",
        eat() {         // rabbit.eat.[[HomeObject]] == rabbit
            super.eat();
        }
    };

    let longEar = {
        __proto__: rabbit,
        name: "Длинноух",
        eat() {         // longEar.eat.[[HomeObject]] == longEar
            super.eat();
        }
    };

   // работает верно
    longEar.eat();  // Длинноух ест.
}