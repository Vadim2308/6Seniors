/**
 * https://www.youtube.com/watch?v=kGnxQ4rh_mM 01:09:23 => работа с fs на NODE
 * https://www.youtube.com/watch?v=czgxE_UQnDQ
 * https://webtricks-master.ru/javascript/uchimsya-kodit-na-javascript-generatory-na-primerah/
 * https://www.youtube.com/watch?v=nn7byZegySU - получение коммитов гитхаба через асинхронный генератор
 */

/**
 *
 * Обычные функции возвращают что то одно, или ничего. А генераторы могут порождать (yield) множество значений.
 * Когда генератор вызван, он не выполняет свой код, а возвращает специальный объект, называемый "генератор", который контроллит выполнение
 */
{
    function* generateSequence() {
        yield 1;
        yield 2;
        return 3;
    }
    let generator = generateSequence(); // "функция-генератор" создаёт объект "генератор"
    alert(generator); // [object Generator]
}

function* generator() {
    console.log(0);
    yield 1;
    yield 2;
    const res = yield 3;
    console.log(res) // Если в next() ничего не передали, то res === undefined
}
/*
     звездочка может находиться где угодно
     function* generator()
     function * generator()
     function *generator()
 */

/*
 Iterator protocol
 */
const iterator = generator();
// iterator - просто объект, у которого есть метод next;
// iterable - объект, который содержит какие то данные, по котором можно итерироваться;
// При вызове он запускает выполнение кода до ближайшей инструкции yield <значение>
// yield - ключевое слово, останавливающее выполнение функции. yield равноценен return, только нас не выкидывает из функции
// метод next() => {value:any,done:boolean}


console.log(iterator.next()); // 0, {"value": 1,"done": false}
console.log(iterator.next()); // {"value": 2,"done": false}
console.log(iterator.next()); // {"value": 3,"done": false}
console.log(iterator.next()); // {"value": undefined,"done": true}
{
    for (let x of iterator) {
        /**
         * Вызывает у итератора метод next и возвращает value. Когда видит done:true, тогда он выходит
         */
        console.log(x); // 1,2,3
    }
    // Можем использовать с оператором spead
    let sequence = [0, ...generateSequence()]; // [0 1 2 3]
}

/**
 * Возврашаемый объект генератора всегда один, даже если мы его присваиваем в разные переменные
 */
{
    function* generator() {
        yield 1;
        yield 2;
        yield 3;
    }

    const gen = generator()
    const iter = gen[Symbol.iterator]()
    const iter2 = gen[Symbol.iterator]()

    console.log(iter.next(),iter2.next()) // { value: 1, done: false } { value: 2, done: false }
    console.log(iter === iter2) // true

    // Поэтому можем создавать разные инстансы генератора, и они будут разные
    {
        function* generator() {
            yield 1;
            yield 2;
            yield 3;
        }

        const gen = generator()
        const gen2 = generator()

        const iter = gen[Symbol.iterator]()
        const iter2 = gen2[Symbol.iterator]()

        console.log(iter.next(),iter2.next()) // { value: 1, done: false } { value: 1, done: false }
        console.log(iter === iter2) // false
    }
}

/**
 * Собственный итератор
 */
{
    function createCountDown(start) {
        let nextValue = start;
        return {
            next() {
                if (nextValue < 0) {
                    return { value: undefined, done: true };
                }
                return {
                    value: nextValue--,
                    done: false,
                };
            },
        };
    }

    const iterator = createCountDown(4);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    /**
     * {value: 4, done: false}
     * {value: 3, done: false}
     * {value: 2, done: false}
     * {value: 1, done: false}
     * {value: 0, done: false}
     * {value: undefined, done: true}
     */
}

