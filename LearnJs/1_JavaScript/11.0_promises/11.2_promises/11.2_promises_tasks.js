/**
 * Можно ли "перевыполнить" промис?
 * Что выведет код ниже?
 */
{
    let promise = new Promise(function(resolve, reject) {
        resolve(1);
        setTimeout(() => resolve(2), 1000);
    });

    promise.then(alert); // Будет 1, т.к. второй resolve проигнорируется
}

/**
 * Задержка на промисах
 * Встроенная функция setTimeout использует колбэк-функции. Создайте альтернативу, использующую промисы.
 * Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен» через ms миллисекунд, так чтобы мы могли добавить к нему .then:
 */
{
    function delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve,ms)
        })
    }
    delay(3000).then(() => alert('выполнилось через 3 секунды'))
}


// https://habr.com/ru/companies/otus/articles/686670/
// Задачи по определению порядка
{
    // 1
    console.log('start');
    const promise1 = new Promise((resolve, reject) => {
        console.log(1)
    })
    console.log('end');
    // Output: start 1 end
}
{
    // 2
    console.log('start');

    const promise1 = new Promise((resolve, reject) => {
        console.log(1)
        resolve(2)
    })

    promise1.then(res => {
        console.log(res)
    })

    console.log('end');

    // Output: start 1 end 2
}
{
    // 3
    console.log('start');

    const promise1 = new Promise((resolve, reject) => {
        console.log(1)
        resolve(2) // resolve не прерывает выполнение функции. Код, стоящий за ним, по-прежнему будет выполняться.
        console.log(3)
    })

    promise1.then(res => {
        console.log(res)
    })

    console.log('end');

    // Output: start 1 3 end 2
}
{
    // 4
    console.log('start');

    const promise1 = new Promise((resolve, reject) => {
        console.log(1)
    })

    promise1.then(res => {
        console.log(2)
    })

    console.log('end');

    // Output: start 1 end
}
{
    // 5
    console.log('start')

    const fn = () => (new Promise((resolve, reject) => {
        console.log(1);
        resolve('success')
    }))

    console.log('middle')

    fn().then(res => {
        console.log(res)
    })

    console.log('end')

    // Output: start middle 1 end success
}
{
    // 6
    console.log('start')

    Promise.resolve(1).then((res) => {
        console.log(res)
    })

    Promise.resolve(2).then((res) => {
        console.log(res)
    })

    console.log('end')
    // Output: start end 1 2
}
{
    // 7
    console.log('start')

    setTimeout(() => {
        console.log('setTimeout')
    })

    Promise.resolve().then(() => {
        console.log('resolve')
    })

    console.log('end')
    // Output: start end resolve setTimeout
}
{
    // 8
    const promise = new Promise((resolve, reject) => {
        console.log(1);
        setTimeout(() => {
            console.log("timerStart");
            resolve("success");
            console.log("timerEnd");
        }, 0);
        console.log(2);
    });

    promise.then((res) => {
        console.log(res);
    });

    console.log(4);

    // Output: 1 2 4 timerStart timerEnd success
}
{
    // 9
    const timer1 = setTimeout(() => {
        console.log('timer1');

        const promise1 = Promise.resolve().then(() => {
            console.log('promise1')
        })
    }, 0)

    const timer2 = setTimeout(() => {
        console.log('timer2')
    }, 0)

    // Output: timer1 promise1 timer2
}
{
    //10
    console.log('start');

    const promise1 = Promise.resolve().then(() => {
        console.log('promise1');
        const timer2 = setTimeout(() => {
            console.log('timer2')
        }, 0)
    });

    const timer1 = setTimeout(() => {
        console.log('timer1')
        const promise2 = Promise.resolve().then(() => {
            console.log('promise2')
        })
    }, 0)

    console.log('end');

    // Output: start end promise1 timer1 promise2 timer2
}

{
    async function abc() {
        console.log(8)

        await Promise.resolve(2) // micro 1
            .then(console.log)

        console.log(3)
    }

    setTimeout(() => {
        console.log(1)  // macro 1
    }, 0)

    abc()

    queueMicrotask(() => {
        console.log(0)  // micro 2
    })

    Promise.resolve(4)
        .then(console.log)  // micro 3

    console.log(6)

    // Output: 8 6 2 0 4 3 1
}

{
    setTimeout(()=>{
        console.log(5)
    })

    const p1 = Promise.resolve().then(()=>console.log(1)).then(()=>console.log(2))
    const p2 = Promise.resolve().then(()=>console.log(3)).then(()=>console.log(4))

    console.log(0)
    // Output 0 1 3 2 4 5
}