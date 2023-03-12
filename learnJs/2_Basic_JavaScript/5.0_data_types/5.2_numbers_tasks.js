/**
 * Создайте скрипт, который запрашивает ввод двух чисел (используйте prompt) и после показывает их сумму.
 */
{
    const valueA = +prompt('Введите число а', "0");
    const valueB = +prompt('Введите число б', "0");
    console.log(valueA + valueB)
}

/**
 * Создайте функцию readNumber, которая будет запрашивать ввод числового значения до тех пор, пока посетитель его не введёт.
 * Функция должна возвращать числовое значение.
 * Также надо разрешить пользователю остановить процесс ввода, отправив пустую строку или нажав «Отмена».
 * В этом случае функция должна вернуть null.
 */
{
    /**
     * Вариант 1
     */
    const readNumber = () => {
        const value = prompt('Введите число', '0');
        console.log('value', value);
        if (value === '' || value === null) {
            return null;
        }
        if (typeof +value === 'number' && !Number.isNaN(+value)) {
            return +value;
        }  else {
            return readNumber();
        }
    };
}

{
    /**
     * Вариант 2
     */
    const readNumber = () => {
        let res = '';
        do {
            res = prompt('Введите число', '0');
        } while (!isFinite(res));
        if (res === '' || res === null) {
            return null;
        }
        return +res;
    };
}

/**
 * Бесконечный цикл по ошибке
 */

{
    // Этот цикл – бесконечный. Он никогда не завершится, почему?
    let i = 0;
    while (i != 10) {
        i += 0.2;
    }
    // Это происходит из-за потери точности, при прибавлении таких дробей как 0.2.
    // Вывод: избегайте проверок на равенство при работе с десятичными дробями!!!.
}

/**
 * Случайное число от min до max
 * Встроенный метод Math.random() возвращает случайное число от 0 (включительно) до 1 (но не включая 1)
 * Напишите функцию random(min, max), которая генерирует случайное число с плавающей точкой от min до max (но не включая max).
 */
/**
 * alert( random(1, 5) ); // 1.2345623452
 * alert( random(1, 5) ); // 3.7894332423
 * alert( random(1, 5) ); // 4.3435234525
 */

{
    const random = (min, max) => {
        return Math.random() * (max - min) + min;
    };
}

/**
 * Случайное целое число от min до max
 */
/**
 * alert( randomInteger(1, 5) ); // 1
 * alert( randomInteger(1, 5) ); // 3
 * alert( randomInteger(1, 5) ); // 5
 */
{
    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}