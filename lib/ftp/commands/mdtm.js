import moment from 'moment';

export default function (thisCmd, ...pathParts) {
  const path = pathParts.join(' ');
  return this.fs.get(path)
  .then((file) => {
    return this.reply(213, moment(file.mtime).format('YYYYMMDDHHmmss.SSS'));
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'SIZE'});
    return this.reply(550);
  });
}
