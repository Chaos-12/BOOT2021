export default class Calculator {
    #currentNumber;
    #nextOperation;
    #nextNumber;
    #negative;
    #decimal;
    #resume;
    #blocked;
    constructor(fnOutput, fnResume){
        if (fnOutput && typeof (fnOutput) !== 'function'){
		    throw new Error('A function is required to show the output')
        }
        if (fnResume && typeof (fnResume) !== 'function'){
		    throw new Error('A function is required to show the resume')
        }
        this.fnOutput = fnOutput;
        this.fnResume = fnResume;
        this.init();
    }
    init(){
        this.#currentNumber = 0;
        this.#nextOperation = '+';
        this.#resume = '';
        this.resetNextNumber();
        this.showResume(this.#resume);
        this.showOuput(this.#currentNumber);
    }
    resetNextNumber(){
        this.#nextNumber = '';
        this.#negative = false;
        this.#blocked = false;
        this.#decimal = false;
    }
    showOuput(value){
		if (typeof(this.fnOutput) === 'function'){
            this.fnOutput(value);
        }
    }
    showResume(value){
		if (typeof(this.fnResume) === 'function'){
            this.fnResume(value);
        }
    }
    operate(){
        let value = this.nextNumber();
        switch (this.#nextOperation){
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
        this.resetNextNumber();
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
    pressNumber(value){
        if (!Number.isNaN(value)){
            this.#nextNumber += value;
        }
    }
    pressOperation(value){
        if (!'+-x/'.includes(value)){
            throw new Error('Operation no supported yet');
        }
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
    changeSign(){
        this.#negative = !this.#negative;
        this.showOuput(this.nextNumber());
    }
    decimal(){
        if (!this.#decimal){
            this.#nextNumber += '.';
            this.#decimal = true;
            this.showOuput(this.nextNumber()+'.');
        } else {
            console.log('The number is already decimal')
        }
    }
    back(){
        if (this.#nextNumber.length){
            this.#nextNumber = this.#nextNumber.slice(0,-1);
            this.showOuput(this.nextNumber());
        }
    }
    block(){
        this.#blocked = true;
    }
    isBlocked(){
        return this.#blocked;
    }
    set operation(value){
        this.#nextOperation = value;
    }
}