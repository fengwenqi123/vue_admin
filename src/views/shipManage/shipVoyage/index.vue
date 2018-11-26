<template>
  <div class="shipRegister">
    <titles></titles>
    <el-card v-if="flag" class="main">
      <div class="text">
        <div class="span">
          <span class="font">船舶名称：</span>
          <el-input
            size="mini"
            placeholder="请输入内容"
            v-model="shipName">
          </el-input>
        </div>
        <div class="span">
          <span class="font">mmsi：</span>
          <el-input
            size="mini"
            placeholder="请输入mmsi"
            v-model="mmsi">
          </el-input>
        </div>
        <div class="span">
          <span>进出港类型：</span>
          <el-select v-model="type" placeholder="请选择" clearable :size="mini">
            <el-option
              v-for="item in type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="span">
          <span>航向：</span>
          <el-select v-model="direction" placeholder="请选择" clearable :size="mini">
            <el-option
              v-for="item in direction_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="span">
          <span class="font">关键字：</span>
          <el-input
            size="mini"
            placeholder="请输入关键字"
            v-model="keyword">
          </el-input>
        </div>
        <div class="span">
          <el-button type="primary" :size="mini" @click="list" icon="el-icon-search">搜索</el-button>
          <el-button type="info" @click="reset" :size="mini" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <div class="list" v-if="show">
        <div class="table">
          <el-table
            :data="tableData"
            stripe
            :border="border"
            style="width: 100%">
            <el-table-column
              prop="Id"
              label="序号"
              type="index"
              width="80">
            </el-table-column>
            <el-table-column
              width="180"
              label="中文船名">
              <template slot-scope="scope">
                <p  @click="link(scope.row)" style="cursor: pointer;">{{scope.row.shipName}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="mmsi"
              width="100"
              label="MMSI">
            </el-table-column>
            <el-table-column
              prop="startTime"
              width="180"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="imo"
              width="100"
              label="imo">
            </el-table-column>
            <el-table-column
              prop="hh"
              width="100"
              label="呼号">
            </el-table-column>
            <el-table-column
              width="150"
              label="进出港类型">
              <template slot-scope="scope">
                <p>
                  {{scope.row.type==='1'?'进港':scope.row.type==='2'?'出港':'其他-临时航次'}}</p>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="航向">
              <template slot-scope="scope">
                {{scope.row.direction===1?'上行':scope.row.direction===2?'下行':'未知'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="registerName"
              label="来源">
            </el-table-column>
            <el-table-column
              width="180"
              prop="description"
              label="备注">
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
  import {lists} from '@/api/shipVoyage.js'
  import detailes from './details.vue'

  export default {
    name: 'shipRegister',
    data() {
      return {
        flag: true,
        border: true,
        mini: 'mini',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        cbsbh: '',
        cjdjh: '',
        zwcm: '',
        status: 0,
        order: '',
        sort: '',
        mmsi: '',
        alarmLevel: '',
        type: '',
        type_list: [{
          value: '1',
          label: '进港'
        }, {
          value: '2',
          label: '出港'
        }, {
          value: '3',
          label: '其他-临时航次'
        }],
        shipName: '',
        keyword: '',
        show: true,
        tableData: [],
        currentPage: 4,
        disabled: false,
        rowes: null,
        direction: '',
        direction_list: [{
          value: '1',
          label: '上行'
        }, {
          value: '2',
          label: '下行'
        }]
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
        lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.shipName, this.mmsi, this.type, this.direction, this.keyword).then(response => {
          this.tableData = response.data.dataList
          this.page = response.data.page
        })
      },
      query() {
        this.page.pageNum = 1
        this.list()
      },
      reset() {
        this.keyword = null
        this.page.pageNum = 1
        this.page.pageSize = 10
        this.mmsi = null
        this.shipName = null
        this.direction = null
        this.type = null
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
    .text{
      display: flex;
      .span{
        margin-left: 20px;
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
