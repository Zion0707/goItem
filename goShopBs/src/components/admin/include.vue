<template>
	<div class="page">
		<header class="header">
			<div class="fl">
				<a class="logo fl">Go</a>
				<a href="javascript:;" class="more-btn el-icon-more fl"></a>
			</div>
			<div class="fr tool">
				<a href="javascript:;" @click="reload">刷新</a>
				<a href="#">退出</a>
			</div>
		</header>

		<div id="wrap" class="clearfix">
			<div id="sidebar">
			    <el-menu
			    	default-active="1"
			      	class="el-menu-vertical-demo"
			      	@open="handleOpen"
			      	@close="handleClose">
				

			      	<el-menu-item index="1" @click="routerPush('index')">
			        	<i class="el-icon-document"></i>
			        	<span slot="title">菜单信息</span>
			      	</el-menu-item>
			      	<el-submenu index="2">
				        <template slot="title">
				          <i class="el-icon-menu"></i>
				          <span>导航一</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="2-1">选项1</el-menu-item>
				          <el-menu-item index="2-2">选项2</el-menu-item>
				        </el-menu-item-group>
			      	</el-submenu>
			      	
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

      	},
      	reload(){
      		window.location.reload()
      	},
      	routerPush(val){
      		this.$router.push({ path:'/admin/'+val });
      	}
    },
    mounted(){
    	$('#wrap').height($(window).height() - 80);
    	$(window).on('resize',function(){
   	 		$('#wrap').height($(window).height() - 80);
    	});

    	$('.more-btn').on('click',function(){
    		$('#wrap').toggleClass('sidebar-toggle');
    	})
    }
}
</script>