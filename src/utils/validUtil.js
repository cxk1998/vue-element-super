//非空验证
export function verifyNotNull(data) {
  if(data && data != null && data != "" && data != undefined){
    return true;
  }else {return false;}
}
