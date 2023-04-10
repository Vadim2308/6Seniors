/**
 * Сделать первый символ заглавным
 * Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом. Например: ucFirst("вася") == "Вася";
 */
{
    const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Проверка на спам
 * Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false.
 * Функция должна быть нечувствительна к регистру
 */
{
    /**
     * Решение 1
     */
    function checkSpam(str) {
        let lowerStr = str.toLowerCase();
        return lowerStr.includes('viagra') || lowerStr.includes('xxx');
    }
}
{
    /**
     * Решение 2
     */
    const checkSpam = (str) => {
        const refViagra = 'viagra';
        const refX = 'XXX';
        const lowerCase = str.toLowerCase()
        return !!(~lowerCase.indexOf(refViagra.toLowerCase()) || ~lowerCase.indexOf(refX.toLowerCase()));
    };
}
/**
 * Усечение строки
 * Создайте функцию truncate(str, maxlength), которая проверяет длину строки str и, если она превосходит maxlength, заменяет конец str на "…", так, чтобы её длина стала равна maxlength.
 * Результатом функции должна быть та же строка, если усечение не требуется, либо, если необходимо, усечённая строка.
 *
 * truncate("Вот, что мне хотелось бы сказать на эту тему:", 20) = "Вот, что мне хотело…"
 * truncate("Всем привет!", 20) = "Всем привет!"
 */
{
    const truncate = (str, length) => str.length > length ? `${str.slice(0, length-1)}…` : str
}

/**
 * Выделить число
 * Есть стоимость в виде строки "$120". То есть сначала идёт знак валюты, а затем – число.
 * Создайте функцию extractCurrencyValue(str), которая будет из такой строки выделять числовое значение и возвращать его.
 */
{
    const extractCurrencyValue = (currency) => +currency.slice(1)
}