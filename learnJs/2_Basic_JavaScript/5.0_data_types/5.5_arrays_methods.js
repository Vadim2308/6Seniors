/**
 * splice
 * Метод arr.splice(str) – это универсальный метод для работы с массивами.
 * Умеет всё: добавлять, удалять и заменять элементы.
 * arr.splice(start[, deleteCount, elem1, ..., elemN])
 * Он изменяет arr начиная с индекса start: удаляет deleteCount элементов и затем вставляет elem1, ..., elemN на их место.
 * Возвращает массив из удалённых элементов.
 */
{
    let arr = ["Я", "изучаю", "JavaScript"];
    arr.splice(1, 1); // начиная с индекса 1(включительно), удалить 1 элемент
    console.log(arr); // осталось ["Я", "JavaScript"]
}
{
    let arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
    // удалить 3 первых элемента и заменить их другими
    arr.splice(0, 3, "Давай", "танцевать");
    console.log( arr ) // теперь ["Давай", "танцевать", "прямо", "сейчас"]
}
{
    let arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
    // удалить 2 первых элемента
    let removed = arr.splice(0, 2);
    console.log( removed ); // "Я", "изучаю" <-- массив из удалённых элементов
}
{
    let arr = ["Я", "изучаю", "JavaScript"];
    // с индекса 2
    // удалить 0 элементов
    // вставить "сложный", "язык"
    arr.splice(2, 0, "сложный", "язык");
    console.log( arr ); // "Я", "изучаю", "сложный", "язык", "JavaScript"
}
/* Отрицательные индексы разрешены */
{
    let arr = [1, 2, 5];
    // начиная с индекса -1 (перед последним элементом)
    // удалить 0 элементов,
    // затем вставить числа 3 и 4
    arr.splice(-1, 0, 3, 4);
    console.log(arr); // 1,2,3,4,5
    arr.splice(-3, 2, 3, 4); // [3, 4, 5]
}

/**
 * slice
 * Метод arr.slice намного проще, чем похожий на него arr.splice.
 * arr.slice([start], [end])
 * Он возвращает новый массив, в который копирует все элементы с индекса start до end (не включая end)
 * Можно вызвать slice без аргументов: arr.slice() создаёт копию arr
 */
{
    let arr = ["t", "e", "s", "t"];
    console.log(arr.slice(1, 3)); // e,s (копирует с 1 до 3(не включая))
    console.log(arr.slice(-2)); // s,t (копирует с -2 до конца)
}

/**
 * concat
 * Метод arr.concat создаёт новый массив, в который копирует данные из других массивов и дополнительные значения.
 * arr.concat(arg1, arg2...)
 */
{
    let arr = [1, 2];
    // создать массив из: arr и [3,4]
    console.log(arr.concat([3, 4])); // [1,2,3,4]
    // создать массив из: arr и [3,4] и [5,6]
    console.log(arr.concat([3, 4], [5, 6])); // [1,2,3,4,5,6]
    // создать массив из: arr и [3,4], потом добавить значения 5 и 6
    console.log( arr.concat([3, 4], 5, 6) ); // [1,2,3,4,5,6]
    console.log(arr.concat(3)) // [1, 2, 3]
}
/* Обычно он копирует только элементы из массивов. Другие объекты, даже если они выглядят как массивы, добавляются как есть: */
{
    let arr = [1, 2];
    let arrayLike = {
        0: "что-то",
        length: 1
    };
    console.log(arr.concat(arrayLike)); // [1,2,{"0":"что-то","length":1}]
}

/* Но если массивоподобный объект имеет специальное свойство Symbol.isConcatSpreadable, то он обрабатывается как массив, с помощью concat: вместо него добавляются его элементы:*/
{
    let arr = [1, 2];
    let arrayLike = {
        0: "что-то",
        1: "ещё",
        [Symbol.isConcatSpreadable]: true, // Обязательные условия
        length: 2 // Обязательные условия
    };
    console.log(arr.concat(arrayLike)); // [1, 2, 'что-то', 'ещё']
    /* Если length > 2, то массив будет выглядеть так: [1, 2, 'что-то', 'ещё', empty] */
}

