'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  google: {
    id: String,
    displayName: String,
    profileImg: String
  }
});

module.exports = mongoose.model('User', User);