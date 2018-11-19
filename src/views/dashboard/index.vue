<template>
  <div class="dashboard">
    <div class="main">
      <!--搜索框-->
      <router-view></router-view>
    </div>
    <iframe id="iframe1" name="hqdtgisFrame" ref="iframe" src="../static/HSgis/gis.html">
      <p>您的浏览器不支持 iframe 标签。</p>
    </iframe>
    <div class="rtmp" v-if="item.flag" v-for="(item,index) in arr_rtmp" v-focus :key="index">
      <p class="p1">{{item.name}}<i @click="close(index)" class="el-icon-circle-close-outline"></i></p>
      <rtmp class="rtmps" :rtmps="item.rtmp" ref="rtmp"></rtmp>
    </div>
    <div class="tabs" v-if="shipName">
      <p class="p1">{{shipName}}<i @click="shipName=null" class="el-icon-circle-close-outline"></i></p>
      <tabs :name="shipName" :ais="aisList"></tabs>
    </div>
    <div class="gis">
      <Giscom></Giscom>
    </div>
    <div class="detal">
      <detailes v-if="hszs" :hszs="hszs" @iback="iback"></detailes>
      <wzcbs v-if="wzcb" :wzcb="wzcb" @iback="iback"></wzcbs>
      <vhf v-if="vhf" :vhf="vhf" @iback="iback"></vhf>
      <ais v-if="ais" :ais="ais" @iback="iback"></ais>
      <kakouDetail v-if="kakou" :xqing="kakou">
        <svg-icon icon-class="close" @click.native="iback"></svg-icon>
      </kakouDetail>
      <matouDetail v-if="matou" :xqing="matou">
        <svg-icon icon-class="close" @click.native="iback"></svg-icon>
      </matouDetail>
    </div>
  </div>
</template>

