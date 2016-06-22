import when from 'when';
import _ from 'lodash';
import fsPath from 'path';
import bunyan from 'bunyan';

import FileSystem from './file-system';
import messages from './messages';
import commands from './commands';

const REQ_AUTH_PATHS = [
  'PWD',
  'LIST',
  'STOR'
];

export default class Connection {
  constructor(socket) {
    this._socket = socket;
    this._socket.setTimeout(0);
    this._socket.setNoDelay();

    this._mode = 'PORT';

    this.fs = new FileSystem();
    this.bunyan = bunyan.createLogger({name: 'FTP Server Connection'});
    this.previousCommand = null;
    this.serverAddress = null;
    this.root = '/';
    this.cwd = '/';

    this.acceptingConnections = true;
    this.dataSocket = null;

    this._socket.on('data', (data) => {
      const parts = _.trim(data.toString('utf-8')).split(' ');
      const command = parts[0].toLocaleUpperCase();
      const args = parts.slice(1, parts.length);

      this.bunyan.info({command, parameter: args});

      if (~REQ_AUTH_PATHS.indexOf(command) && !this.authenticated) {
        this.reply(550, 'Command requires authentication.');
        return;
      }

      if (commands.hasOwnProperty(command)) {
        commands[command].apply(this, args);
      } else {
        this.reply(502);
      }
      this.previousCommand = command;
    })
    .on('close', () => {
      if (this.dataSocket) {
        this.dataSocket.end();
      }
    })
    .on('error', (err) => {
      this.bunyan.error(err);
    });
  }

  authenticate(username, password) {
    return when.resolve(230);
  }

  isPassiveMode() {
    return this._mode === 'PASV';
  }

  write(message, socket = null) {
    socket = socket || this._socket;
    return new Promise((resolve, reject) => {
      if (socket.writable) {
        this.bunyan.info({write: message});
        socket.write(message + '\r\n', 'utf-8', resolve);
      } else {
        reject(new Error('Socket not writable'));
      }
    });
  }

  reply(status, message = null, socket = null, eol = true) {
    if (!message) message = messages[status] || 'No information.';

    return this.write(status + (eol ? ' ' : '-') + message, socket);
  }

  close() {
    return this.reply(421, 'Closing connection.')
    .then(() => this._socket.end());
  }
}