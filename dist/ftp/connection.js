'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _workerQueue = require('../worker-queue');

var _workerQueue2 = _interopRequireDefault(_workerQueue);

var _fileSystem = require('./file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var NO_AUTH_CMDS = ['USER', 'PASS', 'ACCT', 'QUIT', 'FEAT', 'SYST', 'NOOP', 'HELP'];

var Connection = (function () {
  function Connection(socket) {
    var _this = this;

    _classCallCheck(this, Connection);

    this._socket = socket;
    this._socket.setTimeout(0);
    this._socket.setNoDelay();

    this.fs = new _fileSystem2['default']();
    this.root = '/';
    this.lastCommand = _moment2['default'].utc();

    this.dataSocket = null;
    this.dataSocketConnected = false;

    this.commandQueue = new _workerQueue2['default']();
    this.commandQueue.active = true;

    this._socket.on('data', function (buffer) {
      buffer = buffer.toString('utf-8').split('\r\n').filter(function (b) {
        return !!b;
      });
      buffer.map(function (data) {
        var parts = data.split(' ');
        parts[0] = parts[0].toLocaleUpperCase();

        var _parts = _toArray(parts);

        var cmd = _parts[0];

        var args = _parts.slice(1);

        _this.bunyan.debug('Command', { cmd: cmd, parameter: args });

        _this.lastCommand = _moment2['default'].utc();

        var enqueue = true;
        if (_commands2['default'].hasOwnProperty(cmd)) {
          var command = _commands2['default'][cmd];
          enqueue = command.enqueue;
        }

        if (enqueue) {
          _this.commandQueue.push(cmd, _this.handleCommand.bind(_this, cmd, args));
        } else {
          _this.handleCommand(cmd, args);
        }
      });
    }).on('close', function () {
      _this.bunyan.info('Closing connection.');
      if (_this.dataSocket) {
        _this.dataSocket.end();
      }
    }).on('timeout', function () {
      _this.bunyan.info('Timeout connection.');
      _this._socket.emit('close');
    }).on('error', function (err) {
      _this.bunyan.error(err);
    });
  }

  _createClass(Connection, [{
    key: 'handleCommand',
    value: function handleCommand(cmd, args) {
      var _this2 = this;

      return _when2['default']['try'](function () {
        if (~_this2.server.options.disabledCommands.indexOf(cmd)) {
          return _this2.reply(502, 'Command not allowed.');
        }

        if (!_this2.server.options.anonymous && !_this2.authenticated && ! ~NO_AUTH_CMDS.indexOf(cmd)) {
          return _this2.reply(530, 'Command requires authentication.');
        }

        if (_commands2['default'].hasOwnProperty(cmd)) {
          return _commands2['default'][cmd].fn.apply(_this2, [cmd].concat(args));
        } else {
          return _this2.reply(502);
        }
      });
    }
  }, {
    key: 'write',
    value: function write(message) {
      var socket = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      socket = socket || this._socket;
      return new Promise(function (resolve, reject) {
        if (socket && socket.writable) {
          //this.bunyan.info({write: message});
          socket.write(message + '\r\n', 'utf-8', resolve);
        } else {
          reject(new Error('Socket not writable'));
        }
      });
    }
  }, {
    key: 'reply',
    value: function reply(status) {
      var message = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var socket = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var eol = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      if (!message) message = _messages2['default'][status] || 'No information.';

      return this.write(status + (eol ? ' ' : '-') + message, socket);
    }
  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      var code = arguments.length <= 0 || arguments[0] === undefined ? 421 : arguments[0];

      return this.reply(code, 'Closing connection.').then(function () {
        return _this3._socket.end();
      });
    }
  }, {
    key: 'previousCommand',
    get: function get() {
      return this.commandQueue.previous;
    }
  }, {
    key: 'currentCommand',
    get: function get() {
      return this.commandQueue.current;
    }
  }]);

  return Connection;
})();

exports['default'] = Connection;
module.exports = exports['default'];