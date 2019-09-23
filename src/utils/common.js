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
  D = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' ';
  h = (date.getHours() < 10 ? ('0' +date.getHours()) :date.getHours()) + ':';
  m = (date.getMinutes() < 10 ? ('0' +date.getMinutes()) :date.getMinutes()) + ':';
  s = (date.getSeconds() < 10 ? ('0' +date.getSeconds()) :date.getSeconds())
  return Y+M+D+h+m+s;
}

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  var q = window.location.pathname.substr(1).match(reg_rewrite);
  if(r != null){
      return unescape(r[2]);
  }else if(q != null){
      return unescape(q[2]);
  }else{
      return null;
  }
}