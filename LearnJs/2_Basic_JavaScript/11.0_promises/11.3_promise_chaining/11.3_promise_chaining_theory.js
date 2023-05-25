/**
 * Мы можем строить цепочку промисов, чтоб передавать результат от одного then-a к другому
 */
{
    const promise = new Promise(resolve=> resolve(1))
    promise.then(r=>r+1).then(r=>r+1).then(r=>r+1).then(console.log) // 4

    // Классическая ошибка, это добавлять к инстансу обработчики, но они независимы, это не является цепочкой
    promise.then() // Это разные then, они не общаются между собой
    promise.then() // Это разные then, они не общаются между собой
    promise.then() // Это разные then, они не общаются между собой
}

/**
 * Обработчик handler, переданный в .then(handler), может вернуть промис.
 * В этом случае дальнейшие обработчики ожидают, пока он выполнится, и затем получают его результат.
 */
{
    const promise2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000);
    }).then((result) => {
        console.log(result * 2);
        return new Promise(resolve => {
            setTimeout(() => resolve(result * 2), 1000);
        });
    }).then((result) => {
        console.log(result * 2);
        return result * 2;
    });
    // Output: 2 (спустя 1 сек)    4 (спустя 2 сек)

}

/**
 * (!) типичная ошибка, когда промисы начинают использовать по "старому", и код начинает расти вправо
 */
{
    loadScript("/article/promise-chaining/one.js").then(script1 => {
        loadScript("/article/promise-chaining/two.js").then(script2 => {
            loadScript("/article/promise-chaining/three.js").then(script3 => {
            });
        });
    });
}

/**
 * Thenable объекты
 * Смысл в том, что сторонние библиотеки могут создавать свои собственные совместимые с промисами объекты. Они могут иметь свои наборы методов и при этом быть совместимыми со встроенными промисами, так как реализуют метод .then
 * JavaScript проверяет объект, возвращаемый из обработчика .then
 * У сли у него имеется метод then, который можно вызвать, то этот метод вызывается, и в него передаются resolve и reject
 *
 * Это позволяет добавлять в цепочки промисов пользовательские объекты, не заставляя их наследовать от Promise.
 */
{
    const thenableObject = {
        then(resolve,reject){
            setTimeout(()=>{ resolve('thenable object') },2000)
        }
    }
    const promise = new Promise(resolve=>{
        resolve(1)
    })
    promise.then(()=>thenableObject).then(console.log) // Output: thenable objects
}

/**
 * Сложный fetch.
 * Запросить юзера, показать картинку, через 3 сек удалить, и вывести финальное уведомление
 */
{
    function loadJson(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function loadGithubUser(name) {
        return fetch(`https://api.github.com/users/${name}`)
            .then(response => response.json());
    }

    function showAvatar(githubUser) {
        return new Promise(function(resolve, reject) {
            let img = document.createElement('img');
            img.src = githubUser.avatar_url;
            img.className = "promise-avatar-example";
            document.body.append(img);

            setTimeout(() => {
                img.remove();
                resolve(githubUser);
            }, 3000);
        });
    }

    loadJson('/article/promise-chaining/user.json')
        .then(user => loadGithubUser(user.name))
        .then(showAvatar)
        .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
}