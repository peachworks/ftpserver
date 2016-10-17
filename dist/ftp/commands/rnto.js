'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, newName) {
  var _this = this;

  if (! ~['RNFR'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  return this.fs.rename(null, newName).then(function () {
    _this.reply(250);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'RNTO' });
    _this.reply(550);
  });
};

module.exports = exports['default'];