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

  return this.fs.read(fileName).tap(function () {
    return _this.reply(150);
  }).then(function (stream) {
    var deferred = _when2['default'].defer();
    stream.on('data', function (chunk) {
      return _this.dataSocket.write(chunk, _this.dataEncoding);
    }).on('end', function () {
      return deferred.resolve(_this.dataSocket.end());
    }).on('error', function (err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  }).then(function () {
    return _this.reply(226);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'RETR' });
    var code = 425;
    switch (err.code) {
      case 'EACCES':
        code = 451;break;
    }
    _this.reply(code);
  });
};

module.exports = exports['default'];