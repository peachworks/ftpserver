'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, param) {
  return this.reply(param === 'F' ? 200 : 504);
};

module.exports = exports['default'];