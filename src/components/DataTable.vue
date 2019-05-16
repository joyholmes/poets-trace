<template>
	<div class="datatable">
		<Table size="small" :columns="columns1" :data="data" class="table"></Table>
		<Page :total="dataCount" :page-size="pageSize" size="small" show-elevator @on-change="changepage"></Page>
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
        data: [],
				data2:[],
        // 初始化信息总条数
        dataCount:0,
        // 每页显示多少条
        pageSize:10,
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
      changepage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.data = this.data2.slice(_start,_end);
			},
      updateTable(){
        //this.$forceUpdate();
        this.data2 = this.$store.state.tracesInfo
				this.pageData()
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