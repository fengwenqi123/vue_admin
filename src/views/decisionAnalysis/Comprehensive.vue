<template>
  <div class='Comprehensive'>
    <img :src="src" alt="">
    <p class="p1">{{total}}</p>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing */

  import {shipInfo} from '@/api/Comprehensive.js'

  export default {
    name: 'comprehensive',
    data() {
      return {
        src: require('@/assets/img/jxfx1.jpg'),
        total: null,
        times: null
      }
    },
    created() {
      this.times = setInterval(() => {
        this.getShipInfo()
      }, 3000)
    },
    beforeRouteLeave(to, from, next) {
      next()
      clearInterval(this.times)
    },
    methods: {
      getShipInfo() {
        shipInfo().then(response => {
          this.total = response.data.total
          setTimeout(() => {
            this.getShipInfo()
          }, 3000)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  img {
    width: 100%;
    height: 100%;
  }

  .p1 {
    font-size: 1.3rem;
    color: #FADC2C;
    margin-top: -3.2rem;
    margin-left: 33%;
  }
</style>
