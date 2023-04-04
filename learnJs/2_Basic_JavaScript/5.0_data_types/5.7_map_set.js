/**
 * Map – это коллекция ключ/значение, как и Object.
 * Но основное отличие в том, что Map позволяет использовать ключи любого типа.
 */

/**
 * Методы и свойства:
     * new Map() – создаёт коллекцию.
     * map.set(key, value) – записывает по ключу key значение value.
     * map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
     * map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
     * map.delete(key) – удаляет элемент (пару «ключ/значение») по ключу key.
     * map.clear() – очищает коллекцию от всех элементов.
     * map.size – возвращает текущее количество элементов.
 */

{
    let map = new Map([[1,2]]);

    map.set("1", "str1");    // строка в качестве ключа
    map.set(1, "num1");      // цифра как ключ
    map.set(true, "bool1");  // булево значение как ключ

    // помните, обычный объект Object приводит ключи к строкам?
    // Map сохраняет тип ключей, так что в этом случае сохранится 2 разных значения:
    console.log(map.get(1)); // "num1"
    console.log(map.get("1")); // "str1"
    console.log(map.size); // 3
}

/**
 * Цепочка вызовов. Добавлять элементы можно либо через set, либо цепочкой вызовов.
 */
{
    const map = new Map();
    map.set("1", "str1")
        .set(1, "num1")
        .set(true, "bool1");
}

// Установка нового ключа способом map[key] - не совсем правильный способ использования Map. Это ведёт ко всем соответствующим ограничениям (только строки/символьные ключи и так далее).

/**
 * Использование объектов в качестве ключей – одна из наиболее заметных и важных функций Map
 */
{
    let john = { name: "John" };
    // давайте сохраним количество посещений для каждого пользователя
    let visitsCountMap = new Map();
    // объект john - это ключ для значения в объекте Map
    visitsCountMap.set(john, 123);
    console.log(visitsCountMap.get(john)); // 123
}

/**
 * Чтобы сравнивать ключи, объект Map использует алгоритм SameValueZero. https://tc39.es/ecma262/#sec-samevaluezero
 * Это почти такое же сравнение, что и ===, с той лишь разницей, что NaN считается равным NaN.
 * Map позволяет использовать в качестве ключа любое значение: объект, функцию, примитивные значения и даже null, undefined и NaN.
 */
{
    const func = (name) => `Hello, ${name}`
    const obj = { foo: 'bar' }

    const map = new Map()

    map.set(func, 'func value')
    map.set(obj, 'object value')
    map.set(undefined, 'undefined value')
    map.set(NaN, 'NaN value')
    map.set(null, 'null value')

    console.log(map.get(func))
    // func value

    console.log(map.get(obj))
    // object value

    console.log(map.get(undefined))
    // undefined value

    console.log(map.get(NaN))
    // NaN value

    console.log(map.get(null))
   // null value

}

{
    const map = new Map();

    const v1 = NaN;
    const v2 = NaN;

    map.set(v1, 'v1');
    map.set(v2, 'v2');

    console.log(map.size); // 1
    console.log(map.get(v1)); // v2
}

/**
 * Перебор Map
     * map.keys() – возвращает итерируемый объект (MapIterator) по ключам,
     * map.values() – возвращает итерируемый объект (MapIterator) по значениям,
     * map.entries() – возвращает итерируемый объект (MapIterator) по парам вида [ключ, значение], этот вариант используется по умолчанию в for..of.
 */

/**
 * Пример итерируемого объекта MapIterator
 */

{
    // [[Entries]] : {'огурец', 'помидор', 'лук'}
    // [[Prototype]]: Map Iterator
    // [[IteratorHasMore]]:true
    // [[IteratorIndex]]:0
    // [[IteratorKind]]:"keys"
}

{
    let recipeMap = new Map([
        ["огурец", 500],
        ["помидор", 350],
        ["лук",    50]
    ]);

    // перебор по ключам (овощи)
    for (let vegetable of recipeMap.keys()) {
        console.log(vegetable); // огурец, помидор, лук
    }

    // перебор по значениям (числа)
    for (let amount of recipeMap.values()) {
        console.log(amount); // 500, 350, 50
    }

    // перебор по элементам в формате [ключ, значение]
    for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
        console.log(entry); // [огурец,500] (и так далее)
    }

    /**
     * Есть универсальный метод Array.from, который принимает итерируемый объект и возвращает «настоящий» Array.
     */
    const keys = Array.from(recipeMap.keys()); // ["огурец", "помидор", "лук"]
    const values = Array.from(recipeMap.values()); // [500, 350, 50]
    const array = Array.from(recipeMap.entries()); // [["огурец", 500],["помидор", 350],["лук",50]]
}

