var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/users');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id)
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CONSUMER_KEY,
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
      callbackURL: process.env.APP_URL + '/auth/google/callback'
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({'google.id': profile.id}, function (err, user) {
        if(err) {
          return done(err);
        }

        if(user) {
          return done(null, user);
        }
        if(!user) {
          var newUser = new User();

          newUser.google.id = profile.id;
          newUser.google.displayName = profile.displayName;
          newUser.google.profileImg = profile.photos[0].value;

          newUser.save(function(err) {
            if(err) throw err;

            return done(err, newUser);
          });
        }
      });
    }
  ));
};