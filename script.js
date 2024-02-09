const displayNumber = document.querySelector('p');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const decimalButton = document.querySelector('#decimal');
const deleteButton = document.querySelector('#del');

let operandsArr = ['', '', ''];
let operandActive = false;
let screenDigits = [''];
let decimalActive = false;

const calculator = {
    'x': (x, y) => x * y,
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '÷': (x, y) => x / y,
    'M': (x, y) => x % y,
}

numbers.forEach(number => number.addEventListener('click', () => {
    currentDigit = number.textContent;
    increaseBuffer(currentDigit, false);
    if (!operandActive) {
        operandsArr[0] += currentDigit;
        operandActive = false;
    } else {
        operandsArr[1] += currentDigit;
    }
}))

operators.forEach(operator => operator.addEventListener('click', () => {
    if (operandsArr[0].length > 0 && operandsArr[1].length === 0) {
        increaseBuffer(operator.textContent, operandActive)
        operandsArr[2] = operator.textContent;
        operandActive = true;
    }
    if (operandsArr[1].length > 0) {
        let result = calculator[operandsArr[2]](parseFloat(operandsArr[0]), parseFloat(operandsArr[1]));
        updateDisplay(result, operator.textContent);
        operandsArr[0] = `${result}`;
        operandsArr[1] = '';
        operandsArr[2] = operator.textContent;
        operandActive = true;
    }
    decimalActive = false;
}))

clearButton.addEventListener('click', () => {
    operandsArr = ['', '', ''];
    operandActive = false;
    screenDigits = [''];
    displayNumber.textContent = screenDigits.join('');
})

equalButton.addEventListener('click', () => {
    if (operandsArr[1].length > 0) {
        let result = calculator[operandsArr[2]](parseFloat(operandsArr[0]), parseFloat(operandsArr[1]));
        operandsArr[0] = `${result}`;
        operandsArr[1] = '';
        operandsArr[2] = '';
        operandActive = false;
        updateDisplay(result, '');
    }
})

decimalButton.addEventListener('click', () => {
    if (operandsArr[2].length < 1) {
        if (!decimalActive) {
            if (operandsArr[0].length < 1) {
                operandsArr[0] += '0';
                increaseBuffer('0', false);
            }
            operandsArr[0] += '.';
            increaseBuffer('.', false);
            decimalActive = !decimalActive;
        }
    } else {
        if (!decimalActive) {
            if (operandsArr[1].length < 1) {
                operandsArr[1] += '0';
                increaseBuffer('0', false);
            }
            operandsArr[1] += '.';
            increaseBuffer('.', false);
            decimalActive = !decimalActive;
        }
    }
})

deleteButton.addEventListener('click', () => {
    let removed = screenDigits.pop();
    displayNumber.textContent = screenDigits.join('');
    if (operandsArr[1].length > 0) {
        operandsArr[1] = operandsArr[1].slice(0, -1);
    } else if (operandActive) {
        operandsArr[2] = '';
        operandActive = false;
    } else {
        if (operandsArr[0].length > 0) {
            operandsArr[0] = operandsArr[0].slice(0, -1);
        }
    }
})

function increaseBuffer(element, flag_operand) {
    if (flag_operand) {
        screenDigits.pop();
        screenDigits.push(element)
    } else {
        screenDigits.push(element);
    }
    displayNumber.textContent = screenDigits.join('');
}

function updateDisplay(result, operand) {
    screenDigits = `${result}${operand}`.split('');
    displayNumber.textContent = screenDigits.join('');
} 