const display = document.getElementById('result');
const history = document.getElementById('history');
const legalInput = /[0-9-+*.\/%()]/;
const number = /[0-9]/;
const operatorCheck = /[*\/=+-]/
const plusMinus = /[+-]/;
const errorMessage = "ERROR!!!"
let loop = 0;

const buttons = [].slice.call(document.getElementsByClassName("button"));
buttons.forEach(button => {
    button.addEventListener('mousedown', btnHandler);
});

document.addEventListener('keydown', btnHandler);

function btnHandler(e) {
    let input;
    if (e.key) {
        input = e.key;
    } else {
        input = this.getAttribute("value");
    }
    if (display.innerHTML == 0 || display.innerHTML === "NaN") {
        display.innerHTML = '';
    }
    filter(input);
};

function filter(e) {
    let input = e;
    if (input === "ArrowUp") {
        display.innerHTML = history.innerHTML;
    }
    if (legalInput.test(input)) {
        display.innerHTML += input;
    } else if (input === "Backspace") {
        display.innerHTML = deleteLastChar(display.innerHTML);
    } else if (input === "c") {
        display.innerHTML = 0;
    } else if (input === "s") {
        display.innerHTML += "√("
    } else if (input === "Enter") {
        display.innerHTML += "=";
        history.innerHTML = deleteLastChar(display.innerHTML);
        display.innerHTML = operate(display.innerHTML)[0];
    }
};

function deleteLastChar(a) {
    a = a.substring(0, a.length - 1);
    return a;
};

function log(input, lastWasNum, hasOperator, inputSoFar, num1, operator, num2, result) {
    this.input = input;
    this.lastWasNum = lastWasNum;
    this.hasOperator = hasOperator;
    this.inputSoFar = inputSoFar;
    this.num1 = num1;
    this.operator = operator;
    this.num2 = num2;
    this.result = result;
}



