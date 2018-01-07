<template>
	<div class="page clearfix">
        
        <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="clearfix mt20">
            <div class="clearfix">

                <el-input 
                style="width:280px" 
                v-model="name" 
                placeholder="请输入名称" 
                @keyup.native.enter="goSearch">    
                </el-input>

                <el-button type="primary" @click="goSearch">查 询</el-button>
                <el-button type="success" @click="goChange('add')">新 增</el-button>
            </div>
            <div class="clearfix mt20">
                <el-table :border="true" :show-header="true" :stripe="true" :data="tableData" v-loading="loading">
                    <el-table-column label="#">
                        <template slot-scope="scope">
                            {{ scope.row.id }}
                        </template>
                    </el-table-column>
                    <el-table-column label="名称">
                        <template slot-scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="价格">
                        <template slot-scope="scope">
                            {{ scope.row.money | money }}
                        </template>
                    </el-table-column>
                    <el-table-column label="描述">
                        <template slot-scope="scope">
                            {{ scope.row.description }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="goChange('change')">修 改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
		

		<div class="block fr mt20">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :total="pageCount">
            </el-pagination>
      </div>

	</div>
</template>


<script>
import init from '../../../static/js/init.js';
export default {
    data() {
        return {
            loading:true,
            tableData: [],
            pageNo:1,
            pageSize:4,
            pageCount:0,
            name:'',
        }
    },
    methods: {
        goChange(val){
            this.$router.push({ path: '/admin/tool_food', query: { type: val } });
        },
        goSearch(){
            this.getDataTable(this.pageNo, this.pageSize, this.name)
        },
        handleCurrentChange(val){
            this.getDataTable(val, this.pageSize, this.name)
        },
        getDataTable(pageNo, pageSize, name){
            var _self = this;
            $.ajax({
                url: init.config.host+':'+init.config.port+'/api/hotList',
                type:'POST',
                data:{
                    name:name,
                    pageNo:pageNo,
                    pageSize:pageSize
                },
                success(data){
                    _self.loading = false;
                    if ( data.code == 0 ) {
                        _self.tableData = data.list;
                        _self.pageNo = data.pageNo;
                        _self.pageSize = data.pageSize;
                        _self.pageCount = data.pageCount;
                    }else{
                        _self.$message.warning(data.msg)
                    }
                }
            })
        }
    },
    mounted(){
        this.getDataTable(this.pageNo, this.pageSize, this.name)
    }
}
</script>