<template>
  <div class="shipRegister">
    <titles></titles>
    <el-card v-if="flag" class="main">
      <div v-if="show" class="demo-input-suffix clearfix">
        <span>关键字：</span>
        <el-input
          placeholder="请输入关键字"
          v-model="keyword"
          clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
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
              label="序号"
              width="80">
              <template slot-scope="scope">
                <span>{{scope.$index+(page.pageNum - 1) * page.pageSize+1}} </span>
              </template>
            </el-table-column>
            <el-table-column
              width="180"
              label="姓名">
              <template slot-scope="scope">
                <div @click="link(scope.row)" style="cursor: pointer;">{{scope.row.xm}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="zjhm"
              width="220"
              label="身份证号码">
            </el-table-column>
            <el-table-column
              prop="zy"
              label=" 专业">
            </el-table-column>
            <el-table-column
              prop="zw"
              label="职务">
            </el-table-column>
            <el-table-column
              label="性别 "
              width="100">
              <template slot-scope="scope">
                {{scope.row.xb==='1'?'男':'女'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="csdd"
              label="出生地">
            </el-table-column>
            <el-table-column
              label="出生日期"
              width="180">
              <template slot-scope="scope">
                {{scope.row.csrq.substring(0,11)}}
              </template>
            </el-table-column>
            <el-table-column
              label="截止日期"
              width="180">
              <template slot-scope="scope">
                {{scope.row.sfzyxjzrq.substring(0,11)}}
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
    <div v-if="!flag" class="detailes">
      <detailes :rowes="rowes" @iback="iback"></detailes>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import titles from '@/components/title'
  import {lists} from './index.js'
  import detailes from './details.vue'

  export default {
    name: 'Registered',
    data() {
      return {
        flag: true,
        border: true,
        order: '',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        sort: '',
        zjhm: '',
        xm: '',
        zw: '',
        keyword: '',
        show: true,
        tableData: [],
        currentPage: 4,
        type: 1,
        disabled: false
      }
    },
    components: {
      titles, detailes
    },
    created() {
      this.list()
    },
    methods: {
      handleSelectionChange(val) {
        this.mul_0 = val
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
        lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.zjhm, this.xm, this.zw, this.keyword).then(response => {
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
      link(row) {
        this.flag = false
        this.rowes = row
      },
      iback() {
        this.flag = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shipRegister {
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
