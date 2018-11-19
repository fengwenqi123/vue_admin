<template>
  <div class="bar clearfix">
    <span><svg-icon :icon-class="icon"></svg-icon></span>
    <span class="name">{{name}}</span>
    <span class="back" @click="back()">返回</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        icon: ''
      }
    },
    created() {
      this.getQuery()
    },
    methods: {
      getQuery() {
        this.name = this.$route.query.name
        this.icon = this.$route.query.icon
      },
      back() {
        this.$router.go(-1)
      }
    }

  }
</script>

<style scoped lang="scss">
  .bar {
    display: flex;
    background: #fff;
    align-items: center;
    height: 52px;
    padding-right: 10px;
    span {
      display: inline-block;
      flex: 1;
    }
    .svg-icon {
      font-size: 30px;
      margin: 0 33px 0 31px;
    }
    .name {
      color: #01579B;
      font-size: 16px;
      font-weight: bold;
      flex: 3;
    }
    .back {
      flex: 1;
      width: 56px;
      height: 22px;
      background: #01579B;
      color: #fff;
      line-height: 22px;
      text-align: center;
      cursor: pointer;
    }
  }

</style>
