
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');

const routes = require('./routes/route');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'bimil', 
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: '844477835997-c2cc9933va6o9ukc9rfak1u5e4npkbnp.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});

