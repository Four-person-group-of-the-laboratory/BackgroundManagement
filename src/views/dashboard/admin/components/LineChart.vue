<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '350px'
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
    setOptions({ xvalue, actualData, axisLabel, xaxisLabelValue, axisLabelValue, legendData, chartName, xname } = {}) {
      this.chart.setOption({
        // xAxis: {
        //   type: 'category',
        //   name: xname,
        //   data: xvalue
        // },
        xAxis: [{
          type: 'category',
          data: xvalue,
          axisLabel: xaxisLabelValue,
          axisTick: {
            alignWithLabel: true
          }
        }],
        // grid: {
        //   left: 10,
        //   right: 10,
        //   bottom: 20,
        //   top: 30,
        //   containLabel: true
        // },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
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
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: axisLabelValue
        },
        legend: {
          data: legendData
        },
        series: [{
          // name: 'expected', itemStyle: {
          //   normal: {
          //     color: '#FF005A',
          //     lineStyle: {
          //       color: '#FF005A',
          //       width: 2
          //     }
          //   }
          // },
          smooth: true,
          type: 'line',
          // data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: chartName,
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
