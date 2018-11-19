<template>
  <div>
    <!--<div>-->
      <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
    <!--</div>-->
    <el-menu class="navbar" mode="horizontal">
      <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
      <!--<breadcrumb></breadcrumb>-->
      <img :src="title" class="title" alt="">
      <div class="avatar-wrapper" @mouseover="joinin" @mouseout="out">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'" :onerror="errorImg01">
        <div class="msg" v-if="flag">
          <div class="divimg">
            <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'" :onerror="errorImg01">
          </div>
          <p class="pl1"><span><svg-icon class="svgs" icon-class="user"/></span>{{this.data.name}}</p>
          <p class="pl1"><span><svg-icon class="svgs" icon-class="phone"/></span>{{this.data.mobile}}</p>
          <p class="pl1"><span><svg-icon class="svgs" icon-class="email"/></span>{{this.data.email}}</p>
          <p class="pl1"><span><svg-icon class="svgs" icon-class="address"/></span>{{this.data.address}}</p>
          <div class="lie">
            <el-row :gutter="20">
              <el-col :span="12">
                <router-link to="/setting/password">
                  <svg-icon class="svgs" icon-class="password"/>
                  <div class="grid-content bg-purple">修改密码</div>
                </router-link>
              </el-col>
              <el-col :span="12" @click.native="logout">
                <svg-icon class="svgs" icon-class="out"/>
                <div class="grid-content bg-purple">登出</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-menu>
  </div>

</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import title from '@/assets/img/zjzhhs.png'
  import {watch} from '@/api/UserManagement'

  export default {
    name: 'Navbar',
    data() {
      return {
        flag: false,
        title,
        errorImg01: 'this.src="' + require('@/assets/img/noLogin.png') + '"',
        data: {}
      }
    },
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'sidebar'
      ])
    },
    mounted() {
      // alert(this.name)
      this.list()
    },
    methods: {
      list() {
        watch(this.avatar).then(response => {
          this.data = response.data
        })
      },
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        var service = `http://${window.location.host}/`
        this.$store.dispatch('LogOut').then(() => {
          // location.reload() // 为了重新实例化vue-router对象 避免bug
          window.location.href = `http://172.26.24.160/casZjgh/logout?service=${service}`
        })
      },
      joinin() {
        this.flag = true
      },
      out() {
        this.flag = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    position: absolute;
    top: 200px;
    float: left;
    z-index: 999;
    padding: 0 10px;
  }
  .navbar {
    height: 68px;
    line-height: 50px;
    border-radius: 0px !important;
    background: rgba(1, 87, 155, 1);
    /*box-shadow: 30px 2px 15px #666666;*/
    filter: drop-shadow(0 0 4px #000);
    .title {
      width: 290px;
      margin-top: 15px;
      position: absolute;
      z-index: 19;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container1:hover {
      background: #333644;
    }
    .avatar-container1 {
      height: 68px;
      /*background: #333644;*/
      display: inline-block;
      position: absolute;
      right: 98px;
      padding: 0 20px;
      text-align: center;
      .el-dropdown-link {
        .svgs {
          font-size: 30px;
          margin-top: 12px;
        }
        p {
          margin-top: -30px;
          font-size: 10px;
        }
        color: #fff;
        cursor: pointer;
        position: relative;
        font-size: 10px;
        .el-icon-arrow-down {
          position: absolute;
        }
      }

    }
    .avatar-wrapper {
      width: 50px;
      display: inline-block;
      position: absolute;
      right: 24px;
      margin-top: 9px;
      .user-avatar {
        width: 100%;
        border-radius: 50%;
        cursor: pointer;

      }
    }
    .msg {
      .pl1 {
        span {
          margin-right: 15px;
          .svgs {
            font-size: 20px;
          }
        }
      }
      padding: 15px;
      width: 320px;
      /*height: 220px;*/
      position: absolute;
      right: -20px;
      top: 63px;
      background: #f5f5f5;
      .divimg {
        text-align: center;
        img {
          width: 58px;
          border-radius: 50%;
          height: 58px;
        }
      }
      p {
        height: 28px;
        line-height: 28px;
        span {
          width: 84px;
          display: inline-block;
          text-align: right;
        }
      }
      .lie {
        text-align: center;
        padding: 0 15px;
        .svgs {
          font-size: 22px;
          color: #000;
        }
        .grid-content {
          height: 20px;
          margin-top: -13px;
          line-height: 20px;
          font-size: 10px;
        }
        p {
          display: flex;
          align-items: center; /*垂直居中*/
          justify-content: center; /*水平居中*/
          .svgouts {
            margin-right: 8px;
            font-size: 22px;
          }
        }

      }
    }
    .el-col, .outp {
      cursor: pointer;
    }
  }

  .navbar:after {
    content: "";
    position: absolute;
     /*left: 0px;*/
     /*bottom: 0px;*/
    width: 57px;
    left: -32px;
    top: 42px;
    z-index: 18;
    height: 57px;
    background-color: #01579b;
    -webkit-transform: rotate(45deg);
    transform: rotate(40deg);
  }

  .svgD {
    margin-right: 15px;
  }

  .el-dropdown-menu {
    background: #f5f5f5;
  }
</style>

