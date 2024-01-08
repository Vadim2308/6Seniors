/**
 *  Паттерн Состояние управляет изменением поведения объекта при изменении его внутреннего состояния.
 *  Основная идея в том, что программа может находиться в одном из нескольких состояний, которые всё время сменяют друг
 *  друга. Набор этих состояний, а также переходов между ними, предопределён и конечен. Находясь в разных состояниях,
 *  программа может по-разному реагировать на одни и те же события, которые происходят с ней.
 */

class Light {
    constructor(light) {
        this.light = light
    }
}

class RedLight extends Light {
    constructor() {
        super('red')
    }

    sign() {
        return 'СТОП'
    }
}

class YellowLight extends Light {
    constructor() {
        super('yellow')
    }

    sign() {
        return 'ГОТОВЬСЯ'
    }
}

class GreenLight extends Light {
    constructor() {
        super('green')
    }

    sign() {
        return 'ЕДЬ!'
    }
}

class TrafficLight {
    constructor() {
        this.states = [
            new RedLight(),
            new YellowLight(),
            new GreenLight()
        ]
        this.current = this.states[0]
    }

    change() {
        const total = this.states.length
        let index = this.states.findIndex(light => light === this.current)

        if (index + 1 < total) {
            this.current = this.states[index + 1]
        } else {
            this.current = this.states[0]
        }
    }

    sign() {
        return this.current.sign()
    }
}

const traffic = new TrafficLight()
console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()