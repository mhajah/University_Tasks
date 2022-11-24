// typeof zwraca typ zmiennej/wyrażenia
// np. console.log(typeof 42) == "number"

// instanceof zwraca wartość boolowską
// sprawdza, czy właściwość wyrażenia pojawia się gdziekolwiek w łańcuchu prototypów 
// np.
let x = 1;
function sfsdf (){
    return 5;
}
sfsdf.kkkk=9;
console.log(typeof sfsdf.kkkk);
console.log(x instanceof Object);
x = {
    a : 21
}
console.log(x instanceof Object);