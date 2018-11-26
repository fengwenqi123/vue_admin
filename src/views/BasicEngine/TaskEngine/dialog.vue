<template>
  <el-dialog title="任务确认" :visible.sync="dias" :before-close="handleClose">
    <el-scrollbar class="scrolls">
      <el-form :model="form" ref="form">
        <el-form-item label="任务名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="任务类型" :label-width="formLabelWidth" prop="region">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <!--<el-select v-model="form.region" placeholder="请选择任务类型">-->
          <!--<el-option label="类型一" value="shanghai"></el-option>-->
          <!--<el-option label="类型二" value="beijing"></el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item label="优先等级" :label-width="formLabelWidth" prop="lev">
          <el-select v-model="form.lev" placeholder="请选择优先等级">
            <el-option label="等级一" value="1"></el-option>
            <el-option label="等级二" value="2"></el-option>
            <el-option label="等级三" value="3"></el-option>
            <el-option label="等级四" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自主接单" :label-width="formLabelWidth" prop="checked">
          <el-checkbox v-model="form.checked">允许</el-checkbox>
          <el-form-item label="任务确认" prop="sure" :label-width="formLabelWidth"
                        style="margin-left: 260px;display: inline-block;">
            <el-select v-model="form.sure" placeholder="请选择任务类型">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label="接单时限" :label-width="formLabelWidth" prop="time">
          <el-input v-model="form.time" style="width: 200px;"></el-input>
          <el-form-item label="处置时限" prop="chuzhi" :label-width="formLabelWidth"
                        style="margin-left: 111px;display: inline-block;">
            <el-input v-model="form.chuzhi" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="管理部门" :label-width="formLabelWidth" prop="dep">
          <select class="form-control" name="supLayer" v-model="form.dep">
            <option value="">请选择</option>
            <option v-for="item in depList" :value="item.id" :key="item.id">
              <span v-if="!item.layer" v-text="item.name"></span>
              <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
              <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
              <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
              <span v-if="item.layer && item.layer.length==12" v-text="'　　　　┝ '+item.name"></span>
              <span v-if="item.layer && item.layer.length==15" v-text="'　　　　　　┝ '+item.name"></span>
            </option>
          </select>
        </el-form-item>
        <el-form-item label="执行部门" :label-width="formLabelWidth" prop="zhixing">
          <select class="form-control" name="supLayer" v-model="form.zhixing" @change="watch()">
            <option value="">请选择</option>
            <option v-for="item in zxList" :value="item.id" :key="item.id">
              <span v-if="!item.layer" v-text="item.name"></span>
              <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
              <span v-if="item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
              <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
              <span v-if="item.layer && item.layer.length==12" v-text="'　　　　┝ '+item.name"></span>
              <span v-if="item.layer && item.layer.length==15" v-text="'　　　　　　┝ '+item.name"></span>
            </option>
          </select>
          <el-form-item label="执行人" :label-width="formLabelWidth" style="margin-left: 111px;display: inline-block;"
                        prop="pop">
            <el-select v-model="form.pop" placeholder="请选择" size="mini">
              <el-option
                v-for="item in popData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sures">确 定</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </div>
  </el-dialog>
</template>

<script>
  /* eslint-disable space-before-function-paren,no-unused-vars,object-curly-spacing */
  import {lists} from '@/api/rule.js'
  import {findDep} from '@/api/DepManagement'
  import {lists1} from '@/api/UserManagement'
  import {Type_list, createdList} from '@/api/taskEngine.js'

  export default {
    props: ['dia'],
    data() {
      return {
        gridData: [],
        dialogFormVisible: false,
        depList: null,
        zxList: null,
        order: '',
        sort: '',
        status: '',
        roleId: '',
        keyword: '',
        popData: null,
        typeList: null,
        form: {
          dep: null,
          checked: null,
          name: null,
          region: null,
          lev: null,
          sure: null,
          chuzhi: null,
          time: null,
          zhixing: null,
          type: null,
          pop: null,
          desc: null
        },
        selection: null,
        formLabelWidth: '120px'
      }
    },
    computed: {
      dias() {
        return this.dia
      }
    },
    created() {
      this.list()
      this.findDeps()
      this.findTypeList()
    },
    methods: {
      handleClose() {
        this.$emit('idialog', this.selection)
      },
      sures() {
        if (!this.form.name) {
          this.$message({
            message: '请先填写任务名称'
          })
          return
        }
        if (!this.form.region) {
          this.$message({
            message: '请先填写任务类型'
          })
          return
        }
        var eventId = 1
        createdList(this.form.region, eventId, this.form.lev, this.form.lev, this.form.checked, this.form.sure, this.form.time, this.form.chuzhi, this.form.dep, this.form.zhixing, this.form.pop, this.form.name).then(response => {

        })
        // this.resetForm('form')
        // this.$emit('idialog', this.selection)
      },
      list() {
        lists().then(response => {
          this.gridData = response.data
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      findDeps() {
        findDep().then(response => {
          this.depList = response.data.dataList
          this.zxList = response.data.dataList
        })
      },
      watch() {
        lists1(this.order, this.sort, this.status, this.form.zhixing, this.roleId, this.keyword).then(response => {
          this.popData = response.data
          this.form.pop = null
        })
      },
      findTypeList() {
        Type_list('').then(response => {
          this.typeList = response.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .form-control {
    width: 200px;
    height: 36px;
    border-radius: 4px;
  }
</style>
