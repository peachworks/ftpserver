/* eslint no-multi-spaces: 0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _acct = require('./acct');

var _acct2 = _interopRequireDefault(_acct);

var _syst = require('./syst');

var _syst2 = _interopRequireDefault(_syst);

var _feat = require('./feat');

var _feat2 = _interopRequireDefault(_feat);

var _pwd = require('./pwd');

var _pwd2 = _interopRequireDefault(_pwd);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _pasv = require('./pasv');

var _pasv2 = _interopRequireDefault(_pasv);

var _port = require('./port');

var _port2 = _interopRequireDefault(_port);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _cwd = require('./cwd');

var _cwd2 = _interopRequireDefault(_cwd);

var _stor = require('./stor');

var _stor2 = _interopRequireDefault(_stor);

var _cdup = require('./cdup');

var _cdup2 = _interopRequireDefault(_cdup);

var _retr = require('./retr');

var _retr2 = _interopRequireDefault(_retr);

var _mkd = require('./mkd');

var _mkd2 = _interopRequireDefault(_mkd);

var _rmd = require('./rmd');

var _rmd2 = _interopRequireDefault(_rmd);

var _dele = require('./dele');

var _dele2 = _interopRequireDefault(_dele);

var _rnfr = require('./rnfr');

var _rnfr2 = _interopRequireDefault(_rnfr);

var _rnto = require('./rnto');

var _rnto2 = _interopRequireDefault(_rnto);

var _quit = require('./quit');

var _quit2 = _interopRequireDefault(_quit);

var _stat = require('./stat');

var _stat2 = _interopRequireDefault(_stat);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _noop = require('./noop');

var _noop2 = _interopRequireDefault(_noop);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _abor = require('./abor');

var _abor2 = _interopRequireDefault(_abor);

var _site = require('./site');

var _site2 = _interopRequireDefault(_site);

var _mdtm = require('./mdtm');

var _mdtm2 = _interopRequireDefault(_mdtm);

var _opts = require('./opts');

var _opts2 = _interopRequireDefault(_opts);

var _stru = require('./stru');

var _stru2 = _interopRequireDefault(_stru);

var _mode = require('./mode');

var _mode2 = _interopRequireDefault(_mode);

var _allo = require('./allo');

var _allo2 = _interopRequireDefault(_allo);

/*
Command Types:
a: access control
p: parameter setting
s: service execution
*/

