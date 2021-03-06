require('./config/config');
const path = require("path");

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var auth = require('./routes/auth');
var public = require('./routes/public');
var userData = require('./routes/userData');

const port = process.env.PORT;
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "client", "build")));

app.use('/api/auth' ,auth);
app.use('/api/public' ,public);
app.use('/api/userData' ,userData);
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});



// listen on port 3000
app.listen(port, function () {
  console.log('Express app listening on port', port);
});