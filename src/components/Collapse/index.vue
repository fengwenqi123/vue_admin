<template>
  <div class="collapse">
    <el-collapse accordion>
      <el-collapse-item :title="alarmlen" name="1">
        <ul class="ul1">
          <el-scrollbar class="scrolls">
            <li v-for="(item,index) in alarm">
              <span>{{item.invShips}}</span>
              <span @click="dingwei(item.longitude,item.latitude,item.alarmId)"><svg-icon
                icon-class="dingwei"></svg-icon></span>
            </li>
          </el-scrollbar>
        </ul>
      </el-collapse-item>
      <el-collapse-item :title="shiplen" name="2">
        <ul class="ul2">
          <el-scrollbar class="scrolls">
          <li v-for="(item,index) in shipNames" :key="index">
            <p>{{item}}</p>
            <span @click="dingwei1(shipType,item)"><svg-icon
              icon-class="dingwei"></svg-icon></span>
          </li>
          </el-scrollbar>
        </ul>
      </el-collapse-item>
      <el-collapse-item :title="hszsNameslen" name="3">
        <ul class="ul3">
          <el-scrollbar class="scrolls">
          <li v-for="(item,index) in hszsNames" :key="index">
            <p>{{item}}</p>
            <span @click="dingwei1(hszsType,item)"><svg-icon
              icon-class="dingwei"></svg-icon></span>
          </li>
          </el-scrollbar>
        </ul>
      </el-collapse-item>
      <el-collapse-item :title="jksplen" name="4">
        <ul class="ul4">
          <el-scrollbar class="scrolls">
          <li v-for="(item,index) in jksp" :key="index">
            <p>{{item}}</p>
            <span @click="dingwei1(jkspType,item)"><svg-icon
              icon-class="dingwei"></svg-icon></span>
          </li>
          </el-scrollbar>
        </ul>
      </el-collapse-item>
      <el-collapse-item :title="supportlen" name="5">
        <ul class="ul5">
          <el-scrollbar class="scrolls">
          <li v-for="(item,index) in support" :key="index">
            <p>{{item}}</p>
            <span @click="dingwei1(supportType,item)"><svg-icon
              icon-class="dingwei"></svg-icon></span>
          </li>
          </el-scrollbar>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  /* eslint-disable no-undef,space-before-function-paren */

  export default {
    data() {
      return {
        activeName: '1',
        shipNames: [],
        hszsNames: [],
        jksp: [],
        support: [],
        shipType: null,
        hszsType: null,
        jkspType: null,
        supportType: null
      }
    },
    props: ['alarm'],
    created() {
      this.getFour()
    },
    methods: {
      dingwei(lon, lat, id) {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.showAlarmPoint(lon, lat, id)
        }, 0)
      },
      dingwei1(type, name) {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.locateTo(type, name)
        }, 0)
      },
      getFour() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'shipNames') {
            _this.shipNames = JSON.parse(e.data.msg.name)
            _this.shipType = e.data.msg.type
          }
          if (e.data.act === 'hszsNames') {
            _this.hszsNames = JSON.parse(e.data.msg.name)
            _this.hszsType = e.data.msg.type
          }
          if (e.data.act === 'jksp') {
            _this.jksp = JSON.parse(e.data.msg.name)
            _this.jkspType = e.data.msg.type
          }
          if (e.data.act === 'support') {
            _this.support = JSON.parse(e.data.msg.name)
            _this.supportType = e.data.msg.type
          }
        }, false)
      }
    },
    computed: {
      alarmlen() {
        return `告警列表:(${this.alarm.length})`
      },
      shiplen() {
        return `船舶要素:(${this.shipNames.length})`
      },
      hszsNameslen() {
        return `海事站所:(${this.hszsNames.length})`
      },
      jksplen() {
        return `监控视频:(${this.jksp.length})`
      },
      supportlen() {
        return `救援物资:(${this.support.length})`
      }
    }
  }
</script>

<style scoped lang="scss">
  .collapse {
    ul{
      height: 260px;
    }
    .ul1 {
      height: 260px;
      li {
        height: 30px;
        line-height: 30px;
        padding: 0 16px;
        border-bottom: #ccc;
        span:nth-child(2) {
          float: right;
          .svg-icon {
            cursor: pointer;
          }
        }
      }
    }
    li {
      padding: 5px 16px;
      p {
        display: inline-block;
        cursor: pointer;
      }
      span:nth-child(2) {
        float: right;
        .svg-icon {
          cursor: pointer;
        }
      }
    }
  }
</style>
