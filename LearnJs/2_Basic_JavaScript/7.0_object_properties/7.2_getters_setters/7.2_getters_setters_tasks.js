// Task 1
// Сделать фабрику дескрипторов, которая добавляет геттер, который возвращает сумму всех чисел в объекте. (например sum)
// Применить на нескольких объектах.

const addTotalDescriptor =  (obj) => {
    Object.defineProperty(obj,'sum',{
        // а если будет get стрелкой, то this === undefined
        get(){
            return Object.values(this).filter(Number).reduce((acc,value)=> acc + value,0)
        }
    })
}

const obj1 = {
    value1: 10,
    value2: 15,
    value3: 20,
    name: 'o1',
};

const obj2 = {
    value1: 99,
    value2: 99,
    value3: 99,
    name: 'o2',
};

addTotalDescriptor(obj1);
addTotalDescriptor(obj2);
console.log(
    obj1.sum,     // Output: 45
    obj2.sum,     // Output: 297
);