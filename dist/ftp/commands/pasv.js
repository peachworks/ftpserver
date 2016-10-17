'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

exports['default'] = function () {
  var _this = this;

  function pasvError(err) {
    var code = arguments.length <= 1 || arguments[1] === undefined ? 421 : arguments[1];

    this.bunyan.error(err, { command: 'PASV' });
    this.dataSocket = null;
    return this.reply(code);
  }

  if (!this.server.pasvStart || !this.server.pasvEnd) {
    return pasvError(new Error('Passive port range not set.'));
  }

  function sendConfirmation(port) {
    var host = this.server.host.split('.').join(',');

    var portI1 = port / 256 | 0;
    var portI2 = port % 256;

    this._socket.pause();
    return this.reply(227, 'PASV OK (' + [host, portI1, portI2].join(',') + ')');
  }

  if (this.dataSocket) {
    this.bunyan.trace('Destroying existing dataSocket');
    this.dataSocket.end();
  }

  var pasvPort = this.server.pasvStart;
  var pasv = _net2['default'].createServer();
  pasv.on('error', function (err) {
    if (err && err.code === 'EADDRINUSE' && pasvPort < _this.server.pasvEnd) {
      pasv.listen(++pasvPort);
    } else {
      pasvError.call(_this, err);
    }
  }).on('listening', function () {
    pasv.removeAllListeners('error');
    pasv.on('error', function (err) {
      return pasvError.call(_this, err);
    });

    sendConfirmation.call(_this, pasv.address().port);
  }).on('connection', function (socket) {
    if (_this._socket.remoteAddress !== socket.remoteAddress) {
      socket.destroy();
      return pasvError.call(_this, new Error('Addresses do not match.'), 550).then(function () {
        return _this.close();
      });
    }
    _this.dataSocket = socket;
    _this.dataSocket.setEncoding(_this.server.dataEncoding);
    _this.dataSocketConnected = true;

    _this.dataSocket.on('data', function () {
      _this.commandQueue.disable();
    });
    _this.dataSocket.on('close', function () {
      pasv.close();
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

    _this._socket.resume();
  }).on('close', function () {
    _this.dataSocket = null;
    _this.dataSocketConnected = false;
    _this.commandQueue.enable();
  }).listen(pasvPort);
};

module.exports = exports['default'];