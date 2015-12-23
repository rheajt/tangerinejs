'use strict';

var express = require('express');
var mongoose = require('mongoose');

var routes = require('./server/routes/index');
var app = express();


mongoose.connect('mongodb://localhost:27017/tangerinejs');

routes(app);

var port = process.argv[2] || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port + ' ... ');
});