<template>
  <div class="statistics">
    <el-row :gutter="15">
      <el-col :span="9">
        <el-card class="box-card">
          <p>视频监控</p>
          <div class="videos">
            <rtmp :rtmps="rtmps" ref="rtmp"></rtmp>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card class="box-card1">
          <p>船舶信息</p>
          <div class="shipMsg">
            <el-row>
              <el-col style="font-size:36px;" :span="12">{{msg.name}}</el-col>
              <el-col style="font-size:16px;" :span="12">监测时间：{{msg.startTimeStr}}</el-col>
            </el-row>
            <el-row style="margin-top: 26px;">
              <el-col style="font-size:24px;" :span="8">MMSI:{{msg.mmsi}}</el-col>
              <el-col style="font-size:24px;" :span="8">船舶类型:{{msg.shipType==='1'?'客船':msg.shipType==='2'?'货船':msg.shipType==='3'?'危险品船':'其他'}}</el-col>
              <el-col style="font-size:24px;" :span="8">航向:{{msg.direction =='1' ? '上行' : '下行' }}</el-col>
            </el-row>
            <el-row style="margin-top: 54px;" class="three">
              <el-col :span="5">
                <p>AIS核查</p>
                <div>
                  <svg-icon v-if="num5" icon-class="success"></svg-icon>
                  <svg-icon v-if="!num5" icon-class="wrong"></svg-icon>
                </div>
              </el-col>
              <el-col :span="5">
                <p>重点跟踪</p>
                <div>
                  <svg-icon v-if="num4" icon-class="success"></svg-icon>
                  <svg-icon v-if="!num4" icon-class="wrong"></svg-icon>
                </div>
              </el-col>
              <el-col :span="5">
                <p>证书核查</p>
                <div>
                  <svg-icon v-if="num1" icon-class="success"></svg-icon>
                  <svg-icon v-if="!num1" icon-class="wrong"></svg-icon>
                </div>
              </el-col>
              <el-col :span="5">
                <p>违章核查</p>
                <div>
                  <svg-icon v-if="num2" icon-class="success"></svg-icon>
                  <svg-icon v-if="!num2" icon-class="wrong"></svg-icon>
                </div>
              </el-col>
              <el-col :span="4">
                <p>电子报告</p>
                <div>
                  <svg-icon v-if="num6" icon-class="success"></svg-icon>
                  <svg-icon v-if="!num6" icon-class="wrong"></svg-icon>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="table">
      <el-card class="box-card">
        <p>卡口船舶列表 <span @click="more" style="float: right; cursor: pointer;">更多>></span></p>
        <div class="text item" v-if="dataList">
          <el-table
            :data="dataList"
            :border="border"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              label="序号"
              width="60">
              <template slot-scope="scope">
                <span @click="rowclick(scope.row)">{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="船名"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span @click="rowclick(scope.row)" style="display: block; height:23px; width: 100%;">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mmsi"
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
              label="监督时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="80"
              label="核查结果">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.status===2 ? '通过' : '不通过' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="核查不通过内容">
              <template slot-scope="scope">
                <div v-if="scope.row.status!==2" slot="reference" class="name-wrapper">
                  {{ scope.row.num5 ? '' : 'AIS核查不通过' }}
                  {{ scope.row.num1 ? '' : '证书核查不通过' }}
                  {{ scope.row.num2 ? '' : '船舶违章不通过' }}
                  {{ scope.row.num3 ? '' : '协查船舶不通过' }}
                  {{ scope.row.num4 ? '' : '重点跟踪不通过' }}
                  {{ scope.row.num6 ? '' : '船舶电子报告不通过' }}
                  {{ scope.row.num7 ? '' : '船舶污染上岸不通过' }}
                  {{ scope.row.num8 ? '' : '生活污染上岸不通过' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="地图定位"
              width="80">
              <template slot-scope="scope">
                <svg-icon icon-class="dingwei" @click.native="dingwei(scope.row.name)"></svg-icon>
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

  import rtmp from '@/components/video/index'
  import {getRtmp, getList} from '@/api/statistics'

  export default {
    components: {
      rtmp
    },
    data() {
      return {
        times: null,
        id: null,
        name: null,
        rtmps: '',
        border: true,
        dataList: null,
        msg: {},
        num1: false,
        num2: false,
        num3: false,
        num4: false,
        num5: false,
        num6: false,
        num7: false,
        num8: false
      }
    },
    created() {
      this.times = setInterval(() => {
        this.getRtmps()
        this.getlist()
      }, 3000)
    },
    mounted() {
      this.getRtmps()
      this.getlist()
    },
    beforeRouteLeave(to, from, next) {
      next()
      clearInterval(this.times)
    },
    methods: {
      dingwei(name) {
        this.$router.push({
          name: 'levelOne',
          query: {
            name: name
          }
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (parseInt(row.status) !== 2) {
          return 'success-row'
        } else {
          // return 'success-row'
        }
        return ''
      },
      getRtmps() {
        this.name = this.$route.query.id
        getRtmp(this.name).then(response => {
          this.rtmps = response.data.rtmp
          this.$refs.rtmp.getUser(this.rtmps)
        })
      },
      getlist() {
        this.name = this.$route.query.id
        getList(this.name).then(response => {
          this.dataList = response.data.dataList
          this.getData()
          this.msg = this.dataList[0]
          if (this.msg.shipCheckTaskBeanList) {
            this.msg.shipCheckTaskBeanList.forEach((item, index) => {
              switch (item.itemName) {
                case '证书失效警示':
                  if (item.status === 2) {
                    this.num1 = true
                  }
                  break
                case '船舶违章警示':
                  if (item.status === 2) {
                    this.num2 = true
                  }
                  break
                case '协查船舶警示':
                  if (item.status === 2) {
                    this.num3 = true
                  }
                  break
                case '重点跟踪船舶警示':
                  if (item.status === 2) {
                    this.num4 = true
                  }
                  break
                case 'AIS核查':
                  if (item.status === 2) {
                    this.num5 = true
                  }
                  break
                case '船舶电子报告核查':
                  if (item.status === 2) {
                    this.num6 = true
                  }
                  break
                case '船舶污染物上岸监督':
                  if (item.status === 2) {
                    this.num7 = true
                  }
                  break
                case '船舶污水柜监督':
                  if (item.status === 2) {
                    this.num8 = true
                  }
                  break
              }
            })
          }
        })
      },
      getData() {
        if (this.dataList.length > 0) {
          this.dataList.forEach((item, index) => {
            item.num1 = true
            item.num2 = true
            item.num3 = true
            item.num4 = true
            item.num5 = true
            item.num6 = true
            item.num7 = true
            item.num8 = true
            item.shipCheckTaskBeanList.forEach((items, indexs) => {
              switch (items.itemName) {
                case '证书失效警示':
                  if (items.status !== 2) {
                    item.num1 = false
                  }
                  break
                case '船舶违章警示':
                  if (items.status !== 2) {
                    item.num2 = false
                  }
                  break
                case '协查船舶警示':
                  if (items.status !== 2) {
                    item.num3 = false
                  }
                  break
                case '重点跟踪船舶警示':
                  if (items.status !== 2) {
                    item.num4 = false
                  }
                  break
                case 'AIS核查':
                  if (items.status !== 2) {
                    item.num5 = false
                  }
                  break
                case '船舶电子报告核查':
                  if (items.status !== 2) {
                    item.num6 = false
                  }
                  break
                case '船舶污染物上岸监督':
                  if (items.status !== 2) {
                    item.num7 = false
                  }
                  break
                case '船舶污水柜监督':
                  if (items.status !== 2) {
                    item.num8 = false
                  }
                  break
              }
            })
          })
        }
      },
      more() {
        this.$router.push(
          {
            name: 'kakouList',
            query: {
              id: this.name
            }
          }
        )
      },
      rowclick(row, event, column) {
        this.link(row.id, row.name)
      },
      link(id, name) {
        this.$router.push({
          name: 'kakouDetails',
          query: {
            id: id,
            name: name
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .statistics {
    padding: 15px;
    .box-card {
      /*height: 396px;*/
      p {
        padding-bottom: 10px;
      }
    }
    .box-card1 {
      height: 396px;
      p {
        padding-bottom: 10px;
      }
    }
    .shipMsg {
      margin-top: 36px;
    }
    .three {
      p {
        font-size: 24px;
      }
      svg {
        font-size: 56px;
        margin-top: 36px;
      }
      .el-col {
        text-align: center;
      }
    }
    .table {
      margin-top: 10px;
    }
    .svg-icon {
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
