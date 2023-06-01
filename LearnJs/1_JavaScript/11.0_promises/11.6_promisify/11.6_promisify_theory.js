/**
 * Промисификация - процесс преобразования функции, которая принимает определенный колбек, чтоб она возвращала промис
 */
{
    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

        document.head.append(script);
    }
    // Ее промисификация
    const promisifyLoadScript = (src) => {
        return new Promise((resolve, reject) => {
            loadScript(src,(error,script)=>{
                if(error){
                    reject(error)
                }else {
                    resolve(script)
                }
            })
        })
    }
    // использование:
    // loadScriptPromise('path/script.js').then(...)
}

{
    function calc(a, b, callback) {
        let sum = a + b;
        if (a < 2) {
            callback(new Error('Первый аргумент должен быть больше 1'))
        } else {
            callback(null, sum)
        }
    }
    function square(err, sum) {
        if (err) console.log(err)
        else console.log(sum ** 2)
    }
    calc(6, 2, square)

    function promCalc(a, b) {
        return new Promise((res, rej) => {
            calc(a, b, (err, sum) => {
                if (err) rej(err)
                else res(sum)
            })
        })
    }
    promCalc(3, 1).then(res => square(null, res)).catch(square)
}