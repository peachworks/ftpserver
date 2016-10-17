'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, path) {
  var _this = this;

  return this.fs.get(path).then(function (file) {
    return _this.reply(213, file.size);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'SIZE' });
    return _this.reply(550);
  });
};

module.exports = exports['default'];