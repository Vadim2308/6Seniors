/**
 * Вебсокеты позволяют обмениваться информацией между клиентов и сервером через постоянное соединение.
 * Данные обмениваются в виде пакетов без разрыва соединения и доп. HTTP запросов
 * Подходит для онлайн игр, чатов, торговых площадок и т.д.
 *
 * - Нет ограничений, связанных с кросс-доменными запросами.
 * - Имеют хорошую поддержку браузерами.
 * - Могут отправлять/получать как строки, так и бинарные данные.
 *
 * WebSocket сам по себе не содержит такие функции, как переподключение при обрыве соединения, аутентификацию пользователей и другие механизмы. Для этого есть либо библиотеки, либо самописные решения
 */

/**
 * Открытие соединения
 */

{
    let UNSAFE_socket = new WebSocket("ws://javascript.info");  // Cуществует протокол wss://, использующий шифрование. Это как HTTPS для веб-сокетов. Это предпочтительнее
    // После того как мы открыли содениение, мы должны слушать 4 события: open message error close
    let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

    socket.onopen = function(e) {
        alert("[open] Соединение установлено");
        alert("Отправляем данные на сервер");
        socket.send("Меня зовут Джон");
    };

    socket.onmessage = function(event) {
        alert(`[message] Данные получены с сервера: ${event.data}`);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
            // например, сервер убил процесс или сеть недоступна
            // обычно в этом случае event.code 1006
            alert('[close] Соединение прервано');
        }
    };

    socket.onerror = function(error) {
        alert(`[error]`);
    };
}

/**
 * Открытие сокета.
 * Как только мы написали конструкцию new WebSocket(url), он тут же сам начинает устанавливать соединение.
 * Браузер при помощи заголовков спрашивает, поддерживает ли сервер сокеты. Если да, то начинают работать
 *
 * (!) Нельзя эмулировать запрос WebSocket с помощтю XMLHttpRequest или fetch, это ограничение JS
 */
{
    // Заголовки запроса, которые уходят при установлении соединения
    {
        // GET /chat
        // Host: javascript.info
        // Origin: https://javascript.info                ================> источник текущей страницы (например https://javascript.info)
        // Connection: Upgrade                            ================> сигнализирует, что клиент хотел бы изменить протокол.
        // Upgrade: websocket                             ================> запрошен протокол «websocket».
        // Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==    ================> случайный ключ, созданный браузером для обеспечения безопасности.
        // Sec-WebSocket-Version: 13                      ================> версия протокола WebSocket, текущая версия 13.
    }

    // Ответ
    {
        // 101 Switching Protocols
        // Upgrade: websocket
        // Connection: Upgrade
        // Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=    - Это тот же Sec-WebSocket-Key, но только перекодированный. Для того чтоб убедиться, что ответ соответствует запросу.
    }
}

/**
 * Передача данных
 * Поток данных в WebSocket состоит из «фреймов», фрагментов данных, которые могут быть отправлены любой стороной, и которые могут быть следующих видов:
 *      «текстовые фреймы» – содержат текстовые данные, которые стороны отправляют друг другу.
 *      «бинарные фреймы» – содержат бинарные данные, которые стороны отправляют друг другу.
 *      «пинг-понг фреймы» используется для проверки соединения; отправляется с сервера, браузер реагирует на них автоматически.
 *      также есть «фрейм закрытия соединения» и некоторые другие служебные фреймы.
 *
 * (!) Метод WebSocket .send() может отправлять и текстовые, и бинарные данные (Blob, ArrayBuffer и другие)
 * (!) При получении данных, текст всегда поступает в виде строки. Для бинарных данных мы можем выбрать один из двух форматов: Blob или ArrayBuffer.
 */
{
    // Мы можем поменять формат, socket.binaryType = "arraybuffer";
    socket.binaryType = "arraybuffer";
    socket.onmessage = (event) => {
        // event.data является строкой (если текст) или arraybuffer (если двоичные данные)
    };
}

/**
 * Ограничение скорости
 * При вызове socket.send(data) данные буферизируются, и отправляются с той скоростью, с которой позволяет сеть.
 * Если у нас много данных, которые мы хотим отправить, но у юзера медленное соединение, то мы можем ограничить размер буфера.
 */
{
    // каждые 100мс проверить сокет и отправить больше данных,
    // только если все текущие отосланы
    setInterval(() => {
        if (socket.bufferedAmount == 0) {
            socket.send(moreData());
        }
    }, 100);
}

/**
 * Закрытие подключения
 * Мы можем отправить «фрейм закрытия соединения» с кодом закрытия и указать причину в виде текста
 * socket.close([code], [reason]);
 * code - не любое число.
 *      1000 - по умолчанию, нормальное закрытие,
 *      1006 – указывает, что соединение было потеряно (нет фрейма закрытия).
 *      1001 – сторона отключилась, например сервер выключен или пользователь покинул страницу,
 *      1009 – сообщение слишком большое для обработки,
 *      и т.д.
 */
{
    // закрывающая сторона:
    socket.close(1000, "работа закончена");

    // другая сторона:
    socket.onclose = event => {
        // event.code === 1000
        // event.reason === "работа закончена"
        // event.wasClean === true (закрыто чисто)
    };
}

/**
 * Состояние соединения
 * Чтобы получить состояние соединения, существует дополнительное свойство socket.readyState
 *      0 – «CONNECTING»: соединение ещё не установлено,
 *      1 – «OPEN»: обмен данными,
 *      2 – «CLOSING»: соединение закрывается,
 *      3 – «CLOSED»: соединение закрыто.
 */
{
    if (socket.readyState === WebSocket.OPEN) {
        // Соединение WebSocket готово для обмена данными
        // Вы можете отправлять и принимать сообщения здесь
    } else {
        // Соединение WebSocket не готово
    }

    // (!) Но лучше использовать обработчики события onOpen, чтоб выполнить определенные действия когда содеинение сокета переходит в состояние OPEN
    socket.onopen = function(event) {
        console.log("Соединение WebSocket установлено.");
        // Выполнить дополнительные действия при установке соединения
    };
    // Обработчик события onclose может быть использован для выполнения действий при закрытии соединения WebSocket:
    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log("Соединение WebSocket закрыто чисто.");
        } else {
            console.log("Соединение WebSocket закрыто с ошибкой.");
        }
        console.log("Код закрытия: " + event.code + ", причина закрытия: " + event.reason);
        // Выполнить дополнительные действия при закрытии соединения
    };
}