<template>
  <div class="addAuthorize">
    <div class="demo-input-suffix demo1">
      <span>上级权限：</span>
      <el-select v-model="parent" class="form-control1" v-if="id" :disabled="disabled" placeholder="请选择">
      </el-select>
      <select v-if="!id" class="form-control" name="supLayer" v-model="select1">
        <option value="">请选择</option>
        <option v-for="item in authArr" :value="item.layer" :key="item.id">
          <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
          <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
          <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
          <span v-if="item.layer && item.layer.length==12" v-text="'　　　　┝ '+item.name"></span>
          <span v-if="item.layer && item.layer.length==15" v-text="'　　　　　　┝ '+item.name"></span>
        </option>
      </select>
    </div>
    <div class="demo-input-suffix">
      <span>权限名称：</span>
      <el-input
        placeholder="请输入权限名称"
        v-model="name"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>权限值：</span>
      <el-input
        placeholder="请输入权限值"
        v-model="actionValue"
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

  import {add, findAuthorize} from '@/api/AuthorizeManagement'

  export default {
    data() {
      return {
        show: null,
        id: '',
        loginName: '',
        name: '',
        mobile: '',
        description: '',
        status: '1',
        parent: '无',
        parent_layer: '',
        carName: '',
        actionValue: '',
        phoneNumber: '',
        sort: '',
        value4: '',
        data2: [],
        data: null,
        supLayer: '',
        layer: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        authArr: [],
        select1: ''
      }
    },
    props: ['mul', 'disabled'],
    created() {
      this.getQuery()
      this.findAuth()
    },
    methods: {
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      },
      submit() {
        if (this.id === '') {
          if (!this.select1) {
            this.$message({
              message: '请选择上级权限'
            })
            return
          }
        }
        if (!this.name) {
          this.$message({
            message: '请先填写权限名称'
          })
          return
        }
        if (!this.actionValue) {
          this.$message({
            message: '请先填写权限值'
          })
          return
        }
        if (!this.sort) {
          this.$message({
            message: '请先填写排序'
          })
          return
        }
        add(this.id, this.select1, this.name, this.actionValue, this.sort, this.status, this.description).then(response => {
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
      findAuth() {
        findAuthorize().then(response => {
          this.authArr = response.data.dataList
          if (this.id) {
            if (this.layer.length < 4) {
              this.parent = this.name
            } else {
              var leng = this.layer.substr(0, this.layer.length - 3)
              var list = response.data.dataList
              list.forEach((item, index) => {
                if (leng === item.layer) {
                  this.parent_layer = item.layer
                  this.parent = item.name
                }
              })
            }
          }
        })
      },
      getQuery() {
        if (this.mul.length !== 0) {
          this.id = this.mul.id
          this.actionValue = this.mul.actionValue
          this.name = this.mul.name
          this.sort = this.mul.sort
          this.status = this.mul.status ? this.mul.status.toString() : this.status
          this.layer = this.mul.layer
          this.description = this.mul.description
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .addAuthorize {
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
