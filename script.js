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
        if (resultDisplayed === true) {
            display.textContent = ''
            former.textContent = ''
        }
        let value = button.textContent
        display.textContent += value;
        resultDisplayed = false;
    })
})

operators.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.textContent
        if (display.textContent == 0) {
            // if (myOps.includes(former.textContent.slice(-2,-1))) former.textContent = `${former.textContent.slice(0,-2)}${value}`
            return
        } 
        if (resultDisplayed === true) {
            former.textContent = display.textContent
            display.textContent = ''
            console.log('woohoo')
        }
        
        former.textContent += `${display.textContent} ${value} `;
        display.textContent = 0
        resultDisplayed = false
    })
})

equals.addEventListener('click', () => {
    if (!former.textContent.includes('=')) {
        calculate();
    former.textContent += '=';
    resultDisplayed = true
    }
})

function calculate() {
    former.textContent += `${display.textContent}`
    let x = former.textContent.split(' ')

    let operators = x.filter(val => myOps.includes(val))
    let numbers = x.filter(val => !myOps.includes(val))
    let i = 0;

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

    display.textContent = `${myResult}`
    console.log(myResult)
}