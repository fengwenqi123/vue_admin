<template>
  <div class="checkboxs1">
    <div style="display: inline-block; margin-top: 4px;">
      图层要素
    </div>
    <el-checkbox :indeterminate="isIndeterminate" style="float: right;" v-model="checkAll"
                 @change="handleCheckAllChange">全选
    </el-checkbox>
    <div style="width: 100%; height: 10px;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item,index) in cities" :key="index">
          <div class="grid-content bg-purple">
            <el-checkbox class="checkboxed" :label="item.name"></el-checkbox>
          </div>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
</template>
<script>
  /* eslint-disable object-curly-spacing,no-undef */
  import {setYaoshu, getYaoshu} from '@/utils/auth.js'

  const cityOptions = [
    {name: '视频', value: 'shipin'},
    {name: '卡口', value: 'kakou'},
    {name: '码头', value: 'matou'},
    {name: '海事站所', value: 'hszs'},
    {name: '物资储备', value: 'support'},
    {name: 'AIS基站', value: 'aisBase'},
    {name: 'VHF基站', value: 'vhfBase'},
    {name: '监控区域', value: 'marea'}
  ]
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['视频', '卡口', '码头', '海事站所', '物资储备', 'AIS基站', 'VHF基站', '监控区域'],
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    created() {
      this.yaoshu()
    },
    methods: {
      yaoshu() {
        setTimeout(() => {
          this.checkedCities = getYaoshu().split(',')
        }, 1500)
      },
      handleCheckAllChange(val) {
        if (val) {
          this.checkedCities = []
          cityOptions.forEach((item, index) => {
            this.checkedCities.push(item.name)
          })
        } else {
          this.checkedCities = []
        }
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        var checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },
      settping() {
        if (this.checkedCities.indexOf('视频') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('shipin', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('shipin', false)
        }
        if (this.checkedCities.indexOf('卡口') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('kakou', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('kakou', false)
        }
        if (this.checkedCities.indexOf('码头') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('matou', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('matou', false)
        }
        if (this.checkedCities.indexOf('海事站所') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('hszs', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('hszs', false)
        }
        if (this.checkedCities.indexOf('物资储备') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('support', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('support', false)
        }
        if (this.checkedCities.indexOf('AIS基站') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('aisBase', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('aisBase', false)
        }
        if (this.checkedCities.indexOf('VHF基站') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('vhfBase', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('vhfBase', false)
        }
        if (this.checkedCities.indexOf('监控区域') !== -1) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('marea', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('marea', false)
        }
      }
    },
    watch: {
      checkedCities() {
        this.settping()
        setYaoshu(this.checkedCities.join(','))
      }
    }
  }
</script>
<style scoped lang="scss">
  .checkboxs1 {
    .grid-content {
      padding: 5px 0;
    }
  }
</style>
