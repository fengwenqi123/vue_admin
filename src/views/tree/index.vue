<template>
  <div class="app-container">
    <div class="pic-box"> <!--pic-box:width:500px;height:500px-->
      <pic-zoom :url="src" :scale="10"></pic-zoom>
    </div>
  </div>
</template>

<script>
  import PicZoom from 'vue-piczoom'

  export default {
    data() {
      return {
        src: 'http://attach.bbs.miui.com/forum/201407/12/113457d8e5uezgdahcvyga.jpg'
      }
    },
    components: {
      PicZoom
    }
  }
</script>
<style>
  .pic-box {
    width: 800px;
    height: 500px;
  }
</style>

