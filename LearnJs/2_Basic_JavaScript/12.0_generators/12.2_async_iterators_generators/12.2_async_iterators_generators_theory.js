/**
 * Асинхронные итераторы позволяют перебирать данные, поступающие асинхронно
 *  1) Используется Symbol.asyncIterator вместо Symbol.iterator.
 *  2) next() должен возвращать промиc
 *  3) Чтобы перебрать такой объект, используется цикл for await (let item of iterable).
 *
 *  Мы можем использовать асинхронные генераторы для обработки данных, когда они поступают по частям (например загрузка или выгрузка большого файла)
 *  Но для этого есть специальное API, называется Streams
 */
{
    let range = {
        from: 1,
        to: 5,
        // for await..of вызывает этот метод один раз в самом начале
        [Symbol.asyncIterator]() { // (1)
            // ...возвращает объект-итератор:
            // далее for await..of работает только с этим объектом,
            // запрашивая у него следующие значения вызовом next()
            return {
                current: this.from,
                last: this.to,
                // next() вызывается на каждой итерации цикла for await..of
                async next() { // Метод next() не обязательно должен быть async он может быть обычным методом, возвращающим промис
                    // должен возвращать значение как объект {done:.., value :...}
                    // (автоматически оборачивается в промис с помощью async)

                    // можно использовать await внутри для асинхронности:
                    await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

                    if (this.current <= this.last) {
                        return { done: false, value: this.current++ };
                    } else {
                        return { done: true };
                    }
                }
            };
        }
    };

    (async () => {
        for await (let value of range) { // (4)
            alert(value); // 1,2,3,4,5
        }
    })()
}

/**
 * Оператор расширения ... не работает асинхронно
 * alert( [...range] ); // Ошибка, нет Symbol.iterator
 */

/**
 * Асинхронные генераторы
 */
{
    async function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) {
            // Можно использовать await!
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield i;
        }
    }

    (async () => {
        let generator = generateSequence(1, 5);
        // Можно вынести результат в переменную, например
        // result = await generator.next(); // result = {value: ..., done: true/false}
        for await (let value of generator) {
            alert(value); // 1, потом 2, потом 3, потом 4, потом 5
        }
    })();
}

/**
 * Асинхронно перебираемые объекты
 */
{
    let range = {
        from: 1,
        to: 5,
        async *[Symbol.asyncIterator]() { // то же, что и [Symbol.asyncIterator]: async function*()
            for(let value = this.from; value <= this.to; value++) {
                // пауза между значениями, ожидание
                await new Promise(resolve => setTimeout(resolve, 1000));
                yield value;
            }
        }
    };

    (async () => {
        for await (let value of range) {
            alert(value); // 1, потом 2, потом 3, потом 4, потом 5
        }
    })()
}

