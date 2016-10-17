'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, dir) {
  var _this = this;

  return this.fs.mkdir(dir).then(function (madeDir) {
    return _this.reply(257, madeDir);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'MKD' });
    return _this.reply(550);
  });
};

module.exports = exports['default'];