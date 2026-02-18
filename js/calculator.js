let currentInput = "";
let previousInput = "";
let operator = null;

const display = document.getElementById('Display');

function updateDisplay() {
    if (display) {
        // Show formula: "1 + " or "1 + 2" or just "2"
        if (operator && previousInput !== "") {
            display.value = `${previousInput} ${operator} ${currentInput}`;
        } else {
            display.value = currentInput;
        }
    }
}

function appendNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === "" && previousInput === "") return;

    // If we have both inputs, calculate intermediate result
    if (previousInput !== "" && currentInput !== "") {
        calculate();
    }

    // If we just have a current input (first number), move it to previous
    if (previousInput === "" && currentInput !== "") {
        previousInput = currentInput;
        // Map visual symbol to math operator if needed, but we keep simple map
        currentInput = "";
    }

    operator = op;
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

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
                alert("Cannot divide by zero");
                clearCalc();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to 2 decimals
    result = Math.round(result * 100) / 100;

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateDisplay();
}

function clearCalc() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
}

// Global scope binding for inline onclicks
window.appendNumber = appendNumber;
window.setOperator = setOperator;
window.calculate = calculate;
window.clearCalc = clearCalc;


document.addEventListener('DOMContentLoaded', function () {
    // --- Legacy Calculator Logic ---
    const num1Input = document.getElementById('Number1_TB');
    const num2Input = document.getElementById('Number2_TB');
    const operatorList = document.getElementById('OperatorList');
    const calcButton = document.getElementById('CalcButton');
    const resultBox = document.getElementById('ResultBox');
    const legacyClear = document.getElementById('LegacyClearButton');

    if (calcButton && num1Input && num2Input) {
        calcButton.addEventListener('click', function (e) {
            e.preventDefault();

            const n1 = parseFloat(num1Input.value);
            const n2 = parseFloat(num2Input.value);
            const op = operatorList.value;

            if (isNaN(n1) || isNaN(n2)) {
                resultBox.innerText = "Invalid Input!";
                return;
            }

            let res = 0;
            let symbol = "";

            switch (op) {
                case "1": // Add
                    res = n1 + n2;
                    symbol = "+";
                    break;
                case "2": // Subtract
                    res = n1 - n2;
                    symbol = "-";
                    break;
                case "3": // Multiply
                    res = n1 * n2;
                    symbol = "x";
                    break;
                case "4": // Divide
                    if (n2 === 0) {
                        resultBox.innerText = "Cannot divide by zero!";
                        return;
                    }
                    res = n1 / n2;
                    symbol = "÷";
                    break;
            }

            res = Math.round(res * 100) / 100;
            resultBox.innerText = `${n1} ${symbol} ${n2} = ${res}`;
        });
    }

    if (legacyClear) {
        legacyClear.addEventListener('click', function (e) {
            e.preventDefault();
            num1Input.value = "";
            num2Input.value = "";
            resultBox.innerText = "";
            operatorList.selectedIndex = 0;
        });
    }
});
