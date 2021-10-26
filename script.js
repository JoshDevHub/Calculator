// calculator object
const calculator = {
  currentValue: '',
  previousValue: '',
  operator: '',
  maxDisplayDigits: 12,

  /**
   * bools to check if equals or operator has just been pressed, which allows 
   * calculator state to be reset if a number is keyed after equals, and allows 
   * operator keys to be disabled after user chooses an operator.
   */
  equalToggle: false,
  operatorToggle: false,
  add() {
    return Number(this.previousValue) + Number(this.currentValue);
  },
  subtract() {
    return Number(this.previousValue) - Number(this.currentValue);
  },
  divide() {
    if (Number(this.currentValue) === 0) {
      return 'Error!';
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
    // Probably refactor this. Difficult to tell what it's for (checking divide by zero);
    if (result === 'Error!') {
      this.currentValue = result;
    } else {
      const correctedResult = parseFloat(
        result.toPrecision(this.maxDisplayDigits)
      );
      this.currentValue = correctedResult.toString();
    }
  },
  clear() {
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
    this.equalToggle = false;
    this.operatorToggle = false;
    this.toggleOperatorButtons();
    this.updateDisplay();
  },
  equals() {
    // Prevent equals being pressed repeatedly.
    if (!this.currentValue || !this.previousValue) return;
    this.operate();
    this.operator = '';
    this.updateDisplay();
    this.previousValue = '';
    this.equalToggle = true;
    this.operatorToggle = false;
    this.toggleOperatorButtons();
  },
  typeToCurrentValue(input) {
    // Prevents user from keying in '0' as first part of input.
    if (input === '0' && !this.currentValue) return;
    // Prevents user from entering multiple decimals
    if (input === '.' && this.currentValue.includes('.')) return;
    this.currentValue += input;
    this.updateDisplay();
  },
  selectOperator(input) {
    this.operator = input;
    this.previousValue = this.currentValue;
    this.currentValue = '';
  },
  updateDisplay() {
    // prevent display text from overflowing
    if (this.currentValue.length > this.maxDisplayDigits) {
      calculatorDisplay.textContent = this.currentValue.slice(
        -this.maxDisplayDigits
      );
    } else {
      calculatorDisplay.textContent = this.currentValue;
    }
  },
  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
    this.updateDisplay();
  },
  toggleOperatorButtons() {
    if (this.operatorToggle) {
      operatorKeys.forEach((key) => key.disabled = true);
    } else {
      operatorKeys.forEach((key) => {
        key.disabled = false;
        key.classList.remove('active');
      })
    }
  }
};

// document queries
const calculatorDisplay = document.querySelector('.calculator__display__value');
const numberKeys = document.querySelectorAll('.num__key');
const operatorKeys = document.querySelectorAll('.operator__key');
const equalsKey = document.querySelector('.equals__key');
const clearKey = document.querySelector('.clear__key');
const delKey = document.querySelector('.del__key');

// event handlers
const numKeyClickHandler = (event) => {
  calculator.operatorToggle = false;
  calculator.toggleOperatorButtons();
  if (calculator.equalToggle) calculator.clear();
  const userInput = event.target.getAttribute('data-key');
  calculator.typeToCurrentValue(userInput);
  calculator.updateDisplay();
};

const operatorClickHandler = (event) => {
  if (!calculator.currentValue && !calculator.previousValue) return;
  calculator.equalToggle = false;
  calculator.operatorToggle = true;
  event.target.classList.add('active');
  calculator.toggleOperatorButtons();
  if (!calculator.operator) {
    const userSelection = event.target.getAttribute('data-key');
    calculator.selectOperator(userSelection);
  } else {
    calculator.operate();
    calculator.updateDisplay();
    const userInput = event.target.getAttribute('data-key');
    calculator.selectOperator(userInput);
  }
};

// Add event listeners
numberKeys.forEach((key) => key.addEventListener('click', numKeyClickHandler));
operatorKeys.forEach((key) =>
  key.addEventListener('click', operatorClickHandler)
);
equalsKey.addEventListener('click', () => calculator.equals());
clearKey.addEventListener('click', () => calculator.clear());
delKey.addEventListener('click', () => calculator.delete());
