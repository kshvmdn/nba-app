'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/api', _api2.default);

router.get('/', function (req, res, next) {
  res.json({
    endpoints: {
      api: '/api'
    },
    meta: {
      status: 200,
      message: 'OK'
    }
  });
});

exports.default = router;