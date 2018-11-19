<template>
  <div class="playBack">
    <p>
      回放设置
    </p>
    <div class="buttons">
      <el-row>
        <el-button type="primary" plain>停止回放</el-button>
        <el-button type="primary">{{flag?'轨迹显示：开启':'轨迹显示：关闭'}}</el-button>
      </el-row>
    </div>
    <!--船舶列表-->
    <div class="list" v-if="shipList">
      <p>船舶列表</p>
      <ul>
        <li>
          <p></p>
        </li>
      </ul >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: true,
        shipList: null
      }
    }
  }
</script>

<style scoped lang="scss">
  .playBack {
    padding: 0 15px;
    background: #fff;
    p {
      padding: 8px 0;
      color: #ccc;
    }
    .el-row {
      padding: 10px 0;
    }
  }
</style>
