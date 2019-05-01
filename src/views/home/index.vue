<template>
  <div class="home">
    <el-row>
      <el-col :span="6">
        <CardUser></CardUser>
      </el-col>
      <el-col :span="6">
        <CardNews></CardNews>
      </el-col>
      <el-col :span="6">
        <CardMoney></CardMoney>
      </el-col>
      <el-col :span="6">
        <CardCart></CardCart>
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

  // 加载echarts，注意引入文件的路径
  import echarts from 'echarts/lib/echarts'
  // 再引入你需要使用的图表类型，标题，提示信息等
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'

  import LineChart from './components/LineChart'
  import CardUser from './components/CardUser'
  import CardCart from './components/CardCart'
  import CardNews from './components/CardNews'
  import CardMoney from './components/CardMoney'
  export default {
    name: "home",
    components: { LineChart,CardUser,CardCart,CardNews,CardMoney },
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
