/**
 * Объекты веб-хранилища localStorage и sessionStorage позволяют хранить пары ключ/значение в браузере.
 *      key и value должны быть строками. Для преобразования в строку значения используем JSON.stringify()
 *      Лимит 5 Мб+, зависит от браузера.
 *      Данные не имеют «времени истечения».
 *      Данные привязаны к источнику (домен/протокол/порт).
 *
 * localStorage                                                                           sessionStorage
 * Совместно используется между всеми вкладками и окнами с одинаковым источником          Разделяется в рамках вкладки браузера, среди ифреймов из того же источника
 * «Переживает» перезапуск браузера                                                       «Переживает» перезагрузку страницы (но не закрытие вкладки)

 * API:
 * setItem(key, value) – сохранить пару ключ/значение.
 * getItem(key) – получить данные по ключу key.
 * removeItem(key) – удалить значение по ключу key.
 * clear() – удалить всё.
 * key(index) – получить ключ на заданной позиции.
 * length – количество элементов в хранилище.
 * Используйте Object.keys для получения всех ключей. // Object.keys(localStorage);
 * Можно обращаться к ключам как к обычным свойствам объекта, в этом случае событие storage не срабатывает.

 * Событие storage:
 * Срабатывает при вызове setItem, removeItem, clear.
 * Содержит все данные об произошедшем обновлении (key/oldValue/newValue), url документа и объект хранилища storageArea.
 * Срабатывает на всех объектах window, которые имеют доступ к хранилищу, кроме того, где оно было сгенерировано (внутри вкладки для sessionStorage, глобально для localStorage).
 */


/**
 * Событие starage
 * Когда обновляются данные в localStorage или sessionStorage, генерируется событие storage
 */
{
    // срабатывает при обновлениях, сделанных в том же хранилище из других документов
    window.onstorage = event => { // можно также использовать window.addEventListener('storage', event => {
        if (event.key !== 'now') return;
        alert(event.key + ':' + event.newValue + " at " + event.url);
    };

    localStorage.setItem('now', Date.now());
}