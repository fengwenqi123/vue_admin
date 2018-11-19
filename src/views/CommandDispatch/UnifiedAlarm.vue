<template>
  <iframe :src=src v-if="src!==null">
    <p>您的浏览器不支持 iframe 标签。</p>
  </iframe>
</template>

<script>
  import { getuser } from '@/utils/auth'

  export default {
    data() {
      return {
        src: null
      }
    },
    created() {
      this.getUserName()
    },
    methods: {
      getUserName() {
        this.src = `http://10.100.70.209:9090/controller/receiveTo/front.alarm/${getuser()}`
      }
    }
  }
</script>

<style scoped>
</style>
