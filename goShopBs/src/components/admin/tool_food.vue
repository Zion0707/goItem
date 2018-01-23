<template>
	<div class="page clearfix">
		<el-breadcrumb>
            <el-breadcrumb-item :to="{ path : '/admin/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ type == 'add' ? '新增' : '修改' }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="clearfix mt20">
				
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				<el-form-item label="商品名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="商品价格" prop="money">
				    <el-input v-model="ruleForm.money"></el-input>
				</el-form-item>
				<el-form-item label="商品类型" prop="type">
				    <el-input v-model="ruleForm.type"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" prop="description">
				    <el-input v-model="ruleForm.description"></el-input>
				</el-form-item>
				<el-form-item>
			    	<el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="loading" element-loading-text="正在提交中..">提交</el-button>
			    	<el-button @click="resetForm('ruleForm')" plain>重置</el-button>
			    	<el-button type="info" @click="back" plain>返回</el-button>
			  	</el-form-item>
			</el-form>

        </div>
	</div>
</template>

<script>
import init from '../../../static/js/init.js';
export default{
	data(){
		return {
			loading: false,
			type : this.$route.query.type,
			id: this.$route.query.id ,
		
			ruleForm: {
				name : '',
				money : '',
				type : '',
				description : '',
			},
			rules: {
				name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
				money: [{ required: true, validator: checkMoney , trigger: 'blur' }],
				type: [{ required: true, validator: checkNumber , trigger: 'blur' }],
				description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
			}
		}
	},
	methods:{
		submitForm(formName){
			var _self = this;

			this.$refs[formName].validate((valid) => {
	          	if (valid) {
	          		
	          		var status = _self.type == 'change' ? 'updateGoods' : 'addGoods';
	          		_self.loading = true;
	          		$.ajax({
			            url: init.config.host + '/api/' + status,
			            type:'POST',
			            data:{
			            	id: _self.id,
			            	name: _self.ruleForm.name ,
							money: _self.ruleForm.money ,
							type: _self.ruleForm.type,
							description: _self.ruleForm.description
			            },
			            success(data){
	          				_self.loading = false;
			                if ( data.code == 0 ) {
			                	_self.$message({
			                		type: 'success',
			                		message: data.msg,
			                		onClose(){
			                			_self.$router.push({ path : '/admin/index' });
			                		}
			                	})
			                }else{
			                    _self.$message.warning(data.msg)
			                }
			            }
			        });

	          	}
	      	})
		},
		resetForm(formName){
			this.$refs[formName].resetFields();
		},
		back(){
			this.$router.back(-1);
		}
	},
	mounted(){
		var _self = this;

		if ( _self.type == 'change' ) {

			$.ajax({
	            url: init.config.host + '/api/goodsDetail',
	            type:'POST',
	            data:{
	            	id: _self.id
	            },
	            success(data){
	                if ( data.code == 0 ) {
	                	_self.ruleForm.name = data.goods.name;
	                	_self.ruleForm.money = data.goods.money;
	                	_self.ruleForm.type = data.goods.type;
	                	_self.ruleForm.description = data.goods.description;

	                }else{
	                    _self.$message.warning(data.msg)
	                }
	            }
	        });

        }

	}
}
</script>