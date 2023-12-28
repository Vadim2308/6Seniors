/**
 * Паттерн мост позволяет решить, если нужно построить что0то подобие такого микросервиса
 *
 *                               Уведомления
 *                 Провайдер                         Тип
 *            Telegram   WhatsUp             Отложенные  Мгновенные
 */


interface IProvider {
    sendMessage(message:string):void
    connect(config:unknown):void
    disconnect():void
}

class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message)
    }
    connect(config: string): void {
        console.log(config)
    }
    disconnect(): void {
        console.log('disconnected Telegram')
    }
}

class WhatsUpProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message)
    }
    connect(config: string): void {
        console.log(config)
    }
    disconnect(): void {
        console.log('disconnected WhatsUp')
    }
}

class NotificationSender {
    constructor(private provider:IProvider) {}
    send(){
        this.provider.connect('connect')
        this.provider.sendMessage('message')
        this.provider.disconnect()
    }
}

class DelayNotificationSender extends NotificationSender {
    constructor(provider:IProvider) {
        super(provider)
    }
    sendDelayed(){
        setTimeout(()=>{
            console.log('sendDelayed')
        },1000)
    }
}

const sender = new NotificationSender(new TelegramProvider())
sender.send()
const sender2 = new NotificationSender(new WhatsUpProvider())
sender2.send()