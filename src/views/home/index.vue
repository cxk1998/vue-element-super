<template>
  <div class="home">
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card></el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <LineChart></LineChart>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>

  import LineChart from './components/LineChart'

  export default {
    name: "home",
    components: { LineChart },
    data(){
      return {

      }
    },
    mounted() {


    },
    methods:{

    }
  }
</script>

<style>
  .home{
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
  }
</style>
