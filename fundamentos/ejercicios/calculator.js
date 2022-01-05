export default class Calculator {
    #currentNumber;
    #currentOperation;
    #nextNumber; 
    constructor(){
        this.reset();
    }
    reset(){
        this.#currentNumber = 0;
        this.#currentOperation = '+';
        this.#nextNumber = undefined;
    }
    operate(){
        let value = +this.#nextNumber;
        switch (this.#currentOperation){
            case '+':
                this.add(value);
                break;
            case '-':
                this.substract(value);
                break;
            case '*':
                this.multiply(value);
                break;
            case '/':
                this.divide(value);
                break;
        }
    }
    add(value){
        if (!Number.isNaN(value)){
            this.#currentNumber += +value;
        }
    }
    substract(value){
        if (!Number.isNaN(value)){
            this.#currentNumber -= +value;
        }
    }
    multiply(value){
        if (!Number.isNaN(value)){
            this.#currentNumber *= +value;
        }
    }
    divide(value){
        if (!Number.isNaN(value)){
            this.#currentNumber /= +value;
        }
    }
    number(value){
        if (!Number.isNaN(value)){
            if (this.#nextNumber){
                let number = +value;
                this.#nextNumber = this.#nextNumber*10 + number;
            } else {
                this.#nextNumber = +value;
            }
        }
    }
    operation(value){
        this.#currentOperation = value;
    }
    changeSign(){
        this.#nextNumber *= -1;
    }
    currentNumber(){
        return this.#currentNumber;
    }
    nextNumber(){
        return this.#nextNumber || 0;
    }
    currentOperation(){
        return this.#currentOperation;
    }
}