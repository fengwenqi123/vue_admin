<template>
  <div class="shipInformation">
    <div class="search">
      <selects :options="options2" :value="value2.toString()"></selects>
      <search class="sea" @searchs="searchs"></search>
    </div>
    <!--列表-->
    <div class="list" v-if="!flag&&list.length>0">
      <ul v-if="">
        <el-scrollbar class="scrolls">
          <li v-for="(item,index) in list" :key="index">
            <p><span>{{item.shipName}}</span>
              <span @click="dingwei('mixedship',item.shipName)"><svg-icon icon-class="dingwei"></svg-icon></span>
            </p>
          </li>
        </el-scrollbar>
      </ul>
    </div>
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
  import {list} from '@/utils/list.js'

  export default {
    name: 'shipInformation',
    components: {
      showHide, search, selects
    },
    data() {
      return {
        flag: false,
        grids: false,
        value: '1',
        dataList: [],
        val: null,
        list: [],
        name: null,
        options2: list(),
        value2: '',
        index: null,
        objitem: {}
      }
    },
    created() {
      this.getQuery()
      this.getList()
    },
    methods: {
      getQuery() {
        this.value2 = this.$route.query.index
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .shipInformation {
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
      ul {
        height: 500px;
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
