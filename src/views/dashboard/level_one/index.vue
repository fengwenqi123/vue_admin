<template>
  <div class="levelOne">
    <div class="search">
      <selects :options="options2" :value="value2.toString()"></selects>
      <search @show="show" @searchs="searchs" @hide="hide"></search>
    </div>
    <el-collapse-transition>
      <div class="div" v-if="!flag">
        <div class="list" v-if="factorData">
          <ul>
            <el-scrollbar class="scrolls">
              <li v-for="(item,index) in factorData" :key="index">
                <p>
                  <span><svg-icon :icon-class="item.icon"></svg-icon></span>
                  <span>{{item.name}}</span>
                  <span v-if="item.type==='a'" @click="dingwei('aisship',item.name)"><svg-icon icon-class="dingwei"></svg-icon></span>
                  <span v-if="item.type==='b'" @click="dingwei('support',item.name)"><svg-icon icon-class="dingwei"></svg-icon></span>
                  <span v-if="item.type==='c'" @click="dingwei('matou',item.name)"><svg-icon icon-class="dingwei"></svg-icon></span>
                  <span v-if="item.type==='d'" @click="dingwei('hszs',item.name)"><svg-icon icon-class="dingwei"></svg-icon></span>
                  <span v-if="item.type==='e'" @click="dingwei('vhfBase',item.name)"><svg-icon icon-class="dingwei"></svg-icon></span>
                  <span v-if="item.type==='f'" @click="dingwei('shipin',item.name)"><svg-icon icon-class="dingwei"></svg-icon></span>
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
  import {lists, searchys} from '@/api/levelOne.js'
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
        shipName: null,
        page: {
          pageNum: 1,
          pageSize: 10,
          total: null
        },
        order: null,
        sort: null,
        type: null,
        name: null,
        latitude: null,
        longitude: null,
        factorData: null
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
        this.name = val
        searchys(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.type, this.name, this.latitude, this.longitude).then(response => {
          this.factorData = response.data.dataList
          this.factorData.forEach((item, index) => {
            switch (item.type) {
              case 'a':
                item.icon = 'baseStation'
                break
              case 'b':
                item.icon = 'wuzi'
                break
              case 'c':
                item.icon = 'matou'
                break
              case 'd':
                item.icon = 'haishi'
                break
              case 'e':
                item.icon = 'baseStation'
                break
              case 'f':
                item.icon = 'jk'
                break
            }
          })
        })
      },
      hide(active) {
        this.grids = active
        this.list = []
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
            span:nth-child(2) {
              flex: 4;
            }
          }
        }
      }
    }
  }
</style>
