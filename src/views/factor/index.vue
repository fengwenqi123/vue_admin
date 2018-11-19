<template>
  <div class="facort">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
