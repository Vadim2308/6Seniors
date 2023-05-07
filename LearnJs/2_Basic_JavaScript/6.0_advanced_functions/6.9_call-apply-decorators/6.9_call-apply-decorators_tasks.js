/**
 * Свой debounce
 */
const debounce = (fn,timeout=0) => {
    let id = null
    return function () {
        clearTimeout(id);
        id = setTimeout(()=>{
            fn.apply(this,arguments)
        },timeout)
    }
}

/**
 * Свой throttled
 */
const throttled = (fn,timeout=0) => {
    let id = null
    return function () {
        if(id !== null) return;
        id = setTimeout(()=>{
            fn.apply(this,arguments)
            id = null
        },timeout)
    }
}

/**
 * Свой pinger
 */
const pinger = (fn,timeout=0) => {
    let id = null
    return function () {
        if(id !== null){
            clearInterval(id);
            id = null
            return
        }
        id = setInterval(()=>{
            fn.apply(this,arguments)
        },timeout)
    }
}

/**
 * Декоратор-шпион
 * Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.
 * Каждый вызов должен сохраняться как массив аргументов.
 */

{
    function work(a, b) {
        alert( a + b ); // произвольная функция или метод
    }

    function spy(fn){
        function binded(){
            binded.calls.push([...arguments])
            return fn.apply(this,arguments)
        }
        binded.calls = []
        return binded

    }

    work = spy(work);

    work(1, 2); // 3
    work(4, 5); // 9

    for (let args of work.calls) {
        alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
    }
}

/**
 * Задерживающий декоратор
 * Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.
 */

{
    function f(x) {
        alert(x);
    }

    function delay(f, ms) {
        return function () {
            setTimeout(() => f.apply(this, arguments), ms);
        }
    }

    let f1000 = delay(f, 1000);
    let f1500 = delay(f, 1500);

    f1000("test"); // показывает "test" после 1000 мс
    f1500("test"); // показывает "test" после 1500 мс
}
