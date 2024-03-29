/**
 * Массив – это особый подвид объектов, упорядоченная коллекция
 * Существует 4 варианта синтаксиса для создания пустого массива:
 */
{
    let arr = new Array();
    let arr2 = new Array("Яблоко", "Груша", "и тд");
    let arr3 = Array("Яблоко", "Груша", "и тд");
    const arr4 = Array.of(1,[2],{}) // [ 1, [2], {} ]

    console.log(arr)

    let arr3 = [];
    let fruits = ["Яблоко", "Апельсин", "Слива"];

    // Мы можем получить элемент, указав его номер в квадратных скобках:
    console.log( fruits[0] ); // Яблоко
    console.log( fruits[1] ); // Апельсин
    console.log(fruits.at(0) ); // Яблоко
    console.log(fruits.at(1) ); // Апельсин

    // Мы можем заменить элемент:
    fruits[2] = 'Груша'; // теперь ["Яблоко", "Апельсин", "Груша"]
    // Или добавить новый к существующему массиву:
    fruits[3] = 'Лимон'; // теперь ["Яблоко", "Апельсин", "Груша", "Лимон"]

    fruits[6] = "Абобус" // ["Яблоко","Апельсин","Слива","Лимон",undefined(разрыв),undefined(разрыв),"Абобус"]. В переборе этих элементов нет, после 3 индекса выведется 6
    // Число элементов массива содержится в его свойстве length:
    console.log(fruits.length); // 4
}
/**
 * могут храниться элементы любого типа.
 */
{
    let arr = [ 'Яблоко', { name: 'Джон' }, true, function() { console.log('привет'); } ];
    // получить элемент с индексом 1 (объект) и затем показать его свойство
    console.log( arr[1].name ); // Джон
    // получить элемент с индексом 3 (функция) и выполнить её
    arr[3](); // привет
}

/**
 * Получение последних элементов .length || .at
 */
{
    let fruits = ["Apple", "Orange", "Plum"];
    console.log(fruits[fruits.length-1]); // Plum
    console.log(fruits.at(-1) ); // Plum
}

/**
 * Методы push/pop unshift/shift
 * Методы push/pop выполняются быстро, а методы shift/unshift – медленно.
 * Методы shift/unshift работают медленно потому что меняются индексы остальных элементов
 *
 */
{
    // push(...items) добавляет элемент в конец и возвращает новую длину.
    // pop удаляет последний элемент и возвращает его
    // unshift(...items) - добавляет в начало и возвращает новую длину.
    // shift  - удаляет элемент в начале, и возвращает его

    let fruits = ["Яблоко"];
    fruits.push("Апельсин", "Груша");
    fruits.unshift("Ананас", "Лимон");
    // ["Ананас", "Лимон", "Яблоко", "Апельсин", "Груша"]
    console.log( fruits );
}
/**
 * Внутреннее устройство массива
 */
{
    let fruits = ["Банан"]
    let arr = fruits; // копируется по ссылке (две переменные ссылаются на один и тот же массив)
    console.log( arr === fruits ); // true
    arr.push("Груша"); // массив меняется по ссылке
    console.log( fruits ); // Банан, Груша - теперь два элемента
}

/**
 * Cуществуют способы оптимизации в движке по работе с массивами, но они перестают работать когда мы начинаем их использовать как обычные объекты
 */
{
    let fruits = []; // создаём массив
    fruits[100] = 5; // создаём свойство с индексом, намного превышающим длину массива
    fruits.age = 25; // создаём свойство с произвольным именем
    console.log(fruits) // [empty × 100, 5, age: 25]
}

/**
 * Варианты неправильного применения массива:
 * Добавление нечислового свойства, например: arr.test = 5.
 * Создание «дыр», например: добавление arr[0], затем arr[1000] (между ними ничего нет).
 * Заполнение массива в обратном порядке, например: arr[1000], arr[999] и т.д.
 */

