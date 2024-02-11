const displayNumber = document.querySelector('p');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const decimalButton = document.querySelector('#decimal');
const deleteButton = document.querySelector('#del');
const changeSignButton = document.querySelector('.operator-special');
const buttons = document.querySelectorAll('.button');
const MAX_DIGITS_DISPLAY = 9;
const MAX_NUMBER = 10 ** (MAX_DIGITS_DISPLAY + 1) -1;

let operandsArr = ['', '', ''];
let operandActive = false;
let screenDigits = [];
let decimalActive = false;
let changeSignActive = [false, false];
const calculator = {
    'x': (x, y) => x * y,
    '*': (x, y) => x * y,
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '/': division,
    'M': modulo,
};

buttons.forEach(button => button.addEventListener('click', () => {
    button.classList.toggle('active');
}));

buttons.forEach(button => button.addEventListener('transitionend', () => {
    button.classList.remove('active');
}));

numbers.forEach(number => number.addEventListener('click', () => {
    addNumber(number.textContent);
}));

operators.forEach(operator => operator.addEventListener('click', () => {
    addOperator(operator.textContent, operator.className.indexOf('sign') > 0); // operator.className.indexOf('sign') indicates that the button pressed is either + or -
}));

clearButton.addEventListener('click', clearDisplay);
equalButton.addEventListener('click', equal);
decimalButton.addEventListener('click', decimal);
deleteButton.addEventListener('click', deleteInDisplay);

changeSignButton.addEventListener('click', () => {
    if (operandsArr[1].length > 0) {
        changeSign(1);
    } else if (!operandActive && operandsArr[0].length > 0) {
        changeSign(0);
    }
})

document.addEventListener('keyup', keyChecker);

function keyChecker(element) {
    if (element.key >= '0' && element.key <= '9') {
        checkAndToggleClass(0, element.key);
        addNumber(element.key);
    } else if (calculator[element.key] !== undefined) {
        checkAndToggleClass(1, element.key)
        if (element.key === '+' || element.key === '-') {
            addOperator(element.key, true);
        } else {
            addOperator(element.key, false);
        }
    } else if (element.key === 'Delete' || element.key === 'Backspace') {
        checkAndToggleClass(2, deleteButton.textContent);
        deleteInDisplay();
    } else if (element.key === '.') {
        checkAndToggleClass(3, decimalButton.textContent);
        decimal();
    } else if (element.key === 'Escape') {
        checkAndToggleClass(4, clearButton.textContent);
        clearDisplay();
    } else if (element.key === 'Enter') {
        checkAndToggleClass(5, equalButton.textContent);
        equal();
    }
}

function checkAndToggleClass(typeButton, ...text) {
    // typeButton indicates what kind of button we are dealing with
    // 0 is for numbers
    // 1 is for operators
    // text variable is considered to be an array because there will be cases when we need to check more than one string
    let objectType;
    switch (typeButton) {
        case 0:
            objectType = numbers;
            break;
        case 1:
            objectType = operators;
            break;
        case 2:
            objectType = deleteButton;
            break;
        case 3:
            objectType = decimalButton;
            break;
        case 4:
            objectType = clearButton;
            break;
        case 5:
            objectType = equalButton;
            break;
    }
    if (typeButton < 2) {
        for (let i = 0; i < objectType.length; ++i) {
            if (text.includes(objectType[i].textContent)) {
                objectType[i].classList.toggle('active');
                break;
            }
        }
    }
    else {
        objectType.classList.toggle('active');
    }
}

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
}true

function updateDisplay(result, operand) {
    if (operand === '±') {
        screenDigits = `${operandsArr[0]}${operandsArr[2]}${operandsArr[1]}`.split('');
        displayNumber.textContent = screenDigits.join('');
    } else {
        if (checkSizeResult(result)) {
            result = updateResult(result);
        }
        screenDigits = `${result}${operand}`.split('');
        displayNumber.textContent = screenDigits.join('');
    }
} 

function changeDecimalActive(num) {
    decimalActive = (num - parseInt(num)) !== 0 ? true : false;
}

