<template>
  <div class='Comprehensive'>
    <img :src="src" alt="">
  </div>
</template>

<script>
  export default {
    name: 'comprehensive',
    data() {
      return {
        src: require('@/assets/img/jcfx.png')
      }
    }
  }
</script>

<style scoped lang="scss">
  img{
    width: 100%;
    height: 100%;
  }
</style>
