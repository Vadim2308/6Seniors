/**
 * var - устаревший способ объявления переменной
 */

/**
 * var имеет функциональную область видимости, let и const блочную.
 */
{
    if (true) {
        var test = true; // используем var вместо let
    }
    alert(test); // true, переменная существует вне блока if

    for (var i = 0; i < 10; i++) {
        // ...
    }
    alert(i); // 10, переменная i доступна вне цикла, т.к. является глобальной переменной
}

/**
 * «var» допускает повторное объявление
 */
{
    var user = "Pete";
    var user = "John";
    alert(user); // John

    {
        var user = "Pete";
        var user; // ничего не делает, переменная объявлена раньше // ...нет ошибки
        alert(user); // Pete
    }
}

/**
 * «var» обрабатываются в начале запуска функции
 * переменные var считаются объявленными с самого начала исполнения функции вне зависимости от того, в каком месте функции реально находятся их объявления
 */
{
    function sayHi() {
        phrase = "Привет";
        alert(phrase);
        var phrase;
    }
    sayHi();
    // Под капотом это выглядит так
    {
        function sayHi() {
            var phrase; // «hoisting» (всплытие, поднятие)
            phrase = "Привет";
            alert(phrase);
        }
        sayHi();
    }
    // Даже если код не выполнится, он все равно всплывет наверх
    {
        function sayHi() {
            phrase = "Привет"; // (*)
            if (false) {
                var phrase;
            }
            alert(phrase);
        }
        sayHi();
    }
}

// Затрагивая var необходимо держать в голове временную мертвую зону - ВМЗ (Temporal Dead Zone - tdz)
// var всплывает, но только ее объявление.
// Не присваивание значения. (То есть всплывшая var, до того как исполнение дойдет до строчки присваивания, равна undefined)
(function immediate() {
    if (count === 0) {                 // Не выполнится, тк сейчас count === undefined
        var count = 1;
        console.log(count);
    }
    console.log(count);                // Тк строчка присваивания (42 стрк) недостижима, tdz растянулось на всю функцию (count так и осталась undefined)
})();

/**
 * TDZ - Temporal Dead Zone
 * https://jsinthebits.com/what-is-the-temporal-dead-zone-e41369d4/
 */

/**
 * Hoisitng let & const
 * let и const имеют хостинг (hoisting) в JavaScript, но есть некоторые отличия от хостинга переменных, объявленных с использованием ключевого слова var.
 * Если б его не было, не было б ошибки при обращении ReferenceError
 *
 * Когда переменная создается с использованием let или const, ее объявление делается внутри блока, в котором она была определена, а не в глобальной области видимости.
 * Это означает, что переменные let и const не могут быть доступны до тех пор, пока программа не выполнит определение, в отличие от var, который может быть использован до его определения.
 */

{
    let name = 'Andrey'
    {
      name = 'Zhenya' // ReferenceError: Can not access 'name' before initialization
      /*
        Все обращения к переменной, которая находится выше ее объявления, считается TDZ
       */
      let name = 'Kolya'
      console.log(name)
    }
}


/**
 * Hoisting
 * Интерпретатор парсит весь код, и все FD и var-ы всплывут наверх
 */
{
    console.log(a); // ReferenceError: a is not defined || Can not access 'name' before initialization. В Chrome 1 вариант, в остальных средах второй
    let a = 4;
}
{
    (()=>{
        console.log(a); // ReferenceError: Cannot access 'a' before initialization
        let a = 4;
    })()
}
{
    a = 10 // var a = 10
    console.log(a) // 10
}
{
    var a;
    console.log(a) // undefined
    a = 10
}
{
    console.log(a) // ReferenceError: a is not defined
    a = 10
}
{
    console.log(a) // undefined. Наверх всплывет var a;
    var a = 10
}

/**
 * Декларирование переменных var снаружи
 */
{
    function foo (){
        a = 30
    }
    foo()
    console.log(a) // 30
    /**
     * 1. При вызове функции a ищется в локальной области видимости
     * 2. Если не находит, выходит наружу.
     * 3. Если нет снаружи, создает ее через var и присваивает значение
     * 4. Итого в глобальной области (если не нашел раньше) видимости будет var = 30
     */

    {
        function foo() {
            var a = 1;
            a = 30;
        }
        foo();
        console.log(a); // ReferenceError: a is not defined
    }
}
/**
 * Циклы и var
 */
{
    for(var i = 0; i < 5; i++){}
    console.log(i) //5 т.к. var имеет функциональную о.в., и виден снаружи цикла
}