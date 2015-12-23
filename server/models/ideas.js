'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Idea = new Schema(
    {
      title: String,
      description: String,
      creator: String,
      creatorEmail: String,
      comments: Array, // {comment: ..., name: ..., email: ...}
      status: String  //suggested, inprogress, completed
    },
    {versionKey: false}
  );

module.exports = mongoose.model('Idea', Idea);