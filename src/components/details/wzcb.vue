<template>
  <div class="details">
    <div class="close" @click="close">
      <svg-icon icon-class="close"></svg-icon>
    </div>
    <div class="main">
      <div class="top">
        <div class="title">
          <span class="h3">{{obj.siteName}}</span>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>负责人</span><span>{{obj.contact}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>联系电话</span><span>{{obj.telephone}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>经度</span><span>{{obj.longitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>纬度</span><span>{{obj.latitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>编内 </span><span>{{obj.fullTime}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>编外 </span><span>{{obj.pluralism}}</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="lab">
        <el-card class="box-card">
          <div class="text item">
            <p class="tit">物资信息</p>
            <ul>
              <el-scrollbar class="scrolls">
                <li v-for="(item,index) in dataList" :key="index">
                  <el-row>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">物资名称：{{item.name}}</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">物资数量：{{item.resourceNum}}</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">归属：{{item.attribution}}</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">类型：{{item.type}}</div>
                    </el-col>
                  </el-row>
                </li>
              </el-scrollbar>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing */
  import {wzlists} from '@/api/material.js'

  export default {
    props: ['wzcb'],
    data() {
      return {
        flag: true,
        obj: this.wzcb,
        dataList: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      close() {
        this.$emit('iback')
      },
      getList() {
        wzlists(this.obj.id).then(response => {
          this.dataList = response.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .details {
    width: 420px;
    .close {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 14px;
      .svg-icon {
        font-size: 22px;
        color: #fff;
      }
    }
    margin-top: 10px;
    .main {
      .top {
        padding: 24px 20px;
        background: #01579B;
        .title {
          display: flex;
          align-items: center;
          .h3 {
            display: inline-block;
            font-size: 26px;
            padding: 0px;
            color: #fff;
            margin: 0px;
            width: 370px;
            flex: 1;
          }
          .back {
            display: inline-block;
            width: 56px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            color: #01579B;
            background: #fff;
            margin-left: 10px;
            font-size: 10px;
            cursor: pointer;
          }
        }
        .con {
          margin-top: 20px;
          .grid-content {
            span {
              display: inline-block;
              font-size: 14px;
              margin: 3px 0;
              color: #fff;
              overflow: hidden; /*超出部分隐藏*/
              white-space: nowrap; /*不换行*/
              text-overflow: ellipsis; /*超出部分文字以...显示*/
            }
            span:nth-child(2) {
              margin-left: 6px;
            }
          }
        }
      }
      .lab {
        .tit {
          padding-left: 20px;
          color: #9B9B9B;
          font-size: 15px;
          span:nth-child(2) {
            float: right;
            margin-right: 15px;
            cursor: pointer;
          }
        }
        ul {
          height: 400px;
          li {
            border-bottom: 1px solid #EAEAEA;
            height: 45px;
            line-height: 45px;
            span {
              width: 50%;
              display: inline-block;
              overflow: hidden; /*超出部分隐藏*/
              white-space: nowrap; /*不换行*/
              text-overflow: ellipsis; /*超出部分文字以...显示*/
            }
            /*span:nth-child(1) {*/
            /*width: 170px;*/
            /*text-align: center;*/
            /*}*/
          }
        }
      }
    }
  }

</style>
