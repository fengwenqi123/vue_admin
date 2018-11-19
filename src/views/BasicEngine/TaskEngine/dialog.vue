<template>
  <el-dialog title="任务确认" :visible.sync="dias" :before-close="handleClose">
    <el-scrollbar class="scrolls">
      <el-form :model="form" ref="form">
        <el-form-item label="任务名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="任务类型" :label-width="formLabelWidth" prop="region">
          <el-select v-model="form.region" placeholder="请选择任务类型">
            <el-option label="类型一" value="shanghai"></el-option>
            <el-option label="类型二" value="beijing"></el-option>
          </el-select>
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
        <el-form-item label="接单时间" :label-width="formLabelWidth" prop="time">
          <el-input v-model="form.time" style="width: 200px;"></el-input>
          <el-form-item label="处置时间" prop="chuzhi" :label-width="formLabelWidth"
                        style="margin-left: 111px;display: inline-block;">
            <el-input v-model="form.chuzhi" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="管理部门" :label-width="formLabelWidth" prop="dep">
          <el-select v-model="form.dep" placeholder="请选择管理部门">
            <el-option label="类型一" value="shanghai"></el-option>
            <el-option label="类型二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行部门" :label-width="formLabelWidth" prop="zhixing">
          <el-select v-model="form.zhixing" placeholder="请选择执行部门">
            <el-option label="类型一" value="shanghai"></el-option>
            <el-option label="类型二" value="beijing"></el-option>
          </el-select>
          <el-form-item label="执行人" :label-width="formLabelWidth" style="margin-left: 111px;display: inline-block;"
                        prop="pop">
            <el-select v-model="form.pop" placeholder="请选择执行人">
              <el-option label="类型一" value="shanghai"></el-option>
              <el-option label="类型二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">确 定</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </div>
  </el-dialog>
</template>

<script>
  /* eslint-disable space-before-function-paren,no-unused-vars,object-curly-spacing */
  import {lists} from '@/api/rule.js'

  export default {
    props: ['dia'],
    data() {
      return {
        gridData: [],
        dialogFormVisible: false,
        form: {
          checked: null,
          name: '',
          region: '',
          lev: null,
          sure: null,
          chuzhi: '',
          time: null,
          zhixing: null,
          type: [],
          pop: '',
          desc: ''
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
    },
    methods: {
      handleClose() {
        this.$emit('idialog', this.selection)
      },
      list() {
        lists().then(response => {
          this.gridData = response.data
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
