/**
 * Перепишите один из примеров раздела Цепочка промисов, используя async/await вместо .then/catch:
 */
{
    // function loadJson(url) {
    //     return fetch(url)
    //         .then(response => {
    //             if (response.status == 200) {
    //                 return response.json();
    //             } else {
    //                 throw new Error(response.status);
    //             }
    //         })
    // }
    //
    // loadJson('no-such-user.json') // (3)
    //     .catch(alert); // Error: 404

    async function loadJson(url) {
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(response.status);
    }

    loadJson('no-such-user.json')
        .catch(console.log); // Error: 404
}

/**
 * Перепишите, используя async/await
 */
{
    class HttpError extends Error {
        constructor(response) {
            super(`${response.status} for ${response.url}`);
            this.name = 'HttpError';
            this.response = response;
        }
    }

    function loadJson(url) {
        return fetch(url)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new HttpError(response);
                }
            })
    }

// Запрашивать логин, пока github не вернёт существующего пользователя.
    function demoGithubUser() {
        let name = prompt("Введите логин?", "iliakan");

        return loadJson(`https://api.github.com/users/${name}`)
            .then(user => {
                alert(`Полное имя: ${user.name}.`);
                return user;
            })
            .catch(err => {
                if (err instanceof HttpError && err.response.status == 404) {
                    alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
                    return demoGithubUser();
                } else {
                    throw err;
                }
            });
    }

    demoGithubUser();

    // Решение

    {
        async function loadJson(url) {
            const response = await fetch(`https://api.github.com/users/${name}`);
            if (response.status === 200) {
                return await response.json();
            }
            throw new HttpError(response);
        }

        const demoGithubUser = async () => {
            try {
                let name = prompt("Введите логин?", "iliakan");
                const user = await loadJson(name)
                alert(`Полное имя: ${user.name}.`);
                return user
            } catch (err) {
                if (err instanceof HttpError && err.response.status == 404) {
                    alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
                    return void demoGithubUser();
                } else {
                    throw err;
                }
            }
        }
        // Вариант с учебника через while
        async function demoGithubUser2() {
            let user;
            while(true) {
                let name = prompt("Введите логин?", "iliakan");
                try {
                    user = await loadJson(`https://api.github.com/users/${name}`);
                    break; // ошибок не было, выходим из цикла
                } catch(err) {
                    if (err instanceof HttpError && err.response.status == 404) {
                        // после alert начнётся новая итерация цикла
                        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
                    } else {
                        // неизвестная ошибка, пробрасываем её
                        throw err;
                    }
                }
            }
            alert(`Полное имя: ${user.name}.`);
            return user;
        }
    }
}

/**
 * Вызовите async–функцию из "обычной"
 * Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?
 */
{
    async function wait() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return 10;
    }
    function f() {
        // ...что здесь написать?
        // чтобы вызвать wait() и дождаться результата "10" от async–функции
        // не забывайте, здесь нельзя использовать "await"
        wait().then(console.log)
    }
}

// Напишите функцию, которая будет выводить 10 чисел с интервалом 1 сек

(async ()=>{
    const sleep = () => new Promise(resolve=>setTimeout(resolve,1000))
    for(let i = 0; i < 11; i++){
        await sleep()
        console.log(i)
        // || console.log(await new Promise(resolve => setTimeout(() => resolve(i), 1000)));
    }
})()