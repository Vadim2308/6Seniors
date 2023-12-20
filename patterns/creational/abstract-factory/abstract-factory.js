/**
 * Шаблон проектирования Abstract Factory используется в случаях когда нужно добавить дополнительный слой абстракции над паттерном Factory.
 */

// Допустим есть следующие реализации классов разным моделей автомобилей
class BMW_1_Series {}
class BMW_M_Series {}

// А также, пусть существуют фабрики для этих классов:
function bmwFamilyFactory() {
	return new BMW_1_Series()
}
function bmwSportFactory() {
	return new BMW_M_Series()
}

// Пример реализации функции абстрактной фабрики:
// Abstract Factory
function bmwProducer(type) {
	switch (type) {
		case 'sport': return bmwSportFactory;
		case 'family': return bmwFamilyFactory;
		default: return null;
	}
}

/**
 * Теперь, чтобы использовать абстрактную фабрику нужно сначала инициализировать фабрику нужного типа, а затем создать экземпляр возвращаемого ей класса:
 */

// Abstract Factory
const produceSport = bmwProducer('sport');
const sportCar = produceSport();

const produceFamily = bmwProducer('family');
const familyCar = produceFamily();

//====================================================//

/**
 * Деревянные двери следует покупать в магазине деревянных дверей, железные – в магазине железных, а двери из ПВХ – в специализированном ПВХ-магазине.
 * Также требуется эксперт по установке: плотник, сварщик или специальный установщик дверей из ПВХ.
 * Абстрактная фабрика – это интерфейс, который группирует другие фабрики, логически связанные друг с другом.
 */
{
	// У нас есть несколько дверей:
	class WoodenDoor {
		getDescription() {
			console.log('I am a wooden door')
		}
	}

	class IronDoor {
		getDescription() {
			console.log('I am an iron door')
		}
	}

	// и узкие специалисты-установщики:
	class Welder {
		getDescription() {
			console.log('I can only fit iron doors')
		}
	}

	class Carpenter {
		getDescription() {
			console.log('I can only fit wooden doors')
		}
	}

	// Нужно все сгруппировать. Деревянные двери – с плотником, железные – со сварщиком.
	// Деревянная фабрика возвращает плотника и деревянную дверь
	class WoodenDoorFactory {
		makeDoor(){
			return new WoodenDoor()
		}

		makeFittingExpert() {
			return new Carpenter()
		}
	}
	// Железная фабрика возвращает сварщика и железную дверь
	class IronDoorFactory {
		makeDoor(){
			return new IronDoor()
		}
		makeFittingExpert() {
			return new Welder()
		}
	}
	const abstractFactory = (type) => {
		switch (type){
			case 'wood':
				return new WoodenDoorFactory()
			case 'iron':
				return new IronDoorFactory()
		}
	}
	{
		// И допустим, у нас откуда-то извне пришла переменная, что нужна именно деревянная дверь
		const type = 'iron'
		let factory = abstractFactory(type)
		const door = factory.makeDoor()
		const expert = factory.makeFittingExpert()
		door.getDescription()
		expert.getDescription()

	}
	// Паттерн полезен, когда есть несколько классов, зависящих друг от друга.
}