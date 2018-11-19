<template>
  <div class="roleModification">
    <ifra v-show="false"></ifra>
    <el-form ref="form" :model="form" label-width="200px" label-suffix=":">
      <div class="head">基本信息：</div>
      <el-form-item label="设备唯一编码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所在航段">
        <el-input v-model="form.segment"></el-input>
      </el-form-item>
      <el-form-item label="经度 ">
        <el-input v-model="form.longitude"></el-input>
        <svg-icon icon-class="dingwei" @click.native="modgis()" style="cursor: pointer; font-size: 15px;"></svg-icon>
      </el-form-item>
      <el-form-item label="立杆高度">
        <el-input v-model="form.poleHeight"></el-input>
      </el-form-item>
      <el-form-item label="纬度 ">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="监控类型">
        <!--<el-input v-model="form.surveillanceType"></el-input>-->
        <el-select v-model="form.surveillanceType" placeholder="请选择">
          <el-option
            v-for="item in sur"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="探头类型">
        <!--<el-input v-model="form.probeType"></el-input>-->
        <el-select v-model="form.probeType" placeholder="请选择">
          <el-option
            v-for="item in pro"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有云台">
        <!--<el-input v-model="form.yuntaiFlag"></el-input>-->
        <el-select v-model="form.yuntaiFlag" placeholder="请选择">
          <el-option
            v-for="item in yun"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摄像机品牌型号">
        <el-input v-model="form.brand"></el-input>
      </el-form-item>
      <div class="head">网络信息：</div>
      <el-form-item label="IP地址">
        <el-input v-model="form.ipAdress"></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="form.port"></el-input>
      </el-form-item>
      <el-form-item label="通道号">
        <el-input v-model="form.channel"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="直播地址（RTMP）">
        <el-input v-model="form.rtmp"></el-input>
      </el-form-item>
      <el-form-item label="直播地址（RTSP）">
        <el-input v-model="form.rtsp"></el-input>
      </el-form-item>
      <div class="head">维护信息：</div>
      <el-form-item label=" 行政市">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="行政区">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="所属海事机构">
        <el-input v-model="form.agency"></el-input>
      </el-form-item>
      <el-form-item label="业主单位名称">
        <el-input v-model="form.unitName"></el-input>
      </el-form-item>
      <el-form-item label="安装日期">
        <!--<el-input v-model="form.installDate"></el-input>-->
        <el-date-picker
          v-model="form.installDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="维护责任人">
        <el-input v-model="form.maintenanceOwner"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.telphone"></el-input>
      </el-form-item>
      <el-form-item label="巡查里程">
        <el-input v-model="form.patrolMileage"></el-input>
      </el-form-item>
      <el-form-item label="是否重要航路">
        <!--<el-input v-model="form.importantRoute"></el-input>-->
        <el-select v-model="form.importantRoute" placeholder="请选择">
          <el-option
            v-for="item in imp"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 是否锚地、停泊区">
        <!--<el-input v-model="form.parkingArea"></el-input>-->
        <el-select v-model="form.parkingArea" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否施工作业区">
        <!--<el-input v-model="form.workArea"></el-input>-->
        <el-select v-model="form.workArea" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否客运码头、渡口">
        <!--<el-input v-model="form.pier"></el-input>-->
        <el-select v-model="form.pier" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否抛泥区">
        <!--<el-input v-model="form.dumpingArea"></el-input>-->
        <el-select v-model="form.dumpingArea" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否危险品码头、装卸作业区">
        <!--<el-input v-model="form.dangerousPier"></el-input>-->
        <el-select v-model="form.dangerousPier" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否桥(坝)区">
        <!--<el-input v-model="form.bridge"></el-input>-->
        <el-select v-model="form.bridge" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否其他">
        <!--<el-input v-model="form.other"></el-input>-->
        <el-select v-model="form.other" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 服务器编码">
        <el-input v-model="form.serverCode"></el-input>
      </el-form-item>
      <div class="head">其他：</div>
      <el-form-item label="状态">
      <!--<el-input v-model="form.status"></el-input>-->
      <el-select v-model="form.status" placeholder="请选择">
      <el-option
      v-for="item in sta"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="备注 ">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div class="but">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor,object-curly-spacing,no-empty,space-before-function-paren,no-unused-vars */
  import ifra from '@/components/iframe'
  import {mod} from '@/api/Monitor.js'

  export default {
    components: {
      ifra
    },
    data() {
      return {
        form: {
          id: '',
          name: '',
          longitude: '',
          latitude: '',
          surveillanceType: '',
          probeType: '',
          yuntaiFlag: '',
          segment: '',
          poleHeight: '',
          brand: '',
          ipAdress: '',
          port: '',
          channel: '',
          password: '',
          status: '',
          rtmp: '',
          rtsp: '',
          installDate: '',
          maintenanceOwner: '',
          telphone: '',
          city: '',
          code: '',
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
          userName: '',
          serverCode: '',
          remark: ''
        },
        sur: [{
          value: '1',
          label: '枪机'
        }, {
          value: '2',
          label: '球机'
        }],
        pro: [{
          value: '1',
          label: '可见光'
        }, {
          value: '2',
          label: '红外'
        }, {
          value: '3',
          label: '微光'
        }, {
          value: '4',
          label: '其他'
        }],
        yun: [{
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        sta: [{
          value: '0',
          label: '正常'
        }, {
          value: '1',
          label: '维修'
        }],
        imp: [{
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        par: [{
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        show: false,
        coordinate: []
      }
    },
    created() {
      this.getQuery()
    },
    props: ['mul', 'disabled'],
    mounted() {
      this.getgis()
    },
    methods: {
      getQuery() {
        if (this.mul.length !== 0) {
          this.form = this.mul
        }
      },
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      },
      // 保存
      onSubmit() {
        mod(this.form).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.show = true
            this.$emit('ievent', this.show)
          }
        })
      },
      modgis() {
        if (this.form.longitude) {
          setTimeout(() => {
            $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/coor/coorMap.html?type=Point&precoor=' + this.form.longitude + ',' + this.form.latitude, 'width=1200,height=500,top=100px,left=200px')
          }, 0)
        } else {
          setTimeout(() => {
            $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/coor/coorMap.html?type=Point&precoor=nocoor', 'width=1200,height=500,top=100px,left=200px')
          }, 0)
        }
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .roleModification {
    /*margin-left: 30%;*/
    .el-tree {
      display: inline-block;
      width: 180px;
    }
    .demo-input-suffix {
      margin-top: 10px;
      span {
        display: inline-block;
        width: 120px;
      }
      .el-textarea {
        width: 423px;
      }

    }
    .el-row {
      margin-left: 120px;
      margin-top: 20px;
    }
    .head{
      height: 30px;
      padding-left: 30px;
    }
  }
</style>
