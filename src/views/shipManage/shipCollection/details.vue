<template>
  <el-card class="main">
    <div class="detailes">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船舶名称</span>
            <el-input
              v-model="obj.zwcm"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>英文船名</span>
            <el-input
              v-model="obj.ywcm"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>MMSI</span>
            <el-input
              v-model="obj.mmsi"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船舶识别号</span>
            <el-input
              v-model="obj.cbsbh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船舶登记号</span>
            <el-input
              v-model="obj.cbdjh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>初次登记号</span>
            <el-input
              v-model="obj.ccdjh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船检登记号</span>
            <el-input
              v-model="obj.cjdjh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船籍港代码</span>
            <el-input
              v-model="obj.cjgdm"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船舶种类</span>
            <el-input
              v-model="obj.cbzldm"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船舶类型</span>
            <el-input
              v-model="obj.cblxdm"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>核定航区</span>
            <el-input
              v-model="obj.hdhqdm"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>建造日期</span>
            <el-input
              v-model="obj.jzrq"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船舶总长(米)</span>
            <el-input
              v-model="obj.cbzc"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 船舶型宽(米)</span>
            <el-input
              v-model="obj.cbxk"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>船舶型深(米)</span>
            <el-input
              v-model="obj.cbxs"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>总吨位(吨)</span>
            <el-input
              v-model="obj.zdw"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 净吨位(吨)</span>
            <el-input
              v-model="obj.jdw"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>参考载重吨(吨)</span>
            <el-input
              v-model="obj.ckzzd"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>所有人</span>
            <el-input
              v-model="obj.syr"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>所有人地址</span>
            <el-input
              v-model="obj.syrdz"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>所有人联系电话</span>
            <el-input
              v-model="obj.syrlxdh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>经营人</span>
            <el-input
              v-model="obj.jyr"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>经营人地址</span>
            <el-input
              v-model="obj.jyrdz"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>经营人联系电话</span>
            <el-input
              v-model="obj.jyrlxdh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>管理人</span>
            <el-input
              v-model="obj.glr"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 管理人地址</span>
            <el-input
              v-model="obj.glrdz"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 管理人联系电话</span>
            <el-input
              v-model="obj.glrlxdh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 主机制造厂名称</span>
            <el-input
              v-model="obj.zjzzcmc"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> imo</span>
            <el-input
              v-model="obj.imo"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 船舶呼号</span>
            <el-input
              v-model="obj.hh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 龙骨以上最大高度</span>
            <el-input
              v-model="obj.lgyszdgd"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 满载吃水</span>
            <el-input
              v-model="obj.mzcs"
              :disabled="false">
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
      }
    },
    props: ['rowes'],
    computed: {
      obj() {
        return this.rowes
      }
    },
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
