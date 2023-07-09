async function* serverRequests(id = "", count = 6) {
    while (count) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        yield { count, id };
        count--;
    }
}

const ids = [1, 2, 3];

const result = [];

for (let v of ids) {
    (async (id) => {
        for await (const data of serverRequests(id, id * 3)) {
            result.push(data);
            console.log(data);
        }
    })(v);
}


// Даннный код нам позволит для массива ids вызывать параллельно запросы, независимо друг от друга, по аналогии с массовым подключением камер