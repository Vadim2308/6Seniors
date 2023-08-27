/**
 * Реализовать объект, который при сравнении (obj > obj) с самим собой будет давать true/false/true/false (Katana)
 */

const obj = {
    value: 0,
    [Symbol.toPrimitive]: function(hint) {
        if (hint === 'number') {
            this.value--
            return this.value % 4;
        }
        return this;
    }
};

console.log(obj > obj); // true     -1 > -2 === true
console.log(obj > obj); // false      -3 > 0 === false
console.log(obj > obj); // true
console.log(obj > obj); // false