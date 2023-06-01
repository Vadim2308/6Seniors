/**
 * Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.
 */
{
    const date = new Date(2012,1,20,3,12)
    console.log(date)
}

/**
 * Покажите день недели
 * Напишите функцию getWeekDay(date), показывающую день недели в коротком формате: «ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».
 * Например
 *      let date = new Date(2012, 0, 3);  // 3 января 2012 года
 *      console.log( getWeekDay(date) );        // нужно вывести "ВТ"
 */

{
    const getWeekDay = (date) => {
        const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        return days[date.getDay()]
    }
    let date = new Date(2012, 0, 3);  // 3 января 2012 года
    getWeekDay(date)
}

/**
 * День недели в европейской нумерации
 * В Европейских странах неделя начинается с понедельника (день номер 1), затем идёт вторник (номер 2) и так до воскресенья (номер 7).
 * Напишите функцию getLocalDay(date), которая возвращает «европейский» день недели для даты date.
     * let date = new Date(2012, 0, 3);  // 3 января 2012 года
     * console.log( getLocalDay(date) );       // вторник, нужно показать 2
 */

{
    const getLocalDay  = (date) => {
        const currentIndexDay = date.getDay()
        return currentIndexDay ? currentIndexDay : 7
    }
    let date = new Date(2012, 0, 3);  // 3 января 2012 года
    getLocalDay(date)
}

/**
 * Какой день месяца был много дней назад?
 * Создайте функцию getDateAgo(date, days), возвращающую число, которое было days дней назад от даты date.
 * К примеру, если сегодня двадцатое число, то getDateAgo(new Date(), 1) вернёт девятнадцатое и getDateAgo(new Date(), 2) – восемнадцатое.
 * Функция должна надёжно работать при значении days=365 и больших значениях:
 */

{
    let date = new Date(2015, 0, 2);

    const getDateAgo = (date, days) => {
        const copy = new Date(date) // Создается копия
        copy.setDate(copy.getDate() - days);
        return copy.getDate()
    };

    console.log(getDateAgo(new Date(), 1)); // 1, (1 Jan 2015)
    console.log(getDateAgo(new Date(), 2)); // 31, (31 Dec 2014)
    console.log(getDateAgo(new Date(), 365)); // 2, (2 Jan 2014)
}

/**
 * Последнее число месяца?
 * Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца. Иногда это 30, 31 или даже февральские 28/29.
 * Параметры:
     * year – год из четырёх цифр, например, 2012.
     * month – месяц от 0 до 11.
     * К примеру, getLastDayOfMonth(2012, 1) = 29 (високосный год, февраль).
 */

{
    function getLastDayOfMonth(year, month) {
        const date = new Date(year, month + 1, 0); // Даты начинаются с единцы, поэтому 0 - день назад
        return date.getDate();
    }
    console.log(getLastDayOfMonth(2012, 1));
}

/**
 * Сколько сегодня прошло секунд?
 * Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.
 * Например, если сейчас 10:00, и не было перехода на зимнее/летнее время, то:
 */

{
    const getSecondsToday = () => {
        const current = new Date()
        const hour = current.getHours()
        const min = current.getMinutes()
        const sec = current.getSeconds()
        return hour * 3600 + min * 60 + sec
    }
    // Вариант 2
    {
        function getSecondsToday() {
            let now = new Date();
            // создаём объект с текущими днём/месяцем/годом (начало дня)
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let diff = now - today; // разница в миллисекундах
            return Math.round(diff / 1000); // получаем секунды
        }
    }
}

/**
 * Сколько секунд осталось до завтра?
 */
{
    const getSecondsToTomorrow = () => {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
        const totalSecondsInADay = 86400;

        return totalSecondsInADay - totalSecondsToday;
    }
    // Варинат 2
    {
        function getSecondsToTomorrow() {
            let now = new Date();
            // завтрашняя дата
            let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
            let diff = tomorrow - now; // разница в миллисекундах
            return Math.round(diff / 1000); // преобразуем в секунды
        }
    }
}

/**
 * Форматирование относительной даты
 */

{
    const formatDate = (date) => {
        const format = (num) => (num < 10 ? `0${num}` : num);
        const now = new Date();
        const diff = (now - date) / 1000;
        if (diff <= 1) {
            return 'прямо сейчас';
        } else if (diff < 60) {
            return `${diff} сек. назад`;
        } else if (diff < 3600) {
            return `${Math.round(diff / 60)} мин. назад`;
        } else {
            return `${format(date.getDate())}.${format(date.getMonth()+1)}.${date.getFullYear().toString().slice(2)} ${date.getHours()}:${date.getMinutes()}`;
        }
    };
    console.log( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"
    console.log( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"
    console.log( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"
    // вчерашняя дата вроде 31.12.2016, 20:00
    console.log( formatDate(new Date(new Date - 86400 * 1000)) );
}

// Узнайте, какой день недели был 7-го января 2015 года.
console.log(new Date(2015, 0, 7).getDay() + 1);     // Среда (4)


// Выведите на экран количество часов, прошедшее между 1 марта 1988 года и текущим моментом с помощью Date.parse.
// Функция Math.trunc() возвращает целую часть числа путём удаления всех дробных знаков.
// 3_600_000 = 1000 * 60 * 60
console.log(Math.trunc((new Date() - Date.parse('1988-03-01')) / 3_600_000) );   // 307906