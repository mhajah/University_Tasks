var fs = require('fs');

async function test() {
    var data = await fs.promises.readFile("plik.txt", "utf-8");
    return data;
} 

async function test1(){
    var k = await test();
    console.log(k);
}

test1();