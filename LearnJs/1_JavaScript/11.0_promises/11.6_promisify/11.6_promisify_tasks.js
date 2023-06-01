/**
 * Написать универсальную функцию обертку, которая будет промисифицировать переданную функцию
 */

    function promisify(f, manyArgs = false) {
        return function (...args) {
            return new Promise((resolve, reject) => {
                function callback(err, ...results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(manyArgs ? results : results[0]);
                    }
                }
                f.apply(this, [...args,callback]);
            });
        };
    }

    function calc(...data) {
        const [a,b,callback] = data;
        let sum = a + b;
        if (a < 2) {
            callback(new Error('Первый аргумент должен быть больше 1'))
        } else {
            callback(null, sum)
        }
    }
    const promF = promisify(calc, false);
    promF(2,2).then(console.log) // 4
   // promF(2,2).then(console.log) // Error: Первый аргумент должен быть больше 1

