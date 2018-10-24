const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const flash = require('connect-flash');
const cors = require('cors');
const crypto = require('crypto');
const passwordHash = require('password-hash');

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
app.use(cors());

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/




app.get('/posts', function (req, res) {
    connection.query('SELECT * FROM assay', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

    //connection.end();
});

app.get('/tox', function (req, res) {
  connection.query('SELECT * FROM toxicity', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});



app.post('/signup', (req, res) => {
  let hashedPass = passwordHash.generate(req.body.password);
  console.log(hashedPass);
  const post = [req.body.email, hashedPass]
  connection.query('INSERT INTO users(email, password) VALUES(?,?)', post, (err, result) => {
    if(err) {
      throw err;
    }
    console.log('user added');
  }
  );
})

app.post('/login', (req, res) => {
  //let password = passwordHash.verify(req.body.password, )
  const users = connection.query('SELECT * FROM users')
  //const users = connection.query(`SELECT * FROM users WHERE email=${req.body.email}`);
  console.log(users);
})


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})


// Start the server
app.listen(5000, () => {
 console.log('up and running');
});