// Haz que se puedan iterar sobre arrays.

Array.prototype.next = function*() {
    for(let i=0; i<this.length; i++){
        yield this[i];
    }
}

for(let value of [1,2,6,4,5]){
    value ++;
    console.log(value);
}