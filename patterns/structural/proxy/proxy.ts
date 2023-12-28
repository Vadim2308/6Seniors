interface IPaymentAPI {
    getPaymentDetail(id:number):IPaymentDetail | undefined
}

interface IPaymentDetail {
    id:number;
    sum:number
}

/**
 * Есть некоторый сервис, который по методу getPaymentDetail отдает детали платежа
 * Но вдруг нам потребовалось проверить на безопасность, чтоб не все подряд юзеры могли дергать этот метод
 * Поэтому используется паттерн Proxy, который навешивает эту проверку поверх существующего кода
 */
class PaymentAPI implements IPaymentAPI {
    private data:IPaymentDetail[] = [{id:1,sum:20000}]
    getPaymentDetail(id: number): IPaymentDetail | undefined {
        // @ts-ignore
        return this.data.find(el=>el.id === id)
    }
}

class PaymentAccessProxy implements IPaymentAPI{
    constructor(private api:PaymentAPI,private userId:number) {
    }
    getPaymentDetail(id: number): IPaymentDetail | undefined { // Это само проксирование
        if(this.userId === 1){
            return this.api.getPaymentDetail(id)
        }
        console.log("Попытка получить данные платежа!")
        return undefined
    }
}
// Использование
const proxyAdmin = new PaymentAccessProxy(new PaymentAPI(),1)
console.log(proxyAdmin.getPaymentDetail(1)) // {id:1,sum:20000}

const proxyEvilUser = new PaymentAccessProxy(new PaymentAPI(),2)
console.log(proxyEvilUser.getPaymentDetail(1)) // console.log("Попытка получить данные платежа!")