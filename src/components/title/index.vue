<template>
  <div class="titles">
    <el-card class="box-card">
      <div class="text item">
        <breadcrumb></breadcrumb>
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    components: {
      Breadcrumb
    }
  }
</script>

<style scoped>

</style>
