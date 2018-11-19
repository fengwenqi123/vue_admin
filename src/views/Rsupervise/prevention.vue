<template>
  <div class="prevention">
    <titles>
      <div class="alls">
        <div class="slotl">
          <div class="one">
            <span>{{dataList.name}}</span>
            <span><switchs @ievent="ievent" :type="type"></switchs></span>
            <span>创建时间：{{dataList.addTimeString}}</span>
            <span>所属部门:{{dataList.departmentName}}</span>
            <span>创建人:{{dataList.userName}}</span>
          </div>
          <div class="two">
            <p>区域描述：{{describe}}</p>
          </div>
          <div v-if="active" class="three">
        <span>
         <span> 布控提醒部门：</span>
          <select class="form-control" name="supLayer" v-model="selected" @change="watch()">
          <option value="">请选择</option>
          <option v-for="item in data2" :value="item.id" :key="item.id">
            <span v-if="!item.layer" v-text="item.name"></span>
            <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
            <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==12" v-text="'　　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==15" v-text="'　　  ┝ '+item.name"></span>
          </option>
        </select>
        </span>
            <span>
         <span> 布控提醒人员：</span>
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
         <span> 布控时间：</span>
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
              <el-button type="primary" @click="dia = true">添加规则</el-button>
              <el-button v-if="active" type="success" @click="submit_bk">保存布控</el-button>
              <el-button v-if="!active" type="danger" @click="submit_bf">保存布防</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </titles>
    <div class="list_div" v-show="gzData.length>0">
      <el-card shadow="always">
        <preList :gzData="gzData" :Id="id" ref="pre"></preList>
      </el-card>
    </div>
    <div class="dialogs">
      <dialogs :dia="dia" @idialog="idialog"></dialogs>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing,no-unneeded-ternary */

  import titles from '@/components/title'
  import switchs from '@/components/switch'
  import preList from '@/views/Rsupervise/preList.vue'
  import dialogs from '@/views/Rsupervise/dialog.vue'
  import {froms, gzList} from '@/api/Rsupervise.js'
  import {findDep} from '@/api/DepManagement'
  import {lists1} from '@/api/UserManagement'

  export default {
    components:
      {
        titles,
        switchs,
        preList,
        dialogs
      },
    data() {
      return {
        type: null,
        id: null,
        selected: null,
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
        depValue: '',
        popData: [{
          value: '1',
          label: 'admin'
        }],
        popValue: '',
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
    created() {
      this.getQuery()
    },
    watch: {
      // selected() {
      //   alert(111)
      //   // this.popValue = null
      //   lists1(this.order, this.sort, this.status, this.selected, this.roleId, this.keyword).then(response => {
      //     this.popData = response.data
      //   })
      // }
    },
    methods: {
      watch() {
        lists1(this.order, this.sort, this.status, this.selected, this.roleId, this.keyword).then(response => {
          this.popData = response.data
          this.popValue = null
        })
      },
      ievent(active) {
        this.active = active
      },
      idialog(selection) {
        this.dia = false
        this.selection = selection
        if (this.selection) {
          this.selection.forEach((item, index) => {
            var obj = {}
            var obj1 = {}
            obj.name = item.name
            obj.description = item.rule
            obj.code = item.id
            item.processItemBean = obj
            item.direction = ''
            item.startTime = '00:00:00'
            item.endTime = '23:59:59'
          })
          this.gzData = this.gzData.concat(this.selection)
        }
      },
      getQuery() {
        this.id = this.$route.query.id
        this.type = parseInt(this.$route.query.type) === 2 ? false : true
        this.lists()
        this.gzLists()
      },
      lists() {
        froms(this.id).then(response => {
          this.dataList = response.data
          if (this.dataList.warnDepartmentId) {
            this.selected = this.dataList.warnDepartmentId
          }
          if (this.dataList.warnUserId) {
            this.popValue = this.dataList.warnUserId
          }
          if (this.dataList.warnStartTime) {
            var warnStartTime = new Date(`2010/10/10 ${this.dataList.warnStartTime}`)
            var warnEndTime = new Date(`2010/10/10 ${this.dataList.warnEndTime}`)
            this.time_value = []
            this.time_value.push(warnStartTime)
            this.time_value.push(warnEndTime)
          }
          this.findAuth()
        })
      },
      gzLists() {
        gzList(this.id).then(response => {
          this.gzData = response.data
          console.log(this.gzData)
        })
      },
      submit_bk() {
        this.data2.forEach((item, index) => {
          if (this.selected === item.id) {
            this.BmName = item.name
          }
        })
        this.popData.forEach((item, index) => {
          if (this.popValue === item.id) {
            this.popName = item.name
          }
        })
        var startTime = this.addZero(this.time_value[0].getHours()) + ':' + this.addZero(this.time_value[0].getMinutes()) + ':' + this.addZero(this.time_value[0].getSeconds())
        var endTime = this.addZero(this.time_value[1].getHours()) + ':' + this.addZero(this.time_value[1].getMinutes()) + ':' + this.addZero(this.time_value[1].getSeconds())
        var type = 3
        this.$refs.pre.submit(this.id, this.dataList.name, this.selected, this.BmName, this.popValue, this.popName, startTime, endTime, type)
      },
      submit_bf() {
        var type = 2
        this.$refs.pre.submitbf(this.id, this.dataList.name, type)
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
      },
      addZero(i) {
        if (i < 10) {
          i = '0' + i
        }
        return i
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
