<template>
  <div class="monitor">
    <div class="search">
      <selects :options="options2" :value="value2.toString()"></selects>
      <search class="sea" @searchs="searchs"></search>
    </div>
    <div class="index" v-if="details">
      <div class="div" v-if="!flag">
        <ul class="clearfix ul_big">
          <el-scrollbar class="scrolls">
            <li v-for="(item,index) in dataList" :key="index">
              <div class="modal">
                <div class="left">
                  <!--<p @click="xiangqing(item)"><span-->
                  <!--v-bind:class="[item.type===1?'span1':item.type===2?'bf':'bk']"-->
                  <!--&gt;{{item.type===1?'未设置':item.type===2?'布防':'布控'}}</span>{{item.name}}</p>-->
                  <p @click="xiangqing(item)">{{item.name}}</p>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><span>用户名称:</span><span>{{item.userName}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><span>所属单位:</span><span>{{item.city}}</span></div>
                    </el-col>
                  </el-row>
                </div>
                <div class="right">
                  <svg-icon icon-class="dingwei" @click.native="gis('kakou',item.name)"></svg-icon>
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
    <xqing v-if="xqing" :xqing="xqing">
      <svg-icon icon-class="close" @click.native="closeXq"></svg-icon>
    </xqing>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-undef,space-before-function-paren,no-dupe-keys */

  import selects from '@/components/select/index'
  import search from '@/components/search/index'
  import showHide from '@/components/showHide/index'
  import {lists} from '@/api/SectionManagement.js'
  import pagination from '@/components/pagination/index'
  import xqing from '@/views/dashboard/level_two/kakou/xqing'
  import {list} from '@/utils/list.js'

  export default {
    components: {
      showHide, search, selects, pagination, xqing
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
        name: '',
        xqing: null
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
        lists(this.page.pageNum, this.page.pageSize, this.keyword).then(response => {
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
      xiangqing(item) {
        // console.log(item)
        // this.xqing = item
        window.postMessage({
          act: 'kakou',
          msg: {
            name: item.name,
            id: item.id
          }
        }, '*')
      },
      closeXq() {
        this.xqing = null
      },
      gis(type, name) {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.locateTo(type, name)
          // $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.consoleTest('1', '2')
        }, 0)
      }
    }
  }
</script>

<style scoped lang="scss">
  .monitor {
    .span1 {
      color: #000;
      padding: 2px;
      border: 1px solid #000;
      margin-right: 8px;
    }
    .bf {
      color: #9BCD9B;
      padding: 2px;
      border: 1px solid #9BCD9B;
      margin-right: 8px;
    }
    .bk {
      color: #63B8FF;
      padding: 2px;
      border: 1px solid #63B8FF;
      margin-right: 8px;
    }
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
                span {
                  margin: 8px 0;
                }
              }
              .el-row{
                margin-top: 20px;
              }
            }
            .right {
              flex: 1;
              height: 86px;
              display: flex;
              justify-content: center;
              align-items: center;
              .svg-icon {
                flex: 1;
                font-size: 22px;
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
