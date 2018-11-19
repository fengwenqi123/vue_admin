<template>
  <div class="roleModification">
    <ifra v-show="false"></ifra>
    <el-form ref="form" :model="form" label-width="210px" label-suffix=":">
      <el-form-item label="名称 ">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="IP地址 ">
        <el-input v-model="form.ipaddress"></el-input>
      </el-form-item>
      <el-form-item label="品牌 ">
        <el-input v-model="form.mfrs"></el-input>
      </el-form-item>
      <el-form-item label="	经度">
        <el-input v-model="form.lon"></el-input>
        <svg-icon icon-class="dingwei" @click.native="modgis()" style="cursor: pointer; font-size: 15px;"></svg-icon>
      </el-form-item>
      <el-form-item label=" 	纬度  ">
        <el-input v-model="form.lat"></el-input>
      </el-form-item>
      <el-form-item label="	建设单位">
        <el-input v-model="form.jsdw"></el-input>
      </el-form-item>
      <el-form-item label="设备清单  ">
        <el-input v-model="form.sbqd"></el-input>
      </el-form-item>
      <el-form-item label="	是否有数据">
        <!--<el-input v-model="form.isdata"></el-input>-->
        <el-select v-model="form.isdata" placeholder="请选择">
          <el-option
            v-for="item in pro"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="	AIS数据源监控">
        <el-input v-model="form.aisdsmonitor"></el-input>
      </el-form-item>
      <el-form-item label="最远距离(m)  ">
        <el-input v-model="form.limitdis"></el-input>
      </el-form-item>
      <el-form-item label="最远经纬度  ">
        <el-input v-model="form.limitcoor"></el-input>
      </el-form-item>
      <el-form-item label="	情况 ">
        <el-input v-model="form.datastatment"></el-input>
      </el-form-item>
      <el-form-item label="	原来不通的原因">
        <el-input v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item label="业主单位名称">
        <el-input v-model="form.unitName"></el-input>
      </el-form-item>
      <el-form-item label="	位置">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.telephone"></el-input>
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
  import {mod} from '@/api/AIS.js'

  export default {
    components: {
      ifra
    },
    data() {
      return {
        form: {
          id: '',
          name: '',
          ipaddress: '',
          mfrs: '',
          jsdw: '',
          sbqd: '',
          lon: '',
          lat: '',
          isdata: '',
          aisdsmonitor: '',
          limitdis: '',
          limitcoor: '',
          datastatment: '',
          reason: '',
          unitName: '',
          position: '',
          contact: '',
          remark: '',
          telephone: ''
        },
        pro: [
          {
            value: '0',
            label: '是'
          },
          {
            value: '1',
            label: '否'
          }
        ],
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
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/coor/coorMap.html?type=Point', 'width=1200,height=500,top=100px,left=200px')
        }, 0)
      },
      getgis() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'modgis') {
            _this.coordinate = e.data.msg.coordinate
            _this.form.lon = _this.coordinate[0]
            _this.form.lat = _this.coordinate[1]
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
  }
</style>
