function sum(arg) {
    if (arg === undefined) {
        return 0
    }
    const calculate = (num) => {
        if(num === undefined) return calculate.result;
        calculate.result += num
        return calculate
    }
    calculate.result = arg
    return calculate
}

console.log(sum()) //0
console.log(sum(1)()) //1
console.log(sum(2)(2)()) //4