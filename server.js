'use strict';

var express = require('express'),
    routes = require('./server/routes/index'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session');

var port = process.env.PORT || 8080;
var app = express();

require('dotenv').load();
require('./server/config/passport')(passport);


mongoose.connect(process.env.MONGO_URI);

app.use('/public', express.static(process.cwd() + '/client'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);


app.listen(port, function() {
  console.log('Tangerine server is listening on port ' + port + ' ... ');
});