'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _net = require('net');

exports['default'] = function (thisCmd, info) {
  var _this = this;

  return _when2['default']['try'](function () {
    info = info.split(',');
    if (info.length !== 6) return _this.reply(425);

    var ip = info.slice(0, 4).join('.');
    var port = info.slice(4).map(function (p) {
      return parseInt(p);
    });
    port = port[0] * 256 + port[1];

    return { ip: ip, port: port };
  }).then(function (_ref) {
    var ip = _ref.ip;
    var port = _ref.port;

    _this.dataSocket = new _net.Socket();
    _this.dataSocket.setEncoding(_this.server.dataEncoding);
    _this.dataSocketConnected = true;

    _this.dataSocket.on('data', function () {
      _this.commandQueue.disable();
    });
    _this.dataSocket.on('close', function () {
      _this.commandQueue.enable();
      _this.dataSocketConnected = false;
    });
    _this.dataSocket.on('error', function (err) {
      // todo: resume
      switch (err.code) {
        case 'ECONNRESET':
          break;
      }
    });

    return _this.dataSocket.connect({
      host: ip,
      port: port
    });
  }).then(function () {
    return _this.reply(200);
  });
};

module.exports = exports['default'];