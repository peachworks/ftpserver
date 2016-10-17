'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, accountName) {
  var SENT_USER_PASS = this.username && ~['PASS'].indexOf(this.previousCommand) && this.requireAccount;
  if (!SENT_USER_PASS) {
    return this.reply(532);
  }

  this.accountName = accountName;
  this.authenticated = true;
  delete this.requireAccount;
  return this.reply(230);
};

module.exports = exports['default'];