<script>
  /* eslint-disable space-before-function-paren,no-redeclare,object-curly-spacing */

  import rtmp from '@/components/video/index1'
  import tabs from '@/components/tabs/index'
  import Giscom from '@/views/dashboard/NavigationBar/Giscomponents.vue'
  import {statShipCheck} from '@/api/kakouList.js'
  import detailes from '@/components/details/index.vue'
  import wzcbs from '@/components/details/wzcb.vue'
  import vhf from '@/components/details/vhf.vue'
  import ais from '@/components/details/ais.vue'
  import kakouDetail from '@/views/dashboard/level_two/kakou/xqing.vue'
  import matouDetail from '@/views/dashboard/level_two/essential/wharf/xqing.vue'
  import {watch} from '@/api/station.js'
  import {watch_wz} from '@/api/material.js'
  import {watch_vhf} from '@/api/VHF.js'
  import {watch_ais} from '@/api/AIS.js'
  import {watch_kakou} from '@/api/kakouList.js'
  import {watch_matou} from '@/api/wharf.js'

  export default {
    name: 'dashboard',
    components: {
      rtmp, tabs, Giscom, detailes, wzcbs, vhf, ais, kakouDetail, matouDetail
    },
    data() {
      return {
        hide: [],
        hide1: [],
        src: '../../../../  /HSgis/gis.html',
        grids: false,
        flag: false,
        input: '',
        name: '',
        rtmps: '',
        arr_rtmp: [],
        arr_rtmp1: [],
        num: [],
        shipName: null,
        aisList: null,
        kakouName: null,
        kakouCode: null,
        kakouData: null,
        hszs: null,
        wzcb: null,
        vhf: null,
        ais: null,
        kakou: null,
        matou: null
      }
    },
    mounted() {
      this.getRtmp()
      this.getShipManage()
      this.getFactor()
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      }
    },
    methods: {
      getRtmp() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'rtmp') {
            _this.name = e.data.msg.name
            if (e.data.msg.rtmp === '' || e.data.msg.rtmp === null) {
              _this.$message({
                message: '该地点暂无视频',
                type: 'warning'
              })
              return
            }
            var obj = {}
            if (JSON.stringify(_this.arr_rtmp).indexOf(e.data.msg.rtmp) === -1) {
              obj.rtmp = e.data.msg.rtmp
              obj.name = e.data.msg.name
              obj.flag = true
              _this.arr_rtmp.push(obj)
            } else {
              _this.num = []
              _this.arr_rtmp.forEach((item, index) => {
                if (item.rtmp === e.data.msg.rtmp) {
                  _this.num.push(item)
                }
              })
              if (JSON.stringify(_this.num).indexOf('true') === -1) {
                obj.rtmp = e.data.msg.rtmp
                obj.name = e.data.msg.name
                obj.flag = true
                _this.arr_rtmp.push(obj)
              }
            }
          }
        }, false)
      },
      getShipManage() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'shipManage') {
            _this.shipName = e.data.msg.name
            _this.aisList = e.data.msg.aisClass
          }
        }, false)
      },
      statShipChecks() {
        var type = 1
        statShipCheck(type, this.kakouCode).then(response => {
          this.kakouData = response.data
        })
      },
      getFactor() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'hszs') {
            _this.iback()
            watch(e.data.msg.id).then(response => {
              _this.hszs = response.data
            })
          }
          if (e.data.act === 'wzcb') {
            _this.iback()
            watch_wz(e.data.msg.id).then(response => {
              _this.wzcb = response.data
            })
          }
          if (e.data.act === 'vhfName') {
            _this.iback()
            watch_vhf(e.data.msg.id).then(response => {
              _this.vhf = response.data
            })
          }
          if (e.data.act === 'aisName') {
            _this.iback()
            watch_ais(e.data.msg.id).then(response => {
              _this.ais = response.data
            })
          }
          if (e.data.act === 'kakou') {
            _this.iback()
            watch_kakou(e.data.msg.id).then(response => {
              _this.kakou = response.data
            })
          }
          if (e.data.act === 'matouName') {
            _this.iback()
            watch_matou(e.data.msg.id).then(response => {
              _this.matou = response.data
            })
          }
        }, false)
      },
      iback() {
        this.hszs = null
        this.wzcb = null
        this.vhf = null
        this.ais = null
        this.matou = null
        this.kakou = null
      },
      close(index) {
        this.arr_rtmp[index].flag = false
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted(el) {
          el.onmousedown = function (ev) {
            var ev = ev || event
            var X = ev.clientX
            var Y = ev.clientY
            var x1 = el.offsetLeft
            var y1 = el.offsetTop
            var disx = X - x1
            var disy = Y - y1
            document.onmousemove = function (ev1) {
              var ev = ev1 || event
              el.style.left = ev.clientX - disx + 200 + 'px'
              el.style.top = ev.clientY - disy + 120 + 'px'
            }
          }
          document.onmouseup = function (ev) {
            document.onmousemove = null
          }
        }
      },
      focus1: {
        // 指令的定义
        inserted(el) {
          el.onmousedown = function (ev) {
            var ev = ev || event
            var X = ev.clientX
            var Y = ev.clientY
            var x1 = el.offsetLeft
            var y1 = el.offsetTop
            var disx = X - x1
            var disy = Y - y1
            document.onmousemove = function (ev1) {
              var ev = ev1 || event
              el.style.left = ev.clientX - disx + 260 + 'px'
              el.style.top = ev.clientY - disy + 120 + 'px'
            }
          }
          document.onmouseup = function (ev) {
            document.onmousemove = null
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    .main {
      position: absolute;
      z-index: 1;
      width: 365px;
      margin-top: 10px;
      margin-left: 10px;
    }
    .rtmp {
      position: fixed;
      width: 400px;
      height: 240px;
      margin-left: -200px;
      margin-top: -120px;
      top: 50%;
      left: 50%;
      z-index: 9999;
      p {
        background: #ccc;
        height: 30px;
        line-height: 30px;
        text-align: left;
        padding-right: 10px;
        padding-left: 10px;
        i {
          float: right;
          font-size: 20px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
    .tabs {
      position: fixed;
      width: 520px;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      p {
        background: #ccc;
        height: 30px;
        line-height: 30px;
        text-align: left;
        padding-right: 10px;
        padding-left: 10px;
        i {
          float: right;
          font-size: 20px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
    .rtmps:hover {
      cursor: move;
    }
    .gis {
      position: absolute;
      right: 10px;
      top: 14px;
    }
    .detal {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
</style>
