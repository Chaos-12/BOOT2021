// Ejercicios Bloque 1: Sintaxis y Funciones

import {computeLimitEratosthenes, primeEratosthenes} from "./eratosthenes.js";

/* Ejercicio 1: 
    Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.
 */
function randomFromRange(range = 1, from = 0) {
    return from + Math.random()*range;
}

/* Ejercicio 2:
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

/* Ejercicio 3:
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

/* Ejercicio 4:
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

/* Ejercicio 5:
    Crear una función que valide un NIF.
 */
function isValidNif(nif) {
    if (typeof nif === "string" || nif instanceof String) {
        const validNifLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
        const regExpNif = new RegExp(`^[0-9]{1,8}[${validNifLetters}]$`);
        let testNif = nif.split('-').join('').toUpperCase();
        if (regExpNif.test(testNif)){
            let number = parseInt(testNif) % 23;
            let letter = testNif[testNif.length-1];
            if (validNifLetters[number] === letter) {
                return true;
            }
        }
    }
    return false;
}

/* Ejercicio 6:
    Definir una función que determine si la cadena de texto que se le pasa como parámetro es 
    un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la derecha. 
    Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural"
 */
function isPalindrome(input) {
    if (!input.length) {
        return false;
    }
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