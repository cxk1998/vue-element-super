<template>
  <div class="home">
    <el-row type="flex" class="card" style="padding: 15px;flex-flow: row wrap;">
      <el-col :span="4">
        <CardRack></CardRack>
      </el-col>
      <el-col :span="4">
        <CardNetworks></CardNetworks>
      </el-col>
      <el-col :span="4">
        <CardMachine></CardMachine>
      </el-col>
      <el-col :span="4">
        <CardVm></CardVm>
      </el-col>
      <el-col :span="4">
        <CardCvm></CardCvm>
      </el-col>
      <el-col :span="4">
        <CardJob></CardJob>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding: 5px 30px 30px 30px;">
        <LineAsset></LineAsset>
      </el-col>
    </el-row>
    <el-row  type="flex" class="bar" style="padding: 5px 30px 25px 30px;flex-flow: row wrap;">
      <el-col :span="8" style="padding-right: 15px;">
        <PieAssetType></PieAssetType>
      </el-col>
      <el-col :span="8" style="padding: 0 15px;">
        <PieJobType></PieJobType>
      </el-col>
      <el-col :span="8" style="padding-left: 15px;">
        <PieUserJob></PieUserJob>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import CardRack from './components/card-rack'
  import CardNetworks from './components/card-network'
  import CardMachine from './components/card-machine'
  import CardVm from './components/card-vm'
  import CardCvm from './components/card-cvm'
  import CardJob from './components/card-job'
  import LineAsset from './components/line-asset'
  import PieAssetType from './components/pie-asset-type'
  import PieJobType from './components/pie-job-type'
  import PieUserJob from './components/pie-user-job'


  export default {
    name: "home",
    components: { CardRack,CardNetworks,CardMachine,CardVm,CardCvm,CardJob,LineAsset,PieJobType,PieUserJob,PieAssetType },
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
    overflow-y: auto !important;
    background-color: #f0f2f5;
  }
  .home .card .el-col-4{
    min-width: 186px;
  }
  .home .bar .el-col-8{
    min-width: 320px;
  }
</style>
