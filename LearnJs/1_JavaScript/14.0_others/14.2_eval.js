/**
 * функция eval позволяет выполнять строку кода.
 * Код в eval выполняется в текущем лексическом окружении, поэтому ему доступны внешние переменные
 * В строгом режиме у eval имеется своё лексическое окружение. Поэтому функции и переменные, объявленные внутри eval, нельзя увидеть снаружи
 */
{
    let a = 1;

    function f() {
        let a = 2;
        eval('alert(a)'); // 2
    }
    f();
    {
        let x = 5;
        eval("x = 10");
        alert(x); // 10, значение изменено
    }
}

/**
 * Чтобы выполнить строку кода с помощью eval в глобальной области видимости, то вызывать через window.eval(...)
 * Если коду внутри eval нужны локальные переменные, меняем eval на new Function и передавайте необходимые данные как аргументы:
 *              let f = new Function('a', 'alert(a)');
 *              f(5); // 5
 */
{
    let x = 1;
    {
        let x = 5;
        window.eval('alert(x)'); // 1 (глобальная переменная)
    }
}