
/* Sintaxis y funciones - Ejercicio 1: 
    Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.
 */
function randomFromRange(range = 1, from = 0) {
    return from + Math.random()*range;
}

/* Sintaxis y funciones - Ejercicio 2:
    Adivina el Número, generar un número entre el 0 y el 100, introducir un número e 
    informar si es igual, mayor o menor. Hay un máximo de 10 intentos para encontrar 
    el número que sea igual.
 */
function guessRandomNumber(tries = 10, range = 100, from = 0) {
    let secret = Math.round(randomFromRange(range, from));
    console.log(`I just wrote an integer number between ${from} and ${from+range}.`)
    console.log(`Can you guess my number in ${tries} tries?`)
    for (let i = 1; i <= tries; i ++) {
        let yourGuess = prompt(`Guess my number! (${i}/${tries})`);
        if (yourGuess == secret) {
            console.log(`Exactly! My number was ${secret}!`);
            return true;
        }
        if (yourGuess < secret) {
            console.log(`Sorry, ${yourGuess} is too low...`);
        }
        if (yourGuess > secret) {
            console.log(`Sorry, ${yourGuess} is too high...`)
        }
    }
    console.log(`You have no more tries: my number was ${secret}.`)
    return false;
}

/* Sintaxis y funciones - Ejercicio 3:
    Crear una función que devuelva un array con el numero de elementos indicado,
    inicializados al valor suministrado.
 */
function getRepeatedArray(length = 1, value = 0) {
    let array = [];
    for (let i=0; i<length; i++) {
        array[i] = value;
    }
    return array;
}

/* Sintaxis y funciones - Ejercicio 4:
    Crear una función que devuelva un determinado número de números primos.
 */
function getFirstPrimes(nPrimes) {
    let primeList = [];
    let limit = computeLimitEratosthenes(nPrimes);
    let eratosthenes = primeEratosthenes(limit);
    let nextPrime = eratosthenes.next();
    while (!nextPrime.done && primeList.length < nPrimes){
        primeList.push(nextPrime.value);
        nextPrime = eratosthenes.next();
    }
    return primeList;
}

/**
 * This function provides a limit such that when we apply the sieve of Eratosthenes we obtain 
 * (at least) certain amount of prime numbers.
 * 
 * It is based on the fact that "x/log(x) < pi(x)" holds (when x > 17) where "pi(x)" represents 
 * the amount of prime numbers with lesser or equal value to x.
 * 
 * @param {*} nPrimes The minimal amount of prime numbers we want to obtain in the sieve of Eratosthenes
 * @returns A limit providing (at least) the desired amount of primes in the sieve of Eratosthenes
 */
function computeLimitEratosthenes(nPrimes) {
    if (nPrimes <= 7) {
        return 17;
    }
    let valueToSurpass = nPrimes;
    let surpassingFunction = x => x/Math.log(x);
    let x = valueToSurpass * Math.log(valueToSurpass);
    while (valueToSurpass > surpassingFunction(x)) {
        x += nPrimes;
    }
    return Math.ceil(x);
}

/**
 * Implementation of the "Sieve of Eratosthenes": provides all prime numbers up to certain value.
 * 
 * Creates an array filled with 'true' except for the index 0 and 1. Then, in increasing order,
 * when we find an index marked as 'true' we know that is a prime number, we mark all its "multiples"
 * as 'false' and we submit the (prime) index.
 * 
 * @param {*} limit An upper bound for all the prime numbers this function provides.
 */
function* primeEratosthenes(limit = 17) {
    let isPrime = getRepeatedArray(limit+1, true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i < isPrime.length; i++) {
        if (isPrime[i]) {
            fillMultiplesOf(isPrime, false, i, i*i);
            yield i;
        }
    }
}

/**
 * Function that fills an array with a fixed value, with a fixed step, starting from a certain index.
 * @param {*} array The array to fill
 * @param {*} value The filling value
 * @param {*} step The step
 * @param {*} from The first value to fill
 */
function fillMultiplesOf(array, value = 0, step = 1, from = 0) {
    for (let i=from; i<array.length; i += step) {
        array[i] = value;
    }
}

/* Sintaxis y funciones - Ejercicio 5:
    Crear una función que valide un NIF.
 */
function isValidNIF(nif) {
    let testNif = nif.split('-').join('');
    if (testNif.length === 9) {
        let validNifNumbers = "0123456789";
        for (let i=0; i<8; i++) {
            if (!validNifNumbers.includes(testNif[i])) {
                return false;
            }
        }
        let validNifLetters = "trwagmyfpdxbnjzsqvhlcke";
        let letter = testNif[8].toLowerCase();
        if (!validNifLetters.includes(letter)) {
            return false;
        }
        let number = parseInt(testNif) % 23;
        if (validNifLetters[number] === letter) {
            return true;
        }
    }
    return false;
}

/* Sintaxis y funciones - Ejercicio 6:
    Definir una función que determine si la cadena de texto que se le pasa como parámetro es 
    un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la derecha. 
    Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural"
 */
function isPalindrome(input) {
    let test = input;
    if (typeof test === "string" || test instanceof String) {
        test = input.replace(/\s/g, '').toLowerCase();
    }
    let j = test.length-1;
    for(let i=0; i<j; i++) {
        if (test[i] !== test[j]) {
            return false;
        }
        j--;
    }
    return true;
}

/*  Objetos - Ejercicios:
    Crear la función constructora del juego Adivina el Número.
    Crear la clase del juego Adivina el Número.
 */
class GuessNumberGame {
    constructor(tries = 10, range = 100, from = 0) {
        let myTries = tries;
        this.Tries = function(value) {
            if(undefined !== value) {
                myTries = value;
            }
            return myTries;
        }
        let myRange = range;
        this.Range = function(value) {
            if(undefined !== value) {
                myRange = value;
            }
            return myRange;
        }
        let myFrom = from;
        this.From = function(value) {
            if(undefined !== value) {
                myFrom = value;
            }
            return myFrom;
        }
        this.start = function(){
            return guessRandomNumber(myTries, myRange, myFrom);
        }
    }
}