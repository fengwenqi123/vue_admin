<template>
  <div class="display">
    <div class="ship">
      <checkBoxs></checkBoxs>
    </div>
    <div class="ship">
      <checkBoxs1></checkBoxs1>
    </div>
    <div class="clearfix">
      电子航道图
      <span style="float: right;"><el-switch v-model="swi"></el-switch></span>
    </div>
    <div class="map">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item,index) in imgs" :key="index">
          <div class="grid-content bg-purple" @click="sethangdao(item,index)">
            <img :class="{active:active===index}" :src="item" alt=""></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef,object-curly-spacing */

  import checkBoxs from '@/views/dashboard/NavigationBar/checkBox.vue'
  import checkBoxs1 from '@/views/dashboard/NavigationBar/checkBox1.vue'
  import {setSwi, getSwi, setHangDao, getHangDao} from '@/utils/auth.js'

  const img1 = require('@/assets/img/2d.png')
  const img2 = require('@/assets/img/sat.png')
  export default {
    components: {
      checkBoxs, checkBoxs1
    },
    data() {
      return {
        swi: false,
        active: 0,
        imgs: [
          img1, img2
        ]
      }
    },
    created() {
      this.getSwis()
      this.gethangdao()
    },
    methods: {
      setSwis() {
        setSwi(this.swi)
      },
      getSwis() {
        setTimeout(() => {
          if (getSwi() === 'true') {
            this.swi = true
          } else {
            this.swi = false
          }
        }, 1500)
      },
      sethangdao(item, index) {
        this.active = index
        setHangDao(index)
        if (index === 0) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openDZDT()
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openYXT()
        }
      },
      gethangdao() {
        if (getHangDao()) {
          var hd = parseInt(getHangDao())
          this.active = hd
          setTimeout(() => {
            if (hd === 0) {
              $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openDZDT()
            } else {
              $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openYXT()
            }
          }, 1500)
        }
      }
    },
    watch: {
      swi() {
        this.setSwis()
        if (this.swi) {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('DZHDT', true)
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showInfoLayer('DZHDT', false)
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .display {
    margin-left: -148px;
    width: 250px;
    margin-top: 0px;
    position: absolute;
    z-index: 999;
    padding: 10px;
    background: #fff;
    .ship {
      margin-top: 14px;
    }
    p {
      margin-top: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #ccc;
    }
    .grid-content {
      text-align: center;
    }
    .svg-icon {
      font-size: 33px;
      color: #000;
    }
    .map {
      margin-top: 10px;
      img {
        width: 100%;
        cursor: pointer;
      }
      .active {
        border: 1px solid #0050B3;
      }
    }
  }
</style>
