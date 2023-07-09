/**
 * Класс URL предоставляет удобный интерфейс для создания и разбора URL-адресов.
 * new URL(url, [base])
 */
{
    let url1 = new URL('https://javascript.info/profile/admin');
    let url2 = new URL('/profile/admin', 'https://javascript.info');

    alert(url1); // https://javascript.info/profile/admin
    alert(url2); // https://javascript.info/profile/admin

    // Можно создать новый на основе существующего
    {
        let url = new URL('https://javascript.info/profile/admin');
        let newUrl = new URL('tester', url); // // https://javascript.info/profile/tester
    }
}

/**
 * Структура URL состоит из следующих компонентов:
 *
 *      Протокол: Протокол указывает, каким образом будет осуществляться доступ к ресурсу. Например, наиболее распространенные протоколы включают http://, https://, ftp://, mailto:// и file://.
 *      Имя хоста: Имя хоста указывает на конкретный сервер или компьютер, на котором размещен ресурс. Например, www.example.com или 127.0.0.1.
 *      Порт (необязательно): Порт указывает на конкретный сетевой порт на сервере, через который будет осуществляться доступ к ресурсу. Например, :80 для HTTP или :443 для HTTPS. Если порт не указан, используется порт по умолчанию для соответствующего протокола.
 *      Путь: Путь указывает на конкретный путь к ресурсу на сервере. Например, /page.html или /images/picture.jpg. Путь может включать имена каталогов и файлов.
 *      Параметры запроса (необязательно): Параметры запроса используются для передачи дополнительной информации на сервер. Они добавляются к URL после символа вопроса ? и состоят из пар ключ-значение, разделенных символом амперсанда &. Например, ?id=123&name=John.
 *      Якорь (необязательно): Якорь указывает на конкретное место на веб-странице, к которому нужно прокрутить после ее загрузки. Он добавляется к URL после символа решетки #. Например, #section1 или #top.
 *
 * Пример полного URL: https://www.example.com:8080/path/page.html?id=123&name=John#section1
 * В этом примере:
 *
 * Протокол: https://
 * Имя хоста: www.example.com
 * Порт: :8080
 * Путь: /path/page.html
 * Параметры запроса: ?id=123&name=John
 * Якорь: #section1
 * Origin: https://www.example.com:8080
 */

/**
 * Search Params
 * Мы их сами можем добавить к строке, но они должны быть правильно закодированы, чтобы они могли содержать не-латинские буквы, пробелы и т.п.
 * Для этого есть URLSearchParams.
 * Полный список методов доступны на LearnJS
 */
{
    let url = new URL('https://google.com/search');
    url.searchParams.set('q', 'test me!'); // добавим параметр, содержащий пробел и !

    alert(url); // https://google.com/search?q=test+me%21

    url.searchParams.set('tbs', 'qdr:y'); // параметр с двоеточием :

// параметры автоматически кодируются
    alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// перебрать параметры (в исходном виде)
    for(let [name, value] of url.searchParams) {
        alert(`${name}=${value}`); // q=test me!, далее tbs=qdr:y
    }
}

/**
 * Кодирование
 * Запрещённые символы, например, нелатинские буквы и пробелы, должны быть закодированы – заменены соответствующими кодами UTF-8 с префиксом %, например: %20
  */
{
    let url = new URL('https://ru.wikipedia.org/wiki/Тест');
    url.searchParams.set('key', 'ъ');
    alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
}

/**
 * Кодирование в строках
 *
 * encodeURI – кодирует URL-адрес целиком.
 * decodeURI – декодирует URL-адрес целиком.
 * encodeURIComponent – кодирует компонент URL, например, параметр, хеш, имя пути и т.п.
 * decodeURIComponent – декодирует компонент URL.
 */

/**
 * encodeURIComponent VS encodeURI
 * encodeURI кодирует только символы, полностью запрещённые в URL.
 * encodeURIComponent кодирует эти же символы плюс, в дополнение к ним, символы #, $, &, +, ,, /, :, ;, =, ? и @
 *
 * Eсли нужно закодировать URL-адрес в целом, используйте encodeURI. Если  нужно закодировать компоненты URL, такие как параметры запроса, или просто строку, то - encodeURIComponent
 */
{
    let url = encodeURI('http://site.com/привет');
    alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
    console.log(encodeURIComponent("http://site.com/привет")); // http%3A%2F%2Fsite.com%2F%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
}