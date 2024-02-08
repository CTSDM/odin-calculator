const displayNumber = document.querySelector('p');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal')

let operandsArr = ['', '', ''];
let operandActive = false;
let screenDigits = [''];

const calculator = {
    'x': (x, y) => x * y,
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '÷': (x, y) => x / y,
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
        let result = calculator[operandsArr[2]](parseInt(operandsArr[0]), parseInt(operandsArr[1]));
        updateDisplay(result, operator.textContent);
        operandsArr[0] = `${result}`;
        operandsArr[1] = '';
        operandsArr[2] = operator.textContent;
        operandActive = true;
    }
}))

clearButton.addEventListener('click', () => {
    operandsArr = ['', '', ''];
    operandActive = false;
    screenDigits = [''];
    displayNumber.textContent = screenDigits.join('');
})

equalButton.addEventListener('click', () => {
    if (operandsArr[2].length > 0) {
        let result = calculator[operandsArr[2]](parseInt(operandsArr[0]), parseInt(operandsArr[1]));
        operandsArr[0] = `${result}`;
        operandsArr[1] = '';
        operandsArr[2] = '';
        operandActive = false;
        updateDisplay(result, '');
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