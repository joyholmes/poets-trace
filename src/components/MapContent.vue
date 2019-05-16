<template>
	<div class="map-content">
		<div id="chart" ref="chart_wrap"></div>
	</div>
</template>

<script>
  import echarts from 'echarts'
  // //引入 ECharts 主模块
  // import echarts from "echarts/lib/echarts"
  // // 引入柱状图
  // import'echarts/lib/chart/map'
  // import'echarts/lib/chart/scatter'
  // import'echarts/lib/chart/effectScatter'
  // import'echarts/lib/chart/lines'
  // // 引入提示框和标题组件
  // import'echarts/lib/component/tooltip'
  // import'echarts/lib/component/title'
  // import'echarts/lib/component/geo';


  import China from 'echarts/map/json/china.json'
  echarts.registerMap('china', China);

  export default {
    name: "echarts-content",
    mounted(){
      console.log(this.$store.state.traces)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.chart_wrap);
      myChart.setOption({
        backgroundColor: '#404a59',
        geo: {
          map: 'china',
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#999',
              borderColor: '#666'
            },
            emphasis: {
              areaColor: '#999'
            }
          }

        },
        series: [
          // 常规地图
          // {
          //   type: 'map',
          //   roam: true,
          //   mapType: 'china',
          //   itemStyle: {
          //     normal: {
          //       areaColor: '#999',
          //       borderColor: '#666'
          //     },
          //     emphasis: {
          //       areaColor: '#333'
          //     }
          //   }
          // },
        ]
      });
    },
		methods: {
      updateTraces(){
        let myChart = echarts.init(this.$refs.chart_wrap);
        myChart.setOption({
          backgroundColor: '#404a59',
          geo: {
            map: 'china',
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
						itemStyle: {
							normal: {
								areaColor: '#999',
								borderColor: '#666'
							},
							emphasis: {
								areaColor: '#999'
							}
						}
          },
          series: [
            // 常规地图
            // {
            //   type: 'map',
            //   roam: true,
            //   mapType: 'china',
            //   itemStyle: {
            //     normal: {
            //       areaColor: '#999',
            //       borderColor: '#666'
            //     },
            //     emphasis: {
            //       areaColor: '#333'
            //     }
            //   }
            // },
            // 线 和 点
            {
              type: 'lines',
              zlevel: 2,
              symbolSize: 10,
              large:true,
              largeThreshold:10000,
              lineStyle: {
                normal: {
                  opacity: 0.5,
                  width: 0.3,
                  curveness: 0.3
                }
              },
							blendMode: 'lighter',
              data: this.$store.state.traces
            }
          ]
        });
			},
      updatePoetTraces(){
        let myChart = echarts.init(this.$refs.chart_wrap);
        let poetTraces = this.$store.state.poetTraces
				let series = []
        poetTraces.forEach(function (value) {
					let item = {
            type: 'lines',
            zlevel: 2,
            symbolSize: 10,
            large:true,
            largeThreshold:10000,
            lineStyle: {
              normal: {
                opacity: 1,
                width: 1,
                curveness: 0.2
              }
            },
            data: value
					}
					series.push(item)
        })
        myChart.setOption({
          backgroundColor: '#404a59',
          geo: {
            map: 'china',
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#999',
                borderColor: '#666'
              },
              emphasis: {
                areaColor: '#999'
              }
            }
          },
          series: series
        });
      },
			updatePoems(){
        let myChart = echarts.init(this.$refs.chart_wrap);
        console.log(this.$store.state.poemsData)
        myChart.setOption({
          backgroundColor: '#404a59',
          geo: {
            map: 'china',
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#999',
                borderColor: '#666'
              },
              emphasis: {
                areaColor: '#999'
              }
            }
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbolSize: function (val) {
                return Math.sqrt(Math.sqrt(val[2]))*4;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: this.$store.state.poemsData
            }
          ]
        });
			},
      updatePoetPoems(){
        let myChart = echarts.init(this.$refs.chart_wrap);
        myChart.clear()
        let poetsPoems = this.$store.state.poetsPoems
        console.log(poetsPoems)
        let series = []
        poetsPoems.forEach(function (value) {
          let item =             {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: function (val) {
              return Math.sqrt(Math.sqrt(val[2]))*6;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: value
          }
          series.push(item)
        })
        myChart.setOption({
          backgroundColor: '#404a59',
          geo: {
            map: 'china',
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#999',
                borderColor: '#666'
              },
              emphasis: {
                areaColor: '#999'
              }
            }
          },
          series: series
        });
			}
		}
  }
</script>

<style scoped>
	.map-content{
		height: 92%;
		width: 100%;
	}
	#chart{
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		margin: 0px;
	}
</style>