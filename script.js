// calculator object
const calculator = {
  currentValue: '',
  previousValue: '',
  operator: '',
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
  operate() {
    switch (this.operator) {
      case '+':
        this.currentValue = this.add(this.currentValue, this.previousValue);
        break;
      case '-':
        this.currentValue = this.subtract(this.currentValue, this.previousValue);
        break;
      case '/':
        this.currentValue = this.divide(this.currentValue, this.previousValue);
        break;
      case '*':
        this.currentValue = this.multiply(this.currentValue, this.previousValue);
        break;
    }
  },
  clear() {
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
    this.updateDisplay();
  },
  equals() {
    this.operate();
    this.updateDisplay();
  },
  typeToCurrentValue(input) {
    this.currentValue += input;
    this.updateDisplay();
  },
  selectOperator(input) {
    this.operator = input;
    this.previousValue = this.currentValue;
    this.currentValue = '';
  },
  updateDisplay() {
    calculatorDisplay.textContent = this.currentValue;
  },
}

// document queries
const calculatorDisplay = document.querySelector('.calculator__display__value');
const numberKeys = document.querySelectorAll('.num__key');
const operatorKeys = document.querySelectorAll('.operator__key');
const equalsKey = document.querySelector('.equals__key');
const clearKey = document.querySelector('.clear__key');

const numKeyClickHandler = (event) => {
  const userInput = event.target.getAttribute('data-key');
  calculator.typeToCurrentValue(userInput);
  calculator.updateDisplay();
}

const clearKeyHandler = () => {
  calculator.clear();
}

const operatorClickHandler = (event) => {
  const userInput = event.target.getAttribute('data-key');
  calculator.selectOperator(userInput);
}

const equalsClickHandler = () => {
  calculator.equals();
}

numberKeys.forEach(key => key.addEventListener('click', numKeyClickHandler));
operatorKeys.forEach(key => key.addEventListener('click', operatorClickHandler));
equalsKey.addEventListener('click', equalsClickHandler);
clearKey.addEventListener('click', clearKeyHandler);

