<template>
  <div class="">
    <div style="margin-top:50px;">
      <el-col :span="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>班级名称</span>
            </div>
            <div>
              <img class="card" width="200px" src="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191" />
            </div>
            <div>
              <router-link :to="{path:'',query:{}}"><el-button type="primary" >查看详情</el-button></router-link>
            </div>
          </el-card>
        </el-col>
      </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'

export default {
  name: 'MixChart',
  components: { Chart }
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
</style>

