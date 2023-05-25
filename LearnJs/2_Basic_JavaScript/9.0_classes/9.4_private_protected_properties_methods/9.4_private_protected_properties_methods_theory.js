/**
 * В JavaScript есть два типа полей (свойств и методов) объекта:
 *   Публичные: доступны отовсюду. Они составляют внешний интерфейс.
 *   Приватные: доступны только внутри класса. Они для внутреннего интерфейса.
 */

/**
 * Защищённое свойство «waterAmount» (protected)
 * Защищённые свойства обычно начинаются с префикса _. это переменная, предназначенная для использования внутри объекта(класса), внутри которого она объявлена. Её всё равно можно вызвать извне, написав object._name. Its a bad practise))
 * Это не синтаксис языка: это соглашение между программистами. Это просто сигнал, что использовать это надо только внутри класса. но не снаружи
 * Для полной защиты юзаем #
 */
{
    class CoffeeMachine {
        _waterAmount = 0;

        constructor(power) {
            this._power = power;
        }

        set waterAmount(value) {
            if (value < 0) throw new Error("Отрицательное количество воды");
            this._waterAmount = value;
        }

        get waterAmount() {
            return this._waterAmount;
        }

    }
    // создаём новую кофеварку
    let coffeeMachine = new CoffeeMachine(100);



    // устанавливаем количество воды
    coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды
}

/**
 * Свойство только для чтения «power»
 */
{
    class CoffeeMachine {
        constructor(power) {
            this._power = power;
        }

        get power() {
            return this._power;
        }

    }

    let coffeeMachine = new CoffeeMachine(100);

    alert(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W

    coffeeMachine.power = 25; // Error (no setter)

}
/**
 * Защищённые поля наследуются
 */
{
    class CoffeeMachine {
        _waterAmount = 0;

        setWaterAmount(value) {
            if (value < 0) throw new Error('Отрицательное количество воды')
            this._waterAmount = value;
        }

        getWaterAmount() {
            console.log(this._waterAmount);
        }
    }

    const coffeeMachine = new CoffeeMachine();

    class Coffee extends CoffeeMachine {}
    const coffee = new Coffee();
    coffee.getWaterAmount();                      // Output: 0

}

/**
 * Приватное свойство
 * В терминах ООП отделение внутреннего интерфейса от внешнего называется инкапсуляция.
 * Эта возможность была добавлена в язык недавно
 * Приватные свойства и методы должны начинаться с #. Они доступны только внутри класса.
 *
 * Приватные поля не конфликтуют с публичынми. У нас могут быть два поля одновременно – приватное #count и публичное count.
 */
{
    class IncreasingCounter {
        #count = 0;
        count = 5; // Конфликта нет
        get value() {
            console.log('Getting the current value!');
            // this['#count'] => Error. Только через '.'
            return this.#count;
        }
        increment() {
            this.#count++;
        }
    }


    // снаружи нет доступа к приватным методам класса
    IncreasingCounter.#count // → SyntaxError

    const counter = new IncreasingCounter();



    // Наследники не имеют доступа к приватным полям родителя
    // Также не сработает this['#name']
    class MegaIncreasingCounter extends IncreasingCounter {
        method() {
            alert( this.#count ); // Error: can only access from IncreasingCounter
        }
    }
}