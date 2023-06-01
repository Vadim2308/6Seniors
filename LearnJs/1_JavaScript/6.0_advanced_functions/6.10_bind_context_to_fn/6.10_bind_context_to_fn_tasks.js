/**
 * Исправьте функцию, теряющую "this"
 */
{
    function askPassword(ok, fail) {
        let password = prompt("Password?", '');
        if (password == "rockstar") ok();
        else fail();
    }

    let user = {
        name: 'Вася',
        loginOk() {
            alert(`${this.name} logged in`);
        },
        loginFail() {
            alert(`${this.name} failed to log in`);
        },

    };
    // askPassword(user.loginOk, user.loginFail);
    askPassword(user.loginOk.bind(user), user.loginFail.bind(user)); // Исправленная версия
}

/**
 * Использование частично применённой функции для логина
 * Что нужно передать в вызов функции askPassword в коде ниже, чтобы она могла вызывать функцию user.login(true) как ok и функцию user.login(false) как fail?
 */
{
    function askPassword(ok, fail) {
        let password = prompt("Password?", '');
        if (password == "rockstar") ok();
        else fail();
    }

    let user = {
        name: 'John',

        login(result) {
            alert( this.name + (result ? ' logged in' : ' failed to log in') );
        }
    };

    askPassword(user.login.bind(user,true), user.login.bind(user,false));
}

/**
 * Добавьте в последнюю строчку метод call() так, чтобы на экран вывелось value инпута, лежащего в переменной elem.
 */
{
    const elem = {
        value: 'привет',
    };
    function func1() {
        console.log(this.value);
    }
    func1.call(elem); // Output: 'привет'
}

// Task 2
// Добавьте в последнюю строчку метод call() так, чтобы на экран вывелось 'привет, Иванов Иван'.
// Слово 'привет' должно взяться из value инпута, а 'Иванов' и 'Иван' должны быть параметрами функциями
{
    var elem2 = {
        value: 'привет',
    };

    function func2(surname, name) {
        console.log(this.value + ', ' + surname + ' ' + name);
    }

    func2.call(elem2,"Иванов","Иван")

}

/**
 *
 * Создать функцию, которая запоминает переданные в нее числа и суммирует их когда аргументы не передаются.
 */

{
    const rememberSum = (...args) => {
        if(!args.length) return 'no arguments';
        if(args.length === 1) return args[0];
        const sum = args.reduce((acc,item)=> acc + item, 0)
        return rememberSum.bind(null,sum)
    }
    console.log(rememberSum(1,2,3)(1,2,3)(1,2,3)());    // Output: 18
    console.log(rememberSum(1,2,3)(1,2,3)());           // Output: 12
}