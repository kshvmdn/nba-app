'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getFreeAgentData = require('../helpers/get-free-agent-data');

var _getFreeAgentData2 = _interopRequireDefault(_getFreeAgentData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:year', function (req, res, next) {
  (0, _getFreeAgentData2.default)(req.params.year).then(function (response) {
    response.meta.status = 200;
    response.meta.message = 'OK';

    res.json(response);
  }).catch(function (err) {
    return next(err);
  });
});

router.get('/', function (req, res, next) {
  res.json({
    endpoints: {
      full: '/:year',
      by_name: '/:year/:name',
      by_old_team: '/:year/:team',
      by_new_team: '/:year/:team'
    },
    meta: {
      status: 200,
      message: 'OK'
    }
  });
});

exports.default = router;