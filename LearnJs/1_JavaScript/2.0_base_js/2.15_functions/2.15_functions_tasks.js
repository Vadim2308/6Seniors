/**
 * Задача 1
 * Обязателен ли "else"?
 * Следующая функция возвращает true, если параметр age больше 18. В ином случае она запрашивает подтверждение через confirm и возвращает его результат:
 */

function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        // ...
        return confirm('Родители разрешили?');
    }
}
// Ответ. Нет, не обязателен. Функция также будет работать, если убрать else, т.е. после блока if вернуть результат confirm.

/**
 * Задача 2
 * Перепишите функцию, используя оператор '?' или '||'
 */
{
    function checkAge(age) {
        if (age > 18) {
            return true;
        } else {
            return confirm('Родители разрешили?');
        }
    }
}
/* Решение */
{
    /* Вариант 1 */
    function checkAge(age) {
        return age > 18 || confirm('Родители разрешили?')
    }
}
{
    /* Вариант 2 */
    function checkAge(age) {
        return age > 18 ? true : confirm('Родители разрешили?')
    }
}

/**
 * Задача 3
 * Напишите функцию min(a,b), которая возвращает меньшее из чисел a и b.
 */

{
    function min (a,b) {
        return a < b ? a : b
    }
}

/**
 * Задача 4
 * Напишите функцию pow(x,n), которая возводит x в степень n и возвращает результат.
 * Функция обязана поддерживать только натуральные значения n, т.е. целые от 1 и выше.
 */

{
    /* Вариант 1*/
    function pow(base, exponent) {
        if(exponent < 1){
            console.error("The number must be greater than or equal to 1")
            return
        }
        return base ** exponent
    }
}
{
    /* Вариант 2*/
    function pow(base, exponent) {
        if(exponent < 1){
            console.error("The number must be greater than or equal to 1")
            return
        }
        return Math.pow(base,exponent)
    }
}
{
    /* Вариант 3 */
    function pow(base,exponent){
        if(exponent < 1){
            console.error("The number must be greater than or equal to 1")
            return
        }
        let result = 1
        for(let i = 1;i<=exponent;i++){
            result *= base
        }
        return result
    }
}