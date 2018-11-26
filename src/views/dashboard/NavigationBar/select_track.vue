<template>
  <div class="select_main">
    <el-select v-model="value" placeholder="轨迹回放" @change="changes">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '区域轨迹'
        }, {
          value: '2',
          label: '船舶轨迹'
        }],
        value: ''
      }
    },
    methods: {
      changes() {
        if (this.value === '1') {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/areatrack/trackMap.html', 'width=1348,height=688,top=100px,left=100px')
        } else if (this.value === '2') {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/areatrack/trackMap_personal.html', 'width=1348,height=688,top=100px,left=100px')
        }
      }
    }
  }
</script>
<style scoped>
</style>
