/*Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.
Adivina el Número, generar un número entre el 0 y el 100, introducir un número e informar si es igual, mayor o menor. Hay un máximo de 10 intentos para encontrar el número que sea igual.
Crear una función que devuelva un array con el numero de elementos indicado, inicializados al valor suministrado.
Crear una función que devuelva un determinado número de números primos.
Crear una función que valide un NIF
Definir una función que determine si la cadena de texto que se le pasa como parámetro es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural"
*/

/* Ejercicio 1: 
    Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.
 */
function randomFromRange(range = 1, start = 0) {
    let number = Math.random()*range;
    return start + number;
}

/* Ejercicio 2:
    Adivina el Número, generar un número entre el 0 y el 100, introducir un número e 
    informar si es igual, mayor o menor. Hay un máximo de 10 intentos para encontrar 
    el número que sea igual.
 */
function guessRandomNumber(tries = 10, range = 100) {
    let secret = Math.round(randomFromRange(range));
    console.log(`I just wrote an integer number between 0 and ${range}.`)
    console.log(`Can you guess my number in ${tries} tries?`)
    for (let i = 1; i <= tries; i ++) {
        let yourGuess = prompt(`Guess my number! (${i}/${tries})`);
        if (yourGuess < secret) {
            console.log(`Sorry, ${yourGuess} is too low...`);
        } else if (yourGuess > secret) {
            console.log(`Sorry, ${yourGuess} is too high...`)
        } else {
            console.log(`Exactly! My number was ${secret}!`);
            return true;
        }
    }
    console.log(`Sorry, my number was ${secret}.`)
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

/* Ejercicio 5:
    Crear una función que valide un NIF.
 */

/* Ejercicio 6:
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