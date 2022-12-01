var readln = require('readline');

var cl = readln.createInterface( process.stdin, process.stdout );

var question = function(q) {
    return new Promise( (resolve, reject) => {
        cl.question( q, answer => {
            resolve(answer);
        })
    });
};

async function test() {
    var answer;
    answer = await question("Podaj swoje imie: ");
    console.log("Witaj " + answer);
    cl.close();
};

test();