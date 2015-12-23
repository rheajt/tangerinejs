'use strict';

var Ideas = require('../models/ideas');

function ideaController() {

  this.getIdeas = function(req, res) {
    Ideas
      .find()
      .exec(function(err, result) {
        if(err) throw err;

        console.log('result');
      });
  }
}

module.exports = ideaController;