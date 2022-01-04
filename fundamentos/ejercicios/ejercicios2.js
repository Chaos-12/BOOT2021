// Ejercicios Bloque 2: Objetos

/*  Ejercicios:
    Crear la función constructora del juego Adivina el Número.
    Crear la clase del juego Adivina el Número.
 */
export default class GuessNumberGame {
    #secretNumber;
    constructor(tries = 10, range = 100, from = 0) {
        let maxTries = tries;
        this.MaxTries = function(value) {
            if(undefined !== value) {
                maxTries = value;
            }
            return maxTries;
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
        this.startGame();
    }
    startGame() {
        this.#secretNumber = randomInteger(this.Range(), this.From());
        this.tries = 0;
        this.completed = false;
        this.message = `I just wrote an integer number between ${this.From()} and ${this.From()+this.Range()}. Can you guess my number in ${this.MaxTries()} tries?`
    }
    tryWith(yourGuess) {
        if (this.completed) {
            this.message = `The game is completed: my number was ${this.#secretNumber}.`
            return this.message;
        }
        if (this.tries >= this.MaxTries()){
            this.message = `You have no more tries: my number was ${this.#secretNumber}.`
            return this.message;
        }
        if (!Number.isInteger(+yourGuess)){
            throw new Error("Wrong format on guess number");
        }
        this.tries += 1;
        if (this.#secretNumber == yourGuess) {
            this.completed = true;
            this.message = `Exactly! My number was ${this.#secretNumber}!`;
            return this.message;
        }
        if (this.#secretNumber > yourGuess) {
            this.message = `Sorry, ${yourGuess} is too low...`;
            return this.message;
        }
        if (this.#secretNumber < yourGuess) {
            this.message = `Sorry, ${yourGuess} is too high...`;
            return this.message;
        }
        throw new Error("Unexpected error");
    }
    get currentTries() {
        return this.tries;
    }
}

function randomInteger(range = 1, from = 0) {
    return Math.ceil(from + Math.random()*range);
}