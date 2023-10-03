document.addEventListener('DOMContentLoaded', function(){    


    function add(a, b){
    return a + b;
    }

function subtract(a, b){
    return  a - b
    }

function multiply(a, b){
    return a * b
    }

    function divide(a, b){
        return a / b
    }

        
    function operate(firstNum, operator, secondNum){
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum)
        
        if(operator === '+'){
            return add(firstNum, secondNum)
        }else if(operator === '-'){
            return subtract(firstNum, secondNum)
        }else if(operator === '*'){
            return multiply(firstNum, secondNum)
        }else if(operator === '/'){
            if(secondNum === 0){
                return 'Error: Division by zero'
            }
            return divide(firstNum, secondNum)
        }else{return 'invalid operator'}
    }
    
    let firstNum = '0'
    let secondNum = '0'
    const FirstNumDisplay = document.querySelector('.upper-num')
    const secondNumDisplay = document.querySelector('.bottom-num')
    secondNumDisplay.textContent = firstNum.toString()
    let operator = ''
    let replaceFirstNum = false
    let operatorActive = false
   
    
    for(let i = 0; i < 10; i++){
        const numericButton = document.getElementById(i.toString())
        document.addEventListener('keydown', e => {
            if (e.key === i.toString()){
                numericButton.click()
            }
            
        })
        const buttonElement = document.getElementById(i.toString())
        buttonElement.addEventListener('click', e => {
            if(!operatorActive){
                    if(replaceFirstNum){
                        firstNum = parseFloat(buttonElement.textContent);
                        replaceFirstNum = false
                    }
                    else{
                        if(firstNum.toString().length < 16){
                            firstNum = parseFloat(firstNum.toString()+ buttonElement.textContent)    
                        }
                    }
                    secondNumDisplay.textContent = firstNum.toString()
            }else{ 
                    if (secondNum.toString().length < 16){
                        secondNum = parseFloat(secondNum.toString() + buttonElement.textContent)
                        secondNumDisplay.textContent = secondNum.toString()
                        replaceFirstNum = true
                    }
                }
                
            });
            
        buttonElement.addEventListener('mouseenter', e => {
            buttonElement.style.backgroundColor = 'lightblue'
        })
        
        buttonElement.addEventListener('mouseleave', e => {
            buttonElement.style.backgroundColor = ''
        })
                    
    }
    
    let operators = [
        {button: document.getElementById('sum'), value: '+'},
        {button: document.getElementById('minus'), value: '-'},
        {button: document.getElementById('multiply'), value: '*'},
        {button: document.getElementById('divide'), value: '/'}
    ]
        
     operators.forEach(operatorObj => {
        operatorObj.button.addEventListener('click', e => {
            handleOperatorClick(operatorObj.value);
        })

        document.addEventListener('keydown', e => {
            if(e.key === operatorObj.value){
                handleOperatorClick(operatorObj.value)
            }
        })

        operatorObj.button.addEventListener('mouseenter', e => {
            operatorObj.button.style.transform = 'scale(1.07)'
        })
        
        operatorObj.button.addEventListener('mouseleave', e => {
            operatorObj.button.style.transform = ''
        })
        function handleOperatorClick(clickedOperator){
            if (operatorActive && !replaceFirstNum) {
                secondNum = parseFloat(secondNumDisplay.textContent);
                firstNum = operate(firstNum, operator, secondNum);
                secondNum = '0';
                secondNumDisplay.textContent = secondNum.toString();
            } else {
                if (operator !== '' && replaceFirstNum) {
                    secondNum = parseFloat(secondNumDisplay.textContent);
                    firstNum = operate(firstNum, operator, secondNum);
                    secondNum = '0';
                    secondNumDisplay.textContent = secondNum.toString();
                }
                operator = clickedOperator;
                replaceFirstNum = true;
                operatorActive = true;
                FirstNumDisplay.textContent = firstNum.toString() + ' ' + operator.toString();
            }
        }
        
    })
    
    
    const equalBtn = document.getElementById('equal')
    equalBtn.addEventListener('click', calculateResult)
        document.addEventListener('keydown', function (event) {
            if (event.key === "Enter" || event.key === "=") {
                calculateResult();
            }
        })
    function calculateResult(){
        if(operator!== ''){
            secondNum = parseFloat(secondNumDisplay.textContent)
            let calculateResult = operate(firstNum, operator, secondNum)
            calculate = parseFloat(calculateResult.toFixed(15))
            FirstNumDisplay.textContent = `${firstNum} ${operator} ${secondNum} =`
            secondNumDisplay.textContent = calculate.toString()
            firstNum = calculate
            operator = ''
            operatorActive = false
        }
    }

equalBtn.addEventListener('mouseenter', e => {
        equalBtn.style.backgroundColor = 'lightblue'
        })
    equalBtn.addEventListener('mouseleave', e => {
        equalBtn.style.backgroundColor = ''
    })
      
    
    
    const dotBtn = document.getElementById('dot')
    dotBtn.addEventListener('mouseenter', e => {
        dotBtn.style.backgroundColor = 'lightblue'
    })
    dotBtn.addEventListener('mouseleave', e => {
        dotBtn.style.backgroundColor = ''
    })
    
    
        dotBtn.addEventListener('click', addDot)

        document.addEventListener('keydown', e => {
            if(e.key === '.'){
                addDot()
            }
        })

        function addDot(){
            if(operatorActive && replaceFirstNum){
                secondNum += '.';
                secondNumDisplay.textContent = secondNum;
                replaceFirstNum = false;
            }else if(operatorActive && !secondNum.toString().includes('.')){
                secondNum += '.';
                secondNumDisplay.textContent = secondNum;
            }else if(!operatorActive && !firstNum.toString().includes('.')){
                firstNum += '.'
                secondNumDisplay.textContent = firstNum;
            }
        }
    
    
    const clearBtn = document.getElementById('btn2')
    clearBtn.addEventListener('click', e => {

        secondNumDisplay.textContent = '0'
        FirstNumDisplay.textContent = ''
        firstNum = '0'
        secondNum = '0'
        operator = ''
        replaceFirstNum = false
        operatorActive = false
        operatorActive = false
    })
    

    clearBtn.addEventListener('mouseenter', e => {
        clearBtn.style.transform = 'scale(1.04)'
        })
        clearBtn.addEventListener('mouseleave', e => {
        clearBtn.style.transform = ''
        })

    const removeBtn = document.getElementById('btn1')
    removeBtn.addEventListener('click', removeButton)
        
    document.addEventListener('keydown', e => {
        if(e.key === 'Backspace'){
            removeButton();
        }
    })
    
    function removeButton(){
        if (operatorActive) {
            secondNum = secondNum.toString().slice(0, -1);
            secondNumDisplay.textContent = secondNum || '0'; 
        } else if (operator) {
            operator = '';
            FirstNumDisplay.textContent = firstNum;
        }else {
            firstNum = firstNum.toString().slice(0, -1);
            secondNumDisplay.textContent = firstNum || '0';
        }
    }
    
    
        removeBtn.addEventListener('mouseenter', e => {
        removeBtn.style.transform = 'scale(1.04)'
        })
        removeBtn.addEventListener('mouseleave', e => {
        removeBtn.style.transform = ''
        })


   
})
   
    
    
    
    