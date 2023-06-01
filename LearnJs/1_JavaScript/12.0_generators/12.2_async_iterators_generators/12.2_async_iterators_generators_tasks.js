const asyncIterable = {
    init: 4,
    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                if (this.init >= 0) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, 1000);
                    });
                    return { value: this.init--, done: false };
                }
                return Promise.resolve({ done: true });
            },
        };
    },
};

(async function () {
    for await (let num of asyncIterable) {
        console.log(num); // 4,3,2,1,0 c интервалом в 1сек
    }
})();


/**
 * Перебор сущностей при пагинации API
 * Постов может быть очень много, что не позволит загрузить их за раз.
 */
{
    const sleep = (tm=1000) => new Promise(r=>setTimeout(r,tm))
    async function* getBlogPosts() {
        let id = 1
        const limit = 10

        while (true) {
            await sleep(id*1000)
            if (id > limit) break
            const result = await fetch(`https://jsonplaceholder.typicode.com/users/${id++}`).then(r=> r.json())
            for (const key in result) {
                console.log('вызывается for of в генераторе')
                yield result[key]
            }
        }
    }

    (async()=>{
        for await (const post of getBlogPosts()) {
            console.log(post)
        }
    })()
}