/**
 * Остаточные параметры (...)
 * Оператор ...rest - ставится в конце, собирает оставшиеся переменные в массив
 * Остаточные параметры собирают все остальные аргументы, поэтому бессмысленно писать что-либо после них. Это вызовет ошибку
 */
{
    function sumAll(...args) { // args — имя массива
        let sum = 0;
        for (let arg of args) sum += arg;
        return sum;
    }
    console.log( sumAll(1) ); // 1
    console.log( sumAll(1, 2) ); // 3
    console.log( sumAll(1, 2, 3) ); // 6

    const sum = (a, b, ...rest) => a + b + ` [${rest}]`;
    console.log( sum(10, 9, 8, 7, 6, 5, 4) );     // Output: 19 [8,7,6,5,4]

    {
        function f(arg1, ...rest, arg2) { // arg2 после ...rest ?!
                                          // Ошибка ...rest должен всегда быть последним.
        }
    }
}

/**
 * Переменная "arguments"
 * У функции (не стрелочной) есть неявный *ПСЕВДОМАССИВ* `arguments`, который содержит аргументы, переданные в нее
 * arguments поддерживает for...in for...of иттерацию
 */

{

    const sum2 = function (a, b, ...rest) {
        return arguments;
    };

    console.log(sum2(10, 9, 8, 7, 6, 5, 4) );     // [Arguments] { '0': 10, '1': 9, '2': 8, '3': 7, '4': 6, '5': 5, '6': 4 }

    function showName() {
        console.log(arguments.length);
        console.log(arguments[0] );
        console.log(arguments[1]);
        // Объект arguments можно перебирать
        for (let arg of arguments) console.log(arg); // "Юлий", "Цезарь"
    }
    // Вывод: 2, Юлий, Цезарь
    showName("Юлий", "Цезарь");
}

/**
 * Стрелочные функции не имеют "arguments"
 * Если мы обратимся к arguments из стрелочной функции, то получим аргументы внешней «нормальной» функции.
 */
{
    function f() {
        let showArg = () => console.log(arguments[0]);
        showArg(2);
    }
    f(1); // 1

    /** Без внешней функции */
    {
        let showArg = () => console.log(arguments); // ReferenceError: arguments is not defined
        showArg(1);
    }
}

/**
 * Оператор расширения (spread)
 * Оператор ...spread - 'расширяет' итерируемый объект в список значений  ([a, b, c] => a, b, c)
 * Он похож на остаточные параметры – тоже использует ..., но делает совершенно противоположное.
 */
{
    let arr = [3, 5, 1];
    console.log(Math.max(arr)); //  NaN  (Math.max принимает только примитивы по порядку)
    console.log(Math.max(...arr)); // 5 (оператор "раскрывает" массив в список аргументов)
    {
        let arr1 = [1, -2, 3, 4];
        let arr2 = [8, 3, -8, 1];
        console.log( Math.max(...arr1, ...arr2) ); // 8
    }
    {
        let arr1 = [1, -2, 3, 4];
        let arr2 = [8, 3, -8, 1];
        console.log( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
    }
    {
        let arr = [3, 5, 1];
        let arr2 = [8, 9, 15];
        let merged = [0, ...arr, 2, ...arr2];
        console.log(merged); // 0,3,5,1,2,8,9,15 (0, затем arr, затем 2, в конце arr2)
    }
}

/**
 * Cтроки и spread
 */
{
    
    let str = "Привет";
    const d = ...str; // Ошибка синтаксиса

    console.log([...str]); // [П,р,и,в,е,т]
    {
        /**
         * Механизм работы
         * Под капотом оператор расширения использует итераторы, чтобы перебирать элементы. Так же, как это делает for..of.
         * Цикл for..of перебирает строку как последовательность символов, поэтому из ...str получается "П", "р", "и", "в", "е", "т".
         * Получившиеся символы собираются в массив при помощи стандартного объявления массива: [].
         */
    }
    {
        let str = "Привет";
        // Array.from преобразует перебираемый объект в массив
        console.log(Array.from(str) ); // [П,р,и,в,е,т]
    }
    const string1 = 'Hello this is example string';
    console.log(...string1);                                  // Output: H e l l o   t h i s   i s   e x a m p l e   s t r i n g  (по символу)
    console.log([...string1]);                                // Output: ['H', 'e', 'l', 'l', 'o', ' ', 't', 'h', 'i', 's', ' ', 'i', 's', ' ', 'e', 'x', 'a', 'm', 'p', 'l', 'e', ' ', 's', 't', 'r', 'i', 'n', 'g']
    console.log(Array.from(string1));                         // Output: ['H', 'e', 'l', 'l', 'o', ' ', 't', 'h', 'i', 's', ' ', 'i', 's', ' ', 'e', 'x', 'a', 'm', 'p', 'l', 'e', ' ', 's', 't', 'r', 'i', 'n', 'g']
}

/**
 * Но между Array.from(obj) и [...obj] есть разница:
 *    Array.from работает как с псевдомассивами, так и с итерируемыми объектами
     * Оператор расширения работает только с итерируемыми объектами
* Выходит, что если нужно сделать из чего угодно массив, то Array.from — более универсальный метод.
 */

/**
 * функции и spread
 */
{
    function multiplyThreeNumbers(a, b, c) {
        return a * b * c
    }
    const nums = [1, 2, 3]
    console.log(multiplyThreeNumbers(...nums)) // 6
    console.log(multiplyThreeNumbers.apply(null, nums)) // 6
    console.log(multiplyThreeNumbers.call(null, ...nums)) // 6
}

/**
 * Объекты и спред
 */
{
    const persona = { name: 'Иван', lastName: 'Объектов'}
    const userData = { ...persona, username: 'killer3000' }

    console.log(userData)
    // {
    //    name: 'Иван',
    //    lastName: 'Объектов',
    //    username: 'killer3000'
    // }

}