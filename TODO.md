# TODO

## Main

- [x] Configure environment and create index.html, style.css, and script.js files.
- [x] Create functions for each of the basic mathematical operations: addition, subtraction, multiplication, and division. Have these operations working in the browser console.
- [x] Create a function called `operate()` that takes an operator and 2 numbers and the corresponding operation on the 2 numbers.
- [x] Create calculator UI with HTML and CSS. Has buttons for each digit, the 4 operations, an "equals" button, a "clear" button, and a section for displaying the input and output.
- [x] Create functions for populating the display when number buttons are clicked. Display value should be stored in a variable.
    - **Planning/Psuedo Code**
    - Add data attributes for each key on the calculator so their value can be accessed in script.js.
    - Add event listeners for each button that will extract their data and save it to a variable when the button is clicked.
    - Create a function that updates the display's textContent based on what the above variable holds. Run this in the buttons' event listener (?)
- [ ] Make the calculator fully operational. Store the numbers that are input into the calculator and save the chosen operation. Call `operate()` when the user presses the equals key. Update display with solution.
- [ ] Users should be able to string operations together.
- [ ] Round numbers with long decimals so they don't overflow the display container.
- [ ] Handle users pressing "=" key before their operator expression is complete.
- [ ] Pressing "clear" should wipe all data.
- [ ] Handle division by 0.

## Extra

- [ ] Make it pretty :blush:
- [ ] Add a backspace button.
- [ ] Add keyboard support.