/**
 * Напишите функцию, принимающая массив, и возвращающая итератор, результатом работы которого являются (значение-индекс)
 */

const makeIterator = (arr) => {
    let index = 0;
    return {
        next() {
            if (index < arr.length) {
                const result = { done: false, value: `${arr[index]}-${index}` };
                index++;
                return result;
            }
            return { done: true };
        },
    };
};

const iterator = makeIterator(['Hello', 'world']);

console.log(iterator.next()); // {done: false, value: "Hello-0"}
console.log(iterator.next()); // {done: false, value: "world-1"}
console.log(iterator.next()); // {done: true}
console.log(iterator.next()); // {done: true}