<template>
  <div style="display: flex;justify-content: center;margin-top: 10px">
    
    

    <div class="app-container">
      <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="试卷名" style="width: 200px;" class="filter-item" @keyup.enter.native="initPage" />
      <el-select v-model="listQuery.type" placeholder="试卷类型" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in TypeOptions" :key="item.key" :label="item.TypeName" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.college" placeholder="所属学院" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in CollegeOptions" :key="item.ket" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="initPage">
        查找
      </el-button>
    </div>
      <!--表格-->

      <el-table :data="tabledata.data" border style="Width: 100%; overflow-y: auto;">
        <el-table-column prop="address" label="序号" width="100">
          <template scope="scope">
            <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="试卷名称" width="300"></el-table-column>
        <el-table-column label="试卷类型" width="180">
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
          
          <!-- 在方法中跳转的方法 -->
          <!-- <template slot-scope="scope">
            <el-button type="primary" @click="detail(scope.row.id)">查看详情</el-button>
          </template> -->

          <!-- 直接跳转的方法 -->
          <template slot-scope="scope">
            <router-link :to="{path:'/detail',query:{TestPaperId:scope.row.id} }"><el-button type="primary" >查看详情</el-button></router-link>
          </template>

        </el-table-column>
      </el-table>

      <!--分页插件-->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total"
      ></el-pagination>
    </div>
          <router-view>
          </router-view>
  </div>
          
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { getcollege } from '@/api/analyticStatistics/testRecords';

export default {
  data() {
    return {
      tabledata: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      listQuery: {
        name: "",
        college: "",
        type: "",
      },
      TypeOptions: 
		    [
          {"TypeName": "普通测试",
          "key": 1,},
          {"TypeName": "期末考试",
          "key": 2,}
        ],
      CollegeOptions: [],
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    sizeChange(size) {
      this.pageSize = size;
      this.initPage();
    },

    currentChange(page) {
      this.currentPage = page;
      this.initPage();
    },
    initPage() {
      axios({
        method: "get",
        url: "http://localhost:8080/testpaper/query/",
        params: {
          page: this.currentPage,
          size: this.pageSize,
          name: this.listQuery.name,
          type: this.listQuery.type,
          college: this.listQuery.college
        },
        async: true
      })
        .then(resp => {
          window.console.log(JSON.stringify(resp));
          this.tabledata = resp.data.data;
          this.total = resp.data.total;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err);
        });
      
      getcollege().then(rsp => {
          this.CollegeOptions = rsp.data;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err);
        });

        // axios({
      //   method: "get",
      //   url: "http://localhost:8080/college/getcollege/",
      //   async: true
      // })
      //   .then(resp => {
      //     window.console.log(JSON.stringify(resp));
      //     this.CollegeOptions = resp.data;
      //   })
      //   .catch(err => {
      //     this.loading = false;
      //     this.$message.error(err);
      //   });
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
      // 跳转到详情页的方法
  //   detail(id) {
  //     // const routeData = this.$router.push({
  //     //   path: '/analyticStatistics/testRecords'
  //     // })
  //     const routeData = this.$router.replace({
  //       path: '/detail',
  //       query: {
  //          TestPaperId: id
  //       }
  //     })
  //   },
  }
};
</script>