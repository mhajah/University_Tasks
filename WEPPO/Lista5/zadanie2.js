function forEach(a, f) {
    for (var i = 0; i < a.length; i++) {
        f(a[i]);
    }
}
function map(a, f) {
    var b = [];
    for (var i = 0; i < a.length; i++) {
        b.push(f(a[i]));
    }
    return b;
}
function filter(a, f) {
    var b = [];
    for (var i = 0; i < a.length; i++) {
        if (f(a[i])) {
            b.push(a[i]);
        }
    }
    return b;
}
var a = [1, 2, 3, 4];
forEach(a, function (_) { console.log(_); });
// [1,2,3,4]
console.log(filter(a, function (_) { return _ < 3; }));
// [1,2]    
console.log(map(a, function (_) { return String(_); }));
// [2,4,6,8]
console.log(a);