/**
 * Перебор элементов
 * for, for..in for..of
 * Недостатки for..in
 *      1. Цикл for..in оптимизирован под произвольные объекты, не массивы, и поэтому в 10-100 раз медленнее.
 *      2. В браузере и других программных средах также существуют так называемые «псевдомассивы» – объекты, которые выглядят, как массив. (HTMLCollection,NodeList,CSSRuleList)
 *         То есть, у них есть свойство length и индексы, но они также могут иметь дополнительные нечисловые свойства и методы, которые нам обычно не нужны.
 *         Тем не менее, цикл for..in выведет и их.
 */
{
    let arr = ["Яблоко", "Апельсин", "Груша"];

    for (let i = 0; i < arr.length; i++) {
        console.log( arr[i] ); // "Яблоко", "Апельсин", "Груша"
    }
    for (let fruit of arr) {
        console.log( fruit ); // "Яблоко", "Апельсин", "Груша"
    }
    for (let key in arr) {
        console.log(key); // 0,1,2
    }
}

/**
 * Особенности length
 * Свойство length автоматически обновляется при изменении массива
 */
{
    let fruits = [];
    fruits[123] = "Яблоко";

    console.log( fruits.length ); // 124

    let arr = [1, 2, 3, 4, 5];

    arr.length = 2; // укорачиваем до двух элементов
    console.log( arr ); // [1, 2]

    arr.length = 5; // возвращаем length как было
    console.log( arr[3] ); // undefined: значения не восстановились

    // самый простой способ очистить массив – это arr.length = 0;.
}
/**
 * new Array()
 */
{
    // Аргументы в конструктор передаются через запятую
    let arr = new Array("Яблоко", "Груша", "и тд");

    /**
     * Если new Array вызывается с одним аргументом, который представляет собой число, он создаёт массив без элементов, но с заданной длиной.
     */
    {
        let arr = new Array(2); // создастся ли массив [2]?

        console.log( arr[0] ); // undefined! нет элементов.

        console.log( arr.length ); // [empty × 2]
    }
}

/**
 * Многомерные массивы
 * Массивы могут содержать элементы, которые тоже являются массивами. Это можно использовать для создания многомерных массивов, например, для хранения матриц:
 */
{
    let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    console.log( matrix[1][1] ); // 5, центральный элемент
}

/**
 * toString
 * Массивы по-своему реализуют метод toString, который возвращает список элементов, разделённых запятыми.
 */

{
    let arr = [1, 2, 3];

    console.log(arr); // '1,2,3'
    console.log(String(arr) === '1,2,3'); // true

    console.log( [] + 1 ); // "" + 1 => "1"
    console.log( [1] + 1 ); // "1" + 1 => "11"
    console.log( [1,2] + 1 ); // "1,2" + 1 => "1,21"

    /**
     * Массивы не имеют ни Symbol.toPrimitive, ни функционирующего valueOf, они реализуют только преобразование toString, таким образом, здесь [] становится пустой строкой, [1] становится "1", а [1,2] становится "1,2".
     */
}

/**
 * Сравнение массивов
 * Два объекта равны друг другу == только в том случае, если они ссылаются на один и тот же объект.
 * Если один из аргументов == является объектом, а другой – примитивом, то объект преобразуется в примитив
 * За исключением null и undefined, которые равны == друг другу и ничему больше.
 */
{
    console.log( [] == [] ); // false
    console.log( [0] == [0] ); // false

    console.log( 0 == [] ); // true
    console.log('0' == [] ); // false
    // после того, как [] был преобразован в ''
    console.log( 0 == '' ); // true, так как '' преобразуется в число 0
    console.log('0' == '' ); // false, нет преобразования типов, разные строки
}

/**
 * Псевдомассивы
 * Псевдомассивы – это объекты, у которых есть индексы и свойство length, то есть, они выглядят как массивы.
 */
{
    let arrayLike = { // есть индексы (не обязательно) и свойство length(обязательно) => псевдомассив
        0: "Hello",
        1: "World",
        length: 2
    };
}