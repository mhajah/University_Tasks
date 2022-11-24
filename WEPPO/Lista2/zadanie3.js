//1 czesc wyrazenia zwraca "false"
console.log((![]+[]));

//wyciągamy z "false" indeks zerowy, czyli  "f"
aaa= "false"
console.log(aaa[+[]]);

//tutaj podobnie, wyciągamy "a"
console.log((![]+[])[+!+[]]);

//zwraca falseundefined
console.log(([![]]+[][[]]));

//zwraca "i"
console.log(([![]]+[][[]])[+!+[]+[+[]]]);

//itd. ostatecznie zwraca "fail"
console.log( (![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]] );
