<template>
  <div class="StatutoryReport">
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
              prop="name"
              label="报表名称">
              <template slot-scope="scope">
                <div class="nei" @click="intoReport(scope.row)">{{scope.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="range"
              label="填报范围"
            >
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
      <form-one v-if="show1" :mul='mul'></form-one>
      <form-two v-if="show2" :mul='mul'></form-two>
      <form-three v-if="show3" :mul='mul'></form-three>
      <form-four v-if="show4" :mul='mul'></form-four>
      <form-five v-if="show5" :mul='mul'></form-five>
      <form-six v-if="show6" :mul='mul'></form-six>
      <form-senven v-if="show7" :mul='mul'></form-senven>
      <form-eight v-if="show8" :mul='mul'></form-eight>
      <form-nine v-if="show9" :mul='mul'></form-nine>
      <form-ten v-if="show10" :mul='mul'></form-ten>
      <form-eleven v-if="show11" :mul='mul'></form-eleven>
      <form-twelve v-if="show12" :mul='mul'></form-twelve>
      <form-thirteen v-if="show13" :mul='mul'></form-thirteen>
      <form-fourteen v-if="show14" :mul='mul'></form-fourteen>
      <form-fifteen v-if="show15" :mul='mul'></form-fifteen>
      <form-sixteen v-if="show16" :mul='mul'></form-sixteen>
      <form-seventeen v-if="show17" :mul='mul'></form-seventeen>
      <form-eighteen v-if="show18" :mul='mul'></form-eighteen>
      <form-nineteen v-if="show19" :mul='mul'></form-nineteen>
      <form-twenty v-if=" show20" :mul='mul'></form-twenty>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-redeclare */

  import titles from '@/components/title'
  import formOne from '@/views/decisionAnalysis/StatutoryReport/formOne.vue'
  import formTwo from '@/views/decisionAnalysis/StatutoryReport/formTwo.vue'
  import formThree from '@/views/decisionAnalysis/StatutoryReport/formThree.vue'
  import formFour from '@/views/decisionAnalysis/StatutoryReport/formFour.vue'
  import formFive from '@/views/decisionAnalysis/StatutoryReport/formFive.vue'
  import formSix from '@/views/decisionAnalysis/StatutoryReport/formSix.vue'
  import formSenven from '@/views/decisionAnalysis/StatutoryReport/formSenven.vue'
  import formEight from '@/views/decisionAnalysis/StatutoryReport/formEight.vue'
  import formNine from '@/views/decisionAnalysis/StatutoryReport/formNine.vue'
  import formTen from '@/views/decisionAnalysis/StatutoryReport/formTen.vue'
  import formEleven from '@/views/decisionAnalysis/StatutoryReport/formEleven.vue'
  import formTwelve from '@/views/decisionAnalysis/StatutoryReport/formTwelve.vue'
  import formThirteen from '@/views/decisionAnalysis/StatutoryReport/formThirteen.vue'
  import formFourteen from '@/views/decisionAnalysis/StatutoryReport/formFourteen.vue'
  import formFifteen from '@/views/decisionAnalysis/StatutoryReport/formFifteen.vue'
  import formSixteen from '@/views/decisionAnalysis/StatutoryReport/formSixteen.vue'
  import formSeventeen from '@/views/decisionAnalysis/StatutoryReport/formSeventeen.vue'
  import formEighteen from '@/views/decisionAnalysis/StatutoryReport/formEighteen.vue'
  import formNineteen from '@/views/decisionAnalysis/StatutoryReport/formNineteen.vue'
  import formTwenty from '@/views/decisionAnalysis/StatutoryReport/formTwenty.vue'
  // import addRole from '@/views/Rsupervise/addRsupervise'
  // import {lists, delt} from '@/api/Rsupervise.js'

  export default {
    data() {
      return {
        bk: 'bk',
        bf: 'bf',
        border: true,
        order: '',
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
        show11: false,
        show12: false,
        show13: false,
        show14: false,
        show15: false,
        show16: false,
        show17: false,
        show18: false,
        show19: false,
        show20: false,
        mul: '',
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        sort: '',
        status: 0,
        keyword: '',
        show: true,
        tableData: [
          {name: '报警情况统计表', range: '通航管理'},
          {name: '搜救情况统计表', range: '通航管理'},
          {name: '获救人员情况统计表', range: '通航管理'},
          {name: '遇险船舶与遇险区域情况统计表', range: '通航管理'},
          {name: '巡航工作统计表', range: '通航管理'},
          {name: '水上水下施工作业情况统计表', range: '通航管理'},
          {name: '水上交通安全检查统计表', range: '通航管理'},
          {name: '分国别进出港船舶统计表(海船)', range: '船舶管理'},
          {name: '（进）分船种分吨级进出港船舶统计表(海船)', range: '船舶管理'},
          {name: '（出）分船种分吨级进出港船舶统计表(海船)', range: '船舶管理'},
          {name: '分船种分客位进出港船舶统计表(海船)', range: '船舶管理'},
          {name: '内河船舶进出港统计表', range: '船舶管理'},
          {name: '进出港船舶分货类货运量统计表(海船)', range: '船舶管理'},
          {name: '进出港船舶分货类货运量统计表(内河)', range: '船舶管理'},
          {name: '内河船舶安全检查情况统计表', range: '船舶管理'},
          {name: '船舶现场监督检查统计表', range: '船舶管理'},
          {name: '船舶装载危险货物情况统计表', range: '危防管理'},
          {name: '防治船舶污染监督管理工作情况统计表', range: '危防管理'},
          {name: '集装箱现场检查统计表', range: '危防管理'},
          {name: '海事行政处罚情况统计表（海法规）', range: '危防管理'}
        ],
        currentPage: 4,
        mul_0: '',
        disabled: false
      }
    },
    components: {
      titles,
      formOne,
      formTwo,
      formThree,
      formFour,
      formFive,
      formSix,
      formSenven,
      formEight,
      formNine,
      formTen,
      formEleven,
      formTwelve,
      formThirteen,
      formFourteen,
      formFifteen,
      formSixteen,
      formSeventeen,
      formEighteen,
      formNineteen,
      formTwenty
    },
    created() {
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
        this.mul = row.name
        console.log(this.mul)
        if (row.name === '报警情况统计表') {
          this.show = false
          this.show1 = true
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '搜救情况统计表') {
          this.show = false
          this.show1 = false
          this.show2 = true
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '获救人员情况统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = true
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '遇险船舶与遇险区域情况统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = true
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '巡航工作统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = true
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '水上水下施工作业情况统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = true
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '水上交通安全检查统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = true
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '分国别进出港船舶统计表(海船)') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = true
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '（进）分船种分吨级进出港船舶统计表(海船)') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = true
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '（出）分船种分吨级进出港船舶统计表(海船)') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = true
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '分船种分客位进出港船舶统计表(海船)') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = true
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '内河船舶进出港统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = true
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '进出港船舶分货类货运量统计表(海船)') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = true
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '进出港船舶分货类货运量统计表(内河)') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = true
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '内河船舶安全检查情况统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = true
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '船舶现场监督检查统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = true
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '船舶装载危险货物情况统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = true
          this.show18 = false
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '防治船舶污染监督管理工作情况统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = true
          this.show19 = false
          this.show20 = false
        }
        if (row.name === '集装箱现场检查统计表') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = true
          this.show20 = false
        }
        if (row.name === '海事行政处罚情况统计表（海法规）') {
          this.show = false
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = false
          this.show6 = false
          this.show7 = false
          this.show8 = false
          this.show9 = false
          this.show10 = false
          this.show11 = false
          this.show12 = false
          this.show13 = false
          this.show14 = false
          this.show15 = false
          this.show16 = false
          this.show17 = false
          this.show18 = false
          this.show19 = false
          this.show20 = true
        }
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
