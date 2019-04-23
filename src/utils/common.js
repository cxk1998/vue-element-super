const copy = function (data) {
  return Object.assign(data);
};

const deepCopy = function (data) {
  return JSON.parse(JSON.stringify(data))
};

const arrayIsEmpty = function (v) {
  return (
    (Array.isArray(v) && v.length == 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length == 0)
  );
};
const isEmpty = function (obj) {
  if(Object.is(obj, null) || Object.is(obj, undefined) || JSON.stringify(obj,) === '{}' || JSON.stringify(obj,) === '[]'){
    return true;
  } else {
    return false;
  }
};

export default{
  copy,
  deepCopy,
  arrayIsEmpty,
  isEmpty,
};

/******
 * 格式化当前日期
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
/***
 * 格式化当前时间并加/减去几天
 * @param fmt
 * @param mdays
 * @returns {*}
 * @constructor
 */
Date.prototype.formatMinusDay = function (fmt, mdays) {
  let date = new Date();//获取当前时间
  date.setDate(date.getDate()+mdays);//设置天数 -1 天
  return date.format(fmt);
};
/***
 * 格式化当前时间并加/减去几个月
 * @param fmt
 * @param mMonth
 * @returns {*}
 * @constructor
 */
Date.prototype.formatMinusMonth = function (fmt, mMonth) {
  let date = new Date();//获取当前时间
  date.setDate(date.getMonth()+mMonth);//设置天数 -1 天
  return date.format(fmt);
};


