<template>
  <div class="prevention">
    <titles>
      <div class="alls">
        <div class="slotl">
          <div class="one">
            <span>{{kakouData.name}}</span>
            <span>所属地市：{{kakouData.city}}</span>
            <span> 所属部门：</span>
            <select class="form-control" name="supLayer1" v-model="selected1" >
            <option value="">请选择</option>
            <option v-for="item in data2" :value="item.id" :key="item.id">
                <span v-if="!item.layer" v-text="item.name"></span>
                <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
                <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
                <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
                <span v-if="item.layer && item.layer.length==12" v-text="'　　　　┝ '+item.name"></span>
                <span v-if="item.layer && item.layer.length==15" v-text="'　　　　　　┝ '+item.name"></span>
            </option>
            </select>
          </div>
          <div class="two">
            <p>卡口描述：{{describe}}</p>
          </div>
          <div class="three">
        <span>
         <span> 执勤部门：</span>
          <select class="form-control" name="supLayer" v-model="selected" @change="watch()">
          <option value="">请选择</option>
          <option v-for="item in data2" :value="item.id" :key="item.id">
            <span v-if="!item.layer" v-text="item.name"></span>
            <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
            <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==12" v-text="'　　　　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==15" v-text="'　　　　　　┝ '+item.name"></span>
          </option>
        </select>
        </span>
        <span>
         <span> 执勤人员：</span>
          <el-select v-model="popValue" placeholder="请选择" size="mini">
             <el-option
               v-for="item in popData"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
          </el-select>
        </span>
            <span>
         <span> 执勤时间：</span>
            <el-time-picker
              is-range
              v-model="time_value"
              size="mini"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
        </span>
          </div>
        </div>
        <div class="slotr">
          <div class="four">
            <el-row>
              <el-button type="primary" @click="dutys">保存执勤</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </titles>
    <div>
       <rule-lists></rule-lists>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing,no-unneeded-ternary */
  import titles from '@/components/title'
  import switchs from '@/components/switch'
  import ruleLists from '@/views/SectionManagement/bayonetControl/ruleLists'
  import {gzList, getKaKouInfo, duty} from '@/api/bayonetControl.js'
  import {findDep, findDepName} from '@/api/DepManagement'
  import {lists1} from '@/api/UserManagement'
  export default {
    components:
      {
        titles,
        switchs,
        ruleLists
      },
    data() {
      return {
        type: null,
        kakouData: '',
        id: null,
        selected: null,
        departmentName: '',

        data2: null,
        dataList: [],
        gzData: [],
        dd: [],
        describe: '限行限速区域',
        time_value: [new Date(2016, 9, 10, 9, 0), new Date(2016, 9, 10, 17, 0)],
        active: null,
        depData: [{
          value: '1',
          label: 'admin'
        }],
        selected1: '',
        depValue: '',
        popData: [{
          value: '1',
          label: 'admin'
        }],
        popValue: '',
        warnDepartmentName: '',
        dia: false,
        selection: null,
        order: '',
        sort: '',
        status: '',
        roleId: '',
        keyword: '',
        BmName: null,
        popName: null
      }
    },
    watch: {
      selected() {
        // this.popValue = null
        lists1(this.order, this.sort, this.status, this.selected, this.roleId, this.keyword).then(response => {
          this.popData = response.data
        })
      }
    },
    created() {
      this.getQuery()
      this.getKaKou()
    },
    methods: {
      watch() {
        console.log(this.selected)
        lists1(this.order, this.sort, this.status, this.selected, this.roleId, this.keyword).then(response => {
          this.popData = response.data
          this.popValue = null
        })
      },
      dutys() {
        this.data2.forEach((item, index) => {
          if (this.selected === item.id) {
            this.warnDepartmentName = item.name
          }
        })
        this.data2.forEach((item, index) => {
          if (this.selected1 === item.id) {
            this.departmentName = item.name
          }
        })
        this.popData.forEach((item, index) => {
          if (this.popValue === item.id) {
            this.popName = item.name
          }
        })
        var startTime = this.addZero(this.time_value[0].getHours()) + ':' + this.addZero(this.time_value[0].getMinutes()) + ':' + this.addZero(this.time_value[0].getSeconds())
        var endTime = this.addZero(this.time_value[1].getHours()) + ':' + this.addZero(this.time_value[1].getMinutes()) + ':' + this.addZero(this.time_value[1].getSeconds())
        duty(this.id, this.selected1, this.departmentName, this.selected, this.warnDepartmentName, startTime, endTime, this.popValue, this.popName).then((response) => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({
                path: 'bayonetControl'
              })
            }, 500)
          }
        })
      },
      getQuery() {
        this.id = this.$route.query.id
        this.code = this.$route.query.code
        this.type = parseInt(this.$route.query.type) === 2 ? false : true
      },
      getKaKou() {
        getKaKouInfo(this.id).then((response) => {
          console.log(response)
          this.kakouData = response.data
          if (this.kakouData.departmentId) {
            this.selected1 = this.kakouData.departmentId
          }
          if (this.kakouData.warnDepartmentId) {
            this.selected = this.kakouData.warnDepartmentId
          }
          if (this.kakouData.warnUserId) {
            this.popValue = this.kakouData.warnUserId
          }
          if (this.kakouData.warnStartTime) {
            var warnStartTime = new Date(`2010/10/10 ${this.kakouData.warnStartTime}`)
            var warnEndTime = new Date(`2010/10/10 ${this.kakouData.warnEndTime}`)
            this.time_value = []
            this.time_value.push(warnStartTime)
            this.time_value.push(warnEndTime)
          }
          this.findAuth()
        })
      },
      addZero(i) {
        if (i < 10) {
          i = '0' + i
        }
        return i
      },
      findAuth() {
        findDep().then(response => {
          if (response.code === 200) {
            this.data2 = response.data.dataList
          }
        })
        lists1(this.order, this.sort, this.status, this.selected, this.roleId, this.keyword).then(response => {
          this.popData = response.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .prevention {
    padding: 15px;
    .one {
      display: flex;
      align-items: center;
      margin-left: 15px;
      span {
        display: inline-block;
        margin-left: 30px;
      }
      span:nth-child(1) {
        font-size: 28px;
        color: #666;
        margin-left: 0px;
      }
    }
    .two {
      margin-left: 15px;
      margin-top: 12px;
      margin-bottom: 40px;
      P {
        font-size: 18px;
        color: #666;
      }
    }
    .three {
      margin-left: 15px;
      margin-bottom: 30px;
      span {
        color: #666;
        margin-left: 50px;
      }
      span:first-child {
        margin-left: 0px;
      }
    }
    .four {
      .el-button {
        display: block;
        margin: 0px;
        margin-top: 6px;
      }
    }
    .alls {
      display: flex;
      .slotl {
        flex: 1;
      }
      .slotr {
        width: 200px;
      }
    }
    .list_div {
      margin-top: 14px;
    }
    .form-control {
      background-color: #fff;
      background-image: none;
      width: 220px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 28px;
      line-height: 28px;
      outline: 0;
      padding: 0 15px;
    }

  }
</style>
