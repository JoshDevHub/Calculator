// calculator object
const calculator = {
  currentValue: '',
  previousValue: '',
  operator: '',
  add() {
    return this.previousValue + this.currentValue;
  },
  subtract() {
    return this.previousValue - this.currentValue;
  },
  divide() {
    if (this.currentValue === 0) return 'Error! You cannot divide by zero!';
    return this.previousValue / this.currentValue;
  },
  multiply() {
    return this.previousValue * this.currentValue;
  },
  operate() {
    switch (this.operator) {
      case '+':
        this.currentValue = this.add();
        break;
      case '-':
        this.currentValue = this.subtract();
        break;
      case '/':
        this.currentValue = this.divide();
        break;
      case '*':
        this.currentValue = this.multiply();
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

// event handlers
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

