'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, dir) {
  var _this = this;

  this.fs['delete'](dir).then(function () {
    _this.reply(250);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'RMD' });
    _this.reply(550);
  });
};

module.exports = exports['default'];