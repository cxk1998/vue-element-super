<template>
  <div class="index" ref="indexHome">
    <div class="index-header clearfix">
      <div class="index-header-list set-left">
        <ul>
          <li>
            <i class="fa fa-plane"></i><span style="margin-left: 10px;">VUE&emsp;DEMO</span>
          </li>
          <li @click="pageFull">
            <i class="fa fa-life-bouy"></i>
          </li>
        </ul>
      </div>
      <div class="index-header-list set-right">
        <ul>
          <li>
            <!-- 用户消息提示 -->
            <el-popover
              :visible-arrow="false"
              placement="top-start"
              offset="200"
              trigger="hover">
              <div class="hint">
                <div class="hint-content" v-for="item in getUserMessage" >
                  <div style="color: #00C1DE;font-size: 10px;">{{item.name }} {{ item.type }} {{ item.hint }}</div>
                  <div style="margin-bottom: 10px;font-size: 10px;margin-top: 2px;">{{ item.time }}</div>
                </div>
              </div>
              <div slot="reference" class="user-message">
                <el-badge :value="100" :max="99" class="item">
                  <i class="atsFont" style="font-size: 22px;">&#xe639;</i>
                </el-badge>
              </div>
            </el-popover>
          </li>
          <li>
            <!-- 用户个人信息 -->
            <el-popover
              :visible-arrow="false"
              placement="top-start"
              trigger="hover">
              <div class="user-set">
                <ul>
                  <li>
                    <img src="/static/img/timg.jpg"/>
                    <br/>
                    <span>{{userInfoData.USER_NAME}}</span>
                  </li>
                  <li @click="userDialog.showBasicInfo = true">
                    <i class="atsFont" style="font-size: 22px;">&#xe639;</i><br/>基本资料
                  </li>
                  <li @click="userDialog.showResetPw = true">
                    <i class="atsFont" style="font-size: 22px;">&#xe639;</i><br/>重置密码
                  </li>
                  <li @click="exitLogin">
                    退出登录
                  </li>
                </ul>
              </div>
              <div slot="reference" class="user-info">
                <div class="user-photo"><img src="../../static/img/timg.jpg"/></div>
              </div>
            </el-popover>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-container clearfix">
      <div class="index-side set-left">
        <div @click="monitorMenu" class="sidebar-fold">
          <i class="fa fa-list" ></i>
        </div>
        <el-menu
          default-active="2-5"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#3d4153"
          text-color="#fff"
          active-text-color="#fff">
          <el-submenu :index="''+index" v-for="(item,index) in getMenuData">
            <template slot="title">
              <i :class="item.MENU_ICON"></i>
              <span style="margin-left: 5px;">{{ item.MENU_NAME }}</span>
            </template>
            <el-menu-item-group v-for="(subitem,subindex) in item.children">
              <el-menu-item :index="''+index+ '-' + subindex" @click="activeSonMenu(subitem)">
                <i class="fa fa-reorder"></i>
                <span style="margin-left: 5px;">{{ subitem.MENU_NAME }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="index-content set-right" :class="{smallStyle: activeSmall}">
        <router-view></router-view>
      </div>
    </div>
    <div class="index-dialog">
      <!-- 用户基本资料弹窗 -->
      <el-dialog title="基本信息" :visible.sync="userDialog.showBasicInfo">
        <el-form :model="userInfoData">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="userInfoData.LOGIN_NAME" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="userInfoData.USER_NAME" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="userInfoData.PHONE" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="basicInfoWrite">取 消</el-button>
          <el-button type="primary" @click="basicInfoBtn">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 用户重置密码弹窗 -->
      <el-dialog title="重置密码" :visible.sync="userDialog.showResetPw" >
        <el-form :model="resetPwData" :rules="resetPwData2" ref="resetPwData">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="userInfoData.LOGIN_NAME" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" :label-width="formLabelWidth" prop="FoldPwd">
            <el-input v-model="resetPwData.FoldPwd" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="FnewPwd">
            <el-input v-model="resetPwData.FnewPwd" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="FnewPwdOk">
            <el-input v-model="resetPwData.FnewPwdOk" auto-complete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="writeRestPwBtn('resetPwData')">取 消</el-button>
          <el-button type="primary" @click="restPwBtn('resetPwData')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {removeStore,getStore,setStore} from "../utils/sessionStorage"
  import {axiosBeg} from '../utils/axiosBeg'
  import { getTree} from "../utils/treeUtil"
  export default {
    name: "index",
    data: function () {
      var OldPw = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧密码'));
        }else if(value.length < 6){
          return callback(new Error("密码长度小于6位"));
        }else {
          callback();
        }
      };
      var NewPw = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入新6位或以上的密码'));
        } else if(value && value.length < 6){
          return callback(new Error("密码长度小于6位"));
        }else {
          callback();
        }
      };
      var PwOk = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入新6位或以上的密码'));
        }else if(value != this.resetPwData.userNewPw){
          return callback(new Error('两次输入密码不一致!'));
        }else {
          callback();
        }
      };
      return{
        userInfoData: {
          LOGIN_NAME:"",
          USER_NAME: "",
          PHONE: "",
        },
        formLabelWidth: "80px",
        resetPwData2: {
          userOldPw: [
            { validator: OldPw, trigger: 'blur' }
          ],
          userNewPw: [
            { validator: NewPw, trigger: 'blur' }
          ],
          ackPw: [
            { validator: PwOk, trigger: 'blur' }
          ],
        },
        resetPwData: {
          FoldPwd: "",
          FnewPwd: "",
          FnewPwdOk: "",
        },
        userDialog: {
          showBasicInfo: false,
          showResetPw: false,
        },
        isCollapse: false,
        activeSmall: false,
        menuIndex: "1",
        getUserMessage: [
          {
            name: "super",
            type: "类型1",
            hint: "有变更，可在跟踪查看",
            time: "2018-06-18 08:16",
          },
          {
            name: "张三",
            type: "类型1",
            hint: "有变更，可在跟踪查看",
            time: "2018-06-18 08:16",
          },{
            name: "张三",
            type: "类型1",
            hint: "有变更，可在跟踪查看",
            time: "2018-06-18 08:16",
          }
        ],
        getMenuData: [],
      }
    },
    mounted: function () {
      this.$router.push({path: "/system_mgr/userMgr"});
      this.getUserInfo();
      this.getLoginUserMenuList();
    },
    methods: {
      getUserInfo: function(){
        this.userInfoData=getStore("userInfo");
      },
      //菜单页面切换
      activeSonMenu: function(menu){
        this.$router.push({path: menu.MENU_URL});
      },
      //基本信息
      async basicInfoBtn(){
        if(!this.userInfoData.USER_NAME || this.userInfoData.USER_NAME == ""){
          return this.$message.error('姓名不能为空！');
        }
        if(!this.userInfoData.PHONE || this.userInfoData.PHONE == ""){
          return this.$message.error('联系电话不能为空！');
        }
        let reg = /^1[0-9]{10}$/ ;
        let phoneVerify = reg.test(this.userInfoData.PHONE)
        if(phoneVerify == false){
          return this.$message.error('联系电话位数或格式错误！');
        }
        let result = await axiosBeg.post('/system_mgr/user/updMyInfo', this.userInfoData);
        if(result && result != null){
          setStore("userInfo", this.userInfoData);
          this.userDialog.showBasicInfo = false;
          this.$message.success('修改成功！');
        }
      },
      //取消按钮恢复数据关闭窗口
      basicInfoWrite: function() {
        this.getUserInfo();
        this.userDialog.showBasicInfo = false;
      },
      //重置密码验证
      async restPwBtn(formName){
        let result = await axiosBeg.post('/system_mgr/user/resetMyPwd', this.resetPwData);
        if(result.code == 200){
          this.resetPwData={FoldPwd: "",FnewPwd: "", FnewPwdOk: ""}
          this.$refs[formName].resetFields();
          this.userDialog.showResetPw = false;
          this.$message.success("修改成功！");
        }else {
          this.$message.error(result.msg);
        }
      },
      //取消重置
      writeRestPwBtn: function(formName) {
        this.$refs[formName].resetFields();
        this.userDialog.showResetPw = false;
      },
      //退出登录
      exitLogin: function(){
        this.$confirm('确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeStore("userToken");
          removeStore("userInfo");
          setTimeout(() =>{
            this.$router.push({path: "/"})
          },300)
          axios.defaults.baseURL = process.env.API_ROOT;
          axios.defaults.headers['Authorization'] = getStore("userToken");

        }).catch(() => {

        });
      },
      //刷新页面
      refreshPage: function(){
        this.$router.go(0)
      },
      //网页全屏
      pageFull: function(){
        var elem = this.$refs.indexHome;
        this.requestFullScreen(elem);
      },
      //网页全屏
      requestFullScreen: function(element){
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys("{F11}");
          }
        }
      },
      //获取页面基础数据
      async getLoginUserMenuList(){
        let result = await axiosBeg.get('/system_mgr/user/getLoginUserPermissionList', {});
        if(result.code == 200){
          let treedata=result.data;
          this.getMenuData = getTree(treedata.menuList, {idKey:"MENU_KEY",labelKey:"MENU_NAME",pidKey:"MENU_PKEY",rootPid: "0"});
          this.GLOBAL.operPermissionList=treedata.operList;
        }
      },
      //监听菜单缩放
      monitorMenu: function() {
        if(this.isCollapse == false){
          this.activeSmall = true;
          this.isCollapse = true;
        }else {
          this.activeSmall = false;
          this.isCollapse = false;
        }
      },
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    },
    components: {

    }
  }
