<template>

  <div class="login">
    <img src="/static/img/login_bg.png" style="width: 100%;height: 100%;"/>
    <div class="login-header">VUE&emsp;DEMO</div>
    <div class="login-container">
      <div class="login-userInfo">
        <div class="login-userTitle">User login</div>
        <div class="login-form">
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="100px" class="demo-ruleForm" size="small">
            <el-form-item label="用户账号" prop="userNumber">
              <el-input v-model="loginForm.LOGIN_NAME"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="userPass">
              <el-input type="password" v-model="loginForm.USER_PWD" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align: left;margin-bottom: 0;margin-top: 28px">
              <el-button style="margin-right: 10px" type="primary" @click="userLogin">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setStore,getStore} from "../utils/sessionStorage"
  import axios from 'axios'
  export default {
    name: "login",
    data() {
      var account = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          LOGIN_NAME: 'super',
          USER_PWD: '123456'
        },
        loginFormRules: {
          LOGIN_NAME: [
            { validator: account, trigger: 'blur' }
          ],
          USER_PWD: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      userLogin(){
        axios.defaults.baseURL = process.env.API_ROOT;
        var params = new URLSearchParams();
        params.append("FloginName",this.loginForm.LOGIN_NAME);
        params.append("Fpwd",this.loginForm.USER_PWD);
        axios.post("/login",params).then((result) => {
          if(result.data.code === 200){
            let data=result.data.data;
            //Cookies.set("userInfo", result.data.data.userInfo);
            setStore("userInfo", data.userInfo);
            setStore("userToken", 'Bearer '+ data.token);
            this.$router.push({path: "/index"})
          }else {
            return this.$message.error(result.data.msg);
          }
        });
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>

<style scoped>
  .login{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .login-header{
    position: absolute;
    top: 25%;
    width: 100%;
    font-weight: bold;
    text-align: center;
    font-size: 36px;
    color: white;
  }
  .login-container{
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    min-width: 420px;
  }
  .login-userTitle{
    padding: 6px 0;
    font-size: 20px;
    color: white;
    background: #226391;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .login-form{
    padding: 35px 50px 35px 20px;
    box-sizing: border-box;
    background: white;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .el-form-item__content{
    margin-left: -24px!important;
  }
</style>
