const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const flash = require('connect-flash');
const cors = require('cors');
const crypto = require('crypto');
const passwordHash = require('password-hash');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
/*
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'chloe',
  database : 'test'
});
 //connection.connect();
 */

 let connection;
 function handleDisconnect() {
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'chloe',
    database : 'test'
  }); // Recreate the connection, since
   // the old one cannot be reused.
   var del = connection._protocol._delegateError;
   connection._protocol._delegateError = function(err, sequence){
     if (err.fatal) {
       console.trace('fatal error: ' + err.message);
     }
     return del.call(this, err, sequence);
   };
  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

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

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://capstoneauth.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'capstoneauth.auth0.com',
  issuer: `https://capstoneauth.auth0.com/`,
  algorithms: ['RS256']
});


app.get('/posts', function (req, res) {
    connection.query('SELECT * FROM assay', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

});

app.get('/tox', function (req, res) {
  connection.query('SELECT * FROM toxicity', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.get('/chem', function (req, res) {
  connection.query('SELECT * FROM chemical', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});

app.get('/target', function (req, res) {
  connection.query('SELECT * FROM target', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});


app.post('/signup', (req, res) => {
  connection.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, result) => {
    if(result.length > 0) {
      res.send(false);
    }
    else {
      let hashedPass = passwordHash.generate(req.body.password);
      const post = [req.body.email, hashedPass]
      const q = connection.query('INSERT INTO users(email, password) VALUES(?,?)', post, (err, result) => {
        if(err)
          throw err;
        res.send(true);
        console.log('user added');
      });
    }
  })
})

app.post('/login', (req, res) => {
  const users = connection.query("SELECT * FROM users WHERE email = ?", req.body.email, (err, result) => {
    if(err) {
      console.log(err);
    }
    if(result.length == 1) {
      let password = passwordHash.verify(req.body.password, result[0].password);
      //will send true for correct and false for mismatched passwords
      res.send(password);
    }
    else {
      const obj = {
        invalid: 2
      }
      res.send(obj)
    }
    
  });
  
})


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})


// Start the server
app.listen(5000, () => {
 console.log('up and running');
});