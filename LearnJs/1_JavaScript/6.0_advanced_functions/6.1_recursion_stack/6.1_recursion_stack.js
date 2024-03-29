/**
 * Рекурсия - это поведение функции, при котором она вызывает сама себя.
 * Рекурсии не так эффективны по скорости, но более читаемы.
 * Любая рекурсия может быть переделана в цикл. Как правило, вариант с циклом будет эффективнее.
 * Часто код с использованием рекурсии более короткий, лёгкий для понимания и поддержки.
 * Оптимизация требуется не везде, как правило, нам важен хороший код, поэтому она и используется.
 */

{
    /**
     * Реализация с помощью цикла
     */
    const pow = (num,pow) => {
        let res = 1
        while(pow > 0){
            res *= num
            pow--
        }
        return res
    }
    console.log(pow(5,4)) //625

    /**
     * Реализация с помощью рекурсии
     */
    const recursionPow = (num,pow) => {
        if(pow === 1) return num * pow; // база рекурсии
        return num * recursionPow(num, pow - 1) // шаг рекурсии
    }

}

/**
 * Общее количество вложенных вызовов (включая первый) называют глубиной рекурсии.
 * Максимальная глубина рекурсии ограничена движком JavaScript. (Глубина рекурсии равна максимальному числу контекстов, одновременно хранимых в стеке.)
 * Точно можно рассчитывать на 10000 вложенных вызовов
 */

// ВАЖНО: необходимо учитывать объем стека в рекурсии. Для проверки удобно пользоваться конструкцией try...catch
    let size = 0;
    const addToStack = function () {
        size++
        addToStack();
    }
    try {
        addToStack();
    } catch (e) {
        console.log(e) // Maximum call stack size exceeded
        console.log(`Stack size === ${i}`);     // Output: 'Stack size === 13928'
    }

/**
 * Контекст выполнения, стек
 * Информация о процессе выполнения запущенной функции хранится в её контексте выполнения (execution context).
 * Контекст выполнения – специальная внутренняя структура данных, которая содержит информацию о вызове функции.
 * Она включает в себя конкретное место в коде, на котором находится интерпретатор, локальные переменные функции, значение this и прочую служебную информацию.
 *  Когда функция производит вложенный вызов:
 *   1. Выполнения текущей функции приостанавливается
 *   2. Контекст выполнения текущей запоминается в стеке контекстов выполнения.
 *   3. Выполняются вложенные вызовы, для каждого создается новый контекст выполнения
 *   4. После завершения старый контекст достаётся из стека, и выполнение внешней функции возобновляется с того места, где она была остановлена.
 */

/**
 * Связанный список структура данных, в которой каждый элeмент содержит ссылку на соседний элемент
 * С ним удобнее работать при удалении, добавлении изменении первых элементов (эффективнее чем shift, unshift)
 * В массиве при использовании shift, unshift происходит переиндексация элементов
 *
 * Главным недостатком является то, что мы не можем легко получить доступ к элементу по его индексу.
 * В простом массиве: arr[n] является прямой ссылкой.
 * Но в списке мы должны начать с первого элемента и перейти в next N раз, чтобы получить N-й элемент.
 */

{
    let list = { // Пример LinkedList
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

    const arr = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    arr.shift();
    console.log(arr[0].a); // Output: 2 => При большом массиве операция дорогая

    /**
     * Пример добавления в начало LinkedList
     */
    list = { value: "new item", next: list };
    /**
     * Пример удаления первого элемента
     */
    list = list.next
    /**
     * Удаление из середины
     */
    list.next = list.next.next; // list.next = list.next.next;
}