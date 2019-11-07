<template>
  <div>
    <div class="dashboard-editor-container">
      <panel-group />
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart id="myChart" :chart-data="lineChartDataOrder" />
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <bar-chart id="myChart2" :chart-data="lineChartDataDay" />
      </el-row>
    </div>
  </div>

</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'
// import { getTrafficDataInfo } from '@/api/dataStatistics/trafficData'
// import { getOrderDataInfo } from '@/api/dataStatistics/salesStatistic'

// import qs from 'qs'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    // RaddarChart,
    // PieChart,
    BarChart
    // TransactionTable,
  },
  inject: ['reload'], // 注入reload方法
  data() {
    return {
      // 按天查询：
      queryDay: {
        start: '',
        end: '',
        type: 2
      },
      queryDayOrder: {
        start: '',
        end: '',
        type: 2
      },
      lineChartDataDay: {
        xvalue: ['1', '2', '3'],
        actualData: [123, 155, 300],
        // colorSet: ['#3888fa'],
        // titleValue: '访问量统计',
        axisLabelValue: { formatter: '{value}人' },
        legendData: ['访问量统计'],
        chartName: '访问量统计',
        xname: '号',
        xaxisLabelValue: { formatter: '{value}号' }
      },
      lineChartDataOrder: {
        xvalue: ['1', '2', '3', '4'],
        actualData: [123, 155, 300, 799],
        axisLabelValue: { formatter: '{value}分' },
        legendData: ['随堂测验平均分'],
        chartName: '随堂测验平均分',
        xname: '号',
        xaxisLabelValue: { formatter: '{value}号' }
      }
    }
  },
  created() {
    this.getUerData()
    this.getOrderData()
    // window.location.reload()
    // this.$nextTick(() => {
    //   // window.location.reload()
    //   // this.isRouterAlive = true
    // })
    // window.onresize = function() {
    //   myChart.resize()
    // }
  },
  mounted() {
    // 实现自适应部分
    window.addEventListener('resize', () => {
      this.$echarts.init(document.getElementById('myChart')).resize()
      this.$echarts.init(document.getElementById('myChart2')).resize()

      // this.charts = this.$echarts.init(this.$refs.myChart).resize()
    })
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // },
    getUerData() {
      // 系统当月1号 到当日时间：
      // this.queryDay.end = new Date()
      // var dt = new Date(this.queryDay.end)
      // var y = dt.getFullYear()
      // var m = dt.getMonth() + 1// 因为得到的month是从0开始的
      // var d = dt.getDate()// getDay() 获得的是星期几，getDate()获得的是几号
      // var hh = dt.getHours()
      // var mm = dt.getMinutes()
      // var ss = dt.getSeconds()
      // this.queryDay.end = `${y}-${m}-${d} ${hh}:${mm}:${ss}`

      // this.queryDay.start = new Date()
      // this.queryDay.start = `${y}-${m}-1 ${hh}:${mm}:${ss}`

      // getTrafficDataInfo(qs.stringify(this.queryDay)).then(response => {
      //   if (response.data !== null) {
      //     this.lineChartDataDay.xvalue = response.data.X
      //     this.lineChartDataDay.actualData = response.data.Y
      //     // this.lineChartDataDay.xvalue = ['1', '2', '3', '4']
      //     // this.lineChartDataDay.actualData = ['12', '23', '34', '3424']

      //     this.lineChartDataDay.chartName = `${y}年${m}月 访问量统计`
      //     this.lineChartDataDay.legendData[0] = `${y}年${m}月 访问量统计`
      //   }
      // })
      // this.reload()
    },
    getOrderData() {
      // 系统当月1号 到当日时间：
      // this.queryDayOrder.end = new Date()
      // var dt = new Date(this.queryDayOrder.end)
      // var y = dt.getFullYear()
      // var m = dt.getMonth() + 1// 因为得到的month是从0开始的
      // var d = dt.getDate()// getDay() 获得的是星期几，getDate()获得的是几号
      // var hh = dt.getHours()
      // var mm = dt.getMinutes()
      // var ss = dt.getSeconds()
      // this.queryDayOrder.end = `${y}-${m}-${d} ${hh}:${mm}:${ss}`

      // this.queryDayOrder.start = new Date()
      // this.queryDayOrder.start = `${y}-${m}-1 ${hh}:${mm}:${ss}`

      // getOrderDataInfo(qs.stringify(this.queryDayOrder)).then(response => {
      //   if (response.data !== null) {
      //     this.lineChartDataOrder.xvalue = response.data.X
      //     this.lineChartDataOrder.actualData = response.data.Y
      //     // this.lineChartDataOrder.xvalue = ['1', '2', '3', '4']
      //     // this.lineChartDataOrder.actualData = ['12', '23', '34', '3424']
      //     this.lineChartDataOrder.chartName = `${y}年${m}月 订单成交量`
      //     this.lineChartDataOrder.legendData[0] = `${y}年${m}月 订单成交量`
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card-header {
    // position: relative;

    position: absolute;
    left:50%;
    top:50%;
    margin:-230px 0 0 -220px;

    height: 100px;
    width: 120px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 20px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.title{
  color: #3888fa;
}
</style>
