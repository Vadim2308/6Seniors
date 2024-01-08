/**
 * Ярким примером паттерна является Redux
 *  Паттерн КОМАНДА — это поведенческий паттерн проектирования, который превращает запросы в объекты, позволяя передавать
 *  их как аргументы при вызове методов, ставить запросы в очередь, логировать их, а также поддерживать отмену операций.
 *  Позволяет реализовать простую отмену и повтор операций.
 *  Позволяет реализовать отложенный запуск операций.
 *  Позволяет собирать сложные команды из простых.
 *  Реализует принцип открытости/закрытости.
 */

class MyMath {
    constructor(initialValue = 0) {
        this.num = initialValue
    }

    square(){
        return this.num ** 2
    }

    cube(){
        return this.num ** 3
    }
}

class Command {
    constructor(subject) {
        this.subject = subject;
        this.commandsExecuted = []
    }

    execute(command){
        this.commandsExecuted.push(command)
        return this.subject[command]()
    }
}

const x = new Command(new MyMath(2))
console.log(x.execute('square'))
console.log(x.execute('cube'))
console.log(x.commandsExecuted) // Массив тех комманд, которые были вызваны