/**
 * Для сетевых запросов из JavaScript есть широко известный термин «AJAX» (аббревиатура от Asynchronous JavaScript And XML).
 * let promise = fetch(url, [options])
 *
 * В качестве объекта возвращается объект встроенного класса Response качестве результата, как только сервер пришлёт заголовки ответа.
 * fetch не генерит ошибки, поэтому мы можем увидеть HTTP-статус в свойствах ответа
 *      status – код статуса HTTP-запроса, например 200.
 *      ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299.
 */
{
    let response = await fetch('./');

    if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

/**
 * для получения тела ответа нам нужно использовать дополнительный вызов метода.
     * response.text() – читает ответ и возвращает как обычный текст,
     * response.json() – декодирует ответ в формате JSON,
     * response.formData() – возвращает ответ как объект FormData,
     * response.blob() – возвращает объект как Blob (бинарные данные с типом),
     * response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных),
     * помимо этого, response.body – это объект ReadableStream, с помощью которого можно считывать тело запроса по частям.
 *
 */
// (!) Мы можем выбрать только один метод чтения ответа. Остальные будут кидать ошибку
{
    let text = await response.text(); // тело ответа обработано
    let parsed = await response.json(); // Failed to execute 'json' on 'Response': body stream already read
}

// Пример с преобразованием ответа в строку
{
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
    let text = await response.text(); // прочитать тело ответа как текст
    console.log(text.slice(0, 80) + '...'); // text будет обычной строкой
}

// Пример с загрузкой blob файла
{
    let response = await fetch('/article/fetch/logo-fetch.svg');
    let blob = await response.blob(); // скачиваем как Blob-объект

    // создаём <img>
    let img = document.createElement('img');
    img.style = 'position:fixed;top:10px;left:10px;width:100px';
    document.body.append(img);

    // выводим на экран
    img.src = URL.createObjectURL(blob);

    setTimeout(() => { // прячем через три секунды
        img.remove();
        URL.revokeObjectURL(img.src);
    }, 3000);
}

/**
 * Заголовки ответа
 * Заголовки ответа хранятся в похожем на Map объекте response.headers
 * Это не совсем Map, но мы можем использовать такие же методы, как с Map, чтобы получить заголовок по его имени или перебрать заголовки в цикле
 */
{
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
    // получить один заголовок
    console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8
    // перебрать все заголовки
    for (let [key, value] of response.headers) {
        console.log(`${key} = ${value}`);
    }
}

/**
 * Заголовки запроса
 * Для установки заголовка запроса в fetch мы можем использовать опцию headers.
 * Есть список запрещенных заголовков, т.к. они обеспечивают корректную работу протокола HTTP, поэтому они контролируются исключительно браузером.
 */
{
    let response = fetch('/', {
        headers: {
            Authentication: 'secret'
        }
    });
}

/**
 * POST-запросы
 * Для отправки запроса необходимо испольховать параметры:
 *  method – HTTP метод, например POST,
 *  body – тело запроса, одно из списка:
 *        - строка (например, в формате JSON),
 *        - объект FormData для отправки данных как form/multipart,
 *        - Blob/BufferSource для отправки бинарных данных,
 *        - URLSearchParams для отправки данных в кодировке x-www-form-urlencoded, используется редко.
 */
{
    let user = {
        name: 'John',
        surname: 'Smith'
    };

    let response = await fetch('/article/fetch/post/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user) // так как тело запроса body – строка, то заголовок Content-Type по умолчанию будет text/plain;charset=UTF-8. 
        // Но, так как мы посылаем JSON, то используем параметр headers для отправки вместо этого application/json, правильный Content-Type для JSON.
    });

    let result = await response.json();
    console.log(result.message);
}

/**
 * Отправка изображения
 * Мы можем отправить бинарные данные при помощи fetch, используя объекты Blob или BufferSource.
 */
{
        const canvasElem = ''
        async function submit() {
            let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
            let response = await fetch('/article/fetch/post/image', {
                method: 'POST',
                body: blob
            });
            // сервер ответит подтверждением и размером изображения
            let result = await response.json();
            alert(result.message);
        }
}

/**
 * Получите данные о пользователях GitHub
 *  На каждого пользователя должен приходиться один запрос fetch.
 *  Запросы не должны ожидать завершения друг друга. Надо, чтобы данные приходили как можно быстрее.
 *  Если какой-то запрос завершается ошибкой или оказалось, что данных о запрашиваемом пользователе нет, то функция должна возвращать null в массиве результатов.
 */
{
    const baseUrl = 'https://api.github.com/users'
    const getUsers = async (names) => {
        const promises = names.map(name=> fetch(`${baseUrl}/${name}`))
        const settledPromises = await Promise.allSettled(promises)
        return Promise.all(settledPromises.map(response => response.value.ok ? response.value.json() : null))
    }
    getUsers(['iliakan', 'remy', 'no.such.users']).then(console.log)
}

{
    // Вариант с learnJS
    async function getUsers(names) {
        let jobs = [];
        for(let name of names) {
            let job = fetch(`https://api.github.com/users/${name}`).then(
                successResponse => {
                    if (successResponse.status != 200) {
                        return null;
                    } else {
                        return successResponse.json();
                    }
                },
                failResponse => {
                    return null;
                }
            );
            jobs.push(job);
        }
        let results = await Promise.all(jobs);
        return results;
    }
}