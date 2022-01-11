
import {Calculator, convertPositiveIntegerTo as convertTo} from "../calculator/calculator.js";

describe("Calculator tests:", function(){
    let calc = null;

    beforeEach(function(){
        calc = new Calculator();
    });

    describe("Input a string:", function(){
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '12', '456','123456789'];
        numbers.forEach(number => {
            it(`Press number ${number}`, function(){
                for(let i=0; i<number.length; i++){
                    calc.pressNumber(number[i]);
                }
                expect(calc.nextValue()).toBe(number);
            });
        });
    });

    describe("Input an operation:", function(){
        let operations = ['+', '-', 'x', '/', '=']
        operations.forEach(op => {
            it(`Press operation ${op}`, function(){
                calc.pressOperation(op);
                expect(calc.operation()).toBe(op);
            });
        });
    });

    describe("Testing operations:", function(){
        describe("Regular operations", function(){
            let cases = [
                {a:4, op:'+', b:5, r:9},
                {a:0, op:'+', b:0, r:0},
                {a:2, op:'+', b:-3, r:-1},
                {a:19, op:'-', b:0, r:19},
                {a:2, op:'-', b:2, r:0},
                {a:-28, op:'-', b:3, r:-31},
                {a:3, op:'x', b:6, r:18},
                {a:-2, op:'x', b:6, r:-12},
                {a:4.5, op:'x', b:2, r:9},
                {a:10, op:'/', b:4, r:2.5},
                {a:-10, op:'/', b:-4, r:2.5},
                {a:3, op:'/', b:3, r:1},
            ];
            cases.forEach(c => {
                it(`${c.a} ${c.op} ${c.b} = ${c.r}`, function(){
                    calc.nextValue(c.a);
                    calc.pressOperation(c.op);
                    calc.nextValue(c.b);
                    calc.pressOperation('=');
                    expect(calc.currentValue()).toEqual(c.r);
                });
            });
        });

        describe("Conflictive cases", function(){
            let cases = [
                {a:0.1, op:'+', b:0.2, r:0.3},
                {a:'1', op:'/', b:'0', r:Infinity},
                {a:Infinity, op:'+', b:'0', r:Infinity},
                {a:Infinity, op:'x', b:'2', r:Infinity},
                {a:Infinity, op:'-', b:'3', r:Infinity},
                {a:Infinity, op:'/', b:'-2', r:-Infinity},
                {a:Infinity, op:'/', b:'0', r:Infinity},
            ];
            cases.forEach(c => {
                it(`${c.a} ${c.op} ${c.b} = ${c.r}`, function(){
                    calc.nextValue(c.a);
                    calc.pressOperation(c.op);
                    calc.nextValue(c.b);
                    calc.pressOperation('=');
                    expect(calc.currentValue()).toBe(c.r);
                });
            });
        });
    });

    describe("Support functionalities:", function(){
        it("Change sign", function(){
            calc.nextValue(0);
            expect(calc.nextValue()).not.toContain('-');
            calc.changeSign();
            expect(calc.nextValue()).not.toContain('-');
            calc.nextValue(1);
            calc.changeSign();
            expect(calc.nextValue()).toContain('-');
            calc.changeSign();
            expect(calc.nextValue()).not.toContain('-');
        });
        it("Decimal", function(){
            expect(calc.nextValue()).not.toContain('.');
            calc.pressDecimal();
            expect(calc.nextValue()).toContain('.');
            expect(calc.nextValue().split('.').length).toBe(2);
            calc.pressDecimal();
            expect(calc.nextValue()).toContain('.');
            expect(calc.nextValue().split('.').length).toBe(2);
        });
        it("Reset", function(){
            calc.pressNumber('3');
            calc.pressOperation('+');
            calc.init();
            expect(calc.nextValue()).toBe('0');
        });
        it("GoBack", function(){
            calc.pressNumber('7');
            calc.pressNumber('3');
            calc.goBack();
            expect(calc.nextValue()).toBe('7');
            calc.pressDecimal();
            calc.goBack();
            expect(calc.nextValue()).toBe('7');
        });
    });
    
    describe("Conversion tests:", function(){
        let cases = [
            [0,'0','0','0'],
            [8,'1000','10','8'],
            [16,'10000','20','10'],
            [5,'101','5','5'],
        ];
        describe("Convert to binary:", function(){
            cases.forEach(c => {
                it(`Bin(${c[0]})=${c[1]}`, function(){
                    expect(convertTo(c[0],'2')).toBe(c[1]);
                });
            });
        });
        describe("Convert to octal:", function(){
            cases.forEach(c => {
                it(`Oct(${c[0]})=${c[2]}`, function(){
                    expect(convertTo(c[0],'8')).toBe(c[2]);
                });
            });
        });
        describe("Convert to hexadecimal:", function(){
            cases.forEach(c => {
                it(`Hex(${c[0]})=${c[3]}`, function(){
                    expect(convertTo(c[0],'16')).toBe(c[3]);
                });
            });
        });
    });
});
