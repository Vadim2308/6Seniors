/**
 * Билдер, или строитель, (англ. builder) позволяет создавать объекты, добавляя им свойства по заданным правилам.
 * Он полезен, когда при создании объекта нужно выполнить много шагов, часть из которых могут быть необязательными.
 * Отделяет конструирование сложного объекта от его представления, так что в результате одного и того же процесса конструирования могут получаться разные представления.
 * Например, конфигурация вебпака: https://habr.com/ru/companies/domclick/articles/779586/
 */
{
	class Car {
		constructor() {
			this.autoPilot = false;
			this.parktronic = false;
			this.signaling = false;
		}
	}

	class CarBuilder {
		#car
		constructor() {
			this.#car = new Car(); // Инициализируем car
		}
		addAutoPilot(autoPilot) {
			this.#car.autoPilot = autoPilot;
			return this; // Важно для чейна
		}
		addParktronic(parktronic) {
			this.#car.parktronic = parktronic;
			return this;
		}

		addSignaling(signaling) {
			this.#car.signaling = signaling;
			return this;
		}
		updateEngine(engine) {
			this.#car.engine = engine;
			return this;
		}
		build() {
			return this.#car; // Возвращает наш укомплектованный автомобиль
		}
	}

	const myCar = new CarBuilder().addAutoPilot(true).addParktronic(true).updateEngine('V8')
	console.log(myCar)
}

{
	// Пример с вебпаком
	const builder = new DevelopmentBuilder('localhost', 8282);
	const webpackConfig = builder
		.addLoader(tsLoader)
		.addLoader(svgLoader)
		.addLoader(cssLoader)
		.addLoader(scssModuleLoader)
		.addLoader(scssLoader)
		.addLoader(assets)
		.addPlugin(reactRefreshPlugin)
		.addPlugin(forkTsCheckerPlugin)
		.addPlugin(htmlWebpackPlugin)
		.addPlugin(bundleAnalyzerPlugin)
		.build();
}