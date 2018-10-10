const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passport = require('passport');
const flash = require('connect-flash');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
//const cors = require('cors');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'chloe',
  database : 'test'
});
 connection.connect();
// Initialize the app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
//app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.get('/posts', function (req, res) {
    connection.query('SELECT * FROM assay', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

    //connection.end();
});



app.post('http:localhost:5000/login', (req, res) => {
  connection.query('INSERT INTO users (email, password) VALUES (?, ?)', req.body.email, req.body.password, (err, result) => {
    if(err) throw err;
    console.log('user added');
  }
  );
})


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})


// Start the server
app.listen(5000, () => {
 console.log('Go to http://localhost:5000/posts to see posts');
});