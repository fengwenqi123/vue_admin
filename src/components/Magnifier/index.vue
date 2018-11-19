<template>
  <div class="img">
    <div class="fade" v-if="flag" @click="fade1">
    </div>
    <div class="img_1">
      <el-row>
        <el-col :span="12">
          <img :src="src" @click="big(src)"
               alt="">
        </el-col>
        <el-col :span="12">
          <img :src="src1" @click="big(src1)"
               alt="">
        </el-col>
        <el-col :span="12">
          <img :src="src2" @click="big(src2)"
               alt="">
        </el-col>
        <el-col :span="12">
          <img :src="src3" @click="big(src3)"
               alt="">
          <!--<pic-zoom :url="src3" :scale="10"></pic-zoom>-->
        </el-col>
      </el-row>
    </div>
    <transition name="bounce">
      <div class="pic-box" v-if="flag">
        <pic-zoom :url="src_big" :scale="10"></pic-zoom>
      </div>
    </transition>
  </div>
</template>

<script>
  import PicZoom from 'vue-piczoom'

  export default {
    data() {
      return {
        flag: false,
        fade: false,
        src_big: '',
        isScale: false
      }
    },
    components: {
      PicZoom
    },
    props: ['src', 'src1', 'src2', 'src3'],
    methods: {
      big(src) {
        this.flag = !this.flag
        this.src_big = src
      },
      fade1() {
        this.flag = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .img {
    .name {
      margin: 0;
      height: 34px;
      line-height: 34px;
      background: #f5f5f5;
    }
    .img_1 {
      .el-row {
        margin: 0px;
        background: #fff;
        .el-col {
          padding: 2px 4px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .bounce-enter-active {
      animation: bounce-in .3s;
    }
    .bounce-leave-active {
      animation: bounce-in .3s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    .fade {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      z-index: 111;
    }
    .pic-box {
      position: fixed;
      width: 900px;
      top: 130px;
      left: 200px;
      z-index: 100000;
    }
  }
</style>
