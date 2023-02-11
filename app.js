var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var multer = require('multer');
var errorHandler = require('errorhandler');


var index = require('./routes/index');
var api = require('./routes/api/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'my$ecre7'
}));
// app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/lib/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/lib/lodash', express.static(path.join(__dirname, 'node_modules', 'lodash')));
app.use('/lib/backbone', express.static(path.join(__dirname, 'node_modules', 'backbone')));
app.use('/lib/jointjs', express.static(path.join(__dirname, 'node_modules', 'jointjs', 'dist')));

app.use('/', index);
app.use('/api/config', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.status(err.status || 500);
    res.render('error');
  });
}

module.exports = app;
