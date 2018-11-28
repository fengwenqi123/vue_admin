<template>
  <div class="mouth">
    <titles></titles>
    <el-card class="main">
      <div v-if="show" class="demo-input-suffix clearfix">
       <h3 class="title_h3">卡口监管列表</h3>
       <el-input placeholder="请输入内容" v-model="input5" class="input-search">
          <el-button slot="append" icon="el-icon-search"></el-button>
       </el-input>
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
              prop="name"
              label="卡口名称">
              <template slot-scope="scope">
                <div>{{scope.row.name}}</div>
              </template>
            </el-table-column>
             <el-table-column
              prop="code"
              label="卡口编码">
              <template slot-scope="scope">
                <div>{{scope.row.code}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="type"
              width="100"
              label="执勤状态"
            >
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper"
                     v-bind:class="[scope.row.type =='1' ? '' : scope.row.type =='2' ? 'bf' : 'bk' ]">
                  {{ scope.row.type =='1' ? '未设置' : scope.row.type =='2' ? '布防中' : '布控中' }}
                </div>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="departmentName"
              label="所属部门">
               <template slot-scope="scope">
                <div>{{scope.row.departmentName || '--'}}</div>
              </template>
            </el-table-column>
             <el-table-column
              prop="warnUserName"
              label="执勤人员">
               <template slot-scope="scope">
                <div>{{scope.row.warnUserName || '--'}}</div>
              </template>
            </el-table-column>
             <el-table-column
              prop="warnDepartmentName"
              label="执勤部门">
               <template slot-scope="scope">
                <div>{{scope.row.warnDepartmentName || '--'}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="warnStartTime"
              label="开始时间">
               <template slot-scope="scope">
                <div>{{scope.row.warnStartTime || '--'}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="warnEndTime"
              label="结束时间">
               <template slot-scope="scope">
                <div>{{scope.row.warnEndTime || '--'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="onDuty(scope.row.id, scope.row.code, scope.row.type)">执勤
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
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-redeclare */

  import titles from '@/components/title'
  import {lists} from '@/api/bayonetControl.js'

  export default {
    data() {
      return {
        bk: 'bk',
        bf: 'bf',
        border: true,
        order: '',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        input5: '',
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
      titles
    },
    created() {
      this.list()
    },
    methods: {
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
        lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword).then(response => {
          console.log(response)
          this.tableData = response.data.dataList
          this.page = response.data.page
          this.tableData = this.response.data.dataList
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
        this.mul = ''
        this.show = false
      },
      ievent(data) {
        this.show = data
        this.list()
      },
      modify(row) {
        console.log(row)
        this.mul = row
        this.show = false
      },
      onDuty(id, code, city) {
        this.$router.push({
          path: 'onDuty',
          query: {
            id: id,
            code: code,
            city: city
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mouth {
    padding: 15px;
    .title {
      /*margin: 10px;*/
    }
    .main {
      margin-top: 14px;
      .title_h3{
        border-bottom:2px solid #d7d7d8;
        margin:0;
        color:#666;
        height:26px;
      }
      .el-input {
        width: auto;
      }
      .input-search{
        width:300px;
        margin-top:15px;
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
    .bk {
      color: #00CD66 !important;
    }
    .bf {
      color: #dd6161 !important;
    }
    .nei {
      cursor: pointer;
    }
  }
</style>
