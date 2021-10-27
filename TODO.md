# TODO

## Main

- [x] Configure environment and create index.html, style.css, and script.js files.
- [x] Create functions for each of the basic mathematical operations: addition, subtraction, multiplication, and division. Have these operations working in the browser console.
- [x] Create a function called `operate()` that takes an operator and 2 numbers and the corresponding operation on the 2 numbers.
- [x] Create calculator UI with HTML and CSS. Has buttons for each digit, the 4 operations, an "equals" button, a "clear" button, and a section for displaying the input and output.
- [x] Create functions for populating the display when number buttons are clicked. Display value should be stored in a variable.
    - **Planning**
    - Add data attributes for each key on the calculator so their value can be accessed in script.js.
    - Add event listeners for each button that will extract their data and save it to a variable when the button is clicked.
    - Create a function that updates the display's textContent based on what the above variable holds. Run this in the buttons' event listener (?)

- [x] Make the calculator fully operational. Store the numbers that are input into the calculator and save the chosen operation. Call `operate()` when the user presses the equals key. Update display with solution.
- [x] Users should be able to string operations together.
- [x] Test operation stringing. Do these with each operation.
    - number op number op number op ...
    - number op number equals number op number ...
    - number op number equals op number equals op number ...
    
- [x] Float support.
    **Planning**
    - Hook up html decimal button in script
    - Only allow the user to input one decimal.
        - pseudo: if (input is '.' && currentValue has ('.')) return;
    - Find limits of characters in the display viewport and make sure numbers don't overflow the display container.
    - Research fixing floating point arithmetic quirks (0.1 + 0.2)
    

- [x] Round numbers with long decimals so they don't overflow the display container.

- [x] Handle users typing too many characters into the display.
    **Planning**
    - Have the number keys still update currentValue but alter the way the display shows characters?

- [x] Handle operator selection better.
    **Planning**
    - Currently app breaks if user repeatedly presses operators or presses operators at illogical points.
    - Keep operator 'pressed' after user clicks it. Disable operator buttons until a new button is pressed.

- [x] Fix erros with repeated equals usage.


- [x] Pressing "clear" should wipe all data.

- [ ] Handle division by 0.
    **Planning**
    - Currently displays error message to the display.
    - Need to also run clear() after this error happens.

- [x] Replace '+/-' key with backspace and give the app backspace functionality.

- [x] Add keyboard support.

- [ ] Styling
    **Planning**
    - Add blinking cursor to display?
    - Footer?

- [ ] Overall Refactoring
    - Reconsider organization of markup and CSS
    - Review calculator object.
    - Consider logic for displaying decimals and larger numbers.
    - Review selectors.
    - Organize project root

- [ ] Deploy