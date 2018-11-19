<template>
  <div>
    <div v-if="mul" class="modSection">
      <div class="adds">
      <div class="demo-input-suffix">
        <span>编号：</span>
        <el-input
          placeholder="请输入编号"
          v-model="code"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>名称：</span>
        <el-input
          placeholder="请输入名称"
          v-model="name"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>rtmp：</span>
        <el-input
          placeholder="请输入rtmp"
          v-model="rtmp"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>web管理地址：</span>
        <el-input
          placeholder="请输入web管理地址"
          v-model="web"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>告警类别：</span>
        <el-select v-model="alertType" placeholder="请选择">
          <el-option
            v-for="item in alert"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="demo-input-suffix">
        <span>定位：</span>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入定位"
          v-model="area">
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>描述：</span>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请描述内容"
          v-model="description">
        </el-input>
      </div>
      </div>
      <div class="table">
        <el-button @click="addDialog" type="success" class="new">新增设备元件</el-button>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="设备元件名称">
          </el-table-column>
          <el-table-column
            prop="code"
            label="设备元件编号">
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="	设备元件类别">
          </el-table-column>
          <el-table-column
            label="	操作">
            <template slot-scope="scope">
              <span><el-button size="mini" @click="modify(scope.row)" type="warning">修改</el-button></span>
              <span><el-button size="mini" @click="deletes(scope.row)" type="danger">删除</el-button></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <el-button type="success" @click="submit">
          保存
        </el-button>
        <el-button @click="cancel1">
          取消
        </el-button>
      </el-row>
      <el-dialog title="新增元件" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="元件名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="元件编号" :label-width="formLabelWidth">
            <el-input v-model="form.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="元件类别" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择" @change="changeValue">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="diasubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  /* eslint-disable object-curly-spacing,no-dupe-keys */

  import {add, mod, delt} from '@/api/SectionManagement'

  // var obj
  export default {
    data() {
      return {
        rtmp: '',
        web: '',
        alertType: '',
        area: '',
        diaId: 0,
        show: null,
        flag: null,
        id: '',
        loginName: '',
        name: '',
        mobile: '',
        code: '',
        description: '',
        status: '1',
        tableData: [],
        dialogFormVisible: false,
        form: {
          id: null,
          name: '',
          type: '',
          code: '',
          crosssectionId: ''
        },
        formLabelWidth: '120px',
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
        index: null,
        index1: null,
        obj: null,
        alert: [{
          value: '1',
          label: '不报警'
        }, {
          value: '2',
          label: '上行报警'
        }, {
          value: '3',
          label: '下行报警'
        }, {
          value: '4',
          label: '都报警'
        }
        ],
        componentBeanList: []
      }
    },
    props: ['mul', 'disabled'],
    created() {
      if (this.mul.length !== 0) {
        this.id = this.mul.id
        this.code = this.mul.code
        this.name = this.mul.name
        this.rtmp = this.mul.rtmp
        this.web = this.mul.web
        this.alertType = this.mul.alertType.toString()
        this.area = this.mul.area
        this.tableData = this.mul.componentBeanList
        this.tableData.forEach((item, index) => {
          this.options.forEach((items, indexs) => {
            if (item.type.toString() === items.value) {
              item.typeName = items.label
            }
          })
        })
      }
    },
    methods: {
      changeValue(value) {
        let obj = {}
        obj = this.options.find((item) => {
          return item.value === value
        })
        console.log(obj.label)
        this.form.typeName = obj.label
      },
      cancel1() {
        this.show = true
        this.$emit('ievent', this.show, this.flag)
      },
      submit() {
        if (!this.name) {
          this.$message({
            message: '请填写名称'
          })
          return
        }
        if (!this.rtmp) {
          this.$message({
            message: '请填写rtmp'
          })
          return
        }
        if (!this.web) {
          this.$message({
            message: '请填写web管理地址'
          })
          return
        }
        if (!this.area) {
          this.$message({
            message: '请填写定位'
          })
          return
        }
        this.tableData.forEach((item, index) => {
          var obj = {}
          obj.name = item.name
          obj.code = item.code
          obj.type = item.type
          obj.crosssectionId = item.crosssectionId
          this.componentBeanList.push(obj)
        })
        add(this.id, this.code, this.name, this.rtmp, this.web, this.alertType, this.area, this.description).then(response => {
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
      addDialog() {
        this.form = {
          id: null,
          name: '',
          type: '',
          code: '',
          crosssectionId: this.id
        }
        this.index = null
        this.dialogFormVisible = true
      },
      diasubmit() {
        mod(this.form.id, this.form.crosssectionId, this.form.code, this.form.name, this.form.type).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          if (this.index !== null) {
            this.tableData.splice(this.index, 1)
          }
          this.diaId += 1
          this.form.id = this.diaId
          this.tableData.push(this.form)
          this.dialogFormVisible = false
        })
      },
      cancel() {
        this.dialogFormVisible = false
      },
      modify(row) {
        console.log(row)
        this.tableData.forEach((item, index) => {
          if (row.id === item.id) {
            this.index = index
          }
        })
        var form = JSON.stringify(this.tableData[this.index])
        this.form = JSON.parse(form)
        this.dialogFormVisible = true
      },
      deletes(row) {
        this.tableData.forEach((item, index) => {
          if (row.id === item.id) {
            this.index1 = index
          }
        })
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = row.id
          delt(num).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.tableData.splice(this.index1, 1)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add {
    text-align: center;
  }

  .modSection {
    .adds{
      margin-left: 30%;
    }
    width: 100%;
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
      text-align: center;
      margin-top: 20px;
    }
    .table {
      margin-top: 30px;
      .el-button {
        margin-bottom: 15px;
      }
    }
    .new {
      float: left;
    }
  }
</style>
