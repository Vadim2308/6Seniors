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