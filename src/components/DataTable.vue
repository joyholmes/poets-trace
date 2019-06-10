<template>
	<div class="datatable">
		<Table size="small" :columns="columns1" :data="data" class="table"></Table>
		<Page :total="dataCount" :page-size="pageSize" size="small" show-elevator @on-change="changePage"></Page>
	</div>
</template>
<script>
  export default {
    data () {
      return {
        columns1: [
          {
            title: '作家',
            key: '作家'
          },
          {
            title: '朝代',
            key: '朝代'
          },
          {
            title: '年份',
            key: '年份'
          },
          {
            title: '起始点',
            key: '起始点'
          },
          {
            title: '目的地省',
            key: '目的地省'
          },
          {
            title: '目的地市县',
            key: '目的地市县'
          }
        ],
				// 页面数据
        data:[],
				// 所有数据
				data2:[],
        // 初始化信息总条数
        dataCount:0,
        // 每页显示多少条
        pageSize:10,
				// 文人筛选
        poetStatus:[],
				//起始点筛选
				startStatus:[],
        //目的地筛选
        endStatus:[]
      }
    },
		methods: {
      pageData(){
        this.dataCount = this.$store.state.tracesInfo.length
				if(this.dataCount < this.pageSize){
				  this.data = this.data2
				}else{
          this.data = this.data2.slice(0,this.pageSize)
				}
			},
      changePage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.data = this.data2.slice(_start,_end);
			},
      /*
		 * JSON数组去重
		 * @param: [array] json Array
		 * @param: [string] 唯一的key名，根据此键名进行去重
		 */
      uniqueArray(array, key){
				var result = [array[0][key]]
				for(var i = 1; i < array.length; i++){
					var item = array[i]
					var repeat = false
					for (var j = 0; j < result.length; j++) {
						if (item[key] == result[j]) {
							repeat = true
							break
						}
					}
					if (!repeat) {
						result.push(item[key])
					}
				}
				return result
			},
      updateTable(){
        if(this.$store.state.mode == '轨迹'){
          let _this = this
					let startPoints = this.uniqueArray(this.$store.state.tracesInfo, '起始点')
          let endPoints = this.uniqueArray(this.$store.state.tracesInfo, '目的地市县')
          let startFilter = []
          let endFilter = []
          startPoints.forEach(function (value) {
            startFilter.push({
              label: value,
              value: value
            })
          })
          endPoints.forEach(function (value) {
            endFilter.push({
              label: value,
              value: value
            })
          })
          this.columns1 = [
            {
              title: '作家',
              key: '作家'
            },
            {
              title: '朝代',
              key: '朝代'
            },
            {
              title: '年份',
              key: '年份'
            },
            {
              title: '起始点',
              key: '起始点',
              filters: startFilter,
              //远程筛选功能
              filterRemote: function (value,row) {
                _this.startStatus = value;
                _this.startQuery();
              }
            },
            {
              title: '目的地省',
              key: '目的地省'
            },
            {
              title: '目的地市县',
              key: '目的地市县',
              filters: endFilter,
              //远程筛选功能
              filterRemote: function (value,row) {
                _this.endStatus = value;
                _this.endQuery();
              }
            }
          ]
          this.data2 = this.$store.state.tracesInfo
          this.pageData()
				}else {
          this.columns1 = [
            {
              title: '地点',
              key: '地点'
            },
            {
              title: '数量',
              key: 'count'
            }
					]
          this.data2 = this.$store.state.poemsInfo
          this.dataCount = this.$store.state.poemsInfo.length
          if(this.dataCount < this.pageSize){
            this.data = this.data2
          }else{
            this.data = this.data2.slice(0,this.pageSize)
          }
				}
			},

			//文人查询函数
      poetQuery(){
        let _this = this
				let queryData = []
				console.log(this.poetStatus)
        this.data2.forEach(function (value) {
					if(_this.poetStatus.indexOf(value.文人)>=0){
            queryData.push(value)
					}
        })
        this.dataCount = queryData.length
        if(this.dataCount < this.pageSize){
          this.data = queryData
        }else{
          this.data = queryData.slice(0,this.pageSize)
        }
			},
      //起点查询函数
      startQuery(){
        let _this = this
        let queryData = []
        this.data2.forEach(function (value) {
          if(_this.startStatus.indexOf(value.起始点)>=0){
            queryData.push(value)
          }
        })
        this.dataCount = queryData.length
        if(this.dataCount < this.pageSize){
          this.data = queryData
        }else{
          this.data = queryData.slice(0,this.pageSize)
        }
      },
      //终点查询函数---->修改了iview  ivu-table-filter-list 样式max-hight:500px 否则过长
      endQuery(){
        let _this = this
        let queryData = []
        this.data2.forEach(function (value) {
          if(_this.endStatus.indexOf(value.目的地市县)>=0){
            queryData.push(value)
          }
        })
        this.dataCount = queryData.length
        if(this.dataCount < this.pageSize){
          this.data = queryData
        }else{
          this.data = queryData.slice(0,this.pageSize)
        }
      },

			//更新各文人作品表
			updatePoemsTable(){
        let _this = this
        let poetsFilter = []
				this.$store.state.poets.forEach(function (value) {
					poetsFilter.push({
						label: value,
            value: value
					})
        })
        this.columns1 = [
          {
            title: '文人',
            key: '文人',
            filters: poetsFilter,
						//iview的表格筛选及排序功能没有想象中的强大，如果使用后端分页的话只会对当前页进行筛选和排序，
						// 如果需要对全局进行筛选和排序的建议另写筛选和排序方法改变全局显示的数据。如果显示所有页面就没有问题
						// （暂时未发现表格中包含前端分页功能），但当数据过多就无能为力。
            // filterMethod (value, row) {
            //   return row.文人.indexOf(value) > -1;
            // },

						//远程筛选功能
            filterRemote: function (value,row) {
              _this.poetStatus = value;
              _this.poetQuery();
            }
          },
          {
            title: '地点',
            key: '地点'
          },
          {
            title: '数量',
            key: '数量'
          }
				]
        this.data2 = this.$store.state.poemsInfo
        this.dataCount = this.$store.state.poemsInfo.length
        if(this.dataCount < this.pageSize){
          this.data = this.data2
        }else{
          this.data = this.data2.slice(0,this.pageSize)
        }
			}
		}
  }
</script>

<style scoped>
	.datatable{
		height: 100%;
		width: 100%;
		overflow:auto
	}
	.data{
		height: 100%;
		width: 100%;
	}
</style>