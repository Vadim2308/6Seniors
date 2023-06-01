/**
 * Скопирован ли массив?
 */
{
    let fruits = ["Яблоки", "Груша", "Апельсин"];

   // добавляем новое значение в "копию"
    let shoppingCart = fruits;
    shoppingCart.push("Банан");

   // что в fruits?
    console.log( fruits.length ); //
    // Ответ:4, т.к. shoppingCart и fruits ссылаются на один и тот же массив
}

/**
 * Операции с массивами
 */
{
    const styles = ['Джаз','Блюз']
    styles.push("Рок-н-ролл")
    const middleIndex = Math.floor((styles.length - 1) / 2)
    styles[middleIndex] = 'Классика'
    const firstElem = styles.shift()
    styles.unshift("Рэп","Регги")
}

/**
 * Вызов в контексте массива
 * Каков результат? Почему?
 */
{
    let arr = ["a", "b"];
    arr.push(function() {
        console.log(this);
    });
    arr[2]();
    /**
     * Ответ this === arr (a,b,function(){...})
     * Вызов arr[2]() синтаксически – старый добрый obj[method](), в роли obj – arr, а в роли method – 2.
     */
}

/**
 * Сумма введённых чисел
 */
{
    const sumInput = () => {
        const array = []
        let value = ''
        do {
            value = prompt("Введите значение", '0')
            array.push(+value)
        } while (value !== null && value !== '')
        let sum = 0
        for(const key of array){
            sum += key
        }
        console.log(sum,array)
        return sum
    }
    sumInput()
}