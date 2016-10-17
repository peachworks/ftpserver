'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

exports['default'] = function (cmd, command) {
  if (command) {
    if (_index2['default'].hasOwnProperty(command)) {
      var _commands$command = _index2['default'][command];
      var syntax = _commands$command.syntax;
      var help = _commands$command.help;
      var obsolete = _commands$command.obsolete;

      if (obsolete) this.reply(214, 'OBSOLETE', null, false);
      this.reply(214, syntax, null, false);
      this.reply(214, help);
    } else {
      this.reply(502, 'Unknown command ' + command);
    }
  } else {
    var supportedCommands = Object.keys(_index2['default']).filter(function (commd) {
      return !_index2['default'][commd].obsolete;
    }).reduce(function (prev, commd, index) {
      return prev + (index % 5 === 0 ? '\r\n' : '\t') + ' ' + commd;
    }, '');

    this.reply(211, 'The following commands are supported:', null, false);
    this.write(supportedCommands);
    this.reply(211, 'Use "HELP <cmd>" for sytax help.');
  }
};

module.exports = exports['default'];