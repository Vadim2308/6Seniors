/**
 * Оператор instanceof позволяет проверить, принадлежит ли объект указанному классу, с учётом наследования.
 * Оператор instanceof просматривает для проверки цепочку прототипов.
 */
{
    class Rabbit {}
    let rabbit = new Rabbit();
    alert( rabbit instanceof Rabbit ); // true
}
{
    // вместо класса
    function Rabbit() {}
    alert( new Rabbit() instanceof Rabbit ); // true
}
{
    let arr = [1, 2, 3];
    alert( arr instanceof Array ); // true
    alert( arr instanceof Object ); // true arr также принадлежит классу Object, потому что Array наследует от Object.
}

/**
 * Алгоритм работы obj instanceof Class
 */
{
    /** 1)
     * Если имеется статический метод Symbol.hasInstance, тогда вызвать его: Class[Symbol.hasInstance](obj).
     * Он должен вернуть либо true, либо false, и это конец. Это как раз и есть возможность ручной настройки instanceof.
     */
    class Animal {
        static [Symbol.hasInstance](entity) {
            console.log(entity) // entity === obj
            if (entity.canEat) return true;
        }
    }
    let obj = { canEat: true };
    console.log(obj instanceof Animal); // true: вызван Animal[Symbol.hasInstance](obj)

    /** 2)
     * используется стандартная логика: проверяется, равен ли Class.prototype одному из прототипов в прототипной цепочке obj.
     */
    const ent = {}
    //   ent.__proto__ === Class.prototype?
    //   ent.__proto__.__proto__ === Class.prototype?
    //   ent.__proto__.__proto__.__proto__ === Class.prototype?
    // если какой-то из ответов true - возвратить true
    // если дошли до конца цепочки - false

    {
        class Animal {}
        class Rabbit extends Animal {}

        let rabbit = new Rabbit();
        console.log(rabbit instanceof Animal); // true

        // rabbit.__proto__ === Animal.prototype (нет совпадения)
        // rabbit.__proto__.__proto__ === Animal.prototype (совпадение!)
    }
}

/**
 * Метод `objA.isPrototypeOf(objB)` - проверяет есть ли objA в прототипной цепочке objB
 * Аналогично (ExtendedClass.prototype.isPrototypeOf(BaseClass))
 */
{
    class BaseClass{}
    class ExtendedClass extends BaseClass{}
    console.log(BaseClass.isPrototypeOf(ExtendedClass)) // true BaseClass содержится в прототипе ExtendedClass
    console.log(Object.prototype.isPrototypeOf({})) // true
    console.log(Object.prototype.isPrototypeOf([])) // true
    console.log(Object.prototype.isPrototypeOf(()=>{})) // true
}

/**
 * Symbol.toStringTag
 * Поведение метода объектов toString можно настраивать, используя специальное свойство объекта Symbol.toStringTag.
 * Если мы хотим вернуть конкретный тип вместо проверки, можно использовать `{}.toString.call()` (позаимствовать из прототипа объекта)
 */
{
    const dog = [];
    const cat = {};
    const animal = { [Symbol.toStringTag]: 'Animal'}

    console.log(
        {}.toString.call(cat),                                    // Output: '[object Object]'
        {}.toString.call(dog),                                    // Output: '[object Array]'
        {}.toString.call(animal),                                 // Output: '[object Animal]'
    );
}
{
    let user = {
        [Symbol.toStringTag]: "User"
    };
    alert(Object.prototype.toString.call(user) ); // [object User]
}

// Task
// Почему instanceof в примере ниже возвращает true? Мы же видим, что a не создан с помощью B().
{
    function A() {}
    function B() {}

    A.prototype = B.prototype = {};

    let a = new A();

    alert(a instanceof B); // true. Потому что a.__proto__ == B.prototype и a.__proto__ == A.prototype. Ссылаются на один и тот же объект
}