/*
 *全局方法
 */
exports.install = function (Vue, options) {
  Vue.prototype.changeData = function (){
    console.info(this.GLOBAL.operPermissionList);
    let operPermissionList=this.GLOBAL.operPermissionList;
    for (var i=0;i<operPermissionList.length;i++)
    {
      let url=operPermissionList[i].OPER_URL;
      let domTT=document.getElementById(url);
      if(domTT!=null) {
        document.getElementById(url).style.display = 'block';
      }
    }
    // document.getElementById('/system_mgr/user/add').style.display='block';
  };
  //转换是否
  Vue.prototype.boolFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "否";
    }else{
      return "是";
    }
  };
  //性别
  Vue.prototype.sexFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "男";
    }else{
      return "女";
    }
  };
  //卫星初始化标识
  Vue.prototype.satIntflagFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "尚未建表";
    }else{
      return "已经建表";
    }
  };
  //参数类型
  Vue.prototype.parTypeFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "整数";
    }else{
      return "浮点数";
    }
  };
  //指令脉冲标志
  Vue.prototype.insPlusFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "非脉冲";
    }else{
      return "脉冲";
    }
  };
  //指令类型标志
  Vue.prototype.insTypeFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "比例";
    }else if(cellValue==1){
      return "离散";
    }else{
      return "数据块";
    }
  };
  //允许发送标志
  Vue.prototype.insEnableFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "不允许";
    }else{
      return "允许";
    }
  };
  //算法类型
  Vue.prototype.calTypeFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "值读";
    }else if(cellValue==1){
      return "列表";
    }else if(cellValue==2){
      return "曲线";
    }else if(cellValue==3){
      return "通用公式";
    }else if(cellValue==4){
      return "专用公式";
    }else if(cellValue==5){
      return "扩展函数";
    }else if(cellValue==6){
      return "自定义表达式";
    }else{
      return "错误类型";
    }
  };
  //包类型
  Vue.prototype.modTypeFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "帧遥测";
    }else if(cellValue==1){
      return "包遥测";
    }else{
      return "错误类型";
    }
  };
  //包类型
  Vue.prototype.pakTypeFormatter = function (row, column, cellValue, index){
    if(cellValue==0){
      return "包源";
    }else if(cellValue==1){
      return "虚拟通道数据";
    }else{
      return "错误类型";
    }
  };
};
