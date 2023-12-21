/**
 *
 * ПАТТЕРН ДЕКОРАТОР (обертка)
 * Позволяет наделить обьект новыми возможностями не меняя первоначальный класс
 * Принцип работы: декоратор помещает целевой обьект в обьект обертку, кот-й запускает базовое поведение обьекта,
 * а затем добавляет/отнимает что-то свое.
 *
 */

class Car {
	constructor() {
		this.price = 10000;
		this.model = 'Car'
	}

	getPrice() {
		return this.price;
	}
	getDescription() {
		return this.model
	}
}

class Tesla extends Car {
	constructor() {
		super();
		this.price = 25000;
		this.model = 'Tesla';
	}
}

class Autopilot {
	constructor(car) {
		this.car = car;
}
	getPrice() {
		return this.car.getPrice() + 5000;
	}
	getDescription() {
		return `${this.car.getDescription()} with autopilot`;
	}
}

class Parktronic {
	constructor(car) {
		this.car = car;
	}

	getPrice() {
		return this.car.getPrice() + 3000;
	}
	getDescription() {
		return `${this.car.getDescription()} with parktronic`;
	}
}

/**
 * Использование
 */
let tesla = new Tesla()
tesla = new Autopilot(tesla)
tesla = new Parktronic(tesla)

console.log({price:tesla.getPrice(),description:tesla.getDescription()}) // {price: 33000, description: "Tesla with autopilot with parktronic"}