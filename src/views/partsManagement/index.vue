<template>
  <div class="partsManagement">
    <div class="title">
      <el-card class="box-card">
        <div class="text item">
          <breadcrumb></breadcrumb>
        </div>
      </el-card>
    </div>
    <el-card class="main">
      <div v-if="show" class="demo-input-suffix clearfix">
        <span>关键字：</span>
        <el-input
          placeholder="请输入关键字"
          v-model="keyword"
          clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
        <div class="add">
          <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">添加</el-button>
          <el-button type="warning" icon="el-icon-edit-outline" size="small" @click="modify">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="del">删除</el-button>
        </div>
      </div>
      <list v-if="show" :tableData="tableData" :list="lists"></list>
      <add-parts v-if="!show" @ievent="ievent"></add-parts>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import Breadcrumb from '@/components/Breadcrumb'
  import {lists} from '@/api/partsManagement'
  import addParts from '@/views/partsManagement/addParts'
  import list from '@/components/table/table'

  export default {
    data() {
      return {
        keyword: '',
        show: true,
        tableData: [],
        lists: [
          {
            prop: 'code',
            label: '编码'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'addTimeString',
            label: '添加时间'
          },
          {
            prop: 'modifyTimeString',
            label: '更新时间'
          }
        ]
      }
    },
    components: {
      Breadcrumb,
      addParts,
      list
    },
    mounted() {
      this.list()
    },
    methods: {
      list() {
        lists(this.pageNum, this.pageSize, this.keyword).then(response => {
          this.tableData = response.data
        })
      },
      ievent(data) {
        this.show = data
      },
      query() {
        this.list()
      },
      reset() {
        this.keyword = ''
        this.list()
      },
      add() {
        this.show = false
      },
      modify() {
      },
      del() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .partsManagement {
    padding: 15px;
    .title {
      /*margin: 10px;*/
    }
    .main {
      margin-top: 20px;
      .el-input {
        width: auto;
      }
      .add {
        float: right;
      }
    }
  }
</style>
