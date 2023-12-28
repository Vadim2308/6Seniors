/**
 * Паттерн, который позволяет скрыть внутреннюю реализацию за простым API
 *
 *                                             Отправить уведомление ?
 *                             Notification            Logs                Template
 */

class Notify {
    send(template:string,to:string){
        console.log(`Направляю ${template} ${to}`)
    }
}
class Log {
    log(message:string){
        console.log(message)
    }
}

class Template {
    private template = [{name:"email",template:'<h1>Шаблон email</h1>'}]

    getByName(name:string){
        // @ts-ignore
        return this.template.find(t=>t.name === name)
    }
}

class NotificationFacade {
    private notify:Notify
    private logger:Log
    private template:Template

    constructor() {
        this.notify = new Notify()
        this.logger = new Log()
        this.template = new Template()
    }
    send(to:string,template:string){
        const data = this.template.getByName(template)
        if(!data){
            this.logger.log('Не найден шаблон')
            return;
        }
        this.notify.send(data.template,to)
        this.logger.log('Шаблон отправлен')
    }
}

const s = new NotificationFacade()
s.send('a@mail.com','email')
