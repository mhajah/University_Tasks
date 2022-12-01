var Foo = function () {
    this.egProperty = "xyz";

    this.Bar = function () {
        var x = Qux();
        return x;
    }

    function Qux() {
        return "AA";
    }

}

var myFoo = new Foo();
console.log( myFoo.Bar() ); // "AA"
console.log( myFoo.Qux() ); // myFoo.Qux is not a function
