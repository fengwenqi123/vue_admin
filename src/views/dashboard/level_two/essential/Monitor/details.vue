<template>
  <div class="details">
    <div class="main">
      <div class="top">
        <div class="title">
          <span class="h3">{{obj.name}}</span>
          <span class="back" @click="back">返回</span>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>联系人：</span><span>{{obj.maintenanceOwner}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>经度：</span><span>{{obj.longitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>电话：</span><span>{{obj.telphone}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>纬度：</span><span>{{obj.latitude}}</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="lab">
        <el-card class="box-card">
          <div class="text item">
            <p class="tit"><span>基本信息</span><span @click="mod()">修改>></span></p>
            <ul>
              <li>
                <p>
                  <span>所属海事机构</span><span>{{obj.agency}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>业主单位名称</span>{{obj.unitName}}<span></span>
                </p>
              </li>
              <li>
                <p>
                  <span>巡查里程</span>{{obj.patrolMileage}}<span></span>
                </p>
              </li>
              <li>
                <p>
                  <span>服务器编码</span>{{obj.serverCode}}<span></span>
                </p>
              </li>
              <li>
                <p>
                  <span>备注 </span>{{obj.remark}}<span></span>
                </p>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-scrollbar class="scrolls">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经度 " :label-width="formLabelWidth">
            <el-input v-model="form.longitude"></el-input>
            <svg-icon icon-class="dingwei" @click.native="modgis()" style="cursor: pointer; font-size: 15px;"></svg-icon>
          </el-form-item>
          <el-form-item label="纬度 " :label-width="formLabelWidth">
            <el-input v-model="form.latitude"></el-input>
          </el-form-item>
          <el-form-item label="监控类型{枪机、球机} " :label-width="formLabelWidth">
            <el-input v-model="form.surveillanceType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="探头类型 " :label-width="formLabelWidth">
            <el-input v-model="form.probeType"></el-input>
          </el-form-item>
          <el-form-item label="是否有云台 " :label-width="formLabelWidth">
            <el-input v-model="form.yuntaiFlag"></el-input>
          </el-form-item>
          <el-form-item label="所在航段" :label-width="formLabelWidth">
            <el-input v-model="form.segment" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="立杆高度 " :label-width="formLabelWidth">
            <el-input v-model="form.poleHeight"></el-input>
          </el-form-item>
          <el-form-item label="摄像机品牌型号 " :label-width="formLabelWidth">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item label="IP地址" :label-width="formLabelWidth">
            <el-input v-model="form.ipAdress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="端口 " :label-width="formLabelWidth">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
          <el-form-item label=" 通道号 " :label-width="formLabelWidth">
            <el-input v-model="form.channel"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码 " :label-width="formLabelWidth">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="状态 " :label-width="formLabelWidth">
            <el-input v-model="form.status"></el-input>
          </el-form-item>
          <el-form-item label="直播地址rtmp" :label-width="formLabelWidth">
            <el-input v-model="form.rtmp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="直播地址rtsp" :label-width="formLabelWidth">
            <el-input v-model="form.rtsp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="安装日期 " :label-width="formLabelWidth">
            <el-input v-model="form.installDate"></el-input>
          </el-form-item>
          <el-form-item label="维护责任人" :label-width="formLabelWidth">
            <el-input v-model="form.maintenanceOwner"></el-input>
          </el-form-item>
          <el-form-item label="联系电话 " :label-width="formLabelWidth">
            <el-input v-model="form.telphone"></el-input>
          </el-form-item>
          <el-form-item label="设备唯一编码 " :label-width="formLabelWidth">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="行政市 " :label-width="formLabelWidth">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="行政区" :label-width="formLabelWidth">
            <el-input v-model="form.area"></el-input>
          </el-form-item>
          <el-form-item label="所属海事机构 " :label-width="formLabelWidth">
            <el-input v-model="form.agency"></el-input>
          </el-form-item>
          <el-form-item label=" 业主单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.unitName"></el-input>
          </el-form-item>
          <el-form-item label="巡查里程 " :label-width="formLabelWidth">
            <el-input v-model="form.patrolMileage"></el-input>
          </el-form-item>
          <el-form-item label="是否重要航路" :label-width="formLabelWidth">
            <el-input v-model="form.importantRoute"></el-input>
          </el-form-item>
          <el-form-item label="是否锚地、停泊区 " :label-width="formLabelWidth">
            <el-input v-model="form.parkingArea"></el-input>
          </el-form-item>
          <el-form-item label="是否施工作业区" :label-width="formLabelWidth">
            <el-input v-model="form.workArea"></el-input>
          </el-form-item>
          <el-form-item label="是否客运码头、渡口 " :label-width="formLabelWidth">
            <el-input v-model="form.pier"></el-input>
          </el-form-item>
          <el-form-item label="是否抛泥区" :label-width="formLabelWidth">
            <el-input v-model="form.dumpingArea"></el-input>
          </el-form-item>
          <el-form-item label="是否危险品码头、装卸作业区 " :label-width="formLabelWidth">
            <el-input v-model="form.dangerousPier"></el-input>
          </el-form-item>
          <el-form-item label="是否桥(坝)区" :label-width="formLabelWidth">
            <el-input v-model="form.bridge"></el-input>
          </el-form-item>
          <el-form-item label="是否其他（默认） " :label-width="formLabelWidth">
            <el-input v-model="form.other"></el-input>
          </el-form-item>
          <el-form-item label=" 服务器编码 " :label-width="formLabelWidth">
            <el-input v-model="form.serverCode"></el-input>
          </el-form-item>
          <el-form-item label="备注  " :label-width="formLabelWidth">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,space-before-function-paren,no-undef */

  import {mod} from '@/api/Monitor.js'

  export default {
    props: ['objitem'],
    data() {
      return {
        flag: true,
        obj: this.objitem,
        dialogFormVisible: false,
        form: {
          id: '',
          name: '',
          longitude: '',
          latitude: '',
          surveillanceType: '',
          probeType: null,
          yuntaiFlag: null,
          segment: '',
          poleHeight: '',
          brand: '',
          ipAdress: '',
          port: '',
          channel: '',
          userName: null,
          password: null,
          status: '',
          rtmp: '',
          rtsp: '',
          maintenanceOwner: '',
          telphone: '',
          city: '',
          area: '',
          agency: '',
          unitName: '',
          patrolMileage: '',
          importantRoute: '',
          parkingArea: '',
          workArea: '',
          pier: '',
          dumpingArea: '',
          dangerousPier: '',
          bridge: '',
          other: '',
          serverCode: '',
          remark: ''
        },
        formLabelWidth: '220px',
        coordinate: []
      }
    },
    mounted() {
      this.getgis()
    },
    methods: {
      back() {
        this.$emit('back', this.flag)
      },
      mod() {
        this.dialogFormVisible = true
        this.form = JSON.parse(JSON.stringify(this.obj))
      },
      sure() {
        mod(this.form).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.dialogFormVisible = false
            this.obj = this.form
          }
        })
      },
      cancel() {
        this.form = this.obj
        this.dialogFormVisible = false
      },
      modgis() {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/coor/coorMap.html?type=Point', 'width=1200,height=500,top=100px,left=200px')
        }, 0)
      },
      getgis() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'modgis') {
            _this.coordinate = e.data.msg.coordinate
            _this.form.longitude = _this.coordinate[0]
            _this.form.latitude = _this.coordinate[1]
          }
        }, false)
      }
    }
  }
