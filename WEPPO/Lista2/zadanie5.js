
var myObject = {
    myProperty : ['x', 'y', 'z'],

    get last() {
        index = this.myProperty.length-1;
        return this.myProperty[index];
    },
    set psh(elem) {
        this.myProperty.push(elem);
    }
}

console.log(myObject.last);
myObject.psh = 'a';
console.log(myObject.last);

var myObject2 = {
    myProperty : 5,
}

Object.defineProperty (myObject2, 'inc', { 
    get:function() {
        this.myProperty++;
        return this.myProperty;
    },
    set:function(elem) {
        return this.myProperty = elem;
    }
});

console.log(myObject2.inc)
myObject2.inc = 10;
console.log(myObject2.inc);
myObject2.tst = 20;
console.log(myObject2.tst);


