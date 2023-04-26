//Задача 1 - написать простую реализацию метода Array.from, которая принимает итерируемый обьект или псевдомассив и создает на его основе новый массив. Если итератор не имплементирован, то выкинуть ошибку (ошибка выкидывается при помощи 'throw new Error')

function arrayFrom(iterable){
  const iterator = iterable[Symbol.iterator]
  if(!iterator){
    throw new Error('iterator is not implemented')
  }
  return [...iterable]

}
console.log(arrayFrom('😂😂😂')); // [😂,😂,😂]
console.log(arrayFrom('aboba')); // ['a','b','o','b','b']
console.log(arrayFrom({}));
// //----------------------------------------------------------

//Задача 2 - дан обьект students, чтобы при вызове for ..of он вывел всех студентов
const students = {
     montenegro : ['vshirokov'],
     vladikavkaz : ['tkenz'],
     yaroslavl : ['polo_js'],
     belgorod : ['novicky'],
     [Symbol.iterator]() {
          const values = Object.values(this).flat();
          let index = 0
          return {
            next(){
               if(index < values.length){
                 return {done:false,value:values[index++]};
               }else {
                 return {done:true};
               }
            }
         }
     }
 };

 for (let student of students) {
     console.log(student);
 }

//---------------------------------------------------------------------

//Задача 3 - Дан массив, при помощи итератора и for..of вывести элементы в обратном порядке

const arr = ["z","o","p","a"];

arr[Symbol.iterator] = function () {
  let index = this.length - 1
  const arr = this
  return {
    next(){
      if(index >= 0){
        return {value:arr[index--],done:false}
      }else {
        return {done:true}
      }
    }
  }
};

for (const item of arr) {
  console.log(item);
}
//----------------------------------------------------------------------

// Задача 4 - найдите хотя бы одну строку в массиве строк, содержащую только уникальные символы

const array = ["apple", "banana", "pear", "kiwi", "grape"];
const hasUniqueChars = array.some(
  el => {
    const uniq = [...new Set(el)].join('')
    return el === uniq
  }
);
console.log(hasUniqueChars);

//------------------------------------------------------------------------

//Задача 5 - проверьте, содержат ли все строки в массиве только буквы верхнего регистра.

const arrayU = ["APPLE", "BANANA", "PEAR", "KIWI", "GRAPE"];

const isUpperedCase = arrayU.every(el=> el === el.toUpperCase())

console.dir(isUpperedCase)
//------------------------------------------------------------------------

//Задача 6 - Проверьте, содержит ли массив все элементы другого массива.

const zopa = [1, 2, 3, 4, 5];
const subset = [3, 4];

const isIncludes = subset.every(el=>zopa.includes(el))

console.log(isIncludes)


//------------------------------------------------------------------------

// Задача 7 - найти общую стоимость всего исправного оборудования и без деффетов

const equipmentStore = [
  { name: "laptop", quantity: 10, price: 1000, defective: 1, condition: "new" },
  { name: "smartphone", quantity: 20, price: 500, defective: 3, condition: "used" },
  { name: "printer", quantity: 5, price: 200, defective: 0, condition: "new" },
  { name: "monitor", quantity: 8, price: 300, defective: 2, condition: "used" },
];

const sum = equipmentStore.filter(el=>el.defective === 0 && el.condition === 'new').reduce((acc,item)=> acc + item.price * item.quantity,0)

console.log(sum)