/**
 * forEach
 * Метод arr.forEach позволяет запускать функцию для каждого элемента массива.
 * Результат функции (если она что-то возвращает) отбрасывается и игнорируется.
 */
{
    arr.forEach(function(item, index, array) {
        // ... делать что-то с item
    });
}

/**
 * Поиск в массиве
 */
{
    let users = [
        {id: 1, name: "Вася"},
        {id: 2, name: "Петя"},
        {id: 3, name: "Маша"},
        {id: 4, name: "Вася"}
    ];
    /* find */
    {
        let result = users.find(function(item, index, array) {
            // если true - возвращается текущий элемент и перебор прерывается
            // если все итерации оказались ложными, возвращается undefined
        });
        let user = users.find(item => item.id === 1);
        console.log(user.name); // Вася
    }
    /* findIndex && findLastIndex */
    /* findIndex возвращает индекс, на котором был найден элемент, а не сам элемент. Значение -1 возвращается, если ничего не найдено.*/
    /* findLastIndex ищет с конца Значение -1 возвращается, если ничего не найдено.*/
    {
        // Найти индекс первого Васи
        console.log(users.findIndex(user => user.name == 'Вася')); // 0
        // Найти индекс последнего Васи
        console.log(users.findLastIndex(user => user.name === 'Вася')); // 3
    }
}

/**
 * filter
 */
{
    let results = arr.filter(function(item, index, array) {
        // если `true` -- элемент добавляется к results и перебор продолжается
        // возвращается пустой массив в случае, если ничего не найдено
    });
    let users = [
        {id: 1, name: "Вася"},
        {id: 2, name: "Петя"},
        {id: 3, name: "Маша"}
    ];
    // возвращает массив, состоящий из двух первых пользователей
    let someUsers = users.filter(item => item.id < 3);
    console.log(someUsers.length); // 2
}

/**
 * Преобразование массива
 */
{
    /* map */
    // вызывает функцию для каждого элемента массива и возвращает массив результатов выполнения этой функции.
    let result = arr.map(function(item, index, array) {
        // возвращается новое значение вместо элемента
    });
    let lengths = ["Бильбо", "Гэндальф", "Назгул"].map(item => item.length);
    console.log(lengths); // 6,8,6
}
{
    /* sort */
    // Вызов arr.sort() сортирует массив на месте, меняя в нём порядок элементов.
    // P.S. Мутирующий метод! Он возвращает отсортированный массив, но обычно возвращаемое значение игнорируется, так как изменяется сам arr.
    
    let arr = [ 1, 2, 15 ];
    // метод сортирует содержимое arr
    arr.sort();
    console.log(arr);  // 1, 15, 2 Так произошло, потому что ПО УМОЛЧАНИЮ ЭЛЕМЕНТЫ СОРТИРУЮТСЯ КАК строки. Для строк применяется лексикографический порядок, и выходит, что "2" > "15".

    function compareNumeric(a, b) {
        if (a > b) return 1; // может быть любое положительное
        if (a === b) return 0;
        if (a < b) return -1; // может быть любое отрицательное
    }
    let arr2 = [1,15,2];
    arr2.sort(compareNumeric);
    console.log(arr2);  // 1, 2, 15

    arr.sort( (a, b) => a - b ); // Более короткая запись

    // P.s.для сравнения строк использовать localeCompare
    let arr3 = ['ё', 'а','я'];
    const strCompare = (a,b) => a.localeCompare(b)
    console.log(arr3.sort(strCompare)); // ['а', 'ё', 'я']
}
{
    /* reverse */
    // Метод arr.reverse меняет порядок элементов в arr на обратный. Он также возвращает массив arr с изменённым порядком элементов.
    // P.S. Мутирующий метод!
    let arr = [1, 2, 3, 4, 5];
    arr.reverse();
    console.log(arr); // 5,4,3,2,1
}
{
    /* split и join */
    let names = 'Вася, Петя, Маша';
    let arr = names.split(', ');
    console.log(arr) // ['Вася', 'Петя', 'Маша']
    let arr2 = names.split(',');
    console.log(arr2) // ['Вася',' Петя',' Маша']
    
    // Есть необязательный второй аругмент (ограничение на количество элементов в массиве)
    let arr3 = 'Вася, Петя, Маша, Саша'.split(', ', 2);
    console.log(arr3); // Вася, Петя

    let str = "тест";
    console.log(str.split('')); // ['т', 'е', 'с', 'т']
    console.log(str.split()); // ['тест']

    // join
    // Вызов arr.join(glue) создаёт строку из элементов arr, вставляя glue между ними.
    {
        let arr = ['Вася', 'Петя', 'Маша'];
        let str = arr.join(';'); // объединить массив в строку через ;
        console.log( str ); // Вася;Петя;Маша
    }
}

