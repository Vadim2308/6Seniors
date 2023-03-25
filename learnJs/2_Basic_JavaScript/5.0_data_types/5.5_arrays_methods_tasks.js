/**
 * Переведите текст вида border-left-width в borderLeftWidth
     * camelize("background-color") == 'backgroundColor';
     * camelize("list-style-image") == 'listStyleImage';
     * camelize("-webkit-transition") == 'WebkitTransition';
 */
{
    const camelize = (str) =>
        str.split('-')
            .map((el, idx) => idx ? el.charAt(0).toUpperCase() + el.slice(1) : el)
            .join('');
}

/**
 * Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет элементы со значениями больше или равными a и меньше или равными b и возвращает результат в виде массива.
 * Функция должна возвращать новый массив и не изменять исходный.
 */
{
    const filterRange = (arr,a,b) => arr.filter((el)=> el >=a && el <= b)
}

/**
 * Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr и удаляет из него все значения кроме тех, которые находятся между a и b.
 * Функция должна изменять принимаемый массив и ничего не возвращать.
 */

{
    const filterRangeInPlace = (arr, a, b) => {
        for (let i = 0; i < arr.length; i++) {
            const isValueForSave = arr[i] >= a && arr[i] <= b;
            if (!isValueForSave) {
                arr.splice(i, 1);
                i--
            }
        }
    };
    const filterRangeInPlace2 = (arr, a, b) => {
        const sorted = [...arr].sort((a, b) => a - b);
        for(const value of sorted){
            const isValueForSave = value >= a && value <= b;
            if(!isValueForSave){
                const index = arr.findIndex(el=> el === value)
                arr.splice(index,1)
            }
        }
    };
    let arr = [5, 3, 8, 1];
    filterRangeInPlace(arr, 2, 5);
    console.log(arr); // [5, 3]
}

/**
 * Сортировать в порядке по убыванию
 * let arr = [5, 2, 1, -10, 8]; // 8, 5, 2, 1, -10
 */

{
    const sorted = arr => [...arr].sort((a,b)=>b - a)
}

/**
 * Скопировать и отсортировать массив
 * У нас есть массив строк arr. Нужно получить отсортированную копию, но оставить arr неизменённым.
 * Создайте функцию copySorted(arr), которая будет возвращать такую копию.
 */
{
    const arr = ["HTML", "JavaScript", "CSS"];
    const sorted = (arr) => [...arr].sort((a,b)=>a.localeCompare(b))
}

/**
 * Создать расширяемый калькулятор
 */
{
    function Calculator() {
        this.methods = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
        };
        this.calculate = function (str) {
            const [a, operator, b] = str.split(' ');
            return this.methods[operator](+a, +b);
        };
        this.addMethod = function (name, func) {
            this.methods[name] = func;
        };
    }

    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);
    let result = powerCalc.calculate("2 ** 3");
    console.log( result ); // 8
}

/**
 * Трансформировать в массив имён
 * У вас есть массив объектов user, и в каждом из них есть user.name. Напишите код, который преобразует их в массив имён.
 */

{
    let vasya = { name: "Вася", age: 25 };
    let petya = { name: "Петя", age: 30 };
    let masha = { name: "Маша", age: 28 };

    let users = [vasya, petya, masha];

    let names = user.map(({name})=>name)

    console.log( names ); // Вася, Петя, Маша
}

/**
 * Трансформировать в объекты
 * У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.
 * Напишите код, который создаст ещё один массив объектов с параметрами id и fullName, где fullName – состоит из name и surname.
 */

{
    let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
    let petya = { name: "Петя", surname: "Иванов", id: 2 };
    let masha = { name: "Маша", surname: "Петрова", id: 3 };

    let users = [ vasya, petya, masha ];

    let usersMapped = users.map(({name,surname,id})=>({id,fullName:`${name} ${surname}`}))
        /*
        usersMapped = [
          { fullName: "Вася Пупкин", id: 1 },
          { fullName: "Петя Иванов", id: 2 },
          { fullName: "Маша Петрова", id: 3 }
        ]
        */
}

/**
 * Перемешайте массив (ИЗУЧИТЬ!)
 */

/**
 * Получить средний возраст
 * Напишите функцию getAverageAge(users), которая принимает массив объектов со свойством age и возвращает средний возраст.
 */

{
    let vasya = { name: "Вася", age: 25 };
    let petya = { name: "Петя", age: 30 };
    let masha = { name: "Маша", age: 29 };

    let arr = [vasya, petya, masha];

    const getAverageAge = (arr) => {
        const sum = arr.reduce((acc,{age})=> acc + age,0)
        return sum / arr.length
    }
    console.log( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
}

/**
 * Оставить уникальные элементы массива
 * Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.
 */

{
    function unique(arr) {
        const result = []
        for(const item of arr){
            if(result.includes(item)) continue
            result.push(item)
        }
        return result
    }

    let strings = ["кришна", "кришна", "харе", "харе",
        "харе", "харе", "кришна", "кришна", ":-O"
    ];

    console.log( unique(strings) ); // кришна, харе, :-O
}

/**
 * Создайте объект с ключами из массива
 * Допустим, мы получили массив пользователей в виде {id:..., name:..., age:... }.
 * Создайте функцию groupById(arr), которая создаст из него объект с id в качестве ключа и элементами массива в качестве значений.
 */

{
    let users = [
        {id: 'john', name: "John Smith", age: 20},
        {id: 'ann', name: "Ann Smith", age: 24},
        {id: 'pete', name: "Pete Peterson", age: 31},
    ];

    const groupById = (arr)=> arr.reduce((acc,item)=>({...acc,[item.id]:item}),{})

    let usersById = groupById(users);

    console.log(usersById)

    /*
    // после вызова у нас должно получиться:

    usersById = {
      john: {id: 'john', name: "John Smith", age: 20},
      ann: {id: 'ann', name: "Ann Smith", age: 24},
      pete: {id: 'pete', name: "Pete Peterson", age: 31},
    }
    */
}