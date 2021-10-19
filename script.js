// work on operator functions
const add = (firstNumSum, secondNumSum) => firstNumSum + secondNumSum;
const subtract = (firstNumSub, secondNumSub) => firstNumSub - secondNumSub;
const divide = (dividend, divisor) => {
  if (divisor === 0) return 'Error! You cannot divide by zero!';
  return dividend / divisor;
};
const multiply = (multiplicand, multiplier) => multiplicand * multiplier;

const operate = (operator, firstNum, secondNum) => {
  return operator(firstNum, secondNum);
};

// console tests
console.log(operate(add, 5, 5));
console.log(operate(subtract, 5, 5));
console.log(operate(divide, 5, 0));
console.log(operate(multiply, 5, 5));