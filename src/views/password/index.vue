<template>
  <div class="password">
    <div class="title">
      <el-card class="box-card">
        <div class="text item">
          <breadcrumb></breadcrumb>
        </div>
      </el-card>
    </div>
    <el-card class="main">
      <div class="demo-input-suffix">
        <span>原密码：</span>
        <el-input
          placeholder="请输入原密码"
          v-model="old"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>新密码：</span>
        <el-input
          placeholder="请输入新密码"
          v-model="newpassword1"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>请再次输入新密码：</span>
        <el-input
          placeholder="请再次输入新密码"
          v-model="newpassword2"
          clearable>
        </el-input>
      </div>
      <el-button type="primary" class="but" @click="mod">确认修改</el-button>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import Breadcrumb from '@/components/Breadcrumb'
  import {password} from '@/api/password'

  export default {
    data() {
      return {
        old: '',
        newpassword1: '',
        newpassword2: ''
      }
    },
    components: {
      Breadcrumb
    },
    mounted() {
    },
    methods: {
      mod() {
        if (!this.old) {
          this.$message({
            message: '请输入原密码'
          })
          return
        }
        if (!this.newpassword1) {
          this.$message({
            message: '请输入新密码'
          })
          return
        }
        if (!this.newpassword2) {
          this.$message({
            message: '请再次输入新密码'
          })
          return
        }
        if (this.newpassword1 !== this.newpassword2) {
          this.$message({
            message: '两次密码不一致，请重新输入'
          })
          this.newpassword1 = ''
          this.newpassword2 = ''
          return
        }
        password(this.old, this.newpassword2).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          setTimeout(() => {
            this.$store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }, 2000)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .password {
    padding: 15px;
    .title {
      /*margin: 10px;*/
    }
    .main {
      text-align: center;
      margin-top: 20px;
      .demo-input-suffix {
        margin-top: 20px;
        span {
          display: inline-block;
          text-align: right;
          width: 150px;
        }
      }
      .but {
        margin-top: 25px;
      }
    }
  }
</style>
