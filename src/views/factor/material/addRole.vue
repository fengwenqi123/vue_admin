<template>
  <div class="roleModification">
    <ifra v-show="false"></ifra>
    <el-form ref="form" :model="form" label-width="210px" label-suffix=":">
      <el-form-item label="编码 ">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="站点名称">
        <el-input v-model="form.siteName"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="form.longitude"></el-input>
        <svg-icon icon-class="dingwei" @click.native="modgis()" style="cursor: pointer; font-size: 15px;"></svg-icon>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="值班电话">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="行政市">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="行政区">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="编内">
        <el-input v-model="form.fullTime"></el-input>
      </el-form-item>
      <el-form-item label="编外">
        <el-input v-model="form.pluralism"></el-input>
      </el-form-item>
      <el-form-item label="备注">
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
  import {mod} from '@/api/material.js'

  export default {
    components: {
      ifra
    },
    data() {
      return {
        form: {
          id: '',
          code: '',
          type: '',
          siteName: '',
          longitude: '',
          latitude: '',
          contact: '',
          telephone: '',
          city: '',
          area: '',
          fullTime: '',
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
