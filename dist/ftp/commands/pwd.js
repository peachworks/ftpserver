'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd) {
  var argDir = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  // 550 to reject
  var dir = (argDir || this.fs.dir).replace('"', '""').replace('\f', '');
  return this.reply(257, '"' + dir + '"' + (this.fs.msg ? ' ' + this.fs.msg : ''));
};

module.exports = exports['default'];