<template>
  <div class="">
    <div class="maim" v-for="(item, index) in arrData"
        :key="index"
        >
      <el-col  span="4" class="mm">
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <span>{{item.courseclassname}}</span>
            </div>
            <div>
              <img class="card" width="200px" src="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191" />
            </div>
            <div>
              <span>共有{{item.count}}人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span> 
              <router-link :to="{path:'/onlinedetail',query:{CourseClass:item.id} }"><el-button type="primary">查看详情</el-button>
              </router-link>
            </div>
          </el-card>
        </el-col>
      </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import { mapGetters } from "vuex";
import { getcourseclass } from '@/api/analyticStatistics/onlineTimeStatistics';

export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      arrData: [],
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      getcourseclass().then(rsp => {
          this.arrData = rsp.data;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err);
        });
    },


    
  }

}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}

.main{
  width: 100%;
  height: 100%;
  display: flex;
}
.mm{
  flex: 1;
  margin: 10px;
}
</style>