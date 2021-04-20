class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.allClear()
    }
    myFunction(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    allClear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = ''
    }

    Del(){
        if(this.currentOperand !=""){
            this.currentOperand = this.currentOperand.slice(0,this.currentOperand.length-1);
        }
    }

    compute(){
    let computation 
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
        switch (this.operator) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case 'x':
            computation = prev * current
            break
        case '/':
            computation = prev / current
            break
        default:
            return
        }
        this.currentOperand = computation
        this.operator = ''
        this.previousOperand = ''
    }


    chooseOperator(operator){
        if (this.currentOperand === '') return (null)
        if (this.previousOperand !== '') {
        this.compute()
        }

        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
           integerDisplay = '' 
         } else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
            } 
        if (decimalDigits !=null) {
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
            }
       
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
            if (this.operator !== null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`
            }
        }
}
const numberButtons = document.querySelectorAll('[data-numbers]')
const operatorButtons = document.querySelectorAll('[data-operators]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
        calculator.myFunction(button.innerText)
        calculator.updateDisplay()
        })
    })

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
        })
    })

    equalsButton.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
    })

    allclearButton.addEventListener('click', button => {
        calculator.allClear()
        calculator.updateDisplay()
    })

    deleteButton.addEventListener('click', button => {
        calculator.Del()
        calculator.updateDisplay()
    })
