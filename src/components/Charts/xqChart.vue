<template>
  <div :class="className" :id="id" style="height:200px;width:100%"/>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        chart: null,
        className: 'chart',
        id: 'chart',
        obja: {},
        objb: {},
        numobj: []
      }
    },
    props: ['obj'],
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        var numobj = []
        this.obj.forEach((item, index) => {
          if (item.status === 2) {
            this.obja.name = '正常'
            this.obja.value = item.checkNum
          } else {
            this.objb.name = '异常'
            this.objb.value = item.checkNum
          }
        })
        numobj.push(this.obja)
        numobj.push(this.objb)
        this.chart.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '数量',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: numobj,
              color: ['#6AB0B8', '#D53A35']
            }
          ]
        })
      }
    }
  }
</script>
