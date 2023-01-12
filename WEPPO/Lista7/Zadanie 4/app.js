var http = require('http');
var express = require('express');
var crypto = require('crypto');

var secret = 'mykey';
var parameter = '1448219';

var hmac =
 crypto
 .createHmac('sha256', secret)
 .update(parameter)
 .digest('hex');
console.log( hmac );


var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render("index");
});
app.get("/faktura/:id(\\d+)", 
 (req, res) => { 
    if (req.query.hmac != hmac) {
        res.end("niepoprawny adres");
    } 
    res.end(`dynamicznie generowana faktura: 
    ${req.params.id}`)

});




http.createServer(app).listen(3000);
console.log("starteed");