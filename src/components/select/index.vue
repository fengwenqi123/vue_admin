<template>
  <div class="select">
    <el-select :size="size" @change="changes" v-model="counter" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        size: 'small',
        counter: ''
      }
    },
    props: ['options', 'value'],
    created() {
      this.counter = this.value
    },
    activated() {
      this.counter = this.value
    },
    methods: {
      changes() {
        this.options.forEach((item, index) => {
          if (item.value === this.counter) {
            this.$router.push({
              path: item.path,
              query: {
                name: item.label,
                icon: item.icon,
                index: index
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
