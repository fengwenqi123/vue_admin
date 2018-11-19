<template>
  <div class="monitor">
    <div class="search">
      <selects :options="options2" :value="value2.toString()"></selects>
      <search class="sea" @searchs="searchs"></search>
    </div>
    <div class="index" v-if="details">
      <div class="div" v-if="!flag">
        <bar></bar>
        <ul class="clearfix ul_big">
          <el-scrollbar class="scrolls">
            <li v-for="(item,index) in dataList" :key="index">
              <div class="modal">
                <div class="left">
                  <p @click="gis('shipin',item.name)">{{item.name}}</p>
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
                  <svg-icon icon-class="xiangqing" @click.native="xiangqing(index)"></svg-icon>
                  <svg-icon :icon-class="icon" @click.native="video(item.name,item.rtmp)"></svg-icon>
                </div>
              </div>
            </li>
          </el-scrollbar>
        </ul>
        <p>
          <pagination @ievent="ievent" v-if="page.total" :pages="page"></pagination>
        </p>
      </div>
      <!--隐藏显示模块-->
      <div @click="flag=!flag">
        <show-hide class="showHide" :flag="flag"></show-hide>
      </div>
    </div>
    <div class="index" v-if="!details">
      <det v-if="!flag" @back="back" :objitem="objitem"></det>
      <div @click="flag=!flag">
        <show-hide class="showHide" :flag="flag"></show-hide>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-undef,space-before-function-paren */

  import bar from '@/components/bar/index'
  import selects from '@/components/select/index'
  import search from '@/components/search/index'
  import showHide from '@/components/showHide/index'
  import {lists} from '@/api/Monitor.js'
  import pagination from '@/components/pagination/index'
  import det from '@/views/dashboard/level_two/essential/Monitor/details'
  import {list} from '@/utils/list.js'

  export default {
    name: 'monitor',
    components: {
      showHide, search, selects, bar, pagination, det
    },
    data() {
      return {
        details: true,
        show: false,
        dataList: [],
        order: '',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: null
        },
        sort: '',
        keyword: '',
        flag: false,
        grids: false,
        value: '5',
        options2: list(),
        value2: '',
        icon: '',
        rtmps: '123131312312',
        name: ''
      }
    },
    created() {
      this.getQuery()
      this.getList()
    },
    mounted() {
    },
    methods: {
      searchs(data) {
        this.keyword = data
        this.page.pageNum = 1
        this.getList()
      },
      getQuery() {
        this.value2 = this.$route.query.index
        this.icon = this.$route.query.icon
      },
      getList() {
        lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword).then(response => {
          this.dataList = response.data.dataList
          this.page = response.data.page
        })
      },
      ievent(num) {
        this.page.pageNum = num
        this.getList()
      },
      gis(type, name) {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.locateTo(type, name)
        }, 0)
      },
      video(name, rtmp) {
        window.postMessage({
          act: 'rtmp',
          msg: {
            name: name,
            rtmp: rtmp
          }
        }, '*')
      },
      hide() {
        this.show = false
        this.$refs.rtmp.getUser1()
      },
      back(flag) {
        this.details = flag
      },
      xiangqing(index) {
        this.index = index
        this.dataList.forEach((item, index) => {
          if (this.index === index) {
            this.objitem = item
          }
        })
        this.details = false
      },
      deletes(id) {
      }
    }
  }
</script>

<style scoped lang="scss">
  .monitor {
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
        padding: 0px;
        height: 500px;
        li {
          width: 100%;
          float: left;
          list-style-type: none;
          border-bottom: 1px solid #e6e6e6;
          padding-bottom: 10px;
          padding: 0 20px;
          .modal {
            display: flex;
            .left {
              width: 280px;
              flex: 4;
              p {
                cursor: pointer;
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
              flex: 1;
              height: 100px;
              display: flex;
              justify-content: center;
              align-items: center;
              .svg-icon {
                flex: 1;
                font-size: 28px;
                color: #666;
                cursor: pointer;
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
