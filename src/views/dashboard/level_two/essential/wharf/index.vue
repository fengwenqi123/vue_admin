<template>
  <div class="wharf">
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
                  <p @click="xiangqing(item)">{{item.fullName}}</p>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><span>码头类型</span><span>货物装卸</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><span>泊位数</span><span>{{item.berthNum}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><span>最大容量</span><span>12323</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><span>当前停靠</span><span>12323</span></div>
                    </el-col>
                  </el-row>
                </div>
                <div class="right">
                  <svg-icon icon-class="dingwei" @click.native="gis('matou',item.shortName)"></svg-icon>
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
      <dets v-if="xqing" :xqing="xqing">
        <svg-icon icon-class="close" @click.native="closeXq"></svg-icon>
      </dets>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-undef,space-before-function-paren */

  import bar from '@/components/bar/index'
  import selects from '@/components/select/index'
  import search from '@/components/search/index'
  import showHide from '@/components/showHide/index'
  import {lists} from '@/api/wharf.js'
  import pagination from '@/components/pagination/index'
  import dets from '@/views/dashboard/level_two/essential/wharf/xqing.vue'
  import {list} from '@/utils/list.js'

  export default {
    components: {
      showHide, search, selects, bar, pagination, dets
    },
    data() {
      return {
        details: true,
        order: '',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: null
        },
        sort: '',
        keyword: '',
        dataList: [],
        flag: false,
        grids: false,
        value: '5',
        options2: list(),
        value2: '',
        index: null,
        objitem: {},
        xqing: null
      }
    },
    created() {
      this.getQuery()
      this.getList()
      // this.sayhello1()
    },
    mounted() {
      this.sayhello()
      this.getRtmp()
    },

    methods: {
      getRtmp() {
        window.addEventListener('message', function (e) {
          if (e.data.act === 'rtmp1') {
            console.log(e.data.msg.name)
          }
        }, false)
      },
      searchs(data) {
        this.keyword = data
        this.page.pageNum = 1
        this.getList()
      },
      sayhello() {
        window.addEventListener('message', function (e) {
          if (e.data.act === 'response') {
            console.log(e)
            alert(e.data.msg)
          }
        }, false)
      },
      getQuery() {
        this.value2 = this.$route.query.index
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
      back(flag) {
        this.details = flag
      },
      xiangqing(item) {
        // this.xqing = item
        window.postMessage({
          act: 'matouName',
          msg: {
            name: item.name,
            id: item.id
          }
        }, '*')
      },
      gis(type, name) {
        $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.locateTo(type, name)
      },
      closeXq() {
        this.xqing = null
      }
    }
  }
</script>

<style scoped lang="scss">
  .wharf {
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
          float: left;
          width: 378px;
          list-style-type: none;
          border-bottom: 1px solid #e6e6e6;
          padding-bottom: 10px;
          padding: 0 20px;
          .modal {
            display: flex;
            .left {
              width: 370px;
              flex: 1;
              p {
                margin: 10px 0;
                font-size: 16px;
                color: #666;
                cursor: pointer;
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
                font-size: 22px;
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
