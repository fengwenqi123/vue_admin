<template>
  <div class="mark">
    <div class="search">
      <selects :options="options" :value="value.toString()"></selects>
      <selects :options="options2" :value="value2.toString()"></selects>
      <search class="sea"></search>
    </div>
    <transition name="bounce">
      <div class="div" v-if="!flag">
        <bar></bar>
        <ul class="clearfix ul_big">
          <li v-for="(item,index) in dataList" :key="index">
            <div class="modal">
              <div class="left">
                <p>{{item.name}}</p>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple"><span>设备类型</span><span>{{item.probeType}}</span></div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple"><span>经度</span><span>{{item.longitude}}</span></div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple"><span>设备地址</span><span>{{item.city}}</span></div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple"><span>维度</span><span>{{item.latitude}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="right">
                <svg-icon icon-class="jk"></svg-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>

    <!--隐藏显示模块-->
    <div @click="flag=!flag">
      <show-hide class="showHide" :flag="flag"></show-hide>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import bar from '@/components/bar/index'
  import selects from '@/components/select/index'
  import search from '@/components/search/index'
  import showHide from '@/components/showHide/index'
  import {list} from '@/utils/list.js'
  // import {lists} from '@/api/Monitor.js'

  export default {
    components: {
      showHide, search, selects, bar
    },
    data() {
      return {
        dataList: [],
        keyword: null,
        flag: false,
        grids: false,
        value: '5',
        options2:list(),
        value2: ''
      }
    },
    created() {
      this.getQuery()
      // this.getList()
    },
    methods: {
      getQuery() {
        this.value2 = this.$route.query.index
      }
      // getList() {
      //   lists(this.keyword).then(response => {
      //     this.dataList = response.data
      //   })
      // }
    }
  }
</script>

<style scoped lang="scss">
  .mark {
    .div {
      background: #fff;
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
    .div {
      .ul_big {
        margin: 0px;
        padding: 0px 24px;
        height: 500px;
        overflow-y: scroll;
        li {
          float: left;
          list-style-type: none;
          border-bottom: 1px solid #e6e6e6;
          padding-bottom: 10px;
          .modal {
            display: flex;
            .left {
              flex: 1;
              p {
                margin: 10px 0;
                font-size: 16px;
                color: #666;
                font-weight: bold;
              }
              .grid-content {
                color: #9B9B9B;
                padding: 2px 0;
              }
            }
            .right {
              display: flex;
              justify-content: center;
              align-items: center;
              .svg-icon {
                flex: 1;
                font-size: 30px;
                color: #666;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
