<template>
  <div id="pie-job-type" style="width: 100%;height: 430px;background-color: #fff;"></div>
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
    name: "pie-job-type",
    data(){
      return {
        option: {
          title : {
            padding: 20,
            text: 'Job类型占比',
            x:'center'
          },
          tooltip: {
            padding: 20,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            padding: 20,
            orient: 'vertical',
            x: 'left',
            data:['java','python','web','react native','node.js']
          },
          series: [
            {
              name:'job类型',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'java'},
                {value:310, name:'python'},
                {value:234, name:'web'},
                {value:135, name:'react native'},
                {value:1548, name:'node.js'}
              ]
            }
          ]
        },
      }
    },
    mounted() {
      this.initPieJobType()
    },
    methods:{
      initPieJobType() {
        let myChart = echarts.init(document.getElementById('pie-job-type'));
        myChart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>

</style>
