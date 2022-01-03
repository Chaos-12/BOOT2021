/**
 * Implementation of the "Sieve of Eratosthenes": provides all prime numbers up to certain value.
 * 
 * Creates an array filled with 'true' except for the index 0 and 1. Then, in increasing order,
 * when we find an index marked as 'true' we know that is a prime number, we mark all its "multiples"
 * as 'false' and we submit the (prime) index.
 * 
 * @param {*} limit An upper bound for all the prime numbers this function provides.
 */
 export function* primeEratosthenes(limit = 17) {
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
 * This function provides a limit such that when we apply the sieve of Eratosthenes we obtain 
 * (at least) certain amount of prime numbers.
 * 
 * It is based on the fact that "x/log(x) < pi(x)" holds (when x > 17) where "pi(x)" represents 
 * the amount of prime numbers with lesser or equal value to x.
 * 
 * @param {*} nPrimes The minimal amount of prime numbers we want to obtain in the sieve of Eratosthenes
 * @returns A limit providing (at least) the desired amount of primes in the sieve of Eratosthenes
 */
 export function computeLimitEratosthenes(nPrimes) {
    if (nPrimes <= 7) {
        return 17;
    }
    let valueToSurpass = nPrimes;
    let surpassingFunction = x => x/Math.log(x);
    let x = valueToSurpass * Math.log(valueToSurpass);
    while (valueToSurpass > surpassingFunction(x)) {
        x += valueToSurpass;
    }
    return Math.ceil(x);
}

/**
 * Function that creates an array with filled with a fixed value.
 * @param {*} length The length of the array
 * @param {*} value The fixed value
 * @returns The array
 */
function getRepeatedArray(length = 1, value = 0) {
    let array = [];
    for (let i=0; i<length; i++) {
        array[i] = value;
    }
    return array;
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