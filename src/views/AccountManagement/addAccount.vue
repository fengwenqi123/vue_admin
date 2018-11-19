<template>
  <div class="addAccount">
    <div class="demo-input-suffix">
      <span>登录名：</span>
      <el-input
        placeholder="请输入登录名"
        v-model="loginName"
        :disabled="disabled"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>名称：</span>
      <el-input
        placeholder="请输入名称"
        v-model="name"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>手机：</span>
      <el-input
        placeholder="请输入手机"
        v-model="mobile"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>备注：</span>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入备注"
        v-model="description">
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>状态：</span>
      <el-radio v-model="status" label="1">启用</el-radio>
      <el-radio v-model="status" label="2">禁用</el-radio>
    </div>
    <el-row>
      <el-button type="success" @click="submit">
        保存
      </el-button>
      <el-button @click="cancel">
        取消
      </el-button>

    </el-row>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {add} from '@/api/AccountManagement'

  export default {
    data() {
      return {
        show: null,
        id: '',
        loginName: '',
        name: '',
        mobile: '',
        description: '',
        status: '1'
      }
    },
    props: ['mul', 'disabled'],
    created() {
      if (this.mul.length !== 0) {
        this.id = this.mul.id
        this.loginName = this.mul.loginName
        this.name = this.mul.name
        this.mobile = this.mul.mobile
        this.description = this.mul.description
        this.status = this.mul.status.toString()
      }
    },
    methods: {
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      },
      submit() {
        if (!this.loginName) {
          this.$message({
            message: '请填写登录名'
          })
          return
        }
        if (!this.name) {
          this.$message({
            message: '请填写名称'
          })
          return
        }
        if (!this.mobile) {
          this.$message({
            message: '请填写手机号'
          })
          return
        }
        if (!this.status) {
          this.$message({
            message: '请选择状态'
          })
          return
        }
        if (!this.description) {
          this.$message({
            message: '请填写备注'
          })
          return
        }
        add(this.id, this.loginName, this.name, this.mobile, this.status, this.description).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.show = true
              this.$emit('ievent', this.show)
            }, 0)
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .addAccount {
    margin-left: 30%;
    .demo-input-suffix {
      margin-top: 10px;
      span {
        display: inline-block;
        width: 120px;
      }
      .el-input__inner {
        width: 230px;
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
