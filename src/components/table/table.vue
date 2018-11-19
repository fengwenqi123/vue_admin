<template>
  <div class="list">
    <div class="table">
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
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
        </el-table-column>
        <el-table-column v-for="(item,key) in list"
                         :prop=item.prop
                         :label=item.label
                         :key=key>
          <template slot-scope="scope" >
            <div slot="reference" class="name-wrapper" v-if="item.prop==='status'">
              <el-tag size="medium" v-bind:class="{ active_gender: scope.row.status =='1' }">{{ scope.row.status =='1' ?
                '启用' :
                '禁用' }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  export default {
    data() {
      return {
        Keyword: null,
        currentPage: 4,
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        mul: ''

      }
    },
    props: ['tableData', 'list'],
    methods: {
      handleSelectionChange(val) {
        this.mul = val
        this.$emit('val', this.mul)
      },
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
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .list {
    .table {
      margin-top: 15px;
    }
    .fenye {
      text-align: center;
      margin-top: 20px;
    }

  }
</style>
