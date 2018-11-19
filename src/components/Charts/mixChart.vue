<template>
  <div :class="className" :id="id" style="height:400px;width:100%"/>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        chart: null,
        className: 'chart',
        id: 'chart',
        obja: {}
      }
    },
    props: ['obj'],
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        const xData = this.obj.num
        const normalShip = this.obj.normalShip
        const exceptionShip = this.obj.exceptionShip
        this.chart.setOption({
          backgroundColor: '#fff',
          title: {
            text: '',
            x: '0',
            top: '0',
            textStyle: {
              color: '#fff',
              fontSize: '22'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            borderWidth: 0,
            top: 110,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            x: '70%',
            top: '0',
            textStyle: {
              color: '#90979c'
            },
            data: ['正常船舶', '异常船舶']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0

            },
            data: xData
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          series: [{
            name: '正常船舶',
            type: 'bar',
            stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(40, 167, 69, 1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: normalShip
          }, {
            name: '异常船舶',
            type: 'bar',
            stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(255,69,0, 1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: exceptionShip
          }
          ]
        })
      }
    }
  }
</script>
