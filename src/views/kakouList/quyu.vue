<template>
  <div class="history">
    <div class="top clearfix">
      <div class="less">
        <el-card class="box-card" shadow="hover">
          <div class="text">
            <div class="span">
              <span>所属区域：</span>
              <el-select v-model="sectionId" placeholder="请选择" clearable  :size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="span">
              <span>核查状态：</span>
              <el-select v-model="alarmLevel" placeholder="请选择" clearable  :size="mini">
                <el-option
                  v-for="item in options_gj"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="span">
              <span>进入时间：</span>
              <el-date-picker
                v-model="time_in"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :size="mini"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </div>
            <div class="span">
              <span class="font">船舶名称：</span>
              <el-input
                size="mini"
                placeholder="请输入内容"
                v-model="shipName">
              </el-input>
            </div>
            <div class="span">
              <el-button type="primary" :size="mini" @click="searchs" icon="el-icon-search">搜索</el-button>
              <el-button type="info" @click="reset" :size="mini" icon="el-icon-refresh">重置</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="table">
      <el-card class="box-card">
        <div class="text item">
          <el-table
            :data="tableData"
            stripe
            :border="border"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              prop="Id"
              label="序号"
              type="index"
              width="80">
            </el-table-column>
            <el-table-column
              label="船名">
              <template slot-scope="scope">
                <p @click="rowclick(scope.row)" style="cursor: pointer">{{scope.row.name}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="mmsi"
              width="100"
              label="MMSI">
            </el-table-column>
            <el-table-column
              width="100"
              label="船舶类型">
              <template slot-scope="scope">
                <p>{{scope.row.shipType==='1'?'客船':scope.row.shipType==='2'?'货船':scope.row.shipType==='3'?'危险品船':'其他'}}</p>
              </template>
            </el-table-column>
            <el-table-column
              width="50"
              label="航向">
              <template slot-scope="scope">
                {{scope.row.direction===1?'上行':'下行'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="startTimeStr"
              label="通过时间">
            </el-table-column>
            <el-table-column
              width="80"
              label="航速">
              <template slot-scope="scope">
                {{(scope.row.speed*1.852).toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="核查结果">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.status===2 ? '通过' : '不通过' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="核查不通过内容">
              <template slot-scope="scope">
                <div v-if="scope.row.status!==2" slot="reference" class="name-wrapper">
                  {{scope.row.errorcor.join(',')}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        :current-page.sync="page.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {lists} from '@/api/Rsupervise.js'
  import {kakouLists} from '@/api/kakouList.js'

  export default {
    name: 'kakouList',
    data() {
      return {
        sectionId: '',
        order: '',
        sort: '',
        alarmLevel: '',
        options: null,
        shipName: '',
        border: true,
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        mini: 'mini',
        tableData: [],
        time_in: '',
        options_gj: [{
          value: '2',
          label: '通过'
        }, {
          value: '3',
          label: '未通过'
        }]
      }
    },
    created() {
      this.getQuery()
      this.getSection()
      this.searchs()
    },
    methods: {
      rowclick(row, event, column) {
        this.link(row.id, row.name)
      },
      getQuery() {
        this.sectionId = this.$route.query.id
      },
      tableRowClassName({row, rowIndex}) {
        if (parseInt(row.status) !== 2) {
          return 'success-row'
        } else {
          // return 'success-row'
        }
        return ''
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.page.pageSize = val
        this.searchs()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page.pageNum = val
        this.searchs()
      },
      getSection() {
        lists().then(response => {
          this.options = JSON.parse(JSON.stringify(response.data.dataList).replace(/id/g, 'value').replace(/name/g, 'label'))
        })
      },
      searchs() {
        kakouLists(this.sectionId, this.alarmLevel, this.time_in[0], this.time_in[1], this.shipName, this.page.pageNum, this.page.pageSize, this.order, this.sort).then(response => {
          this.tableData = response.data.dataList
          this.getData()
          this.page = response.data.page
        })
      },
      reset() {
        this.sectionId = null
        this.time_in = ''
        this.alarmLevel = null
        this.shipName = null
      },
      getData() {
        if (this.tableData.length > 0) {
          this.tableData.forEach((item, index) => {
            item.errorcor = []
            item.shipCheckTaskBeanList.forEach((items, indexs) => {
              item.errorcor.push(items.itemName)
            })
          })
        }
      },
      link(id, name) {
        this.$router.push({
          name: 'quyuDetails',
          query: {
            id: id,
            name: name
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .history {
    padding: 15px;
    .top {
      .less {
        .text {
          display: flex;
          align-items: center; /*垂直居中*/
          justify-content: space-around; /*水平居中*/
        }
      }
      .box-card {
        width: 100%;
        .text {
          .span {
            display: inline-block;
            .font {
              margin-left: 10px;
            }
          }
        }
      }
      .xia {
        float: right;
        display: inline-block;
        width: 80px;
        height: 24px;
        background: #01579b;
        color: #fff;
        text-align: center;
        line-height: 24px;
        .el-icon-d-arrow-right {
          transform: rotate(90deg);
          -ms-transform: rotate(90deg); /* IE 9 */
          -webkit-transform: rotate(90deg); /* Safari and Chrome */
        }
      }
      .more {
        .el-col {
          margin: 10px 0;
        }
      }
    }
    .table {
      margin-top: 15px;
    }
    .block {
      text-align: center;
      margin-top: 20px;
    }
    .cell {
      span {
        cursor: pointer;
      }
    }
  }

</style>
