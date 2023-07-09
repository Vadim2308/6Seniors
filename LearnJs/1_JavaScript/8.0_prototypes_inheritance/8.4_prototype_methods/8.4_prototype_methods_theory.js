/**
 * Свойство __proto__ считается устаревшим, и по стандарту оно должно поддерживаться только браузерами
 */

/**
 * Современные методы. Эти методы нужно использовать вместо __proto__.
 * Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto, и необязательными дескрипторами свойств descriptors.
 * Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj. То же самое, что и геттер __proto__
 * Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto. То же самое, что и сеттер __proto__
 */

{
    let animal = {
        eats: true
    };

    // создаём новый объект с прототипом animal
    let rabbit = Object.create(animal); // rabbit === {}

    console.log(rabbit.eats); // true (Из прототипа)

    console.log(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit ({eats: true})

    Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}
}

/**
 * Создание объекта с помощью дескрипторов
 */
{
    let animal = {
        eats: true
    };

    let rabbit = Object.create(animal, {
        jumps: { // Это свойство будет записано в собственно-перечисляемые свойства. Свойство eats будет в прототипе
            value: true
        }
    });

    console.log(rabbit.jumps); // true

    const o = Object.create(Object.prototype, {foo: {value: 'zepa', writable: true, configurable: true}, bar: {configurable: false, get() {return this.foo} } });
    console.log(o.bar)

    /**
     * Полное копирование c дескрипторами
     */
    {
        const obj = {name:'Some obj',__proto__:{car:'BMW'}}
        let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

        // Object.getPrototypeOf(obj) - {car: 'BMW'}
        // Object.getOwnPropertyDescriptors(obj) {name:{value: 'Some obj', writable: true, enumerable: true, configurable: true}}
    }
}

/**
 * "Простейший" объект
 * Если мы создаем динамически изменяющиеся ключи в объекте ([key]: 'value'), нужно следить, чтобы нельзя было вводить __proto__ как ключ - это вызовет ошибку
 */
{
    let obj = {};

    let key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    console.log(obj[key]); // [object Object], не "some value"! Т.к. __proto__ должен быть либо объектом, либо null. Присвоение просто проигнорируется

    // Можно законтрить через создание пустого объекта, без прототипов
    // Теперь свойство __proto__ обрабатывается как обычное свойство
    // Это может быть полезно если нам не нужны унаследованные свойства, методы, в теории может апнуться перфоманс (хотя сомнительно), и как пример это использование в качестве хещ таблицы, где ключи и значения могут быть произвольными значениями. При этом нет риска конфликтов с унаследованными свойствами или методами
    {
        let obj = Object.create(null);

        let key = prompt("What's the key?", "__proto__");
        obj[key] = "some value";

        console.log(obj[key]); // "some value"

        // Недостаток в том, что у таких объектов не будет встроенных методов объекта, таких как toString:
        console.log(obj); // Ошибка (no toString)

        // Однако большая часть методов, связанных с объектами, имеют вид Object.something(...).
        // Подобные методы не находятся в прототипе, так что они продолжат работать для таких объектов:{
        {
            let chineseDictionary = Object.create(null);
            chineseDictionary.hello = "你好";
            chineseDictionary.bye = "再见";
            console.log(Object.keys(chineseDictionary)); // hello,bye
        }
    }
}

/**
 * Еще методы
 * Object.keys(obj) / Object.values(obj) / Object.entries(obj) – возвращают массив всех перечисляемых собственных строковых ключей/значений/пар ключ-значение.
 * Object.getOwnPropertySymbols(obj) – возвращает массив всех собственных символьных ключей.
 * Object.getOwnPropertyNames(obj) – возвращает массив всех собственных строковых ключей.
 * Reflect.ownKeys(obj) – возвращает массив всех собственных ключей.
 * obj.hasOwnProperty(key): возвращает true, если у obj есть собственное (не унаследованное) свойство с именем key.
 */