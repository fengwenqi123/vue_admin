<template>
  <el-card class="main">
    <div class="detailes">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>身份证号码</span>
            <el-input
              v-model="obj.zjhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>姓名 </span>
            <el-input
              v-model="obj.xm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>证件类型</span>
            <el-input
              v-model="obj.zjlx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 姓名拼音</span>
            <el-input
              v-model="obj.xmpy"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>性别 </span>
            <el-input
              v-model="obj.xb"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>民族 </span>
            <el-input
              v-model="obj.mz"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>出生日期</span>
            <el-input
              v-model="obj.csrq"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>曾用名</span>
            <el-input
              v-model="obj.zym"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>出生地点</span>
            <el-input
              v-model="obj.csdd"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>身份证住址</span>
            <el-input
              v-model="obj.sfzzz"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>身份证发证机关 </span>
            <el-input
              v-model="obj.sfzfzjg"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>身份证有效开始日期</span>
            <el-input
              v-model="obj.sfzyxksrq"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>身份证有效截止日期</span>
            <el-input
              v-model="obj.sfzyxjzrq"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>职务 </span>
            <el-input
              v-model="obj.zw"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>职称 </span>
            <el-input
              v-model="obj.zc"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>学历 </span>
            <el-input
              v-model="obj.xl"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>学位 </span>
            <el-input
              v-model="obj.xw"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>毕业院校</span>
            <el-input
              v-model="obj.byyx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>专业 </span>
            <el-input
              v-model="obj.zy"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 毕业日期</span>
            <el-input
              v-model="obj.byrq"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>毕业证号码</span>
            <el-input
              v-model="obj.byzhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>非航海类学历</span>
            <el-input
              v-model="obj.fhhlxl"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>非航海类学位 </span>
            <el-input
              v-model="obj.fhhlxw"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>非航海类毕业院校</span>
            <el-input
              v-model="obj.fhhlbyyx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 非航海类专业 </span>
            <el-input
              v-model="obj.fhhlzy"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 非航海类毕业日期</span>
            <el-input
              v-model="obj.fhhlbyrq"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 非航海类毕业证号码</span>
            <el-input
              v-model="obj.fhhlbyzhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 国籍 </span>
            <el-input
              v-model="obj.gj"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>  户籍省份</span>
            <el-input
              v-model="obj.hjsf"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 户籍城市</span>
            <el-input
              v-model="obj.hjcs"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 户籍区县</span>
            <el-input
              v-model="obj.hjqx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 护照类型</span>
            <el-input
              v-model="obj.hzlx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>  护照号码 </span>
            <el-input
              v-model="obj.hzhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 护照截止日期</span>
            <el-input
              v-model="obj.hzjzrq"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>  通信省份</span>
            <el-input
              v-model="obj.txsf"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 通信城市 </span>
            <el-input
              v-model="obj.txcs"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 通信地址</span>
            <el-input
              v-model="obj.txdz"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 邮政编码</span>
            <el-input
              v-model="obj.yzbm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>  固定联系电话 </span>
            <el-input
              v-model="obj.gdlxdh"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 手机号码</span>
            <el-input
              v-model="obj.sjhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 邮箱</span>
            <el-input
              v-model="obj.yx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> qq号码</span>
            <el-input
              v-model="obj.qqhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 微信号码</span>
            <el-input
              v-model="obj.wxhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 采集地点</span>
            <el-input
              v-model="obj.cjdd"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 有效标志</span>
            <el-input
              v-model="obj.yxbz"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 备注</span>
            <el-input
              v-model="obj.bz"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 社保帐号</span>
            <el-input
              v-model="obj.sbzh"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 注册机构</span>
            <el-input
              v-model="obj.zcjg"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 被合并身份证号码</span>
            <el-input
              v-model="obj.bhbsfzhm"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>  联系座机一</span>
            <el-input
              v-model="obj.lxzjy"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 联系座机二</span>
            <el-input
              v-model="obj.lxzje"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 联系人手机一 </span>
            <el-input
              v-model="obj.lxrsjy"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>联系人手机二</span>
            <el-input
              v-model="obj.lxrsje"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 联系人一</span>
            <el-input
              v-model="obj.lxry"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 联系人一关系</span>
            <el-input
              v-model="obj.lxrygx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 联系人二</span>
            <el-input
              v-model="obj.lxre"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 联系人二关系 </span>
            <el-input
              v-model="obj.lxregx"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 公安部认证标志 </span>
            <el-input
              v-model="obj.gabrzbz"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 公安部认证时间</span>
            <el-input
              v-model="obj.gabrzsj"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>最后更新日期</span>
            <el-input
              v-model="obj.yzhgxrq"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span> 删除标志1是0否</span>
            <el-input
              v-model="obj.scbz"
              :disabled="true">
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-button type="primary" style="margin-top: 10px;" @click="back">返回</el-button>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        obj: this.rowes
      }
    },
    props: ['rowes'],
    methods: {
      back() {
        this.$emit('iback')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    margin-top: 14px;
    text-align: center;
  }

  .detailes {
    text-align: center;
    background: #fff;
    .grid-content {
      margin-top: 8px;
      span {
        display: inline-block;
        width: 180px;
        text-align: left;
      }
    }
  }
</style>
