/**
 * Фабричный метод (англ. Factory Method) — порождающий шаблон проектирования, предоставляющий подклассам (дочерним классам, субклассам) интерфейс для создания экземпляров некоторого класса.
 * В момент создания наследники могут определить, какой класс создавать. Иными словами, данный шаблон делегирует создание объектов наследникам родительского класса.
 */

// https://doka.guide/js/design-patterns-creational/

class Bmw {
	constructor(model, price, maxSpeed) {
		this.model = model;
		this.price = price;
		this.maxSpeed = maxSpeed;
	}
}

class BmwFactory {
	create(type) {
		if (type === 'X5')
			return new Bmw(type, 108000, 300);
		if (type === 'X6')
			return new Bmw(type, 111000, 320);
	}
}

const bmwFactory = new BmwFactory()

const x5 = bmwFactory.create('X5')
const x6 = bmwFactory.create('X6')