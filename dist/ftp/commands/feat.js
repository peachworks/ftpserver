'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  var FEATURES = Object.keys(_index2.default).filter(function (cmd) {
    return _index2.default[cmd].hasOwnProperty('feat');
  }).map(function (cmd) {
    return _index2.default[cmd].feat;
  });
  return this.reply(211, 'Extensions supported:', null, false).then(function () {
    return (0, _sequence2.default)(FEATURES.map(function (feature) {
      return _this.write.bind(_this, ' ' + feature);
    }));
  }).then(function () {
    return _this.reply(211, 'End');
  });
};

var _sequence = require('when/sequence');

var _sequence2 = _interopRequireDefault(_sequence);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];