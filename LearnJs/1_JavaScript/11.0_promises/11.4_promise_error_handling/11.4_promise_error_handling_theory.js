/**
 * Цепочки промисов отлично подходят для перехвата ошибок.
 * Самый лёгкий путь перехватить все ошибки – это добавить .catch в конец цепочки
 */
{
    fetch('/article/promise-chaining/user.json')
        .then(response => response.json())
        .then(user => fetch(`https://api.github.com/users/${user.name}`))
        .then(response => response.json())
        .then(githubUser => new Promise((resolve) => {
            setTimeout(() => {
                resolve(githubUser);
            }, 3000);
        }))
        .catch(error => alert(error.message)); // Если все в порядке, то такой .catch вообще не выполнится.
}

/**
 * Неявный try…catch
 * Вокруг функции промиса и обработчиков находится "невидимый try..catch
 * Если происходит исключение, то оно перехватывается, и промис считается отклонённым с этой ошибкой.
 */
{
    new Promise((resolve, reject) => {
        throw new Error("Ошибка!");
    }).catch(alert); // Error: Ошибка!

    // Тоже самое что и
    new Promise((resolve, reject) => {
        reject(new Error("Ошибка!"));
    }).catch(alert); // Error: Ошибка!

    // Это работает также в обработчиках
    // Если мы бросим ошибку (throw) из обработчика (.then), то промис будет считаться отклонённым
    new Promise((resolve, reject) => {
        resolve("ок");
    }).then((result) => {
        throw new Error("Ошибка!"); // генерируем ошибку
    }).catch(alert); // Error: Ошибка!

    new Promise((resolve, reject) => {
        resolve("ок");
    }).then((result) => {
        blabla(); // нет такой функции
    }).catch(alert); // ReferenceError: blabla is not defined
}


/**
 * Пробрасывание ошибок
 * Если мы пробросим (throw) ошибку внутри блока .catch, то управление перейдёт к следующему ближайшему обработчику ошибок (catch).
 * А если мы обработаем ошибку и завершим работу обработчика нормально, то продолжит работу ближайший успешный обработчик .then.
 */
{
    new Promise((resolve, reject) => {
        throw new Error("Ошибка!");
    }).catch(function(error) {
        alert("Ошибка обработана, продолжить работу");
    }).then(() => alert("Управление перейдёт в следующий then"));

    //-------------------------//
    // the execution: catch -> catch -> then
    new Promise((resolve, reject) => {
        throw new Error("Ошибка!");
    }).catch(function(error) { // (*)
        if (error instanceof URIError) {
        } else {
            alert("Не могу обработать ошибку");
            throw error; // пробрасывает эту или другую ошибку в следующий catch
        }
    }).then(function() {
        /* не выполнится */
    }).catch(error => { // (**)
        alert(`Неизвестная ошибка: ${error}`);
        // ничего не возвращаем => выполнение продолжается в нормальном режиме
    });
}

/**
 * Необработанные ошибки
 * Если ошибка не была обработана, и нет ближайшего обработчика событий, то как и try{}catch скрипт умрет, и движок сгенерит глобальную ошибку
 * Это событие является частью стандарта HTML.
 */
{
    new Promise(function() {
        noSuchFunction(); // Ошибка (нет такой функции)
    }).then(() => {
            // обработчики .then, один или более. Выкидывает ошибку глобальную
        });
    {
        window.addEventListener('unhandledrejection', function(event) {
            // Если происходит ошибка, и отсутствует её обработчик, то генерируется событие unhandledrejection, и соответствующий объект event содержит информацию об ошибке.
            // объект события имеет два специальных свойства:
            alert(event.promise); // [object Promise] - промис, который сгенерировал ошибку
            alert(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
        });

        new Promise(function() {
            throw new Error("Ошибка!");
        }); // нет обработчика ошибок
    }
}