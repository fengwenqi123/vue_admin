<template>
  <div class="Anchorage">
    <titles></titles>
    <el-card class="main">
      <div>
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
          </div>
          <el-row>

          </el-row>
        </div>
        <div class="list" v-if="show">
          <div class="table">
            <el-table
              :data="tableData"
              @selection-change="handleSelectionChange"
              @select="selects"
              :border="border"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="Id"
                label="序号"
                sortable
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                sortable
                label="中文名称">
                <template slot-scope="scope">
                  <div class="nei" @click="openDetails(scope.row)">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="enName"
                sortable
                label="英文名称">
              </el-table-column>
              <el-table-column
                prop="agency"
                label="	所属海事机构"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="purpose"
                label="用途"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="property"
                label="性质 "
                sortable
                width="180">
              </el-table-column><el-table-column
                prop="port"
                label="港内或港外"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="openFlag"
                label="是否开放"
                sortable
                width="180">
              </el-table-column><el-table-column
                prop="deptName"
                label="主管单位 "
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="telphone"
                label="联系电话"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="cctv"
                label="CCTV信号覆盖情况"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="vts"
                label="VTS信号覆盖情况"
                sortable
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
        <add-anchorage v-if="flag===1" @ievent="ievent" :mul="mul" :disabled="disabled"></add-anchorage>
        <!-- <mod-section v-if="flag===2" @ievent="ievent" :mul="mul" :disabled="disabled"></mod-section> -->
      </div>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import titles from '@/components/title'
  import {lists, deltSection} from '@/api/Anchorage'
  import addAnchorage from '@/views/NavigationManagement/addAnchorage'
  import modSection from '@/views/SectionManagement/modSection'

  export default {
    name: 'Anchorage',
    data() {
      return {
        border: true,
        order: '',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        sort: '',
        status: 0,
        keyword: '',
        show: true,
        flag: null,
        tableData: [],
        currentPage: 4,
        mul_0: '',
        mul: '',
        disabled: false
      }
    },
    components: {
      titles,
      addAnchorage,
      modSection
    },
    created() {
      this.list()
    },
    methods: {
      selects(selection, row) {
      },
      // table表格操作
      openDetails(row) {
        this.$confirm(`<div>
      <p><span class="font">编码:</span><span>${row.code}</span></p>
      <p><span class="font">名称:</span><span>${row.name}</span></p>
      <p><span class="font">添加时间:</span><span>${row.addTimeString}</span></p>
      <p><span class="font">更新时间:</span><span>${row.modifyTimeString}</span></p>
  </div>`, '查看', {dangerouslyUseHTMLString: true, showCancelButton: false})
      },
      handleSelectionChange(val) {
        this.mul_0 = val
        console.log(this.mul_0)
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
        lists(this.page.pageNum, this.page.pageSize, this.keyword).then(response => {
          console.log(response)
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
        this.flag = 1
        this.show = false
      },
      ievent(data, flag) {
        this.show = data
        this.flag = flag
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
          this.flag = 2
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
          deltSection(num).then(response => {
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
  .Anchorage {
    padding: 15px;
    .title {
      /*margin: 10px;*/
    }
    .el-input {
      width: auto;
    }
    .main {
      margin-top: 20px;
      .table {
        margin-top: 15px;
      }
      .fenye {
        text-align: center;
        margin-top: 20px;
      }
      .demo-input-suffix {
        .add {
          float: right;
        }
      }

    }
  }
</style>
