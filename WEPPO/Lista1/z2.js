function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

var a = [];

for (let i = 2; i < 100000; i++) {
    if(isPrime(i)) a.push(i);
}

console.log(a);