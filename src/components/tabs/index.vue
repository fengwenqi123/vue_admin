<template>
  <el-tabs type="border-card">
    <el-tab-pane label="AIS">
      <el-scrollbar class="scrolls">
        <el-row>
          <el-col :span="12"><span>信号接收时间</span></el-col>
          <el-col :span="12"><span>{{ais.receiveTime}}</span></el-col>
          <el-col :span="12"><span>航向</span></el-col>
          <el-col :span="12"><span>{{ais.shipDirection}}</span></el-col>
          <el-col :span="12"><span>纬度</span></el-col>
          <el-col :span="12"><span>{{ais.shipLat}}</span></el-col>
          <el-col :span="12"><span>经度</span></el-col>
          <el-col :span="12"><span>{{ais.shipLon}}</span></el-col>
          <el-col :span="12"><span>船舶信息</span></el-col>
          <el-col :span="12"><span>{{ais.shipMessage}}</span></el-col>
          <el-col :span="12"><span>船舶名称</span></el-col>
          <el-col :span="12"><span>{{ais.shipName}}</span></el-col>
          <el-col :span="12"><span>速度</span></el-col>
          <el-col :span="12"><span>{{ais.shipSpeed}}</span></el-col>
          <el-col :span="12"><span>船艏向</span></el-col>
          <el-col :span="12"><span>{{ais.shipheadDirection}}</span></el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="船舶基本信息">
      <el-scrollbar class="scrolls">
        <el-row v-if="shipxinxi">
          <el-col :span="12"><span>船舶登记号</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cbdjh}}</span></el-col>
          <el-col :span="12"><span>船舶种类代码 </span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cbzldm}}</span></el-col>
          <el-col :span="12"><span>曾用中文船名</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cyzwcm}}</span></el-col>
          <el-col :span="12"><span>牌簿号</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.pbh}}</span></el-col>
          <el-col :span="12"><span>船检登记号 </span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cjdjh}}</span></el-col>
          <el-col :span="12"><span>船籍港代码</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cjgdm}}</span></el-col>
          <el-col :span="12"><span>参考载重吨(吨) </span></el-col>
          <el-col :span="12"><span>{{shipxinxi.ckzzd}}</span></el-col>
          <el-col :span="12"><span>空载吃水(米)</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.kzcs}}</span></el-col>
          <el-col :span="12"><span> 满载吃水(米) </span></el-col>
          <el-col :span="12"><span>{{shipxinxi.mzcs}}</span></el-col>
          <el-col :span="12"><span>净吨位</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.jdw}}</span></el-col>
          <el-col :span="12"><span>中文船名</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.zwcm}}</span></el-col>
          <el-col :span="12"><span> 船舶总长(米)</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cbzc}}</span></el-col>
          <el-col :span="12"><span>船舶型宽(米) </span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cbxk}}</span></el-col>
          <el-col :span="12"><span>船舶型深(米)</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.cbxs}}</span></el-col>
          <el-col :span="12"><span>造船厂名称</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.zccmc}}</span></el-col>
          <el-col :span="12"><span>造船地点</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.zcdd}}</span></el-col>
          <el-col :span="12"><span>安放龙骨日期 </span></el-col>
          <el-col :span="12"><span>{{shipxinxi.aflgrq}}</span></el-col>
          <el-col :span="12"><span>龙骨以上最大高度</span></el-col>
          <el-col :span="12"><span>{{shipxinxi.lgyszdgd}}</span></el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="船舶违章处罚信息">
      <el-scrollbar class="scrolls">
        <el-row v-for="(item,index) in chufaList" :key="index">
          <el-col :span="8"><span>添加时间</span></el-col>
          <el-col :span="16"><span>{{item.addTimeString}}</span></el-col>
          <el-col :span="8"><span>更新时间</span></el-col>
          <el-col :span="16"><span>{{item.modifyTimeString}}</span></el-col>
          <el-col :span="8"><span>违章录入时间</span></el-col>
          <el-col :span="16"><span>{{item.addDate}}</span></el-col>
          <el-col :span="8"><span>违章内容</span></el-col>
          <el-col :span="16"><span>{{item.content}}</span></el-col>
          <el-col :span="8"><span>违章录入单位</span></el-col>
          <el-col :span="16"><span>{{item.dockName}}</span></el-col>
          <el-col :span="8"><span>中文船名</span></el-col>
          <el-col :span="16"><span>{{item.shipName}}</span></el-col>
          <el-col :span="8"><span>违章处理状态(未处理/已处理)</span></el-col>
          <el-col :span="16"><span>{{item.status}}</span></el-col>
          <el-col :span="8"><span>违章时间</span></el-col>
          <el-col :span="16"><span>{{item.violationDate}}</span></el-col>
          <el-col :span="8"><span>违章处理结果</span></el-col>
          <el-col :span="16"><span>{{item.whyRemove}}</span></el-col>
          <el-col :span="8"><span>违章类型</span></el-col>
          <el-col :span="16"><span>{{item.gcvTypeName}}</span></el-col>
          <el-col :span="8"><span>违章标记(违章/黑名单)</span></el-col>
          <el-col :span="16"><span>{{item.flag}}</span></el-col>
          <el-col :span="24">
            <hr>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="船舶持证信息">
      <el-scrollbar class="scrolls">
        <tree v-if="zhzsListobj" :zhzsListobj="zhzsListobj"></tree>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="船舶检验信息">
      <el-scrollbar class="scrolls">
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="电子报告">
      <el-scrollbar class="scrolls">
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  /* eslint-disable object-curly-spacing */

  import {lists, shipchufa, shipzhzs} from '@/api/tabs.js'
  import tree from '@/components/tree'

  export default {
    components: {
      tree
    },
    props: ['name', 'ais'],
    data() {
      return {
        shipxinxi: null,
        chufa: {
          pageNum: null, pageSize: null, order: null, sort: null, shipName: null, status: null
        },
        chufaList: [],
        zhzs: {
          pageNum: null, pageSize: null, order: null, sort: null, shipName: null, zsmc: null
        },
        zhzsList: [],
        zhzsListobj: [],
        children: []
      }
    },
    created() {
      this.getShipManage()
    },
    methods: {
      getShipManage() {
        lists(this.name).then(response => {
          this.shipxinxi = response.data
        })
        this.chufa.shipName = this.name
        shipchufa(this.chufa).then(response => {
          this.chufaList = response.data.dataList
        })
        this.zhzs.shipName = this.name
        shipzhzs(this.zhzs).then(response => {
          this.zhzsList = response.data.dataList
          this.zhzsList.forEach((item, index) => {
            this.children = []
            var obj1 = {}
            var obj2 = {}
            var obj3 = {}
            var obj4 = {}
            var objAll = {}
            objAll.label = item.zsmc
            obj1.label = '证书名称：' + item.zsmc
            obj2.label = '证书编号：' + item.hashcode
            obj3.label = '发证日期：' + item.fzrq
            obj4.label = '有效日期：' + item.yxrq
            this.children.push(obj1)
            this.children.push(obj2)
            this.children.push(obj3)
            this.children.push(obj4)
            objAll.children = this.children
            this.zhzsListobj.push(objAll)
          })
        })
      }
    },
    watch: {
      name() {
        this.getShipManage()
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-col {
    height: 30px;
    line-height: 30px;
  }

  .el-tab-pane {
    height: 350px;
  }
</style>
