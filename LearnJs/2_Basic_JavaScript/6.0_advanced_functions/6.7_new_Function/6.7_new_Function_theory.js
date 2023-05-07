/**
 * Существует ещё один вариант объявления функции. Он используется крайне редко
 * Синтаксис: new Function([arg1, arg2, ...argN], functionBody);
 *
 * Функция создаётся полностью «на лету» из строки, переданной во время выполнения.
 * Например, можно получить новую функцию с сервера и затем выполнить её:
 */
{
    let sum = new Function('a', 'b', 'return a + b');
    alert( sum(1, 2) ); // 3
}
{
    let sayHi = new Function('alert("Hello")');
    sayHi(); // Hello
}
/**
 * [[Environment]]
 */
{
    // Особенности данного вызова в том, что где бы не была объявлена функция, ее [[Environment]] (ссылка на родителя) всегда будет указывать на глобальный объект
    function foo1() {
        const value = 10;
        const newFunction = new Function('return value');
        return newFunction;
    }
    // console.log(foo1()());     // ReferenceError: value is not defined
    // Такая особенность вынуждена из-за возможных проблем с минификаторами - алгоритмами, минифицирующими код и подменяющими имена переменных на более короткие
}

/**
 * this
 * this при таком определении ведет себя, как обычно - ссылается на объект, в котором объявлена функция
 */
{
    const obj = {
        name:  'obj',
        method: new Function('console.log(this)'),      // Output: { name: 'obj', method: [Function: anonymous] }   -  не глобал
    }
    obj.method();
}