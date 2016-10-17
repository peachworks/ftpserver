'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, cmd, option) {
  console.log('OPTS', cmd, option);
  return this.reply(501);
};

module.exports = exports['default'];