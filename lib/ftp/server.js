import net from 'net';
import when from 'when';
import bunyan from 'bunyan';
import sequence from 'when/sequence';
import whenNode from 'when/node';
var fs = whenNode.liftAll(require('fs'));

import Connection from './connection';

// http://www.iana.org/assignments/ftp-commands-extensions/ftp-commands-extensions.xhtml
// RFC 959  https://tools.ietf.org/html/rfc959
// RFC 2389
// RFC 1639
// RFC 3659
// RFC 775
// RFC 743
// RFC 1123

export default class Server {
  constructor({
    host = '127.0.0.1',
    port = 21,
    pasvStart = null,
    pasvEnd = null,
    anonymous = false,
    greeting = null,
    disabledCommands = [],
    timeout = 30 * 1000,
    logLevel = 10,
    override = {
      root: '/',
      fs: null,
      authentication: null
    }
  } = {}) {
    this.host = host;
    this.port = port;
    this.pasvStart = pasvStart;
    this.pasvEnd = pasvEnd;

    this.options = {
      timeout,
      greeting,
      anonymous,
      disabledCommands: disabledCommands.map(c => c.toLocaleUpperCase())
    };
    this.override = {
      FileSystem: override.fs,
      authentication: override.authentication,
      root: override.root || '/'
    };

    this.bunyan = bunyan.createLogger({name: 'FTP Server', level: logLevel});
    this._server = net.createServer();

    this._server.on('error', (err) => {
      err.sender = 'server event';
      this.bunyan.error(err);
    });

    this._server.on('connection', (socket) => {
      let connection = new Connection(socket);
      connection.server = this;
      connection.bunyan = this.bunyan.child({type: 'connection'});
      if (this.override.FileSystem) {
        connection.fs = new this.override.FileSystem();
      }
      connection.fs.connection = connection;
      connection.fs.dir = this.override.root;
      if (this.override.authentication) {
        connection.authenticate = this.override.authentication.bind(connection);
      } else {
        connection.authenticate = () => when.resolve();
      }

      this.bunyan.info('Got server connection.', {ip: connection._socket.remoteAddress, port: connection._socket.remotePort});

      return when.try(() => {
        if (this.options.greeting && this.options.greeting.length) {
          return sequence(this.options.greeting.forEach(line => connection.reply.bind(this, 220, line, null, false)));
        }
      })
      .then(() => {
        let features = [];
        if (this.options.anonymous) features.push('a');
        if (features.length) {
          features.unshift('Features:');
          features.push('.');
        }
        return connection.reply(220, features.length ? features.join(' ') : 'Ready'); // 421 to reject
      });
    });

    this._server.on('close', () => {});
  }

  loadGreeting(greeting) {
    return fs.stat(greeting)
    .then((stat) => stat.isDirectory() ? when.resolve() : when.reject())
    .then(() => fs.readFile(greeting, {encoding: 'utf8'}))
    .catch(ReferenceError, () => null)
    .catch(TypeError, () => null)
    .catch((err) => {
      err.sender = 'loadGreeting';
      this.bunyan.error(err);
      switch (err.code) {
        case 'ENOENT': return greeting;
        default: throw err;
      }
    })
    .then((greet) => greet ? greet.match(/$(.*)^/mgi) : null)
    .then((greet) => {
      this.options.greeting = greet;
    });
  }

  listen() {
    return this.loadGreeting(this.options.greeting)
    .then(() => {
      this._server.listen(this.port, () => {
        this.address = this._server.address();
        this.bunyan.info('Listening', {address: this.address.address, port: this.address.port});
        return this.address;
      });
    })
    .catch(err => {
      err.sender = 'listen';
      this.bunyan.error(err);
      this.greeting = null;
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this._server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
