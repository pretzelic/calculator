const display = document.getElementById('result');
const legalInput = /[0-9-.+*\/]/;
const number = /[0-9.]/;
const operatorCheck = /[*\/]/
const plusMinus = /[+-]/;
const errorMessage = "ERROR!!!"
let nums = [];
let submitted = ""
let lastWasNum = false;
let hasOperator = false;
let hasDot = false;
display.innerHTML = 0;

document.addEventListener('keydown', filter);

function filter(e) {
    let input = e.key;
    if (display.innerHTML == 0 || display.innerHTML === errorMessage) {
        display.innerHTML = '';
    }if(legalInput.test(input)) {
        submitted += input;
        display.innerHTML += input;
    }else if(input === "Enter" || input==="=") {
        submitted+= "=";
        operate(submitted);
    }
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
      if (hasDot && input === ".") {
        console.log("error - too many dots")
      } else if (!hasDot && input === ".") {
        hasDot = true;
      }
      if (!lastWasNum) {
        if (input === "=") {
          console.log("error, need numbers before the =")
          hasDot = false;
          hasOperator = false;
          lastWasNum = false;
        }
        if (!hasOperator) {
          if (number.test(input)) {
            inputSoFar += input
            lastWasNum = true;
          } else if (plusMinus.test(input)) {
            inputSoFar += input;
          } else if (operatorCheck.test(input)) {
            console.log("error, must have number before that");
          } 
        }else if (hasOperator) {
            if (number.test(input)) {
                console.log(1, input, inputSoFar);
              inputSoFar += input;
              lastWasNum = true;
            } else if (plusMinus.test(input)) {
              inputSoFar += input;
            } else if (operatorCheck.test(input)) {
              console.log("error, must have number before that")
            }
          }
        } else if (lastWasNum) {
        if (!hasOperator) {
          if (number.test(input)) {
            inputSoFar += input;
          } else if (plusMinus.test(input)) {
            result += Number(inputSoFar);
            inputSoFar = "";
            operator = input;
            hasOperator = true;
          } else if (operatorCheck.test(input)) {
            operator = input;
            num1 = Number(inputSoFar)
            inputSoFar = "";
            hasOperator = true;
            lastWasNum = false;
          } else if (input === "=") {
            result += Number(inputSoFar);
            display.innerHTML = result;
            input = result;
          }
        } else if (hasOperator) {
          if (number.test(input)) {
            inputSoFar += input;
            lastWasNum = true;
          } else if (plusMinus.test(input)) {
            num2 = Number(inputSoFar);
            result += operateAdditionally(num1, operator, num2);
            num1 = 0;
            num2 = 0;
            operator = input;
            inputSoFar = "";
          } else if (operatorCheck.test(input)) {
            num2 = Number(inputSoFar);
            lastWasNum = false;
            num1 = operateAdditionally(num1, operator, num2);
            operator = input;
            num2 = 0;
            inputSoFar = "";
          } else if (input === "=") {
            num2 = Number(inputSoFar);
            result += operateAdditionally(num1, operator, num2);
            num1 = 0;
            num2 = 0;
          }
        }
      }
      console.table(`input = ${input}, inputSoFar = ${inputSoFar}, operator = ${operator}, num1 = ${num1}, num2=${num2}, hasOperator = ${hasOperator}, lastWasNum = ${lastWasNum}, result = ${result}}`)
    }
    display.innerHTML = result;
    submitted=result;
    hasOperator = false;
  }
  

function operateAdditionally(a, b, c) {
    let num1 = a;
    let operator = b;
    let num2 = c;
    switch(operator) {
        case "+":
            return num1+num2;
            break;
        case "-":
            return num1-num2;
            break;
        case "*":
            return num1*num2;
            break;
        case "/":
            return num1/num2;
            break;
    }
}