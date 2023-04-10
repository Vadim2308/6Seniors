/**
 * Object.keys, values, entries
 * Для простых объектов доступны следующие методы:
     * Object.keys(obj) – возвращает массив ключей.
     * Object.values(obj) – возвращает массив значений.
     * Object.entries(obj) – возвращает массив пар [ключ, значение].
 */

{
    let user = {
        name: "John",
        age: 30
    };
    Object.keys(user) //["name", "age"]
    Object.values(user)  //["John", 30]
    Object.entries(user)  //[ ["name","John"], ["age",30] ]
}

/**
 * Object.keys/values/entries/for..in игнорируют символьные свойства
 * Но если требуется учитывать и символьные ключи, то для этого существует отдельный метод Object.getOwnPropertySymbols, возвращающий массив только символьных ключей.
 * Также, существует метод Reflect.ownKeys(obj), который возвращает все ключи.
 */

/**
 * Object.fromEntries
 */

{
    let prices = {
        banana: 1,
        orange: 2,
        meat: 4,
    };

    let doublePrices = Object.fromEntries(
        // преобразовать в массив, затем map, затем fromEntries обратно объект
        Object.entries(prices).map(([key, value]) => [key, value * 2])
    );

    alert(doublePrices.meat); // 8
}