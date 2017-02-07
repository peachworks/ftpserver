'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (thisCmd) {
  return _cwd2.default.call(this, thisCmd, '..');
};

var _cwd = require('./cwd');

var _cwd2 = _interopRequireDefault(_cwd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];