/*
this, call, apply, bind

this wywołuje se w kontekscie jakiegoś obiektu
np. 
function f() {
    console.log(this.x);
}

var o = {
    x : 1,
    f
}


o.f(); //zwroci jeden
^ "o" to kontekst
natomiast przy
var _f = o.f;
_f(); //zwroci undefined, poniewaz this wywoluje się tylko w kontekście jakiegoś obiektu


call
_f() oraz _f.call() są sobie równoważne, z tym że call() jest funkcja - więc ma swoje argumenty. To co w środku funkcji ma być widoczne jako "this"
czyli
_f.call(o) - już działa i zwraca 1
apply działa podobnie, z tym, że do call() podajemy kolejne argumenty po przecinku, a apply przyjmuje dwa argumenty - ten od "this" oraz drugi jako tablice argumentów
//c: comma (przecinek)
//a: array


bind() - wiąże this.


//Iteratory, generatory

operator ,
var a = b,c,d,e;

*/

function createGenerator(n) {
    return function () {
        var _state = 0;
        return {
            next : function() {
                return {
                    value : _state,
                    done : _state++ >= n
                }
            }
        }
    }
}

var foo = {
    [Symbol.iterator] : createGenerator(10)
};

var foo1 = {};
var foo2 = {};
foo1[Symbol.iterator] = createGenerator(5);
foo2[Symbol.iterator] = createGenerator(20);

for ( var f of foo )
console.log(f);
for ( let g of foo1)
console.log(g);
for ( let g of foo2)
console.log(g);