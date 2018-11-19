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
        this.obja.value = this.obj.upStream
        this.obja.name = '上行'
        this.numobj.push(this.obja)
        this.objb.value = this.obj.downStream
        this.objb.name = '下行'
        this.numobj.push(this.objb)
        numobj = this.numobj
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
