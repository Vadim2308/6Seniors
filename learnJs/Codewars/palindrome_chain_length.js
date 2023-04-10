/**
 * https://www.codewars.com/kata/525f039017c7cd0e1a000a26
 * Найти длину цепи палиндрома
 *  87 +   78 =  165     - step 1, not a palindrome
 *  165 +  561 =  726     - step 2, not a palindrome
 *  726 +  627 = 1353     - step 3, not a palindrome
 * 1353 + 3531 = 4884     - step 4, palindrome!
 */
const reverseNum = (n) => n.toString().split('').reverse().join('');
function isPalindrome(n) {
    return n.toString() === reverseNum(n);
}
/**
 * Вариант 1
 */
{
    function palindromeSteps(n, steps = 0) {
      if (!isPalindrome(n)) {
        return palindromeSteps(+n + +reverseNum(n), ++steps);
      } else {
        return steps;
      }
    }
    console.log(palindromeSteps(87));
}
/**
 * Вариант 2
 */
{
    function palindromeSteps(n) {
        let steps = 0;
        while (!isPalindrome(n)) {
            n += +reverseNum(n);
            steps++;
        }
        return steps;
    }

    console.log(palindromeSteps(87));
}