<template>
  <div class="checkboxs">
    <div style="display: inline-block; margin-top: 4px;">
      船舶种类
    </div>
    <el-checkbox :indeterminate="isIndeterminate" style="float: right;" v-model="checkAll"
                 @change="handleCheckAllChange">全选
    </el-checkbox>
    <div style="width: 100%; height: 10px;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item,index) in cities" :key="index">
          <div class="grid-content bg-purple">
            <svg-icon :icon-class="item.icon"></svg-icon>
            <br>
            <el-checkbox class="checkboxed" :label="item.name"></el-checkbox>
          </div>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
</template>
<script>
  /* eslint-disable object-curly-spacing */

  import {setShip, getShip} from '@/utils/auth.js'

  const cityOptions = [
    {
      name: '海巡艇',
      icon: 'ship0',
      checkeds: true
    },
    {
      name: '货船',
      icon: 'ship1',
      checkeds: true
    }, {
      name: '问题货船',
      icon: 'ship2',
      checkeds: true
    }, {
      name: '危险品船',
      icon: 'ship3',
      checkeds: true
    }, {
      name: '客船',
      icon: 'ship4',
      checkeds: true
    }, {
      name: '其他',
      icon: 'ship5',
      checkeds: true
    }
  ]
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['海巡艇', '货船', '问题货船', '危险品船', '客船', '其他'],
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    created() {
      this.ship()
    },
    methods: {
      ship() {
        if (getShip()) {
          this.checkedCities = getShip().split(',')
        }
      },
      handleCheckAllChange(val) {
        console.log(val)
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
      }
    },
    watch: {
      checkedCities() {
        setShip(this.checkedCities.join(','))
      }
    }
  }
</script>
<style scoped lang="scss">
  .grid-content {
    text-align: center;
  }

  .svg-icon {
    margin-left: 10px;
    font-size: 35px;
    margin-bottom: 18px;
  }
</style>
