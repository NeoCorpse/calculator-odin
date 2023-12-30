"use strict";

const clearBtn = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete')
const numBtns = [...document.querySelectorAll('.num')]
const operators = [...document.querySelectorAll('.op')]
const display = document.querySelector('.span2')
const former = document.querySelector('.span1')
const equals = document.querySelector('.equals')
const period = document.querySelector('.dot')
const myOps = ['+', '-', '*', '/'] 

let num = 0;
let resultDisplayed = false;

clearBtn.addEventListener('click', () => clear())

function clear() {
    display.textContent = 0
    former.textContent = ''
}

deleteBtn.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1)
})

numBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent == 0 && button.textContent == 0) return
        if (display.textContent == 0) display.textContent = ''
        if (display.textContent) clear
        let value = button.textContent
        display.textContent += value;
        resultDisplayed = false;
    })
})

operators.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent == 0) return
        let value = button.textContent
        former.textContent += `${display.textContent} ${value} `;
        display.textContent = 0
        resultDisplayed = false
    })
})

const myOperators = {
    sum(a, b) {
        return +a + +b
    },
    difference(a, b) {
        return a-b
    },
    multiply(a,b) {
        return a * b
    },
    divide(a,b) {
        return a / b
    }
}

equals.addEventListener('click', () => {
    former.textContent += `${display.textContent}`
    let x = former.textContent.split(' ')
    // if (myOps.includes(x[-1])) {
        
    // }
    let operators = x.filter(val => myOps.includes(val))
    let numbers = x.filter(val => !myOps.includes(val))
    let result = 0, current;
    let prev;
    let i = 0;

    // for (let i = 0; i < numbers.length; i++) {
    //     current = numbers[i]
    //     if (!prev) {
    //         prev = current
    //         continue;
    //     }
    //     switch (operators[i-1]) {
    //         case '+':
    //             result = myOperators.sum(current, result)
    //             prev = current
    //             break;
    //         case '-':
    //             result = myOperators.difference(current, prev)
    //             prev = current
    //             break;
    //         case '/':
    //             result = myOperators.divide(current, prev)
    //             prev = current
    //             break;
    //         case '*':
    //             result = myOperators.multiply(current, prev)
    //         default:
    //             break;
    //     }
    // }

    let myResult = numbers.reduce((total, number) => {
        switch(operators[i]) {
            case '+':
                total = myOperators.sum(total,number)
                break;
            case '-':
                total = myOperators.difference(total,number)
                break;
            case '*':
                total = myOperators.multiply(total, number)
                break;
            case '/':
                total = myOperators.divide(total, number)
        }
        i++;

        return total

    },)

    display.textContent = myResult
    console.log(myResult)
    resultDisplayed = true
})