<template>
  <div class="grid">
    <el-row>
      <el-col :span="8" v-for="(item,index) in dataList" :key="index">
        <router-link tag="div" :to="{ path: item.path, query: { icon: item.icon ,name:item.name,index:index}}">
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
            name: '视频监控',
            icon: 'jk',
            path: '/dashboard/monitor'
          },
          {
            name: '航标监控',
            icon: 'hangbiao',
            path: ''
          },
          {
            name: '水文气象',
            icon: 'shuiwen',
            path: ''
          },
          {
            name: '码头岸线',
            icon: 'matou',
            path: '/dashboard/wharf'
          },
          {
            name: '跨河建筑物',
            icon: 'jianzhu',
            path: ''
          },
          {
            name: '锚泊区',
            icon: 'maobo',
            path: ''
          },
          {
            name: '助航标志',
            icon: 'zhuhang',
            path: ''
          },
          {
            name: '海事站所',
            icon: 'haishi',
            path: '/dashboard/station'
          },
          {
            name: '船闸',
            icon: 'chuanzha',
            path: ''
          },
          {
            name: '截面',
            icon: 'jiemian',
            path: ''
          },
          {
            name: '物资储备',
            icon: 'wuzi',
            path: '/dashboard/materials'
          },
          {
            name: '航行通告',
            icon: 'tonggao',
            path: ''
          },
          {
            name: '渡口',
            icon: 'dukou',
            path: ''
          },
          {
            name: 'AIS',
            icon: 'baseStation',
            path: '/dashboard/AIS'
          },
          {
            name: 'VHF基站',
            icon: 'baseStation',
            path: '/dashboard/vhf'
          },
          {
            name: '泊位',
            icon: 'berth',
            path: '/dashboard/berth'
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
        color: #01579B;;
      }
      p {
        margin-top: 12px;
        color: #01579B;
        font-size: 16px;
      }
    }
  }
</style>
