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
      <el-form-item label="用途 ">
        <el-input v-model="form.purpose"></el-input>
      </el-form-item>
      <el-form-item label="范围 ">
        <el-input v-model="form.workRange"></el-input>
      </el-form-item>
      <el-form-item label="性质">
        <el-input v-model="form.property"></el-input>
      </el-form-item>
      <el-form-item label=" 港内或港外  ">
        <el-input v-model="form.port"></el-input>
      </el-form-item>
      <el-form-item label="是否开放">
        <el-select v-model="form.openFlag" placeholder="请选择">
          <el-option
            v-for="item in par"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主管单位">
        <el-input v-model="form.deptName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.telphone"></el-input>
      </el-form-item>
      <el-form-item label="绘制区域">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="备注 ">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="船长限制">
        <el-input v-model="form.shipRestriction"></el-input>
      </el-form-item>
      <el-form-item label="吃水限制">
        <el-input v-model="form.draftRestriction"></el-input>
      </el-form-item>
      <el-form-item label="底质  ">
        <el-input v-model="form.substratum"></el-input>
      </el-form-item>
      <el-form-item label="水深  ">
        <el-input v-model="form.depthWater"></el-input>
      </el-form-item>
      <el-form-item label="CCTV信号覆盖情况">
        <el-input v-model="form.cctv"></el-input>
      </el-form-item>
      <el-form-item label="VTS信号覆盖情况">
        <el-input v-model="form.vts"></el-input>
      </el-form-item>
      <el-form-item label="锚泊方式  ">
        <el-input v-model="form.mooringMode"></el-input>
      </el-form-item>
      <el-form-item label=" 最大设计锚泊船舶等级">
        <el-input v-model="form.maxShipGrade"></el-input>
      </el-form-item>
      <el-form-item label="最大设计锚泊船舶数量">
        <el-input v-model="form.maxShipNum"></el-input>
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
  import {mod} from '@/api/Anchorage.js'

  export default {
    data() {
      return {
        form: {
          name: null,
          enName: null,
          agency: null,
          coordinate: null,
          purpose: null,
          workRange: null,
          property: null,
          port: null,
          openFlag: null,
          deptName: null,
          telphone: null,
          area: null,
          remark: null,
          shipRestriction: null,
          draftRestriction: null,
          substratum: null,
          depthWater: null,
          cctv: null,
          vts: null,
          mooringMode: null,
          maxShipGrade: null,
          maxShipNum: null
        },
        par: [{
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        show:
          false,
        coordinate:
          []
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
