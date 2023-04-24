/**
 * Объект Date содержит дату и время, а также предоставляет методы управления ими.
 * Библиотеки для работы со временем: day.js, moment.js
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

/**
 * Преобразование к числу, разность дат
 * Если объект Date преобразовать в число, то получим таймстамп по аналогии с date.getTime()
 */
{
    let date = new Date();
    console.log(+date); // количество миллисекунд, то же самое, что date.getTime()

    {
        let start = new Date(); // начинаем отсчёт времени
        // выполняем некоторые действия
        for (let i = 0; i < 100000; i++) {
            let doSomething = i * i * i;
        }
        let end = new Date(); // заканчиваем отсчёт времени
        console.log( `Цикл отработал за ${end - start} миллисекунд` );
    }
}

/**
 * Date.now()
 * Cуществует особый метод Date.now(), возвращающий текущую метку времени. (таймшатмп)
 * Date.now() === new Date().getTime() || Date.now() === +new Date()
 */

/**
 * Разбор строки с датой
 * Метод Date.parse(str) считывает дату из строки.
 *
 * Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ, где:
     * YYYY-MM-DD – это дата: год-месяц-день.
     * Символ "T" используется в качестве разделителя.
     * HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
     * Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.
 *
 * Вызов Date.parse(str) обрабатывает строку в заданном формате и возвращает таймстамп
 */
{
    let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
    console.log(ms); // 1327611110417 (таймстамп)
}

/**
 * Форматирование локалей без Intl.
 */
{

    new Date().toLocaleString()
    new Date().toLocaleString("en")
    new Date().toLocaleString("fr")
}

/**
 * Intl: интернационализация в JavaScript
 * Intl.dateTimeFormat() - интернациональный конструктор для форматирования даты
 */
{
    const now = new Date();
    const locale = navigator.language
    console.log(locale) // ru-RU

    /**
     * 2-digit. Например 4/16/2023 в 04/16/2023
     * long. Название например месяца на языке. 16 апреля 2023 г. || April 16, 2023
     * era: Подставляет к дате систему исчесления, например "16 апреля 2023 г. от Рождества Христова"
     */

    const dateOptions = {
        day: 'numeric',
        month: 'long', // numeric || 2-digit || "long" || "short" || "narrow".
        year: 'numeric',
        era: 'long',
        weekday: 'short', // короткий день недели ("long" || "short" || "narrow")
        timeZoneName: 'short', // подставляет ТЗ в строку с датой (в GMT+3)
        hour: 'numeric', //numeric || 2-digit' Подставяет в строку часы
        minute: 'numeric', // Подставяет в строку минуты
        second: 'numeric', // Подставяет в строку секунды
    };

    const RUDate = new Intl.DateTimeFormat(locale, dateOptions);
    const USDate = new Intl.DateTimeFormat('en-US', dateOptions);
    const UKDate = new Intl.DateTimeFormat('en-UK', dateOptions);

    console.log(RUDate.format(now)); // 16.04.2023
    console.log(USDate.format(now)); // 4/16/2023
    console.log(UKDate.format(now)); // 16/04/2023
}