function fib() {
    let prevValue = 0, nextValue = 1;
    return {
        next: function () {
            [prevValue, nextValue] = [nextValue, (prevValue+nextValue)];
            return {
                value: prevValue,
                done: false
            }
        }
    }
}

// var x = {
//     [Symbol.iterator] : fib
// };

// for(var f of x) {
//     console.log(f);
// }

function* fib2() {
    let prevValue = 0, nextValue = 1;
    while(true) {
        [prevValue, nextValue] = [nextValue, (prevValue+nextValue)];
        yield prevValue;
    }
}

// var y = {
//     [Symbol.iterator] : fib2
// };

// for(var g of y) {
//     console.log(g);
//     if (g > 500) break;
// }

//Zadanie7
function* take(it, top) {
    let iterator = {
        [Symbol.iterator] : it
    };
    
    for (var i of iterator) {
        if (top <= 0) break;
        yield i;
        top--;
    }
};

for (let num of take(fib2, 10)) {
    console.log(num);
}