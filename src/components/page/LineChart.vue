<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
import resize from '@/components/mixins/resize'
// 按照使用到的功能添加组件导入，
require('echarts/lib/chart/line') // 按需导入折线组件
require('echarts/lib/chart/bar') // 按需导入柱状组件
require('echarts/lib/chart/effectScatter') // 拐点出闪烁，高亮
require('echarts/lib/component/tooltip') // 提示组件
require('echarts/lib/component/toolbox')
require('echarts/lib/component/title')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/legend') // 图例组件
require('echarts/lib/component/markPoint') // 标注组件
require('echarts/lib/component/markLine')

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    // width: {
    //   type: String,
    //   default: '100%'
    // },
    // height: {
    //   type: String,
    //   default: '50%'
    // },
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
      this.chart = echarts.init(this.$el, 'line')
      this.setOptions(this.chartData)
    },
    setOptions({ xvalue, actualData, colorSet, titleValue, axisLabelValue, legendData, chartName, xname } = {}) {
      this.chart.setOption({
        // grid: {
        //   left: 10,
        //   right: 10,
        //   bottom: 20,
        //   top: 30,
        //   containLabel: true
        // },
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
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          name: xname,
          data: xvalue
        },
        yAxis: {
          type: 'value',
          // char: charValue,
          // axisLabel: {
          //   formatter: 'char{value}'
          // }
          axisLabel: axisLabelValue
        },
        title: {
          text: titleValue
        },
        legend: {
          // data: ['收益']
          data: legendData
        },
        series: [
          {
            showAllSybol: true, // 标注所有数据点
            // name: '收益',
            name: chartName,
            smooth: true,
            type: 'line',
            lineStyle: {// 设置折线色颜色
              color: colorSet
            },
            itemStyle: {// 设置折线折点的颜色
              normal: {
                color: colorSet
              }
            },
            data: actualData,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
            // animationDuration: 2800,
            // animationEasing: 'quadraticOut'
          }]
      })
    }
  }
}
</script>
