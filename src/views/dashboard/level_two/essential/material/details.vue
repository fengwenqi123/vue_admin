<template>
  <div class="details">
    <div class="main">
      <div class="top">
        <div class="title">
          <span class="h3">{{item.siteName}}</span>
          <span class="back" @click="back">返回</span>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>负责人</span><span>{{item.contact}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>联系电话</span><span>{{item.telephone}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>经度</span><span>{{item.longitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>纬度</span><span>{{item.latitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>编内 </span><span>{{item.fullTime}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>编外 </span><span>{{item.pluralism}}</span></div>
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
    props: ['objid', 'objitem'],
    data() {
      return {
        flag: true,
        id: this.objid,
        item: this.objitem,
        dataList: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      back() {
        this.$emit('back', this.flag)
      },
      getList() {
        wzlists(this.id).then(response => {
          this.dataList = response.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .details {
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
        }
        ul {
          height: 400px;
          li {
            border-bottom: 1px solid #EAEAEA;
            margin: 10px 5px;
            padding: 10px 0;
            .el-col {
              .grid-content {
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }

</style>
