<template>
  <div class="showhide">
    <svg-icon :class="{active:!flag}" icon-class="down"></svg-icon>
    <p v-if="flag">显示</p>
    <p v-if="!flag">隐藏</p>
  </div>
</template>

<script>
  export default {
    props: ['flag']
  }
</script>

<style scoped lang="scss">
  .showhide {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    background: #DCDCDC;
    p {
      display: inline-block;
      color: #666;
    }
    .active{
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); /* IE 9 */
      -webkit-transform:rotate(180deg); /* Safari and Chrome */
    }
  }

</style>
