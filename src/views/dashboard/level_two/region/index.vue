<template>
  <div class="region">
    <div class="search">
      <selects :options="options" :value="value.toString()"></selects>
      <search class="sea" @searchs="searchs"></search>
    </div>
    <!--列表-->
    <div class="list" v-if="!flag&&playback">
      <p>起止时间</p>
      <div class="time">
        <date></date>
      </div>
      <p>选择区域</p>
      <div class="buttons">
        <el-row>
          <el-button type="primary" plain>船舶搜索</el-button>
          <el-button type="primary">绘制区域</el-button>
          <svg-icon icon-class="bofang" @click.native="playb"></svg-icon>
        </el-row>
      </div>
    </div>
    <playBack v-if="!playback"></playBack>
    <!--隐藏显示模块-->
    <div @click="flag=!flag">
      <show-hide class="showHide" :flag="flag"></show-hide>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing,no-undef,space-before-function-paren */

  import selects from '@/components/select/index'
  import search from '@/components/search/index'
  import showHide from '@/components/showHide/index'
  import date from '@/components/DateTimePicker/index'
  import playBack from '@/views/dashboard/level_two/region/playBack.vue'
  import {list} from '@/utils/list.js'

  export default {
    components: {
      showHide, search, selects, date, playBack
    },
    data() {
      return {
        flag: false,
        grids: false,
        options: [{
          value: '0',
          label: '船舶信息',
          icon: 'xinxi',
          path: '/dashboard/shipInformation'
        }, {
          value: '1',
          label: '船舶轨迹'
        }, {
          value: '2',
          label: '区域轨迹',
          path: '/dashboard/region'
        }, {
          value: '3',
          label: '重点水域'
        }, {
          value: '4',
          label: '航道分析'
        }, {
          value: '5',
          label: '通航要素',
          icon: 'yaosu',
          path: '/dashboard/essential'
        }],
        value: '1',
        dataList: [],
        val: null,
        list: [],
        name: null,
        playback: true
      }
    },
    created() {
      this.getQuery()
      this.getList()
    },
    mounted() {
      this.open()
    },
    methods: {
      getQuery() {
        this.value = this.$route.query.index
      },
      open() {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/areatrack/trackMap.html', 'width=1366,height=686,top=0px,left=0px')
        }, 0)
      },
      getList() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'ship') {
            _this.dataList = JSON.parse(e.data.msg.name)
          }
        }, false)
      },
      searchs(val) {
        this.list = JSON.parse(JSON.stringify(this.dataList))
        if (val.length === 0) {
          return
        } else {
          this.val = val.split(' ')
          this.bianli()
        }
      },
      dingwei(string, name) {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.locateTo(string, name)
        }, 0)
      },
      bianli() {
        var num = []
        this.list.forEach((item, index) => {
          if (item.shipName.indexOf(this.val[0]) !== -1) {
            num.push(item)
          }
        })
        this.list = num
        this.val.shift()
        if (this.val.length > 0) {
          this.bianli()
        }
      },
      playb() {
        this.playback = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .region {
    .div {
      margin-top: 10px;
      .collapse {
        margin-top: 10px;
      }
    }
    .search {
      display: flex;
      .sea {
        flex: 1;
      }
    }
    .showHide {
      margin-top: 10px;
    }
    .list {
      margin-top: 10px;
      background: #fff;
      padding: 10px 20px;
      p {
        color: #ccc;
        padding: 10px 0;
      }
      .el-row {
        display: flex;
      }
      .svg-icon {
        margin-left: 20px;
        font-size: 36px;
        cursor: pointer;
      }
    }
  }
</style>
