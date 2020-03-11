<template>
  <div style="display: flex;justify-content: center;margin-top: 200px">
    <div>
      <el-table :data="tabledata.data" border style="Width: 100%; overflow-y: auto;">
          <el-table-column prop="papername" label="试卷名称" width="180"></el-table-column>
          <el-table-column prop="courseclassname" label="使用班级" width="180"></el-table-column>
          <el-table-column prop="teacher" label="任课老师" width="180"></el-table-column>
          <el-table-column prop="stuent_cout" label="考试人数" width="180"></el-table-column>
          <el-table-column prop="start_time" :formatter="timestampToTime" label="开始时间" width="180"></el-table-column>
          <el-table-column prop="end_time" :formatter="timestampToTime" label="结束时间" width="180"></el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      tabledata: [],
    };
  },

  created() {
    this.initPage();
    
  },
  methods: {
    initPage() {
      axios({
        method: "get",
        url: "http://localhost:8080/testpaper/testdetail/",
        params: {
          TestPaperId: this.$route.query.TestPaperId,
        },
        async: true
      })
        .then(resp => {
          window.console.log(JSON.stringify(resp));
          this.tabledata = resp.data;
        })
        .catch(err => {
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
  }

};
</script>