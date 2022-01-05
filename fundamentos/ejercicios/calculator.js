export default class Calculator {
    #currentNumber;
    #currentOperation;
    #nextNumber;
    #negative;
    #blocked;
    #decimal;
    constructor(){
        this.init();
    }
    init(){
        this.#currentNumber = 0;
        this.#currentOperation = '+';
        this.reset();
    }
    reset(){
        this.#nextNumber = "";
        this.#negative = false;
        this.#blocked = false;
        this.#decimal = false;
    }
    operate(){
        if (this.#nextNumber){
            let value = this.nextNumber();
            switch (this.#currentOperation){
                case '+':
                    this.add(value);
                    break;
                case '-':
                    this.substract(value);
                    break;
                case 'x':
                    this.multiply(value);
                    break;
                case '/':
                    this.divide(value);
                    break;
            }
            this.reset();
        }
    }
    add(value){
        this.#currentNumber += value;
    }
    substract(value){
        this.#currentNumber -= value;
    }
    multiply(value){
        this.#currentNumber *= value;
    }
    divide(value){
        this.#currentNumber /= value;
    }
    number(value){
        if (!Number.isNaN(value)){
            this.#nextNumber += value;
        }
    }
    back(){
        if (this.#nextNumber.length){
            this.#nextNumber = this.#nextNumber.slice(0,-1);
        }
    }
    block(){
        this.#blocked = true;
    }
    isBlocked(){
        return this.#blocked;
    }
    operation(value){
        this.#currentOperation = value;
    }
    changeSign(){
        this.#negative = !this.#negative;
    }
    decimal(){
        if (!this.#decimal){
            this.#nextNumber += ".";
            this.#decimal = true;
        }
    }
    currentNumber(){
        return this.#currentNumber;
    }
    nextNumber(){
        if (!this.#nextNumber){
            return 0;
        }
        let number = Number.parseFloat(this.#nextNumber);
        if (this.#negative) {
            number *= -1;
        }
        return number;
    }
    currentOperation(){
        return this.#currentOperation;
    }
}