var readln = require('readline');
var fs = require('fs');

async function readLogs() {
    IPs = [];
    const data = fs.createReadStream('logs.txt');
    const rl = readln.createInterface({
        input: data,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        console.log(line);
        IPs.push(line.split(' ')[1]);
    }
    let uniqueIPs = [...new Set(IPs)];
    for (let ip of uniqueIPs) {
        console.log(ip, IPs.filter(x => x== ip).length);
    }

}

readLogs();