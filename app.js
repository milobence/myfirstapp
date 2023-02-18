var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'Milo',
  password : 'adrian69',
  database : 'join_us'
});

var express = require('express');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
  // Hány darab felhasználó van az adatbázisban?
  var q = 'SELECT COUNT(*) AS count FROM users';
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    var count = results[0].count;
    // res.send("We have " + count + " users!");
    res.render("home", {count: count});
  })
});

app.get("/joke", function(req, res){
 var joke = "<strong>What do you call a dog that does magic tricks?</strong> <em>A labracadabrador.</em>";
 res.send(joke);
});

app.post('/register', function(req,res){
  var person = {email: req.body.email};
  connection.query('INSERT INTO users SET ?', person, function(err, result) {
   res.redirect("/");
 });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
