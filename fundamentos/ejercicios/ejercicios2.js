// Ejercicios Bloque 2: Objetos

/*  Ejercicios:
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