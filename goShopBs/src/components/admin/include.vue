<template>
	<div class="page">
		<header class="header">
			<div class="fl">
				<a class="logo">Go</a>
			</div>
			<div class="fr tool">
				<a href="#">刷新</a>
				<a href="#">退出</a>
			</div>
		</header>

		<div id="wrap" class="clearfix">
			<div id="sidebar">
			    <el-menu
			    	default-active="2"
			      	class="el-menu-vertical-demo"
			      	@open="handleOpen"
			      	@close="handleClose">

			      	<el-submenu index="1">
				        <template slot="title">
				          <i class="el-icon-menu"></i>
				          <span>导航一</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="1-1">选项1</el-menu-item>
				          <el-menu-item index="1-2">选项2</el-menu-item>
				        </el-menu-item-group>
			      	</el-submenu>
			      	<el-menu-item index="2">
			        	<i class="el-icon-location"></i>
			        	<span slot="title">导航二</span>
			      	</el-menu-item>
			      	
			    </el-menu>
			</div>
			<div id="content">
				<div class="content">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {

		}
	},
	methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    },
    mounted(){
    	$('#wrap').height($(window).height() - 80);
    	$(window).on('resize',function(){
   	 		$('#wrap').height($(window).height() - 80);
    	})
    }
}
</script>