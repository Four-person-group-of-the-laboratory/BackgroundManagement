<template>
  <el-row :gutter="40" class="panel-group">

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月学生访问量
          </div>
          <count-to :start-val="0" :end-val="hits" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月教师访问量
          </div>
          <count-to :start-val="0" :end-val="hits" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="moneyDishboard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月随堂测验次数
          </div>
          <count-to :start-val="0" :end-val="money" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月考试次数
          </div>
          <count-to :start-val="0" :end-val="orders" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
// import { getMainPageData } from '@/api/dataStatistics/userData'
// import qs from 'qs'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      hits: undefined,
      money: undefined,
      orders: undefined,
      queryDay: {
        start: undefined,
        end: undefined
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.$emit('handleSetLineChartData', type)
    // }
    getData() {
      this.hits = 2019
      this.money = 2019
      this.orders = 2019
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
      // this.queryDay.start = `${y}-${m}-1 ${hh}:${mm}:${ss}`

      // getMainPageData(qs.stringify(this.queryDay)).then(response => {
      //   if (response.data !== null) {
      //     this.hits = response.data.hits
      //     this.money = response.data.money
      //     this.orders = response.data.orders
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      // .box-card-header{
      //   //  transform: scale(1.1, 1.1);
      //   filter: contrast(130%);
      // }
      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
