'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _errors = require('../../errors');

var _errors2 = _interopRequireDefault(_errors);

exports['default'] = function (thisCmd) {
  var _this = this;

  var dir = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var useDataSocket = thisCmd === 'STAT' ? false : true;
  var detailed = thisCmd === 'NLST' ? false : true;

  if (useDataSocket && ! ~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  return this.fs.list(dir).tap(function (files) {
    if (!files || !Array.isArray(files)) throw new _errors2['default'].InvalidListArgument();
  }).tap(function () {
    if (useDataSocket) return _this.reply(150);else return _this.reply(213, 'Status begin', null, false);
  }).then(function (files) {
    return files.map(function (file) {
      return detailed ? file.buildStat() : file.name;
    }).join('\r\n');
  }).then(function (msg) {
    return _this.write(msg, useDataSocket ? _this.dataSocket : null);
  }).then(function () {
    if (useDataSocket) return _this.dataSocket.end();
  }).then(function () {
    if (useDataSocket) return _this.reply(226, 'Transfer OK');else return _this.reply(213, 'Status end');
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: thisCmd });
    return _this.reply(431, err.code || 'No such directory');
  });
};

module.exports = exports['default'];