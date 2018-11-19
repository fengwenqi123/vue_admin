<template>
  <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" label-suffix="：" size="mini">
    <el-form-item label="区域名称">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="区域位置">
      <el-button type="primary" @click.native="drawArea">绘制区域</el-button>
    </el-form-item>
    <el-form-item label="航向设置">
      <el-button type="primary" @click.native="drawArrow">设置上行</el-button>
    </el-form-item>
    <el-form-item label="区域描述">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="formLabelAlign.description">
      </el-input>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing,space-before-function-paren,no-undef */

  import {add} from '@/api/Rsupervise.js'

  export default {
    props: ['val'],
    data() {
      return {
        autosize: {
          minRows: 8,
          maxRows: 20
        },
        labelPosition: 'right',
        formLabelAlign: {
          id: null,
          name: null,
          area: this.areas,
          direction: this.arrowangle,
          description: null,
          type: 1,
          status: 1
        },
        area: null,
        direction: null
      }
    },
    created() {
      this.getQuery()
      this.getArea()
      this.getArrowangle()
    },
    methods: {
      getQuery() {
        if (this.val !== '') {
          this.formLabelAlign = this.val
          setTimeout(() => {
            $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.addPreMonitorArea(this.formLabelAlign.area)
          }, 800)
        }
      },
      addfrom() {
        add(this.formLabelAlign.id, this.formLabelAlign.name, this.area, this.direction, this.formLabelAlign.description, this.formLabelAlign.type, this.formLabelAlign.status).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.$emit('iform', true)
          }
        })
      },
      getArea() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'area') {
            _this.area = e.data.msg.name
          }
        }, false)
      },
      getArrowangle() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'arrowangle') {
            _this.direction = e.data.msg.name
          }
        }, false)
      },
      // 绘制区域
      drawArea() {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.drawArea()
        }, 0)
      },
      drawArrow() {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.drawArrow()
        }, 0)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
