var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');

var APIMundos = require('./routes/APIMundos');
var APIUsers = require('./routes/APIUsers');

var app = express();
var session = require('express-session');
app.use(cookieParser());
app.use(session({
  secret: 'Ds93kd!9#lPaTosQmL1$ZupX!L9q7Jcn',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1
  }
}));

const allowed = [process.env.SERVIDOR_PORTA, 'http://localhost:3000'];
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || allowed.includes(origin)),
  credentials: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/apimundos', APIMundos); 
app.use('/apiusers', APIUsers); 

app.use((req, res, next) =>   {
  if (!req.path.startsWith('/apimundos') && !req.path.startsWith('/apiusers')) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001, () => {
  console.log('Servidor rodando em ' + process.env.SERVIDOR_PORTA);
});

module.exports = app;
