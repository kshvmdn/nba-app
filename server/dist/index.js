'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.use('/', _routes2.default);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  err.status = err.status || 500;

  var response = {
    data: null,
    meta: {
      status: err.status,
      message: err.message
    }
  };

  res.status(err.status).json(response);
});

app.listen(port, function () {
  return console.log('Listening at http://localhost:' + port + '.');
});

exports.default = app;