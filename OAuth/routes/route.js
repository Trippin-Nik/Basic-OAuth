const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
  res.redirect('/auth/google');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// router.get('/profile', ensureAuthenticated, (req, res) => {
//     res.send(`Welcome, ${req.user.displayName}`);
// });

router.get('/profile', ensureAuthenticated, (req, res) => {
  const user = req.user; 
  console.log(user);
  res.send(`
  <html>
  <head>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden; /* Prevents scrollbars */
      }

      .profile-container {
        background-image: url("${user.photos[0].value}");
        // background-size: cover;
        width: 100vw; /* 100% of viewport width */
        height: 100vh; /* 100% of viewport height */
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff; /* Text color for readability */
      }

      .profile-text {
          font-size: 30px;
          background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
          backdrop-filter: blur(7px); /* Apply a blur effect */
          padding: 20px; /* Add some padding to make the text more readable */
          border-radius: 5px; /* Add rounded corners */
          color: #fff; /* Text color for readability */        
      }
    </style>
  </head>
  <body>
    <div class="profile-container">
      <h1 class="profile-text">Welcome, ${user.displayName}</h1>
    </div>
  </body>
</html>
  `);
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
}
  

module.exports = router;
