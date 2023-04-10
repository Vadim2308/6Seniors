/**
 * https://www.youtube.com/watch?v=kGnxQ4rh_mM 01:09:23 => работа с fs на NODE
 * https://www.youtube.com/watch?v=czgxE_UQnDQ
 * https://webtricks-master.ru/javascript/uchimsya-kodit-na-javascript-generatory-na-primerah/
 * https://www.youtube.com/watch?v=nn7byZegySU - получение коммитов гитхаба через асинхронный генератор
 */
function* generator() {
    console.log(0);
    yield 1;
    yield 2;
    yield 3;
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
 * Кастомная реализация итератора в объекте
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
}