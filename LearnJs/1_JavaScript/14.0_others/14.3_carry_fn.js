/**
 * Каррирование - это трансформация, которая превращает вызов f(a, b, c) в f(a)(b)(c)
 *  _.curry из библиотеки lodash, возвращают обёртку, которая позволяет запустить функцию как обычным образом, так и частично.
 */
{
    // Собственная имплементация _curry
    function curry(func) {
        return function curried(...args) {
            if (args.length >= func.length) {
                return func.apply(this, args);
            } else {
                return function(...args2) {
                    return curried.apply(this, args.concat(args2));
                }
            }
        };

    }
}