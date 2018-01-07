<template>
	<div class="page clearfix">
		<el-breadcrumb>
            <el-breadcrumb-item :to="{ path : '/admin/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ type == 'add' ? '新增' : '修改' }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="clearfix mt20">
			{{ type }}    	
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				type : this.$route.query.type
			}
		},
		mounted(){
			console.log( this.type )
		}
	}
</script>