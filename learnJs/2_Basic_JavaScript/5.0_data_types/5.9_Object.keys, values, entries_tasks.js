/**
 * Сумма свойств объекта
 * Есть объект salaries с произвольным количеством свойств, содержащих заработные платы.
 * Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат с помощью метода Object.values и цикла for..of.
 * Если объект salaries пуст, то результат должен быть 0.
 */

{
    let salaries = {
        "John": 100,
        "Pete": 300,
        "Mary": 250
    };

    const sumSalaries = (entity) =>
        Object.keys(entity).length
        ? Object.values(entity).map(Number).reduce((acc,item)=> acc + item)
        : 0

    console.log(sumSalaries(salaries) ); // 650
}

/**
 * Подсчёт количества свойств объекта
 * Напишите функцию count(obj), которая возвращает количество свойств объекта:
 */

{
    let user = {
        name: 'John',
        age: 30
    };

    const count = entity => Object.keys(entity).length

    console.log( count(user) ); // 2
}