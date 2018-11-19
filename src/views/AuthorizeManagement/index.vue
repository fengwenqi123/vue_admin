<template>
  <div class="AuthorizeManagement">
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
          <el-button type="warning" icon="el-icon-edit-outline" size="small" @click="modify">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="del">删除</el-button>
          <el-button type="success" icon="el-icon-circle-check-outline" size="small" @click="Enable"> 启用</el-button>
          <el-button type="warning" icon="el-icon-circle-close-outline" size="small" @click="Disable">禁用</el-button>
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
              width="80">
              <template slot-scope="scope">
                <span>{{scope.$index+(page.pageNum - 1) * page.pageSize+1}} </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              width="400"
              label="权限名称">
              <template slot-scope="scope">
                <div class="nei" v-if="scope.row.layer.length===3" @click="openDetails(scope.row)"
                     v-text="scope.row.name">
                </div>
                <div class="nei" v-if="scope.row.layer.length===6" @click="openDetails(scope.row)"
                     v-text="'　 '+scope.row.name">
                </div>
                <div class="nei" v-if="scope.row.layer.length===9" @click="openDetails(scope.row)"
                     v-text="'　　  '+scope.row.name">
                </div>
              </template>
              <!--<template slot-scope="scope">-->
                <!--<div class="nei" @click="openDetails(scope.row)">{{scope.row.name}}</div>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column
              prop="sort"
              width="120"
              label="排序">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="120">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" v-bind:class="{ active_gender: scope.row.status =='1' }">
                  {{ scope.row.status
                  =='1' ?
                  '启用' :
                  '禁用' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="modifyTimeString"
              label="更新时间"
              width="180">
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
      <add-authorize v-if="!show" @ievent="ievent" :mul="mul" :disabled="disabled"></add-authorize>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import titles from '@/components/title'
  import {lists, delt, enable, disable} from '@/api/AuthorizeManagement'
  import addAuthorize from '@/views/AuthorizeManagement/addAuthorize'
  // import {getToken} from '@/utils/auth' // 验权

  export default {
    data() {
      return {
        border: true,
        order: 'layer',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        sort: '',
        status: 0,
        keyword: '',
        show: true,
        tableData: [],
        currentPage: 4,
        mul_0: '',
        mul: '',
        disabled: false
      }
    },
    components: {
      titles,
      addAuthorize
    },
    created() {
      this.list()
    },
    methods: {
      // table表格操作
      openDetails(row) {
        this.$confirm(`<div>
      <p><span class="font">权限名称:</span><span>${row.name}</span></p>
      <p><span class="font">排序:</span><span>${row.sort}</span></p>
      <p><span class="font">更新时间:</span><span>${row.modifyTimeString}</span></p>
      <p><span class="font">状态:</span><span>${row.status === 1 ? '启用' : '禁用'}</span></p>
      <p><span class="font">备注:</span><span>${row.description}</span></p>
  </div>`, '查看', {dangerouslyUseHTMLString: true, showCancelButton: false})
      },
      handleSelectionChange(val) {
        this.mul_0 = val
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
        lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.status, this.keyword).then(response => {
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
        this.mul_0 = ''
        this.mul = ''
        this.show = false
      },
      ievent(data) {
        this.show = data
        this.list()
        this.mul_0 = ''
        this.mul = ''
        this.disabled = false
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
        if (this.mul_0.length === 0) {
          this.$message({
            message: '请先选择'
          })
          return
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = []
          this.mul_0.forEach((item, index) => {
            num.push(item.id)
          })
          delt(num).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.list()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      Enable() {
        if (this.mul_0.length === 0) {
          this.$message({
            message: '请先选择'
          })
          return
        }
        this.$confirm('此操作即将启动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = []
          this.mul_0.forEach((item, index) => {
            num.push(item.id)
          })
          enable(num).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.list()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      Disable() {
        if (this.mul_0.length === 0) {
          this.$message({
            message: '请先选择'
          })
          return
        }
        this.$confirm('此操作即将启动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = []
          this.mul_0.forEach((item, index) => {
            num.push(item.id)
          })
          disable(num).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.list()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .AuthorizeManagement {
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
    .active_gender {
      color: #00CD66;
    }
    .nei {
      cursor: pointer;
      text-align: left;
      text-indent: 150px;
    }
  }
</style>
