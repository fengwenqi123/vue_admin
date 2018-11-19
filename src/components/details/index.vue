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
              <div class="grid-content bg-purple"><span>负责人：</span><span>{{obj.contact}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>经度：</span><span>{{obj.longitude}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><span>值班电话：</span><span>{{obj.telephone}}</span></div>
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
            <p class="tit"><span>基本信息</span></p>
            <ul>
              <el-scrollbar class="scrolls">
                <li>
                  <p>
                    <span>站点名称</span><span>{{obj.name}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>类别</span><span>{{obj.type}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>所属市级港航管理机构  </span><span>{{obj.cityAgency}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>所属县（区）级港航管理机构  </span><span>{{obj.countyAgency}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>经度</span><span>{{obj.longitude}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>纬度  </span><span>{{obj.latitude}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>值班电话 </span><span>{{obj.telephone}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>地址</span><span>{{obj.address}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>区域</span><span>{{obj.region}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>等级</span><span>{{obj.grade}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>职能</span><span>{{obj.functionWork}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>负责人 </span><span>{{obj.contact}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>行政市</span><span>{{obj.city}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>行政区</span><span>{{obj.area}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>编内</span><span>{{obj.fullTime}}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>编外</span><span>{{obj.pluralism}}</span>
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
  /* eslint-disable object-curly-spacing */

  export default {
    props: ['hszs'],
    data() {
      return {
        flag: true,
        obj: this.hszs
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
    .close{
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 14px;
      .svg-icon{
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
              overflow: hidden;/*超出部分隐藏*/
              white-space: nowrap;/*不换行*/
              text-overflow:ellipsis;/*超出部分文字以...显示*/
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
              overflow: hidden;/*超出部分隐藏*/
              white-space: nowrap;/*不换行*/
              text-overflow:ellipsis;/*超出部分文字以...显示*/
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
