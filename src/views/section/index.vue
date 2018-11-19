<template>
  <div class="content">
    <div class="top">
      <span>截面选择：</span>
      <el-select v-model="value" placeholder="请选择" :size="mini" @change="changes">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>设备信息：</span>
      <div class="alert" v-for="(item,index) in alert">
        <el-alert
          :title="item.title"
          :type="item.type">
        </el-alert>
      </div>
      <span class="font">当日截面流量：</span>
      <div class="liuliang">
        <span class="s1"> <svg-icon icon-class="top"/></span>
        <span class="num">{{upDirectionCount}}</span>
      </div>
      <div class="liuliang">
        <span class="s1 s2"> <svg-icon icon-class="top"/></span>
        <span class="num">{{downDirectionCount}}</span>
      </div>
    </div>
    <div class="mid">
      <el-row :gutter="15">
        <el-col class="el7" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
          <p class="name"><span>船名：{{shipName}}</span><span></span></p>
          <el-row class="pic">
            <el-col :span="12" v-for="(item,key) in imageUrl" :key="key">
              <Magnifier :src="item.srcall" :src_big="item.imageUrl" :i="key"></Magnifier>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="videos">
            <rtmp :rtmps="rtmps" ref="rtmp"></rtmp>
          </div>
        </el-col>
        <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
          <div class="gis">
            <gis></gis>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-card class="box-card">
      <div class="text item">
        <el-table
          :data="tableData"
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
            prop="name"
            label="船名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="MMSI"
            label="MMSI"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="direction"
            width="50"
            label="航向">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                {{ scope.row.direction
                =='1' ? '上行' : '下行' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="startTimeStr"
            label="进入时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="endTimeStr"
            label="驶离时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="定位终端核查"
            width="110">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                {{ scope.row.shipCheckTaskBeanList[0].status
                =='2' ?
                '通过' :
                '不通过' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="重点跟踪"
            width="80">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                {{ scope.row.shipCheckTaskBeanList[1].status
                =='2' ?
                '通过' :
                '不通过' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="证书核查"
            width="80">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                {{ scope.row.shipCheckTaskBeanList[2].status
                =='2' ?
                '通过' :
                '不通过' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="诚信核查"
            width="80">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                {{ scope.row.shipCheckTaskBeanList[3].status
                =='2' ?
                '通过' :
                '不通过' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="报岗确认"
            width="80">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                {{ scope.row.shipCheckTaskBeanList[4].status =='2' ? '通过' : '不通过' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="适航证书核查"
            width="110">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                {{ scope.row.shipCheckTaskBeanList[5].status
                =='2' ?
                '通过' :
                '不通过' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地图定位"
            width="80">
          </el-table-column>
          <el-table-column
            width="180"
            label="告警处理">
            <template slot-scope="scope">
              <span @click="details(scope.row.id,scope.row.alarmLevel,scope.row.name)">详情</span>
              <span @click="error(scope.row.id,scope.row.name,scope.row.alarmStatus)"
                    v-if="scope.row.alarmLevel===3">| 纠错</span>
              <span @click="Management(scope.row.id,scope.row.alarmLevel,scope.row.name)"
                    v-if="scope.row.alarmStatus===1">|处置</span>
              <span @click="Handle(scope.row.id,scope.row.alarmLevel,scope.row.name)" v-if="scope.row.alarmStatus===2">| 处理</span>
              <span @click="review(scope.row.id,scope.row.alarmLevel,scope.row.name)" v-if="scope.row.alarmStatus===3">| 复核</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>

</template>

<script>
  /* eslint-disable object-curly-spacing,no-unused-vars,no-undef */
  import Magnifier from '@/components/Magnifier/Magnifier'
  import rtmp from '@/components/video/index'
  import {lists, findShipCheckDataByCrossId, findBySectionId, queryByCrossId, findStatusById} from '@/api/Section.js'
  import gis from '@/components/gis'

  export default {
    components: {
      Magnifier,
      rtmp,
      gis
    },
    data() {
      return {
        border: true,
        alert: [],
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        order: '',
        sort: '',
        shipName: '',
        upDirectionCount: '',
        downDirectionCount: '',
        srcall: [],
        imageUrl: [],
        isScale: false,
        tableData: [],
        mini: 'mini',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: '',
        rtmps: '',
        a1: true
      }
    },
    created() {
      this.getSection()
    },
    mounted() {
    },
    methods: {
      changes(val) {
        this.$refs.rtmp.getUser1()
        this.getFindShip()
        this.getVideo()
        this.getshipList()
      },
      tableRowClassName({row, rowIndex}) {
        if (row.alarmLevel === 1) {
          return 'warning-row'
        } else if (row.alarmLevel === 3) {
          return 'success-row'
        }
        return ''
      },
      getSection() {
        lists().then(response => {
          this.options = JSON.parse(JSON.stringify(response.data.dataList).replace(/id/g, 'value').replace(/name/g, 'label'))
          this.value = this.options[0].value
          // this.value = 'HC154'
          this.getFindShip()
          this.getVideo()
          this.getshipList()
        })
      },
      // 核查船舶截面流量信息
      getFindShip() {
        this.imageUrl = []
        findShipCheckDataByCrossId(this.value).then(response => {
          this.downDirectionCount = response.data ? response.data.downDirectionCount : ''
          this.upDirectionCount = response.data ? response.data.upDirectionCount : ''
          this.shipName = response.data ? response.data.shipName : ''
          var arr = response.data ? response.data.captureBeanList : []
          for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
              if (arr[j].type > arr[j + 1].type) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
              }
            }
          }
          arr.forEach((item, index) => {
            var obj = {}
            obj.srcall = item.thumbnailUrl
            obj.imageUrl = item.imageUrl
            this.imageUrl.push(obj)
          })
        })
      },
      // 通过截面ID获得截面相关信息
      getVideo() {
        this.alert = []
        findStatusById(this.value).then(response => {
          response.data.forEach((item, index) => {
            var obj = {}
            if (item.status === 1) {
              obj.title = `${item.desc}:正常`
              obj.type = 'success'
            } else {
              obj.title = `${item.desc}:异常`
              obj.type = 'error'
            }
            this.alert.push(obj)
          })
        })
        findBySectionId(this.value).then(response => {
          this.rtmps = response.data.rtmp
          this.$refs.rtmp.getUser(this.rtmps)
        })
      },
      // 通过截面ID获得船舶信息列表
      getshipList() {
        queryByCrossId(this.value, this.page.pageNum, this.page.pageSize, this.order, this.sort).then(response => {
          this.tableData = response.data.dataList
        })
      },
      details(id, alarmLevel, name) {
        if (alarmLevel === 1) {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 3,
              active: 3,
              name: name
            }
          })
        } else if (alarmLevel === 3) {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 3,
              active: 3,
              name: name
            }
          })
        } else if (alarmLevel === 4) {
          this.$router.push({
            name: 'GrennAlarmDisposal',
            params: {
              id: id,
              name: name
            }
          })
        }
      },
      Management(id, alarmLevel, name) {
        if (alarmLevel === 1) {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 0,
              active: 1,
              name: name
            }
          })
        } else if (alarmLevel === 3) {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 0,
              active: 1,
              name: name
            }
          })
        }
      },
      Handle(id, alarmLevel, name) {
        if (alarmLevel === 1) {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 1,
              active: 2,
              name: name
            }
          })
        } else if (alarmLevel === 3) {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 1,
              active: 2,
              name: name
            }
          })
        }
      },
      review(id, alarmLevel, name) {
        if (alarmLevel === 1) {
          this.$router.push({
            name: 'AlarmDisposal',
            params: {
              id: id,
              type: 2,
              active: 3,
              name: name
            }
          })
        } else if (alarmLevel === 3) {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 2,
              active: 3,
              name: name
            }
          })
        }
      },
      error(id, name, alarmStatus) {
        if (alarmStatus === 1) {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 0,
              active: 1,
              name: name,
              error: 1
            }
          })
        } else if (alarmStatus === 2) {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 1,
              active: 2,
              name: name,
              error: 1
            }
          })
        } else if (alarmStatus === 3) {
          this.$router.push({
            name: 'RedAlarmDisposal',
            params: {
              id: id,
              type: 2,
              active: 3,
              name: name,
              error: 1
            }
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content {
    padding: 15px;
    .top {
      /*height: 70px;*/
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 30px;
      padding-right: 30px;
      height: 70px;
      span {
        font-size: 13px;
      }
      .font {
        margin-left: 10px;
      }
      .alert {
        /*width: 146px;*/
        /*height: 28px;*/
        margin-left: 5px;
        display: inline-block;
      }
      .liuliang {
        display: inline-block;
        width: 98px;
        height: 28px;
        font-size: 0;
        .s1 {
          display: inline-block;
          width: 32px;
          float: left;
          height: 28px;
          line-height: 28px;
          text-align: center;
          font-size: 14px;
          background: #E9E9E9;
          .svg-icon {
            width: 2.8em;
          }
        }
        .num {
          float: left;
          font-size: 14px;
          display: inline-block;
          width: 63px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 1px solid #e9e9e9;
        }
        .s2 {
          transform: rotate(180deg);
          -ms-transform: rotate(180deg); /* IE 9 */
          -webkit-transform: rotate(180deg); /* Safari and Chrome */
        }
      }
    }
    .mid {
      margin-top: 15px;
      .name {
        border-left: 7px solid #01579B;
        margin: 0;
        height: 30px;
        line-height: 30px;
        background: #f5f5f5;
        padding-left: 16px;
        span {
          font-size: 16px;
          color: #666;
        }
      }
      .el7 {
      }
      .pic {
        padding: 10px;
        height: 322px;
        background: #fff;
        .el-col {
          padding: 2px 5px;
          height: 150px;
        }

      }
      .gis {
        height: 352px;
        div {
          height: 100%;
        }
        img {
          width: 100%;
          height: 352px;
        }
      }
    }
    .box-card {
      margin-top: 15px;
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
      z-index: 9999;
    }
    .active {
      background: #00CD66;
      color: #fff;
    }
    .cell {
      span {
        cursor: pointer;
      }
    }
  }

  /*.video-js {*/
  /*width: 100%;*/
  /*height: 350px;*/
  /*}*/
</style>
