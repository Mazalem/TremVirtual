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

const allowed = [
  process.env.SERVIDOR_PORTA,
  'http://localhost:3000',
  'http://92.113.34.107'
];
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || allowed.includes(origin)),
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json({limit:'1024mb'}));
app.use(express.urlencoded({ extended: false, limit:'1024mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/projects', express.static(path.join(__dirname, 'public', 'projects')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/apimundos', APIMundos);
app.use('/apiusers', APIUsers);

app.use((req, res, next) => {
  if (!req.path.startsWith('/apimundos') && !req.path.startsWith('/apiusers') && !req.path.startsWith('/projects') && !req.path.startsWith('/uploads')) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando em ' + process.env.SERVIDOR_PORTA);
});

module.exports = app;
