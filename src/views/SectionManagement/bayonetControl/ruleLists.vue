<template>
  <div class="list">
    <div class="table">
      <el-table
        :data="tableData1"
        style="width: 100%">
        <el-table-column
          prop="processItemBean.name"
          label="规则名称">
        </el-table-column>
        <el-table-column
          prop="processItemBean.description"
          label="规则内容"
        >
        </el-table-column>
        <el-table-column
          prop="direction"
          label="执行航向">
          <!-- <template slot-scope="scope">
            <div>{{}}</div>
          </template> -->
        </el-table-column>
        <el-table-column
        prop="startTime"
        width="120"
          label="开始时间">
        </el-table-column>
        <el-table-column
        prop="endTime"
        width="120"
          label="结束时间">
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注">
          <template slot-scope="scope">
           <div>{{scope.row.description||'--'}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing */

  import {gzList} from '@/api/bayonetControl.js'

  export default {
    name: 'bayonetControl',
    data() {
      return {
        tableData1: []
      }
    },
    created() {
      this.getQuery()
      this.getData()
    },
    methods: {
      getQuery() {
        this.code = this.$route.query.code
      },
      getData() {
        gzList(this.code).then(response => {
          // console.log(response)
          this.tableData1 = response.data
          // console.log(this.tableData1)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .svg-icon {
    cursor: pointer;
    font-size: 24px;
  }
</style>
