var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.disable('etag');
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    var cookieValue;
    if (!req.cookies.bgcolor) {
        cookieValue = "white";
        res.cookie("bgcolor", cookieValue);
    } else {
        cookieValue = req.cookies.bgcolor;
    }

    res.render("index", {cookieValue: cookieValue});
});

app.get('/lime', (req, res) => {
    res.cookie("bgcolor", "lime");
    res.redirect('back');
});
app.get('/red', (req, res) => {
    res.cookie("bgcolor", "red");
    res.redirect('back');
});
app.get('/reset', (req, res) => {
    res.cookie("bgcolor", "red", {maxAge: -1});
    res.redirect('back');
});



http.createServer(app).listen(3000);
console.log("starteed");