/**
 * Сравнение then и catch.
 *
 * Эквиваленты ли эти записи ?
 * promise.then(f1).catch(f2);
 * promise.then(f1, f2);
 */
{
    // Нет, если ошибка произойдёт в f1, то она будет обработана в .catch в этом примере: promise.then(f1).catch(f2);
    // Ошибка передаётся по цепочке, и падает в catch
}
{

    const resolvedPromise = new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 1000);
    })

    const rejectedPromise = new Promise((_,reject) => {
        setTimeout(() => {
            reject('rejected');
        }, 1000);
    })

    const promise = (flag) => flag ? resolvedPromise : rejectedPromise


    promise(false).then(() => {
        console.log('1-resolved');
    }, () => {
        console.log('1-rejected');
    }).then(() => {
        console.log('2-resolved');
    }, () => {
        console.log('2-rejected');
    });

    // Output:
    // 1. '1-rejected'
    // 2. '2-resolved'

    // Но если бы мы на 32 строчке сделали например throw 1, то у нас бы были результат:
    // 1. '1-rejected'
    // 2. '2-rejected'


    promise(true).then(() => {
        console.log('1-resolved');
    }).catch(() => {
        console.log('1-rejected');
    }).then(() => {
        console.log('2-resolved');
    }).catch(() => {
        console.log('2-rejected');
    });

    /**
     * Output:
     * 1. '1-resolved'
     * 2. '2-resolved'
     */

}