{
    /**
     * Тоже самое, только на генераторе
     */
    function* createCountDown(start) {
        for (let i = start; i >= 0; i--) {
            yield i;
        }
    }
    const iterator = createCountDown(4);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

}
/**
 * Функции итераторы
 * Ниже объект, для перебора которог используем обычный  [Symbol.iterator]
 * Но можнно сделать лучше и короче, на функциях генераторах
 */
{
    let range = {
        from: 1,
        to: 5,
        [Symbol.iterator]() {
            return {
                current: this.from,
                last: this.to,
                next() {
                    if (this.current <= this.last) {
                        return { value: this.current++, done: false,  };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }
    };

    for (let num of range) {
        console.log(num); // 1, затем 2, 3, 4, 5
    }

    /**
     * Тоже самое, но на функциях генераторах
     * Выглядит лаконичнее и короче.
     */
    {
        let range = {
            from: 1,
            to: 5,
            *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
                for(let value = this.from; value <= this.to; value++) {
                    yield value;
                }
            }
        };

        alert( [...range] ); // 1,2,3,4,5
        // Или вынести генератор в переменную
        // const generator = range[Symbol.iterator]()
        // alert( [...generator] ); // 1,2,3,4,5
    }
}

/**
 * Композиция генераторов
 * Для генераторов есть особый синтаксис yield*, который позволяет «вкладывать» генераторы один в другой (осуществлять их композицию).
 * Директива yield* делегирует выполнение другому генератору. Этот термин означает, что yield* gen перебирает генератор gen и прозрачно направляет его вывод наружу. (Как если бы значения были сгенерированы внешним генератором)
 *
 */
{
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }

    function* generatePasswordCodes() {
        // 0..9
        yield* generateSequence(48, 57); // for (let i = 48; i <= 57; i++) yield i;
        // A..Z
        yield* generateSequence(65, 90); // for (let i = 65; i <= 90; i++) yield i;
        // a..z
        yield* generateSequence(97, 122); // for (let i = 97; i <= 122; i++) yield i;

    }

    let str = '';
    for(let code of generatePasswordCodes()) {
        str += String.fromCharCode(code);
    }
    alert(str); // 0..9A..Za..z
}

/**
 * yield не только возвращает результат наружу, но и может передавать значение извне в генератор.
 */
{
    function* gen() {
        // Передаём вопрос во внешний код и ожидаем ответа
        let result = yield "2 + 2 = ?"; // (*)
        alert(result);
    }

    let generator = gen();
    let question = generator.next().value; // <-- yield возвращает значение
    generator.next(4); // --> передаём результат в генератор. Вместо yield подставится 4
}


{
    function* foo(x) {
        //  тяжелые вычисления по вычислению в результате которого мы получаем результат
        const veryHardNumber = 1e3
        const y = x + (yield veryHardNumber);
        console.log('y', y);
        // тяжелые вычисления
        return y;
    }

    const iterator = foo(5);
    console.log(iterator.next()); // {value: 1e3, done: false}
    // Тут нам допустим нужно то очень тяжелое вычисление, мы с ним работаем, и дальше можем либо прокинуть в следующий next, либо передать что угодно
    const res = iterator.next(2); // next(2) <= запись говорит о том, что вместо yield поставить это значение // {value: 7, done: true}

    console.log(res); // {value: 7, done: true}

}

/**
 * generator.throw
 * Для того, чтобы передать ошибку в yield, нам нужно вызвать generator.throw(err). В таком случае исключение err возникнет на строке с yield.
 */
{
    function* gen() {
        try {
            let result = yield "2 + 2 = ?"; // (1)

            alert("Выполнение программы не дойдёт до этой строки, потому что выше возникнет исключение");
        } catch(e) {
            alert(e); // покажет ошибку
        }
    }

    let generator = gen();
    let question = generator.next().value;
    generator.throw(new Error("Ответ не найден в моей базе данных")); // (2)

    // Ошибка, которая проброшена в генератор на строке (2), приводит к исключению на строке (1) с yield.
    // В примере выше try..catch перехватывает её и отображает.
}