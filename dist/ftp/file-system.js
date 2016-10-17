'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _whenNode = require('when/node');

var _whenNode2 = _interopRequireDefault(_whenNode);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var fs = _whenNode2['default'].liftAll(_fs2['default']);

var FileSystem = (function () {
  function FileSystem(root) {
    _classCallCheck(this, FileSystem);

    this.dir = root || '/';
    this.msg = null;

    this.temp = null;
  }

  _createClass(FileSystem, [{
    key: 'list',
    value: function list() {
      var dir = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      dir = dir || this.dir;
      return fs.readdir(dir).tap(function (itemNames) {
        return Array.isArray(itemNames);
      }).then(function (itemNames) {
        return itemNames.map(function (name) {
          return _path2['default'].join(dir, name);
        });
      }).then(function (itemPaths) {
        return itemPaths.filter(function (path) {
          return fs.access(path, fs.R_OK | fs.W_OK).then(function () {
            return true;
          })['catch'](function () {
            return false;
          });
        });
      }).then(function (itemPaths) {
        return _when2['default'].settle(itemPaths.map(function (path) {
          return fs.stat(path).then(function (stat) {
            return new _file2['default'](path).fromStat(stat);
          });
        }));
      }).then(function (itemPromises) {
        return itemPromises.filter(function (promise) {
          return promise.state === 'fulfilled';
        });
      }).then(function (itemPromises) {
        return itemPromises.map(function (promise) {
          return promise.value;
        });
      });
    }
  }, {
    key: 'write',
    value: function write(filePath) {
      var append = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      filePath = _path2['default'].resolve(this.dir, filePath);
      return _when2['default']['try'](function () {
        var stream = _fs2['default'].createWriteStream(filePath, { flags: !append ? 'w+' : 'a+' });
        stream.on('error', function () {
          return fs.unlink(filePath);
        });
        return stream;
      });
    }
  }, {
    key: 'read',
    value: function read(filePath) {
      filePath = _path2['default'].resolve(this.dir, filePath);
      return _when2['default']['try'](function () {
        return _fs2['default'].createReadStream(filePath, { flags: 'r' });
      });
    }
  }, {
    key: 'get',
    value: function get(path) {
      path = _path2['default'].resolve(this.dir, path);
      return fs.stat(path).then(function (stat) {
        return new _file2['default'](path).fromStat(stat);
      });
    }
  }, {
    key: 'chdir',
    value: function chdir(dir) {
      var _this = this;

      dir = _path2['default'].resolve(this.dir, dir);
      return fs.stat(dir).then(function (stat) {
        if (!stat.isDirectory()) throw new Error('Argument is not a valid directory.');
      }).then(function () {
        return _this.dir = dir;
      });
    }
  }, {
    key: 'mkdir',
    value: function mkdir(dir) {
      dir = _path2['default'].resolve(this.dir, dir);
      return fs.mkdir(dir).then(function () {
        return dir;
      });
    }
  }, {
    key: 'delete',
    value: function _delete(path) {
      path = _path2['default'].resolve(this.dir, path);
      return fs.stat(path).then(function (stat) {
        if (stat.isFile()) return fs.unlink(path);else if (stat.isDirectory()) return fs.rmdir(path);
      });
    }
  }, {
    key: 'rename',
    value: function rename(oldName) {
      var _this2 = this;

      var newName = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      return _when2['default']['try'](function () {
        if (oldName && !newName) {
          var _ret = (function () {
            var oldPath = _path2['default'].resolve(_this2.dir, oldName);
            return {
              v: fs.stat(oldPath).then(function (stat) {
                if (!stat.isFile()) throw new Error('File does not exist.');
                _this2.temp = oldPath;
              })
            };
          })();

          if (typeof _ret === 'object') return _ret.v;
        } else {
          if (!_this2.temp) throw new Error('Unable to resolve old name.');
          var newPath = _path2['default'].resolve(_this2.dir, newName);
          var oldPath = _this2.temp;
          _this2.temp = null;
          return fs.rename(oldPath, newPath);
        }
      });
    }
  }, {
    key: 'generate',
    value: function generate(dir) {
      dir = _path2['default'].resolve(this.dir, dir);
      return _when2['default']['try'](function () {
        // todo: generate unique file name
        return 'test.txt';
      });
    }
  }]);

  return FileSystem;
})();

exports['default'] = FileSystem;
module.exports = exports['default'];