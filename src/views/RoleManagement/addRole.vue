<template>
  <div class="roleModification">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-input-suffix demo1">
          <span>添加权限：</span>
          <el-tree
            :data="data2"
            :show-checkbox=flag
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
          >
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12" style="text-align: left">
        <div class="demo-input-suffix">
          <span>名称：</span>
          <el-input
            placeholder="请输入名称"
            v-model="name"
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
      </el-col>
    </el-row>
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
  /* eslint-disable no-undef,no-array-constructor,object-curly-spacing */
  import {listToTree} from '@/api/listtoTree.js'
  import {findRole, add, findRoleById} from '@/api/RoleManagement'

  export default {
    data() {
      return {
        flag: true,
        show: null,
        parent: '无',
        parent_layer: '',
        id: '',
        status: '1',
        carName: '',
        name: '',
        actionValue: '',
        phoneNumber: '',
        sort: '',
        description: '',
        value4: '',
        data2: [],
        data: null,
        supLayer: '',
        layer: '',
        authorizeIds: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        Jurisdiction: []
      }
    },
    created() {
      this.getQuery()
      this.getAll()
    },
    props: ['mul'],
    methods: {
      getQuery() {
        if (this.mul.length !== 0) {
          this.id = this.mul.id
          this.name = this.mul.name
          this.status = this.mul.status.toString()
          this.description = this.mul.description
        }
      },
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      },
      // 查看所有权限
      getAll() {
        findRole().then(response => {
          if (response.code === 200) {
            var list = response.data
            this.data2 = listToTree('id', 'layer', list)
            if (this.id) {
              this.findRoleByIds()
            }
          }
        })
      },
      // 根据角色id获取权限
      findRoleByIds() {
        findRoleById(this.id).then(response => {
          response.data.forEach((item, index) => {
            if (item.actionValue !== 'cbgl' && item.actionValue !== 'cygl' && item.actionValue !== 'dtjg' && item.actionValue !== 'thgl' && item.actionValue !== 'wfgl' && item.actionValue !== 'aqjg' && item.actionValue !== 'zhdd' && item.actionValue !== 'jcfx' && item.actionValue !== 'jcyq' && item.actionValue !== 'sys') {
              this.Jurisdiction.push(item)
            }
          })
          console.log(this.Jurisdiction)
          this.$refs.tree.setCheckedNodes(this.Jurisdiction)
        })
      },
      // 保存
      submit() {
        this.data = this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes())
        var mun = []
        this.data.forEach((item, index) => {
          mun.push(item.id)
        })
        this.authorizeIds = mun
        if (this.data.length === 0) {
          this.$message({
            message: '请先选择上级权限'
          })
          return
        }
        if (!this.name) {
          this.$message({
            message: '请先填写权限名称'
          })
          return
        }
        add(this.id, this.name, this.status, this.description, this.authorizeIds).then(response => {
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
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .roleModification {
    .el-tree {
      display: inline-block;
      width: 180px;
    }
    .demo-input-suffix {
      margin-top: 10px;
      span {
        display: inline-block;
        width: 120px;
      }
      .el-textarea {
        width: 423px;
      }

    }
    .el-row {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
