'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _whenSequence = require('when/sequence');

var _whenSequence2 = _interopRequireDefault(_whenSequence);

var _whenNode = require('when/node');

var _whenNode2 = _interopRequireDefault(_whenNode);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

// http://www.iana.org/assignments/ftp-commands-extensions/ftp-commands-extensions.xhtml
// RFC 959  https://tools.ietf.org/html/rfc959
// RFC 2389
// RFC 1639
// RFC 3659
// RFC 775
// RFC 743
// RFC 1123

var fs = _whenNode2['default'].liftAll(require('fs'));

var Server = (function () {
  function Server() {
    var _this = this;

    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$host = _ref.host;
    var host = _ref$host === undefined ? '127.0.0.1' : _ref$host;
    var _ref$port = _ref.port;
    var port = _ref$port === undefined ? 21 : _ref$port;
    var _ref$pasvStart = _ref.pasvStart;
    var pasvStart = _ref$pasvStart === undefined ? null : _ref$pasvStart;
    var _ref$pasvEnd = _ref.pasvEnd;
    var pasvEnd = _ref$pasvEnd === undefined ? null : _ref$pasvEnd;
    var _ref$anonymous = _ref.anonymous;
    var anonymous = _ref$anonymous === undefined ? false : _ref$anonymous;
    var _ref$greeting = _ref.greeting;
    var greeting = _ref$greeting === undefined ? null : _ref$greeting;
    var _ref$disabledCommands = _ref.disabledCommands;
    var disabledCommands = _ref$disabledCommands === undefined ? [] : _ref$disabledCommands;
    var _ref$timeout = _ref.timeout;
    var timeout = _ref$timeout === undefined ? 30 * 1000 : _ref$timeout;
    var _ref$logLevel = _ref.logLevel;
    var logLevel = _ref$logLevel === undefined ? 10 : _ref$logLevel;
    var _ref$override = _ref.override;
    var override = _ref$override === undefined ? {
      fs: null,
      authentication: null
    } : _ref$override;

    _classCallCheck(this, Server);

    this.host = host;
    this.port = port;
    this.pasvStart = pasvStart;
    this.pasvEnd = pasvEnd;

    this.options = {
      timeout: timeout,
      greeting: greeting,
      anonymous: anonymous,
      disabledCommands: disabledCommands.map(function (c) {
        return c.toLocaleUpperCase();
      })
    };
    this.override = {
      FileSystem: override.fs,
      authentication: override.authentication
    };

    this.bunyan = _bunyan2['default'].createLogger({ name: 'FTP Server', level: logLevel });
    this._server = _net2['default'].createServer();

    this._server.on('error', function (err) {
      err.sender = 'server event';
      _this.bunyan.error(err);
    });

    this._server.on('connection', function (socket) {
      var connection = new _connection2['default'](socket);
      connection.server = _this;
      connection.bunyan = _this.bunyan.child({ type: 'connection' });
      if (_this.override.FileSystem) {
        connection.fs = new _this.override.FileSystem();
        connection.fs.connection = connection;
      }
      if (_this.override.authentication) {
        connection.authenticate = _this.override.authentication.bind(connection);
      } else {
        connection.authenticate = function () {
          return _when2['default'].resolve();
        };
      }

      _this.bunyan.info('Got server connection.', { ip: connection._socket.remoteAddress, port: connection._socket.remotePort });

      return _when2['default']['try'](function () {
        if (_this.options.greeting && _this.options.greeting.length) {
          return (0, _whenSequence2['default'])(_this.options.greeting.forEach(function (line) {
            return connection.reply.bind(_this, 220, line, null, false);
          }));
        }
      }).then(function () {
        var features = [];
        if (_this.options.anonymous) features.push('a');
        if (features.length) {
          features.unshift('Features:');
          features.push('.');
        }
        return connection.reply(220, features.length ? features.join(' ') : 'Ready'); // 421 to reject
      });
    });

    this._server.on('close', function () {});
  }

  _createClass(Server, [{
    key: 'loadGreeting',
    value: function loadGreeting(greeting) {
      var _this2 = this;

      return fs.stat(greeting).then(function (stat) {
        return stat.isDirectory() ? _when2['default'].resolve() : _when2['default'].reject();
      }).then(function () {
        return fs.readFile(greeting, { encoding: 'utf8' });
      })['catch'](ReferenceError, function () {
        return null;
      })['catch'](TypeError, function () {
        return null;
      })['catch'](function (err) {
        err.sender = 'loadGreeting';
        _this2.bunyan.error(err);
        switch (err.code) {
          case 'ENOENT':
            return greeting;
          default:
            throw err;
        }
      }).then(function (greet) {
        return greet ? greet.match(/$(.*)^/mgi) : null;
      }).then(function (greet) {
        _this2.options.greeting = greet;
      });
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      return this.loadGreeting(this.options.greeting).then(function () {
        _this3._server.listen(_this3.port, function () {
          _this3.address = _this3._server.address();
          _this3.bunyan.info('Listening', { address: _this3.address.address, port: _this3.address.port });
          return _this3.address;
        });
      })['catch'](function (err) {
        err.sender = 'listen';
        _this3.bunyan.error(err);
        _this3.greeting = null;
      });
    }
  }, {
    key: 'close',
    value: function close() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._server.close(function (err) {
          if (err) reject(err);else resolve();
        });
      });
    }
  }]);

  return Server;
})();

exports['default'] = Server;
module.exports = exports['default'];