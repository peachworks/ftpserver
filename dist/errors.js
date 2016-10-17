'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function BadCredentials() {
  this.statusCode = 401;
  this.name = 'BadCredentials';
  this.message = 'Invalid Username or password';
}
_util2['default'].inherits(BadCredentials, Error);

function InvalidListArgument() {
  this.statusCode = 400;
  this.name = 'InvalidListArgument';
  this.message = 'List must be passed an array of files.';
}
_util2['default'].inherits(InvalidListArgument, Error);

exports['default'] = {
  BadCredentials: BadCredentials,
  InvalidListArgument: InvalidListArgument
};
module.exports = exports['default'];