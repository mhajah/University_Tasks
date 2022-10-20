function FibR(n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    
    return FibR(n-1) + FibR(n-2);
}

function FibIt(n) {
    var s1 = 0;
    var s2 = 1;
    var temp;
    for (let i = 1; i < n; i++) {
        temp = s1+s2;
        s1 = s2;
        s2 = temp;
    }
    return temp;
}

var itTimes = [];
var rTimes = [];

for (let i = 10; i < 41; i++) {
    console.time("FibIter(" + i +")");
    FibIt(i);
    itTimes.push(console.timeEnd("FibIter(" + i +")"));

    console.time("FibReku(" + i +")");
    FibR(i);
    itTimes.push(console.timeEnd("FibReku(" + i +")"));
    console.log("==============");
}