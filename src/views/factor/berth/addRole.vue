<template>
  <div class="roleModification">
    <ifra></ifra>
    <el-form ref="form" :model="form" label-width="210px" label-suffix=":">
      <el-form-item label="中文名称全称 ">
        <el-input v-model="form.fullName"></el-input>
      </el-form-item>
      <el-form-item label="中文名称简称 ">
        <el-input v-model="form.shortName"></el-input>
      </el-form-item>
      <el-form-item label="英文名称全称">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
      <el-form-item label="结构">
        <!--<el-input v-model="form.structure"></el-input>-->
        <el-select v-model="form.structure" placeholder="请选择">
          <el-option
            v-for="item in str"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投产日期">
        <el-input v-model="form.productionDate"></el-input>
      </el-form-item>
      <el-form-item label=" 经营模式  ">
        <!--<el-input v-model="form.businessModel"></el-input>-->
        <el-select v-model="form.businessModel" placeholder="请选择">
          <el-option
            v-for="item in bus"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业主单位名称  ">
        <el-input v-model="form.unitName"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话  ">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="是否生产用  ">
        <!--<el-input v-model="form.productionUse"></el-input>-->
        <el-select v-model="form.productionUse" placeholder="请选择">
          <el-option
            v-for="item in pro"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="水工结构等级（吨级） ">
        <el-input v-model="form.structureLevel"></el-input>
      </el-form-item>
      <el-form-item label="设计靠泊能力（吨级）">
        <el-input v-model="form.designBerthCapacity"></el-input>
      </el-form-item>
      <el-form-item label="核定靠泊能力（吨级）">
        <el-input v-model="form.approvedBerthCapacity"></el-input>
      </el-form-item>
      <el-form-item label="前沿停泊水域设计宽度(米)">
        <el-input v-model="form.waterWidth"></el-input>
      </el-form-item>
      <el-form-item label="前沿停泊水域设计深度(米)   ">
        <el-input v-model="form.waterDepth"></el-input>
      </el-form-item>
      <el-form-item label="设计回旋水域长度(米) ">
        <el-input v-model="form.waterLength"></el-input>
      </el-form-item>
      <el-form-item label="设计回旋水域宽度（米） ">
        <el-input v-model="form.swirlingWaterWidth"></el-input>
      </el-form-item>
      <el-form-item label="设计回旋水域水深（米） ">
        <el-input v-model="form.swirlingWaterDepth"></el-input>
      </el-form-item>
      <el-form-item label="泊位长度（米） ">
        <el-input v-model="form.berthLength"></el-input>
      </el-form-item>
      <el-form-item label="泊位性质 ">
        <!--<el-input v-model="form.berthNature"></el-input>-->
        <el-select v-model="form.berthNature" placeholder="请选择">
          <el-option
            v-for="item in ber"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主要货种 ">
        <el-input v-model="form.goods"></el-input>
      </el-form-item>
      <el-form-item label="固体危货标志(是/否) ">
        <!--<el-input v-model="form.solidDangerousSign"></el-input>-->
        <el-select v-model="form.solidDangerousSign" placeholder="请选择">
          <el-option
            v-for="item in pro"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="液体危货标志 ">
        <el-input v-model="form.liquidDangerousSign"></el-input>
      </el-form-item>
      <el-form-item label="包装危险货物 ">
        <!--<el-input v-model="form.packageDangerousGoods"></el-input>-->
        <el-select v-model="form.packageDangerousGoods" placeholder="请选择">
          <el-option
            v-for="item in pack"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设计年通过能力液体危险品、散货、件杂货物（万吨）  ">
        <el-input v-model="form.passAbilityLiquid"></el-input>
      </el-form-item>
      <el-form-item label="设计年通过能力集装箱（万TEU） ">
        <el-input v-model="form.passAbilityBox"></el-input>
      </el-form-item>
      <el-form-item label="设计通过汽车数量（万标辆）  ">
        <el-input v-model="form.passAbilityCar"></el-input>
      </el-form-item>
      <el-form-item label="设计通过旅客数量（万人） ">
        <el-input v-model="form.passAbilityPassenger"></el-input>
      </el-form-item>
      <el-form-item label="开放类型(非开放、一类开放、二类开放) ">
        <!--<el-input v-model="form.openType"></el-input>-->
        <el-select v-model="form.openType" placeholder="请选择">
          <el-option
            v-for="item in open"
            :key="item.imp"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开放批准启用机构 ">
        <el-input v-model="form.approvalAuthority"></el-input>
      </el-form-item>
      <el-form-item label="*开放批准启用文号 ">
        <el-input v-model="form.textNumber"></el-input>
      </el-form-item>
      <el-form-item label="开放批准启用日期 ">
        <el-input v-model="form.activationDate"></el-input>
      </el-form-item>
      <el-form-item label="备注 ">
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
  import {mod} from '@/api/berth.js'

  export default {
    data() {
      return {
        form: {
          id: '',
          fullName: '',
          shortName: '',
          englishName: '',
          structure: '',
          productionDate: '',
          businessModel: '',
          unitName: '',
          contact: '',
          telephone: '',
          productionUse: '',
          structureLevel: '',
          designBerthCapacity: '',
          approvedBerthCapacity: '',
          waterWidth: '',
          waterDepth: '',
          waterLength: '',
          swirlingWaterWidth: '',
          swirlingWaterDepth: '',
          berthLength: '',
          berthNature: '',
          goods: '',
          solidDangerousSign: '',
          liquidDangerousSign: '',
          packageDangerousGoods: '',
          passAbilityLiquid: '',
          passAbilityBox: '',
          passAbilityCar: '',
          passAbilityPassenger: '',
          openType: '',
          approvalAuthority: '',
          textNumber: '',
          activationDate: '',
          remark: ''
        },
        str: [
          {
            value: '1',
            label: '重力式'
          },
          {
            value: '2',
            label: '板桩式'
          }, {
            value: '3',
            label: '高桩式'
          }, {
            value: '4',
            label: '混合式'
          }, {
            value: '5',
            label: '浮码头'
          }, {
            value: '6',
            label: '其它'
          }
        ],
        bus: [
          {
            value: '1',
            label: '业主自备'
          },
          {
            value: '2',
            label: '公用'
          }
        ],
        pro: [
          {
            value: '0',
            label: '是'
          },
          {
            value: '1',
            label: '否'
          }
        ],
        ber: [
          {
            value: '0',
            label: '客运'
          },
          {
            value: '1',
            label: '液体危险品'
          },
          {
            value: '2',
            label: '集装箱'
          },
          {
            value: '3',
            label: '散货'
          },
          {
            value: '4',
            label: '件杂货'
          },
          {
            value: '5',
            label: '滚装'
          },
          {
            value: '6',
            label: '多用途'
          },
          {
            value: '7',
            label: '公务'
          },
          {
            value: '8',
            label: '其它'
          }
        ],
        pack: [
          {
            value: '0',
            label: '包装危险货物'
          },
          {
            value: '1',
            label: '散装油类'
          },
          {
            value: '2',
            label: '散装液体化学品'
          },
          {
            value: '3',
            label: '散装固体'
          },
          {
            value: '4',
            label: '散装液化气'
          }
        ],
        open: [
          {
            value: '1',
            label: '非开放'
          },
          {
            value: '2',
            label: '一类开放'
          },
          {
            value: '3',
            label: '二类开放'
          }
        ],
        show: false,
        coordinate: []
      }
    },
    created() {
      this.getQuery()
    },
    props: ['mul', 'disabled'],
    mounted() {
      this.getgis()
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
      },
      modgis() {
        setTimeout(() => {
          $('iframe[name="hqdtgisFrame"]').get(0).contentWindow.openWindow('../static/HSgis/coor/coorMap.html?type=Point', 'width=1200,height=500,top=100px,left=200px')
        }, 0)
      },
      getgis() {
        var _this = this
        window.addEventListener('message', function (e) {
          if (e.data.act === 'modgis') {
            _this.coordinate = e.data.msg.coordinate
            _this.form.longitude = _this.coordinate[0]
            _this.form.latitude = _this.coordinate[1]
          }
        }, false)
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
  }
</style>
