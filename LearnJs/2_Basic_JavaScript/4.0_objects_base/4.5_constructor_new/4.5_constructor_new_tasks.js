/**
 * Две функции - один объект
 * Возможно ли создать функции A и B, чтобы new A() == new B()?
 */
{
    function A() {
        this.key = 'A';
    }
    function B() {
        this.key = 'B';
    }

    let a = new A();
    let b = new B();

    console.log(a === b); // true
}
{
    // Решение
    let obj = {};
    function A() { return obj; }
    function B() { return obj; }
    alert( new A() === new B() ); // true, т.е. если функция конструктор имеет return и вовращает не примитив, то она вернет нужный объект.
}

/**
 * Создайте калькулятор при помощи конструктора, new Calculator
 * Создайте функцию-конструктор Calculator, которая создаёт объекты с тремя методами:
 * read() запрашивает два значения при помощи prompt и сохраняет их значение в свойствах объекта.
 * sum() возвращает сумму этих свойств.
 * mul() возвращает произведение этих свойств.
 */
{
    // Решение
    function Calculator() {
        this.read = function () {
            this.a = +prompt('a?',"0")
            this.b = +prompt('b?',"0")
        }
        this.sum = () => {
            return this.a + this.b
        }
        this.mul = () => {
            return this.a * this.b
        }
    }
    let calculator = new Calculator();
    calculator.read();
    alert("Sum=" + calculator.sum());
    alert("Mul=" + calculator.mul());
}

/**
 * Создайте new Accumulator
 * Создайте функцию-конструктор Accumulator(startingValue).
 *
 * Объект, который она создаёт, должен уметь следующее:
 * Хранить «текущее значение» в свойстве value. Начальное значение устанавливается в аргументе конструктора startingValue.
 * Метод read() должен использовать prompt для считывания нового числа и прибавления его к value.
 * Другими словами, свойство value представляет собой сумму всех введённых пользователем значений, с учётом начального значения startingValue.
 *
 * Ниже вы можете посмотреть работу кода:
 */
{
    let accumulator = new Accumulator(1); // начальное значение 1
    accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
    accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
    alert(accumulator.value); // выведет сумму этих значений
}
{
    // Решение
    function Accumulator(initValue) {
        this.value = initValue;
        this.read = function(){
            const userValue = +prompt('Введите значение',"0");
            this.value += userValue
        }
    }
}