export function Calculator(outputFunction, resumeFunction) {
    let ref = this;
    // To show the user an output/resume
    if (outputFunction && typeof(outputFunction) !== 'function'){
        throw new Error('A function is required to show the output')
    }
    ref.fnOutput = outputFunction;
    ref.showOutput = function(value){
		if (typeof(ref.fnOutput) === 'function'){
            ref.fnOutput(value);
        }
    }
    if (resumeFunction && typeof(resumeFunction) !== 'function'){
        throw new Error('A function is required to show the resume')
    }
    let resume = '';
    ref.fnResume = resumeFunction;
    ref.showResume = function(value){
		if (typeof(ref.fnResume) === 'function'){
            ref.fnResume(value);
        }
    }
    // The variables needed to operate
    let currentNumber = 0;
    ref.currentValue = function(value){
        if(value){
            currentNumber = value;
        }
        return currentNumber;
    }
    let nextNumber = '';
    let negative = false;
    let decimal = false;
    let completed = false;
    ref.nextValue = function(value){
        if(value){
            nextNumber = value;
        }
        if (ref.isNextEmpty()){
            return 0;
        }
        let number = Number.parseFloat(nextNumber);
        if (negative) {
            number *= -1;
        }
        return number;
    }
    ref.isNextEmpty = function(){
        if(!nextNumber || nextNumber === '.'){
            return true;
        }
        return false;
    }
    let nextOperation = '+';
    ref.operation = function(value){
        if(value){
            nextOperation = value;
        }
        return nextOperation;
    }
    // Reset all variables related to nextNumber
    ref.resetNextNumber = function(){
        nextNumber = '';
        negative = false;
        decimal = false;
    }
    // Initial configuration of variables related to operations
    ref.init = function(){
        currentNumber = 0;
        nextOperation = '+';
        resume = '';
        completed = false;
        ref.resetNextNumber();
        ref.showResume(resume);
        ref.showOutput(currentNumber);
    }
    ref.init();
    // To do the next planned operation
    ref.operate = function(){
        let value = ref.nextValue();
        switch (nextOperation){
            case '+':
                ref.add(value);
                break;
            case '-':
                ref.substract(value);
                break;
            case 'x':
                ref.multiply(value);
                break;
            case '/':
                ref.divide(value);
                break;
        }
        currentNumber = Number.parseFloat(currentNumber.toPrecision(15));
        ref.resetNextNumber();
    }
    // The supported operations
    ref.add = function(value){
        currentNumber += value;
    }
    ref.substract = function(value){
        currentNumber -= value;
    }
    ref.multiply = function(value){
        currentNumber *= value;
    }
    ref.divide = function(value){
        currentNumber /= value;
    }
    // The actions for the user
    ref.pressNumber = function(value){
        if (completed){
            ref.init();
        }
        if (!Number.isNaN(value) && nextNumber.length < 9){
            nextNumber += value;
            ref.showOutput(nextNumber);
        }
    }
    ref.pressOperation = function(value){
        if (!'+-x/='.includes(value)){
            throw new Error('Operation not supported yet');
        }
        if (nextNumber.length) {
            resume += ' '+ref.nextValue();
            ref.operate();
        } else {
            resume = resume.slice(0,-2);
            if(!resume.length) {
                resume += ' '+ref.nextValue();
            }
        }
        if (completed) {
            resume = ''+currentNumber;
        }
        resume += ' '+value;
        ref.operation(value);
        ref.showResume(resume);
        ref.showOutput(currentNumber);
        if('=' === value){
            completed = true;
        } else {
            completed = false;
        }
    }
    ref.pressDecimal = function(){
        if (completed){
            ref.init();
        }
        if (!decimal){
            if (nextNumber === ''){
                nextNumber = '0';
            }
            nextNumber += '.';
            decimal = true;
            ref.showOutput(nextNumber);
        } else {
            console.log('The number is already decimal');
        }
    }
    ref.changeSign = function(){
        if(ref.nextValue()){
            negative = !negative;
            ref.showOutput(nextNumber);
        }
    }
    ref.goBack = function(){
        if (nextNumber.length){
            nextNumber = nextNumber.slice(0,-1);
            if(nextNumber.length){
                ref.showOutput(nextNumber);
            } else {
                ref.showOutput('0');
            }
        }
    }
}

export function convertPositiveIntegerTo(value = '0', nDigits = '2'){
    if (typeof value === 'number'){
        if (Number.isInteger(value) && 0<=value<=999999999){
            return value.toString(nDigits);
        }
    }
    if (typeof value === 'string' || value instanceof String){
        if (!value.includes('-') && !value.includes('.') && value.length <= 10){
            return Number.parseInt(value).toString(nDigits);
        }
    }
    return '-';
}