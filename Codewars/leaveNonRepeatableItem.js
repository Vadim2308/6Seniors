/**
 * Задача
 * Из массива [1,1,2,2,3,4,5] оставить только элементы, у которых нет повторений [3,4,5]
 */
const arr = [1,1,2,2,3,4,5]

const obj = {}

for(let value of arr){
    obj[value] = obj[value] ? ++obj[value] : 1
}

console.log(Object.keys(obj).filter(el=>obj[el] === 1))