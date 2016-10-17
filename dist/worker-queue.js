'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var WorkerQueue = (function () {
  function WorkerQueue() {
    _classCallCheck(this, WorkerQueue);

    this.id = 0;
    this.q = [];
    this.running = false;
    this.active = false;
    this.current = null;
    this.previous = null;
  }

  _createClass(WorkerQueue, [{
    key: 'push',
    value: function push(cmd, fn) {
      if (typeof fn !== 'function') throw new TypeError('WorkerQueue.push must be passed a function.');

      var defer = _when2['default'].defer();
      this.q.push({ cmd: cmd, fn: fn, id: this.id++, defer: defer });
      if (!this.running) {
        this.process();
      }
      return defer.promise;
    }
  }, {
    key: 'process',
    value: function process() {
      var _this = this;

      this.running = true;
      if (!this.active) {
        this.running = false;
        return;
      }
      var item = this.q.shift();
      if (item) {
        this.current = item.cmd;
        item.fn().then(item.defer.resolve)['catch'](item.defer.reject)['finally'](function () {
          _this.previous = item.cmd;
          _this.current = null;
          _this.process();
        });
      } else {
        this.running = false;
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.active = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.active = true;
      this.process();
    }
  }]);

  return WorkerQueue;
})();

exports['default'] = WorkerQueue;
module.exports = exports['default'];