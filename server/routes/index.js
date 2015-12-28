'use strict';

var MainController = require(process.cwd() + '/server/controllers/mainController');

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  }

  var mainControl = new MainController();

  app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/client/index.html')
    });

  app.route('/auth/google')
    .get(passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));

  app.route('/auth/google/callback')
    .get(passport.authenticate('google', {failureRedirect: '/'}), function(req, res) {
      res.redirect('/');
    });

  app.route('/auth/profile')
    .get(isLoggedIn, mainControl.getProfile);

  app.route('/auth/logout')
    .get(isLoggedIn, mainControl.logout);

}