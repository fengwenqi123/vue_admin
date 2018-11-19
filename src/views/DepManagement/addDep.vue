<template>
  <div class="adddep">
    <div class="bmModification">
      <div class="demo-input-suffix demo1">
        <span>归属：</span>
        <select v-if="!id" class="form-control" name="supLayer" v-model="selected">
          <option value="">请选择</option>
          <option v-for="item in data2" :value="item.layer" :key="item.id">
            <span v-if="!item.layer" v-text="item.name"></span>
            <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
            <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==12" v-text="'　　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==15" v-text="'　　  ┝ '+item.name"></span>
          </option>
        </select>
        <el-select v-model="parent" class="form-control1" v-if="id" :disabled="disabled" placeholder="请选择">
        </el-select>
      </div>
      <div class="demo-input-suffix">
        <span>部门名称：</span>
        <el-input
          placeholder="请输入部门名称"
          v-model="name"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>部门编号：</span>
        <el-input
          placeholder="请输入部门编号"
          v-model="code"
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

  import {add, findDep} from '@/api/DepManagement'

  export default {
    data() {
      return {
        show: null,
        parent: '',
        id: '',
        selected: '',
        name: '',
        code: '',
        description: '',
        data2: [],
        layer: ''
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
          if (!this.selected) {
            this.$message('请先选择归属！')
            return
          }
        }
        if (!this.name) {
          this.$message('请先填写部门名称！')
          return
        }
        if (!this.code) {
          this.$message('请先填写部门编号！')
          return
        }
        add(this.id, this.selected, this.code, this.name, this.description).then(response => {
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
        findDep().then(response => {
          if (response.code === 200) {
            this.data2 = response.data.dataList
            if (this.id) {
              this.data2.forEach((item, index) => {
                if (this.layer.length === 3) {
                  if (this.layer === item.layer) {
                    this.parent = item.name
                  }
                } else {
                  this.layer = this.layer.substr(0, this.layer.length - 3)
                  if (this.layer === item.layer) {
                    this.parent = item.name
                  }
                }
              })
            }
          }
        })
      },
      getQuery() {
        if (this.mul.length !== 0) {
          this.id = this.mul.id
          this.name = this.mul.name
          this.code = this.mul.code
          this.layer = this.mul.layer
          this.description = this.mul.description
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .adddep {
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
