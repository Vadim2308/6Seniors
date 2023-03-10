{
    //function declarations
    function sayHi() {
        alert( "Привет" );
    }
}
{
    //function expressions
    let sayHi = function () {
        alert( "Привет" );
    }
}
{
    //Функции можно присваивать в переменные, они копируются по ссылке
    function sayHi() {   // (1) создаём
        alert( "Привет" );
    }
    let func = sayHi;    // (2) копируем
    func(); // Привет     // (3) вызываем копию (работает)!
    sayHi(); // Привет    //     эта тоже все ещё работает
}

{
    /*Функции коллбеки*/
    function ask(question, yes, no) {
        if (confirm(question)) yes()
        else no();
    }
    function showOk() {}
    function showCancel() {}

// использование: функции showOk, showCancel передаются в качестве аргументов ask
    ask("Вы согласны?", showOk, showCancel);
    //Аргументы showOk и showCancel функции ask называются функциями-колбэками или просто колбэками.
    // Коллбек, означает что вызовется когла нибудь потом, когда необходимо (от англ. «call back» – обратный вызов)
}


/**
 * FD и FE имеют блочную область видимости.
 * Отличия FD от FE
 * 1. Cинтаксис
 * 2. Hoisting
 *   Function Expression создаётся, когда выполнение доходит до него, и затем уже может использоваться.
 *   Function Declaration может быть вызвана раньше, чем она объявлена.
 *   Другими словами, когда движок JavaScript готовится выполнять скрипт или блок кода, прежде всего он ищет в нём Function Declaration и создаёт все такие функции.
 *   И только после того, как все объявления Function Declaration будут обработаны, продолжится выполнение.
 *   В результате функции, созданные как Function Declaration, могут быть вызваны раньше своих определений.
 */
