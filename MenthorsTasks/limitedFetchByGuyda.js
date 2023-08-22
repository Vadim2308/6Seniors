/**
 * Задача: реализовать функцию shina, которая принимает массив запросов, и количество запросов, которые могут выполняться одновременно
 * Например: всего 10 запросов, max = 2. Должно быть 5 пачек запросов по 2, которые выполняются параллельно.
 */


const ids = [1, 2, 3, "i_need_an_error"];
const MAX = 2;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const getTodoById = (id) =>
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
        const responses = await Promise.allSettled(
            spliced.map((request) => request()))
        await sleep(2000); // Просто чтоб удобнее смотреть в девтулзах промежутки между запросами =)
        result.push(...responses);
    }
    return result;
}

const getTodosList = async () => {
    const requestsList = ids.map(id=> getTodoById.bind(null,id))
    const result = await shina(requestsList,MAX)
    console.log(result)
}


void getTodosList()
