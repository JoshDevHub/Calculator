// work on operator functions

const calculator = {
  add(augend, addend) {
    return augend + addend;
  },
  subtract(minuend, subtrahend) {
    return minuend - subtrahend;
  },
  divide(dividend, divisor) {
    if (divisor === 0) return 'Error! You cannot divide by zero!';
    return dividend / divisor;
  },
  multiply(multiplicand, multiplier) {
    return multiplicand * multiplier;
  },
  operate(operator, firstNumber, secondNumber) {
    switch (operator) {
      case '+':
        return this.add(firstNumber, secondNumber);
      case '-':
        return this.subtract(firstNumber, secondNumber);
      case '/':
        return this.divide(firstNumber, secondNumber);
      case '*':
        return this.multiply(firstNumber, secondNumber);
    }
  }
}

// document queries
const calculatorDisplay = document.querySelector('.calculator__display__value');
const numberKeys = document.querySelectorAll('.num__key');
const operatorKeys = document.querySelectorAll('.operator__key');
const equalsKey = document.querySelector('.equals__key');
const clearKey = document.querySelector('.clear__key');

const numberInput = [];
let operator = '';
let firstNumber;
let secondNumber;

const updateDisplay = (value) => {
  calculatorDisplay.textContent = value;
}

const convertInputToNumber = () => {
  return Number(numberInput.join(''));
}

const getUserNumbers = (event) => {
  let userInput = event.target.getAttribute('data-key');
  numberInput.push(userInput);
  const number = convertInputToNumber(numberInput);
  updateDisplay(number);
}

const clearNumberInput = () => {
  numberInput.length = 0;
}

const operatorClickHandler = (event) => {
  operator = event.target.getAttribute('data-key');
  firstNumber = convertInputToNumber();
  clearNumberInput();
}

const equalsClickHandler = () => {
  secondNumber = convertInputToNumber();
  const output = calculator.operate(operator, firstNumber, secondNumber);
  updateDisplay(output);
}

const clearClickHander = () => {
  numberInput.length = 0;
  operator = '';
  firstNumber = 0;
  secondNumber = 0;
  updateDisplay(0);
}

numberKeys.forEach(key => key.addEventListener('click', getUserNumbers));
operatorKeys.forEach(key => key.addEventListener('click', operatorClickHandler));
equalsKey.addEventListener('click', equalsClickHandler);
clearKey.addEventListener('click', clearClickHander);

/** Pseudo Code for Operation Chaining
 *  firstNumber clicked -> operator clicked -> secondNumber clicked
 *  if equals is clicked, display result.
 *    if equals is followed by a number input, dump the result and start a brand
 *    new operation.
 *    if equals is followed by an operator, use the result as the initial number
 *    in the following operation.
 *  if operator is clicked after num+operator+num, do the first operation and
 *  use its result as the initial value in the next operation.
 *
 */