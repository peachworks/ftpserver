import moment from 'moment';
import leftPad from '../helpers/leftpad';

export default class File {
  constructor(path) {
    this.path = path;
    this.size = 0;
    this.type = 'f';
    this.mtime = 0;
    this.mode = null;
  }

  get name() {
    if (!this.path) return undefined;
    return this.path.split('/').slice(-1)[0];
  }

  isDirectory(){
    return this.type.toLocaleLowerCase() === 'd';
  }

  isFile(){
    return this.type.toLocaleLowerCase() === 'f';
  }

  fromStat(stat) {
    this.size = stat.size;
    this.mtime = moment(stat.mtime).utc().valueOf();
    this.type = stat.isDirectory() ? 'd' : 'f';
    this.mode = stat.mode;
    return this;
  }

  buildStat() {
    var mtime = moment(this.mtime);
    var format = 'MMM DD HH:mm';
    if (mtime.diff(moment(), 'month') <= -6) {
      format = 'MMM DD YYYY';
    }
    return [
      this.mode !== null
        ? [
          this.isDirectory() ? 'd' : '-',
          400 & this.mode ? 'r' : '-',
          200 & this.mode ? 'w' : '-',
          100 & this.mode ? 'x' : '-',
          40 & this.mode ? 'r' : '-',
          20 & this.mode ? 'w' : '-',
          10 & this.mode ? 'x' : '-',
          4 & this.mode ? 'r' : '-',
          2 & this.mode ? 'w' : '-',
          1 & this.mode ? 'x' : '-'
        ].join('')
        : this.isDirectory() ? 'drwxr-xr-x' : '-rw-r--r--',
      '1',
      'owner',
      'group',
      leftPad(this.size, 12),
      leftPad(mtime.format(format), 12),
      this.name
    ].join(' ');
  }
}
