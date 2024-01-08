/**
 * Цепочка команд - это явный middleware в Redux
 * Т.е. если нужно выполнить какую то цепочку вызовов, чтоб можно было переиспользовать в любых комбинациях
 */

interface Middleware {
    next(mid:Middleware):Middleware
    handle(request:any):any
}

abstract class AbstractMiddleware implements Middleware {
    private nextMiddleware: Middleware | undefined
    next(mid: Middleware): Middleware {
        this.nextMiddleware = mid;
        return mid
    }
    handle(request: any) {
        if(this.nextMiddleware){
            return this.nextMiddleware.handle(request)
        }
        return
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any): any | undefined {
        console.log('AuthMiddleware')
        if(request.userId === 1){
            return super.handle(request);
        }
        return { error:"Вы не авторизованы" }
    }
}

class ValidateMiddleware extends AbstractMiddleware {
    override handle(request: any): any | undefined {
        console.log('ValidateMiddleware')
        if(request.body){
            return super.handle(request);
        }
        return { error:"Нет body" }
    }
}

class Controller extends AbstractMiddleware {
    override handle(request: any): any | undefined {
        console.log('Controller')
        return { success:request }
    }
}


const controller = new Controller()
const validate = new ValidateMiddleware()
const auth = new AuthMiddleware()

auth.next(validate).next(controller)
console.log(auth.handle({userId:1,body:'i am ok'}))