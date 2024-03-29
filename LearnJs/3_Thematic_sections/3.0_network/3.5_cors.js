/**
 * CORS - CROSS-ORIGIN-RESOURCE-SHARING - Технология совместного испольования ресурсов между разными источниками
 */

/**
 * Мир без CORS-a.
 * Представим, что к нам на почту пришла некая линка на сайт. При переходе на сайт (https://evil.com), у нас срабатывает там вредоносный код, который из этого сайта делает запрос на twitter.com, и публикует от нашего имени какой то пост
 * Благодаря корсу доступ из https://evil.com на twitter.com будет закрыт.
 */

/**
 * Origin(источник) - комбинация домен/порт/протокол.
 * Одинаковые источники:
 *  - одинаковая схема (http https ftp ...)
 *  - одинаковый хост (разный поддомен - разные источники)
 *  - одинаковый порт (https - 443;http - 80)
 *
 * Запросы на другой источник – отправленные на другой домен (или даже поддомен), или протокол, или порт – требуют специальных заголовков от удалённой стороны.
 */

/**
 * Типы запросов
 * Простые и все остальные
 */

/**
 * Простые запросы. Простые запросы - запросы, удовлетворяющие следующим условиям:
 *   1. Метод GET, POST или HEAD
 *                          (HEAD - используется для получения данных о ресурсе без передачи его фактического содержимого.
 *                           GET Возвращает полное содержимое, HEAD только заголовки ответа. Нужно если нужно получить информацию о ресурсе, но нам не нужно фактическое содержимое.
 *                           Вы можете использовать запрос HEAD для проверки доступности ресурса, проверки его актуальности или получения информации о его размере перед загрузкой.)
 *   2. Простые заголовки:
 *      Accept - указывает на типы данных, которые клиент (браузер или приложение) готов принимать от сервера.
 *                  Содержит в себе MIME-типы, например, "text/html", "application/json" и другие.
 *                  Если сервер не может предоставить данные в одном из указанных типов, он может вернуть ошибку или выбрать другой тип данных.
 *      Accept-Language - заголовок запроса, который указывает на язык, на котором клиент предпочитает получать ответ от сервера
 *
 *      Content-Language - заголовок ответа, который указывает на язык, на котором предоставлен ответ от сервера.
 *      Content-Type: заголовок ответа, который определяет тип содержимого передаваемого сообщения.
 *                 Он указывает на формат данных, которые передаются в теле сообщения.
 *                 Для простых запросов должен использовать один из: application/x-www-form-urlencoded, multipart/form-data или text/plain.
 */

/**
 * Любой другой запрос считается «непростым». Например, запрос с методом PUT или с HTTP-заголовком API-Key не соответствует условиям.
 * В таких случаях браузер посылает специальный предварительный запрос («предзапрос», по англ. «preflight»), который спрашивает у сервера – согласен ли он принять такой непростой запрос или нет?
 */


/**
 * CORS для простых запросов
 * При запросе на другой источник браузер всегда ставит «от себя» заголовок Origin.
 * Например, если мы запрашиваем https://jsonplaceholder.typicode.com/todos/1 со страницы https://javascript.ru, заголовки будут такими
 * {
 *     GET /request
 *     Host: jsonplaceholder.typicode.com
 *     Origin: https://javascript.ru
 * }
 * Сервер проверяет Origin (https://javascript.ru), и если он согласен принять запрос, он добавляет особый заголовок в ответ Access-Control-Allow-Origin. В этом заголовке содержится наш Origin, или *. Иначе ошибка
 *
 * Браузер играет в этом случае роль посредника. Он гарантирует постановку правильного Origin, и проверяет в ответе Access-Control-Allow-Origin
 * Если все хорошо, то JS получает доступ к ответу соверера, иначе доступ запрещается с ошибкой
 *
 * Пример ответа сервера, который разрешает доступ
 * {
 *     200 OK
 *     Content-Type:text/html; charset=UTF-8
 *     Access-Control-Allow-Origin: https://javascript.info
 * }
 */

/**
 * Заголовки ответа
 * По умолчанию при запросе к другому источнику JavaScript может получить доступ только к  «простым» заголовкам ответа:
 *          Cache-Control
 *          Content-Language
 *          Content-Length
 *          Content-Type
 *          Expires
 *          Last-Modified
 *          Pragma
 * При доступе к любому другому заголовку ответа будет ошибка.
 * Чтобы разрешить фронту доступ к другим заголовкам, сервер должен указать заголовок Access-Control-Expose-Headers
 * Access-Control-Expose-Headers содержит список, через запятую, заголовков, которые не являются простыми, но доступ к которым разрешён
     * {
     *     200 OK
     *     Content-Type:text/html; charset=UTF-8
     *     Content-Length: 12345
     *     Content-Encoding: gzip
     *     API-Key: 2c9de507f2c54aa1
     *     Access-Control-Allow-Origin: https://javascript.info
     *     Access-Control-Expose-Headers: Content-Encoding,API-Key
     * }
 */

