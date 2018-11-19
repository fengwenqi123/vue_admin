<template>
  <div class="signal">
    <p class="tit">
      信号设置
    </p>
    <ul>
      <li v-for="(item,index) in obj" :key="index">
        <div class="div" :class="{active:active===index}" @click="selects(item.active,index)">
          <p>{{item.name}}</p>
          <svg-icon :icon-class="item.icon"></svg-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  /* eslint-disable no-undef,object-curly-spacing */
  import {setSignal, getSignal} from '@/utils/auth.js'

  export default {
    data() {
      return {
        active1: true,
        active: null,
        obj: [
          {
            name: 'GPS模式',
            icon: 'gps',
            active: 'GPS'
          },
          {
            name: 'AIS模式',
            icon: 'dingwei',
            active: 'AIS'
          },
          {
            name: '混合模式',
            icon: 'blend',
            active: 'blend'
          }
        ]
      }
    },
    methods: {
      selects(active, index) {
        this.active = index
        $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.signChange(active)
        setSignal(index)
      },
      getSignals() {
        if (getSignal()) {
          this.active = parseInt(getSignal())
          setTimeout(() => {
            $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.signChange(this.obj[this.active].active)
            // alert(this.obj[this.active].active)
          }, 2000)
        }
      }
    },
    mounted() {
      this.getSignals()
    }
  }
</script>

<style scoped lang="scss">
  .signal {
    display: inline-block;
    margin-left: -168px;
    position: absolute;
    z-index: 999;
    margin-top: 0px;
    background: #fff;
    .tit {
      border-bottom: 1px solid #ccc;
      color: #9b9b9b;
      padding: 3px 0;
      padding-left: 10px;
    }
    ul {
      display: flex;
      li {
        margin: 0 10px;
        width: 74px;
        height: 114px;
        display: flex;
        justify-content: center;
        align-items: center;
        .div {
          padding: 7px;
          background: #fff;
          border-radius: 4px;
          cursor: pointer;
          p {
            margin: 0 0 16px 0;
            color: #666;
          }
          .svg-icon {
            font-size: 18px;
          }
          text-align: center;
        }
        .active {
          background: #01579b;
          p {
            color: #fff;
          }
          .svg-icon {
            color: #fff;
          }
        }
      }
    }
  }
</style>
