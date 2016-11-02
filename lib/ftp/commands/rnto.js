export default function (thisCmd, ...newNameParts) {
  if (!~['RNFR'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  const newName = newNameParts.join(' ');
  return this.fs.rename(null, newName)
  .then(() => {
    this.reply(250);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'RNTO'});
    this.reply(550);
  });
}
