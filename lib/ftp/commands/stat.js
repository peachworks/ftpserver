import list from './list';

export default function (thisCmd, ...pathParts) {
  if (pathParts && pathParts.length) {
    const path = pathParts.join(' ');
    return this.fs.get(path)
    .then((file) => {
      if (file.isDirectory()) {
        return list.bind(this)(thisCmd, path); // Send list
      } else {
        return this.reply(212, file.buildStat()); // Send stat
      }
    })
    .catch((err) => {
      this.bunyan.error(err, {command: 'STAT'});
      return this.reply(450);
    });
  } else {
    // Reply with info/status of server
    return this.reply(211, 'Status OK');
  }
}