{
    /* reduce reduceRight */
    /* Методы arr.reduce и arr.reduceRight похожи на методы выше, но они немного сложнее. Они используются для вычисления единого значения на основе всего массива.*/
    let value = arr.reduce(function(accumulator, item, index, array) {
        // ...
    }, [initial]);
    /**
     * accumulator – результат предыдущего вызова этой функции, равен initial при первом вызове (если передан initial). Если не передан, то равен первому значению в массиве
     * item – очередной элемент массива,
     * index – его позиция,
     * array – сам массив.
     */
    let arr = [1, 2, 3, 4, 5];
    // убрано начальное значение (нет 0 в конце)
    let result = arr.reduce((sum, current) => sum + current);
    console.log( result ); // 15

    // Метод arr.reduceRight работает аналогично, но проходит по массиву справа налево. */
}

/**
 * Array.isArray
 *  Он возвращает true, если value массив, и false, если нет.
 */
{
    /**
     * Массивы не образуют отдельный тип языка. Они основаны на объектах.
     * Поэтому typeof не может отличить простой объект от массива:
     */
    console.log(typeof {}); // object
    console.log(typeof []); // тоже object
    
    console.log(Array.isArray({})); // false
    console.log(Array.isArray([])); // true
}

/**
 * Большинство методов поддерживают «thisArg»
 * Почти все методы массива, которые вызывают функции – такие как find, filter, map, за исключением метода sort, принимают необязательный параметр thisArg.
 */
{
    arr.find(func, thisArg);
    arr.filter(func, thisArg);
    arr.map(func, thisArg);
    
    {
        let army = {
            minAge: 18,
            maxAge: 27,
            canJoin(user) {
                return user.age >= this.minAge && user.age < this.maxAge;
            }
        };
        let users = [
            {age: 16},
            {age: 20},
            {age: 23},
            {age: 30}
        ];
        // найти пользователей, для которых army.canJoin возвращает true
        let soldiers = users.filter(army.canJoin, army); // || users.filter(user => army.canJoin(user))

        console.log(soldiers.length); // 2
        console.log(soldiers[0].age); // 20
        console.log(soldiers[1].age); // 23
    }
}

/**
 * ИТОГО
 * Методы изменяющегося массива в JavaScript
     * Array.prototype.pop()
     * Array.prototype.push()
     * Array.prototype.shift()
     * Array.prototype.unshift()
     * Array.prototype.reverse()
     * Array.prototype.sort()
     * Array.prototype.splice()
     * Array.prototype.fill()
 * У массивов также есть некоторые методы, которые не изменяют исходный массив, а возвращают новый массив:
     * Array.prototype.slice()
     * Array.prototype.concat()
     * Array.prototype.map()
     * Array.prototype.filter()
 */