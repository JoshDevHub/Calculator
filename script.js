// calculator object
const calculator = {
  currentValue: '',
  previousValue: '',
  operator: '',
  maxDisplayDigits: 12,

  /**
   * bool to check if equals key has just been pressed, which allows for resetting
   * everything if the user goes to pressing number keys after equals key.
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
    operatorButtonToggle();
    this.updateDisplay();
  },
  equals() {
    // Prevent equals being pressed repeatedly.
    if (!this.currentValue || !this.previousValue) return;
    this.operate();
    this.operator = '';
    this.updateDisplay();
    this.equalToggle = true;
    this.operatorToggle = false;
    operatorButtonToggle();
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
    // prevent display text from overflowing
    if (this.currentValue.length > this.maxDisplayDigits) {
      calculatorDisplay.textContent = this.currentValue.slice(
        -this.maxDisplayDigits
      );
    } else {
      calculatorDisplay.textContent = this.currentValue;
    }
  },
};

// document queries
const calculatorDisplay = document.querySelector('.calculator__display__value');
const numberKeys = document.querySelectorAll('.num__key');
const operatorKeys = document.querySelectorAll('.operator__key');
const equalsKey = document.querySelector('.equals__key');
const clearKey = document.querySelector('.clear__key');

const operatorButtonToggle = () => {
  if (calculator.operatorToggle) {
    for (let key of operatorKeys) {
      key.disabled = true;
    }
  } else {
    operatorKeys.forEach((key) => {
      key.disabled = false;
      key.classList.remove('active');
    });
  }
};

// event handlers
const numKeyClickHandler = (event) => {
  calculator.operatorToggle = false;
  operatorButtonToggle();
  if (calculator.equalToggle) calculator.clear();
  const userInput = event.target.getAttribute('data-key');

  // Prevents the user from entering multiple decimals
  if (userInput === '.' && calculator.currentValue.includes('.')) return;
  calculator.typeToCurrentValue(userInput);
  calculator.updateDisplay();
};

const operatorClickHandler = (event) => {
  if (!calculator.currentValue && !calculator.previousValue) return;
  calculator.equalToggle = false;
  calculator.operatorToggle = true;
  event.target.classList.add('active');
  operatorButtonToggle();
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
