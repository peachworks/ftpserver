'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

exports['default'] = function (thisCmd, fileName) {
  var _this = this;

  if (! ~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  this.dataSocket.pause();
  var append = thisCmd === 'APPE';
  return _when2['default'].promise(function (resolve, reject) {
    return _this.fs.write(fileName, append).then(function (stream) {
      stream.on('error', function (err) {
        _this.dataSocket.emit('error', err);
      });

      _this.dataSocket.on('end', function () {
        _this.reply(226);
        resolve();
      });
      _this.dataSocket.on('error', function (err) {
        _this.bunyan.error(err);
        _this.reply(552);
        reject(err);
      });

      _this.dataSocket.pipe(stream);
      return _this.reply(150);
    }).then(function () {
      _this.dataSocket.resume();
    })['catch'](function (err) {
      _this.bunyan.error(err, { command: 'STOR' });
      _this.reply(553);
      if (_this.dataSocket) {
        _this.dataSocket.end();
      }
      reject(err);
    });
  });
};

module.exports = exports['default'];