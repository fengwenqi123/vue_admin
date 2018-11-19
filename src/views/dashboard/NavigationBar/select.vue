<template>
  <div class="select_main">
    <el-select v-model="value" placeholder="请选择" @change="changes">
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
          label: '杭州市',
          lon: 120.1715,
          lat: 30.2660
        }, {
          value: '2',
          label: '宁波市',
          lon: 121.5461,
          lat: 29.8764
        }, {
          value: '3',
          label: '温州市',
          lon: 120.6953,
          lat: 27.9982
        }, {
          value: '4',
          label: '绍兴市',
          lon: 120.5761,
          lat: 30.0329
        }, {
          value: '5',
          label: '湖州市',
          lon: 120.0970,
          lat: 30.8710
        }, {
          value: '6',
          label: '嘉兴市',
          lon: 120.7512,
          lat: 30.7473
        }, {
          value: '7',
          label: '金华市',
          lon: 119.6428,
          lat: 29.0811
        }, {
          value: '8',
          label: '衢州市',
          lon: 118.8694,
          lat: 28.9390
        }, {
          value: '9',
          label: '台州市',
          lon: 121.4161,
          lat: 28.6590
        }, {
          value: '10',
          label: '丽水市',
          lon: 119.9185,
          lat: 28.4706
        }, {
          value: '11',
          label: '舟山市',
          lon: 122.2036,
          lat: 29.9878
        }],
        value: '湖州市'
      }
    },
    methods: {
      changes() {
        this.options.forEach((item, index) => {
          if (this.value === item.value) {
            $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.pointTo(item.lon, item.lat)
          }
        })
        // $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.pointTo()
      }
    }
  }
</script>
<style scoped>
</style>
