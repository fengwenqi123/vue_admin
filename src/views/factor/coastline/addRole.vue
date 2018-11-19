<template>
  <div class="roleModification">
    <ifra v-show="false"></ifra>
    <el-form ref="form" :model="form" label-width="210px" label-suffix=":">
      <el-form-item label="码头编号 ">
        <el-input v-model="form.pierNo"></el-input>
      </el-form-item>
      <el-form-item label="中文名称全称 ">
        <el-input v-model="form.fullName"></el-input>
      </el-form-item>
      <el-form-item label="中文名称简称 ">
        <el-input v-model="form.shortName"></el-input>
      </el-form-item>
      <el-form-item label="英文名称全称">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
      <el-form-item label="所属海事机构  ">
        <el-input v-model="form.maritimeAgency"></el-input>
      </el-form-item>
      <el-form-item label="所属港口">
        <el-input v-model="form.port"></el-input>
      </el-form-item>
      <el-form-item label="范围  ">
        <el-input v-model="form.scope"></el-input>
      </el-form-item>
      <el-form-item label="经度  ">
        <el-input v-model="form.longitude"></el-input>
        <svg-icon icon-class="dingwei" @click.native="modgis()" style="cursor: pointer; font-size: 15px;"></svg-icon>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="码头长度  ">
        <el-input v-model="form.pierLength"></el-input>
      </el-form-item>
      <el-form-item label="泊位数量  ">
        <el-input v-model="form.berthNum"></el-input>
      </el-form-item>
      <el-form-item label="码头建造日期 ">
        <!--<el-input v-model="form.buildDate"></el-input>-->
        <el-date-picker
          v-model="form.buildDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="码头单位名称">
        <el-input v-model="form.unitName"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="VTS信号覆盖情况  ">
        <el-input v-model="form.vts"></el-input>
      </el-form-item>
      <el-form-item label="AIS信号覆盖情况 ">
        <el-input v-model="form.ais"></el-input>
      </el-form-item>
      <el-form-item label="CCTV信号覆盖情况 ">
        <el-input v-model="form.cctv"></el-input>
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
  import {mod} from '@/api/wharf.js'

  export default {
    components: {
      ifra
    },
    data() {
      return {
        form: {
          id: '',
          pierNo: '',
          fullName: '',
          shortName: '',
          englishName: '',
          maritimeAgency: '',
          port: '',
          scope: '',
          longitude: '',
          latitude: '',
          pierLength: '',
          berthNum: '',
          buildDate: '',
          unitName: '',
          contact: '',
          telephone: '',
          vts: '',
          ais: '',
          cctv: '',
          remark: ''
        },
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
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/coor/coorMap.html?type=Point&precoor=' + this.form.longitude + ',' + this.form.latitude, 'width=1200,height=500,top=100px,left=200px')
        } else {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/coor/coorMap.html?type=Point&precoor=nocoor', 'width=1200,height=500,top=100px,left=200px')
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
  }
</style>
