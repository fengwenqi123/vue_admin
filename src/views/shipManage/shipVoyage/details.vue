<template>
  <el-card class="main">
    <div class="detailes">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>添加时间</span>
            <el-input
              v-model="obj.addTimeString"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>更新时间</span>
            <el-input
              v-model="obj.modifyTimeString"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>	船舶主键</span>
            <el-input
              v-model="obj.cbzj"
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
            <span>	曾用中文船名</span>
            <el-input
              v-model="obj.cyzwcm"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>	中文船名</span>
            <el-input
              v-model="obj.shipName"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>	英文船名</span>
            <el-input
              v-model="obj.shipNameEn"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>	mmsi</span>
            <el-input
              v-model="obj.mmsi"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>	imo</span>
            <el-input
              v-model="obj.imo"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>呼号</span>
            <el-input
              v-model="obj.hh"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 进出港类型</span>
            <el-input
              v-model="obj.type===1?'进港':obj.type===1?'出港':'其他-临时航次'"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>航向</span>
            <el-input
              v-model="obj.direction===1?'上行':obj.direction==2?'下行':'未知'"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>航次数</span>
            <el-input
              v-model="obj.number"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 船舶报告主键</span>
            <el-input
              v-model="obj.shipReportId"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>开始时间（同报告时间）</span>
            <el-input
              v-model="obj.startTime"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>结束时间（同预抵/预离时间）</span>
            <el-input
              v-model="obj.endTime"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>来源</span>
            <el-input
              v-model="obj.registerName"
              :disabled="false">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>备注</span>
            <el-input
              v-model="obj.description"
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
      return {}
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
