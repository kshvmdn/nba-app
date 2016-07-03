'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = getFreeAgentData;

var _pythonShell = require('python-shell');

var _pythonShell2 = _interopRequireDefault(_pythonShell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFreeAgentData(year) {
  var options = {
    mode: 'json',
    scriptPath: './server/lib/scraper',
    args: [year]
  };

  var script = ''; // __main__.py

  return new _promise2.default(function (resolve, reject) {
    try {
      _pythonShell2.default.run(script, options, function (err, results) {
        if (err) reject(err);

        if (!results || !results[0]) {
          var e = new Error('Failed to retrieve data.');
          e.status = 404;

          reject(e);
        }

        resolve(results[0]);
      });
    } catch (e) {
      reject(e);
    }
  });
}