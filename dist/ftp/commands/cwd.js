'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, target) {
  var _this = this;

  return this.fs.chdir(target).then(function () {
    return _this.reply(250);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'CWD' });
    return _this.reply(550, err.Error);
  });
};

module.exports = exports['default'];