/**
 * IndexedDB – это встроенная база данных, более мощная, чем localStorage. Встроена во многие браузеры
 *      Хранит практически любые значения по ключам, несколько типов ключей
 *      Поддерживает транзакции для надёжности.
 *      Поддерживает запросы в диапазоне ключей и индексы.
 *      Позволяет хранить больше данных, чем localStorage.
 *
 * Предназначена для оффлайн приложений, можно совмещать с ServiceWorkers и другими технологиями.
 *
 * Вот некоторые ключевые концепции и возможности IndexedDB:
 *      Объектные хранилища (Object Stores): IndexedDB организует данные в хранилищах, которые похожи на таблицы в реляционных базах данных. Каждое хранилище содержит объекты, которые могут быть добавлены, извлечены, обновлены и удалены.
 *      Транзакции (Transactions): Все операции с данными в IndexedDB выполняются в рамках транзакций. Транзакции обеспечивают согласованность данных и защиту от конфликтов при одновременном доступе к базе данных из разных источников.
 *      Индексы (Indexes): IndexedDB позволяет создавать индексы для полей в объектных хранилищах. Индексы позволяют эффективно выполнять запросы и сортировку данных по определенным полям.
 *      Асинхронность: Операции с базой данных IndexedDB выполняются асинхронно. Это означает, что вам нужно использовать колбэки, промисы или асинхронные функции для обработки результатов операций.
 *      Версионирование: IndexedDB поддерживает версионирование базы данных. Это позволяет вам изменять структуру данных, добавлять и удалять хранилища и индексы при обновлении приложения.
 *
 * IndexedDB предоставляет JavaScript API для взаимодействия с базой данных.
 * Вы можете создавать, открывать, обновлять и удалять базы данных, хранилища, индексы и выполнять запросы для извлечения данных.
 * Кроме того, существуют библиотеки и абстракции, такие как Dexie.js и localForage, которые облегчают работу с IndexedDB и предоставляют более удобные интерфейсы.
 *
 *
 * Может хранить строки, числа, даты, объекты и даже файлы
 * Высокая скорость работы с данными, глобальное ограничение расчитывается как 50% от свободного пространства на диске
 * Можeт хранить миллионы записей
 * Самый главный недостаток: данные хранятся только в браузере
 * Часто используется в расширениях для браузеров, там расширения хранят свою инфу
 */

// Пример работы с IndexedDb
{
    // Открываем или создаем базу данных
    const request = indexedDB.open('myDatabase', 1);

    // Обработчик события при открытии или создании базы данных
    request.onupgradeneeded = function(event) {
        const db = event.target.result;

        // Создаем хранилище объектов
        const objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id' });

        // Создаем индекс для поля 'name'
        objectStore.createIndex('nameIndex', 'name', { unique: false });
    };

    // Обработчик успешного открытия или создания базы данных
    request.onsuccess = function(event) {
        const db = event.target.result;

        // Начинаем транзакцию для чтения и записи
        const transaction = db.transaction('myObjectStore', 'readwrite');

        // Получаем доступ к хранилищу объектов
        const objectStore = transaction.objectStore('myObjectStore');

        // Добавляем данные в хранилище
        const data = { id: 1, name: 'John Doe', age: 30 };
        const addRequest = objectStore.add(data);

        // Обработчик успешного добавления данных
        addRequest.onsuccess = function(event) {
            console.log('Данные успешно добавлены в хранилище');
        };

        // Завершаем транзакцию
        transaction.oncomplete = function() {
            console.log('Транзакция завершена');
        };

        // Извлекаем данные из хранилища
        const getRequest = objectStore.get(1);

        // Обработчик успешного извлечения данных
        getRequest.onsuccess = function(event) {
            const result = event.target.result;
            console.log('Извлеченные данные:', result);
        };

        // Закрываем базу данных
        db.close();
    };

// Обработчик ошибки при открытии или создании базы данных
    request.onerror = function(event) {
        console.error('Произошла ошибка при открытии или создании базы данных');
    };
}