<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <el-scrollbar class="scrolls">
          <router-view></router-view>
      </el-scrollbar>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
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
<style>
  .app-main {
    /*padding-top: 110px;*/
    background: #ECF0F5;
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
