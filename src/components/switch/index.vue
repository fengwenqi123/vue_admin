<template>
  <el-switch
    style="display: inline-block"
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="布控"
    @change="actives"
    inactive-text="布防">
  </el-switch>
</template>

<script>
  export default {
    props: ['type'],
    data() {
      return {
        value: this.type
      }
    },
    // watch: {
    //   type() {
    //     alert(111)
    //     if (parseInt(this.type) === 2) {
    //       this.value = true
    //     } else {
    //       this.value = false
    //     }
    //   }
    // },
    created() {
      this.actives()
    },
    methods: {
      actives() {
        this.$emit('ievent', this.value)
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-switch {
  }

</style>