</script>

<style scoped lang="scss">
  .details {
    .el-scrollbar__wrap {
      height: 500px;
    }
    margin-top: 10px;
    .main {
      .top {
        padding: 24px 20px;
        background: #01579B;
        .title {
          display: flex;
          align-items: center;
          .h3 {
            display: inline-block;
            font-size: 26px;
            padding: 0px;
            color: #fff;
            margin: 0px;
            width: 370px;
            flex: 1;
          }
          .back {
            display: inline-block;
            width: 56px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            color: #01579B;
            background: #fff;
            margin-left: 10px;
            font-size: 10px;
            cursor: pointer;
          }
        }
        .con {
          margin-top: 20px;
          .grid-content {
            span {
              display: inline-block;
              font-size: 14px;
              margin: 3px 0;
              color: #fff;
            }
            span:nth-child(2) {
              margin-left: 6px;
            }
          }
        }
      }
      .lab {
        .tit {
          padding-left: 20px;
          color: #9B9B9B;
          font-size: 15px;
          span:nth-child(2) {
            float: right;
            margin-right: 15px;
            cursor: pointer;
          }
        }
        ul {
          li {
            border-bottom: 1px solid #EAEAEA;
            height: 45px;
            line-height: 45px;
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              width: 170px;
              text-align: center;
            }
          }
        }
      }
    }
  }

</style>
