<template>
  <div class="login">
    <div class="login-header">运维一体化平台</div>
    <div class="login-container">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form">
        <el-form-item prop="user_name">
          <span class="login-icon">用户名</span>
          <el-input type="text" v-model="loginForm.user_name" name="user_name" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="login-icon">密码</span>
          <el-input type="password" v-model="loginForm.password" name="password" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-checkbox style="margin-left: 300px;" v-model="checked">记住登录状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request"
  import Cookies from 'js-cookie'
  export default {
    name: "login",
    data(){
      const validateUserName = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          user_name: 'admin',
          password: '123456'
        },
        checked: true,
        loginRules: {
          user_name: [{ required: true, trigger: 'blur', validator: validateUserName }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        }
      };
    },
    created() {
      let lett = this;
      document.onkeydown = function(e) {
        let key = window.event.keyCode;
        if (key === 13) {
          lett.userLogin();
        }
      }
    },
    methods: {
      userLogin(){
        this.$refs.loginForm.validate(async valid => {
          if (valid) {
            await request.login('/apis/sysmgr/user/login', this.loginForm).then(data => {
              let maxAge = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
              Cookies.set("token", 'Bearer '+ data.token,{ expires: maxAge });
              Cookies.set("user", data.user,{ expires: 1 });
              this.$router.push('/home');
            }).catch(error => {

            });
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>

<style>
  .login{
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
    overflow: hidden;
  }
  .login .login-header{
    position: absolute;
    top: 18%;
    width: 100%;
    font-weight: bold;
    text-align: center;
    font-size: 38px;
    color: white;
  }
  .login .login-container{
    position: absolute;
    top: 30%;
    left: 50%;
    width: 500px;
    margin-left: -250px;
    background-color: #ffffff;
  }
  .login .login-container .login-form{
    padding: 20px 30px;
  }

  .login .login-container .login-form .el-form-item .el-input__inner{
    border-radius: 2px;
  }
  .login .login-container .login-form .el-form-item button{
    width: 100%;
  }

</style>
