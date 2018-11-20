<template>
  <div class="select_main">
    <el-select v-model="value" placeholder="选择区域" @change="changes">
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
          label: '历史轨迹'
        }],
        value: ''
      }
    },
    methods: {
      changes() {
        if (this.value === '1') {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/areatrack/trackMap.html', 'width=1366,height=786,top=0px,left=0px')
        } else if (this.value === '2') {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/areatrack/trackMap_personal.html', 'width=1366,height=786,top=0px,left=0px')
        }
      }
    }
  }
</script>
<style scoped>
</style>
