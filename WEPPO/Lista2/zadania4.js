// typeof zwraca typ zmiennej/wyrażenia
// np. console.log(typeof 42) == "number"

// instanceof zwraca wartość boolowską
// sprawdza, czy właściwość wyrażenia pojawia się gdziekolwiek w łańcuchu prototypów 
// np.
let x = 1;
console.log(x instanceof Object);
x = {
    a : 21
}
console.log(x instanceof Object);