function operate(str) {
    let lastWasNum = false;
    let hasOperator = false;
    let hasDot = false;
    let result = 0;
    let num1 = 0;
    let num2 = 0;
    let operator;
    let inputSoFar = "";
    let equation = str;
    let input;
    let i;
    display.innerHTML = "";

    loop1:
    for (i = 0; i < equation.length; i++) {
        input = equation[i];
        console.log(i, input, lastWasNum, hasOperator)
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
            case ".":
                lastWasNum = true;
                inputSoFar += input;
                break;

            case "+":
            case "-":
                // +/- are used as seperators of numbers
                if (lastWasNum) {
                    if (hasOperator) {
                        inputSoFar === "" ? num2 = 1 : num2 = Number(inputSoFar);
                        result += operateAdditionally(num1, operator, num2);
                        num1 = 0;
                        num2 = 0;
                        //iSF = input so that the +/- infront of the number is set
                        inputSoFar = input;
                    } else if (!hasOperator) {
                        result += Number(inputSoFar);
                        inputSoFar = input;
                    }
                } else if (!lastWasNum) {
                    inputSoFar = input;
                }
                lastWasNum = false;
                hasOperator = false;
                break;

            case "*":
            case "/":

                if (lastWasNum) {
                    if (hasOperator) {
                        //changed from inputSoFar = 1 to num2 = 1, as iSF wasn't used && to solve (1)*2
                        inputSoFar === "" ? num2 = 1 : num2 = Number(inputSoFar);
                        //!operator ? operator = "+" : 1;
                        num1 = operateAdditionally(num1, operator, num2);
                        operator = input;
                        num2 = 0;
                    } else if (!hasOperator) {
                        num1 = Number(inputSoFar);
                    }
                }
                hasOperator = true;
                operator = input;
                lastWasNum = false;
                inputSoFar = "";
                break;

            case "%":
                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Number(inputSoFar) / 100;
                        num1 = operateAdditionally(num1, operator, num2);
                    } else if (!hasOperator) {
                        num1 = Number(inputSoFar) / 100;
                    }
                }
                inputSoFar = "";
                operatorCheck.test(equation[i + 1]) ? inputSoFar = "1" : "";
                operator = "*";
                lastWasNum = true;
                hasOperator = true;
                break;

            case "(":
                let bracketEqt = equation.slice(i + 1, equation.length - 1);
                let bracketResults = operate(bracketEqt);
                i += bracketResults[1] + 1;
                //console.log(i, bracketResults, equation.length, bracketEqt);
                bracketEqt = bracketResults[0];
                if (lastWasNum) {
                    if (hasOperator) {
                        //Added if below to fix (2)(2)
                        inputSoFar === "" ? num2 = bracketEqt : num2 = Number(inputSoFar) * bracketEqt;
                        num1 = operateAdditionally(num1, operator, num2);
                        inputSoFar = "";
                        num2 = 0;
                        lastWasNum = false;
                    } else if (!hasOperator) {
                        num1 = bracketEqt * Number(inputSoFar);
                        inputSoFar = "";
                        hasOperator = true;
                        operator = "*";
                    }
                } else if (!lastWasNum) {
                    if (hasOperator) {
                        num2 = bracketEqt;
                        //num1 = instead of result+=, as this is more logical, and to fix 2*(3)
                        num1 = operateAdditionally(num1, operator, num2);
                        inputSoFar = "";
                        num2 = 0;
                    } else if (!hasOperator) {
                        //made num1 = bracketEqt + iSF (additionally) so that if +/- from iSF gets assigned. 
                        //Both are together in case a lone +/- was entered beforethat (2)+(2)
                        //Also made iSF = "". so that (5)+(4) works. 
                        num1 = Number(inputSoFar + bracketEqt);
                        inputSoFar = "";
                        hasOperator = true;
                        operator = "*"
                    }
                }
                hasOperator = true;
                lastWasNum = true;
                break;

            case "√":
                let sqrtNum = equation.slice(i + 2, equation.length - 1);
                console.log(sqrtNum);
                sqrtNum = operate(sqrtNum);
                i += sqrtNum[1]+2;
                sqrtNum = Math.sqrt(sqrtNum[0]);
                console.log("SQRTNUM " + sqrtNum);
                if (lastWasNum) {
                    if (hasOperator) {
                        //Added if below to fix (2)(2)
                        inputSoFar === "" ? num2 = sqrtNum : num2 = Number(inputSoFar) * sqrtNum;
                        num1 = operateAdditionally(num1, operator, num2);
                        inputSoFar = "";
                        num2 = 0;
                        lastWasNum = false;
                    } else if (!hasOperator) {
                        num1 = sqrtNum * Number(inputSoFar);
                        inputSoFar = "";
                        hasOperator = true;
                        operator = "*";
                    }
                } else if (!lastWasNum) {
                    if (hasOperator) {
                        num2 = sqrtNum;
                        //num1 = instead of result+=, as this is more logical, and to fix 2*(3)
                        num1 = operateAdditionally(num1, operator, num2);
                        inputSoFar = "";
                        num2 = 0;
                    } else if (!hasOperator) {
                        //made num1 = sqrtNum + iSF (additionally) so that if +/- from iSF gets assigned. 
                        //Both are together in case a lone +/- was entered beforethat (2)+(2)
                        //Also made iSF = "". so that (5)+(4) works. 
                        num1 = Number(inputSoFar + sqrtNum);
                        inputSoFar = "";
                        hasOperator = true;
                        operator = "*"
                    }
                }
                hasOperator = true;
                lastWasNum = true;
                break;

            case ")":
            case "=":
                break loop1;
                //using code below to exit loop when no "=" signs. Fixes (2)+2
                // if (equation.indexOf("=") < 0) {
                //     break loop1;
                // }
                // break;

        }
        let logs = new log(input, lastWasNum, hasOperator, inputSoFar, num1, operator, num2, result)
        console.table(logs);
    }

    if (lastWasNum) {
        if (hasOperator) {
            inputSoFar === "" ? num2 = 1 : num2 = Number(inputSoFar);
            result += operateAdditionally(num1, operator, num2);
            num1 = 0;
            num2 = 0;
        } else if (!hasOperator) {
            result += Number(inputSoFar);
        }
    } else if (!lastWasNum) {
        result += num1;
    }
    result = [result, i];

    console.log("RESULT " + result)
    return result;
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
        case "√":
            return Math.sqrt(num1);
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