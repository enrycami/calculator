let a = null;
let b = null;
let result = null;
let operator = null;
let opSelected = false

const previousScreen = document.querySelector("#previousScreen")
const currentScreen = document.querySelector("#currentScreen");
currentScreen.textContent = 0;
previousScreen.textContent = "";

// functions for basic arithmetic calculations:
// - add -subtract - multiply - divide
function add(a, b) {
    return Math.round((a + b) * 1000) / 1000;
}

function subtract (a, b){
    return Math.round((a - b) * 1000) / 1000;
}

function multiply (a, b){
    return Math.round((a * b) * 1000) / 1000;
}

function divide (a, b){
    if (b === 0){
        return "You can't divide by zero, silly"
    } else {
        return Math.round((a / b) * 1000) / 1000;
    }
}

// operate function take two number and an operator and does the appropriate basic calculation

function operate(a, b, operator) {
    switch (operator){
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}

let allBtns = document.querySelectorAll('button')
for (const btn of allBtns) {
    btn.addEventListener('click', function(event){
        let value = event.target.textContent;
        let numbers = '0123456789.'.split('')
        let operators = '+-*/='.split('')

        if (numbers.includes(value)){        
            numberPress(value);
        } else if(operators.includes(value)){
            operatorPress(value);
        } else if (value === "DEL") {
            currentScreen.textContent = currentScreen.textContent.slice(0, -1);
            // Clear all button reset everything as it was at the start
        } else if (value === "Clear All"){
            a = null;
            b = null;
            result = null;
            operator = null;
            opSelected = false;
            currentScreen.textContent = 0;
            previousScreen.textContent = "";
        }
    })
} 

function numberPress(value){
    if (currentScreen.textContent === "0" || Number(currentScreen.textContent) === result || currentScreen.textContent === result){
        currentScreen.textContent = "";
        currentScreen.textContent += value;
    } else if (currentScreen.textContent.length < 10){
        currentScreen.textContent += value;
    }
}

function operatorPress(value){
    if (isNaN(a)){
        currentScreen.textContent = 0;
        a = 0;        
    }
    switch(value){
        case '+':
            // fall-through
        case '-':
            // fall-through
        case '*':
            // fall-through
        case '/':
            // fall-through
            if (opSelected === true){
                operatorPress('=');
                opSelected = true;
                operator = value;
                previousScreen.textContent = a + " " + operator;
                currentScreen.textContent = 0;
            } else {
                a = Number(currentScreen.textContent);
                operator = value;
                opSelected = true;
                previousScreen.textContent = a + " " + operator;
                currentScreen.textContent = 0;
            }
            break;
        case '=':
            if(operator === null){
                break;
            }
            b = Number(currentScreen.textContent);
            result = operate(a, b, operator);
            opSelected = false;
            operator = null;
            previousScreen.textContent += " " + b + " =";
            currentScreen.textContent = result;
            a = result;
            b = 0;
            break;
    }
}

