<template>
  <div class="alarm">
    <div class="title">
      <p class="font1">
        <svg-icon icon-class="alarm"/>
        <span>{{Check.name}} 告警！</span>
        <span class="samll">{{num}}</span></p>
    </div>
    <div class="mid">
      <el-row :gutter="15">
        <el-col v-if="type===0 ||type===1 || type===2" :span="5">
          <div class="step">
            <el-steps direction="vertical" :space="100" :active="active">
              <el-step title="告警信息" :description="des.name1"></el-step>
              <el-step title="告警处置" :description="des.name2"></el-step>
              <el-step title="告警处理" :description="des.name3"></el-step>
              <el-step title="监督复核" :description="des.name4"></el-step>
            </el-steps>
          </div>
        </el-col>
        <el-col v-if="type===0" :span="9">
          <div class="Management">
            <p>告警处置</p>
            <div class="span">
              <span>处理方式：</span>
              <el-select v-model="value" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
            <div class="sub">
              <!--<el-button>修改录入</el-button>-->
              <el-button type="primary" @click="check">确认处理</el-button>
            </div>
          </div>
        </el-col>
        <el-col v-if="type===1" :span="9">
          <div class="Management">
            <p>告警处理</p>
            <div class="span">
              <span>处理方式：</span>
              <el-select v-model="value1" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button class="newcz" type="primary" v-if="value1==='1'" @click="dialogFormVisible = true">新增违章
              </el-button>
              <el-button class="newcz" type="primary" v-if="value1==='2'" @click="information=true">修改船舶
              </el-button>
            </div>
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea1">
            </el-input>
            <div class="sub">
              <!--<el-button>修改录入</el-button>-->
              <el-button type="primary" @click="Handle">确认处理</el-button>
            </div>
          </div>
        </el-col>
        <el-col v-if="type===2" :span="9">
          <div class="Management">
            <p>监督复核</p>
            <div class="span">
              <span>复核方式：</span>
              <el-select v-model="value2" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea2">
            </el-input>
            <div class="sub">
              <!--<el-button>修改录入</el-button>-->
              <el-button type="primary" @click="review">确认处理</el-button>
            </div>
          </div>
        </el-col>
        <el-col v-if="type===3" :span="14">
          <el-row :gutter="25">
            <el-col :span="6">
              <el-card class="box-card">
                <div class="text item">
                  <p>告警信息</p>
                  <span>来源：{{Check.sourceId}}</span>
                  <span>告警点：{{Check.sectionName}}</span>
                  <span>告警时间：{{Alarm.addTimeString}}</span>
                  <span>信息内容:</span>

                </div>
              </el-card>
              <div class="font">1</div>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card">
                <div class="text item">
                  <p>告警处置</p>
                  <div class="div1" v-html="gaojing.name1"></div>
                </div>
              </el-card>
              <div class="font">2</div>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card">
                <div class="text item">
                  <p>告警处理</p>
                  <div class="div1" v-html="gaojing.name2"></div>
                </div>
              </el-card>
              <div class="font">3</div>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card">
                <div class="text item">
                  <p>监督复核</p>
                  <div class="div1" v-html="gaojing.name3"></div>
                </div>
              </el-card>
              <div class="font">4</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <div class="magnifier">
            <p class="name"><span>船名：</span><span></span></p>
            <el-row class="pic">
              <el-col :span="12" v-for="(item,key) in imageUrl" :key="key">
                <Magnifier :src="item.srcall" :src_big="item.imageUrl" :i="key"></Magnifier>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-tabs type="border-card">
            <el-tab-pane label="船舶信息">
              <div>
                <el-row :gutter="2">
                  <el-col :span="6">
                    <div class="grid-content">船舶名称</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p>
                      {{ZwcmData.zccmc}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">船籍港</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p>{{ZwcmData.cjgdm}}</p>
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
                    <div class="grid-content clearfix">船舶种类</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p>{{ZwcmData.cbzldm}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">建造日期</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p style="font-size: 12px">{{ZwcmData.jzrq}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">核定航区</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">
                      <p>{{ZwcmData.hxqy}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">船舶长度</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p>{{ZwcmData.cbzc}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">船舶型宽</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p>{{ZwcmData.cbxk}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">船舶型深</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p>{{ZwcmData.cbxs}}
                    </p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">总吨位</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix"><p>{{ZwcmData.zdw}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">净吨位</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">
                      <p>{{ZwcmData.jdw}}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">参考载重吨</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content clearfix">
                      <p>{{ZwcmData.ckzzd}}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="船舶证书">
              <el-table
                :data="data"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="cbzs"
                  label="船舶证书"
                >
                </el-table-column>
                <el-table-column
                  prop="fzrq"
                  label="签发日期"
                >
                </el-table-column>
                <el-table-column
                  prop="zsyxq"
                  label="证书有效日期"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="船舶诚信">船舶1诚信</el-tab-pane>
            <el-tab-pane label="最低配员">最低配员</el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          <el-tabs type="border-card">
            <el-tab-pane label="违章信息">
              <div>
                违章信息
              </div>
            </el-tab-pane>
            <el-tab-pane label="重点跟踪">重点跟踪</el-tab-pane>
            <el-tab-pane label="报港记录">报港记录</el-tab-pane>
            <el-tab-pane label="报港未确认">报港未确认</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog title="新建违章记录" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="船舶名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入船舶名称"></el-input>
          </el-form-item>
          <el-form-item label="违章描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入具体违章内容内容"
              v-model="form.textarea">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="船舶信息修改录入" :visible.sync="information">
        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane label="船舶信息">
            <el-row :gutter="2">
              <el-col :span="6">
                <div class="grid-content">船舶名称</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">
                  {{ship.zccmc}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.zccmc"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">船籍港</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.cjgdm}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.cjgdm"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">船舶识别号</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.cbsbh}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.cbsbh"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">船舶种类</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.cbzldm}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.cbzldm"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">建造日期</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.jzrq}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.jzrq"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">核定航区</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">
                  <p v-if="show!==0">{{ship.hxqy}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.hxqy"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">船舶长度</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.cbzc}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.cbzc"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">船舶型宽</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.cbxk}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.cbxk"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">船舶型深</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.cbxs}}
                </p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.cbxs"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">总吨位</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==0">{{ship.zdw}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.zdw"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">净吨位</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">
                  <p v-if="show!==0">{{ship.jdw}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.jdw"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">参考载重吨</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">
                  <p v-if="show!==0">{{ship.ckzzd}}</p>
                  <el-input v-if="show===0" class="input1" size="mini" v-model="ship.ckzzd"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="船舶证书">
            <el-table
              :data="tableData2"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                label="船舶证书"
              >
                <template slot-scope="scope">
                  <span v-if="show!==1">{{ scope.row.name }}</span>
                  <span v-if="show===1" class="cell-edit-input"><el-input v-model="scope.row.name"
                                                                          placeholder="请输入内容"></el-input></span>
                </template>
              </el-table-column>
              <el-table-column
                label="签发时间"
              >
                <template slot-scope="scope">
                  <span v-if="show!==1">{{ scope.row.date }}</span>
                  <span v-if="show===1" class="cell-edit-input"><el-input v-model="scope.row.date"
                                                                          placeholder="请输入内容"></el-input></span>
                </template>
              </el-table-column>
              <el-table-column
                label="有效日期"
              >
                <template slot-scope="scope">
                  <span v-if="show!==1">{{ scope.row.address }}</span>
                  <span v-if="show===1" class="cell-edit-input"><el-input v-model="scope.row.address"
                                                                          placeholder="请输入内容"></el-input></span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="最低配员">
            <el-row :gutter="2">
              <el-col :span="6">
                <div class="grid-content">船舶名称</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">
                  {{ship.name}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.name"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">船长数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.port}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.port"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">大副数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.number}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.number"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">二副数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.type}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.type"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">三副数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.date}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.date"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">水手数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">
                  <p v-if="show!==2">{{ship.Navigation}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.Navigation"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">驾驶员数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.length}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.length"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">机工数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.wide}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.wide"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">大管轮数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.deep}}
                </p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.deep"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">二管轮数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix"><p v-if="show!==2">{{ship.tonnage}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.tonnage"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">三管轮数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">
                  <p v-if="show!==2">{{ship.Nettonnage}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.Nettonnage"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">轮机长数目</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content clearfix">
                  <p v-if="show!==2">{{ship.Reference}}</p>
                  <el-input v-if="show===2" class="input1" size="mini" v-model="ship.Reference"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="重点跟踪船舶">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="重点跟踪原因">
              </el-table-column>
              <el-table-column
                prop="name"
                label="列入重点跟踪日期">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="船舶违章">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="违章日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="处罚站所">
              </el-table-column>
              <el-table-column
                prop="name"
                label="内容">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="船舶诚信">
            <el-row :gutter="2">
              <el-col :span="12">
                <div class="grid-content">诚信级别</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content clearfix"><p v-if="show!==5">
                  {{ship.name}}</p>
                  <el-input v-if="show===5" class="input1" size="mini" v-model="ship.name"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="报港未确认">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="船舶名称">
              </el-table-column>
              <el-table-column
                prop="name"
                label="报岗日期">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="报港记录">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="船舶名称">
              </el-table-column>
              <el-table-column
                prop="name"
                label="类别">
              </el-table-column>
              <el-table-column
                prop="date"
                label="报港日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="货种">
              </el-table-column>
              <el-table-column
                prop="date"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="name"
                label="始发港">
              </el-table-column>
              <el-table-column
                prop="date"
                label="目的港">
              </el-table-column>
              <el-table-column
                prop="name"
                label="所属单位">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-row class="button">
          <el-button type="primary" @click="res">修改</el-button>
          <el-button type="primary" @click="information=false">提交处理</el-button>
          <el-button @click="information=false">取消</el-button>
        </el-row>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  /* eslint-disable object-curly-spacing,no-undef */
  import Magnifier from '@/components/Magnifier/Magnifier'
  import {
    findCheck,
    findByShipCheckId,
    findAlarmAndHandle,
    alarm,
    findByZwcm,
    certificate,
    guoji
  } from '@/api/AlarmDisposal.js'

  export default {
    data() {
      return {
        Check: {},
        str: '',
        ship: {},
        type: 0,
        des: {
          name1: '暂无',
          name2: '待处置',
          name3: '待处理',
          name4: '待复核'
        },
        active: 1,
        information: false,
        dialogFormVisible: false,
        form: {
          name: '',
          textarea: ''
        },
        formLabelWidth: '120px',
        center: 'center',
        srcall: [],
        options: [{
          value: '1',
          label: '电话联系'
        }, {
          value: '2',
          label: '人工核查'
        }, {
          value: '3',
          label: 'VHF联系'
        }, {
          value: '4',
          label: '其他'
        }],
        options1: [{
          value: '1',
          label: '违章录入'
        }, {
          value: '2',
          label: '船舶信息修改'
        }],
        options2: [{
          value: '1',
          label: '处理完成'
        }, {
          value: '2',
          label: '处理未完成'
        }],
        value: '',
        value1: '',
        value2: '',
        textarea: '',
        textarea1: '',
        textarea2: '',
        tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tableData: [],
        index: 0,
        show: null,
        shipCheckId: '',
        num: '',
        imageUrl: [],
        Alarm: [],
        a: 0,
        gaojing: {
          name1: '',
          name2: '',
          name3: ''
        },
        zwcm: '',
        ZwcmData: '',
        data: []
      }
    },
    components: {
      Magnifier
    },
    created() {
      this.getQuery()
    },
    mounted() {
    },
    methods: {
      handleClick(tab, event) {
        this.index = tab.index
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      check() {
        this.a = 1
        alarm(this.Alarm.id, this.value, this.textarea, this.a).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 0)
          }
        })
        // this.type = 1
        // this.active = 2
      },
      Handle() {
        this.a = 2
        alarm(this.Alarm.id, this.value1, this.textarea1, this.a).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 0)
          }
        })
        // this.type = 2
        // this.active = 3
      },
      review() {
        this.a = 3
        alarm(this.Alarm.id, this.value2, this.textarea2, this.a).then(response => {
          if (response.code === 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 0)
          }
        })
      },
      res() {
        this.show = parseInt(this.index)
      },
      getQuery() {
        if (this.$route.params.id) {
          sessionStorage.setItem('id', this.$route.params.id)
          sessionStorage.setItem('type', this.$route.params.type)
          sessionStorage.setItem('active', this.$route.params.active)
          sessionStorage.setItem('zwcm', this.$route.params.name)
        }
        this.shipCheckId = sessionStorage.getItem('id')
        this.type = parseInt(sessionStorage.getItem('type'))
        this.active = parseInt(sessionStorage.getItem('active'))
        this.zwcm = sessionStorage.getItem('zwcm')
        this.findcheck()
        this.findPic()
        this.findzmcm()
        this.Certificate()
        this.findGuoJi()
      },
      // 船舶核查结果
      findcheck() {
        findCheck(this.shipCheckId).then(response => {
          this.Check = response.data
          this.des.name1 = `来源:${this.Check.sourceId},告警点:${this.Check.sectionName}`
          this.findAlarm()
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
          console.log(this.imageUrl)
        })
      },
      // 告警处理查询
      findAlarm() {
        findAlarmAndHandle(this.shipCheckId).then(response => {
          if (response.data) {
            this.Alarm = response.data
            this.des.name1 += '告警时间：' + this.Alarm.addTimeString
            if (this.type >= 0) {
              this.Alarm.operationBeanList.forEach((item, index) => {
                if (item.type === 1) {
                  this.gaojing.name1 = `<p style="margin-top:15px">处置人员：${item.userName}</p>
                                          <p style="margin-top:15px">处置方式：${item.methodDesc}</p>
                                          <p style="margin-top:15px">处置时间：${item.addTimeString}</p>
                                          <p style="margin-top:15px">处置描述： ${item.description}</p>`
                  this.des.name2 = `处置人员：${item.userName},处置方式：${item.methodDesc},处置时间：${item.addTimeString},处置描述：
              ${item.description}`
                } else if (item.type === 2) {
                  this.gaojing.name2 = `<p style="margin-top:15px">处置人员：${item.userName}</p>
                                          <p style="margin-top:15px">处置方式：${item.methodDesc}</p>
                                          <p style="margin-top:15px">处置时间：${item.addTimeString}</p>
                                          <p style="margin-top:15px">处置描述： ${item.description}</p>`
                  this.des.name3 = `处置人员：${item.userName},处置方式：${item.methodDesc},处置时间：${item.addTimeString},处置描述：
              ${item.description}`
                } else if (item.type === 3) {
                  this.gaojing.name3 = `<p style="margin-top:15px">处置人员：${item.userName}</p>
                                          <p style="margin-top:15px">处置方式：${item.methodDesc}</p>
                                          <p style="margin-top:15px">处置时间：${item.addTimeString}</p>
                                          <p style="margin-top:15px">处置描述： ${item.description}</p>`
                  this.des.name4 = `处置人员：${item.userName},处置方式：${item.methodDesc},处置时间：${item.addTimeString},处置描述：
              ${item.description}`
                }
              })
            }
          }
        })
      },
      findzmcm() {
        findByZwcm(this.zwcm).then(response => {
          var obj = JSON.stringify(response.data)
          this.ZwcmData = JSON.parse(obj)
          this.ship = JSON.parse(obj)
        })
      },
      Certificate() {
        certificate(this.zwcm).then(response => {
          if (response.data) {
            var obj = {}
            obj.cbzs = '内河船舶适航证书'
            obj.fzrq = response.data.fzrq
            obj.zsyxq = response.data.zsyxq
            this.data.push(obj)
          }
        })
      },
      findGuoJi() {
        guoji(this.zwcm).then(response => {
          if (response.data) {
            var obj = {}
            obj.cbzs = '国籍证书'
            obj.fzrq = response.data.zssxq
            obj.zsyxq = response.data.zsyxq
            this.data.push(obj)
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .alarm {
    padding: 15px 20px;
    .title {
      height: 60px;
      line-height: 60px;
      background: #FFF3CD;
      border-left: 13px solid #FFD54F;
      .font1 {
        .svg-icon {
          font-size: 24px;
          margin-left: 26px;
          margin-right: 8px;
        }
        span {
          font-size: 26px;
          color: #856404;
          font-weight: bold;
        }
        .samll {
          font-size: 18px;
          margin-left: 10px;
          font-weight: normal;
        }

      }
    }
    .mid {
      margin-top: 15px;
      .step {
        height: 360px;
      }
      .box-card {
        span {
          display: block;
          margin-top: 15px;
          padding: 0 5px;
        }
        .div1 {
          padding: 0 5px;
          p {
            margin-top: 10px;
          }
        }
      }
      .Management {
        height: 360px;
        background: #fff;
        p {
          height: 30px;
          line-height: 30px;
          background: #F5F5F5;
          padding-left: 10px;
        }
        .span {
          margin: 16px 30px;
        }
        .el-textarea {
          padding: 0 30px;
        }
        .sub {
          margin-top: 12px;
          text-align: right;
          padding-right: 30px;
          padding-bottom: 15px;
        }
      }
      .magnifier {
        height: 352px;
        background: #fff;
        .name {
          padding-left: 16px;
          margin: 0;
          height: 30px;
          line-height: 30px;
          background: #f5f5f5;
        }
        .mag {
          padding: 15px 0;
          background: #fff;
        }
        .pic {
          padding: 10px;
          background: #fff;
          .el-col {
            padding: 2px 5px;
            height: 150px;
          }

        }
      }
      .box-card {
        height: 360px;
        position: relative;
        p {
          font-size: 12px;
          width: 100px;
          text-indent: 14px;
          height: 18px;
          line-height: 18px;
          background-size: 100% 100%;
          background: url("../../assets/img/grey.png") no-repeat;
        }
      }
      .font {
        position: absolute;
        width: 20px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        background: rgb(216, 216, 216);
        border-radius: 50%;
        text-align: center;
        margin-left: -18px;
        z-index: 12;
        top: 0px;
        /*border: 3px solid #fff;*/
        color: #fff;
      }
    }
    .bottom {
      margin-top: 15px;
    }
    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
    .newcz {
      margin-left: 10px;
    }
    .grid-content {
      padding: 10px;
      p {
        display: inline-block;
      }
    }
    .show {
      span {
        display: inline-block;
      }
    }
    .modify1 {
      padding: 8px;
      p {
        display: none;
      }
      .input1 {
        display: inline-block;
      }
    }
    .button {
      text-align: right;
      margin-top: 28px;
    }

  }

</style>
<style>
  .el-step__title {
    width: 100px;
    background: url("../../assets/img/grey.png") no-repeat;
    padding: 0px !important;
    margin-bottom: 10px;
    background-size: 100% 100%;
  }

  .el-step__title.is-process {
    background: url("../../assets/img/blue.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }

  /*.el-step__description{*/
  /*background: none;*/
  /*color: #000;*/
  /*}*/
</style>
