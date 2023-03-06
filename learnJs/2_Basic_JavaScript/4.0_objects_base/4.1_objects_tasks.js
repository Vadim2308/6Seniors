/**
 * Создайте пустой объект user.
 * Добавьте свойство name со значением John.
 * Добавьте свойство surname со значением Smith.
 * Измените значение свойства name на Pete.
 * Удалите свойство name из объекта.
 */

{
    const user = {};
    user.name = "John";
    user.surname = 'Smith';
    user.name = "Pete";
    delete user.name;
}

/**
 * Напишите функцию isEmpty(obj), которая возвращает true, если у объекта нет свойств, иначе false.
 */
{
    // Вариант 1
    const isEmpty = (entity) => {
        for (const key in entity) {
            return false;
        }
        return true;
    };

    // Вариант 2
    const isEmpty2 = (entity) => !Object.keys(entity).length;

    let schedule = {};
    console.log(isEmpty(schedule)); // true

    schedule["8:30"] = "get up";
    console.log(isEmpty(schedule)); // false
}

/**
 * Сумма свойств объекта
 * Напишите код для суммирования всех зарплат и сохраните результат в переменной sum. Должно получиться 390.
 * Если объект salaries пуст, то результат должен быть 0.
 *
 */
{
    let salaries = {
        John: 100,
        Ann: 160,
        Pete: 130
    }
    {
        // Решение 1
        let sum = 0
        for(const key in salaries){
            sum += salaries[key]
        }
    }
    {
        // Решение 2
        const sum = Object.values(salaries).length ? Object.values(salaries).reduce((acc, item) => acc + item) : 0;
    }
}

/**
 * Создайте функцию multiplyNumeric(obj), которая умножает все числовые свойства объекта obj на 2.
 * Обратите внимание, что multiplyNumeric не нужно ничего возвращать. Следует напрямую изменять объект.
 */
{
    let menu = {
        width: 200,
        height: 300,
        title: "My menu"
    };
    {
        // Решение 1
        const multiplyNumeric = (entity) => {
            for(const key in entity){
               if(typeof entity[key] !== 'number') continue
                // entity[key] = entity[key] * 2;
                entity[key] *= 2;
            }
        }
        multiplyNumeric(menu);
        console.log(menu)
    }
      // Решение 2
    {
        const multiplyNumeric = (entity) => {
            Object.keys(entity).forEach((el) => {
                if (typeof entity[el] === 'number') {
                    entity[el] *= 2;
                }
            });
        };
        multiplyNumeric(menu);
        console.log(menu);
    }
}