'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (thisCmd, password) {
  var _this = this;

  var SENT_USER = this.username && ~['USER'].indexOf(this.previousCommand);
  if (this.server.options.anonymous && SENT_USER) {
    return this.reply(202, 'Permission granted with USER command.');
  }
  if (!this.username || !SENT_USER) {
    return this.reply(503); // Previous request must be USER
  }
  // 230 : permission granted
  // 332 : require account name (ACCT)

  this.authenticated = false;
  this.requireAccount = false;
  return this.authenticate(this.username, password).then(function () {
    var resp = arguments.length <= 0 || arguments[0] === undefined ? 230 : arguments[0];

    if (resp !== 332) _this.authenticated = true;else _this.requireAccount = true;
    return _this.reply(resp);
  })['catch'](function (err) {
    _this.bunyan.error(err, { command: 'PASS' });
    _this.username = null;
    return _this.reply(530, 'Authentication failed.');
  });
};

module.exports = exports['default'];