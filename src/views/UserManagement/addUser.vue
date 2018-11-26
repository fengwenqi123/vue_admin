<template>
  <div class="addUser">
    <div class="userModification">
      <el-row>
        <el-col :span="12">
          <div class="left">
            <div class="demo-input-suffix">
              <span>登录名：</span>
              <el-input
                placeholder="请输入登录名"
                v-model="loginName"
                clearable>
              </el-input>
              <em>*</em>
            </div>
            <div class="demo-input-suffix">
              <span>名称：</span>
              <el-input
                placeholder="请输入名称"
                v-model="name"
                clearable>
              </el-input>
              <em>*</em>
            </div>
            <div class="demo-input-suffix">
              <span> 选择部门：</span>
              <select class="form-control" name="supLayer" v-model="selected">
                <option value="">请选择</option>
                <option v-for="item in data2" :value="item.id" :key="item.id">
                  <span v-if="!item.layer" v-text="item.name"></span>
                  <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
                  <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
                  <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
                  <span v-if="item.layer && item.layer.length==12" v-text="'　　　　┝ '+item.name"></span>
                  <span v-if="item.layer && item.layer.length==15" v-text="'　　　　　　┝ '+item.name"></span>
                </option>
              </select>
            </div>
            <div class="demo-input-suffix">
              <span>员工编号：</span>
              <el-input
                placeholder="请输入员工编号"
                v-model="code"
                clearable>
              </el-input>
            </div>
            <div class="demo-input-suffix">
              <span>性别：</span>
              <el-radio v-model="gender" label="1">男</el-radio>
              <el-radio v-model="gender" label="2">女</el-radio>
            </div>
            <div class="demo-input-suffix">
              <span>email：</span>
              <el-input
                placeholder="请输入email"
                v-model="email"
                clearable>
              </el-input>
            </div>
            <div class="demo-input-suffix">
              <span>手机：</span>
              <el-input
                placeholder="请输入手机"
                v-model="mobile"
                clearable>
              </el-input>
            </div>
            <div class="demo-input-suffix">
              <span>身份证：</span>
              <el-input
                placeholder="请输入身份证"
                v-model="idCard"
                clearable>
              </el-input>
            </div>
            <div class="demo-input-suffix">
              <span>生日：</span>
              <div class="block">
                <el-date-picker
                  v-model="birthday"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </div>
            <div class="demo-input-suffix">
              <span>地址：</span>
              <el-input
                placeholder="请输入地址"
                v-model="address"
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
        </el-col>
        <el-col :span="12">
          <div class="right">
            <div class="demo-input-suffix">
              <span>选择角色：</span>
              <el-checkbox-group v-model="roleIds" v-for="item in roleArr" :key="item.id">
                <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {add, getRoleArr, findRoleById, findDepById} from '@/api/UserManagement'
  import {findDep} from '@/api/DepManagement'

  export default {
    data() {
      return {
        show: null,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        data2: null,
        selected: null,
        value1: '',
        birthday: '',
        loginName: '',
        id: null,
        name: '',
        code: '',
        email: '',
        mobile: '',
        idCard: '',
        address: '',
        roleIds: [],
        departmentIds: [],
        status: '1',
        gender: '1',
        roleArr: '',
        departArr: '',
        description: ''
      }
    },
    props: ['mul', 'disabled'],
    created() {
      this.getQuery()
      this.findAuth()
      this.getData()
    },
    methods: {
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      },
      submit() {
        if (!this.loginName) {
          this.$message({
            message: '请先填写登录名'
          })
          return
        }
        if (!this.name) {
          this.$message({
            message: '请先填写名称'
          })
          return
        }
        add(this.id, this.loginName, this.code, this.name, this.email, this.mobile, this.idCard, this.gender, this.birthday, this.address, this.status, this.description, this.roleIds, this.selected).then(response => {
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
      getData() {
        getRoleArr().then(response => {
          if (response.code === 200) {
            this.roleArr = response.data.dataList
            if (this.id) {
              this.findRoleByIds()
            }
          }
        })
      },
      findAuth() {
        findDep().then(response => {
          if (response.code === 200) {
            this.data2 = response.data.dataList
            if (this.id) {
              this.findDepByIds()
            }
          }
        })
      },
      findRoleByIds() {
        findRoleById(this.id).then(response => {
          response.data.forEach((item, index) => {
            this.roleIds.push(item.id)
          })
        })
      },
      findDepByIds() {
        findDepById(this.id).then(response => {
          this.selected = response.data[0].id
        })
      },
      getQuery() {
        if (this.mul.length !== 0) {
          this.id = this.mul.id
          this.loginName = this.mul.loginName
          this.code = this.mul.code
          this.name = this.mul.name
          this.status = this.mul.status ? this.mul.status.toString() : this.status
          this.email = this.mul.email
          this.mobile = this.mul.mobile
          this.idCard = this.mul.idCard
          this.gender = this.mul.gender ? this.mul.gender.toString() : this.gender
          this.birthday = this.mul.birthday
          this.address = this.mul.address
          this.description = this.mul.description
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .addUser {
    .right {
      .demo-input-suffix {
        text-align: left;
      }
    }
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
    .block {
      display: inline-block;
      width: 188px;
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 188px;
      }
    }
    .second {
      text-indent: 10px;
    }

    .three {
      text-indent: 20px;
    }
    .el-checkbox-group {
      text-align: left;
    }
    em{
      color: red;
      font-style:normal;
      font-size: 18px;
    }
  }


</style>
