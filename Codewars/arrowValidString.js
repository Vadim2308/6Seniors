const isValidString = (str) => {
    let count = 0;

    const MAPPED_BRACKETS = {
        LEFT: '(',
        RIGHT: ')',
    };

    for (let char of str) {
        if (char === MAPPED_BRACKETS.LEFT) {
            count++;
        }
        if (char === MAPPED_BRACKETS.RIGHT) {
            count--;
            if (count < 0) return false;
        }
    }

    return !count;
};

console.log(isValidString('xsaxsasx')); // true
console.log(isValidString('(js)(grill())()')); // true
console.log(isValidString('(()))()((()))()')); // false
console.log(isValidString('()(())()(())()')); // true
console.log(isValidString(')(')); // false