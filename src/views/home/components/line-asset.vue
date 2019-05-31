<template>
  <div id="line-asset" style="width: 100%;height: 430px;background-color: #fff;"></div>
</template>

<script>
  // 加载echarts，注意引入文件的路径
  import echarts from 'echarts/lib/echarts'
  // 再引入你需要使用的图表类型，标题，提示信息等
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: "line-asset",
    data(){
      return {
        option:{
          title: {
            padding: 20,
            text: '部门资产/Job占比'
          },
          tooltip: {
            padding: 20,
            trigger: 'axis'
          },
          legend: {
            padding: 20,
            data:['Machine','VM','CVM','Job']
          },
          grid: {
            top:'20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis : [
            {
              type : 'category',
              axisLabel: {
                interval:0,
                rotate:30,
              },
              data : ['部门1','部门2','部门3','部门4','部门5','部门6','部门7',
                '部门8','部门9','部门10']
            }
          ],
          yAxis : [
            {
              padding: 20,
              type: 'value',
              name: '资产',
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              padding: 20,
              type: 'value',
              name: 'Job',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'Job',
              type:'line',
              data:[320, 332, 301, 334, 390, 330, 320,320, 332, 301]
            },
            {
              name:'Machine',
              type:'bar',
              stack: 'asset',
              barWidth : 25,
              data:[320, 332, 301, 334, 390, 330, 320,320, 332, 301]
            },
            {
              name:'VM',
              type:'bar',
              stack: 'asset',
              data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101]
            },
            {
              name:'CVM',
              type:'bar',
              stack: 'asset',
              data:[220, 182, 191, 234, 290, 330, 310,220, 182, 191]
            },
          ]
        },
      }
    },
    mounted() {
      this.initLineAsset()
    },
    methods:{
      initLineAsset() {
        let myChart = echarts.init(document.getElementById('line-asset'));
        myChart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>

</style>
