let obj = {
    name: "Abc",
    age: 20,
    0: 22,
    obj3 : {
        test : "a"
    }
};

/* 
Różnica w użyciu . i []:
Przy użyciu . nie możemy używać spacji

*/
console.log(obj.name);
console.log(obj["age"]);

var obj2 = {
    name: "Abc",
    age: 20,
    0: 22
};
//Zwraca wartość undefined (no chyba, że jednym z property jest ta cyfra)
console.log(obj[0]);

//Też undefined, chyba że taki obiekt jest property w danym obiekcie)
console.log(obj[obj2]);

console.log(obj);

let a = [10, 20, 30, 40, 50, 60];
console.log(a["a"]);

a["test"] = 70;
console.log(a["test"]);
console.log(a.test);

//Niezaleznie od etgo, czy jest wieksza/mniejsza, to po porstu nadpisuje aktualna dlugosc.
//Przy mniejszych ucina ostatnie właściwości
//Przy większych ostatnie elementy (te o ktore została powiększona tablica) to undefined
a["length"] = 4;
console.log(a.length);
console.log(a[0], a[1], a[2], a[3], a[4]);
a["length"] = 6;
console.log(a[0], a[1], a[2], a[3], a[4]);



