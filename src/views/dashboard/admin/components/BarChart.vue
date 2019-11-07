<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/lib/component/title')
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '450px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ xvalue, legendData, chartName, xaxisLabelValue, xname, actualData, axisLabelValue } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter(value) {
            let str = value[0].name + xname + '<br/>'
            // let str = ''
            value.forEach(item => {
              str += item.marker + item.seriesName + '：' + item.data
            })
            return str
          },
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        // title: {
        //   text: titleValue
        // },
        legend: {
          // data: ['收益']
          data: legendData
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },

        // title: {
        //   text: '上周交易额'
        // },
        // legend: {
        //   data: ['收益']
        // },
        xAxis: [{
          type: 'category',
          data: xvalue,
          axisLabel: xaxisLabelValue,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: axisLabelValue,
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: chartName,
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: actualData,
          animationDuration
        }
        // , {
        //   name: 'pageB',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [80, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }, {
        //   name: 'pageC',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [30, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }
        ]
      })
    }
  }
}
</script>
