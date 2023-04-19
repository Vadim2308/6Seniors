// Task 1
// Дана JSON строка '["Коля", "Вася", "Петя"]'. Преобразуйте ее в массив JavaScript и выведите на экран элемент "Петя".
console.log(JSON.parse('["Коля", "Вася", "Петя"]')[2]);     // Output: 'Петя'

// Task 2
// Дан объект {a: 'aaa', b: 'bbb'}. Преобразуйте его в JSON.
console.log(JSON.stringify({a: 'aaa', b: 'bbb'}));         // Output: '{"a":"aaa","b":"bbb"}'

// Task 3
{
    let user = {
        name: "Василий Иванович",
        age: 35
    };
    let user2 = JSON.parse(JSON.stringify(user));
}

// Task 4
// Исключить обратные ссылки
/**
 * Напишите функцию replacer для JSON-преобразования, которая удалит свойства, ссылающиеся на meetup:
 */
{
    let room = {
        number: 23
    };

    let meetup = {
        title: "Совещание",
        occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
        place: room
    };

    // цикличные ссылки
    room.occupiedBy = meetup;
    meetup.self = meetup;

    console.log(JSON.stringify(meetup, function replacer(key, value) {
        console.log({key,value})
        if(key !== "" && value === meetup) return undefined;
        return value
    }));
    /**
     * Здесь нам также нужно проверить key =="", чтобы исключить первый вызов, где значение value равно meetup.
     */
}