export default function (thisCmd, ...fileParts) {
  const file = fileParts.join(' ');
  return this.fs.rename(file)
  .then(() => {
    return this.reply(350);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'RNFR'});
    return this.reply(550);
  });
}
