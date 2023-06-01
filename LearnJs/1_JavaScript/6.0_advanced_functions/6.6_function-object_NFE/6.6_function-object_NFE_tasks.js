/**
 * Установка и уменьшение значения счётчика
 */
{
    function makeCounter() {
        let count = 0;
        const fn = () => {
            return count++
        }
        fn.set = (value) => {
            count = value
        }
        fn.decrease = () => {
            count--
        }
        return fn
    }

    let counter = makeCounter();

    alert(counter()); // 0
    alert(counter()); // 1

    counter.set(10); // установить новое значение счётчика

    alert(counter()); // 10

    counter.decrease(); // уменьшить значение счётчика на 1

    alert(counter()); // 10 (вместо 11)
}

/**
 * Сумма с произвольным количеством скобок
 * Напишите функцию sum, которая бы работала следующим образом:
         * sum(1)(2) == 3; // 1 + 2
         * sum(1)(2)(3) == 6; // 1 + 2 + 3
         * sum(5)(-1)(2) == 6
         * sum(6)(-1)(-2)(-3) == 0
         * sum(0)(1)(2)(3)(4)(5) == 15
 */

{
    // v1
    function sum(a) {
        let currentSum = a;
        function f(b) {
            currentSum += b;
            return f;
        }
        f.toString = () => currentSum
        return f;
    }
    // v2
    function sum2 (n) {
        const f = function (x) {
            return sum2(n + x);
        };

        f.valueOf = function() {
            return n;
        };
        /**
         * f[Symbol.toPrimitive] = function(hint){
         *   return n
         * }
         */

        return f;
    }
}
