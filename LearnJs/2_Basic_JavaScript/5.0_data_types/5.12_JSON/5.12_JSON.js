/**
 * JSON-stringify позволяет конвертнуть объект в строку, например для передачи по сети
 * JSON (JavaScript Object Notation) – это общий формат для представления значений и объектов.
 */
{
    let user = {
        name: "John",
        age: 30,

        toString() {
            return `{name: "${this.name}", age: ${this.age}}`;
        }
    };
    console.log(String(user)); // {name: "John", age: 30}
}

/**
 * JavaScript предоставляет методы:
     * JSON.stringify для преобразования объектов в JSON.
     * JSON.parse для преобразования JSON обратно в объект.
 */

/**
 * JSON.stringify
 * Сигнатура: JSON.stringify(value, [replacer, space])
 * Метод JSON.stringify(student) берёт объект и преобразует его в строку.
 * Полученная строка json называется JSON-форматированным или сериализованным объектом.
 * Строки используют двойные кавычки. Никаких одинарных кавычек или обратных кавычек в JSON. 'John' становится "John".
 * Имена свойств объекта также заключаются в двойные кавычки.  age:30 становится "age":30
 * JSON.stringify может быть применён и к примитивам.
 */

/**
 * JSON поддерживает следующие типы данных:
     * Объекты { ... }
     * Массивы [ ... ]
     * Примитивы:
         * строки,
         * числа,
         * логические значения true/false,
         * null.
 */

{
    JSON.stringify(undefined) => undefined

    console.log( JSON.stringify(1) ) // строка 1
    // строка в JSON по-прежнему остаётся строкой, но в двойных кавычках
    console.log( JSON.stringify('test') ) // "test"
    console.log( JSON.stringify(true) ); // строка true
    console.log( JSON.stringify([1, 2, 3]) ); // строка [1,2,3]
}

/**
 * Значения, которые не пропускаются JSON-м
     * Свойства-функции (методы).
     * Символьные ключи и значения.
     * Свойства, содержащие undefined.
     * JSON не поддерживает комментарии. Добавление комментария в JSON делает его недействительным.
 */
{
    let user = {
        sayHi() { // будет пропущено
            console.log("Hello");
        },
        [Symbol("id")]: 123, // также будет пропущено
        something: undefined // как и это - пропущено
    };
    console.log( JSON.stringify(user) ); // {} (пустой объект)
}

/**
 * Вложенные объекты также конвертятся без проблем
 */
{
    let meetup = {
        title: "Conference",
        room: {
            number: 23,
            participants: ["john", "ann"]
        }
    };

    console.log( JSON.stringify(meetup) );
    /*  вся структура преобразована в строку:  {"title":"Conference","room":{"number":23,"participants":["john","ann"]}} */
}

/**
 * НЕ должно быть циклических ссылок
 */
{
    let room = {
        number: 23
    };

    let meetup = {
        title: "Conference",
        participants: ["john", "ann"]
    };

    meetup.place = room;       // meetup ссылается на room
    room.occupiedBy = meetup; // room ссылается на meetup

    JSON.stringify(meetup); // Ошибка: Преобразование цикличной структуры в JSON

    // room.occupiedBy ссылается на meetup, и meetup.place ссылается на room */
}


/**
 * `JSON.stringify(value, [replacer, space]?)` - метод для преобразования объектов в JSON.
 * replacer - Массив свойств или функция соответствия function(key, value) для исключения ненужных св-в (работает в т.ч на вложенные объекты).
 * space - число отступов, для форматирования, можно в виде строки
 *    Вариант 1 - JSON.stringify(value, null, '  '). ==> отступ в 2 пробела
 *    Вариант 2 - JSON.stringify(value, null, 2).  ==> отступ в 2 пробела
  */

const person = {
    name: 'Vadim',
    age: 29,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    xos: null,
    subObj: { message: 'hello', description: 'it\'s sub'},
};

    let toJson = JSON.stringify(person);
    console.log(toJson); // Output: {"name":"Vadim","age":29,"isAdmin":false,"courses":["html","css","js"],"xos":null,"subObj":{"message":"hello","description":"it's sub"}}  (string)
    toJson = JSON.stringify(person, ['name', 'age', 'isAdmin'], '     ');
    console.log(toJson);
/**
 * {
 *        "name": "Vadim",
 *        "age": 29,
 *        "isAdmin": false
 * }
  */

    console.log(JSON.parse(toJson));
/**
 * {
 *     "name": "Vadim",
 *     "age": 29,
 *     "isAdmin": false
 * }
 */

/**
 * Для вложенных объектов надо указать путь. Просто меssage нельзя указать
 */
console.log(JSON.stringify(person, ["subObj", 'message'])) // console.log(JSON.stringify(person, ["subObj", 'message']))
console.log(JSON.parse('{"name":3}')) // Объект { name: 3 }


/**
 * Пользовательский «toJSON»
 * Как и toString для преобразования строк, объект может предоставлять метод toJSON для преобразования в JSON.
 * JSON.stringify автоматически вызывает его, если он есть.
 */
{
    let room = {
        number: 23
    };

    let meetup = {
        title: "Conference",
        date: new Date(Date.UTC(2017, 0, 1)),
        room
    };

    console.log( JSON.stringify(meetup) );
    /*
      {
        "title":"Conference",
        "date":"2017-01-01T00:00:00.000Z",  // (1)
        "room": {"number":23}               // (2)
      }
    */
    // date стал строкой. Это потому, что все объекты типа Date имеют встроенный метод toJSON
}

/**
 * Свой toJSON()
 * toJSON используется как при прямом вызове JSON.stringify(room), так и когда room вложен в другой сериализуемый объект.
 */

{
    let room = {
        number: 23,
        toJSON() {
            return this.number;
        }
    };

    let meetup = {
        title: "Conference",
        room
    };

    console.log(JSON.stringify(room) ); // 23
    console.log(JSON.stringify(meetup) ); // {"title":"Conference","room":23}
}

/**
 * JSON.parse - метод, позволяющий декодировать JSON-строку
 * JSON.parse(str, [reviver]);
 *  str - строка
 *  reviver - Необязательная функция, которая будет вызываться для каждой пары (ключ, значение) и может преобразовывать значение.
 */

{
    // строковый массив
    let numbers = "[0, 1, 2, 3]";
    numbers = JSON.parse(numbers); // [0, 1, 2, 3] как массив
    console.log( numbers[1] ); // 1

    let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
    user = JSON.parse(user);
    console.log(user.friends[1]; // 1
}

/**
 * Использование reviver
 */

{
    // Мы получили с сервера строку, которую нам нужно десериализовать, чтоб нормально работать.
    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    // вызываем JSON.parse
    let meetup = JSON.parse(str);

    console.log(meetup.date.getDate()); // Ошибка! Значением meetup.date является строка, а не Date объект.

    // Рещение проблемы
    {
        let meetup = JSON.parse(str, function(key, value) {
            if (key === 'date') return new Date(value);
            return value;
        });
        console.log( meetup.date.getDate() ); // 30 - теперь работает!
    }
    {
        let schedule = `{
          "meetups": [
            {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
            {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
          ]
        }`;

        schedule = JSON.parse(schedule, function(key, value) {
            if (key == 'date') return new Date(value);
            return value;
        });

        console.log( schedule.meetups[1].date.getDate() ); // 18 - отлично!
    }
}