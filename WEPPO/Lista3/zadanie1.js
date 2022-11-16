function fib(n) {
    if (n > 1 ) {
        return fib(n-1) + fib(n-2);
    } else {
        return 1;
    }
}

function memo(f) {
    var cache = {};

    return function(n) {
        if (cache[n] === undefined) {
            var f_n = f(n);
            cache[n] = f_n;
            return f_n;
        } else {
            return cache[n];
        }
    }
}

//Referencja na funkcję
//Funckja fib zaczyna wywoływać nie samą siebie, ale samą siebie w wersji zmemoizowanej.
var fib = memo(fib);

console.log(fib(424));