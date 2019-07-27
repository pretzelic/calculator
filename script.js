const display = document.getElementById('result');
const history = document.getElementById('history');
const legalInput = /[0-9-+*.\/]/;
const number = /[0-9]/;
const operatorCheck = /[*\/]/
const plusMinus = /[+-]/;
const errorMessage = "ERROR!!!"
let nums = [];
let submitted = ""
let lastWasNum = false;
let hasOperator = false;
let hasDot = false;
display.innerHTML = 0;

const buttons = [].slice.call(document.getElementsByClassName("button"));
buttons.forEach(button => {
    button.addEventListener('mousedown', filter);
});

document.addEventListener('keydown', filter);

function filter(e) {
    history.innerHTML = "";
    let input;
    if (e.key) {
        input = e.key;
    } else {
        input = this.getAttribute("value");
    }
    if (display.innerHTML == 0 || display.innerHTML === errorMessage) {
        display.innerHTML = '';
    } if (input === ".") {
        if (!hasDot) {
            submitted += input;
            display.innerHTML += input;
            hasDot = true;
        }
    }
    if (legalInput.test(input)) {
        submitted += input;
        display.innerHTML += input;
    } else if (input === "Enter" || input === "=") {
        submitted += "=";
        operate(submitted);
    } else if (input === "Backspace") {
        if (submitted[submitted.length - 1] === ".") {
            hasDot = false;
        }
        submitted = deleteLastChar(submitted);
        display.innerHTML = submitted;
    } else if (input === "c") {
        submitted = "";
        display.innerHTML = 0;
    }
}

function deleteLastChar(a) {
    a = a.substring(0, a.length - 1);
    return a;
}

function operate(string) {
    display.innerHTML = "";
    let result = 0;
    let num1 = 0;
    let num2 = 0;
    let operator;
    let inputSoFar = "";
    let equation = string;

    for (let i = 0; i < equation.length; i++) {
        let input = equation[i];
        switch (input) {

            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                if (lastWasNum) {
                    inputSoFar += input;
                } else if (!lastWasNum) {
                    inputSoFar += input;
                    lastWasNum = true;
                }
                break;

            case "=":
                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Number(inputSoFar);
                        result += operateAdditionally(num1, operator, num2);
                        num1 = 0;
                        num2 = 0;
                    } else if (!hasOperator) {
                        result += Number(inputSoFar);
                        display.innerHTML = result;
                        input = result;
                    }
                } else if (!lastWasNum) {
                    console.log("error, need numbers before the =");
                    hasOperator = false;
                    lastWasNum = false;
                }
                break;

            case "+":
            case "-":

                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Number(inputSoFar);
                        result += operateAdditionally(num1, operator, num2);
                        num1 = 0;
                        num2 = 0;
                        operator = input;
                    } else if (!hasOperator) {
                        result += Number(inputSoFar);
                        hasOperator = true;
                    }
                    inputSoFar = "";
                    operator = input;
                } else if (!lastWasNum) {
                    inputSoFar += input;
                }
                break;

            case "*":
            case "/":

                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Number(inputSoFar);
                        lastWasNum = false;
                        num1 = operateAdditionally(num1, operator, num2);
                        operator = input;
                        num2 = 0;
                    } else if (!hasOperator) {
                        num1 = Number(inputSoFar);
                        hasOperator = true;
                    }
                    operator = input;
                    lastWasNum = false;
                    inputSoFar = "";
                } else if (!lastWasNum) {
                    console.log('Error - must have number before that!')
                }
                break;

        }
        console.table(`input = ${input}, inputSoFar = ${inputSoFar}, operator = ${operator}, num1 = ${num1}, num2=${num2}, hasOperator = ${hasOperator}, lastWasNum = ${lastWasNum}, result = ${result}}`)
    }
    display.innerHTML = result;
    history.innerHTML = submitted;
    submitted = result;
    hasOperator = false;
}


function operateAdditionally(a, b, c) {
    let num1 = a;
    let operator = b;
    let num2 = c;
    switch (operator) {
        case "+":
            return num1 + num2;
            break;
        case "-":
            return num1 - num2;
            break;
        case "*":
            return num1 * num2;
            break;
        case "/":
            return num1 / num2;
            break;
    }
}




// if (!lastWasNum) {
    //     if (input === "=") {
    //         console.log("error, need numbers before the =")
    //         hasDot = false;
    //         hasOperator = false;
    //         lastWasNum = false;
    //     }
    //     if (!hasOperator) {
    //         if (number.test(input)) {
    //             inputSoFar += input
    //             lastWasNum = true;
    //             hasDot = false;
    //         } else if (plusMinus.test(input)) {
    //             inputSoFar += input;
    //         } else if (operatorCheck.test(input)) {
    //             console.log("error, must have number before that");
    //         }
    //     } else if (hasOperator) {
    //         if (number.test(input)) {
    //             console.log(1, input, inputSoFar);
    //             inputSoFar += input;
    //             lastWasNum = true;
    //         } else if (plusMinus.test(input)) {
    //             inputSoFar += input;
    //         } else if (operatorCheck.test(input)) {
    //             console.log("error, must have number before that")
    //         }
    //     }
    // } else if (lastWasNum) {
    //     if (!hasOperator) {
    //         if (number.test(input)) {
    //             inputSoFar += input;
    //         } else if (plusMinus.test(input)) {
    //             result += Number(inputSoFar);
    //             inputSoFar = "";
    //             hasDot = false;
    //             operator = input;
    //             hasOperator = true;
    //         } else if (operatorCheck.test(input)) {
    //             operator = input;
    //             num1 = Number(inputSoFar)
    //             inputSoFar = "";
    //             hasDot = false;
    //             hasOperator = true;
    //             lastWasNum = false;
    //         } else if (input === "=") {
    //             result += Number(inputSoFar);
    //             display.innerHTML = result;
    //             input = result;
    //             hasDot = false;
    //         }
    //     } else if (hasOperator) {
    //         if (number.test(input)) {
    //             inputSoFar += input;
    //             lastWasNum = true;
    //         } else if (plusMinus.test(input)) {
    //             num2 = Number(inputSoFar);
    //             result += operateAdditionally(num1, operator, num2);
    //             num1 = 0;
    //             num2 = 0;
    //             operator = input;
    //             inputSoFar = "";
    //             hasDot = false;
    //         } else if (operatorCheck.test(input)) {
    //             num2 = Number(inputSoFar);
    //             lastWasNum = false;
    //             num1 = operateAdditionally(num1, operator, num2);
    //             operator = input;
    //             num2 = 0;
    //             inputSoFar = "";
    //             hasDot = false;
    //         } else if (input === "=") {
    //             num2 = Number(inputSoFar);
    //             result += operateAdditionally(num1, operator, num2);
    //             num1 = 0;
    //             num2 = 0;
    //         }
    //     }
    // }