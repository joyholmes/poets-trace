<style scoped>

	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		/*overflow: auto;*/
		height: 100%;
	}

	.layout-menu-left {
		box-sizing: border-box;
		background: #464c5b;
		/*min-width: 100px;*/
		height: 100%;
		width: 25%;

	}
	.layout-menu-right {
		box-sizing: border-box;
		background: #f8f8f9;
		/*min-width: 100px;*/
		height: 100%;
		width: 75%;


	}

	.layout-ceiling-main a {
		color: #9ba7b5;
	}
	#row{
		height: 100%;
	}
	.top{
		box-sizing: border-box;
		background: #f8f8f9;
		/*min-width: 100px;*/
		width: 100%;
		border-style: solid;
		border-width: 2px;
		border-color: #9ba7b5;
		height: 45%;
	}
	.bottom{
		box-sizing: border-box;
		background: #f8f8f9;
		/*min-width: 100px;*/
		height: 50%;
		width: 100%;
		border-style: solid;
		border-width: 2px;
		border-color: #9ba7b5;
	}
	.timeline {
		background: #404a59;
		height: 10%;
		width: 100%;
	}


</style>

<template>

	<div class="layout">
		<Row type="flex" id="row">
			<i-col :span="5" class="layout-menu-left">
				<div class="top">
					<data-table ref="dataTable"></data-table>
				</div>
				<div class="bottom">
					<high-content></high-content>
				</div>
			</i-col>
			<i-col :span="10" class="layout-menu-right">
				<map-content ref="traces"></map-content>
				<!--<div class="layout-copy">-->
					<!--2011-2016 &copy; NSLab-->
				<!--</div>-->
				<div class="timeline">
					<Slider :tip-format="format" v-model="time" :min="580" :max="1324" @on-change="timeChange" range></Slider>
				</div>
			</i-col>
		</Row>
	</div>

</template>

<script>
  import DataTable from '../components/DataTable'
	import EchartsContent from '../components/EchartsContent'
  import HighContent from '../components/HighContent'
  import MapContent from '../components/MapContent'

  export default {
    components: {
      'data-table':DataTable,
      'echarts-content':EchartsContent,
      'high-content':HighContent,
			'map-content':MapContent
    },
    data () {
      return {
        split3: 0.3,
        split4: 0.5,
				time:[580,1324]

      }
    },
		computed: {

		},
		methods: {
      timeChange(){
        let _this=this
        // let serverUrl = '/api/'  //本地调试时
        //let serverUrl = 'http://47.92.251.238:3000/'  //打包部署上线时
        let serverUrl = 'http://localhost:3000/'  //编译环境
				if (this.$store.state.mode == '轨迹'){
          this.$axios.post(serverUrl+"searchTraces",{
            from: _this.time[0],
            to: _this.time[1],
          })
            .then(response =>{
              //console.log(response.data)
              _this.$store.commit('setTraces',response.data)
              _this.$refs.traces.updateTraces()
              _this.$refs.dataTable.updateTable()
            })
				}else{
          this.$axios.post(serverUrl+"searchPoems",{
            from: _this.time[0],
            to: _this.time[1],
          })
            .then(response =>{
              //console.log(response.data)
              _this.$store.commit('setPoems',response.data)
              _this.$refs.traces.updatePoems()
              //_this.$refs.dataTable.updateTable()
            })
				}
			},
      updateDateL(){
				if(this.$store.state.mode == '轨迹'){
          this.$refs.dataTable.updateTable()
          this.$refs.traces.updatePoetTraces()
				}else{
          this.$refs.traces.updatePoetPoems()
				}
			},
      format (val) {
        return '公元' + val + '年';
      },
		},

  }

</script>
