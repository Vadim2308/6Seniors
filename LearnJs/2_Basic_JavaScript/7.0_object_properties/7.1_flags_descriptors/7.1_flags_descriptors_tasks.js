/**
 * [Дескрипторы, глава 7 learjs] Задача с собеса
 */

const obj = {
    testProp: 123,
}

Object.defineProperty(obj, 'logTestProp',{
    value(){
        return this.testProp
    }
});

console.log(obj.logTestProp()); // 123
obj.testProp = 345;
console.log(obj.logTestProp()); // 345