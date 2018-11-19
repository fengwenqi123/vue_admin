<template>
  <div class="details">
    <slot></slot>
    <div class="main">
      <div class="top">
        <div class="title">
          <span class="h3">{{item.name}}</span>
          <!--<span style="font-size: 20px; color: #fff; margin-right: 20px;">{{item.type===1?'未设置':item.type===2?'布防':'布控'}}</span>-->
          <el-button size="mini" @click="Qjlist(item.id)">查看详情</el-button>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>用户名称</span><span>{{item.userName}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>经度</span><span>{{item.latitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>纬度</span><span>{{item.longitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>备注</span><span>{{item.description}}</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="bodys">
        <p>备注</p>
        <hr>
        <div class="beizhu">
          {{item.description}}
        </div>
        <hr>
        <p>核查统计</p>
        <udChart :obj="chartData" v-if="chartData"></udChart>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing */

  import {statShipCheck} from '@/api/kakouList.js'
  import {chart} from '@/api/xqing.js'
  // import {lists} from '@/api/SectionManagement'
  import udChart from '@/components/Charts/upDownChart.vue'

  export default {
    name: 'xqing',
    props: ['xqing'],
    components: {
      udChart
    },
    data() {
      return {
        item: this.xqing,
        tableData: null,
        flag: true,
        chartData: null,
        type: 1
      }
    },
    created() {
      // this.getList()
      this.getChart()
    },
    watch: {
      xqing() {
        this.item = this.xqing
        // this.getList()
        this.chartData = null
        this.getChart()
      }
    },
    methods: {
      getChart() {
        statShipCheck(this.type, this.item.code).then(response => {
          this.chartData = response.data
        })
      },
      Qjlist(id) {
        this.$router.push({
          name: 'kakouList',
          query: {
            id: id
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .details {
    width: 370px;
    .svg-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
    position: fixed;
    bottom: 56px;
    right: 20px;
    margin-top: 10px;
    .main {
      background: #fff;
      .bodys {
        .beizhu, p {
          padding: 0 15px;
          line-height: 20px;
          height: 20px;
        }
      }
      .top {
        padding: 14px 10px;
        background: #01579B;
        .title {
          display: flex;
          align-items: center;
          .h3 {
            display: inline-block;
            font-size: 24px;
            padding: 0px;
            color: #fff;
            margin: 0px 10px 0px 0px;
          }
          .back {
            display: inline-block;
            width: 56px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            color: #01579B;
            background: #fff;
            margin-left: 10px;
            font-size: 10px;
            cursor: pointer;
          }
        }
        .con {
          margin-top: 20px;
          .grid-content {
            span {
              display: inline-block;
              font-size: 14px;
              margin: 3px 0;
              color: #fff;
            }
            span:nth-child(2) {
              margin-left: 6px;
            }
          }
        }
      }
      .lab {
        .tit {
          padding-left: 20px;
          color: #9B9B9B;
          font-size: 15px;
        }
        ul {
          height: 400px;
          li {
            border-bottom: 1px solid #EAEAEA;
            margin: 10px 5px;
            padding: 10px 0;
            .el-col {
              .grid-content {
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }

</style>
