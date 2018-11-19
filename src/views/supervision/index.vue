<template>
  <div class="supervision">
    <el-row :gutter="15">
      <el-col :span="7">
        <el-card class="box-card">
          <p>区域地图</p>
          <div class="map">
            <img width="336px" style="margin-left: 50px;" :src=src alt="">
            <span @click="pic(hangzhou,'杭州市')" style="left: 148px;top: 108px;">杭州市</span>
            <span @click="pic(ningbo,'宁波市')" style="left: 301px;top: 109px;">宁波市</span>
            <span @click="pic(wenzhou,'温州市')" style="left: 227px;top: 304px;">温州市</span>
            <span @click="pic(jiaxing,'嘉兴市')" style="left: 244px;top: 35px;">嘉兴市</span>
            <span @click="pic(huzhou,'湖州市')" style="top: 32px;left: 174px;">湖州市</span>
            <span @click="pic(shaoxing,'绍兴市')" style="left: 239px;top: 118px;">绍兴市</span>
            <span @click="pic(jinhua,'金华市')" style="left: 196px;top: 175px;">金华市</span>
            <span @click="pic(quzhou,'衢州市')" style="left: 92px;top: 205px;">衢州市</span>
            <span @click="pic(zhoushan,'舟山市')" style="left: 351px;top: 82px;">舟山市</span>
            <span @click="pic(taizhou,'台州市')" style="left: 281px;top: 199px;">台州市</span>
            <span @click="pic(lishui,'丽水市')" style="left: 150px;top: 270px;">丽水市</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card class="box-card1">
          <p>统计信息</p>
          <div class="top">
            <ul class="data clearfix">
              <li :class="{active : isActive===1}" @click="findData('Y')"><p>年</p></li>
              <li :class="{active : isActive===2}" @click="findData('M')"><p>月</p></li>
              <li :class="{active : isActive===3}" @click="findData('D')"><p>日</p></li>
            </ul>
          </div>
          <div class="chart-container">
            <chart height="100%" width="100%" :obj="obj" ref="chart"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="table">
      <el-card class="box-card">
        <p>卡口列表</p>
        <div class="text item">
          <el-table
            :data="shipCheckAreaStatsList"
            :border="border"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              prop="Id"
              label="序号"
              type="index"
              width="60">
            </el-table-column>
            <el-table-column
              prop="area"
              label="区域"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="area" @click="wacth(scope.row.area,scope.row.code)">{{ scope.row.area }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="allShip"
              label="总流量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="normalShip"
              label="正常船舶"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="exceptionShip"
              label="异常船舶"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop=""
              label="AIS上线率"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{Math.round((scope.row.aisOnlineRate)/scope.row.allShip*100)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="船舶核查率"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{Math.round((scope.row.normalShip+scope.row.exceptionShip)/scope.row.allShip*100)+'%'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import Chart from '@/components/Charts/mixChart'
  import {lists} from '@/api/supervision.js'

  export default {
    components: {
      Chart
    },
    data() {
      return {
        index: 0,
        tableData: [],
        border: true,
        isActive: 1,
        data: 'Y',
        province: '浙江省',
        city: '',
        shipCheckAreaAlarmStatsList: null,
        shipCheckAreaStatsList: null,
        obj: {
          num: [],
          normalShip: [],
          exceptionShip: []
        },
        src: require('@/assets/img/zhejiang.png'),
        zhejiang: require('@/assets/img/zhejiang.png'),
        hangzhou: require('@/assets/img/hangzhou.png'),
        ningbo: require('@/assets/img/ningbo.png'),
        wenzhou: require('@/assets/img/wenzhou.png'),
        jiaxing: require('@/assets/img/jiaxing.png'),
        huzhou: require('@/assets/img/huzhou.png'),
        shaoxing: require('@/assets/img/shaoxing.png'),
        jinhua: require('@/assets/img/jinhua.png'),
        quzhou: require('@/assets/img/quzhou.png'),
        zhoushan: require('@/assets/img/zhoushan.png'),
        taizhou: require('@/assets/img/taizhou.png'),
        lishui: require('@/assets/img/lishui.png')
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      pic(img, name) {
        if (this.src === img) {
          this.src = this.zhejiang
          this.city = null
          this.index -= 1
          this.getList()
        } else {
          this.src = img
          this.city = name
          this.index += 1
          this.getList()
        }
      },
      wacth(name, id) {
        this.index += 1
        if (this.index <= 1) {
          this.city = name
          this.getList()
        } else {
          this.$router.push(
            {
              name: 'statistics',
              query: {
                id: id
              }
            }
          )
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (row.alarmLevel === 1) {
          return 'warning-row'
        } else if (row.alarmLevel === 3) {
          return 'success-row'
        }
        return ''
      },
      findData(x) {
        if (x === 'Y') {
          this.data = x
          this.isActive = 1
        } else if (x === 'M') {
          this.data = x
          this.isActive = 2
        } else if (x === 'D') {
          this.data = x
          this.isActive = 3
        }
        this.getList()
      },
      getList() {
        this.obj.num = []
        this.obj.normalShip = []
        this.obj.exceptionShip = []
        lists(this.province, this.city, this.data).then(respone => {
          this.shipCheckAreaAlarmStatsList = respone.data
          if (this.shipCheckAreaAlarmStatsList.length > 0) {
            this.shipCheckAreaAlarmStatsList.forEach((item, index) => {
              this.obj.num.push(item.area)
              this.obj.normalShip.push(item.normalShip)
              this.obj.exceptionShip.push(item.exceptionShip)
            })
          }
          this.$refs.chart.initChart()
          this.shipCheckAreaStatsList = respone.data
        })
      },
      // 市级查询
      getCity() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .supervision {
    padding: 15px;
    .box-card {
      /*height: 410px;*/
      p {
        padding-bottom: 10px;
      }
      .map {
        height: 360px;
        position: relative;
        span {
          cursor: pointer;
          font-size: 10px;
          position: absolute;
        }
      }
    }
    .box-card1 {
      height: 410px;
      p {
        padding-bottom: 10px;
      }
      .top {
        .data {
          display: inline-block;
          padding: 0px;
          margin: 0px;
          li {
            display: inline-block;
            width: 56px;
            height: 28px;
            float: left;
            border: 1px solid #ccc;
            cursor: pointer;
            p {
              padding: 0px;
              text-align: center;
              height: 28px;
              line-height: 28px;
            }
          }
          li:nth-child(1) {
            border-right: none;
          }
          li:nth-child(3) {
            border-left: none;
          }
          .active {
            border: 1px solid #2DB7F5;
            p {
              color: #2DB7F5;
            }
          }
        }
        .list {
          display: inline-block;
          padding: 0px;
          margin: 0px;
          float: right;
          li {
            list-style-type: none;
            display: inline-block;
            height: 21px;
            line-height: 21px;
            float: left;
            padding-left: 6px;
            margin-left: 15px;
          }
        }
      }
    }
    .area {
      cursor: pointer;
    }
  }
</style>
