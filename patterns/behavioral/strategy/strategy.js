/**
 * Паттерн проектирования Стратегия позволяет выбирать алгоритм выполнения определенного действия в зависимости от ситуации.
 * Это позволяет легко заменять один алгоритм другим без изменения кода, а также изолировать алгоритмы от основной логики программы.
 */

// Создание стратегий
const strategy1 = {
    execute: () => {
        console.log('Выполняется стратегия 1');
    }
};

const strategy2 = {
    execute: () => {
        console.log('Выполняется стратегия 2');
    }
};

// Класс контекста
class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    executeStrategy() {
        this.strategy.execute();
    }
}

// Использование
const context = new Context(strategy1);
context.executeStrategy(); // Выводит: "Выполняется стратегия 1"
context.setStrategy(strategy2);
context.executeStrategy(); // Выводит: "Выполняется стратегия 2"
