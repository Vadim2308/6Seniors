/**
 * Литералы строк - "", '', ``
 */

/**
 * Преимущества бектиков - можно вставлять переменные и переносить на след.строки. Символ переноса - \n
 */
{
    let guestList = `Guests:
     * John
     * Pete
     * Mary
    `;
}

/**
 * Cпецсимволы (\n, \", \' \t) и т.д.
 * \ => экранирование
 * \n — начало новой строки;
 * \t — табуляция, аналогично нажатию кнопки Tab.
 */
{
    console.log( 'I\'m the Walrus!' ); // I'm the Walrus!
    console.log( `I'm the Walrus!` ); // I'm the Walrus!
}

/**
 * Длина строки
 * Эта операция может вернуть неверное количество символов в строке в тех случаях, когда используются эмодзи.
 */
{
    console.log( `My\n`.length ); // 3
}

/**
 * Доступ к символам
 * Для получения символа используйте [] или метод at || charAt.
 */
{
    let str = `Hello`;
    // получаем первый символ
    console.log( str[0] ); // H

    console.log(str.at(0)); // H
    console.log(str.charAt(0)); // H

    // получаем последний символ
    console.log(str[str.length - 1]); // o
    console.log(str.at(-1));
    console.log(str.charAt(-1)); // H
}

/**
 * Циклы for in for of
 */
{
    const str = 'aDSA';

    for (const key of str) {
        console.log(key); // aDSA
    }
    for (const key in str) {
        console.log(key); // 0123
    }
}

/**
 * Cтроки иммутабельны, т.е. все попытки как то изменить строку не работают. Также методы строк не мутируют данные
 *
 */
{
    let str = 'Hi';
    str[0] = 'h'; // ошибка
    console.log( str[0] ); // H
}

/**
 * Изменение регистра
 */
{
    console.log( 'Interface'.toUpperCase() ); // INTERFACE
    console.log( 'Interface'.toLowerCase() ); // interface
    console.log( 'Interface'[0].toLowerCase() ); // 'i'
}

/**
 * Поиск подстроки
 */
{
    // str.indexOf - найдет индекс, с которого начинается подстрока
    let str = 'Widget with id';
    console.log( str.indexOf('Widget') ); // 0, потому что подстрока 'Widget' найдена в начале
    console.log( str.indexOf('widget') ); // -1, совпадений нет, поиск чувствителен к регистру
    console.log( str.indexOf("get") ); // 3
    console.log( str.indexOf("id") ); // 1, подстрока "id" найдена на позиции 1 (..idget with id)
    {
        // Есть необязательный аргумент,с которого начать поиск
        let str = 'Widget with id';
        console.log( str.indexOf('id', 2) ) // 12
    }
    {
        /**
         * Поиск всех вхождений в подстроке через цикл
         */
        let str = 'Ослик Иа-Иа посмотрел на виадук';
        let target = 'Иа'; // цель поиска
        let pos = 0;

        while (true) {
            const position = str.indexOf(target, pos);
            if (position === -1) break;
            console.log(`position ${position}`); //0,6
            pos = position + 1;
        }
    }
    // str.lastIndexOf(substr, position) = ищет с конца
    // P.S. Он используется тогда, когда нужно получить самое последнее вхождение!
    {
        let str = 'Ослик Иа-Иа посмотрел на виадук';
        let target = 'Иа'; // цель поиска
        console.log(str.lastIndexOf("на")) // 22.
    }
}

    /**
     * includes
     * Метод includes() определяет, содержит ли строка символы заданной строки.
     * Этот метод возвращает true, если строка содержит символы, и false если нет.
     * Примечание. Метод includes() чувствителен к регистру.
     */

/**
 * Трюк с побитовым НЕ
 * Преобразует число в 32 разрядное число, дроби отрбрасываются. Удобно, когда в условии надо исключить -1 индекс
 * Просто запомнить:  if (~str.indexOf(…)) означает «если найдено».
 */
{
    console.log( ~2 ); // -3, то же, что -(2+1)
    console.log( ~1 ); // -2, то же, что -(1+1)
    console.log( ~0 ); // -1, то же, что -(0+1)
    console.log( ~-1 ); // 0, то же, что -(-1+1)

    let str = "Widget";
    if (~str.indexOf("Widget")) {
        console.log( 'Совпадение есть' ); // работает
    }
}

/**
 * Получение подстроки
 * В JavaScript есть 3 метода для получения подстроки: substring, substr и slice.
 */
{
    // str.slice(start [, end])
    let str = "stringify";
    console.log( str.slice(0, 5) ); // 'strin', символы от 0 до 5 (не включая 5)
    console.log( str.slice(0, 1) ); // 's', от 0 до 1, не включая 1, т. е. только один символ на позиции 0
    console.log( str.slice(2) ); // ringify, с позиции 2 и до конца
    console.log( str.slice(-4, -1) ); // gif
}
{
    /**
     * str.substring(start [, end])
     * Это — почти то же, что и slice, но можно задавать start больше end.
     * Если start больше end, то метод substring сработает так, как если бы аргументы были поменяны местами.
     */
    let str = "stringify";
    console.log( str.substring(2, 6) ); // "ring"
    console.log( str.substring(6, 2) ); // "ring"
}
{
    @deprecated
    // str.substr(start [, length])
    // Возвращает часть строки от start длины length.
    let str = "stringify";
    // ring, получаем 4 символа, начиная с позиции 2
    console.log( str.substr(2, 4) );
}

/**
 * Сравнение строк
 * Чтобы определить, что одна строка больше другой, JavaScript использует «алфавитный» или «лексикографический» порядок.
 * Символы сравниваются по их кодам. Больший код — больший символ.
 * В JavaScript используется кодировка UTF-16, самая распространённая в мире.
 * Таблица этой кодировки настолько большая, что покрывает не только все современные алфавиты и иероглифические системы записи, но и шумерскую клинопись, и древнеегипетские иероглифы.
 * Эмодзи тоже содержатся в этой таблице, поэтому нам не нужно ничего устанавливать на компьютер чтобы видеть их 🙌
 */
{
    console.log( 'Я' > 'А' ); // true
    console.log( 'Коты' > 'Кода' ); // true
    console.log( 'Сонный' > 'Сон' ); // true
    // Строчные буквы больше заглавных:
    console.log( 'a' > 'Z' ); // true
}

/**
 * У любого символа есть код.
 *      str.codePointAt() - получение символа находящегося на n-й позиции
 *      String.fromCodePoint(code) - получение символа, имеющего определенный код
 */

{
    console.log( "z".codePointAt(0) ); // 122.
    console.log( "Z".codePointAt(0) ); // 90

    console.log( String.fromCodePoint(90) ); // Z

    /**
     * Пример цикла с алфавитом
     */
    const startIndex = 'а'.codePointAt(0);
    const endIndex = 'я'.codePointAt(0);

    const result = []

    for(let i = startIndex; i <= endIndex;i++){
        result.push(String.fromCodePoint(i))
    }

    console.log(result)
}

/**
 * Правильное сравнение строк
 * Сравнение строк лучше проводить через метод str.localeCompare(str2)
 */
{
    // Отрицательное число, если str меньше str2.
    // Положительное число, если str больше str2.
    // 0, если строки равны.
    const str = 'a'
    const str2 = 'b'
    console.log(str.localeCompare(str2));
}

/**
 * Особенности буквы ё. Она расположена после Я в алфавите после сортировки. Для праивльной работы использовать new Intl.Collator("ru-RU")
 * https://www.youtube.com/watch?v=M4yQGGEFb8U
 */