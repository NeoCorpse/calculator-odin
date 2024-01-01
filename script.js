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
    sum(a, b) {return +a + +b},
    difference(a, b) {return a-b},
    multiply(a,b) {return a * b},
    divide(a,b) {return a / b}
}

function clear () {
    former.textContent = ''
    display.textContent = 0
    ops = 0;
}

function removeFunction() {
    if (display.textContent.length > 1) display.textContent = display.textContent.slice(0,-1)
    else display.textContent = 0
}

//on operator click, calculate and update former
    //takes number in display, appends operator and puts in former
    //performs previous operation, puts answer and appends operator
    //0 is placed in display

operators.forEach(button => {
    button.addEventListener('click', ()=> {
        if (former.textContent.includes('=') || !former.textContent) {
            former.textContent = `${display.textContent} ${button.textContent}`
            display.textContent = 0
        } else if (former.textContent) {
        former.textContent += ` ${display.textContent}` 
        let x = former.textContent.split(' ')
        let ops = x.filter(value => myOps.includes(value))
        let nums = x.filter(value => !myOps.includes(value))
        let result;

        switch(ops[0]) {
            case '+':
                result = myOperators.sum(nums[0], nums[1])
                break;
            case '-':
                result = myOperators.difference(nums[0], nums[1])
                break;
            case '/':
                result = myOperators.divide(nums[0], nums[1])
                break;
            case '*':
                result = myOperators.multiply(nums[0], nums[1])
                break;
            default:
                console.log('ERROR')
        }
        former.textContent = `${result} ${button.textContent}`
        display.textContent = 0
        } 
    })
})

numBtns.forEach(button => {
    button.addEventListener('click', ()=> {
        if (display.textContent == 0) display.textContent = button.textContent
        else display.textContent += button.textContent
    })
})

clearBtn.addEventListener('click', () => {
    clear()
})

deleteBtn.addEventListener('click', ()=> {
    removeFunction()
})
//on equal click, append number in display to former and calculate
    //after, append equal sign
    // display contains final answer
    //after equal is clicked, pressing another button clears the calculator

equals.addEventListener('click', ()=> {
    if ((!former.textContent || former.textContent.includes('='))) {
        former.textContent = `${display.textContent} =`
    } else {
        former.textContent += ` ${display.textContent}`
        let x = former.textContent.split(' ')
        let ops = x.filter(value => myOps.includes(value))
        let nums = x.filter(value => !myOps.includes(value))
        let result;

        switch(ops[0]) {
            case '+':
                result = myOperators.sum(nums[0], nums[1])
                break;
            case '-':
                result = myOperators.difference(nums[0], nums[1])
                break;
            case '/':
                result = myOperators.divide(nums[0], nums[1])
                break;
            case '*':
                result = myOperators.multiply(nums[0], nums[1])
                break;
            default:
                console.log('ERROR')
        }
        former.textContent = `${x.join(' ')} =`
        display.textContent = result
    }
})

period.addEventListener('click', () => {
    if (!display.textContent.includes('.')) display.textContent += '.'
})