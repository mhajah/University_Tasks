var http = require('http');
var express = require('express');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg')
    }
  })
  
var upload = multer({ storage: storage })

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({extended:true}));

app.get( '/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.any(), function (req, res, next) {
    res.send('POST request to the homepage');
    res.redirect('..');
});

http.createServer(app).listen(3000);
console.log("Started");