/*
Undefined, null - dwie różne wartości. Undefined oznacza brak wartości.

*/
function foo(a, b,...args) {
    console.log(args);
}
foo(1,2,3,4,5); // -> wtedy args to tablica elementów 3, 4, 5

//

function foo1() {
    return function() {
        return 1;
    }
}

console.log(foo1()());

//

function foo2(f,a){
    return f(a);
}

//

function sum(x) {
    return function(y) {
        return x + y;
    }
}

console.log(sum(1)(2));
//domknięcia

//

var counter = (function () {
    var i = 0;
    return {
        get: function () {
            return i;
        },
        increment: function () {
            return ++i;
        }
    }
});

//MEMOIZACJAs

function memo(f) {
    var cache = {};
    return function(...args) {
        if (n in cache) {
            return cache[n];
        } else {
            var _ = f(n);
            cache[n] = _;
            return _;
        }
    }
}

function fib(n) {
    if (n<2) {
        return n;
    } else {
        fib(n-1) + fib(n-2);
    }
}
