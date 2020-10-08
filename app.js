//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/users.js');
const secret = require('./config/secret.js');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id, (err, user)=> {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  (accessToken, refreshToken, profile, cb)=> {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, (err, user)=> {
      return cb(err, user);
    });
  }
));

const authRoute = require('./routes/auth.js');
const loginRoute = require('./routes/login.js');
const logoutRoute = require('./routes/logout.js');
const registerRoute = require('./routes/register.js');
const submitRoute = require('./routes/submit.js');

app.use(authRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(registerRoute);
app.use(submitRoute);

app.listen(secret.port, ()=> {
  console.log(`Server started on ${secret.port}`);
});

