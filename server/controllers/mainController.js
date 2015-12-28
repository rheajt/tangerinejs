'use strict';

var Users = require('../models/users');

module.exports = function() {

  this.getProfile = function(req, res) {
    Users
      .findOne({'google.id': req.user.google.id}, function(err, profile) {
        if(err) throw err;
        res.send(profile);
      });
  }

  this.logout = function(req, res) {
    req.logout();
    res.send({message: 'logged out'});

  }
}
