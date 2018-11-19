<template>
  <div class="list">
    <div class="table" v-if="tableData1.length>0">
      <el-table
        :data="tableData1"
        :border="border"
        style="width: 100%">
        <el-table-column
          width="80">
          <template slot-scope="scope">
            <svg-icon @click.native="close(scope)" icon-class="wrong2"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="processItemBean.name"
          label="规则名称">
        </el-table-column>
        <el-table-column
          prop="processItemBean.description"
          label="规则内容"
        >
        </el-table-column>
        <el-table-column
          prop="direction"
          label="执行航向">
          <template slot-scope="scope">
            <el-select v-model="scope.row.direction" placeholder="请选择">
              <el-option
                v-for="item in hangxiang"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="370"
          label="执行时间">
          <template slot-scope="scope">
            <el-time-picker
              size='mini'
              is-range
              v-model="scope.row.times"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.description" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,object-curly-spacing */

  import {bukong, bufang} from '@/api/Rsupervise.js'

  export default {
    name: 'pre-list',
    props: ['gzData', 'Id'],
    data() {
      return {
        border: false,
        type: null,
        tableData: JSON.parse(JSON.stringify(this.gzData)),
        tableData1: [],
        hangxiang: [{
          value: '1',
          label: '上行'
        }, {
          value: '2',
          label: '下行'
        }, {
          value: '3',
          label: '全部'
        }],
        value4: [1535503500000, 1535503500000],
        processItemId: [],
        processItemDescription: [],
        processItemDirection: [],
        processItemStartTime: [],
        processItemEndTime: []
      }
    },
    watch: {
      gzData() {
        this.tableData = JSON.parse(JSON.stringify(this.gzData))
        this.getData()
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableData.forEach((item, index) => {
          var num = []
          var startTime = `2018/08/29 ${item.startTime}:00`
          var endTime = `2018/08/29 ${item.endTime}:00`
          startTime = startTime.replace(/(\.\d+)?/g, '')
          endTime = endTime.replace(/(\.\d+)?/g, '')
          num.push(new Date(startTime))
          num.push(new Date(endTime))
          item.direction === 1 ? item.direction = '上行' : item.direction === 2 ? item.direction = '下行' : item.direction = '全部'
          item.times = num
        })
        this.tableData1 = JSON.parse(JSON.stringify(this.tableData))
      },
      close(scope) {
        this.tableData1.splice(scope.$index, 1)
      },
      submit(id, name, warnDepartmentId, warnDepartmentName, warnUserId, warnUserName, warnStartTime, warnEndTime, type) {
        this.type = type
        this.tableData1.forEach((item, index) => {
          this.processItemId.push(item.processItemBean.code)
          this.processItemDescription.push(item.description)
          if (item.direction === '上行') {
            this.processItemDirection.push('1')
          } else if (item.direction === '下行') {
            this.processItemDirection.push('2')
          } else if (item.direction === '全部') {
            this.processItemDirection.push('3')
          } else {
            this.processItemDirection.push(item.direction)
          }
          var startTime = this.addZero(new Date(item.times[0]).getHours()) + ':' + this.addZero(new Date(item.times[0]).getMinutes()) + ':' + this.addZero(new Date(item.times[0]).getSeconds())
          var endTime = this.addZero(new Date(item.times[1]).getHours()) + ':' + this.addZero(new Date(item.times[1]).getMinutes()) + ':' + this.addZero(new Date(item.times[1]).getSeconds())
          this.processItemStartTime.push(startTime)
          this.processItemEndTime.push(endTime)
        })
        bukong(id, name, this.type, warnStartTime, warnEndTime, warnDepartmentId, warnDepartmentName, warnUserId, warnUserName, this.processItemId, this.processItemDirection, this.processItemStartTime, this.processItemEndTime, this.processItemDescription).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.$router.push({
            path: 'Rsupervise'
          })
        })
      },
      submitbf(id, name, type) {
        this.tableData1.forEach((item, index) => {
          this.processItemId.push(item.processItemBean.code)
          this.processItemDescription.push(item.description)
          if (item.direction === '上行') {
            this.processItemDirection.push('1')
          } else if (item.direction === '下行') {
            this.processItemDirection.push('2')
          } else if (item.direction === '全部') {
            this.processItemDirection.push('3')
          } else {
            this.processItemDirection.push(item.direction)
          }
          var startTime = this.addZero(new Date(item.times[0]).getHours()) + ':' + this.addZero(new Date(item.times[0]).getMinutes()) + ':' + this.addZero(new Date(item.times[0]).getSeconds())
          var endTime = this.addZero(new Date(item.times[1]).getHours()) + ':' + this.addZero(new Date(item.times[1]).getMinutes()) + ':' + this.addZero(new Date(item.times[1]).getSeconds())
          this.processItemStartTime.push(startTime)
          this.processItemEndTime.push(endTime)
        })
        bufang(id, name, type, this.processItemId, this.processItemDirection, this.processItemStartTime, this.processItemEndTime, this.processItemDescription).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.$router.push({
            path: 'Rsupervise'
          })
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
  .svg-icon {
    cursor: pointer;
    font-size: 24px;
  }
</style>
