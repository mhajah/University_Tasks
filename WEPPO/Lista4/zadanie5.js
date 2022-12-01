var fs = require('fs');

async function test(cb) {
    var data = await fs.promises.readFile("plik.txt", "utf-8");
    return cb(data);
} 

test((data) => {
    console.log(data);
});