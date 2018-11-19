<template>
  <div class="details">
    <slot></slot>
    <div class="main">
        <div class="top">
          <div class="title">
            <span class="h3">{{item.name}}</span>
            <span style="font-size: 20px; color: #fff; margin-right: 20px;">{{item.type===1?'未设置':item.type===2?'布防':'布控'}}</span>
            <el-button size="mini" @click="Qjlist(item.id)">查看详情</el-button>
          </div>
          <div class="con">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <span>创建人:</span><span>{{item.userName}}（{{item.departmentName}}）</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple"><span>备注:</span><span>{{item.description}}</span></div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="bodys">
          <p>布控开始时间: {{item.warnStartTime}}</p>
          <p>布控结束时间 : {{item.warnEndTime}}</p>
          <p>布控提醒部门名称: {{item.warnDepartmentName}}</p>
          <p>布控提醒用户名称 : {{item.warnUserName}}</p>
          <p>监管规则核查</p>
          <hr>
          <div class="table">
            <el-table
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="processItemBean.name"
                :show-overflow-tooltip="flag"
                label="规则名称">
              </el-table-column>
              <el-table-column
                prop="direction"
                width="80"
                label="航向">
                <template slot-scope="scope">
                  {{scope.row.direction===1?'上行':scope.row.direction===2?'下行':'全部'}}
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="flag"
                label="执行时间">
                <template slot-scope="scope">
                  {{scope.row.startTime}}--{{scope.row.endTime}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <hr>
          <p>核查统计</p>
          <xqChart :obj="chartData" v-if="chartData"></xqChart>
        </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing */

  import {gzList} from '@/api/Rsupervise.js'
  import {chart} from '@/api/xqing.js'
  import xqChart from '@/components/Charts/xqChart.vue'

  export default {
    name: 'xqing',
    props: ['xqing'],
    components: {
      xqChart
    },
    data() {
      return {
        item: this.xqing,
        tableData: null,
        flag: true,
        chartData: null
      }
    },
    created() {
      this.getList()
      this.getChart()
    },
    watch: {
      xqing() {
        this.item = this.xqing
        this.getList()
        this.chartData = null
        this.getChart()
      }
    },
    methods: {
      getList() {
        this.tableData = null
        gzList(this.item.id).then(response => {
          this.tableData = response.data
        })
      },
      getChart() {
        chart(this.item.id).then(response => {
          this.chartData = response.data
        })
      },
      Qjlist(id) {
        this.$router.push({
          name: 'quyuList',
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
    width: 390px;
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
        p {
          padding: 0 15px;
          line-height: 30px;
          height: 30px;
          border-bottom: 1px solid #ccc;
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
