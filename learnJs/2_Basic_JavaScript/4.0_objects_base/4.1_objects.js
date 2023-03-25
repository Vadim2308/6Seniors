/**
 * Объекты – это структура данных (ассоциативные массивы) используются для хранения коллекций различных значений пары вида «(ключ, значение)»
 * Ассоциативный массив — абстрактный тип данных (интерфейс к хранилищу данных), позволяющий хранить пары вида «(ключ, значение)»
 * Объекты может быть создан с помощью синтасиса "литерал объекта" {…} || синтаксиса "конструктор объекта" new Object(), Object.create(), (ООП-й стиль программирования)
 */

/**
 * Ограничения на ключи объектов в JavaScript
 * Мы можем писать без кавычек не все ключи объектов, а только те, которые удовлетворяют следующим ограничениям:
 * они НЕ могут начинаться с цифры и НЕ могут содержать внутри себя дефис, пробел и тому подобные вещи.
 * Если строка нарушает ограничение, то ее нужно брать в кавычки. В следующем примере в часть ключей не удовлетворяет условиям и поэтому стоят в кавычках:
 */

{
    const book = new Object({ title: 'Война и мир', author: 'Лев Толстой' }) // тоже самое что и через {}
    const book2 = Object.create({ title: 'Война и мир', author: 'Лев Толстой' }) // Собственные свойства будут пустые. Засунет эти новые свойства в прототип. obj.__proto__ = { title: 'Война и мир', author: 'Лев Толстой'}
    const foo = () => 'foo';
    let user = {     // объект
        name: "John",  // под ключом "name" хранится значение "John"
        age: 30,        // под ключом "age" хранится значение 30
        "likes birds": true,
        [foo()]:'1' // 'foo:1'
    };
    // В объекте user сейчас находятся два свойства:
    // Первое свойство с именем "name" и значением "John".
    // Второе свойство с именем "age" и значением 30.
    // Объекты, созданные через фигурные скобки и через new Object() совершенно идентичны

    (user.isAdmin = true) || (user['isAdmin'] = true) // Добавление свойств в объект
    delete user.age || delete user['age'] // Удаление свойства.
    // Оператор delete это унарный оператор!
    // Динамическое удаление свойства
    const key = "age"
    delete user[key]

    let birdKey = "likes birds"
    user[birdKey] = true;// то же самое, что и user["likes birds"] = true;
}

/**
 * Объект, объявленный как константа, может быть изменён
 */
{
    const user = {
        name: "John"
    };
    user.name = "Pete"; // (*)
    alert(user.name); // Pete
    // Несмотря на то, что переменная user объявлена неизменяемой, свойства хранимого объекта можно менять.
    // Дело в том, что объект хранится по ссылке. Изменение внутреннего состояния не изменяет ссылку.
    user = {} //Error
}

/**
 * Вычисляемые свойства
 * Мы можем использовать квадратные скобки в литеральной нотации для создания вычисляемого свойства.
 */
{
    let fruit = 'apple';
    let bag = {
        [fruit]: 5, // имя свойства будет взято из переменной fruit
        [fruit + '_data']: 10, // apple_data: 10
    };
    console.log(bag.apple);
}
{
    // Сокращенный синтаксис при совпадающих переменных
    function makeUser(name, age) {
        return {
            name: name,
            age: age
        };
    }
    function makeUser2(name, age) {
        return {
            name,
            age
        };
    }
}
/**
 * Ограничения на имена свойств.
 * Нет никаких ограничений к именам свойств. Они могут быть в виде строк или символов
 * Все другие типы данных будут автоматически преобразованы к строке с помощью вызова метода toString()
**/
{
    // эти имена свойств допустимы
    let obj = {
        for: 1,
        let: 2,
        return: 3,
        ['name']:'Vadim', // => сконвертится в name: Vadim,
        [Number(false)]: 'count' // => сконвертится в 0: count,
    };
}
{
    let obj = {
        0: "Тест" // то же самое что и "0": "Тест"
    };
    // обе функции alert выведут одно и то же свойство (число 0 преобразуется в строку "0")
    alert( obj["0"] ); // Тест
    alert( obj[0] ); // Тест (то же свойство)
}
/**
 * Есть небольшой подводный камень, связанный со специальным свойством __proto__.
 * Мы не можем установить его в необъектное значение:
 */
{
    let obj = {};
    obj.__proto__ = 5; // присвоим число
    alert(obj.__proto__); // [object Object], значение - это объект, т.е. не то, что мы ожидали
}

