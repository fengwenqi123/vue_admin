<template>
  <div class="history">
    <div class="top clearfix">
      <div class="less" v-if="flag">
        <el-card class="box-card" shadow="hover">
          <div class="text">
            <div class="span">
              <span>所属截面：</span>
              <el-select v-model="sectionId" placeholder="请选择" :size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="span">
              <span>告警级别：</span>
              <el-select v-model="alarmLevel" placeholder="请选择" :size="mini">
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
              <span class="font">告警状态：</span>
              <el-select v-model="alarmStatus" placeholder="请选择" :size="mini">
                <el-option
                  v-for="item in options_active"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="span">
              <el-button type="primary" :size="mini" @click="searchs" icon="el-icon-search">搜索</el-button>
              <el-button type="info" @click="reset" :size="mini" icon="el-icon-refresh">重置</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="more" v-if="!flag">
        <el-card class="box-card" shadow="hover">
          <el-row :gutter="1">
            <el-col :span="4">
              <div class="span">
                <span>所属截面：</span>
                <el-select v-model="sectionId" placeholder="请选择" :size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
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
            </el-col>
            <el-col :span="4">
              <div class="span">
                <span>告警级别：</span>
                <el-select v-model="alarmLevel" placeholder="请选择" :size="mini">
                  <el-option
                    v-for="item in options_gj"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="span">
                <span>告警状态：</span>
                <el-select v-model="alarmStatus" placeholder="请选择" :size="mini">
                  <el-option
                    v-for="item in options_active"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="span">
                <span>告警时间：</span>
                <el-date-picker
                  v-model="time_gj"
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
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :span="4">
              <div class="span">
                <span>航向：</span>
                <el-select v-model="direction" placeholder="请选择" :size="mini">
                  <el-option
                    v-for="item in options_hx"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="span">
                <span>驶离时间：</span>
                <el-date-picker
                  v-model="time_leave"
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
            </el-col>
            <el-col :span="4">
              <div class="span">
                <span>核查结果：</span>
                <el-select v-model="shipCheckStatus" placeholder="请选择" :size="mini">
                  <el-option
                    v-for="item in options_hc"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="span">
                <span>复合结果：</span>
                <el-select v-model="checkedStatus" placeholder="请选择" :size="mini">
                  <el-option
                    v-for="item in options_fh"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="span">
                <span>处理时间：</span>
                <el-date-picker
                  v-model="time_handle"
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
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :span="4">
              <div class="span">
                <span>核查不通过：</span>
                <el-select v-model="itemId" placeholder="请选择" :size="mini">
                  <el-option
                    v-for="item in options_no"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="span search">
                <span>精确搜索：</span>
                <el-input
                  size="mini"
                  placeholder="请输入关键字"
                  suffix-icon="el-icon-search"
                  v-model="keyWord">
                </el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="span">
                <el-button type="primary" :size="mini" icon="el-icon-search" @click="searchs">搜索</el-button>
                <el-button type="info" @click="reset" :size="mini" icon="el-icon-refresh">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="xia" @click="down"><i class="el-icon-d-arrow-right"></i></div>
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
              prop="name"
              label="船名">
            </el-table-column>
            <el-table-column
              prop="mmsi"
              width="100"
              label="号码">
            </el-table-column>
            <el-table-column
              prop="sectionName"
              label="所属截面">
            </el-table-column>
            <el-table-column
              prop="directionStr"
              width="50"
              label="航向">
            </el-table-column>
            <el-table-column
              prop="startTimeStr"
              label="通过时间">
            </el-table-column>
            <el-table-column
              prop="alarmTimeStr"
              label="告警时间">
            </el-table-column>
            <el-table-column
              prop="handleTime"
              label="告警处理时间">
            </el-table-column>
            <el-table-column
              prop="alarmStatus"
              width="80"
              label="告警状态">
            </el-table-column>
            <el-table-column
              prop="statusStr"
              width="80"
              label="核查结果">
            </el-table-column>
            <el-table-column
              label="核查不通过项">
              <template slot-scope="scope">
                <p v-for="(item,key) in scope.row.shipCheckTaskBeanList" :key="key">
                  <span v-if="item.status!==2">{{item.itemName}}</span>
                </p>
                <!--<el-button-group v-for="(item,key) in scope.row.shipCheckTaskBeanList" :key="key">-->

                <!--</el-button-group>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="reCheckResult"
              label="复核结果">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span @click="details(scope.row.id,scope.row.alarmLevel,scope.row.name)">详情</span>
                <span @click="error(scope.row.id,scope.row.name,scope.row.alarmStatus)"
                      v-if="scope.row.alarmLevel==='3'">| 纠错</span>
                <span @click="Management(scope.row.id,scope.row.alarmLevel,scope.row.name)"
                      v-if="scope.row.alarmStatus==='待处置'">|处置</span>
                <span @click="Handle(scope.row.id,scope.row.alarmLevel,scope.row.name)"
                      v-if="scope.row.alarmStatus==='待处理'">| 处理</span>
                <span @click="review(scope.row.id,scope.row.alarmLevel,scope.row.name)"
                      v-if="scope.row.alarmStatus==='待复核'">| 复核</span>
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

  import {lists} from '@/api/Section.js'
  import {HisLists} from '@/api/History.js'

  export default {
    name: 'History',
    data() {
      return {
        border: true,
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        mini: 'mini',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        time: '',
        search: '',
        flag: true,
        tableData: [],
        currentPage4: 4,
        sectionId: '',
        time_in: '',
        time_leave: '',
        direction: '',
        alarmLevel: '',
        alarmStatus: '',
        time_gj: '',
        shipCheckStatus: '',
        checkedStatus: '',
        time_handle: '',
        itemId: '',
        keyWord: '',
        options_gj: [{
          value: '1',
          label: '黄色'
        }, {
          value: '2',
          label: '橙色'
        }, {
          value: '3',
          label: '红色'
        }],
        options_active: [{
          value: '1',
          label: '待处置'
        }, {
          value: '2',
          label: '待处理'
        }, {
          value: '3',
          label: '待复核'
        }, {
          value: '4',
          label: '已复核'
        }],
        options_hx: [{
          value: '1',
          label: '上行'
        }, {
          value: '2',
          label: '下行'
        }],
        options_hc: [{
          value: '2',
          label: '通过'
        }, {
          value: '3',
          label: '未通过'
        }, {
          value: '4',
          label: '无法核查'
        }],
        options_fh: [{
          value: '1',
          label: '处理完成'
        }, {
          value: '2',
          label: '处理未完成'
        }],
        options_no: [{
          value: '1',
          label: '定位终端'
        }, {
          value: '2',
          label: '重点跟踪'
        }, {
          value: '3',
          label: '国籍证书'
        }, {
          value: '4',
          label: '诚信核查'
        }, {
          value: '5',
          label: '报港确认'
        }, {
          value: '6',
          label: '适航证书核查'
        }],
        startTime: '',
        endTime: '',
        leaveStartTime: '',
        leaveEndTime: '',
        alarmStartTime: '',
        alarmEndTime: '',
        handleStartTime: '',
        handleEndTime: ''
      }
    },
    created() {
      this.getSection()
      this.searchs()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (parseInt(row.alarmLevel) === 1) {
          return 'warning-row'
        } else if (parseInt(row.alarmLevel) === 3) {
          return 'success-row'
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
      down() {
        this.flag = !this.flag
      },
      getSection() {
        lists().then(response => {
          this.options = JSON.parse(JSON.stringify(response.data.dataList).replace(/id/g, 'value').replace(/name/g, 'label'))
        })
      },
      searchs() {
        // if (!this.sectionId) {
        //   this.$message({
        //     message: '请先选择所属截面'
        //   })
        //   return
        // }
        if (this.time_in) {
          this.startTime = this.time_in[0]
          this.endTime = this.time_in[1]
        } else {
          this.startTime = ''
          this.endTime = ''
        }
        if (this.time_gj) {
          this.alarmStartTime = this.time_gj[0]
          this.alarmEndTime = this.time_gj[1]
        } else {
          this.alarmStartTime = ''
          this.alarmEndTime = ''
        }
        if (this.time_leave) {
          this.leaveStartTime = this.time_leave[0]
          this.leaveEndTime = this.time_leave[1]
        } else {
          this.leaveStartTime = ''
          this.leaveEndTime = ''
        }
        if (this.time_handle) {
          this.handleStartTime = this.time_handle[0]
          this.handleEndTime = this.time_handle[1]
        } else {
          this.handleStartTime = ''
          this.handleEndTime = ''
        }
        HisLists(
          this.sectionId,
          this.startTime,
          this.endTime,
          this.leaveStartTime,
          this.leaveEndTime,
          this.direction,
          this.alarmLevel,
          this.alarmStatus,
          this.alarmStartTime,
          this.alarmEndTime,
          this.shipCheckStatus,
          this.checkedStatus,
          this.handleStartTime,
          this.handleEndTime,
          this.itemId,
          this.keyWord,
          this.page.pageNum,
          this.page.pageSize).then(response => {
          this.tableData = response.data.dataList
          this.page = response.data.page
        })
      },
      details(id, alarmLevel, name) {
        if (alarmLevel === '1') {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 3,
              active: 3,
              name: name
            }
          })
        } else if (alarmLevel === '3') {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 3,
              active: 3,
              name: name
            }
          })
        } else if (alarmLevel === '4') {
          this.$router.push({
            name: 'GrennAlarmDisposal',
            params: {
              id: id,
              name: name
            }
          })
        }
      },
      Management(id, alarmLevel, name) {
        if (alarmLevel === '1') {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 0,
              active: 1,
              name: name
            }
          })
        } else if (alarmLevel === '3') {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 0,
              active: 1,
              name: name
            }
          })
        }
      },
      Handle(id, alarmLevel, name) {
        if (alarmLevel === '1') {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 1,
              active: 2,
              name: name
            }
          })
        } else if (alarmLevel === '3') {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 1,
              active: 2,
              name: name
            }
          })
        }
      },
      review(id, alarmLevel, name) {
        if (alarmLevel === '1') {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 2,
              active: 3,
              name: name
            }
          })
        } else if (alarmLevel === '3') {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 2,
              active: 3,
              name: name
            }
          })
        }
      },
      error(id, name, alarmStatus) {
        if (alarmStatus === '待处置') {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 0,
              active: 1,
              name: name,
              error: 1
            }
          })
        } else if (alarmStatus === '待处理') {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 1,
              active: 2,
              name: name,
              error: 1
            }
          })
        } else if (alarmStatus === '待复核') {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 2,
              active: 3,
              name: name,
              error: 1
            }
          })
        }
      },
      reset() {
        this.sectionId = null
        this.time_in = null
        this.alarmLevel = null
        this.alarmStatus = null
        this.time_gj = null
        this.direction = null
        this.time_leave = null
        this.shipCheckStatus = null
        this.checkedStatus = null
        this.time_handle = null
        this.itemId = null
        this.keyWord = null
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
