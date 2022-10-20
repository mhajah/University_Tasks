let obj = {
    name: "Abc",
    age: 20,
    0: 22
};

/* 
Różnica w użyciu . i []:
Przy użyciu . nie możemy używać spacji

*/
console.log(obj.name);
console.log(obj["age"]);

let obj2 = {
    name: "Def",
    age: 22
};
//Zwraca wartość undefined (no chyba, że jednym z property jest ta cyfra)
console.log(obj[0]);

//Też undefined, chyba że taki obiekt jest property w danym obiekcie)
console.log(obj[obj2]);

let a = [10, 20, 30, 40, 50, 60];
console.log(a["a"]);

a["test"] = 70;
console.log(a["test"]);
console.log(a.test);

//Niezaleznie od etgo, czy jest wieksza/mniejsza, to po porstu nadpisuje aktualna dlugosc.
a["length"] = 4;
console.log(a.length);



