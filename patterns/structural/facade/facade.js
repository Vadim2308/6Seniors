/**
 * Задача паттера скрыть сложную логику за "Фасадом"
 * Его задача объединить сложные структуру, и наружу отдавать понятный интерфейс взаимодействия.
 * Если в коде встречаются большие и сложные объекты, то его можно смело заворачивать в класс фасада
 */

class Conveyor {
	setBody() {
		console.log('Body set!');
	}
	getEngine() {
       console.log('Dismantle Engine!');
    }
	setEngine() {
		console.log('Engine set!');
	}
	setInterior() {
		console.log('Exterior added!');
	}
	changeInterior() {
		console.log('Update interior!');
	}
	setExterior() {
		console.log('Added interior!');
	}
	setWheels() {
		console.log('Wheels!');
	}
	addElectronics() {
		console.log('Added electronics!');
	}
	paint() {
		console.log('Car painted!');
	}
}

class ConveyorFacade {
	constructor(car) {
		this.car = car;
	}
	assembleCar() { // У нас есть один удобный метод, реализвация которого спратяна за фасадом
		this.car.setBody();
		this.car.setEngine();
		this.car.setInterior();
		this.car.setExterior();
		this.car.setWheels();
		this.car.addElectronics();
		this.car.paint();
		return this.car
	}
}

/**
 * Использование
 */
const conveyor = new ConveyorFacade(new Conveyor())
const car = conveyor.assembleCar()
/**
 * Body set!
 * Engine set!
 * Exterior added!
 * Added interior!
 * Wheels!
 * Added electronics!
 * Car painted!
 */
