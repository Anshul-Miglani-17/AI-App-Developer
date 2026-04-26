const display = document.querySelector('[data-display]');
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (number === '.' && currentInput.includes('.')) {
        return;
    }
    currentInput += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return; // No input to operate on
    }
    if (currentInput === '' && previousInput !== '') {
        // Allow changing operator if no new number entered
        operator = op;
        return;
    }

    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

function calculate() {
    if (currentInput === '' || previousInput === '' || operator === null) {
        return; // Not enough operands or no operator
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to prevent floating point issues, e.g., 0.1 + 0.2
    currentInput = parseFloat(result.toFixed(7)).toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    display.textContent = '0';
}

function updateDisplay() {
    display.textContent = currentInput === '' ? '0' : currentInput;
}

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.dataset.value));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.dataset.value));
});

equalsButton.addEventListener('click', calculate);

clearButton.addEventListener('click', clearDisplay);

clearDisplay(); // Initial state setup