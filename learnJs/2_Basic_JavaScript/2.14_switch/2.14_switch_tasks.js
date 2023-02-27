/**
 * Задача 1
 * Напишите "if", аналогичный "switch". Напишите if..else, соответствующий следующему switch:
 */
const browser = 'Firefox'
{
    switch (browser) {
        case 'Edge':
            console.log( "You've got the Edge!" );
            break;

        case 'Chrome':
        case 'Firefox':
        case 'Safari':
        case 'Opera':
            console.log( 'Okay we support these browsers too' );
            break;

        default:
            console.log( 'We hope that this page looks ok!' );
    }
}
// Решение
if(browser === 'Edge'){
    console.log( "You've got the Edge!" );
} else if(browser === 'Chrome' || browser ==='Firefox' || browser === 'Safari' || browser === 'Opera'){
    console.log( 'Okay we support these browsers too' );
} else {
    console.log( 'We hope that this page looks ok!' );
}

/**
 * Задача 2
 * Переписать условия "if" на "switch"
 * Перепишите код с использованием одной конструкции switch:
 */
const number = +prompt('Введите число между 0 и 3', '');
if (number === 0) {
    console.log('Вы ввели число 0');
}
if (number === 1) {
    console.log('Вы ввели число 1');
}
if (number === 2 || number === 3) {
    console.log('Вы ввели число 2, а может и 3');
}

{
    const number = +prompt('Введите число между 0 и 3', '');
    switch (number){
        case 0:
            console.log('Вы ввели число 0');
            break
        case 1:
            console.log('Вы ввели число 1');
            break
        case 2:
        case 3:
            console.log('Вы ввели число 1');
            break

    }
}