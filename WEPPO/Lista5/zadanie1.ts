function fib(n: number): number {
    if (n > 1 ) {
        return fib(n-1) + fib(n-2);
    } else {
        return 1;
    }
}

function memo<V>(f: ((n: number) => V)): ((n: number) => V) {
    var cache: Array<V> = [];

    return function(n: number) {

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

console.log(memo(fib)(42));