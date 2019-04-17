<template>
  <div class="error403">
    <div style="width: 100%;height: 100%;">
      <div style="vertical-align: middle;height: 100%;position: relative">
        <div style="width: 50%;position: absolute;top: 20%;text-align: right">
          <img src="/static/img/403.gif" alt="Girl has dropped her ice cream.">
        </div>
        <div style="width: 40%;position: absolute;top: 33%;left: 58%;text-align: left;">
          <h1 class="text-jumbo text-ginormous">DevOPS!</h1>
          <h2 style="margin-top: 20px;">网管说这个页面你不能进......</h2>
          <h4 style="margin-top: 20px;">如有需要，请联系管理员<span><a href="#"
                                                                                  @click.prevent="dialogVisible=true">点我看图</a></span></h4>
          <div style="margin-top: 80px;">
            <el-button @click="home" style="padding: 0 20px;"><i class="fa fa-home"></i>&nbsp;&nbsp;首页</el-button>
            <el-button type="primary" @click="back"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;返回</el-button>
          </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="随便看">
          <img :src="ewizardClap" class="pan-img">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'page403',
    data() {
      return {
        ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
        dialogVisible: false
      }
    },
    methods: {
      home() {
        this.$router.push({path: '/home'})
      },
      back() {
        if (this.$route.query.noGoBack) {
          this.$router.push({path: '/home'})
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style>
  .error403{
    width: 100%;
    height: 100%;
  }
</style>
