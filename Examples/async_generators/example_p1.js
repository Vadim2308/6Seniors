async function* fetchUsers(total) {
    let page = 1;
    while(true){
        console.log("start")
        if(page > total) break;
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${page}`);
        const data = await response.json();
        page++;
        yield data
        console.log("end")
    }
}
const iterator = fetchUsers(5);
const data = [];

{
    /**
     Пример по запросу по клику мыши
     */

    const fetchData = async () => {
        console.log('async fetch start')
        const res = await iterator.next()
        if(res.done){
            console.log(data)
            window.removeEventListener("click", fetchData);
            return
        }
        console.log(res)
        data.push(res.value)
    }
    window.addEventListener("click", fetchData);
}

{
    /**
     Пример по интервальному запросу
     */
    (async () => {
        let interval = null;
        interval = setInterval(async () => {
              const res = await iterator.next()
              d++
              if(res.done){
                clearInterval(interval)
                console.log('data',data)
                return
              }
              console.log(res)
              data.push(res.value)
        },500)

    })()
}

/**
 * Другой пример с интервальным выводом. Тут таймаут уже зашит в генератор.
 */
{
    async function* sleepyNumbers(count){
        let n = 0;
        while (n < count) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield new Promise(resolve => resolve(n++));
        }
    }

    (async () => {
        for await (const i of sleepyNumbers(4)){
            console.log(i);
        }
    })();
}