/**
 * forEach
 */
{
    let recipeMap = new Map([
        ["огурец", 500],
        ["помидор", 350],
        ["лук",    50]
    ]);
    recipeMap.forEach((value, key, map) => {
        console.log(`${key}: ${value}`); // огурец: 500 и так далее
    });
}

/**
 * Object.entries: Как сделать Map из Object
 */
{
    let obj = {
        name: "John",
        age: 30
    };

    const entries = Object.entries(obj) // [ ["name","John"], ["age", 30] ]
    let map = new Map(entries);
    console.log( map.get('name') ); // John
}

/**
 * Object.fromEntries: Как сделать Object из Map
 */
{
    // Пример работы Object.fromEntries
    let prices = Object.fromEntries([
        ['banana', 1],
        ['orange', 2],
        ['meat', 4]
    ]);
    // prices = { banana: 1, orange: 2, meat: 4 }
    console.log(prices.orange); // 2
}
{
    let map = new Map();
    map.set('banana', 1);
    map.set('orange', 2);
    map.set('meat', 4);

    let obj = Object.fromEntries(map.entries()); // || Object.fromEntries(map) // создаём обычный объект

    // готово!
    // obj = { banana: 1, orange: 2, meat: 4 }

    console.log(obj.orange); // 2
}

/**
 * Объект Set – это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться только один раз.
     * new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
     * set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
     * set.delete(value) – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
     * set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
     * set.clear() – удаляет все имеющиеся значения.
     * set.size – возвращает количество элементов в множестве.
 */

/**
 *  При повторных вызовах set.add() с одним и тем же значением ничего не происходит, за счёт этого как раз и получается, что каждое значение появляется один раз.
 */

{
    let set = new Set(); // Принимает плоский массив элементов или null или пустое значение

    let john = { name: "John" };
    let pete = { name: "Pete" };
    let mary = { name: "Mary" };

    // считаем гостей, некоторые приходят несколько раз
    set.add(john);
    set.add(pete);
    set.add(mary);
    set.add(john);
    set.add(mary);


    console.log(set.size); // set хранит только 3 уникальных значения

    for (let user of set) {
        console.log(user.name); // John (потом Pete и Mary)
    }
}

/**
 * Нюансы по уникальности new Set(). Для соблюдения уникальности не примитивов, необходимо добавлять объекты по ссылке
 */
{
    const uniq = new Set();
    uniq.add({ name: "Vadim" }).add({ name: "Vadim" }).add({ name: "Oleg" }).add({ name: "Oleg" });
    for (let user of uniq) {
        console.log(user.name); // Vadim Vadim Oleg Oleg
    }
}

/**
 * Перебор объекта Set
 */
{

    let set = new Set(["апельсин", "яблоко", "банан"]);

    for (let value of set) console.log(value);

    // то же самое с forEach:
    set.forEach((value, valueAgain, set) => {
        console.log({ value, valueAgain }); // valueAgain === value. Это сделано для совместимости с объектом Map, в котором колбэк forEach имеет 3 аргумента.
    });
}

/**
 * Методы new Set()
     * set.keys() – возвращает перебираемый объект (SetIterator) для значений,
     * set.values() – то же самое, что и set.keys(), присутствует для обратной совместимости с Map,
     * set.entries() – возвращает перебираемый объект (SetIterator) для пар вида [значение, значение], присутствует для обратной совместимости с Map
 */

/**
 * Пример SetIterator
 */

{
        // [[Entries]]:
        //     0:"апельсин"
        //     1:"яблоко"
        //     2:"банан"
        // [[Prototype]]:Set Iterator
        // [[IteratorHasMore]]:true
        // [[IteratorIndex]]:0
        // [[IteratorKind]]:"values"
}

/**
 * С помощью Set можно легко получить массив уникальных элементов из массива неуникальных с помощью конструктора и спред-синтаксиса:
 */
{
    const nonUnique = [1, 2, 3, 4, 5, 4, 5, 1, 1]
    const uniqueValuesArr = [...new Set(nonUnique)]
    console.log(uniqueValuesArr)  // [1, 2, 3, 4, 5]
}