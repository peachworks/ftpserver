"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  if (!this.dataSocket) {
    return this.reply(202);
  } else {
    if (this.dataSocketConnected) {
      this.dataSocket.destroy();
      return this.reply(226);
    } else {
      return this.reply(225);
    }
  }
};

module.exports = exports["default"];