/**
 * Добавить функциям метод "f.defer(ms)"
 * Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.
 */
{
    Function.prototype.defer = function(ms) {
        setTimeout(this, ms);
    };

    function f() {
        alert("Hello!");
    }

    f.defer(1000); // выведет "Hello!" через 1 секунду
}

/**
 * Добавьте функциям декорирующий метод "deferred()"
 * Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд.
 */
{
    Function.prototype.deferred = function(ms){
        return (...args) => {
            setTimeout(this.bind(this,...args),ms)
        }
    }
    function f(a, b) {
        console.log( a + b );
    }

    f.deferred(1000)(1, 2); // выведет 3 через 1 секунду.
}