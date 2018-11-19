<template>
  <div class="details">
    <div class="main">
      <div class="top">
        <div class="title">
          <span class="h3">{{obj.fullName}}</span>
          <span class="back" @click="back">返回</span>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>联系人：</span><span>{{obj.contact}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>联系电话：</span><span>{{obj.telephone}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>投产日期：</span><span>{{obj.productionDate}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>所属码头编号：</span><span>{{obj.pierNo}}</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="lab">
        <el-card class="box-card">
          <div class="text item">
            <p class="tit"><span>基本信息</span></p>
            <ul>
              <el-scrollbar class="scrolls">
                <li>
                  <p>
                    <span>所属码头编号</span><span>{{obj.pierNo}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>中文名称全称</span><span>{{obj.fullName}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>中文名称简称</span><span>{{obj.shortName}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>英文名称</span><span>{{obj.englishName}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>结构 </span><span>{{obj.structure}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>投产日期</span><span>{{obj.productionDate}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>经营模式</span><span>{{obj.businessModel}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>业主单位名称</span><span>{{obj.unitName}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span> 联系人</span><span>{{obj.contact}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>是否生产用</span><span>{{obj.productionUse===1?'是':'否'}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>联系电话</span><span>{{obj.telephone}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>水工结构等级</span><span>{{obj.structureLevel}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计靠泊能力</span><span>{{obj.designBerthCapacity}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>核定靠泊能力</span><span>{{obj.approvedBerthCapacity}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>前沿停泊水域设计宽度</span><span>{{obj.waterWidth}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>前沿停泊水域设计深度</span><span>{{obj.waterDepth}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计回旋水域长度</span><span>{{obj.waterLength}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计回旋水域宽度</span><span>{{obj.swirlingWaterWidth}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计回旋水域水深</span><span>{{obj.swirlingWaterDepth}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>泊位长度</span><span>{{obj.berthLength}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>泊位性质</span><span>{{obj.berthNature}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>主要货种</span><span>{{obj.goods}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>固体危货标志</span><span>{{obj.solidDangerousSign}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>液体危货标志</span><span>{{obj.liquidDangerousSign}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>包装危险货物</span><span>{{obj.packageDangerousGoods}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计年通过能力液体危险品、散货、件杂货物</span><span>{{obj.passAbilityLiquid}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计年通过能力集装箱（万TEU）</span><span>{{obj.passAbilityBox}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计通过汽车数量（万标辆）</span><span>{{obj.passAbilityCar}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设计通过旅客数量（万人）</span><span>{{obj.passAbilityPassenger}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>开放类型</span><span>{{obj.openType}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>开放批准启用机构</span><span>{{obj.approvalAuthority}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>开放批准启用文号</span><span>{{obj.textNumber}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>开放批准启用日期</span><span>{{obj.activationDate}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>备注</span><span>{{obj.remark}}</span>
                  </p>
                </li>
              </el-scrollbar>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {mod} from '@/api/wharf.js'

  export default {
    props: ['objitem'],
    data() {
      return {
        flag: true,
        obj: this.objitem,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '220px'
      }
    },
    methods: {
      back() {
        this.$emit('back', this.flag)
      },
      mod() {
        this.dialogFormVisible = true
        this.form = JSON.parse(JSON.stringify(this.obj))
      },
      sure() {
        mod(this.form).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.dialogFormVisible = false
            this.obj = this.form
          }
        })
      },
      cancel() {
        this.form = this.obj
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .details {
    margin-top: 10px;
    .main {
      .top {
        padding: 24px 20px;
        background: #01579B;
        .title {
          display: flex;
          align-items: center;
          .h3 {
            display: inline-block;
            font-size: 26px;
            padding: 0px;
            color: #fff;
            margin: 0px;
            width: 370px;
            flex: 1;
          }
          .back {
            display: inline-block;
            width: 56px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            color: #01579B;
            background: #fff;
            margin-left: 10px;
            font-size: 10px;
            cursor: pointer;
          }
        }
        .con {
          margin-top: 20px;
          .grid-content {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            span {
              display: inline-block;
              font-size: 14px;
              margin: 3px 0;
              color: #fff;
            }
            span:nth-child(2) {
              margin-left: 6px;
            }
          }
        }
      }
      .lab {
        .tit {
          padding-left: 20px;
          color: #9B9B9B;
          font-size: 15px;
          span:nth-child(2) {
            float: right;
            margin-right: 15px;
            cursor: pointer;
          }
        }
        ul {
          height: 400px;
          li {
            border-bottom: 1px solid #EAEAEA;
            height: 45px;
            line-height: 45px;
            p {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            span {
              display: inline-block;

            }
            span:nth-child(1) {
              width: 170px;
              text-align: center;
            }
          }
        }
      }
    }
  }

</style>
