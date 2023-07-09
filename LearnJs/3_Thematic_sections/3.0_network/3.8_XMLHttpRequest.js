/**
 * XMLHttpRequest – это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы.
 * Существует 2 режима работы: синхронный и асинхронный
 */

// Async mode
{
    // 1. Создаём новый XMLHttpRequest-объект
    let xhr = new XMLHttpRequest();

    // 2. Настраиваем его: GET-запрос по URL /article/.../load
    xhr.open('GET', '/article/xmlhttprequest/example/load');

    // 3. Отсылаем запрос
    xhr.send();

    // 3.1 Можно указать ожидаемый тип ответ
    xhr.responseType = 'json';

    // 4. Этот код сработает после того, как мы получим весь ответ сервера
    xhr.onload = function() {
        if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else { // если всё прошло гладко, выводим результат
            alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
        }
    };

    // 5. запускается периодически
    xhr.onprogress = function(event) {
        // event.loaded - количество загруженных байт
        // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
        // event.total - количество байт всего (только если lengthComputable равно true)
        if (event.lengthComputable) {
            alert(`Получено ${event.loaded} из ${event.total} байт`);
        } else {
            alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
        }

    };

    xhr.onerror = function() {
        alert("Запрос не удался");
    };

    /**
     *  6.Состояние запроса. (Писали в очень старом коде, окгда не было load/error/progress )
     *    UNSENT = 0; // исходное состояние
     *    OPENED = 1; // вызван метод open
     *    HEADERS_RECEIVED = 2; // получены заголовки ответа
     *    LOADING = 3; // ответ в процессе передачи (данные частично получены)
     *    DONE = 4; // запрос завершён
     *
     *    Порядок вызова: 0 → 1 → 2 → 3 → … → 3 → 4; Состояние 3 повторяется каждый раз, кода получена часть данных.
     *
     *    Изменения в состоянии объекта запроса генерируют событие readystatechange
      */
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 3) {
            // загрузка
        }
        if (xhr.readyState === 4) {
            // запрос завершён
        }
    };

    // Отмена запроса
    xhr.abort(); // завершить запрос
}

/**
 * Синхронные запросы
 * Если 3 параметр установлен в false, то запросы будут идти синхронном.
 * (!) Выполнение JS  останавливается на send() и возобновляется после получения ответа
 * они блокируют выполнение JavaScript до тех пор, пока загрузка не завершена
 */
{
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/article/xmlhttprequest/hello.txt', false);

    try {
        xhr.send();
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            alert(xhr.response);
        }
    } catch(err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
        alert("Запрос не удался");
    }
}

/**
 * Установка заголовков
 */
{
    let xhr = new XMLHttpRequest();
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456') // заголовок получится такой: X-Auth: 123, 456. Уже установленный заголовок снять нельзя

    xhr.getResponseHeader('Content-Type') // Возвращает значение заголовка ответа name (кроме Set-Cookie и Set-Cookie2).
    xhr.getAllResponseHeaders() // Возвращает все заголовки ответа, кроме Set-Cookie и Set-Cookie2. Возвращаются в виде единой строкм
}

/**
 * POST, FormData
 */
{
    /**
      <form name="person">
        <input name="name" value="Петя">
         <input name="surname" value="Васечкин">
     </form>

     <script>

        let formData = new FormData(document.forms.person);

        formData.append("middle", "Иванович");

       let xhr = new XMLHttpRequest();
       xhr.open("POST", "/article/xmlhttprequest/post/user");
       xhr.send(formData);

       xhr.onload = () => alert(xhr.response);
    */
}

// JSON
{
    let xhr = new XMLHttpRequest();

    let json = JSON.stringify({
        name: "Вася",
        surname: "Петров"
    });

    xhr.open("POST", '/submit')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.send(json);
}

/**
 * Прогресс отправки
 * xhr.upload - метод для отслеживания событий отправки
  */
{
    let xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function(event) {
        alert(`Отправлено ${event.loaded} из ${event.total} байт`);
    };

    xhr.upload.onload = function() {
        alert(`Данные успешно отправлены.`);
    };

    xhr.upload.onerror = function() {
        alert(`Произошла ошибка во время отправки: ${xhr.status}`);
    };
    /**
     * loadstart – начало загрузки данных.
     * progress – генерируется периодически во время отправки на сервер.
     * abort – загрузка прервана.
     * error – ошибка, не связанная с HTTP.
     * load – загрузка успешно завершена.
     * timeout – вышло время, отведённое на загрузку (при установленном свойстве timeout).
     * loadend – загрузка завершена, вне зависимости от того, как – успешно или нет.
     */
}