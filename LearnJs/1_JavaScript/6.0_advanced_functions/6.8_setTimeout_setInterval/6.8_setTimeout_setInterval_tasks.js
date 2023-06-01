/**
 * Task 1
 * Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.
 * Сделайте два варианта решения.
 *     - Используя setInterval.
 *     - Используя рекурсивный setTimeout.
 */

{
    // v1
    function printNumbers (from, to) {
       let id = null;
       let current = from;
       id = setInterval(()=>{
           if(current > to){
               clearInterval(id)
               return
           }
           console.log(current++)
       },1000)
    }
    printNumbers()

    // v2
    {
        function printNumbers (from, to) {
            let id = null;
            let current = from;
            id = setTimeout(function tick(){
                if(current > to){
                    clearTimeout(id)
                    return
                }
                id = setTimeout(tick,1000)
                console.log(current++)
            },1000)
        }
        printNumbers(1,5)
    }
}

/**
 * Task 2
 * В приведённом ниже коде запланирован вызов setTimeout, а затем выполняется сложное вычисление, для завершения которого требуется более 100 мс.
 * Когда будет выполнена запланированная функция? (После цикла, т.к. это макротаска, выполняется после всего синхронного кода)
 * Что покажет console.log?
 */

{
    let i = 0;

    setTimeout(() => alert(i), 100); // ?

    // предположим, что время выполнения этой функции >100 мс
    for(let j = 0; j < 100000000; j++) {
        i++;
    }
}