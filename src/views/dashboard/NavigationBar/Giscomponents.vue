<template>
  <div class="giscomponents">
    <ul class="clearfix">
      <li>
        <div class="max">
          <selects></selects>
        </div>
      </li>
      <li class="li"  @mouseenter="tabas" @mouseleave="leave">
        <div class="max">
          <svg-icon icon-class="signal"></svg-icon>
          信号设置
        </div>
        <Mod_signal class="signal" v-show="signal"></Mod_signal>
      </li>
      <li class="li1" @mouseenter="tabas1" @mouseleave="leave1">
        <div class="max">
          <svg-icon icon-class="display"></svg-icon>
          显示设置
        </div>
        <Mod_display class="displays" v-show="display"></Mod_display>
      </li>
      <li @click="playback()">
        <div class="max">
          <svg-icon icon-class="trajectory"></svg-icon>
          轨迹回放
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  import selects from '@/views/dashboard/NavigationBar/select.vue'
  import Mod_signal from '@/views/dashboard/NavigationBar/Mod_signal.vue'
  import Mod_display from '@/views/dashboard/NavigationBar/Mod_display.vue'

  export default {
    name: 'giscomponents',
    components: {
      selects, Mod_signal, Mod_display
    },
    data() {
      return {
        active: null,
        signal: false,
        display: false,
        arr: [
          {
            name: '信号设置',
            icon: 'signal'
          },
          {
            name: '显示设置',
            icon: 'display'
          }
        ]
      }
    },
    methods: {
      tabas() {
        this.signal = true
      },
      leave() {
        this.signal = false
      },
      tabas1() {
        this.display = true
      },
      leave1() {
        this.display = false
      },
      playback() {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/areatrack/trackMap.html', 'width=1366,height=786,top=0px,left=0px')
        }, 0)
      }
    }
  }
</script>

<style scoped lang="scss">
  .giscomponents {
    ul {
      background: #fff;
      display: flex;
      padding: 0px 10px;
      li {
        /*height: 40px;*/
        position: relative;
        /*line-height: 40px;*/
        /*padding-top: 8px;*/
        /*cursor: pointer;*/
        .max {
          height: 40px;
          line-height: 40px;
          border-right: 1px solid #e6e6e6;
          margin: 0 6px;
          padding: 0 10px;
          cursor: pointer;
        }
        /*.displays {*/
          /*display: none;*/
        /*}*/
        /*.signal {*/
          /*display: none;*/
        /*}*/
      }
      li:last-child {
        .max {
          border: none;
        }
      }
      .active {
        background: #e9e9e9;
      }
    }
  }

  /*.li1:hover .displays {*/
    /*display: block;*/
  /*}*/

  /*.li:hover .signal {*/
    /*display: block;*/
  /*}*/
</style>
