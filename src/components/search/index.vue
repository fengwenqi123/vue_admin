<template>
  <div class="search" @keyup.enter='submit'>
    <el-input @click.native.once="gird" style="flex: 1; width: 224px;" v-model="input" placeholder="请输入内容"></el-input>
    <span @click="searchs"><svg-icon icon-class="fdj"></svg-icon></span>
    <!--<span @click="back">-->
    <!--<svg-icon icon-class="home"></svg-icon>-->
    <!--</span>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: ''
      }
    },
    methods: {
      submit() {
        this.searchs()
      },
      searchs() {
        this.$emit('searchs', this.input)
      },
      back() {
        this.input = ''
        this.$router.push({
          path: '/',
          query: {
            t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
          }
        })
      },
      gird() {
        this.$emit('show', 'true')
      }
    },
    watch: {
      '$route'() {
        if (this.$route.path === '/dashboard/levelOne') {
          this.$emit('hide', true)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .search {
    display: flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background: #01579B;
      .svg-icon {
        color: #fff;
        font-size: 18px;
      }
    }
    span:nth-child(3) {
      background: #fff;
      .svg-icon {
        color: #01579B;
        font-size: 18px;
      }
    }
    .el-input__inner {
      width: 224px;
    }
  }
</style>
