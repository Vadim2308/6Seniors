/**
 * Перебираемые (или итерируемые) объекты – это концепция, которая позволяет использовать любой объект в цикле for..of.
 * Методы, которые используют итератор: for..of Array.from spread, деструктуриирующее присваивание, yield
 * По умолчанию цикл for of недоступен. При попытке вызвать цикл на неитерируемом объекте получим ошибку "obj" is not iterable
 * Итератор — это объект, который умеет обращаться к элементам коллекции по одному за раз, при этом отслеживая своё текущее положение внутри этой последовательности.
 */

/**
 * Практически везде, где нужен перебор, он осуществляется через итераторы. Это включает в себя не только строки, массивы, но и другие структуры данных.
 * В современный JavaScript добавлена новая концепция «итерируемых» (iterable) объектов, например Map, представленный в ES6.
 * Такие объекты как String, Array, Map и Set являются итерируемыми, потому что их прототипы содержат Symbol.iterator.
 */

/**
 * Чтобы сделать объект итерируемым, нужно:
 *  1. Определить метод Symbol.iterator (специальный встроенный Symbol, созданный как раз для этого).
 *  2. Цикл for of вызывает этот метод один раз, и этот метод должен вернуть объект с методом next(). Этот объект называется "итератором".
 *  3. Дальше for..of работает только с этим возвращённым объектом
 *  4. Когда for..of хочет получить следующее значение, он вызывает метод next() этого объекта.
 *  5. Результат вызова next() должен иметь вид {done: Boolean, value: any}, где done=true означает, что цикл завершён, в противном случае value содержит очередное значение.
 */

{
    let range = {
        from: 1,
        to: 5
    };
    // 1. вызов for..of сначала вызывает эту функцию
    range[Symbol.iterator] = function() {
        // ...она возвращает объект итератора:
        // 2. Далее, for..of работает только с этим итератором, запрашивая у него новые значения
        return {
            current: this.from,
            last: this.to,
            // 3. next() вызывается на каждой итерации цикла for..of
            next() {
                // 4. он должен вернуть значение в виде объекта {done:.., value :...}
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    };
    for (let num of range) {
        console.log(num); // 1, затем 2, 3, 4, 5
    }
}
/**
 * Более короткая запись 
 */
{
    let range = {
        from: 1,
        to: 5,
        [Symbol.iterator]() {
            this.current = this.from;
            return this; // Symbol.iterator должен вернуть объект с методом next(), поэтому возвращается объект
        },
        next() {
            if (this.current <= this.to) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };

    for (let num of range) {
        console.log(num); // 1, затем 2, 3, 4, 5
    }
}

{
    function makeIterator(array) {
        let nextIndex = 0
        return {
            next: function () {
                if (nextIndex < array.length) {
                    const result = { value: array[nextIndex], done: false }
                    nextIndex++
                    return result
                } else {
                    return { done: true }
                }
            }
        }
    }
    // После создания, объект-итератор может быть явно использован, с помощью вызовов метода next():
    let iterator = makeIterator(['Hello', 'world'])
    console.log(iterator.next().value)
    // 'Hello'
    console.log(iterator.next().value)
    // 'world'
    console.log(iterator.next().done)
    // true
}


/**
 * Строка – перебираемый объект
 */
{
    for (let char of "test") {
        // срабатывает 4 раза: по одному для каждого символа
        console.log(char); // t, затем e, затем s, затем t
    }
    let str = '𝒳😂';
    for (let char of str) {
        console.log(char); // 𝒳, а затем 😂
    }
}

/**
 * Явный вызов итератора
 * Такое редко бывает необходимо, но это даёт нам больше контроля над процессом, чем for..of.
 * Например, мы можем разбить процесс итерации на части: перебрать немного элементов, затем остановиться, сделать что-то ещё и потом продолжить.
 */
{
    let str = 'Hello';

    // делает то же самое, что и
    // for (let char of str) console.log(char);
    let iterator = str[Symbol.iterator]();
    while (true) {
        const { value, done } = iterator.next();
        console.log({ value, done }); // выводит символы один за другим
        if (done) break;
    }
}

/**
 * Итерируемые объекты и псевдомассивы
 *    Итерируемые объекты – это объекты, которые реализуют метод Symbol.iterator.
 *    Псевдомассивы – это объекты, у которых есть индексы и свойство length, то есть, они выглядят как массивы. Но т.к. это все равно объекты, их все равно по дефолту нельзя итерировать без Symbol.Iterator
 *    Примеры псевдомассивов - HTMLCollection,NodeList,CSSRuleList
 */
{
    let arrayLike = { // есть индексы и свойство length => псевдомассив
        0: "Hello",
        1: "World",
        length: 2
    };
    // Ошибка (отсутствует Symbol.iterator)
        for (let item of arrayLike) {}
}
/**
 * Array.from()
 * Есть универсальный метод Array.from, который принимает итерируемый объект или псевдомассив и делает из него «настоящий» Array.
 * После этого мы уже можем использовать методы массивов.
 * Принимает либо псевдомассив, либо объект с Symbol.iterator. см объект range
 */
{
    let arrayLike = {
        0: "Hello",
        1: "World",
        length: 2
    };
    let arr = Array.from(arrayLike); // (*)
    console.log(arr.pop()); // World (метод работает)

    let arr2 = Array.from(arrayLike, (str,idx) => str + idx);
    console.log(arr2); //["Hello0", "World1"]

    let str = '𝒳😂';

     // разбивает строку на массив её элементов
    let chars = Array.from(str); // ["𝒳", "😂"]
    console.log(chars[0]); // 𝒳
    console.log(chars[1]); // 😂
    console.log(chars.length); // 2
}

/**
 * Спред-оператор
 * Спред-оператор (spread) также вызывает интерфейс итератора по умолчанию:
 */
{
    const arr = [...new Set(['a', 'b', 'c'])]
    // ['a', 'b', 'c']
}
