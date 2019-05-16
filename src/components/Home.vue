<style scoped>
	.home{
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
		height: 100%;
	}
	.layout-logo{
		width: 10%;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		float: left;
		margin: auto;
		line-height: 30px;
		color: white;
		text-align: center;
		vertical-align: middle;
		overflow: hidden;
		position: relative;
		top: 15px;
	}
	.layout-nav{
		width: max-content;
		margin: 0 auto;
		margin-right: 5px;
	}

	.layout-search{
		width: max-content;
		margin: 0 auto;
		margin-right: 5px;
	}

	.layout-footer-center{
		text-align: center;
	}
	#total-layout{
		height: 100%;
	}
	#content{
		height: 100%;
	}

</style>
<template>
	<div class="home">
		<Layout id="total-layout">
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="1">
					<div class="layout-logo"><h3>唐宋诗词可视化系统</h3></div>
					<div class="layout-nav">
						<!--<MenuItem name="1">-->
							<!--<Icon type="ios-navigate"></Icon>-->
							<!--作品统计-->
						<!--</MenuItem>-->
						<!--<MenuItem name="2">-->
							<!--<Icon type="ios-keypad"></Icon>-->
							<!--轨迹统计-->
						<!--</MenuItem>-->
						<!--<MenuItem name="3">-->
							<!--<Icon type="ios-analytics"></Icon>-->
							<!--时间统计-->
						<!--</MenuItem>-->
						<!--<MenuItem name="4">-->
							<!--<Icon type="ios-paper"></Icon>-->
							<!--其他-->
						<!--</MenuItem>-->
					</div>

					<div class="layout-search">
						<search @update="updateDataH"></search>
					</div>

				</Menu>
			</Header>
			<Content id="content">
				<poet-layout ref="pLayout"></poet-layout>
			</Content>
			<Footer class="layout-footer-center">2011-2016 &copy; MrJoyHolmes</Footer>
		</Layout>
	</div>
</template>
<script>
  import PoetLayout from './PoetLayout'
  import Search from './Search'
  export default {
	  components:{
      'poet-layout':PoetLayout,
      'search':Search
		},
		methods:{
	    //被子组件Search里的poetChange函数调用，文人数组发生变化，并调用子组件PoetLayout函数
	    updateDataH(){
        this.$refs.pLayout.updateDateL()
			}
		}
  }
</script>
