/**
 * Подсчитать сумму всех вознаграждений
 */
{
    let company = { // тот же самый объект, сжатый для краткости
        sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
        development: {
            sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
            internals: [{name: 'Jack', salary: 1300}]
        }
    }

    const salaries = (obj) => {
        const keys = Object.keys(obj);
        let result = 0
        for(let key of keys){
            if(Array.isArray(obj[key])){
                const sum = obj[key].reduce((acc,{salary})=>salary + acc,0)
                result += sum
            } else {
                const sum = salaries(obj[key])
                result += sum
            }
        }
        return result
    }

    console.log(salaries(company))
}

/**
 * Вычислить сумму чисел до данного
 * Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
 * sumTo(1) = 1
 * sumTo(2) = 2 + 1 = 3
 * sumTo(3) = 3 + 2 + 1 = 6
 * sumTo(4) = 4 + 3 + 2 + 1 = 10
 */

{
    /**
     * v1
     */
    const sumTo = (n) => n === 1 ? 1 : n + sumTo(n-1)

    /**
     * v2
     */
    {
        const sumTo = (n) => {
            let res = n
            while(--n){
                res += n
            }
            return res
        }
    }
    /**
     * v3
     */
    {
        function sumTo(n) {
            return n * (n + 1) / 2;
        }
    }
}

/**
 * Вычислить факториал
 * 4! = 4 * 3 * 2 * 1 = 24
 */
{
    const factorial = (n) => {
        if (n === 1) return n;
        return n * factorial(n-1)
    }
}

/**
 * Числа Фибоначчи
 * Напишите функцию fib(n) которая возвращает n-е число Фибоначчи. (следующее число получается как сумма двух предыдущих.) (1, 1, 2, 3, 5, 8, 13)
 * alert(fib(3)); // 2
 * alert(fib(7)); // 13
 */
{
    function fib(n) {
        return n <= 1 ? n : fib(n - 1) + fib(n - 2);
    }
}

/**
 * Вывод односвязного списка
 * Напишите функцию printList(list), которая выводит элементы списка по одному.
 */
{
    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

    /**
     * v1
     */
    {
        const printList = (data) => {
            console.log(data.value)
            if(data.next){
                printList(data.next)
            }
        }
    }

    /**
     * v2
     */
    {
        const printList = (data) => {
            while(data){
                console.log(data.value)
                data = data.next
            }
        }
    }
}

/**
 * Вывод односвязного списка в обратном порядке
 */
{
    /**
     * v1
     */
    {
        const printList = (data) => {
            if(data.next){
                printList(data.next)
            }
            console.log(data.value)
        }
    }

    /**
     * v2
     */
    {
        const printList = (data) => {
            const values = [];
            while(data){
                values.push(data.value)
                data = data.next
            }
            for(let value of values.reverse()){
                console.log(value)
            }
        }
    }
}

/**
 * Реализуйте функцию с рекурсией и без, которая принимает объект и путь в виде строки, и возвращает найденный ключ
 */

{

    // v1
    function getValueByPath(obj, path) {
        if (!path) return obj;
        const splittedPath = path.split('.');
        const [first, ...rest] = splittedPath;
        if(obj[first] !== undefined){
            return getValueByPath(obj[first],rest.join('.'));
        } else {
            return null;
        }
    }

    // v2
    function getValueByPath(obj, path) {
      const splittedPath = path.split('.');
      for(let part of splittedPath){
        if(obj[part] !== undefined){
          obj = obj[part]
        } else {
          return null
        }
      }
    return obj
}

    const obj = {
        a: {
            b: {
                c: 42
            }
        }
    };

console.log(getValueByPath(obj, 'a.b.c')); // Выведет 42
console.log(getValueByPath(obj, 'a.b.d')); // Выведет undefined
}