exports['default'] = {
  AUTH: {
    fn: _auth2['default'],
    syntax: 'AUTH <type>',
    help: 'Not current supported',
    enqueue: true
  },
  USER: {
    fn: _user2['default'],
    syntax: 'USER <username>',
    help: 'Set connection username',
    enqueue: true
  },
  PASS: {
    fn: _pass2['default'],
    syntax: 'PASS <password>',
    help: 'Login with provided username and password',
    enqueue: true
  },
  ACCT: {
    fn: _acct2['default'],
    syntax: 'ACCT <account>',
    help: 'Set connection account name',
    enqueue: true
  },
  SYST: {
    fn: _syst2['default'],
    syntax: 'SYST',
    help: 'Get the current system',
    enqueue: true
  },
  FEAT: {
    fn: _feat2['default'],
    sytax: 'FEAT',
    help: 'Get the command feature list',
    enqueue: true
  },
  OPTS: {
    fn: _opts2['default'],
    syntax: 'OPTS <command> <option (optional)>',
    help: 'Set command option',
    enqueue: true
  },
  PWD: {
    fn: _pwd2['default'],
    syntax: 'PWD',
    help: 'Get the working directory',
    enqueue: true
  },
  XPWD: { // synonym
    fn: _pwd2['default'],
    syntax: 'XPWD',
    help: 'Get the working directory',
    enqueue: true
  },
  TYPE: {
    fn: _type2['default'],
    syntax: 'TYPE <mode>',
    help: 'Set the transfer mode',
    enqueue: true
  },
  PASV: {
    fn: _pasv2['default'],
    syntax: 'PASV',
    help: 'Initiate passive mode data connection',
    enqueue: true
  },
  PORT: {
    fn: _port2['default'],
    syntax: 'PORT <x.x.x.x.x.x>',
    help: 'Set address and port for active data connection',
    enqueue: true
  },
  LIST: {
    fn: _list2['default'],
    syntax: 'LIST <path (optional)>',
    help: 'Get information of a file or directory',
    enqueue: true
  },
  NLST: {
    fn: _list2['default'],
    syntax: 'NLST <path (optional)>',
    help: 'Get list of file names',
    enqueue: true
  },
  CWD: {
    fn: _cwd2['default'],
    syntax: 'CWD <path>',
    help: 'Set the working directory',
    enqueue: true
  },
  XCWD: { // synonym
    fn: _cwd2['default'],
    syntax: 'XCWD <path>',
    help: 'Set the working directory',
    enqueue: true
  },
  STOR: {
    fn: _stor2['default'],
    syntax: 'STOR <path>',
    help: 'Store a file at the given path',
    enqueue: true
  },
  APPE: {
    fn: _stor2['default'],
    syntax: 'APPE <path>',
    help: 'Append or store a file at the given path',
    enqueue: true
  },
  CDUP: {
    fn: _cdup2['default'],
    sytanx: 'CDUP',
    help: 'Move up a directory',
    enqueue: true
  },
  XCUP: { // synonym
    fn: _cdup2['default'],
    sytanx: 'XCUP',
    help: 'Move up a directory',
    enqueue: true
  },
  RETR: {
    fn: _retr2['default'],
    syntax: 'RETR <path>',
    help: 'Read contents of a file at the given path',
    enqueue: true
  },
  MKD: {
    fn: _mkd2['default'],
    syntax: 'MKD <path>',
    help: 'Create the given directory',
    enqueue: true
  },
  XMKD: { // synonym
    fn: _mkd2['default'],
    syntax: 'XMKD <path>',
    help: 'Create the given directory',
    enqueue: true
  },
  RMD: {
    fn: _rmd2['default'],
    syntax: 'RMD <path>',
    help: 'Delete the given directory',
    enqueue: true
  },
  XRMD: { // synonym
    fn: _rmd2['default'],
    syntax: 'XRMD <path>',
    help: 'Delete the given directory',
    enqueue: true
  },
  DELE: {
    fn: _dele2['default'],
    syntax: 'DELE <path>',
    help: 'Delete the given file',
    enqueue: true
  },
  RNFR: {
    fn: _rnfr2['default'],
    syntax: 'RNFR <current name>',
    help: 'Set file or directory to be renamed',
    enqueue: true
  },
  RNTO: {
    fn: _rnto2['default'],
    syntax: 'RNTO <new name>',
    help: 'Rename the file from RNFR',
    enqueue: true
  },
  QUIT: {
    fn: _quit2['default'],
    syntax: 'QUIT',
    help: 'Disconnect',
    enqueue: false
  },
  STAT: {
    fn: _stat2['default'],
    syntax: 'STAT <path (optional)>',
    help: 'Get info on given file or directory, otherwise server status',
    enqueue: true
  },
  HELP: {
    fn: _help2['default'],
    syntax: 'HELP <command (optional)>',
    help: 'Get info on given command, otherwise list supported commands',
    enqueue: true
  },
  NOOP: {
    fn: _noop2['default'],
    syntax: 'NOOP',
    help: 'No operation',
    enqueue: true
  },
  ABOR: {
    fn: _abor2['default'],
    syntax: 'ABOR',
    help: 'Cancel current file transfer',
    enqueue: false
  },
  SITE: {
    fn: _site2['default'],
    syntax: 'SITE <command> <argument (optional)>',
    help: 'Run custom command',
    enqueue: true
  },
  SIZE: {
    fn: _size2['default'],
    syntax: 'SIZE <path>',
    help: 'Get size of given file or directory',
    feat: 'SIZE',
    enqueue: true
  },
  MDTM: {
    fn: _mdtm2['default'],
    syntax: 'MDTM <path>',
    help: 'Get last modified time of file or directory',
    feat: 'MDTM',
    enqueue: true
  },

  STRU: {
    fn: _stru2['default'],
    syntax: 'STRU <type>',
    help: 'Set file transfer structure',
    enqueue: true,
    obsolete: true
  },
  MODE: {
    fn: _mode2['default'],
    syntax: 'MODE <mode>',
    help: 'Set transfer mode',
    enqueue: true,
    obsolete: true
  },
  ALLO: {
    fn: _allo2['default'],
    syntax: 'ALLO <size>',
    help: 'Allocate disk space for file',
    enqueue: true,
    obsolete: true
  }
};
module.exports = exports['default'];