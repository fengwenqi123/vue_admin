<template>
  <div class="RoleManagement">
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
              prop="fullName"
              width="280"
              label="中文名称全称">
            </el-table-column>
            <el-table-column
              prop="shortName"
              width="180"
              label="中文名称简称">
            </el-table-column>
            <el-table-column
              prop="englishName"
              width="180"
              label="英文名称全称  ">
            </el-table-column>
            <el-table-column
              prop="englishName"
              width="200"
              label="结构">
            </el-table-column>
            <el-table-column
              prop="productionDate"
              width="300"
              label=" 投产日期 ">
            </el-table-column>
            <el-table-column
              prop="businessModel"
              width="190"
              label="经营模式">
            </el-table-column>
            <el-table-column
              prop="unitName"
              width="300"
              label="业主单位名称">
            </el-table-column>
            <el-table-column
              prop="contact"
              width="300"
              label="联系人">
            </el-table-column>
            <el-table-column
              prop="telephone "
              label=" 联系电话  ">
            </el-table-column>
            <el-table-column
              prop="productionUse"
              width="180"
              label="是否生产用  ">
            </el-table-column>
            <el-table-column
              prop="structureLevel"
              width="200"
              label="水工结构等级  ">
            </el-table-column>
            <el-table-column
              prop="designBerthCapacity"
              width="200"
              label="设计靠泊能力">
            </el-table-column>
            <el-table-column
              prop="approvedBerthCapacity"
              label="核定靠泊能力">
            </el-table-column>
            <el-table-column
              prop="waterWidth"
              width="180"
              label="前沿停泊水域设计宽度">
            </el-table-column>
            <el-table-column
              prop="waterDepth"
              label="前沿停泊水域设计深度">
            </el-table-column>
            <el-table-column
              prop="waterLength"
              label=" 设计回旋水域长度">
            </el-table-column>
            <el-table-column
              prop="swirlingWaterWidth"
              label=" 设计回旋水域宽度">
            </el-table-column>
            <el-table-column
              prop="swirlingWaterDepth"
              label=" 设计回旋水域水深">
            </el-table-column>
            <el-table-column
              prop="berthLength"
              label=" 泊位长度">
            </el-table-column>
            <el-table-column
              prop="berthNature"
              width="180"
              label=" 泊位性质">
            </el-table-column>
            <el-table-column
              prop="goods"
              label=" 主要货种">
            </el-table-column>
            <el-table-column
              prop="solidDangerousSign"
              label=" 固体危货标志">
            </el-table-column>
            <el-table-column
              prop="liquidDangerousSign"
              label=" 液体危货标志">
            </el-table-column>
            <el-table-column
              prop="packageDangerousGoods"
              label=" 包装危险货物">
            </el-table-column>
            <el-table-column
              prop="passAbilityLiquid"
              label=" 设计年通过能力液体危险品、散货、件杂货物">
            </el-table-column>
            <el-table-column
              prop="passAbilityBox"
              label=" 设计年通过能力集装箱（万TEU）">
            </el-table-column>
            <el-table-column
              prop="passAbilityCar"
              label=" 设计通过汽车数量（万标辆）">
            </el-table-column>
            <el-table-column
              prop="passAbilityPassenger"
              label=" 设计通过旅客数量（万人） ">
            </el-table-column>
            <el-table-column
              prop="openType"
              label=" 开放类型">
            </el-table-column>
            <el-table-column
              prop="approvalAuthority"
              label=" 开放批准启用机构">
            </el-table-column>
            <el-table-column
              prop="textNumber"
              label=" 开放批准启用文号">
            </el-table-column>
            <el-table-column
              prop="activationDate"
              label=" 开放批准启用日期">
            </el-table-column>
            <el-table-column
              prop="remark"
              label=" 备注">
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
      <add-role v-if="!show" @ievent="ievent" :mul="mul" :disabled="disabled"></add-role>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import titles from '@/components/title'
  import {lists, delt} from '@/api/berth.js'
  import addRole from '@/views/factor/berth/addRole'

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
        sort: '',
        status: 0,
        keyword: null,
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
      addRole
    },
    created() {
      this.list()
    },
    methods: {
      // table表格操作
      openDetails(row) {
        this.$confirm(`<div>
      <p><span class="font">名称:</span><span>${row.name}</span></p>
      <p><span class="font">状态:</span><span>${row.status === 1 ? '启用' : '禁用'}</span></p>
      <p><span class="font">备注:</span><span>${row.description}</span></p>
      <p><span class="font">更新时间:</span><span>${row.modifyTimeString}</span></p>
  </div>`, '查看', {dangerouslyUseHTMLString: true, showCancelButton: false})
      },
      handleSelectionChange(val) {
        this.mul_0 = val
        console.log(this.mul_0)
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .RoleManagement {
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
    }
  }
</style>
