<template>
  <div class="details">
    <div class="close" @click="close">
      <svg-icon icon-class="close"></svg-icon>
    </div>
    <div class="main">
      <div class="top">
        <div class="title">
          <span class="h3">{{obj.name}}</span>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>联系人：</span><span>{{obj.contact}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>联系电话：</span><span>{{obj.telephone}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>经度：</span><span>{{obj.lon}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>纬度：</span><span>{{obj.lat}}</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="lab">
        <el-card class="box-card">
          <div class="text item">
            <p class="tit"><span>基本信息</span></p>
            <ul>
              <el-scrollbar class="scrolls">
                <li>
                  <p>
                    <span>名称</span><span>{{obj.name}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>IP地址</span><span>{{obj.ipaddress}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>品牌</span><span>{{obj.mfrs}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>建设单位</span><span>{{obj.jsdw}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>设备清单</span><span>{{obj.sbqd}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>经度</span><span>{{obj.lon}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>纬度</span><span>{{obj.lat}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>有无数据</span><span>{{obj.isdata}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>AIS数据源监控</span><span>{{obj.aisdsmonitor}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>最远距离</span><span>{{obj.limitdis}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>最远经纬度</span><span>{{obj.limitcoor}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>情况</span><span>{{obj.datastatment}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>原来不通的原因</span><span>{{obj.reason}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>业主单位名称</span><span>{{obj.unitName}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>位置</span><span>{{obj.position}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>联系人</span><span>{{obj.contact}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>备注</span><span>{{obj.remark}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>联系电话</span><span>{{obj.telephone}}</span>
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
  /* eslint-disable object-curly-spacing */

  export default {
    props: ['ais'],
    data() {
      return {
        flag: true,
        obj: this.ais
      }
    },
    methods: {
      close() {
        this.$emit('iback')
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
