const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index', {
    user: req.user
  });
});

router.get('/auth', (req, res, next) => {
  res.render('auth');
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/auth',
  failureFlash: true
}));


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/auth',
  failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;
