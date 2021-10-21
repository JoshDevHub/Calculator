// calculator object
const calculator = {
  currentValue: '',
  previousValue: '',
  operator: '',

  /**
   * bool to check if equals key has just been pressed, which allows for resetting
   * everything if the user goes to pressing number keys after equals key.
   */
  equalToggle: false,
  add() {
    return Number(this.previousValue) + Number(this.currentValue);
  },
  subtract() {
    return Number(this.previousValue) - Number(this.currentValue);
  },
  divide() {
    if (Number(this.currentValue) === 0) {
      return 'Error! You cannot divide by zero!';
    }
    return Number(this.previousValue) / Number(this.currentValue);
  },
  multiply() {
    return Number(this.previousValue) * Number(this.currentValue);
  },
  operate() {
    let result;
    switch (this.operator) {
      case '+':
        result = this.add();
        break;
      case '-':
        result = this.subtract();
        break;
      case '/':
        result = this.divide();
        break;
      case '*':
        result = this.multiply();
        break;
    }
    this.currentValue = result.toString();
  },
  clear() {
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
    this.equalToggle = false;
    this.updateDisplay();
  },
  equals() {
    this.operate();
    this.operator = '';
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
};

// document queries
const calculatorDisplay = document.querySelector('.calculator__display__value');
const numberKeys = document.querySelectorAll('.num__key');
const operatorKeys = document.querySelectorAll('.operator__key');
const equalsKey = document.querySelector('.equals__key');
const clearKey = document.querySelector('.clear__key');

// event handlers
const numKeyClickHandler = (event) => {
  if (calculator.equalToggle) calculator.clear();
  const userInput = event.target.getAttribute('data-key');
  calculator.typeToCurrentValue(userInput);
  calculator.updateDisplay();
};

const operatorClickHandler = (event) => {
  calculator.equalToggle = false;
  if (!calculator.operator) {
    const userInput = event.target.getAttribute('data-key');
    calculator.selectOperator(userInput);
  } else {
    calculator.operate();
    calculator.updateDisplay();
    const userInput = event.target.getAttribute('data-key');
    calculator.selectOperator(userInput);
  }
};

const equalsClickHandler = () => {
  calculator.equals();
  calculator.equalToggle = true;
};

numberKeys.forEach((key) => key.addEventListener('click', numKeyClickHandler));
operatorKeys.forEach((key) =>
  key.addEventListener('click', operatorClickHandler)
);
equalsKey.addEventListener('click', equalsClickHandler);
clearKey.addEventListener('click', () => calculator.clear());
