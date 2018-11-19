<template>
  <div class="video1">
    <video-player v-if="a1" class="vjs-custom-skin" ref="videoPlayer" :options="videoOptions">
    </video-player>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        videoOptions: {
          techOrder: ['flash'],
          sources: {
            type: 'rtmp/flv',
            src: ''
          },
          language: 'zh-CN',
          live: true,
          autoplay: true
        },
        a1: true
      }
    },
    props: ['rtmps'],
    created() {
      this.getUser()
    },
    methods: {
      getUser() {
        this.videoOptions.sources.src = this.rtmps
        this.a1 = true
      },
      getUser1() {
        this.a1 = false
      }
    },
    watch: {
      rtmps() {
        this.getUser1()
        setTimeout(() => {
          this.getUser()
        }, 500)
      }
    }
  }
</script>
<style rel="stylesheet/scss" scoped lang="scss">
  .video-player {
    cursor: move;
    height: 210px;

  }
</style>
