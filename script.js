// work on operator functions
const add = (firstNumSum, secondNumSum) => firstNumSum + secondNumSum;
const subtract = (firstNumSub, secondNumSub) => firstNumSub - secondNumSub;
const divide = (dividend, divisor) => {
  if (divisor === 0) return 'Error! You cannot divide by zero!';
  return dividend / divisor;
}
const multiply = (multiplicand, multiplier) => multiplicand * multiplier;

// console tests
console.log(add(5, 5));
console.log(subtract(5, 5));
console.log(divide(5, 0));
console.log(multiply(5, 5));