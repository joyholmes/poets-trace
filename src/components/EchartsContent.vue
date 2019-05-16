<template>
	<div class="echarts-content">
		<div id="chart" ref="chart_wrap"></div>
	</div>
</template>

<script>
  // 引入 ECharts 主模块
  import echarts from "echarts/lib/echarts"
  // 引入柱状图
  import'echarts/lib/chart/bar'
  // 引入提示框和标题组件
  import'echarts/lib/component/tooltip'
  import'echarts/lib/component/title'



  export default {
    name: "echarts-content",
		mounted(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.chart_wrap);
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
		}
  }
</script>

<style scoped>
.echarts-content{
	height: 100%;
	width: 100%;
}
#chart{
	height: 100%;
	width: 100%;
}
</style>