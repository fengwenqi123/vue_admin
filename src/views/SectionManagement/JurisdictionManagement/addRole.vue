<template>
  <div class="roleModification">
    <el-form ref="form" :model="form" label-width="200px" label-suffix=":">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域坐标">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <!--区分新建和修改-->
      <el-form-item v-if="flag" label=" 用户ID ">
        <el-input v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item v-if="flag" label="用户名称 ">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item v-if="flag" label="部门ID">
        <el-input v-model="form.departmentId"></el-input>
      </el-form-item>
      <el-form-item v-if="flag" label="部门名称">
        <el-input v-model="form.departmentName"></el-input>
      </el-form-item>
      <el-form-item v-if="flag" label="管理（归属）部门ID">
        <el-input v-model="form.manageDepartmentId"></el-input>
      </el-form-item>
      <el-form-item v-if="flag" label=" 管理（归属）部门名称">
        <el-input v-model="form.manageDepartmentName"></el-input>
      </el-form-item>
      <!--只读-->
      <el-form-item v-if="!flag" label="管理（归属）部门ID">
        <el-input :disabled="true" v-model="form.manageDepartmentId"></el-input>
      </el-form-item>
      <el-form-item v-if="!flag" label=" 管理（归属）部门名称">
        <el-input :disabled="true" v-model="form.manageDepartmentName"></el-input>
      </el-form-item>
    </el-form>
    <div class="but">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor,object-curly-spacing,no-empty,space-before-function-paren,no-unused-vars */
  import {mod} from '@/api/JurisdictionManagement.js'

  export default {
    data() {
      return {
        form: {
          name: null,
          status: 1,
          area: null,
          description: null,
          userId: null,
          userName: null,
          departmentId: null,
          departmentName: null,
          manageDepartmentId: null,
          manageDepartmentName: null
        },
        par: [{
          value: 1,
          label: '启用'
        }, {
          value: 2,
          label: '禁用'
        }],
        show: false,
        flag: true

      }
    },
    created() {
      this.getQuery()
    },
    props: ['mul', 'disabled'],
    mounted() {
    },
    methods: {
      getQuery() {
        if (this.mul.length !== 0) {
          this.form = this.mul
          this.flag = false
        } else {
          this.flag = true
        }
      },
      cancel() {
        this.show = true
        this.$emit('ievent', this.show)
      },
      // 保存
      onSubmit() {
        mod(this.form).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.show = true
            this.$emit('ievent', this.show)
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .roleModification {
    /*margin-left: 30%;*/
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
      margin-left: 120px;
      margin-top: 20px;
    }
    .head {
      height: 30px;
      padding-left: 30px;
    }
  }
</style>
