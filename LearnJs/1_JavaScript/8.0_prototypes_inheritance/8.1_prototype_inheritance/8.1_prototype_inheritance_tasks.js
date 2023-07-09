/**
 * [Главы 2, 4, 5, 8] Задача с собеса
 * Сложность 5/10 на собесе, обычная 3/10
 * Реализовать функционал, чтобы работало как ожидается
 *
 * [1,2,3].copy(2) // [1,2,3,1,2,3]
 * [4].copy(3) // [4,4,4]
 * [1,2,3].copy(1) // [1,2,3]
 * [1,2,3].copy(-1) // []
 * [1,2,3].copy(0) // []
 * [1,2,3].copy() // [1,2,3]
 */

{
    Array.prototype.copy = function(total){
        const copy = [...this]
        if(typeof total !== 'number') return copy;
        return total <= 0 ? [] : new Array(total).fill(copy).flat()
    };


    console.log([1,2,3].copy(2)); // [1,2,3,1,2,3]
    console.log([4].copy(3)); // [4,4,4]
    console.log([1,2,3].copy(1)); // [1,2,3]
    console.log([1,2,3].copy(-1)); // []
    console.log([1,2,3].copy(0)); // []
    console.log([1,2,3].copy()); // [1,2,3]
}

/**
 * Работа с прототипами
 * Какие значения показываются в процессе выполнения кода?
 */
{
    let animal = {
        jumps: null
    };
    let rabbit = {
        jumps: true,
        __proto__: animal,
    };

    alert( rabbit.jumps ); // true

    delete rabbit.jumps;

    alert( rabbit.jumps ); // null

    delete animal.jumps;

    alert( rabbit.jumps ); // undefined
}

/**
 * Алгоритм поиска
 *  С помощью свойства __proto__ задайте прототипы так, чтобы поиск любого свойства выполнялся по следующему пути: pockets → bed → table → head.
 *  Например, pockets.pen должно возвращать значение 3 (найденное в table), а bed.glasses – значение 1 (найденное в head).
 */

{
    let head = {
        glasses: 1
    };

    let table = {
        pen: 3,
        __proto__:head
    };

    let bed = {
        sheet: 1,
        pillow: 2,
        __proto__:table
    };

    let pockets = {
        money: 2000,
        __proto__:bed
    };
}

/**
 * Куда будет произведена запись? (в rabbit)
 * Объект rabbit наследует от объекта animal.
 * Какой объект получит свойство full при вызове rabbit.eat(): animal или rabbit?
 */
{
    let animal = {
        eat() {
            this.full = true;
        }
    };

    let rabbit = {
        __proto__: animal
    };

    rabbit.eat();
}

/**
 * Почему наедаются оба хомяка?
 * Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
 */
{
    let hamster = {
        stomach: [],

        eat(food) {
            this.stomach.push(food);
        }
    };

    let speedy = {
        // stomach: [],  // фикс для задачи
        __proto__: hamster
    };

    let lazy = {
        // stomach: [],  // фикс для задачи
        __proto__: hamster
    };

   // Этот хомяк нашёл еду
    speedy.eat("apple");
    alert( speedy.stomach ); // apple (Движок ищет stomach в speedy, но ничего не находит.Он идёт по цепочке прототипов и находит stomach в hamster и добавляет туда)

    // У этого хомяка тоже есть еда. Почему? Исправьте
    alert( lazy.stomach ); // apple
}