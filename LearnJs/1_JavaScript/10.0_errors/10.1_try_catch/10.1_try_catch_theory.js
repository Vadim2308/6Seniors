/**
 * синтаксическая конструкция try..catch позволяет перехатывать ошибки во время выполнения
 * Синтаксис: состоит из двух основных блоков: try, и затем catch
 *     1. Сначала выполняется код внутри блока try {...}.
 *     2. Если в нём нет ошибок, то блок catch(err) игнорируется: выполнение доходит до конца try и потом далее, полностью пропуская catch.
 *     3. Если же в нём возникает ошибка, то выполнение try прерывается, и поток управления переходит в начало catch(err).
 */

{
    try {
        alert('Начало блока try');  // (1) <--
        lalala; // ошибка, переменная не определена!
        alert('Конец блока try (никогда не выполнится)');  // (2)
    } catch(err) {
        alert(`Возникла ошибка!`); // (3) <--
    }
}

/**
 * (!) try..catch работает только для ошибок, возникающих во время выполнения кода
 * Это должен быть корректный JavaScript-код.
 */
{
    // try {
    //     {{{{{{{{{{{
    //     } catch(e) {
    //         alert("Движок не может понять этот код, он некорректен");
    //     }
}

/**
 * try..catch работает синхронно
 * Исключение, которое произойдёт в коде, запланированном «на будущее», например в setTimeout, try..catch не поймает:
 */
{
    try {
        setTimeout(function() {
            noSuchVariable; // скрипт упадёт тут
        }, 1000);
    } catch (e) {
        alert( "не сработает" );
    }
    console.log('сработает')

    {
        try {
            // Код выполнится корректно, т.к. отсюда вернулся промис. Обычный объект, в котором не сгенерится ошибка
            Promise.reject('err')
        } catch (e) {
            // Ошибка не будет поймана
            console.log('Ошибка', e)
        }
    }

    /**
     * Однако, если записать асинхронный код в синхронном стиле с помощью async/await
     * то в этом случае обработку ошибок можно осуществлять с помощью try...catch.
     */
    {
        async function handlePromise() {
            try {
                // Промис вернется с ошибкой (Сгенерится ошибка, и прокинет в catch)
                await Promise.reject('err')
            } catch (e) {
                // Теперь ошибка будет поймана
                console.log('Ошибка', e) // err
            }
        }
        handlePromise()
    }

    /**
     * Чтобы поймать исключение внутри запланированной функции, try..catch должен находиться внутри самой этой функции:
     */
    {
        setTimeout(function() {
            try {
                noSuchVariable; // try..catch обрабатывает ошибку!
            } catch {
                alert( "ошибка поймана!" );
            }
        }, 1000);
    }
}


/**
 * Объект ошибки
 */
{
    try {
        lalala; // ошибка, переменная не определена!
    } catch(err) {
        alert(err.name); // ReferenceError
        alert(err.message); // lalala is not defined
        alert(err.stack); // ReferenceError: lalala is not defined at (...стек вызовов)

        // Можем также просто вывести ошибку целиком
        // Ошибка приводится к строке вида "name: message"
        alert(err); // ReferenceError: lalala is not defined
    }
}

/**
 * Блок «catch» может быть без переменной, это новая возможность, возможно потребуется полифил
 * Cинтаксис
 * try {
 * } catch {
 * }
 */

/**
 * Пример с JSON
 * JSON.parse сам может генерить ошибку при ошибке парсинга
 */
{
    let json = "{ некорректный JSON }";
    try {
        let user = JSON.parse(json); // <-- тут возникает ошибка...
        alert( user.name ); // не сработает
    } catch (e) {
        alert( "Извините, в данных ошибка, мы попробуем получить их ещё раз." );
        alert(e.name); // SyntaxError
        alert(e.message);
    }
}

/**
 * В JS есть множество конструкторов для создания своих ошибок Error, SyntaxError, ReferenceError, TypeError, AggregateError (у Promise.any, когда все имеют статус rejected)
 */
{
    let error = new Error(message);
    let error2 = new SyntaxError(message);
    let error3 = new ReferenceError(message);

    let error3 = new Error(" Ого, ошибка! o_O");
    alert(error.name); // Error (имя конструктора)
    alert(error.message); //  Ого, ошибка! o_O (сама ошибка)
}

