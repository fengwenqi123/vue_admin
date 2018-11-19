<template>
  <div class="addparts">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-input-suffix">
          <span>设备名称：</span>
          <el-input
            placeholder="请输入权限名称"
            v-model="name"
            clearable>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="demo-input-suffix">
          <span>设备编号：</span>
          <el-input
            placeholder="请输入权限名称"
            v-model="name"
            clearable>
          </el-input>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="demo-input-suffix">
          <span>设备类别：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="demo-input-suffix">
          <span>设备属性：</span>
          <div class="textarea">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="demo-input-suffix">
          <span>设备下发：</span>
          <div class="textarea">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="button">
      <el-button type="primary" icon="el-icon-edit" size="small">保存</el-button>
      <el-button type="warning" icon="el-icon-error" size="small" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  export default {
    data() {
      return {
        show: null,
        options: [{
          value: '1',
          label: 'AIS'
        }, {
          value: '2',
          label: 'GPS'
        }, {
          value: '3',
          label: '点云DY'
        }, {
          value: '4',
          label: '核查HC'
        }, {
          value: '5',
          label: '流量LL'
        }, {
          value: '6',
          label: '流速LS'
        }, {
          value: '7',
          label: '视频SP'
        }, {
          value: '8',
          label: '水位SW'
        }, {
          value: '9',
          label: '抓拍ZP'
        }],
        value: '',
        textarea: ''
      }
    },
    methods: {
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .addparts {
    .demo-input-suffix {
      margin-top: 15px;
      .textarea {
        display: inline-block;
        width: 550px;
      }
      .el-select {
        width: 550px;
      }
    }
    .button {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
