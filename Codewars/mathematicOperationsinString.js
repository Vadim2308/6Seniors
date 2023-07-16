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
        const replaced = str.replace(/plus/g,'+').replace(/minus/g,'-');
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

// 3
{
    const calculate = (data) => {
        const replaced = data.replace(/plus/ig,"+").replace(/minus/ig,'-').replace(/\s/ig, '')
        let result = 0

        for(let i = 0; i < replaced.length; i++){
            if(replaced[i] === '+')continue;
            if(replaced[i] === '-'){
                result-=replaced[i+1]
                i++
                continue;
            }
            result+=Number(replaced[i])
        }

        return result;
    }

    calculate("1 minus 2 minus 3")
}

//v3
{
    const mapped = {
        'plus':'+',
        'minus':'-'
    }
    function calculate(str, conditions) {
        return Object.entries(conditions).reduce(
            (result, [key, value]) => result.replace(new RegExp(key, 'g'), value),
            str
        );
    }

    const str = "1plus2plus3minus4plus8"
    console.log(calculate(str,mapped))
}