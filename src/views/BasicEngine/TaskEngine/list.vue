<template>
  <div class="UserManagement">
    <titles></titles>
    <el-card class="main">
      <div v-if="show" class="demo-input-suffix clearfix">
        <span>关键字：</span>
        <el-input
          placeholder="请输入关键字"
          v-model="keyword"
          clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
        <div class="add">
          <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="del">删除</el-button>
        </div>
      </div>
      <div class="list" v-if="show">
        <div class="table">
          <el-table
            :data="tableData"
            :border="border"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="Id"
              label="序号"
              type="index"
              width="80">
              <template slot-scope="scope">
                <span>{{scope.$index+(page.pageNum - 1) * page.pageSize+1}} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="任务类型"
              prop="taskTypeId">
            </el-table-column>
            <el-table-column
              prop="taskTypeName"
              label="任务名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="weight"
              sortable
              label="严重等级"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="priority"
              sortable
              label="优先等级">
            </el-table-column>
            <el-table-column
              prop="createDepartmentName"
              label="发起部门"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="mobile"
              sortable
              label="发起时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="manageDepartmentName"
              label="管理部门">
            </el-table-column>
            <el-table-column
              prop="executePersonnelName"
              label="执行人">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <div>
                  {{scope.row.status===1?'待确认':scope.row.status===2?'待处理':scope.row.status===3?'处理中':scope.row.status===4?'已处理':scope.row.status===5?'已拒绝':'已撤销'}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width='240'
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="modify(scope.row)">查看
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="control(scope.row.id, scope.row.type)">确认
                </el-button>
                <el-button
                  size="mini"
                  type=""
                  @click="watch(scope.row.id)">撤销
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fenye">
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
      <!--<add-user v-if="!show" @ievent="ievent" :mul="mul" :disabled="disabled"></add-user>-->
    </el-card>
    <dias :dia="dia" @idialog="idialog"></dias>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import titles from '@/components/title'
  import {lists} from '@/api/taskEngine.js'
  import dias from './dialog.vue'
  // import addUser from '@/views/UserManagement/addUser'

  export default {
    data() {
      return {
        border: true,
        order: '',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        keyword: '',
        taskTypeId: '',
        dia: false,
        startTime: '',
        endTime: '',
        show: true,
        tableData: []
      }
    },
    components: {
      titles, dias
      // addUser
    },
    created() {
      this.list()
    },
    methods: {
      // table表格操作
      openDetails(row) {
        this.$confirm(`<div>
      <p><span class="font">编号:</span><span>${row.code}</span></p>
      <p><span class="font">登录名:</span><span>${row.loginName}</span></p>
      <p><span class="font">姓名:</span><span>${row.name}</span></p>
      <p><span class="font">性别:</span><span>${row.gender === 1 ? '男' : '女'}</span></p>
      <p><span class="font">生日:</span><span>${row.birthday}</span></p>
      <p><span class="font">手机:</span><span>${row.mobile}</span></p>
      <p><span class="font">状态:</span><span>${row.status === 1 ? '启用' : '禁用'}</span></p>
      <p><span class="font">更新时间:</span><span>${row.modifyTimeString}</span></p>
  </div>`, '查看', {dangerouslyUseHTMLString: true, showCancelButton: false})
      },
      handleSelectionChange(val) {
        this.mul_0 = val
        console.log(val)
      },
      // table设置颜色
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.page.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page.pageNum = val
        this.list()
      },
      list() {
        lists(this.keyword, this.taskTypeId, this.startTime, this.endTime, this.page.pageNum, this.page.pageSize).then(response => {
          this.tableData = response.data.dataList
          this.page = response.data.page
        })
      },
      query() {
        this.page.pageNum = 1
        this.list()
      },
      reset() {
        this.keyword = ''
        this.page.pageNum = 1
        this.list()
      },
      add() {
        this.dia = true
      },
      idialog() {
        this.dia = false
      },
      modify() {
        if (this.mul_0.length > 1) {
          this.$message({
            message: '只能选择一个'
          })
          return
        }
        if (this.mul_0.length === 0) {
          this.$message({
            message: '请先选择'
          })
          return
        } else {
          this.mul = this.mul_0[0]
          this.show = false
          this.disabled = true
        }
      },
      del() {

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .UserManagement {
    padding: 15px;
    .title {
      /*margin: 10px;*/
    }
    .main {
      margin-top: 20px;
      .el-input {
        width: auto;
      }
      .add {
        float: right;
      }
      .list {
        .table {
          margin-top: 15px;
        }
        .fenye {
          text-align: center;
          margin-top: 20px;
        }

      }
      .addAccount {
        .demo-input-suffix {
          margin-top: 10px;
          span {
            display: inline-block;
            width: 120px;
          }
          .el-input__inner {
            width: 230px;
          }
          .el-textarea {
            width: 423px;
          }
        }
        .el-row {
          text-align: center;
          margin-top: 20px;
        }
      }

    }
    .active {
      color: #00CD66;
    }
    .nei {
      cursor: pointer;
    }
  }
</style>
