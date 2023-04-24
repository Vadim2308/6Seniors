console.log(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__")) // Проверить что __proto__ это геттер, сеттер


function F() {}
console.log(F.__proto__ === Function.prototype); // true

const map = new Map()
console.log(map.__proto__ === Map.prototype)
console.log(String.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);

{
    /**
     * Почему такая цепочка
     */
    map.__proto__ === Map.prototype
    Map.prototype.__proto__ === Object.prototype
    Object.prototype.__proto__ === null
}

{
    console.log({} instanceof Array); // Как сделать чтоб прототип объект был инстансом массива ?
    // Решение
    console.log({__proto__: Array.prototype} instanceof Array); // оператор instance сравнивает __proto__ и prototype
}

{
    const obj = {
        __proto__: null,
    }
    /* Встроенный геттер/сеттер __proto__ не безопасен, если мы хотим использовать созданные пользователями ключи в объекте.
       Как минимум потому, что пользователь может ввести "__proto__" как ключ, от чего может возникнуть ошибка.
       Если повезёт – последствия будут лёгкими, но, вообще говоря, они непредсказуемы.
    */
    obj.__proto__ = Object.prototype; // не решает проблемы.
    Object.setPrototypeOf(obj, Object.prototype); // Только там способом можно переопределять __proto__
}