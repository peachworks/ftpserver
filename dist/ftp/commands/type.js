'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, dataEncoding) {
  dataEncoding = dataEncoding.toLocaleUpperCase();
  switch (dataEncoding) {
    case 'A':
      this.dataEncoding = 'utf8';
    case 'I':
    case 'L':
      this.dataEncoding = 'binary';
      return this.reply(200);
    default:
      return this.reply(501);
  }
};

module.exports = exports['default'];