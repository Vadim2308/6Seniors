/**
 * Работа Promise c for await
 */
{
    function request(delay, isRejected) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (isRejected) {
                    reject(`${delay} was rejected`)
                } else {
                    resolve(`${delay} was resolved`)
                }
            }, delay * 1000)
        })
    }

    const data = [
        {
            value: 3,
            isRejected: false
        },
        {
            value: 2,
            isRejected: false
        },
        {
            value: 1,
            isRejected: true
        }
    ]
    const promises = data.map(({ value, isRejected }) => {
        return request(value, isRejected)
    })

    console.log(promises);

    (async function() {
        for await (let data of promises) { //автоматически обрабатывает отклоненные промисы.
            console.log(data)
            /**
             * Output:
             * 3 was resolved
             * 2 was resolved
             * 1 was resolved
             */
            // Если будет в каком то Promise rejected, то будет ошибка, как и в Promise.all
        }
    })()
        // Это аналогично что и Promise.all(promises).then(console.log)

        // Для того чтоб обрабатывать самому ошибки, можно использовать другой цикл
        (async function() {
            for (let i = 0; i < promises.length; i++) {
                try {
                    let data = await promises[i];
                    console.log(data);
                    /**
                     * Output:
                     * 3 was resolved
                     * 2 was resolved
                     */
                } catch (error) {
                    console.log(error);
                    // 1 was rejected
                }
            }
        })()
}

/**
 * Реализовать загрузку картинок через Promise.all()
 */
{
    const getPromisifyImage = (url) => {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = url;
            image.onload = () => resolve(image)
            image.onerror = (event) => reject(event)
        })
    }
    const imagesUrls = ["https://via.placeholder.com/600/771796","https://via.placeholder.com/600/24f355",]

    Promise.all(imagesUrls.map(getPromisifyImage)).then((images)=>{
        for(let image of images){
            document.body.appendChild(image)
        }
    }).catch(console.error)

}

/**
 * [Главы 9, 11]
 * 1. реализовать Promise.myAny
 * 2. реализовать метод Promise.myAll
 * 3. реализовать Promise.anyResolved - реждектимся, только если все зареджектились, а ресолвимся, если любой заресолвился.
 * anyResolved будет отличаться от any тем, что принимает доп. аргумент - количество промисов, после которых ресолвится. Например, если кинуть ему 3, то будет ждать 3 заресолвивишихся и потом сразу сам заресолвит, а если 3 не получится - реджектит. Нужно сделать оптимально, чтоб когда уже 100% не хватит оставшихся промисов для ресолва, не ждать их, а сразу реджектить.
 */