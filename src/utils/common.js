
const deepCopy = function (data) {
  return JSON.parse(JSON.stringify(data))
};

const arrayIsEmpty = function (v) {
  return (
    (Array.isArray(v) && v.length == 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length == 0)
  );
};
const isEmpty = function (obj) {
  return !(Object.is(obj, null) || Object.is(obj, undefined) || JSON.stringify(obj,) === '{}' || JSON.stringify(obj,) === '[]')
};

export default{
  deepCopy,
  arrayIsEmpty,
  isEmpty,
};




