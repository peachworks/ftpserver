'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cwd = require('./cwd');

var _cwd2 = _interopRequireDefault(_cwd);

exports['default'] = function (thisCmd) {
  return _cwd2['default'].call(this, thisCmd, '..');
};

module.exports = exports['default'];