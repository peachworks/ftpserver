'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, file) {
  var _this = this;

  return this.fs.rename(file).then(function () {
    return _this.reply(350);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'RNFR' });
    return _this.reply(550);
  });
};

module.exports = exports['default'];