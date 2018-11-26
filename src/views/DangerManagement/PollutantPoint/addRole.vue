<template>
  <div class="roleModification">
    <el-form ref="form" :model="form" label-width="200px" label-suffix=":">
      <el-form-item label="排放ID">
        <el-input v-model="form.markId"></el-input>
      </el-form-item>
      <el-form-item label="	类型ID">
        <el-input v-model="form.markTypeId"></el-input>
      </el-form-item>
      <el-form-item label="	组织ID  ">
        <el-input v-model="form.orgId"></el-input>
      </el-form-item>
      <el-form-item label="	排放站名称">
        <el-input v-model="form.markName"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="form.markLng"></el-input>
      </el-form-item>
      <el-form-item label="	纬度">
        <el-input v-model="form.markLat"></el-input>
      </el-form-item>
      <el-form-item label="	备注">
        <el-input v-model="form.remark"></el-input>
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
  import {mod} from '@/api/PollutantPoint.js'

  export default {
    data() {
      return {
        form: {
          markId: null,
          markTypeId: null,
          orgId: null,
          markName: null,
          markLng: null,
          markLat: null,
          remark: null
        },
        par: [{
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        show: false,
        coordinate: []
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
