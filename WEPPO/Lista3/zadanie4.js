function sum(..._numbersToSum) {
    var res = 0;
    for (let i = 0; i < _numbersToSum.length; i++) {
        if (typeof _numbersToSum[i] != "number") {
            return "Nieprawidłowe argumenty funkcji. Podaj liczby.";
        }
        res += _numbersToSum[i];
    }
    return res;
}

console.log(sum(d,2,3));
// 6

console.log(sum(1,2,3,4,5));
// 15