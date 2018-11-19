<template>
  <div class="details">
    <slot></slot>
    <div class="main">
      <div class="top">
        <div class="title">
          <span class="h3">{{obj.fullName}}</span>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>港口：</span><span>{{obj.port}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>经度：</span><span>{{obj.longitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>电话：</span><span>{{obj.telephone}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>纬度：</span><span>{{obj.latitude}}</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="lab">
        <el-card class="box-card">
          <div class="text item">
            <ul>
              <el-scrollbar class="scrolls">
              <li>
                <p>
                  <span>码头长度（米)</span><span>{{obj.pierLength}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>码头建造日期</span><span>{{obj.buildDate}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>码头单位名称</span><span>{{obj.unitName}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>联系人</span><span>{{obj.contact}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>联系电话</span><span>{{obj.telephone}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>VTS信号覆盖情况</span><span>{{obj.vts}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>AIS信号覆盖情况</span><span>{{obj.ais}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>CCTV信号覆盖情况</span><span>{{obj.cctv}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>备注</span><span>{{obj.remark}}</span>
                </p>
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
  /* eslint-disable no-unused-vars,object-curly-spacing */

  export default {
    name: 'xqing',
    props: ['xqing'],
    data() {
      return {
        obj: this.xqing
      }
    },
    created() {
    },
    watch: {
      xqing() {
        this.obj = this.xqing
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .details {
    width: 420px;
    .svg-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
    position: fixed;
    bottom: 56px;
    right: 20px;
    margin-top: 10px;
    .main {
      background: #fff;
      .bodys {
        .beizhu, p {
          padding: 0 15px;
          line-height: 20px;
          height: 20px;
        }
      }
      .top {
        padding: 14px 10px;
        background: #01579B;
        .title {
          display: flex;
          align-items: center;
          .h3 {
            display: inline-block;
            font-size: 24px;
            padding: 0px;
            color: #fff;
            margin: 0px 10px 0px 0px;
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
