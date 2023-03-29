/**
 * В современном JavaScript существует два типа чисел:
 * 1. Обычные числа в JavaScript хранятся в 64-битном формате, который также называют «числа с плавающей точкой
 * 2. BigInt числа дают возможность работать с целыми числами произвольной длины. Более чем (2^53-1) или менее чем -(2^53-1).
 */

/**
 * Способы записи числа
 */
{
    let billion = 1000000000;
    let billion2 = 1e9;  // 1 миллиард, буквально: 1 и 9 нулей
    // 1e3 = 1 * 1000 // "e" производит операцию умножения числа на 1 с указанным количеством нулей.
    // 1.23e6 = 1.23 * 1000000
}
{
    let ms = 0.000001;
    let ms2 = 1e-6; // шесть нулей, слева от 1
}
{
    const number = 1_000_000_000
    console.log(number) // 1000000000
    const integer = 1_234_567_890
    const float = 0.123_456_789
    const binary = 0b0101_1111_0001
    const hex = 0x12_AB_34_CD
    const bigInt = 1_234_567_890n
}

/**
 * toString(base)
 */
{
    let num = 255;
    alert( num.toString(16) );  // ff; base=16 — для шестнадцатеричного представления цвета, кодировки символов и т.д
    alert( num.toString(2) );   // 11111111; base=2 — обычно используется для отладки побитовых операций, цифры 0 или 1.
    alert( num.toString(36) );   // 73;  максимальное основание, цифры могут быть 0..9 или A..Z.
}

/**
 * Округление
 */

{
    // Math.floor(пол) - Округление в меньшую сторону: 3.1 => 3, 3.9 => 3, -1.1 => -2.
    // Math.ceil(потолок) - Округление в большую сторону: 3.1 => 4, -1.1 => -1.
    // Math.round(круг) - Округление до ближайшего целого: 3.1 => 3, 3.6 => 4, 3.5 => 4, -1.1 => -1.
    // Math.trunc (усечение, не поддерживается IE) - Производит удаление дробной части без округления: 3.1 становится 3, а -1.1 — -1.

    // Округлить до n-го количества цифр в дробной части
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"

    let num2 = 12.36;
    alert( num2.toFixed(1) ); // "12.4"

    let num3 = 12.34;
    alert( num3.toFixed(5) ); // "12.34000", добавлены нули, чтобы получить 5 знаков после запятой
}

/**
 * 0.1 + 0.2 === 0.30000000000000004
 * 0.3 + 0.6 === 0.8999999999999999
 * Компьютеры изначально могут хранить только целые числа, поэтому им нужен какой-то способ представления десятичных чисел.
 * Это представление не совсем точное.
 * 1/2, 1/4, 1/5, 1/8 и 1/10 могут быть четко выражены, поскольку все знаменатели используют простые множители числа 10
 * 1/3, 1/6, 1/7 и 1/9 — повторяющиеся десятичные числа, и количество знаков после запятой ограничивается только памятью
 * важно понимать, что операции с плавающими числами неточны (эту точность можно регулировать), а значит при решении задач, связанных с подобными числами, необходимо прибегать к специальным трюкам, которые позволяют добиться необходимой точности.
 */

/**
 * isFinite
 * isFinite(value) преобразует аргумент в число и возвращает true, если оно является обычным числом, т.е. не NaN/Infinity/-Infinity:
 * Иногда isFinite используется для проверки, содержится ли в строке число
 */
{
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, потому что специальное значение: NaN
    alert( isFinite(Infinity) ); // false, потому что специальное значение: Infinity
}

/**
 * isNaN(value) преобразует значение в число и проверяет является ли оно NaN:
 */
{
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true, т.к. str преобразуется в NaN.
}
/**
 * Number.isNaN и Number.isFinite
 * Методы Number.isNaN и Number.isFinite – это более «строгие» версии функций isNaN и isFinite.
 * Они не преобразуют аргумент в число, а наоборот – первым делом проверяют, является ли аргумент числом (принадлежит ли он к типу number).
 */
{
    alert(Number.isNaN(NaN) ); // true
    alert(Number.isNaN("str" / 2) ); // true

    // Обратите внимание на разный результат:
    alert(Number.isNaN("str") ); // false, так как "str" является строкой, а не числом
    alert(isNaN("str") ); // true, так как isNaN сначала преобразует строку "str" в число и в результате преобразования получает NaN
}

{
    alert(Number.isFinite(123) ); // true
    alert(Number.isFinite(Infinity)); // false
    alert(Number.isFinite(2 / 0) ); // false

    // Обратите внимание на разный результат:
    alert(Number.isFinite("123")); // false, так как "123" является строкой, а не числом
    alert(isFinite("123")); // true, так как isFinite сначала преобразует строку "123" в число 123
}

/**
 * Object.is() определяет, являются ли два значения одинаковыми значениями.
 * Object.is(a, b) идентичен a === b.
 */
{
    Object.is('foo', 'foo');     // true
    Object.is(window, window);                // true

    Object.is('foo', 'bar');     // false
    Object.is([], []);           // false

    const test = { a: 1 };
    Object.is(test, test);       // true

    Object.is(null, null);       // true

    // Специальные случаи
    Object.is(0, -0);            // false
    Object.is(-0, -0);           // true
    Object.is(NaN, 0/0);                // true
}

/**
 * parseInt и parseFloat
 * Они «читают» число из строки. Если в процессе чтения возникает ошибка, они возвращают полученное до ошибки число.
 * Функция parseInt возвращает целое число, а parseFloat возвращает число с плавающей точкой:
 */
{
    alert( parseInt('100px') ); // 100
    alert( parseFloat('12.5em') ); // 12.5

    alert( parseInt('12.3') ); // 12, вернётся только целая часть
    alert( parseFloat('12.3.4') ); // 12.3, произойдёт остановка чтения на второй точке

    // Функции parseInt/parseFloat вернут NaN, если не смогли прочитать ни одну цифру:
    alert( parseInt('a123') ); // NaN, на первом символе происходит остановка чтения
}

/**
 * Math
 */
{
    // Math.random() Возвращает псевдослучайное число в диапазоне от 0 (включительно) до 1 (но не включая 1)
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232

    // Math.max(a, b, c...) / Math.min(a, b, c...) Возвращает наибольшее/наименьшее число из перечисленных аргументов.
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1

    // Math.pow(n, power) Возвращает число n, возведённое в степень power
    alert( Math.pow(2, 10) ); // 2 в степени 10 = 1024
}