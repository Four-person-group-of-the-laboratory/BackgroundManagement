<template>
  
  <div style="display: flex;justify-content: center;margin-top: 10px">
        <div>
            <!--表格-->
            <el-table :data="tabledata.data" border style="Width: 100%; overflow-y: auto;">
                <el-table-column prop="address" label="序号" width="100">
                    <template scope="scope"><span>{{scope.$index+(currentPage - 1) * pageSize + 1}} </span></template>
                </el-table-column>
                <el-table-column prop="name" label="试卷名称" width="300"></el-table-column>
                <el-table-column label="试卷类型"  width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type_id == 1">测试</span>  
                        <span v-else>考试</span>
                    </template>
                </el-table-column>
                <el-table-column label="所属学院" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.college_id == 4">软件工程</span>  
                        <span v-else>计算机</span>
                    </template>
                </el-table-column>
                <el-table-column prop="create_by" label="出题人" width="180"></el-table-column>
                <el-table-column prop="create_date" :formatter="timestampToTime" label="出题时间" width="180"></el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
　　　　　  　           <el-button type="primary" @click="detaile">查看详情</el-button>
　　　　             </template>
                 </el-table-column>  
            </el-table>

            <!--分页插件-->
            <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
            </el-pagination>
        </div>
  
    </div>


</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

    data() {
        return { 
        tabledata:[],
        pageSize:10,
        currentPage:1,
        total:0
        }
    },
    created(){
        this.initPage();
    },
  methods: {
       
        sizeChange(size) {
            this.pageSize=size;
            this.initPage();
        },

        currentChange(page) {
            this.currentPage=page;
            this.initPage();
        },
        initPage() {
            
            axios({
                    method: 'get',
                    url: 'http://localhost:8080/testpaper/page/',
                    params: { 
                        page: this.currentPage,
                        size: this.pageSize
                    },
                    async: true
                }).then((resp) => {
                    
                    window.console.log(JSON.stringify(resp));
                    this.tabledata=resp.data;
                    this.total=resp.data.total;
                    
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err);
                });
        },

        //时间格式化
        timestampToTime (row, column) {
        var date = new Date(row.create_date) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
        console.log(timestampToTime (1533293827000))
        },
        detaile(){
            
        }
    }
}
</script>