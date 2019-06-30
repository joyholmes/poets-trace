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
        ]
      });
    },
		methods: {
      updateTraces(){
        let myChart = echarts.init(this.$refs.chart_wrap);
        myChart.clear()
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
        let _this = this
        let myChart = echarts.init(this.$refs.chart_wrap);
        myChart.clear()
        let poetTraces = this.$store.state.poetTraces
				let preLength = poetTraces.length
				if(poetTraces.length == 1){
				  let data = []
          var timesRun = 0;
          console.log(poetTraces[0].length)
					var timer  = setInterval(()=>{
            if(timesRun == poetTraces[0].length - 1 || preLength != _this.$store.state.poetTraces.length){
              clearInterval(timer);
            }
            //do whatever here..
						console.log(timesRun)
            data.push(poetTraces[0][timesRun])
            timesRun += 1
						console.log(data)
						myChart.setOption({
							backgroundColor: '#404a59',
							legend: {
								orient: 'vertical',
								top: 'bottom',
								left: 'right',
								data: _this.$store.state.poets,
								textStyle: {
									color: '#fff'
								},
								selectedMode: 'multiple',
							},
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
									name: _this.$store.state.poets[0],
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
									data: data
								},
								{
									type: 'scatter',
									coordinateSystem: 'geo',
									data: _this.$store.state.poemsPoints,
									symbolSize: 5,
									label: {
										normal: {
											formatter: '{b}',
											position: 'right',
											show: true
										},
									},
									itemStyle: {
										normal: {
                      color: '#696969',
										}
									}
								},
							]
						})

          },500)
				  // for(let i = 0;i<poetTraces[0].length;i++){
          //   // let promise = new Promise(function(resolve, reject) {
					// 	// })
          //   setTimeout(()=>{
          //     data.push(poetTraces[0][i])
          //     //console.log(data)
          //     myChart.setOption({
          //       backgroundColor: '#404a59',
          //       legend: {
          //         orient: 'vertical',
          //         top: 'bottom',
          //         left: 'right',
          //         data: _this.$store.state.poets,
          //         textStyle: {
          //           color: '#fff'
          //         },
          //         selectedMode: 'multiple',
          //       },
          //       geo: {
          //         map: 'china',
          //         roam: true,
          //         label: {
          //           emphasis: {
          //             show: false
          //           }
          //         },
          //         itemStyle: {
          //           normal: {
          //             areaColor: '#999',
          //             borderColor: '#666'
          //           },
          //           emphasis: {
          //             areaColor: '#999'
          //           }
          //         }
          //       },
          //       series: [
          //         {
          //           name: _this.$store.state.poets[0],
          //           type: 'lines',
          //           zlevel: 2,
          //           symbolSize: 10,
          //           large:true,
          //           largeThreshold:10000,
          //           lineStyle: {
          //             normal: {
          //               opacity: 1,
          //               width: 1,
          //               curveness: 0.2
          //             }
          //           },
          //           data: data
          //         },
          //         {
          //           type: 'scatter',
          //           coordinateSystem: 'geo',
          //           data: _this.$store.state.poemsPoints,
          //           symbolSize: 5,
          //           label: {
          //             normal: {
          //               formatter: '{b}',
          //               position: 'right',
          //               show: true
          //             },
          //           },
          //           itemStyle: {
          //             normal: {
					//
          //             }
          //           }
          //         },
          //       ]
          //     })
          //   },i*500)
					// }
				}else{
          let series = []
          poetTraces.forEach(function (value,index) {
            let item = {
              name: _this.$store.state.poets[index],
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
					series.push({
            type: 'scatter',
            coordinateSystem: 'geo',
            data: _this.$store.state.poemsPoints,
            symbolSize: 5,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
            },
            itemStyle: {
              normal: {
                color: '#696969',
              }
            }
          })
          myChart.setOption({
            backgroundColor: '#404a59',
            legend: {
              orient: 'vertical',
              top: 'bottom',
              left: 'right',
              data: this.$store.state.poets,
              textStyle: {
                color: '#fff'
              },
              selectedMode: 'multiple',
            },
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
      },
			updatePoems(){
        let myChart = echarts.init(this.$refs.chart_wrap);
        myChart.clear()
        //console.log(this.$store.state.poemsData)
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
				let _this = this
        let poetsPoems = this.$store.state.poetsPoems
        let series = []
        poetsPoems.forEach(function (value,index) {
          let item = {
            name: _this.$store.state.poets[index],
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
          legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: this.$store.state.poets,
            textStyle: {
              color: '#fff'
            },
            selectedMode: 'multiple',
          },
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