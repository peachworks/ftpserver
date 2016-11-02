export default function (thisCmd, ...dirParts) {
  const dir = dirParts.join(' ');
  return this.fs.mkdir(dir)
  .then((madeDir) => {
    return this.reply(257, madeDir);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'MKD'});
    return this.reply(550);
  });
}
