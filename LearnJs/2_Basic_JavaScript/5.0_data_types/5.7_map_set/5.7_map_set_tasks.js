/**
 * TODO: https://www.youtube.com/watch?v=hN0wsq5LNOc
 */

/**
 * Фильтрация уникальных элементов массива
 * Создайте функцию unique(arr), которая вернёт массив уникальных, не повторяющихся значений массива arr.
 */
{
    const unique = (arr) => [...new Set(arr)]

    let values = ["Hare", "Krishna", "Hare", "Krishna",
        "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    console.log( unique(values) ); // Hare,Krishna,:-O
}

/**
 * Отфильтруйте анаграммы
 * Анаграммы – это слова, у которых те же буквы в том же количестве, но они располагаются в другом порядке.
 * Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.
 * Из каждой группы анаграмм должно остаться только одно слово, не важно какое.
 */

/**
 * Вариант 1
 */

{
    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    const isAnagram = (ref, str) => {
        const [sortedRefernce, sortedString] = [ref, str].map((el) =>
            el
                .toLowerCase()
                .split('')
                .sort((a, b) => a.localeCompare(b))
                .join('')
        );
        return sortedRefernce === sortedString;
    };

    const aclean = (arr) => {
        const res = [];
        const anagrams = [];
        for (let i = 0; i < arr.length; i++) {
            const sliced = arr.slice(i + 1);
            const binded = isAnagram.bind(null, arr[i]);
            const anagramsList = sliced.filter((el) => binded(el));
            if (anagramsList.length) {
                anagrams.push(...anagramsList);
                res.push(arr[i]);
            }
        }
        return res.filter((el) => !anagrams.includes(el));
    };
}

/**
 * Вариант 2
 */
{
    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    const aclean = (arr) => {
        const result = {}
        for(let i = 0; i < arr.length; i++){
            const anagram = arr[i].toLowerCase().split('').sort().join('')
            result[anagram] = arr[i]
        }
        return Object.values(result);
    }
}

/**
 * Вариант 3
 */

{
    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    const aclean = (arr) => {
        const result = new Map();
        for (let i = 0; i < arr.length; i++) {
            const anagram = arr[i].toLowerCase().split('').sort().join('');
            result.set(anagram, arr[i]);
        }
        return Array.from(result.values());
    };
}


/**
 * Перебираемые ключи
 * Мы хотели бы получить массив ключей map.keys() в переменную и далее работать с ними, например, применить метод .push.
 * Что нужно поправить в коде, чтобы вызов keys.push сработал?
 */

{
    let map = new Map();
    map.set("name", "John");
    let keys = Array.from(map.keys());
    keys.push("more");
}

/**
 * Подсчёт количества уникальных слов в строке с использованием Set:
 */
{
    let str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur sed iaculis nisi.";
    const words = str.split(' ')
    const uniq = new Set(words).size
}

/**
 * Преобразование массива объектов в Map, используя значение определённого свойства в качестве ключа:
 */

{
    let people = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
    ];

    const map = new Map()

    for(const {id,name} of people){
        map.set(id,name)
    }
    console.log(map)
}

/**
 * Нахождение максимального и минимального значения в Map:
 */

{
    let ages = new Map();
    ages.set("Alice", 25);
    ages.set("Bob", 30);
    ages.set("Charlie", 20);

    const min = Math.min(...ages.values()); // 20
    const max = Math.max(...ages.values()); // 30

}