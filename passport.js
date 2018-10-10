app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login'
    }));

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM users WHERE id = '+id, (err, rows) => {
      done(err, rows[0]);
    })
  })
  
  
  
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function (req, email, password, done) {
      if(!email || !password) {
        return done(null, false); 
      }
      salt = salt+''+password;
      const encPass = crypto.createHash('sha1').update(salt).digest('hex');
      const dbpass = rows[0].password;
      if(!(dbpass == encPass)) {
        return done(null, false);
      }
      connection.query(`INSERT INTO users (email, password) values (${email}, ${encPass})`)
      return done(null, rows[0]);
    }
  ));
  
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function (req, email, password, done) {
      connection.query('SELECT * FROM users WHERE email = ' + email, (err, rows) => {
        if(err) return done(err);
        if(!rows.length) return done(null, false);
        if(!(rows[0].password == password)) return done(null, false);
        return done(null, rows[0]);
      });
  }));