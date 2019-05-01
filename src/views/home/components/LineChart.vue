<template>
  <div style="margin: 30px;">
    <div id="lineChart" style="width: 100%;height: 430px;background-color: #fff;"></div>
  </div>
</template>

<script>
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: "line-chart",
    data(){
      return {
        option:{
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          grid: {
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
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        },
      }
    },
    mounted() {
      this.initChart()

    },
    methods:{
      initChart() {
        let myChart = echarts.init(document.getElementById('lineChart'));
        myChart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>

</style>
