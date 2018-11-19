<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>

<script>
  export default {
    props: ['zhzsListobj'],
    data() {
      return {
        data: this.zhzsListobj,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
