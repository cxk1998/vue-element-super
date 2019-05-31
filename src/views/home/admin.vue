<template>
  <div class="admin">
    <el-row type="flex" class="card" style="padding: 15px;flex-flow: row wrap;">
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
    <el-row style="margin: 0 30px;">
      <el-col :span="24">
        <LineChart></LineChart>
      </el-col>
    </el-row>
    <el-row style="margin: 30px 30px 15px 30px;">
      <el-col :span="24">
        <LineAsset></LineAsset>
      </el-col>
    </el-row>
    <el-row  type="flex" class="bar" style="padding: 0 15px;flex-flow: row wrap;">
      <el-col :span="12">
        <PieAssetType></PieAssetType>
      </el-col>
      <el-col :span="12">
        <PieJobType></PieJobType>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import CardUser from './components/card-user'
  import CardCart from './components/card-cart'
  import CardNews from './components/card-news'
  import CardMoney from './components/card-money'
  import LineChart from './components/line-chart'
  import LineAsset from './components/line-asset'
  import PieAssetType from './components/pie-asset-type'
  import PieJobType from './components/pie-job-type'

  export default {
    name: "admin",
    components: { CardUser,CardCart,CardNews,CardMoney,LineChart,LineAsset,PieJobType,PieAssetType },
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
    overflow-y: auto !important;
    background-color: #f0f2f5;
  }
  .admin .card .el-col-6{
    min-width: 200px;
  }
  .admin .bar .el-col-12{
    min-width: 390px;
    padding: 15px;
  }
</style>
