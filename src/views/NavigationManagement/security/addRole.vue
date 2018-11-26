<template>
  <div class="roleModification">
    <el-form ref="form" :model="form" label-width="200px" label-suffix=":">
      <el-form-item label="中文名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称  ">
        <el-input v-model="form.enName"></el-input>
      </el-form-item>
      <el-form-item label="所属海事机构  ">
        <el-input v-model="form.agency"></el-input>
      </el-form-item>
      <el-form-item label="坐标 ">
        <el-input v-model="form.coordinate"></el-input>
      </el-form-item>
      <el-form-item label=" 作业区类型 ">
        <el-input v-model="form.workType"></el-input>
      </el-form-item>
      <el-form-item label="范围">
        <el-input v-model="form.workRange"></el-input>
      </el-form-item>
      <el-form-item label="作业区有效期开始">
        <el-date-picker
          v-model="form.beginTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="作业区有效期结束">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="作业区内船舶及浮动设施数量及名单">
        <el-input v-model="form.workShipFacilities"></el-input>
      </el-form-item>
      <el-form-item label="单位名称    ">
        <el-input v-model="form.deptName"></el-input>
      </el-form-item>
      <el-form-item label="联系人   ">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label=" 联系电话">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="绘制区域">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="备注  ">
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
  import {mod} from '@/api/security.js'

  export default {
    data() {
      return {
        form: {
          name: null,
          enName: null,
          agency: null,
          coordinate: null,
          workType: null,
          workRange: null,
          beginTime: null,
          endTime: null,
          workShipFacilities: null,
          deptName: null,
          contact: null,
          telephone: null,
          area: null,
          remark: null
        },
        par: [{
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        show: false

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
