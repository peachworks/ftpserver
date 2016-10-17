'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _helpersLeftpad = require('../helpers/leftpad');

var _helpersLeftpad2 = _interopRequireDefault(_helpersLeftpad);

var File = (function () {
  function File(path) {
    _classCallCheck(this, File);

    this.path = path;
    this.size = 0;
    this.type = 'f';
    this.mtime = 0;
    this.mode = null;
  }

  _createClass(File, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return this.type.toLocaleLowerCase() === 'd';
    }
  }, {
    key: 'isFile',
    value: function isFile() {
      return this.type.toLocaleLowerCase() === 'f';
    }
  }, {
    key: 'fromStat',
    value: function fromStat(stat) {
      this.size = stat.size;
      this.mtime = (0, _moment2['default'])(stat.mtime).utc().valueOf();
      this.type = stat.isDirectory() ? 'd' : 'f';
      this.mode = stat.mode;
      return this;
    }
  }, {
    key: 'buildStat',
    value: function buildStat() {
      return [this.mode !== null ? [this.isDirectory() ? 'd' : '-', 400 & this.mode ? 'r' : '-', 200 & this.mode ? 'w' : '-', 100 & this.mode ? 'x' : '-', 40 & this.mode ? 'r' : '-', 20 & this.mode ? 'w' : '-', 10 & this.mode ? 'x' : '-', 4 & this.mode ? 'r' : '-', 2 & this.mode ? 'w' : '-', 1 & this.mode ? 'x' : '-'].join('') : this.isDirectory() ? 'drwxr-xr-x' : '-rw-r--r--', '1', 'owner', 'group', (0, _helpersLeftpad2['default'])(this.size, 12), (0, _helpersLeftpad2['default'])((0, _moment2['default'])(this.mtime).format('MMM DD HH:mm'), 12), this.name].join(' ');
    }
  }, {
    key: 'name',
    get: function get() {
      if (!this.path) return undefined;
      return this.path.split('/').slice(-1)[0];
    }
  }]);

  return File;
})();

exports['default'] = File;
module.exports = exports['default'];