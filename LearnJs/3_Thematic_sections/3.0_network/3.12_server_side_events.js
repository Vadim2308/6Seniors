/**
 * Server-Sent Events описывает встроенный класс EventSource, который позволяет поддерживать соединение с сервером и получать от него события.
 * Как и сокеты, позволяет поддерживать постоянное соедиение.
 * Отличия от WS:
 *      Однонаправленность: данные посылает только сервер (WS:и сервер, и клиент могут обмениваться сообщениям)
 *      Только текст (WS: и текст и бинарные данные)
 *      Обычный HTTP (WS протокол)
 *
 *  Основной его кейс в том что он проще, и не всем нужно использовать всю мощь WS
 *  Из плюсов: поддерживает переподключение при потере соединение, и используется популярный HTTP протокол
 */

/**
 * Получение сообщений
 */
{
    let eventSource = new EventSource("/events/subscribe"); // Браузер установит соединение. Сервер должен ответить 200 статусом и Content-Type: text/event-stream
    // Ответ приходит в особом формате.
    // Текст сообщения указывается после data:, пробел после двоеточия необязателен.
    // Сообщения разделяются двойным переносом строки \n\n.

    /**
     * data: Сообщение 1
     *
     * data: Сообщение 2
     *
     * data: Сообщение 3
     * data: в две строки
     */

    // Cложные сообщения обычно отправляются в формате JSON, в котором перевод строки кодируется как \n, так что в разделении сообщения на несколько строк обычно нет нужды

    eventSource.onmessage = function(event) {
        console.log("Новое сообщение", event.data);
        // этот код выведет в консоль 3 сообщения, из потока данных выше
    };

    // или eventSource.addEventListener('message', ...)
}

/**
 * Кросс-доменные запросы
 * EventSource, как и fetch, поддерживает кросс-доменные запросы
 * Сервер получит заголовок Origin и должен будет ответить с заголовком Access-Control-Allow-Origin.
 */
{
    let source = new EventSource("https://another-site.com/events", {
        withCredentials: true // Отправка куков
    });
}

/**
 * Переподключение
 * Одной из фишек SSE является переподключениe
 * После того как соединение окончательно закрыто, «переоткрыть» его уже нельзя. Если необходимо снова подключиться, просто создайте новый EventSource.
 * По умолчанию между попытками возобновить соединение будет небольшая пауза в несколько секунд.
 *
 * (!) Не может быть установлена с помощью JavaScript.
 */
{
    // Cервер может выставить рекомендуемую задержку, отправив retry в мс
    // Поле retry: может посылаться как вместе с данными, так и отдельным сообщением.

    // retry: 15000
    // data: Привет, я выставил задержку переподключения в 15 секунд


    /**
     * Если сервер хочет остановить попытки переподключения, он должен ответить со статусом 204.
     * Если браузер хочет прекратить соединение, он может вызвать eventSource.close():
     * Если в ответе будет не правильный Content-Type или статус отличается от 301, 307, 200 и 204 то браузер создаст событие "error" и не будет восстанавливать соединение
     */
    let eventSource = new EventSource("...");
    eventSource.close();
}

/**
 * Идентификатор сообщения
 * Чтобы было понятно, какое сообщение было доставлено последнее после обрыва соедиенение, каждое сообщение имеет свой id
 * Получая сообщение с указанным id:, браузер:
 *      Установит его значение свойству eventSource.lastEventId.
 *      При переподключении отправит заголовок Last-Event-ID с этим id, чтобы сервер мог переслать последующие сообщения.
 */
{
    const eventSource = new EventSource('/events');

    eventSource.onerror = function(event) {
        if (event.eventPhase === EventSource.CLOSED) {
            // Соединение разорвано, выполнить повторное подключение
            reconnect();
        }
    };

    // Ручной реконнект
    function reconnect() {
        const lastEventId = eventSource.lastEventId;
        const eventSource = new EventSource('/events?lastEventId=' + lastEventId);
        // Обработка событий и ошибок
    }
}

/**
 * Статус подключения: readyState
 */
{
    const eventSource = new EventSource('/events');
    EventSource.CONNECTING = 0; // подключение или переподключение
    EventSource.OPEN = 1;       // подключено
    EventSource.CLOSED = 2;     // подключение закрыто
}

/**
 * Типы событий
 * Дефолтные типы, генерируемые EventSource
 *      message – получено сообщение, доступно как event.data.
 *      open – соединение открыто.
 *      error – не удалось установить соединение, например, сервер вернул статус 500.
 * Сервер может указать другой тип события с помощью event: ... в начале сообщения.
 */
{
    const eventSource = new EventSource('/events');
    /**
     * event: join
     * data: Боб
     * id: 1
     *
     * data: Привет
     *
     * event: leave
     * data: Боб
     */

    eventSource.addEventListener('join', event => {
        alert(`${event.data} зашёл`);
    });

    eventSource.addEventListener('message', event => {
        alert(`Сказал: ${event.data}`);
    });

    eventSource.addEventListener('leave', event => {
        alert(`${event.data} вышел`);
    });
}