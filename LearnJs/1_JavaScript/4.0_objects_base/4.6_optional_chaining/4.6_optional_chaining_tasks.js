{
    /**
     * 1. Создайте объект с вложенными свойствами и методами. Обратитесь к свойствам и методам используя optional chaining.
     */
    const obj = {
        name:'Alex',
        age:20,
        car:null
    }
    const car = obj.car?.color; // undefined
}
{
    /**
     * 2. Напишите функцию высшего порядка, которая вызывает переданные ей функции в зависимости от их наличия
     */
    function doSomething(onContent, onError) {
        try {
            // ... делаем что-то с данными
            onContent?.()
        }
        catch (err) {
            onError?.(err.message); // не выбросит исключение, если onError равен undefined
        }
    }
}

{
    /**
     * Вам дан некий объект, из которого нам нужно достать ключ city, он является необязательным. Комбинируйте ?. и ?? для присвоения по умолчанию
     */
    let customer = {};
    const customerCity = customer?.city ?? "Unknown city";
    console.log(customerCity); // Unknown city
}
