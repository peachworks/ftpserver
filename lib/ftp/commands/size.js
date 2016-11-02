export default function (thisCmd, ...pathParts) {
  const path = pathParts.join(' ');
  return this.fs.get(path)
  .then((file) => {
    return this.reply(213, file.size);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'SIZE'});
    return this.reply(550);
  });
}
