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
    if (result === 'Error!') {
      this.currentValue = result;
    } else {
      // Round numbers to the precision allowed by the display.
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
    this.updateDisplay('0');
  },
  equals() {
    // Prevent equals being pressed repeatedly.
    if (!this.currentValue || !this.previousValue) return;
    this.operate();
    if (this.currentValue === 'Error!') {
      this.handleDivideByZero();
      return;
    }
    this.operator = '';
    this.updateDisplay(this.currentValue);
    this.previousValue = '';
    this.equalToggle = true;
    this.operatorToggle = false;
  },
  typeToCurrentValue(input) {
    // Prevents user from entering multiple decimals
    if (input === '.' && this.currentValue.includes('.')) return;
    // Prevents user entering useless zeroes
    if (
      input === '0' &&
      this.currentValue.startsWith('0') &&
      !this.currentValue.includes('.')
    )
      return;
    this.currentValue += input;
    this.updateDisplay(this.currentValue);
  },
  selectOperator(input) {
    this.operator = input;
    this.previousValue = this.currentValue;
    this.currentValue = '';
  },
  updateDisplay(value) {
    // prevent display text from overflowing
    if (value.length > this.maxDisplayDigits) {
      const expValue = parseFloat(value).toExponential(
        this.maxDisplayDigits - 5
      );
      calculatorDisplay.textContent = expValue;
    } else {
      calculatorDisplay.textContent = value;
    }
  },
  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
    this.updateDisplay(this.currentValue);
  },
  toggleOperatorButtons() {
    if (this.operatorToggle) {
      operatorKeys.forEach((key) => (key.disabled = true));
    } else {
      operatorKeys.forEach((key) => {
        key.disabled = false;
        key.classList.remove('active');
      });
    }
  },
  handleDivideByZero() {
    this.clear();
    this.updateDisplay('NO CAN DO');
  },
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
  // const userInput = event.target.getAttribute('data-key');
  const userInput = event.getAttribute('data-key');
  calculator.typeToCurrentValue(userInput);
  calculator.updateDisplay(calculator.currentValue);
};

const operatorClickHandler = (event) => {
  if (!calculator.currentValue && !calculator.previousValue) return;
  calculator.equalToggle = false;
  calculator.operatorToggle = true;
  const userSelection = event.getAttribute('data-key');
  event.classList.add('active');
  calculator.toggleOperatorButtons();
  if (!calculator.operator) {
    // const userSelection = event.target.getAttribute('data-key');
    calculator.selectOperator(userSelection);
  } else {
    calculator.operate();
    if (calculator.currentValue === 'Error!') {
      calculator.handleDivideByZero();
      return;
    }
    calculator.updateDisplay(calculator.currentValue);
    // const userInput = event.target.getAttribute('data-key');
    calculator.selectOperator(userSelection);
  }
};

// Add event listeners
numberKeys.forEach((key) =>
  key.addEventListener('click', (event) => {
    const eventTarget = event.target;
    numKeyClickHandler(eventTarget);
  })
);
operatorKeys.forEach((key) =>
  key.addEventListener('click', (event) => {
    const btnPressed = event.target;
    operatorClickHandler(btnPressed);
  })
);
equalsKey.addEventListener('click', () => calculator.equals());
clearKey.addEventListener('click', () => calculator.clear());
delKey.addEventListener('click', () => calculator.delete());

window.addEventListener('keydown', (event) => {
  const btnPressed = document.querySelector(
    `button[data-key="${event.key}"]`
  );
  event.preventDefault();
  if (btnPressed === delKey || event.key === 'Backspace') {
    calculator.delete();
  } else if (btnPressed === equalsKey || event.key === 'Enter') {
    calculator.equals();
  } else if ([...operatorKeys].includes(btnPressed)) {
    operatorClickHandler(btnPressed);
  } else if ([...numberKeys].includes(btnPressed)) {
    numKeyClickHandler(btnPressed);
  } else {
    return;
  }
});
