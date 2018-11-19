<template>
  <video-player v-if="a1" class="vjs-custom-skin" ref="videoPlayer" :options="videoOptions">
  </video-player>
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
          autoplay: true,
          height: 350
        },
        a1: false
      }
    },
    props: ['rtmps'],
    created() {
    },
    mounted() {
      // console.log('this is current player instance object', this.player)
    },
    methods: {
      getUser(rtmps) {
        this.videoOptions.sources.src = rtmps
        this.a1 = true
      },
      getUser1() {
        this.a1 = false
      }
    },
    computed: {
      // player() {
      //   if (this.a1) {
      //     return this.$refs.videoPlayer.player
      //   }
      // }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
