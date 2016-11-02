import when from 'when';

export default function (thisCmd, ...fileParts) {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  const fileName = fileParts.join(' ');
  this.dataSocket.pause();
  const append = thisCmd === 'APPE';
  return when.promise((resolve, reject) => {
    return this.fs.write(fileName, append)
    .then((stream) => {
      stream.on('error', (err) => {
        this.dataSocket.emit('error', err);
      });

      this.dataSocket.on('end', () => {
        this.reply(226);
        resolve();
      });
      this.dataSocket.on('error', (err) => {
        this.bunyan.error(err);
        this.reply(552);
        reject(err);
      });
      this.dataSocket.on('data', (data) => {
        stream.write(data, this.dataEncoding);
      });
      return this.reply(150);
    })
    .then(() => {
      this.dataSocket.resume();
    })
    .catch((err) => {
      this.bunyan.error(err, {command: 'STOR'});
      this.reply(553);
      if (this.dataSocket) {
        this.dataSocket.end();
      }
      reject(err);
    });
  });
}
