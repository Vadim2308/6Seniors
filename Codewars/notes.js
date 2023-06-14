/**
 * Создание массива определенной длинны
 * n = 5; => [1,2,3,4,5]
 */
{
    // Самый примитивный способ через цикл for()
    // Через Array.from
    const seq = n => Array.from({ length:n },(_,i) => i + 1) // n - i - для реверса
}