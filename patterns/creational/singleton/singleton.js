/**
 * Одиночка (англ. Singleton) — порождающий шаблон проектирования, гарантирующий, что в приложении будет единственный
 * экземпляр некоторого класса, и предоставляющий глобальную точку доступа к этому экземпляру
 */

class Counter {
	constructor() {
		if (typeof Counter.instance === 'object') {
			return Counter.instance;
		}
		this.count = 0;
		Counter.instance = this;
		return this;
	}
	getCount() {
		return this.count;
	}
	increaseCount() {
		return this.count++;
	}
}

class Singleton {
	#instance = null; // Объявляем приватное свойство.
	constructor() {
		if (Singleton.#instance) { // проверяем что значение #instance не равно null (т.е. уже что-то присвоено), и прерываем инструкцию, чтобы в соответствии с принципом синглтон сохранить значения присвоенные при первой инициации.
			return Singleton.#instance;
		}
		Singleton.#instance = this;
	}
	publicMethod() { // Публичный метод с примером дефолтного значения аргумента.
		console.log('publicMethod');
	}
}

let first = new Singleton('first');
Singleton.instance = 0; // Попытка внести изменения в приватное свойство не сработает, оно инкапсулировано.
let second = new Singleton('second');
let third = new Singleton('3');

console.log(first === third);