<template>
  <div class="StatutoryReport">
   <h1 style="margin:0">{{mul1}}</h1>
    <el-card class="main">
      <div class="list">
        <div class="table">
          <el-table
            :data="tableData"
            :border="border"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              label="代码"
              width="80">
            </el-table-column>
            <el-table-column
              prop="jsdw"
              label="行政处罚数（件）">
               <el-table-column
               label="船舶"
               >
                <el-table-column
                label="国轮">
                 <el-table-column
                 label="海船">
                 </el-table-column>
                 <el-table-column
                 label="内河船舶">
                 </el-table-column>
                </el-table-column>
                 <el-table-column
                label="外轮">
                </el-table-column>
               </el-table-column>
               <el-table-column
               label="船员"
               >
               </el-table-column>
               <el-table-column
               label="船舶所有人，经营人"
               >
               </el-table-column>
               <el-table-column
               label="其他"
               >
               </el-table-column>
            </el-table-column>
            <el-table-column 
            label="警告（件）">
             <el-table-column
             label="合计">
             </el-table-column>
             <el-table-column
             label="船舶">
             </el-table-column>
             <el-table-column
             label="船员">
             </el-table-column>
             <el-table-column
             label="其他">
             </el-table-column>
            </el-table-column>
            <el-table-column
            label="罚款">
             <el-table-column
             label="合计">
               <el-table-column
               label="件">
               </el-table-column>
               <el-table-column
               label="元">
               </el-table-column>
             </el-table-column>
             <el-table-column
             label="船舶">
               <el-table-column label="件"></el-table-column>
               <el-table-column label="元"></el-table-column>
             </el-table-column>
              <el-table-column
             label="船员">
               <el-table-column label="件"></el-table-column>
               <el-table-column label="元"></el-table-column>
             </el-table-column>
              <el-table-column
             label="船舶所有人，经营人">
               <el-table-column label="件"></el-table-column>
               <el-table-column label="元"></el-table-column>
             </el-table-column>
             <el-table-column
             label="其他">
               <el-table-column label="件"></el-table-column>
               <el-table-column label="元"></el-table-column>
             </el-table-column>
            </el-table-column>
            <el-table-column label="扣留证书（件）">
              <el-table-column label="合计"></el-table-column>
              <el-table-column label="">
                <el-table-column label="海船船员"></el-table-column>
                <el-table-column label="内河船员"></el-table-column>
                <el-table-column label="引航员"></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="吊销证书（件）">
              <el-table-column label="合计"></el-table-column>
              <el-table-column label="吊销船员证书">
                <el-table-column label="小计"></el-table-column>
                <el-table-column label="">
                  <el-table-column label="海船船员"></el-table-column>
                <el-table-column label="内河船员"></el-table-column>
                <el-table-column label="引航员"></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column label="吊销船舶证书"></el-table-column>
              <el-table-column label="其他"></el-table-column>
            </el-table-column>
            <el-table-column label="没收">
               <el-table-column label="没收船舶（艘）"></el-table-column>
               <el-table-column label="没收非法财物（件）"></el-table-column>
               <el-table-column label="没收违法所得">
                  <el-table-column label="件"></el-table-column>
                  <el-table-column label="元"></el-table-column>
               </el-table-column>
            </el-table-column>
             <el-table-column label="其他（件）"></el-table-column>
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
  // import addRole from '@/views/Rsupervise/addRsupervise'
  // import {lists, delt} from '@/api/Rsupervise.js'

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
        sort: '',
        status: 0,
        keyword: '',
        show: true,
        mul1: '',
        tableData: [
  
        ],
        currentPage: 4,
        mul_0: '',
        mul: '',
        disabled: false
      }
    },
    components: {
      titles
    },
    props: ['mul'],
    created() {
      this.mul1 = this.mul
      // this.list()
    },
    methods: {
      watch(id) {
        this.$router.push({
          name: 'quyuList',
          query: {
            id: id
          }
        })
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
        // this.list()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page.pageNum = val
        // this.list()
      },
      // list() {
      //   lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword).then(response => {
      //     this.tableData = response.data.dataList
      //     this.page = response.data.page
      //   })
      // },
      query() {
        this.page.pageNum = 1
        // this.list()
      },
      reset() {
        this.keyword = ''
        this.page.pageNum = 1
        // this.list()
      },
      intoReport(row) {
        console.log(row)
      },
      add() {
        this.mul = ''
        this.show = false
      },
      ievent(data) {
        this.show = data
        // this.list()
      },
      modify(row) {
        console.log(row)
        this.mul = row
        this.show = false
      }
      // del() {
      //   if (this.mul_0.length === 0) {
      //     this.$message({
      //       message: '请先选择'
      //     })
      //     return
      //   }
      //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     var num = []
      //     this.mul_0.forEach((item, index) => {
      //       num.push(item.id)
      //     })
      //     delt(num).then(response => {
      //       this.$message({
      //         message: response.msg,
      //         type: 'success'
      //       })
      //       this.list()
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消操作'
      //     })
      //   })
      // },
      // control(id, type) {
      //   this.$router.push({
      //     path: 'prevention',
      //     query: {
      //       id: id,
      //       type: type
      //     }
      //   })
      // }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .StatutoryReport {
    padding: 15px;
    .title {
      /*margin: 10px;*/
    }
    .main {
      margin-top: 14px;
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
