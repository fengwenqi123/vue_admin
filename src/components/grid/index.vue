<template>
  <div class="grid">
    <el-row>
      <el-col :span="8" v-for="(item,index) in dataList" :key="index">
        <router-link tag="div" :to="{ path: item.path, query: { index: index}}">
          <div class="grid-content bg-purple">
            <svg-icon :icon-class="item.icon"></svg-icon>
            <p>{{item.name}}</p>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataList: [
          {
            name: '船舶信息',
            icon: 'xinxi',
            path: '/dashboard/shipInformation'
          }, {
            name: '船舶轨迹',
            icon: 'guiji',
            path: ''
          }, {
            name: '区域轨迹',
            icon: 'quyu',
            path: '/dashboard/region'
          }, {
            name: '重点水域',
            icon: 'shuiyu',
            path: ''
          }, {
            name: '航道分析',
            icon: 'fenxi',
            path: ''
          }, {
            name: '通航要素',
            icon: 'yaosu',
            path: '/dashboard/essential'
          }
        ]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .grid {
    background: #fff;
    padding-bottom: 15px;
    .grid-content {
      cursor: pointer;
      margin: 15px 0;
      text-align: center;
      .svg-icon {
        font-size: 30px;
      }
      p {
        margin-top: 12px;
        color: #01579B;
        font-size: 16px;
      }
    }
  }
</style>