/**
 * Проверка существования свойства, оператор «in»
 *
 */
{
    // Без оператора in
    let user = {};
    alert( user.noSuchProperty === undefined ); // true означает "свойства нет"
}
{
    // C оператором
    let user = { name: "John", age: 30 };
    alert( "age" in user ); // true, user.age существует
    alert( "blabla" in user ); // false, user.blabla не существует

    let user2 = { age: 30 };
    let key = "age";
    alert( key in user2 ); // true, имя свойства было взято из переменной key

    /**
     * Единственный случай, который показывает, что явное сравнение с undefined не всегда работает
     */
    let obj = {
        test: undefined
    };
    alert( obj.test ); //  выведет undefined, значит свойство не существует?
    alert( "test" in obj ); // true, свойство существует!
}
// Цикл "for..in"
{
    let user = {
        name: 'John',
        age: 30,
        isAdmin: true,
    };
    for (let key in user) {
        // тело цикла выполняется для каждого свойства объекта
        // ключи
        console.log(key); // name, age, isAdmin
        // значения ключей
        console.log(user[key]); // John, 30, true
    }
}

/**
 * Упорядочение свойств объекта
 * Короткий ответ: свойства упорядочены особым образом: свойства с целочисленными ключами сортируются по возрастанию, остальные располагаются в порядке создания.
 * Термин «целочисленное свойство» означает строку, которая может быть преобразована в целое число и обратно без изменений.
 */
{
    // Math.trunc - встроенная функция, которая удаляет десятичную часть
    alert( String(Math.trunc(Number("49"))) ); // "49", то же самое ⇒ свойство целочисленное
    alert( String(Math.trunc(Number("+49"))) ); // "49", не то же самое, что "+49" ⇒ свойство не целочисленное
    alert( String(Math.trunc(Number("1.2"))) ); // "1", не то же самое, что "1.2" ⇒ свойство не целочисленное
}

{
    let codes = {
        "49": "Германия",
        "41": "Швейцария",
        "44": "Великобритания",
        // ..,
        "1": "США"
    };
    for (let code in codes) {
        alert(code); // 1, 41, 44, 49
    }

    // Чтобы выводить в нужном порядке, можно сделать так:
    let codes2 = {
        "+49": "Германия",
        "+41": "Швейцария",
        "+44": "Великобритания",
        // ..,
        "+1": "США"
    };
    for (let code in codes2) {
        alert( +code ); // 49, 41, 44, 1
    }
}

/**
 * Сравнения объектов
 * Операторы равенства == и === для объектов работают одинаково
 * Объекты — ссылочный тип данных
 * При сравнении двух объектов JavaScript сравнивает не значения свойств этих объектов, а адреса в памяти
 */
{
    // создаётся один объект
    const book = { title: 'Дюна' }
   // создаётся другой объект
    const anotherBook = { title: 'Дюна' }
    console.log(book === anotherBook) // false
}
{
    // создаётся один объект
    const book = { title: 'Дюна' }
    // в anotherBook записывается ссылка на объект
    const anotherBook = book
    console.log(book === anotherBook)// true
}

/**
 * Object.getOwnPropertyNames vs Object.keys
 * Object.getOwnPropertyNames(a)возвращает все собственные свойства объекта.
 * Object.keys(a)возвращает все перечисляемые собственные свойства.
 */
{
    const a = {};
    Object.defineProperties(a, {
        one: {enumerable: true, value: 1},
        two: {enumerable: false, value: 2},
    });
    Object.keys(a); // ["one"]
    Object.getOwnPropertyNames(a); // ["one", "two"]
}