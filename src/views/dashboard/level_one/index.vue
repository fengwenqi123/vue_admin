<template>
  <div class="levelOne">
    <div class="search">
      <selects :options="options2" :value="value2.toString()"></selects>
      <search @show="show" @searchs="searchs" @hide="hide"></search>
    </div>
    <el-collapse-transition>
    <div class="div" v-if="!flag">
      <div class="list" v-if="list.length>0">
        <ul>
          <el-scrollbar class="scrolls">
            <li v-for="(item,index) in list" :key="index">
              <p><span>{{item.shipName}}</span>
                <span @click="dingwei('mixedship',item.shipName)"><svg-icon icon-class="dingwei"></svg-icon></span>
              </p>
            </li>
          </el-scrollbar>
        </ul>
      </div>
      <!--列表-->
      <collapse v-if="alarm&&grids" class="collapse" :alarm="alarm"></collapse>
    </div>
    </el-collapse-transition>
    <!--隐藏显示模块-->
    <div @click="flag=!flag">
      <show-hide class="showHide" :flag="flag"></show-hide>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,space-before-function-paren,no-undef */

  import search from '@/components/search/index'
  import selects from '@/components/select/index'
  import collapse from '@/components/Collapse/index'
  import grid from '@/components/grid/index'
  import showHide from '@/components/showHide/index'
  import {lists} from '@/api/levelOne.js'
  import {list} from '@/utils/list.js'

  export default {
    components: {
      collapse, grid, showHide, search, selects
    },
    data() {
      return {
        flag: false,
        grids: false,
        keyword: null,
        alarm: [],
        list: [],
        dataList: [],
        options2: list(),
        value2: '0',
        shipName: null
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.getQuery()
    },
    methods: {
      getQuery() {
        this.shipName = this.$route.query.name
        if (this.shipName) {
          setTimeout(() => {
            this.dingwei('mixedship', this.shipName)
          }, 2200)
        }
      },
      getList() {
        lists(this.keyword).then(response => {
          this.alarm = response.data
        })
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'ship') {
            _this.dataList = JSON.parse(e.data.msg.name)
          }
        }, false)
      },
      show(type) {
        this.grids = type
      },
      searchs(val) {
        this.list = JSON.parse(JSON.stringify(this.dataList))
        if (val.length === 0) {
          return
        } else {
          this.val = val.split(' ')
          this.bianli()
        }
        this.grids = false
      },
      hide(active) {
        this.grids = active
        this.list = []
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
      dingwei(string, name) {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.locateTo(string, name)
        }, 0)
      }
    }
  }
</script>

<style scoped lang="scss">
  .levelOne {
    .search {
      display: flex;
      .sea {
        flex: 1;
      }
    }
    .div {
      margin-top: 10px;
      .collapse {
        margin-top: 10px;
      }
    }
    .list {
      margin-top: 10px;
      background: #fff;
      padding: 10px 20px;
      ul {
        height: 200px;
        li {
          padding: 10px 0;
          border-bottom: 1px solid #EAEAEA;
          p {
            display: flex;
            span {
              flex: 1;
              .svg-icon {
                cursor: pointer;
                font-size: 20px;
              }
            }
            span:nth-child(1) {
              flex: 4;
            }
          }
        }
      }
    }
  }
</style>
