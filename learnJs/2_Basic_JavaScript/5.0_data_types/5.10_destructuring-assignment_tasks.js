// Task 1
// Напишите деструктурирующее присваивание, которое:
//    Свойство name присвоит в переменную name.
//    Свойство years присвоит в переменную age.
//    Свойство isAdmin присвоит в переменную isAdmin (false, если нет такого свойства)

{
    let user = {
        name: "John",
        years: 30
    };

    const {name,years:age, isAdmin = false} = user

    console.log( name ); // John
    console.log( age ); // 30
    console.log( isAdmin ); // false
}

// Task 2
// Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.
//     Если объект salaries пустой, то нужно вернуть null.
//     Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
// P.S. Используйте Object.entries и деструктурирование, чтобы перебрать пары ключ/значение.

{
    let salaries = {
        "John": 100,
        "Pete": 300,
        "Mary": 250
    };
    const topSalary = (salaries) => {
        if (!Object.keys(salaries).length) return null;
        const maxSalary = Math.max(...Object.entries(salaries).map(([, value]) => value));
        return Object.keys(salaries).find((name) => salaries[name] === maxSalary);
    };
    // Вариант 2
    {
        const topSalary = (salaries) => {
            let [resName,result] = [null,0]

            for (const [name, salary] of Object.entries(salaries)) {
                if (salary > result) {
                    [resName,result] = [name,salary]
                }
            }
            return resName;
        };
    }
    console.log(topSalary(salaries));
}

// Task 3 [Symbol.iterator, Деструктуризация]
// Деструктурировать объект как массив. Какая ошибка появляется? TypeError: object is not iterable
// Применить Symbol.iterator чтобы деструктуризировать без ошибок.
// Деструктрурировать массив как объект и получить не undefined значения.

const object = {
    name: 'object',
    value: 20,
    user: 'Vadim',
};

{
    const [name, value] = object // object is not iterable
}

object[Symbol.iterator] = function () {
    const pairs = Object.entries(this);
    let i = 0;
    return {
        next() {
            if (i < pairs.length) {
                const currentIndex = i;
                i++;
                return { done: false, value: pairs[currentIndex][1] };
            } else {
                return { done: true };
            }
        },
    };
};

const [name, value, data] = object;   // object 20 Vadim

/**
 * Реализуйте Symbol.iterator, который при дестктурирующем присваивании присваивает все в обратном порядке
 * {
 *     const arr = [1,2,3]
 *     let [a, b, c] = arr; => 3,2,1
 * }
 */
{
    const arr = [1, 2, 3];
    arr[Symbol.iterator] = function () {
        let i = this.length - 1;
        return {
            context: this,
            next() {
                if (i >= 0) {
                    const currentIndex = i;
                    i--;
                    return { done: false, value: this.context[currentIndex] };
                } else {
                    return { done: true };
                }
            },
        };
    };
    [a, b, c, k] = arr;
    console.log(a, b, c, k); // 3 2 1 undefined
}

