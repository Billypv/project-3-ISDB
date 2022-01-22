const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
require('./middleware/auth');

const songRoutes = require('./routes/songs');
const userRoutes = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb+srv://billypv14:Demiquas1@isdb-cluster.qk4mm.mongodb.net/');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', songRoutes);
app.use('/', userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
