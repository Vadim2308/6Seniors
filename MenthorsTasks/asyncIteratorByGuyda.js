/**
 * Задача Реализовать в объекте асинхронный итератор, и написать цикл for await of для его перебора
 */

const asyncIterableObject = {
    init: 5,
    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                if (this.init >= 0) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, 1000);
                    });
                    return { value: this.init--, done: false };
                }
                return Promise.resolve({ done: true });
            },
        };
    },
};

(async function () {
    for await (let num of asyncIterableObject) {
        console.log(num); // 5, 4,3,2,1,0 c интервалом в 1сек
    }
})();