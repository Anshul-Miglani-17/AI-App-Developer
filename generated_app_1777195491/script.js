const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const decimalButton = document.getElementById('decimal');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let shouldResetDisplay = false;

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentOperand = '';
        shouldResetDisplay = false;
    }
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    shouldResetDisplay = true; // Ensure display resets for next number input
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Error: Division by zero is not allowed.");
                clear(); // Reset calculator state on error
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetDisplay = true;
}

function updateDisplay() {
    display.textContent = currentOperand === '' ? '0' : currentOperand;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.textContent);
    });
});

decimalButton.addEventListener('click', () => {
    appendNumber('.');
});

clearButton.addEventListener('click', () => {
    clear();
});

equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

// Initialize display
clear();