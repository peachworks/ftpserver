'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('./ftp/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FTPApp = function FTPApp() {
  _classCallCheck(this, FTPApp);

  this.server = new _server2.default({
    host: '127.0.0.1',
    port: 8080,
    pasvStart: 30000,
    pasvEnd: 31000
  });
  this.server.listen();
};

exports.default = new FTPApp();
module.exports = exports['default'];