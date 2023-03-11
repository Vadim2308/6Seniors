{
    /*
     Задача 1. Что будет в консоли, и почему. Расскажите алгоритм преобразований.
     */
    let user = {
        name: "John",
        money: 1000,
    };
    console.log(String(user)); // String(user). 1. Вызывается метод toString(). В дефолте метод toString() вернет [object Object]. Поэтому в консоли будет [object Object]
    console.log(+user); // Приводим к числу. 1.valueOf() => вернет объект user. Т.к. это не примитив, вызовется toString() => Number('[object Object]') => NaN
    console.log(user + 500); // hint === default, т.к. унарный плюс может быть применен как к строкам, так и к числам.Вызывается valueOf() => вернет объект user. Т.к. это не примитив, вызовется toString() и вернет [object Object]. '[object Object]' + 500 === '[object Object]500'
}

{
    /**
     * Задача 2. Есть объект user, указанный выше.
     * Переопределите методы преобразования этого объекта, чтоб они возвращали любое на ваш выбор значение
     */
    let user = {
        name: "John",
        money: 1000,
        toString(){
            return this.name
        },
        valueOf() {
            return this.money;
        }
    };
    console.log(String(user)); // "John"
    console.log(+user); // 1000
    console.log(user + 500); // 1500
}

{
    /**
     * Задача с RND
     * Опишите алгоритм преобразования
     */
        let s = Symbol();
        let obj = {
          '12': 1,
          'foo': 2,
          'true': 3,
          [s]: 4
        }

    // получим ли доступ к значениям объекта?

    /**
     * Вопрос 1. Что выведет console.log(obj[6*2])
     * Ответ: 1. В скобках вычислится значение => obj[12] => obj['12'] => 1
     */

    /**
     * Вопрос 2. Что выведет console.log(obj[{toString: () => 'foo'}])
     * Ответ:
     *  * Cоздается новый объект с методом toString(), который  возвращает 'foo'
     *  * При преобразовании этого объекта к строке вызывает этот toString, и т.к. он вовзвращает примитив, вернется ключ 'foo'
     *  * obj['foo'] => 2
     */

    /**
     * Вопрос 1. console.log(obj[1 === 1])
     * Ответ: 1. В скобках вычислится значение => obj[true] => obj['true'] => 3
     */

    /**
     * Вопрос 1. console.log(obj[s])
     * Ответ: 1. 4
     */
}