/**
 * Оператор «throw»
 * Оператор throw генерирует ошибку.
 * throw <объект ошибки> (примитив, число или строка, или объект. Без разницы)
 */
{
    {
        let json = '{ "age": 30 }'; // данные неполны
        try {
            let user = JSON.parse(json); // <-- выполнится без ошибок
            if (!user.name) {
                throw new SyntaxError("Данные неполны: нет имени"); // (*)
            }
            alert( user.name );
        } catch(e) {
            alert( "JSON Error: " + e.message ); // JSON Error: Данные неполны: нет имени
        }
    }
    {
        try {
            throw 1
        } catch (e) {
            console.log(e) // e === 1
        }
    }
}

/**
 * Проброс исключения
 * (!) Блок catch должен обрабатывать только те ошибки, которые ему известны, и «пробрасывать» все остальные.
 *      1. Блок catch получает все ошибки.
 *      2. В блоке catch(err) {...} мы анализируем объект ошибки err.
 *      3. Если мы не знаем как её обработать, тогда делаем throw err. (Это выбросит ошибку "наружу" и убьет скрипт)
 */
{
    let json = '{ "age": 30 }'; // данные неполны
    try {

        let user = JSON.parse(json);

        if (!user.name) {
            throw new SyntaxError("Данные неполны: нет имени");
        }

        blabla(); // неожиданная ошибка

        alert( user.name );

    } catch(e) {
        if (e.name == "SyntaxError") {
            alert( "JSON Error: " + e.message );
        } else {
            throw e; // проброс (*)  «выпадает наружу» и может быть поймана другой внешней конструкцией try..catch (если есть), или «убьёт» скрипт.
        }
    }
    // Таким образом, блок catch фактически обрабатывает только те ошибки, с которыми он знает, как справляться, и пропускает остальные.
}

/**
 * Несколько уровней try{}catch{}
 */
{
    function readData() {
        let json = '{ "age": 30 }';

        try {
            // ...
            blabla(); // ошибка!
        } catch (e) {
            // ...
            if (e.name !== 'SyntaxError') {
                throw e; // проброс исключения (не знаю как это обработать)
            }
        } finally {
            console.log('finnaly')
        }
    }
    try {
        readData();
    } catch (e) {
        alert( "Внешний catch поймал: " + e ); // 'finnaly', ReferenceError: blabla is not defined
    }
}

/**
 * try…catch…finally
 * Она выполнится в любом случае
 * после try, если не было ошибок,
 * после catch, если ошибки были.
 */
{
    /**
     * Если на вопрос «Сгенерировать ошибку?» утвердительно, то try -> catch -> finally.
     * Если ответите отрицательно, то try -> finally.
     */
    try {
        alert('try');
        if (confirm('Сгенерировать ошибку?')) BAD_CODE();
    } catch (e) {
        alert('catch');
    } finally {
        alert('finally');
    }
}

/**
 * (!) Переменные внутри try..catch..finally локальны
 */

/**
 * finally и return
 * Блок finally срабатывает при (!)ЛЮБОМ выходе из try..catch, в том числе и return.
 */
{
    function func() {
        try {
            return 1;

        } catch (e) {
            /* ... */
        } finally {
            alert( 'finally' );
        }
    }
    alert( func() ); // сначала срабатывает finnally , 1
}

/**
 * try..finally
 * Применяем когда не хотим обрабатывать ошибки
 * (!) В приведенном коде, если в try будет ошибка, то она вылетет наружу, и стопнет код, т.к. нет catch
 */
{
    function func() {
        try {
            // ...
        } finally {
            // завершить это, даже если все упадёт
        }
    }
}

/**
 * Глобальный catch
 * Можно повесить глобальный обработчик на window.onerror, и например при необработанной ошибке он будет логировать в сервис предмет ошибки
 */
{

    window.onerror = function(message, url, line, col, error) {
        console.log(`${message}\n В ${line}:${col} на ${url}`);
    };
    function readData() {
        badFunc(); // Ой, что-то пошло не так!
    }
    readData();
}


/**
 * Допустимые конструкции
 * try {...} catch {...}
 * try {...} finally {...}
 * try {...} catch {...} finally {...}
 */