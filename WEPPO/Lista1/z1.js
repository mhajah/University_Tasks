function numDivByTheirDigs(n) {
    var stringN = (n + "");
    var numLen = stringN.length;
    var sum = 0;
    for (let i = 0; i < numLen; i++) {
        if (n % stringN[i] != 0) {
            return false;
        }
        sum += parseInt(stringN[i]);
    }
    if (n % sum == 0) {
        return true;
    } else {
        return false;
    }
}

var t = [];

for (let i = 0; i < 100000; i++) {
    if (numDivByTheirDigs(i)) {
        t.push(i);
    }
}

console.log(t);