</script>

<style>
  .index{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  /* 头部 */
  .index .index-header{
    height: 50px;
    line-height: 50px;
    width: 100%;
    min-width: 1000px;
    background: #373d41;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 0 0 30px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .index .index-header .index-header-list ul{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .index .index-header .index-header-list ul li{
    margin: 0;
    padding: 0 20px;
    color: white;
    float: left;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #2a2f32;
    font-size: 14px;
  }
  .index .index-header .index-header-list ul li:hover{
    background-color: #2a2f32;
  }
  .index .index-header .index-header-list ul li:last-child{
    border: none;
  }
  .index .user-message{
    width: 70px;
    height: 50px;
  }
  .index .user-message, .index .user-info,.index .user-photo,.index .user-name{
    display: inline-block;
    color: rgba(255,255,255,.7);
    cursor: pointer;
  }

  .index .user-photo{
    width: 28px;
    height: 28px;
  }
  .index .user-photo img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
  .index .user-name{
    margin-left: 10px;
  }
  .user-set{
    box-sizing: border-box;
    margin-left: 12px;
  }
  .user-set ul{
    margin: 0;
    padding: 0;
    width: 218px;
    box-sizing: border-box;
  }
  .user-set ul li{
    cursor: pointer;
    text-align: center;
    color: #606266;
    font-size: 12px;
    float: left;
    width: 72px;
    padding: 0 0 10px 0;
    margin: 5px 0 0 0;
  }
  .user-set ul li:first-child{
    cursor: auto;
    width: 216px;
    box-sizing: border-box;
    border-bottom: 1px solid #d2d2d2;
  }
  .user-set ul li:first-child:hover{
    color: #606266;
  }
  .user-set ul li:first-child img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .user-set ul li:last-child{
    width: 216px;
    box-sizing: border-box;
    margin-top: 25px;
  }
  .user-set ul li:hover{
    color: #00C1DE;
  }
  .hint-content{
    box-sizing: border-box;
    cursor: pointer;
  }
  .index-header-list .el-popover{
    width: auto;
    min-width: 100px;
    top: 38px!important;
    right: 0;
    border: 1px solid #E6E6E6;
    border-radius: 0;
    background: #fff;
  }

  .index-header-list .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #d2d2d2;
  }
  .el-badge__content.is-fixed{
    top: 25px;
    right: -2px;
  }

  /* 菜单样式 */
  .index .index-side{
    height: 100%;
    overflow: hidden;
    background-color: #333744 !important;
  }
  .index .index-side .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
  }
   .index .index-side .el-menu-vertical-demo .el-submenu .el-menu-item{
     height: 40px;
     line-height: 40px;
   }
  .index .index-side .el-menu .el-menu--inline{
     width: 180px;
   }
  .index .index-side .el-menu .el-submenu .el-menu-item{
    width: 180px;
  }
  .index .index-side .el-submenu__title,.el-menu-item{
    width: 180px;
  }
  .index .index-side .sidebar-fold{
    background: #4a5064;
    color: #aeb9c2;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }

  .index .index-side .sidebar-fold:hover{
    color: #fff;
  }
  .index .el-submenu .el-menu-item:hover{
    background: #44485c!important;
    color: white!important;
  }
  .index .el-menu-item.is-active{
    background: #00C1DE!important;
  }
  .index .el-submenu__title:hover{
    background: #00C1DE!important;
    color: white!important;
  }
  .index .el-submenu__title:hover .el-icon-menu{
    color: white!important;
  }
  /* 主体 */
  .index .index-container{
    height: 100%;
    padding-top: 50px;
    width: 100%;
  }
  .index .index-content{
    height: 100%;
    width: calc(100% - 180px);
  }
  .index .smallStyle{
    width: calc(100% - 50px);
  }
.el-menu--vertical{
  left: 0;
}
  .el-menu--collapse{
    width: 50px;
  }
</style>
