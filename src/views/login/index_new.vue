<template>
  <div class="login-container">
    <div class="fff">
    </div>
    <div class="juxing">
      <img src="../../assets/img/backgroundblue.png" alt="">
    </div>
    <!--<el-button type="primary" style="width:250px;width: 250px;position: fixed;right: 220px;top: 426px;z-index: 11"-->
               <!--@click.native="handleLogin">-->
      <!--单点登录-->
    <!--</el-button>-->
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-undef,space-before-function-paren,no-empty,no-redeclare */
  import getURL from '@/utils/getUrl.js'

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          loginType: 4,
          loginSource: 1,
          ip: '',
          hostName: '',
          tickets: '',
          services: ''
        }
      }
    },
    created() {
      this.geturl()
      // this.out()
    },
    methods: {
      handleLogin() {
        var test = window.location.href
        window.location.href = `http://59.202.42.57:8080/casZjgh?service=${test}`
      },
      geturl() {
        var test = window.location.href
        if (test.indexOf('?ticket=') !== -1) {
          this.loginForm.tickets = getURL.getUrlKey('ticket')
          this.loginForm.services = test.replace(`?ticket=${this.loginForm.tickets}`, '')
          this.login()
        } else {
          var test = window.location.href
          window.location.href = `http://59.202.42.57:8080/casZjgh?service=${test}`
        }
      },
      login() {
        this.$store.dispatch('Logindd', this.loginForm).then(() => {
          window.location.href = `http://${window.location.host}/`
        })
      },
      out() {
        out(this.service1).then(response => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #000;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .el-button {
      span {
        font-size: 18px;
      }
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    .clearfix {
      display: flex;
      align-items: center; /*垂直居中*/
      justify-content: flex-end; /*水平居中*/
    }
    position: fixed;
    height: 100%;
    width: 100%;
    background: url("../../assets/img/background.jpg") no-repeat;
    background-size: 100% 100%;
    .fff {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
    }
    .all {
      opacity: 1;
      filter: alpha(opacity=100); /* IE8 及其更早版本 */
      margin-top: 150px;
      width: 850px;
      .logo {
        width: 250px;
        margin: 0 auto;
      }
      .title1 {
        width: 90%;
        margin: 20px auto;
      }
    }
    .login-form {
      position: absolute;
      right: 40px;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 238px auto;
      z-index: 11;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 30px;
      font-weight: bold;
      color: #01579B;
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .juxing {
      position: fixed;
      height: 100%;
      z-index: 10;
      opacity: 0.8;
      filter: alpha(opacity=80); /* IE8 及其更早版本 */
      background-size: 100% 100%;
      img {
        height: 100%;
      }
    }

  }


</style>
