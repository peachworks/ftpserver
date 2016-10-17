'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ftpServer = require('./ftp/server');

var _ftpServer2 = _interopRequireDefault(_ftpServer);

var FTPApp = function FTPApp() {
  _classCallCheck(this, FTPApp);

  this.server = new _ftpServer2['default']({
    host: '127.0.0.1',
    port: 8080,
    pasvStart: 30000,
    pasvEnd: 31000
  });
  //logLevel: 60
  this.server.listen();
};

exports['default'] = new FTPApp();
module.exports = exports['default'];