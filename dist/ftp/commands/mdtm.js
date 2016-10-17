'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

exports['default'] = function (thisCmd, path) {
  var _this = this;

  return this.fs.get(path).then(function (file) {
    return _this.reply(213, (0, _moment2['default'])(file.mtime).format('YYYYMMDDHHmmss.SSS'));
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'SIZE' });
    return _this.reply(550);
  });
};

module.exports = exports['default'];