/**
 * «Непростые» запросы
 * Перед отправкой непростого запроса, браузер использует предварительный.
 * Предварительный запрос использует метод OPTIONS, у него нет тела, но есть три заголовка:
 *      Origin содержит именно источник (домен/протокол/порт), без пути.
 *      Access-Control-Request-Method содержит HTTP-метод «непростого» запроса.
 *      Access-Control-Request-Headers предоставляет разделённый запятыми список его «непростых» HTTP-заголовков.
 *
 * Если сервер готов принимать такие запросы, то он отвечает БЕЗ тела, со статусом 200 и с заголовками
 *      Access-Control-Allow-Origin должен содержать разрешённый источник.
 *      Access-Control-Allow-Methods должен содержать разрешённые методы.
 *      Access-Control-Allow-Headers должен содержать список разрешённых заголовков.
 *      Access-Control-Max-Age - может указывать количество секунд, на которое нужно кешировать разрешения.
 *                               Так что браузеру не придётся посылать предзапрос для последующих запросов, удовлетворяющих данным разрешениям.
 *
 * Если все окей, то идет основной HTTP-запрос, и получаем ответ.
 *
 * (!) Предзапрос осуществляется «за кулисами», невидимо для JavaScript.
 */

/**
 * Пошаговый разбор как это работает.
 */
{
    let response = await fetch('https://site.com/service.json', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': 'secret'
        }
    });

    /**
     * Этот метод не является простым, т.к. метод PATCH, Content-Type не один из: application/x-www-form-urlencoded, multipart/form-data, text/plain и Содержит «непростой» заголовок API-Key.
     */

    /**
     * Шаг 1 (предзапрос)
     * Браузер самостоятельно генерирует и посылает предзапрос, который выглядит следующим образом
     */
    {
        // OPTIONS /service.json - метод OPTIONS
        // Host: site.com
        // Origin: https://javascript.info – источник.
        // Access-Control-Request-Method: PATCH – запрашиваемый метод.
        // Access-Control-Request-Headers: Content-Type,API-Key – разделённый запятыми список «непростых» заголовков запроса.
    }

    /**
     * Шаг 2 (ответ сервера на предзапрос)
     * Сервер должен ответить со статусом 200 и заголовками:
     *      200 OK
     *      Access-Control-Allow-Methods: PUT,PATCH,DELETE
     *      Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
     *      Access-Control-Max-Age: 86400
     * Когда браузер видит, что PATCH есть в Access-Control-Allow-Methods, а Content-Type,API-Key – в списке Access-Control-Allow-Headers, он посылает наш основной запрос.
     * Также есть Access-Control-Max-Age, который используется для указания максимального времени, в течение которого браузер должен кэшировать информацию о том, разрешен ли определенный источник запрашивать ресурсы с сервера.
     *          Это позволяет убрать на это время preflight запросы
     */

    /**
     * Шаг 3 (основной запрос)
     * Если предзапрос успешен, браузер делает основной запрос.
     * {
     *      PATCH /service.json
     *      Host: site.com
     *      Content-Type: application/json
     *      API-Key: secret
     *      Origin: https://javascript.info
     * }
     */

    /**
     * Шаг 4 (основной ответ)
     * Сервер должен добавлять заголовок Access-Control-Allow-Origin к ответу на основной запрос.
     *    Access-Control-Allow-Origin: https://javascript.info
     * После этого JavaScript может прочитать ответ сервера.
     */
}

/**
 * Авторизационные данные
 * Запрос на другой источник по умолчанию не содержит авторизационных данных (credentials) (куки, заголовки HTTP-аутентификации)
 * Чтобы включить отправку авторизационных данных в fetch, нам нужно добавить опцию credentials: "include"
 * браузер включает все куки, связанные с запрашиваемым доменом, в запрос. Это включает куки, установленные для поддоменов и доменов верхнего уровня, связанных с запрашиваемым доменом. (www.example.com и www.subdomain.example.com)
 */
{
    void fetch('https://another.com', {
        credentials: "include"
    });
}
/**
 * Если сервер согласен принять запрос с авторизационными данными, он должен добавить заголовок Access-Control-Allow-Credentials: true к ответу, в дополнение к Access-Control-Allow-Origin.
 * {
 *     200 OK
 *     Access-Control-Allow-Origin: https://javascript.info (!) C авторизационными данными запроещено использовать *, тут должен быть именно источник. Это доп.мера безопасности.
 *     Access-Control-Allow-Credentials: true
 * }
 */


/**
 * Отличия Accept от Content-Type
 * Заголовок Accept отправляется клиентом в запросе и указывает на типы данных, которые клиент может принять в ответе от сервера
 * Заголовок Content-Type отправляется сервером в ответе и указывает на тип данных, которые сервер отправляет клиенту.
 */

