function addNumber(number) {
    if (checkSizeScreen()) {
        increaseBuffer(number, false);
        if (!operandActive) {
            operandsArr[0] += number;
            operandActive = false;
        } else {
            operandsArr[1] += number;
        }
    } else {
        if (operandActive && operandsArr[1].length < 1) {
            increaseBuffer(number, false);
            if (operandsArr[1].length < 1) {
                operandsArr[1] += number;
            }
        }
    }
}

function equal() {
    if (operandsArr[1].length > 0) {
        let result = calculator[operandsArr[2]](parseFloat(operandsArr[0]), parseFloat(operandsArr[1]));
        if (result === undefined) {
            clearDisplay();
            displayNumber.textContent = 'HOWDY HOWDY';
        } else {
            operandsArr[0] = `${result}`;
            operandsArr[1] = '';
            operandsArr[2] = '';
            operandActive = false;
            changeSignActive[0] = result < 0 ? true : false;
            changeSignActive[1] = false;
            changeDecimalActive(result);
            updateDisplay(result, '');
        }

    }
}

function deleteInDisplay() {
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
}

function addOperator(operatorName, operatorIsTypeSign)  {
    if (operandsArr[0].length > 0 && operandsArr[1].length === 0) {
        if (operandActive) {
            if(operatorIsTypeSign && operandsArr[2] !== operatorName) {
                changeSignActive[1] = (operatorName === '-') ? true : false;
                operandsArr[1] = operatorName;
                increaseBuffer(operatorName, false);
            } else {
                operandsArr[2] = operatorName;
                increaseBuffer(operatorName, true);
            }
        } else {
        increaseBuffer(operatorName, operandActive)
        operandsArr[2] = operatorName;
        operandActive = true;
        }
    } else if (operandsArr[1].length > 0) {
        let result = calculator[operandsArr[2]](parseFloat(operandsArr[0]), parseFloat(operandsArr[1]));
        updateDisplay(result, operatorName);
        operandsArr[0] = `${result}`;
        operandsArr[1] = '';
        operandsArr[2] = operatorName;
        operandActive = true;
        changeSignActive[0] = result < 0 ? true : false;
        changeSignActive[1] = false;
    }
    decimalActive = false;
}

function decimal() {
    if (checkSizeScreen()) {
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
    }
} 

function clearDisplay() {
    operandsArr = ['', '', ''];
    operandActive = false;
    screenDigits = [];
    displayNumber.textContent = screenDigits.join('');
    changeSignActive = [false, false];
    decimalActive = false;
}

function division(x, y) {
    if (y === 0) {
        return undefined;
    } else {
        return x / y;
    }
}

function modulo (x, y) {
    if (y ===0) {
        return undefined;
    } else {
        return x % y;
    }
}

function checkSizeScreen () {
    if (screenDigits.length > MAX_DIGITS_DISPLAY) {
        return false;
    } else {
        return true;
    }
}

function checkSizeResult(result) {
    // Here we check:
    // 1.- If the length of the result is greater than MAX_DIGITS_DISPLAY
    if (result.toString().length > MAX_DIGITS_DISPLAY) {
        return true;
    }
}

function updateResult(result) {
    // Here we check:
    // 1.- If there are decimals
    // 2.- If (2) truncate them so MAX_DIGITS_DISPLAY is not violated
    // 3.- In case even with the truncation the result is greater than MAX_NUMBER the result itself is truncated to MAX_NUMBER
    if (decimalActive) {
        let integerSize = (result.toString()).indexOf(decimalButton.textContent);
        result = Math.round(result * (10 ** (MAX_DIGITS_DISPLAY - 1 - integerSize))) / (10 ** (MAX_DIGITS_DISPLAY - 1 - integerSize));
        operandsArr[0] = result.toString();
    }
    if (result > MAX_NUMBER) {
        result = 9999999999; // 9 999 999 999 = 9.999 999 999 e9
        operandsArr[0] = result.toString();
    }
    return result;
}