
import {randomFromRange, getRepeatedArray, isValidNif, isPalindrome} from "../ejercicios/ejercicios1.js";

describe("Ejercicios Bloque 1", function(){

    describe("Ejercicio 1: Random Number", function(){

        it(`Returns a number`, function(){
            let random = randomFromRange(100,1);
            expect(typeof random).toBe('number');
        });

        function intervalTest(range, from){
            let random = randomFromRange(range, from);
            expect(random).toBeGreaterThanOrEqual(Number.parseFloat(from));
            expect(random).toBeLessThanOrEqual(Number.parseFloat(from) + Number.parseFloat(range));
            return random;
        }
        
        [{range: 1, from: 0}, {range: 10, from: 2}, 
            {range: 4, from: -9}, {range: 100, from:-20}]
        .forEach(value => {
            it(`Random number contained in interval [${value.from}, ${value.from+value.range}]`, function(){
                intervalTest(value.range, value.from);
            });
        });

        it(`From = undefined`, function(){
            let range = 100;
            let random = randomFromRange(range, undefined);
            expect(random).toBeGreaterThanOrEqual(0);
            expect(random).toBeLessThanOrEqual(0 + Number.parseFloat(range));
        });

        it(`From = null`, function(){
            let range = 100;
            let random = randomFromRange(range, null);
            expect(random).toBeGreaterThanOrEqual(0);
            expect(random).toBeLessThanOrEqual(0 + Number.parseFloat(range));
        });

        it(`Range = undefined`, function(){
            let from = 0;
            let random = randomFromRange(undefined, from);
            expect(random).toBeGreaterThanOrEqual(Number.parseFloat(from));
            expect(random).toBeLessThanOrEqual(Number.parseFloat(from) + 1);
        });

        it(`Range = null`, function(){
            let from = 0;
            let random = randomFromRange(null, from);
            expect(random).toBeGreaterThanOrEqual(Number.parseFloat(from));
            expect(random).toBeLessThanOrEqual(Number.parseFloat(from) + 1);
        });

        it(`Range = 0`, function(){
            intervalTest(0,0);
        })

        it(`Range < 0`, function(){
            expect(() => randomFromRange(-3,0)).toThrow();
        })

        it(`Range as String`, function(){
            expect(typeof intervalTest('100', -4)).toBe('number');
        });

        it(`From as String`, function(){
            expect(typeof intervalTest(100, '-30')).toBe('number');
        });

        it(`3 arguments`, function(){
            let range = 100;
            let from = 0;
            let other = 34;
            let random = randomFromRange(range, from, other);
            expect(from <= random).toBe(true);
            expect(random <= from + range).toBe(true);
        });
    });

    describe("Ejercicio 3: Array Builder", function(){

        it(`Array contains repeated values`, function(){
            let value = 7;
            let array = getRepeatedArray(5,value);
            for (let i=0; i < array.length; i++){
                expect(array[i]).toBe(value);
            }
        });

        it('Length > 0', function(){
            let array = getRepeatedArray(3,4);
            expect(array.length).toBe(3);
        });

        it('Length as String', function(){
            let array = getRepeatedArray('3',9);
            expect(array.length).toBe(3);
        })

        it('Length <= 0', function(){
            let array = getRepeatedArray(-7,9);
            expect(array.length).toBe(0);
        });

        it('Length = undefined', function(){
            let array = getRepeatedArray(undefined,9);
            expect(array.length).toBe(0);
        })

        it('Length = null', function(){
            let array = getRepeatedArray(null,9);
            expect(array.length).toBe(0);
        })

        it('Value = undefined', function(){
            let value = undefined;
            let array = getRepeatedArray(5,value);
            for (let i=0; i < array.length; i++){
                expect(array[i]).toBe(value);
            }
        });

        it('Value = null', function(){
            let value = null;
            let array = getRepeatedArray(5,value);
            for (let i=0; i < array.length; i++){
                expect(array[i]).toBe(value);
            }
        });
    });

    describe("Ejercicio 5: NIF Validator", function(){

        ['12345678Z', '12345678-Z', '12345678z', '12345678-z', '0T', '00010X'].forEach(nif =>{
            it(`OK format: nif = ${nif}`, function(){
                expect(isValidNif(nif)).toBe(true);
            })
        });

        ['Z12345678', 'Random', 77, '000000000T', '123456789B', '00000T000', undefined, null].forEach(nif =>{
            it(`KO format: nif = ${nif}`, function(){
                expect(isValidNif(nif)).toBe(false);
            })
        });
    });

    describe("Ejercicio 6: Palindrome", function(){

        ['ABCBA', 'AbCbA', 'ABCBa', 'A BCBA', 'Radar', 'La ruta nos aporto otro paso natural.',
            'A nut for a jar of tuna.', 'Live on time, emit no evil.', 'Do geese see God?']
        .forEach(string =>{
            it(`OK: string = '${string}'`, function(){
                expect(isPalindrome(string)).toBe(true);
            });
        });

        ['', undefined, null, 'ABC', 'Random']
        .forEach(string =>{
            it(`KO: string = '${string}'`, function(){
                expect(isPalindrome(string)).toBe(false);
            });
        });
        
        function asString(array){
            let result = '';
            if(array.length){
                for(let i=0; i<array.length; i++){
                    if (typeof array[i] === 'string'){
                        result = result.concat(`'${array[i]}',`)
                    } else {
                        result = result.concat(`${array[i]},`)
                    }
                }
                result = result.slice(0,-1);
            }
            return result;
        }

        [[0,1,2,1,0], [0,'1',undefined, 2, undefined,'1',0], ['a','b',1,'b','a'], ['']]
        .forEach(array =>{
            it(`OK: array = [${asString(array)}]`, function(){
                expect(isPalindrome(array)).toBe(true);
            });
        });

        [['A','B','C','B','a'], ['0',1,0], []]
        .forEach(array =>{
            it(`KO: array = [${asString(array)}]`, function(){
                expect(isPalindrome(array)).toBe(false);
            });
        });
    })
});