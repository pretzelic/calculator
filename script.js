const display = document.getElementById('result');
const history = document.getElementById('history');
const legalInput = /[0-9-+*.\/%()]/;
const number = /[0-9]/;
const operatorCheck = /[*\/]/
const plusMinus = /[+-]/;
const errorMessage = "ERROR!!!"

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
        submitted = "";
        display.innerHTML = 0;
    } else if (input === "s") {
        submitted += "√";
        display.innerHTML += "√"
    } else if (input === "Enter") {
        display.innerHTML += "=";
        history.innerHTML = deleteLastChar(display.innerHTML);
        display.innerHTML = operate(display.innerHTML);
    }
};

function deleteLastChar(a) {
    a = a.substring(0, a.length - 1);
    return a;
};

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
    display.innerHTML = "";

    for (let i = 0; i < equation.length; i++) {
        let input = equation[i];
        console.log(input);
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
                if (lastWasNum) {

                } else if (!lastWasNum) {
                    if (hasOperator) {

                    } else if (!hasOperator) {

                    }
                }
                inputSoFar += input;
                lastWasNum = true;

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
                lastWasNum = false;
                break;

            case "*":
            case "/":

                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Number(inputSoFar);
                        lastWasNum = false;
                        !operator ? operator = "+" : 1;
                        num1 = operateAdditionally(num1, operator, num2);
                        operator = input;
                        num2 = 0;
                    } else if (!hasOperator) {
                        num1 = Number(inputSoFar);
                        hasOperator = true;
                    }

                } else if (!lastWasNum) {
                    if(hasOperator) {

                    }else if(!hasOperator) {
                        hasOperator = true;
                        operator = "*"
                    }
                }
                operator = input;
                lastWasNum = false;
                inputSoFar = "";
                break;

            case "%":
                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Number(inputSoFar) / 100;
                        result += operateAdditionally(num1, operator, num2);
                    } else if (!hasOperator) {
                        result += Number(inputSoFar) / 100;
                    }
                    inputSoFar = "";
                } else if (!lastWasNum) {
                    console.log("error")
                }
                break;

            case "(":
                let brcktEqt = equation.slice(equation.indexOf("(") + 1, equation.lastIndexOf(")"));
                i += brcktEqt.length;
                brcktEqt += "=";
                console.log(brcktEqt);
                brcktEqt = operate(brcktEqt);
                console.log(brcktEqt);
                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Number(inputSoFar) * brcktEqt;
                        console.log(inputSoFar);
                        num1 = operateAdditionally(num1, operator, num2);
                        inputSoFar = "";
                        num2 = 0;
                        lastWasNum = false;
                    } else if (!hasOperator) {
                        hasOperator = true;
                        operator = "*"
                        num1 = brcktEqt;
                        num2 = Number(inputSoFar);
                        inputSoFar = "";
                    }
                } else if (!lastWasNum) {
                    if (hasOperator) {
                        num2 = brcktEqt;
                        num1 = operateAdditionally(num1, operator, num2);
                        inputSoFar = "";
                        num2 = 0;
                        hasOperator = false;
                        lastWasNum = false;
                    } else if (!hasOperator) {
                        num1 = brcktEqt
                        hasOperator = true;
                        operator = "*"
                    }
                }
                break;

                case ")":
                    if(lastWasNum) {

                    }else if (!lastWasNum){
                        if(hasOperator) {
                            operator = "*";
                        }
                    }
                    break;


            case "√":
                if (lastWasNum) {
                    if (hasOperator) {
                        num2 = Math.sqrt(Number(inputSoFar));
                        num1 += operateAdditionally(num1, operator, num2);
                        operator = input;
                    } else if (!hasOperator) {
                        result += Math.sqrt(Number(inputSoFar));
                    }
                    inputSoFar = "";
                } else if (!lastWasNum) {
                    console.log("error")
                }
                break;

            case "=":
                if (lastWasNum) {
                    if (hasOperator) {
                        num2 += Number(inputSoFar);
                        console.log (num1, operator, num2)
                        result += operateAdditionally(num1, operator, num2);
                        num1 = 0;
                        num2 = 0;
                    } else if (!hasOperator) {
                        result += Number(inputSoFar);
                        console.log(result);
                    }
                } else if (!lastWasNum) {
                    if (hasOperator) {
                        operator = "+";
                        result += operateAdditionally(num1, operator, num2);
                    } else if (!hasOperator) {
                        result = Number(inputSoFar);
                    }
                    console.log("error, need numbers before the =");
                    hasOperator = false;
                    lastWasNum = false;
                }
                break;

        }
        console.table(`input = ${input}, inputSoFar = ${inputSoFar}, \n
         operator = ${operator}, num1 = ${num1}, num2=${num2}, \n
         lastWasNum = ${lastWasNum}, hasOperator = ${hasOperator}, result = ${result}`)
    }
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