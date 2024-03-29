/**
 * 1 Что такое this?
 * This — это ключевое слово в JavaScript которое позволяет получить доступ к контексту;
 * Грубо говоря, this — это ссылка на некий объект, к свойствам которого можно получить доступ внутри вызова функции.
 */

/**
 * 2. Как "потерять" this?
 * Например, при передаче метода объекта по ссылке
 */
{
    let obj = {
        test: 123,
        meth() {
            console.log(this.test);
        },
    };
    const method = obj.meth;
    method(); // this === window. В 'use strict' this === undefined (Cannot read properties of undefined (reading 'test'))
}

/**
 * 3. Как "не терять" this?
 * Использовать в объектах (в методах) Function Declaration. Если внутри метода есть еще функции, то их писать через стрелки
 * Либо если нужно все таки вынести метод в отдельную переменную, можно навсегда привязать контекст
 */
{
    let obj = {
        test: 123,
        meth() {
            console.log(this.test);
        },
    };
    const method = obj.meth.bind(obj);
}

/**
 * 4. Чему равен this в свойствах объекта?
 *  this ссылается на window (даже в режиме use strict)
 */

/**
 * 5. Чему равен this в геттерах/сеттерах объекта?
 * И в геттерах и в сеттерах this ссылается на объект, в котором они определены (если конечно не стрелка)
 */
{
    const obj = {
        test: 123,
        surname:'',
        get meth() { // Getter - вычисляемое свойство объекта. В момент инициализации this ссылается на объект
            console.log(this)
            return this.test;
        },
        set key(arg) {
            // [this.test, this.surname] = arg.split(' ');
            this.test = arg; // this === obj
        },
        doubleTest: this, // this ссылается на window (даже в режиме use strict)
    };
    obj.key = 3
    console.log(obj);
}

/**
 * 6. Чему равен this внутри функции-стрелки?
 * this в стрелочной функции ссылается на внешнее окружение, и определяется при инициализации функции и никогда не меняется
 * если стрелочная функция определена в методе объекта, который описан через FD, то this в стрелке ссылается на this этого метода
 * this в стрелке на верхнем уровне со строгим или нет режимом равен window
 */

/**
 * Чему равен this в обработчиках ?
 * elem.addEventListener("click",()=>{console.log(this)}) this === Window
 * elem.addEventListener("click",function(){console.log(this)}) this === elem
 */