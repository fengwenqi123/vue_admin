<template>
  <div class="pagination">
    <el-pagination
      :small="small"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.pageSize"
      :current-page.sync="page.pageNum"
      layout="prev, pager, next,total"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: ['pages'],
    data() {
      return {
        small: true
      }
    },
    computed: {
      page() {
        return this.pages
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.page.pageSize = val
      },
      handleCurrentChange(val) {
        this.$emit('ievent', val)
      }
    }
  }
</script>

<style scoped lang="scss">
  .pagination {
    text-align: center;
  }
</style>
