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

// Более адаптированная версия
{
    const arr = [1,1,2,2,3,4,5,"6","6"]
    const collection = new Map();

    for(let value of arr){
        if(collection.has(value)){
            collection.set(value,collection.get(value) + 1)
        } else {
            collection.set(value,1)
        }
    }

    const filtered = [];
    for(let [k,v] of collection){
        if(v === 1) filtered.push(k)
    }
    console.log(filtered) // [3,4,5]
}

// Ответ из chatGPT
{
    function findUniqueElements(arr) {
        const uniqueElements = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
                uniqueElements.push(arr[i]);
            }
        }
        return uniqueElements;
    }
}