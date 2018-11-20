<template>
  <div class="RedAlarm">
    <div class="title" v-if="Check.status!==2">
      <p class="font1">
        <svg-icon icon-class="alarm"/>
        <span>{{Check.name}} 告警！</span>
        <span class="samll">{{num}}</span></p>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8">
          <p class="p1"><span>船名：{{Check.name}}</span>
            <!--<span>AIS：{{null}}</span>-->
          </p>
          <div class="magnifier">
            <el-card class="box-card">
              <el-row class="pic" :gutter="10">
                <el-col :span="12" v-for="(item,key) in imageUrl" :key="key" style="height: 120px;margin-top: 4px;">
                  <Magnifier :src="item.srcall" :src_big="item.imageUrl" :i="key"></Magnifier>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <div class="rtmp">
            <el-card class="box-card">
              <p class="p1">视频监控</p>
              <div class="videos">
                <rtmp :rtmps="rtmps" ref="rtmp"></rtmp>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="ship">
            <el-tabs type="border-card" style="height: 320px;">
              <el-tab-pane label="船舶信息" style="height: 266px;">
                <el-scrollbar class="scrolls">
                  <div>
                    <el-row>
                      <el-col :span="6">
                        <div class="grid-content">船舶名称</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>
                          {{ZwcmData.zccmc}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">英文船名</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{ZwcmData.ywcm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">MMSI</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{ZwcmData.mmsi}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船舶识别号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{ZwcmData.cbsbh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船舶登记号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p style="font-size: 12px">{{ZwcmData.cbdjh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 初次登记号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.ccdjh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船检登记号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{ZwcmData.cjdjh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船籍港代码</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{ZwcmData.cjgdm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船舶种类</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{ZwcmData.cbzldm}}
                        </p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船舶类型</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{ZwcmData.cblxdm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 核定航区</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.hdhqdm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 建造日期</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.jzrq}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 船舶总长(米)</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.cbzc}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 船舶型宽(米)</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.cbxk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船舶型深(米)</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.cbxs}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 总吨位(吨)</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.zdw}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 净吨位(吨)</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.jdw}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 参考载重吨(吨)</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.ckzzd}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 所有人</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.syr}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 所有人地址</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.syrdz}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 所有人联系电话</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.syrlxdh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 经营人</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.jyr}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 经营人地址</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.jyrdz}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 经营人联系电话</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.jyrlxdh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 管理人</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.glr}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 管理人地址</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.glrdz}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 管理人联系电话</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.glrlxdh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 主机制造厂名称</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.zjzzcmc}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> imo</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.imo}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 船舶呼号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.hh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 龙骨以上最大高度</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.lgyszdgd}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 满载吃水</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{ZwcmData.mzcs}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="船舶证书" style="height: 266px;">
                <el-scrollbar class="scrolls">
                  <el-table
                    :data="data"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      prop="zsmc"
                      label="船舶名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="hashcode"
                      label="船舶编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="fzrq"
                      label="发证日期"
                    >
                    </el-table-column>
                    <el-table-column
                      label="有效日期">
                      <template slot-scope="scope">
                        <div class="div" :class="{active: scope.row.actives}">{{scope.row.yxrq}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="最低配员" style="height: 266px;">
                <el-scrollbar class="scrolls">
                  <div v-if="py">
                    <el-row>
                      <el-col :span="6">
                        <div class="grid-content">配员版本号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>
                          {{py.pybbh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">英文航区</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{py.ywhq}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">自动化程度代码</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{py.zdhcddm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">设备装备情况</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p style="font-size: 12px">{{py.gmdss}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船舶公约类型</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.cbgylx}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船长证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{py.czzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船长证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{py.czzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">大副数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{py.dfsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">大副证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{py.dfzsdj}}
                        </p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">二副数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"><p>{{py.efsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">二副证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.efzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 三副数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.sfsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 三副证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.sfzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 三副证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.sfzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 值班水手数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zbsssm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 值班水手证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zbsszsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">轮机长数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ljzsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 轮机长证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ljzzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 轮机长证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ljzzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 大管轮数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.dglsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 大管轮证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.dglzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 大管轮证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.dglzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 二管轮数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.eglsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 二管轮证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.eglzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">二管轮证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.eglzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 三管轮数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.sglsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 三管轮证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.sglzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 三管轮证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.sglzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 值班机工数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zgjgsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 值班机工证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zbjgzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">客运部人员数目(客船)</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.kybrysm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 运部人员证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.kybryzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> gmdss操作员类型</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.gmdssczylx}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> gmdss操作员数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.gmdssczysm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> gmdss通用操作员证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.gmdsstyczyzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 驾机员数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.jjysm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 驾机员证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.jjyzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 驾机员证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.jjyzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 轮机员数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ljysm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 轮机员证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ljyzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 轮机员证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ljyzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 驾驶员数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.jsysm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 驾驶员证书等级</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.jsyzsdj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 驾驶员证书规则条款</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.jsyzsgztk}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 驾驶员助理数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.jsyzlsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 轮机员助理数目</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ljyzlsm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 证书起始有效期</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zsqsyxq}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 证书有效期</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zsyxq}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 签发机构代码</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.hsjgdm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 备注</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.bz}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">英文备注</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.ywbz}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 背书</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.bs}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">证书印刷号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zsysh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">注销登记号码</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zxdjhm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">创建时间</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.cjsj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">创建人</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.cjr}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">创建机构代码</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.cjjgdm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">创建部门代码</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.cjbmdm}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">最后修改时间</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zhxgsj}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">最后修改人</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.zhxgr}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">国籍版本号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.gjbbh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">船舶登记号</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.cbdjh}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix"> 数据中心更新时间</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content clearfix">
                          <p>{{py.gxsj}}</p>
                        </div>
                      </el-col>

                    </el-row>
                  </div>
                </el-scrollbar>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="record">
            <el-tabs type="border-card" style="height: 320px;">
              <el-tab-pane label="违章信息" style="height: 340px;">
                <el-scrollbar class="scrolls">
                  <el-table
                    :data="weizhangList"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="addDate"
                      label="违章日期"
                      :show-overflow-tooltip="true"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      :show-overflow-tooltip="true"
                      label="违章内容">
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      width="120"
                      :show-overflow-tooltip="true"
                      label="违章处理状态">
                    </el-table-column>
                  </el-table>
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="重点跟踪">

              </el-tab-pane>
              <el-tab-pane label="电子报告">电子报告</el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-undef */
  import Magnifier from '@/components/Magnifier/Magnifier'
  import {findCheck, findByShipCheckId, findByZwcm} from '@/api/AlarmDisposal.js'
  import {weizhang, peiyuan, playback} from '@/api/kakouList.js'
  import rtmp from '@/components/video/index'
  import {shipzhzs} from '@/api/tabs.js'

  export default {
    computed: {
      spannum() {
        return 24 / this.imageUrl.length
      }
    },
    data() {
      return {
        restaurants: [],
        rtmps: 'rtmp://10.100.70.228:1935/00a0008900b2000b001d006000f50072/1',
        data: [],
        state: '',
        Check: {},
        str: '',
        ship: {},
        keyword: null,
        shipCheckId: '',
        num: '',
        imageUrl: [],
        Alarm: [],
        a: 0,
        flag: null,
        selects: '',
        zwcm: '',
        ZwcmData: '',
        obj: null,
        page: {
          pageNum: 1,
          pageSize: 10
        },
        order: '',
        sort: '',
        shipName: '',
        status: '',
        py: null,
        zhzs: {
          pageNum: 1, pageSize: 5000, order: null, sort: null, shipName: null, zsmc: null
        },
        weizhangList: null
      }
    },
    components: {
      Magnifier, rtmp
    },
    mounted() {
      // this.getRtmp()
    },
    created() {
      this.getQuery()
      this.findzs()
    },
    methods: {
      getQuery() {
        if (this.$route.query.id) {
          this.shipCheckId = this.$route.query.id
          this.zwcm = this.$route.query.name
        }
        this.findcheck()
        this.findPic()
        if (this.zwcm) {
          this.findzmcm()
          this.findPeiyuan()
          this.findWeizhang()
        }
        this.playbacks()
      },
      getRtmp() {
        this.$refs.rtmp.getUser(this.rtmps)
      },
      // 船舶核查结果
      findcheck() {
        findCheck(this.shipCheckId).then(response => {
          this.Check = response.data
          var num = []
          this.Check.shipCheckTaskBeanList.forEach((item, index) => {
            if (item.status !== 2) {
              this.str = `${item.itemName}不通过`
              num.push(this.str)
            }
          })
          this.num = num.join(',')
        })
      },
      findPic() {
        findByShipCheckId(this.shipCheckId).then(response => {
          var arr = response.data
          for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
              if (arr[j].type > arr[j + 1].type) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
              }
            }
          }
          arr.forEach((item, index) => {
            var obj = {}
            obj.srcall = item.thumbnailUrl
            obj.imageUrl = item.imageUrl
            this.imageUrl.push(obj)
          })
        })
      },
      // 证书查询
      findzs() {
        this.zhzs.shipName = this.zwcm
        shipzhzs(this.zhzs).then(response => {
          this.data = response.data.dataList
          this.data.forEach((item, index) => {
            if (new Date(item.yxrq).getTime() - new Date().getTime() > 0) {
              item.actives = false
            } else {
              item.actives = true
            }
          })
        })
      },
      // 船舶违章查询
      findWeizhang() {
        weizhang(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.zwcm, this.keyword, this.status).then(response => {
          this.weizhangList = response.data
        })
      },
      findzmcm() {
        findByZwcm(this.zwcm).then(response => {
          var obj = JSON.stringify(response.data)
          this.ZwcmData = JSON.parse(obj)
          this.ship = JSON.parse(obj)
        })
      },
      // 最低配员
      findPeiyuan() {
        peiyuan(this.zwcm).then(response => {
          this.py = response.data
        })
      },
      // 视频回放
      playbacks() {
        playback(this.shipCheckId).then(response => {
          this.rtmps = response.data
          this.$refs.rtmp.getUser(this.rtmps)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .RedAlarm {
    padding: 15px 20px;
    .title {
      height: 60px;
      line-height: 60px;
      background: #F8D7DA;
      border-left: 13px solid #DC3545;
      .font1 {
        .svg-icon {
          font-size: 24px;
          margin-left: 26px;
          margin-right: 8px;
          color: rgba(114, 28, 36, 1);
        }
        span {
          font-size: 26px;
          color: #721C24;
          font-weight: bold;
        }
        .samll {
          font-size: 18px;
          margin-left: 10px;
          font-weight: normal;
        }
      }
    }
    .content {
      margin-top: 15px;
      .el-col {
        .p1 {
          height: 24px;
          line-height: 24px;
          background: #f5f5f5;
          padding-left: 15px;
        }
        .magnifier {
          padding: 18px;
          height: 273px;
          background: #fff;
        }
      }
      .ship {
        .el-row {
          padding: 20px;
        }
        .grid-content {
          border: 1px solid #f5f5f5;
          height: 40px;
          padding: 0 10px;
          line-height: 40px;
        }
      }
      .record {
        margin-top: 15px;
        .el-row {
          padding: 20px;
        }
        .grid-content {
          padding: 10px;
        }
      }
      .rtmp {
        margin-top: 15px;
      }
    }
    .active {
      color: red;
    }

  }

</style>

