<template>
  <el-dialog title="新增核查规则" :visible.sync="dias" :before-close="handleClose">
    <el-scrollbar class="scrolls">
      <el-table :data="gridData" v-if="dias" @select="selectes">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="name" label="规则名称" width="150"></el-table-column>
        <el-table-column property="rule" label="规则内容"></el-table-column>
        <el-table-column property="type" label="动静态" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.type===1?'动态':'静态'}}</p>
          </template>
        </el-table-column>
        <el-table-column label="适用场景">
          <template slot-scope="scope">
            <span>{{scope.row.sceneCruise===1?'电子巡航':''}}</span>
            <span>{{scope.row.sceneCrossection===1?'卡口监管 ':''}}</span>
            <span>{{scope.row.sceneArea===1?'区域监管':''}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  /* eslint-disable space-before-function-paren,no-unused-vars,object-curly-spacing */
  import {lists} from '@/api/rule.js'

  export default {
    props: ['dia'],
    data() {
      return {
        gridData: [],
        dialogFormVisible: false,
        selection: null
      }
    },
    computed: {
      dias() {
        return this.dia
      }
    },
    created() {
      this.list()
    },
    methods: {
      selectes(selection, row) {
        this.selection = selection
      },
      handleClose() {
        this.$emit('idialog', this.selection)
      },
      list() {
        lists().then(response => {
          this.gridData = response.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
