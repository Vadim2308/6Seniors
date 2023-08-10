const ids = [1, 2, 3, "i_need_an_error"];
const MAX = 2;

const sleep = (ms) =>
    new Promise((res) => {
        setTimeout(() => {
            res();
        }, ms);
    });

const request = (id) =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((response) => {
        if (!response.ok) return Promise.reject();
        return response.json();
    });

async function shina(requests, max) {
    if(max <= 0) throw new Error('max value should be more than 0')
    const promises = [...requests];
    const result = [];
    while (promises.length) {
        const spliced = promises.splice(0, max);
        const res = await Promise.allSettled(
            spliced.map((id) => request(id)))
        const fulfilledRequests = res.filter((d) => d.status === "fulfilled")
        await sleep(2000); // Просто чтоб удобнее смотреть в девтулзах =)
        result.push(...fulfilledRequests);
    }
    console.log(result);
    return result;
}

void shina(ids, MAX);
