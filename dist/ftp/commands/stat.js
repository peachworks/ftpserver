'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (thisCmd) {
  var _this = this;

  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (path) {
    return this.fs.get(path).then(function (file) {
      if (file.isDirectory()) {
        return _list2.default.bind(_this)(thisCmd, path); // Send list
      } else {
        return _this.reply(212, file.buildStat()); // Send stat
      }
    }).catch(function (err) {
      _this.bunyan.error(err, { command: 'STAT' });
      return _this.reply(450);
    });
  } else {
    // Reply with info/status of server
    return this.reply(211, 'Status OK');
  }
};

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];