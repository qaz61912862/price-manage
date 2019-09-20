export function timestampToTime(timestamp) {
  let tem = String(timestamp)
  tem = tem.substring(0, tem.length - 3)
  tem = parseInt(tem)
  let Y;
  let M;
  let D;
  let h;
  let m;
  let s;
  var date = new Date(tem * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  D = date.getDate() + ' ';
  h = date.getHours() + ':';
  m = date.getMinutes() + ':';
  s = date.getSeconds();
  return Y+M+D+h+m+s;
}