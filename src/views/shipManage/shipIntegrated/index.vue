<template>
  <div class="shipRegister">
    <titles></titles>
    <el-card v-if="flag" class="main">
      <div v-if="show" class="demo-input-suffix clearfix">
        <span>船舶种类：</span>
        <el-select v-model="cbzldm" placeholder="请选择" clearable size="mini">
          <el-option
            v-for="item in cbzldm_list"
            :key="item.itemValue"
            :label="item.itemName"
            :value="item.itemValue">
          </el-option>
        </el-select>
        <span>船籍港：</span>
        <el-select v-model="cjgdm" placeholder="请选择" clearable size="mini">
          <el-option
            v-for="item in cjgdm_list"
            :key="item.itemValue"
            :label="item.itemName"
            :value="item.itemValue">
          </el-option>
        </el-select>
        <span>关键字：</span>
        <el-input
          placeholder="请输入关键字"
          v-model="keyword"
          size="mini"
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
              prop="Id"
              label="序号"
              width="80">
              <template slot-scope="scope">
                <span>{{scope.$index+(page.pageNum - 1) * page.pageSize+1}} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="中文船名"
              width="120">
              <template slot-scope="scope">
                <span @click="link(scope.row)" style="cursor: pointer;">{{scope.row.zwcm}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mmsi"
              label="mmsi">
            </el-table-column>
            <el-table-column
              prop="cbsbh"
              label="船舶识别号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="cjdjh"
              label="船检登记号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="ccdjh"
              label="初次登记号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="cjdjh"
              label="船检登记号 "
              width="180">
            </el-table-column>
            <el-table-column
              prop="cjgdm"
              label="船籍港代码 "
              width="120">
            </el-table-column>
            <el-table-column
              prop="jdw"
              label="净吨位(吨)"
              width="120">
            </el-table-column>
            <el-table-column
              prop="zdw"
              label="总吨位(吨) "
              width="120">
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
    <div class="detailes" v-if="!flag">
      <detailes :rowes="rowes" @iback="iback"></detailes>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import titles from '@/components/title'
  import {lists} from '@/api/shipRegister'
  import {classification} from '@/api/DicManagement.js'
  import detailes from './details.vue'

  export default {
    name: 'shipRegister',
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
        cbsbh: '',
        cjdjh: '',
        cbzldm: '',
        cjgdm: '',
        cbzldm_list: null,
        cjgdm_list: null,
        zwcm: '',
        mmsi: '',
        status: 0,
        keyword: '',
        show: true,
        tableData: [],
        currentPage: 4,
        type: 0,
        disabled: false,
        rowes: null
      }
    },
    components: {
      titles, detailes
    },
    created() {
      this.list()
      this.getClassification()
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
        lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.cbsbh, this.cjdjh, this.zwcm, this.mmsi, this.keyword, this.type, this.cbzldm, this.cjgdm).then(response => {
          this.tableData = response.data.dataList
          this.page = response.data.page
        })
      },
      getClassification() {
        classification('船舶种类', this.status).then(response => {
          this.cbzldm_list = response.data
        })
        classification('船籍港', this.status).then(response => {
          this.cjgdm_list = response.data
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
    .demo-input-suffix {
      span {
        margin-left: 15px;
      }
    }
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
