'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _whenSequence = require('when/sequence');

var _whenSequence2 = _interopRequireDefault(_whenSequence);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

exports['default'] = function () {
  var _this = this;

  var FEATURES = Object.keys(_index2['default']).filter(function (cmd) {
    return _index2['default'][cmd].hasOwnProperty('feat');
  }).map(function (cmd) {
    return _index2['default'][cmd].feat;
  });
  return this.reply(211, 'Extensions supported:', null, false).then(function () {
    return (0, _whenSequence2['default'])(FEATURES.map(function (feature) {
      return _this.write.bind(_this, ' ' + feature);
    }));
  }).then(function () {
    return _this.reply(211, 'End');
  });
};

module.exports = exports['default'];