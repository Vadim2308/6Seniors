/**
 * Функция, находящая сумму чисел
 */

{
    const func = (...args) => args.reduce((acc,item)=>acc+item,0)

    console.log( func(1, 2, 3)       ); // выведет 6
    console.log( func(1, 2, 3, 4)    ); // выведет 10
    console.log( func(1, 2, 3, 4, 5) ); // выведет 15
}

/**
 Функция, сливающая массивы в двухмерный
 */
{

    const unite = (...entities) => entities
    let result = unite([1, 2, 3], [4, 5, 6], [7, 8, 9]);
    console.log(result); // выведет [ [1, 2, 3,] [4, 5, 6], [7, 8, 9] ]
}

/**
 Функция, сливающая массивы в один
 */


{

    const merge = (...entities) => entities.flat(Infinity)
    const merge2 = (...entities) => [].concat(...entities)

    let result = merge2([1, 2, 3], [4, 5, 6], [7, 8, 9]);
    console.log(result); // выведет [1, 2, 3, 4, 5, 6, 7, 8, 9]
}