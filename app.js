// Initiate Environment Variables with dotenv: https://www.npmjs.com/package/dotenv
require("dotenv").config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
var mongoose = require('mongoose');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')


var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

mongoose.Promise = global.Promise
var db = mongoose.connect(process.env.DB_URI || 'mongodb://localhost/gcx')
	.then(() => console.log('Database Connected Successfully. Build Something Awesome!'))
	.catch((err) => {
		console.error(err, 'Error Connecting to Database!');
    process.abort();
	})

// Passport
app.use(session({
	secret: process.env.SESSION_SECRET || 'hidden secrets',
	resave: true,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

var User = require('./models/User')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO: Force SSL for all routes
app.use(helmet());
app.use(compression());
app.use(favicon(path.join(__dirname, 'public/images/ico', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/api', api);

app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // Show prettified 404 error page in production => Error details are logged to console
  process.env.NODE_ENV !== 'production' ? res.render("error") : res.render('error404');
});

module.exports = app;
