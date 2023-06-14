/**
 * Простая математика
 *
 * Вам дана строка, содержащая цифры и математические операторы (plus и minus).
 * Вам нужно произвести математические операции и вернуть результат.
 *
 * Примеры:
 *  "1plus2plus3plus4"  --> "10"
 *  "1plus2plus3minus4" -->  "2"
 */
const str = "1plus2plus3minus4"
// 1
{
    function calculate(str){
        const replaced = str.replace(/plus/g,'+').replace(/plus/g,'-');
        return String(eval(replaced))
    }
}

//2
{
    function calculate(str) {
        let result = '';
        result = str.split('plus') // [ '1', '2', '3minus4' ]
            .join(' ') //  1 2 3minus4
            .split('minus').join(' -') // 1 2 3 -4
            .split(' ') // [ '1', '2', '3', '-4' ]
            .reduce((a, c) => +a + +c)
        return String(result);
    }
}