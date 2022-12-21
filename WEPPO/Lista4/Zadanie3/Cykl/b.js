module.exports = b;
var a = require('./a');
var c = function() { return 5;}
console.log(String(a));
function b(n) {
    if (n > 0) {
        console.log(n);
        a(n+1);
    }
}