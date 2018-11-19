<template>
  <div class="add-rsupervise">
    <el-row :gutter="20" style="height: 100%;">
      <el-col :span="6">
        <div class="main">
          <div class="title">
            <p v-if="!mod">新增监管区域</p>
            <p v-if="mod">修改监管区域</p>
          </div>
          <div class="forms">
            <forms class="forms" :val="val" ref="form" @iform="iform">
              <el-form-item size="large">
                <el-button type="primary" @click="submit">立即保存</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </forms>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="map">
          <iframes></iframes>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* eslint-disable space-before-function-paren */

  import forms from '@/views/Rsupervise/form'
  import iframes from '@/components/iframe/area.vue'

  export default {
    name: 'add-rsupervise',
    props: ['mul'],
    data() {
      return {
        mod: false,
        val: '',
        area: null,
        arrowangle: null
      }
    },
    components: {
      forms,
      iframes
    },
    created() {
      this.getQuery()
      // this.getArea()
      // this.getArrowangle()
    },
    methods: {
      submit() {
        this.$refs.form.addfrom()
      },
      cancel() {
        this.$emit('ievent', true)
      },
      getQuery() {
        if (this.mul !== '') {
          this.mod = true
          this.val = this.mul
        }
      },
      iform(active) {
        if (active) {
          this.cancel()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-rsupervise {
    .map {
      position: relative;
      height: 682px;
    }
    height: 680px;
    .title {
      p {
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        color: #666;
        border-bottom: 1px solid #d7d7d8;
      }
    }
    .forms {
      margin: 88px 0;
    }
  }

</style>
