<template>
  <div class="addDic">
    <div class="dataModification">
      <div class="demo-input-suffix">
        <span>分类：</span>
        <el-input
          placeholder="请输入权限名称"
          v-model="classification "
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>项目名称：</span>
        <el-input
          placeholder="请输入权限值"
          v-model="itemName"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>项目值：</span>
        <el-input
          placeholder=""
          v-model="itemValue"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>排序：</span>
        <el-input
          placeholder=""
          v-model="sort"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>类型：</span>
        <el-radio v-model="type" label="1">系统</el-radio>
        <el-radio v-model="type" label="2">自定义</el-radio>
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
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {add} from '@/api/DicManagement'

  export default {
    data() {
      return {
        show: null,
        classification: '',
        id: '',
        itemName: '',
        itemValue: '',
        status: '1',
        sort: '',
        type: '1',
        description: ''
      }
    },
    props: ['mul', 'disabled'],
    created() {
      this.getQuery()
    },
    methods: {
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      },
      submit() {
        if (!this.classification) {
          this.$message('请先填写分类名称！')
          return
        }
        if (!this.itemName) {
          this.$message('请先填写项目名称！')
          return
        }
        if (!this.itemValue) {
          this.$message('请先填写项目值！')
          return
        }
        if (!this.sort) {
          this.$message('请先填写排序！')
          return
        }
        add(this.id, this.classification, this.itemName, this.itemValue, this.sort, this.type, this.status, this.description).then(response => {
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
      },
      getQuery() {
        if (this.mul.length !== 0) {
          this.id = this.mul.id
          this.classification = this.mul.classification
          this.itemName = this.mul.itemName
          this.itemValue = this.mul.itemValue
          this.sort = this.mul.sort
          this.type = this.mul.type ? this.mul.type.toString() : this.type
          this.status = this.mul.status ? this.mul.status.toString() : this.status
          this.description = this.mul.description
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .addDic {
    margin-left:30%;
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
    .form-control {
      width: 188px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
    .form-control1 {
      width: 188px;
    }
  }


</style>
