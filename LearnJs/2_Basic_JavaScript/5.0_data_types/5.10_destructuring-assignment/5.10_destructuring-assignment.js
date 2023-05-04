/**
 * Links:
 *  1. https://habr.com/ru/companies/otus/articles/594541/
 */


/**
 * Деструктурирующее присваивание – это специальный синтаксис, который позволяет нам «распаковать» любые ПЕРЕБИРАЕМЫE объекты. (т.е. реализован Symbol.iterator)
 */

// Деструктуризация массива
// let [item1 = default, item2, ...rest] = array
{
    let arr = ["Ilya", "Kantor"];
    let [firstName, surname] = arr;
    [v1, v2] = arr; //Равносильно вышестоящему. Можно опустить ключевое слово "let"
    {
        let [firstName, surname] = "Ilya Kantor".split(' ');
    }
    console.log(firstName); // Ilya
    console.log(surname);  // Kanto
}

// Можно пропустить переменную, указав 'холостую' запятую
{
    const [v1, , v2] = 'Cool Man Nice Code'.split(' ');
    console.log(v1);    // Output: 'Cool'
    console.log(v2)    // Output: 'Nice'
}

// Работает с любым перебираемым объектом с правой стороны
{
    let [a, b, c] = "Vadim"; // V a d
    let [one, two, three] = new Set([1, 2, 3]);
}

// Можно деструктурирующе присваивать св-ва объекту
// let {prop: varName = default, ...rest} = object
{
    const obj = {};
    [obj.name, obj.value] = 'Cool Man Nice Code'.split(' ');
    console.log(obj);     // Output: { name: 'Cool', value: 'Man' }
}

// entries
{
    let user = {
        name: "John",
        age: 30
    };

    for (let [key, value] of Object.entries(user)) {
        console.log(`${key}:${value}`); // name:John, затем age:30
    }
}

// Map
{
    let user = new Map();
    user.set("name", "John");
    user.set("age", "30");

    // const { name, age } = user; => ТАК РАБОТАТЬ НЕ БУДЕТ! undefined undefined
    // const [name, age] = user; => name=["name", "John"]   age=["age", "30"]

    // Map перебирает как пары [ключ, значение], что очень удобно для деструктурирования
    for (let [key, value] of user) { // аналогично user.entries()
        console.log(`${key}:${value}`); // name:John, затем age:30
    }
}
// Можно поменять переменные местами без буфера
{
    let j = 'jojo';
    let n = 'naruto';
    let o = 'onePeace';
    [j, n, o] = [n, o, j];
    console.log(j, n, o);      // Output: 'naruto' 'onePeace' 'jojo'
}

// Rest params
{
    let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    // rest это массив элементов, начиная с 3-го
    console.log(rest[0]); // Consul
    console.log(rest[1]); // of the Roman Republic
    console.log(rest.length); // 2
}

// Значения по умолчанию
{
    let [firstName, surname] = [];

    console.log(firstName); // undefined
    console.log(surname); // undefined

    // значения по умолчанию
    let [name = "Guest", sur = "Anonymous"] = ["Julius"];

    console.log(name);    // Julius (из массива)
    console.log(sur); // Anonymous (значение по умолчанию)
}

// Деструктуризация объекта

{
    const options = {
        title: "Menu",
        width: 100,
        height: 200,
        data: { nap: 3 },
    };

    const {title, width, height,data} = options;

    // Переименование
    {
        // { sourceProperty: targetVariable (Либо найдет существующую либо создаст новую) }
        let {width: w, height: h, title:t} = options;
    }
    // Можно совмещать с дефолтным значением
    {
        let {width: w = 100, height: h = 200, title} = options;
    }

    options.data.nap = 10

    console.log(title);  // Menu
    console.log(width);  // 100
    console.log(height); // 200
    console.log(data); // { nap: 10 }
}

// Rest в объектах 
{
    let options = {
        title: "Menu",
        height: 200,
        width: 100
    };

    // title = свойство с именем title
    // rest = объект с остальными свойствами
    let {title, ...rest} = options;

    // сейчас title="Menu", rest={height: 200, width: 100}
    console.log(rest.height);  // 200
    console.log(rest.width);   // 100
}

// JS видит `{}` вне выражения (без let, const и тп в начале) как блок кода. Поэтому иногда приходится использовать `()`
{
    let phone = { q: 12345678910, w: 'huawei', e: 'red',};
    let phoneNumber = null;
    let model = null;
    let color = null;

    ({q: phoneNumber, w: model, e: color} = phone);
    console.log(phoneNumber, model, color);     // Output: 12345678910 'huawei' 'red'
    console.log({phoneNumber, model, color});     // Output: { phoneNumber: 12345678910, model: 'huawei', color: 'red' }
    console.log([phoneNumber, model, color]);     // Output: [ 12345678910, 'huawei', 'red' ]

    {
        let title, width, height;
        ({title, width, height} = {title: "Menu", width: 200, height: 100});
        console.log( title ); // Menu
    }
}

// Для вложенных объектов/массивов будет вложенная деструктуризация

{
    let options = {
        size: {
            width: 100,
            height: 200
        },
        items: ["Cake", "Donut"],
        extra: true
    };
    
    let {
        size: { 
            width,
            height
        },
        items: [item1, item2],
        title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
    } = options;

    console.log(title);  // Menu
    console.log(width);  // 100
    console.log(height); // 200
    console.log(item1);  // Cake
    console.log(item2);  // Donut
}

/**
 * Ссылки.
 */
{
    const a = {
        name:{value:6}
    }
    let {name} = a
    name = {value:null}
    console.log({a:a.name,name}) // { a: { value: 6 }, name: { value: null } }

    const profile = {
        firstName: "Oluwatobi",
        lastName: "Sofela",
        website: "codesweetly.com"
    };

    /**
     * мы сказали компьютеру, чтобы тот извлек значения из объекта profile и записал их в переменные, указанные слева от оператора присваивания.
     * В результате JavaScript парсит объект profile и копирует его первое значение ("Oluwatobi") в первую переменную деструктурирующего объекта (firstName).
     * Наконец JavaScript копирует третье значение из объекта profile ("codesweetly.com") в третью переменную (website) деструктурирующего объекта.
     * Отметим,значения ключей представляют собой НОВЫЕ ПЕРЕМЕННЫЕ.
     */
    const { firstName, lastName, website } = profile;

}

/**
 * Синтаксис диструктурирущего присваивания в фунциях
 */
{
    // function({
    //  incomingProperty: varName = defaultValue
    //  })
}
// ---------------------------------------------------------------------------------------------------------------------
// Если много параметров, можно не передавать все параметры в функцию, а изначально объявить их как св-ва объекта и передавать неполный объект
// тогда не важна очередность и наличие параметров - они будут подтягиваться по имени
function showMenu({title = 'menu', width = 100, height = 200} = {}) {
    console.log(`${title} ${width} ${height}`);
}
showMenu({width: 500});     // Output: 'menu 500 200'
showMenu();     // Output: 'menu 100 200'
showMenu(undefined);     // Output: 'menu 100 200'
showMenu(null);     // Output: Error: Cannot read properties of null (reading 'title')