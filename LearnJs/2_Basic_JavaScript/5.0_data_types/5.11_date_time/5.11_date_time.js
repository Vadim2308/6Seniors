/**
 * Объект Date содержит дату и время, а также предоставляет методы управления ими.
 */

/**
 * Создание
 */
{
    let now = new Date();
    console.log(now); // показывает текущие дату и время в формате Fri Apr 14 2023 17:13:24 GMT+0300 (Москва, стандартное время)
    /**
     * new Date(milliseconds)
     * Создать объект Date с временем, равным количеству миллисекунд (1/1000 секунды), прошедших с 1 января 1970 года UTC+0.
     */
    {
        let Jan01_1970 = new Date(0);
        console.log( Jan01_1970 );
        // теперь добавим 24 часа и получим 02.01.1970 UTC+0
        let Jan02_1970 = new Date(24 * 3600 * 1000);
        console.log( Jan02_1970 );
    }
    /**
     * new Date(datestring)
     * Время не указано, поэтому оно ставится в полночь по Гринвичу и меняется в соостветсвии с часовым поясом места выполнения кода.
     * Поэтому может быть как Thu Jan 26 2017 11:00:00 GMT+1100 (восточно-австралийское время) так и Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)
     */
    {
        let date = new Date("2017-01-26");
        console.log(date); // Thu Jan 26 2017 03:00:00 GMT+0300 (Москва, стандартное время)
    }
}

/**
 * Таймштамп - целочисленное число, представляющее собой количество миллисекунд, прошедших с 1 января 1970 года
 * Датам до 1 января 1970 будут соответствовать отрицательные таймстампы, например:
 */
{
    // 31 декабря 1969 года
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    console.log( Dec31_1969 );
}

/**
 * new Date(year, month, date, hours, minutes, seconds, ms)
 * year должен состоять из четырёх цифр.
 * month начинается с 0 (январь) по 11 (декабрь).
 * date здесь представляет собой день месяца. Если параметр не задан, то принимается значение 1.
 */
{
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // то же самое, так как часы и проч. равны 0
}

/**
 * Получение компонентов даты
     * getFullYear() - Получить год (4 цифры)
     * getMonth() - Получить месяц, от 0 до 11.
     * getDate() - Получить день месяца, от 1 до 31
     * getHours(), getMinutes(), getSeconds(), getMilliseconds()
     * getDay() Вернуть день недели от 0 (воскресенье) до 6 (суббота)
     * getUTCFullYear(), getUTCMonth(), getUTCDay().
     * getTime() Для заданной даты возвращает таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0.
     * getTimezoneOffset() Возвращает разницу в минутах между UTC и местным часовым поясом:
     *       если вы в часовом поясе UTC-1, то выводится 60
     *       если вы в часовом поясе UTC+3, выводится -180
 */
{
    console.log(new Date().getFullYear()); // 2023
    console.log(new Date().getMonth()); // 3
    console.log(new Date().getDate()); // 14
    console.log(new Date().getHours()); // 17
    console.log(new Date().getMinutes()); // 31
    console.log(new Date().getDay()); // 5
    console.log(new Date().getTime()); // 1681482719244
    console.log(new Date().getTimezoneOffset()); // -180
}

/**
 * Установка компонентов даты
 * Позволяют установить в текущий инстанс даты определенные значения
     * setFullYear(year, [month], [date])
     * setMonth(month, [date])
     * setDate(date)
     * setHours(hour, [min], [sec], [ms])
     * setMinutes(min, [sec], [ms])
     * setSeconds(sec, [ms])
     * setMilliseconds(ms)
     * setTime(milliseconds)
 */

{
    let today = new Date();
    today.setHours(0);
    console.log(today); // выводится сегодняшняя дата, минуты, секунды, но значение часа будет 0
    today.setHours(0, 0, 0, 0);
    console.log(today); // всё ещё выводится сегодняшняя дата, но время будет ровно 00:00:00.
}

/**
 * Автоисправление даты
 * Можно устанавливать компоненты даты вне обычного диапазона значений, а объект сам себя исправит.
 */
{
    let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
    console.log(date); // ...1st Feb 2013!
    
    {
        let date = new Date(2016, 1, 28); // 28 февраля
        date.setDate(date.getDate() + 2); // В зависимости от того, високосный это год или нет, результатом будет «2 марта» или «1 марта».
        console.log( date ); // 1 Mar 2016
    }
    {
        let date = new Date();
        console.log(date) // Fri Apr 14 2023 18:03:30
        date.setSeconds(date.getSeconds() + 1000);
        console.log(date); // Fri Apr 14 2023 18:20:39
    }
}