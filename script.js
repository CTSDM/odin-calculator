const displayNumber = document.querySelector('p');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const decimalButton = document.querySelector('#decimal');
const deleteButton = document.querySelector('#del');
const changeSignButton = document.querySelector('.operator-special');

let operandsArr = ['', '', ''];
let operandActive = false;
let screenDigits = [''];
let decimalActive = false;
let changeSignActive = [false, false];

const calculator = {
    'x': (x, y) => x * y,
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '÷': (x, y) => x / y,
    'M': (x, y) => x % y,
}

numbers.forEach(number => number.addEventListener('click', () => {
    addNumber(number.textContent);
}))

operators.forEach(operator => operator.addEventListener('click', () => {
    if (operandsArr[0].length > 0 && operandsArr[1].length === 0) {
        if (operandActive) {
            if(operator.className.indexOf('sign') > 0 && operandsArr[2] !== operator.textContent) {
                changeSignActive[1] = (operator.textContent === '-') ? true : false;
                operandsArr[1] = operator.textContent;
                increaseBuffer(operator.textContent, false);
            }
        } else {
        increaseBuffer(operator.textContent, operandActive)
        operandsArr[2] = operator.textContent;
        operandActive = true;
        }
    } else if (operandsArr[1].length > 0) {
        let result = calculator[operandsArr[2]](parseFloat(operandsArr[0]), parseFloat(operandsArr[1]));
        updateDisplay(result, operator.textContent);
        operandsArr[0] = `${result}`;
        operandsArr[1] = '';
        operandsArr[2] = operator.textContent;
        operandActive = true;
        changeSignActive[0] = result < 0 ? true : false;
        changeSignActive[1] = false;
    }
    decimalActive = false;
}))

clearButton.addEventListener('click', () => {
    operandsArr = ['', '', ''];
    operandActive = false;
    screenDigits = [''];
    displayNumber.textContent = screenDigits.join('');
    changeSignActive = [false, false];
})

equalButton.addEventListener('click', equal);

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
    if (removed === '.') {
        decimalActive = false;
    }
    displayNumber.textContent = screenDigits.join('');
    if (operandsArr[1].length > 0) {
        operandsArr[1] = operandsArr[1].slice(0, -1);
    } else if (operandActive) {
        operandsArr[2] = '';
        operandActive = false;
        decimalActive = (operandsArr[0] - parseInt(operandsArr[0]) === 0) ? false: true;
    } else {
        if (operandsArr[0].length > 0) {
            operandsArr[0] = operandsArr[0].slice(0, -1);
        }
    }
})

changeSignButton.addEventListener('click', () => {
    if (operandsArr[1].length > 0) {
        changeSign(1);
    } else if (!operandActive && operandsArr[0].length > 0) {
        changeSign(0);
    }
})

function changeSign(index) {
    if (changeSignActive[index] === false) {
        operandsArr[index] = ['-'] + operandsArr[index];
        updateDisplay('', '±');
        changeSignActive[index] = true;
    } else {
        operandsArr[index] = operandsArr[index].slice(1);
        updateDisplay('', '±');
        changeSignActive[index] = false; 
    }
}

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
    if (operand === '±') {
        screenDigits = `${operandsArr[0]}${operandsArr[2]}${operandsArr[1]}`.split('');
        displayNumber.textContent = screenDigits.join('');
    } else {
        screenDigits = `${result}${operand}`.split('');
        displayNumber.textContent = screenDigits.join('');
    }
} 

function changeDecimalActive(num) {
    decimalActive = (num - parseInt(num)) !== 0 ? true : false;
}

// We call functions when a keyup event
// With that purpose in mind, we've added an event listener to the document it self

function addNumber(number) {
    currentDigit = number;
    increaseBuffer(currentDigit, false);
    if (!operandActive) {
        operandsArr[0] += currentDigit;
        operandActive = false;
    } else {
        operandsArr[1] += currentDigit;
    }
}

function equal() {
    if (operandsArr[1].length > 0) {
        let result = calculator[operandsArr[2]](parseFloat(operandsArr[0]), parseFloat(operandsArr[1]));
        operandsArr[0] = `${result}`;
        operandsArr[1] = '';
        operandsArr[2] = '';
        operandActive = false;
        updateDisplay(result, '');
        changeSignActive[0] = result < 0 ? true : false;
        changeSignActive[1] = false;
        changeDecimalActive(result);
    }
}