function forEach<T, V>(a: T[], f: (t: T) => V) {
    for (let i = 0; i < a.length; i++) {
        f(a[i]);
    }
}

function map<T, V>( a: T[], f: (t: T) => V) { 
    var b = [];
    for (let i = 0; i < a.length; i++) {
        b.push(f(a[i]));
    }
    return b;
} 

function filter<T>( a: T[], f: (t: T) => boolean ) {
    var b = [];
    for (let i = 0; i < a.length; i++) {
        if (f(a[i])) {
            b.push(a[i]);
        }
    }
    return b;
}
    
var a = [1,2,3,4];
    
forEach( a, _ => { console.log( _ ); } );
// [1,2,3,4]

console.log(filter( a, _ => _ < 3 ));  
// [1,2]    

console.log(map( a, _ => String(_) )); 
// [2,4,6,8]
console.log(a);