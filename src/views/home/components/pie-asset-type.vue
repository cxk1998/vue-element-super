<template>
  <div id="pie-asset-type" style="width: 100%;height: 430px;background-color: #fff;"></div>
</template>

<script>
  // 加载echarts，注意引入文件的路径
  import echarts from 'echarts/lib/echarts'
  // 再引入你需要使用的图表类型，标题，提示信息等
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: "pie-asset-type",
    data(){
      return {
        option: {
          title : {
            padding: 20,
            text: '资源类型占比图',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            padding: 20,
            orient: 'vertical',
            left: 'left',
            data: ['Machine','VM','CVM']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'Machine'},
                {value:310, name:'VM'},
                {value:234, name:'CVM'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
      }
    },
    mounted() {
      this.initPieAssetType()
    },
    methods:{
      initPieAssetType() {
        let myChart = echarts.init(document.getElementById('pie-asset-type'));
        myChart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>

</style>
