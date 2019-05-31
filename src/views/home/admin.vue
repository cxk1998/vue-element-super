<template>
  <div class="admin">
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

  import LineChart from './components/line-chart'
  import CardUser from './components/card-user'
  import CardCart from './components/card-cart'
  import CardNews from './components/card-news'
  import CardMoney from './components/card-money'
  export default {
    name: "admin",
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
  .admin{
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
  }
</style>
