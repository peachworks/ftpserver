'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, file) {
  var _this = this;

  return this.fs['delete'](file).then(function () {
    return _this.reply(250);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'DELE' });
    return _this.reply(550, err.Error);
  });
};

module.exports = exports['default'];