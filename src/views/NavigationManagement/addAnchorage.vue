<template>
  <div class="addAnchorage">
    <div class="dataModification">
      <el-row>
       <el-col :span="8">
          <div class="demo-input-suffix">
            <span>中文名称 ：</span>
            <el-input
              placeholder=""
              v-model="name"
              clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="demo-input-suffix">
            <span>英文名称 ：</span>
            <el-input
              placeholder=""
              v-model="enName"
              clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="demo-input-suffix">
            <span>所属海事机构  ：</span>
            <el-input
              placeholder=""
              v-model="agency"
              clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="demo-input-suffix">
            <span>坐标 ：</span>
            <el-input
              placeholder=""
              v-model="coordinate"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>用途 ：</span>
            <el-input
              placeholder=""
              v-model="purpose"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>范围：</span>
            <el-input
              placeholder=""
              v-model="workRange"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>性质：</span>
            <el-input
              placeholder=""
              v-model="property"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>港内或港外：</span>
            <el-input
              placeholder=""
              v-model="port"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>是否开放  ：</span>
            <el-input
              placeholder=""
              v-model="openFlag"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>主管单位：</span>
            <el-input
              placeholder=""
              v-model="deptName"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>联系电话：</span>
            <el-input
              placeholder=""
              v-model="telphone"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>绘制区域：</span>
            <el-input
              placeholder=""
              v-model="area"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>备注：</span>
            <el-input
              placeholder=""
              v-model="remark"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span> 船长限制 ：</span>
            <el-input
              placeholder=""
              v-model="shipRestriction"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>吃水限制：</span>
            <el-input
              placeholder=""
              v-model="draftRestriction"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>底质：</span>
            <el-input
              placeholder=""
              v-model="substratum"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>水深 ：</span>
            <el-input
              placeholder=""
              v-model="depthWater"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>CCTV信号覆盖情况：</span>
            <el-input
              placeholder=""
              v-model="cctv"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>VTS信号覆盖情况：</span>
            <el-input
              placeholder=""
              v-model="vts"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>锚泊方式：</span>
            <el-input
              placeholder=""
              v-model="mooringMode"
              clearable>
            </el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="demo-input-suffix">
            <span>最大设计锚泊船舶等级：</span>
            <el-input
              placeholder=""
              v-model="maxShipGrade"
              clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="demo-input-suffix">
            <span>最大设计锚泊船舶数量：</span>
            <el-input
              placeholder=""
              v-model="maxShipNum"
              clearable>
            </el-input>
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
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {add} from '@/api/Anchorage'

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
        description: '',
        name: '',
        enName: '',
        agency: '',
        coordinate: '',
        purpose: '',
        workRange: '',
        property: '',
        port: '',
        openFlag: '',
        deptName: '',
        telphone: '',
        area: '',
        remark: '',
        shipRestriction: '',
        draftRestriction: '',
        substratum: '',
        depthWater: '',
        cctv: '',
        vts: '',
        mooringMode: '',
        maxShipGrade: '',
        maxShipNum: ''
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
        // if (!this.classification) {
        //   this.$message('请先填写分类名称！')
        //   return
        // }
        // if (!this.itemName) {
        //   this.$message('请先填写项目名称！')
        //   return
        // }
        // if (!this.itemValue) {
        //   this.$message('请先填写项目值！')
        //   return
        // }
        // if (!this.sort) {
        //   this.$message('请先填写排序！')
        //   return
        // }
        add(this.id, this.name, this.enName, this.agency, this.coordinate, this.purpose, this.workRange, this.property, this.port, this.openFlag, this.deptName, this.telphone, this.area, this.remark, this.shipRestriction, this.draftRestriction, this.substratum, this.depthWater, this.cctv, this.vts, this.mooringMode, this.maxShipGrade, this.maxShipNum).then(response => {
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
  .addAnchorage {
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
