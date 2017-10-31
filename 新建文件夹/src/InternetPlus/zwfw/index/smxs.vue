/**
 * 智慧辽源-政务服务-首页-市民心声
 * author:kxc
 * 2017-08-10
 */
<template>
  <div class="zwfw-smxs">
    <div class="zwfw-smxs__title">
      <div>
        <img src="./img/title-bg1.png">
        <span>市民心声</span>
      </div>
    </div>
    <div class="zwfw-smxs__list">
      <ul class="clr">
        <li v-for="item in tabs" :key="item.id">
          <a :id="item.id" href="javascript:void(0);" :class="selectedId === item.id ? 'zwfw-smxs__list__select' : ''" @click="toogle(item)">
            <i :class="['zwfw-smxs__icon', 'zwfw-smxs__icon__'+item.id]"></i>
            <span>{{item.title}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="zwfw-smxs__table" v-for="tab in tabs" :key="tab.id" :class="'tablelist_'+tab.id" v-if="selectedId === tab.id">
      <div class="zwfw-smxs__table__tab clr">
        <span>{{tabId}}</span>
        <a :href="moreurl">更多>></a>
      </div>
      <div class="zwfw-smxs__table__content">
        <el-table  tooltip-effect="light" ref="zxzxtable" :data="zxzxtable" v-show="tab.id==='zxzx'" @row-click="clickTable">
            <el-table-column prop="单位名称" label="咨询部门" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="咨询标题" label="咨询标题" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="咨询时间" label="咨询时间" width="120" align="center" :formatter="getTime"></el-table-column>
        </el-table>
        <el-table  tooltip-effect="light" ref="tsjbtable" :data="tsjbtable" v-show="tab.id==='tsjb'" @row-click="clickTable">
            <el-table-column prop="被投诉单位" label="被投诉部门" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="投诉标题" label="投诉标题" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="添加时间" label="投诉时间" width="120"  align="center" :formatter="getTime"></el-table-column>
        </el-table>
        <el-table  tooltip-effect="light" ref="yjfktable" :data="yjfktable" v-show="tab.id==='yjfk'" @row-click="clickTable">
            <el-table-column prop="单位名称" label="建议部门" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="建议标题" label="建议标题" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="添加时间" label="建议时间" width="120"  align="center" :formatter="getTime"></el-table-column>
        </el-table>
        <el-table  tooltip-effect="light" ref="zxpjtable" :data="zxpjtable" v-show="tab.id==='zxpj'" class="zxpjtable">
            <el-table-column prop="DWMC" label="单位名称" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="XMMC" label="事项名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="评价结果" width="200" align="right">
              <template scope="scope">
                <el-rate v-model="zxpjtable[scope.$index].PJZJ" disabled disabled-void-color="#c0c0c0"></el-rate>
              </template>
            </el-table-column>
        </el-table>
        <el-table tooltip-effect="light" ref="cjwttable" :data="cjwttable" v-show="tab.id==='cjwt'" @row-click="clickTable">
            <el-table-column prop="单位名称" label="单位名称" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="问题" label="问题" :show-overflow-tooltip="true"></el-table-column>
            <!-- <el-table-column prop="登记人" label="登记人" width="120"  align="center"></el-table-column> -->
        </el-table>
      </div>
    </div>
    <el-dialog title="问题浏览" :visible.sync="cjwtll">
        <div class="question-title">{{title}}</div>
        <div class="question-content">{{content}}</div>
    </el-dialog>
  </div>
</template>

<script>
  import getZxzx from '@/services/common/zxts/wyzx/zxlb';
  import getTsjb from '@/services/common/zxts/wyts/tslb';
  import getYjfk from '@/services/common/zxts/wyjy/jylb';
  import getZxpj from '@/services/InternetPlus/qlqd/xzqlqd/pjlb';
  import getCjwt from '@/services/common/zxts/cjwt/wtlb';
  import getcjwt2 from '@/services/common/zxts/cjwt/wtlb';
  import { tableIds } from '@/api/tableId.js';
  import { getTime } from '@/lib/publicFun.js';
  export default {
    data() {
      return {
        tabs: [{
            id: 'zxzx',
            title: '在线咨询',
            actived: true,
            tableid: '在线咨询',
            ownerColname: '登记人账户',
            moreurl:"/zxts/zxlb/index.html",
            detailurl:'/zxts/zxll/index.html'
        }, {
            id: 'tsjb',
            title: '投诉举报',
            actived: false,
            tableid: '在线投诉',
            ownerColname: '登记人账户',
            moreurl:"/zxts/tslb/index.html",
            detailurl:'/zxts/tsll/index.html'
        }, {
            id: 'yjfk',
            title: '意见反馈',
            actived: false,
            tableid: '在线建议',
            ownerColname: '登记人账户',
            moreurl:"/zxts/jylb/index.html",
            detailurl:'/zxts/jyll/index.html'
        }, {
            id: 'zxpj',
            title: '在线评价',
            actived: false,
            tableid: '我的材料',
            ownerColname: '登记人账户',
            moreurl:"/wsbs/pjlb/index.html",
            detailurl:'/wsbs/ckpj/index.html'
        }, {
            id: 'cjwt',
            title: '常见问题',
            actived: false,
            tableid: '常见问题',
            ownerColname: '登记人',
            moreurl:"/zxts/cjwt/index.html",
            detailurl:'/zxts/wtll/index.html'
        }],
        zxzxtable:[],
        tsjbtable:[],
        yjfktable:[],
        zxpjtable:[],
        cjwttable:[],
        selectedId: 'zxzx',
        ownerColname:'登记人账户',
        tableid:'在线咨询',
        tabId: '在线咨询',
        moreurl:'/zxts/zxlb/index.html',
        detailurl:'/zxts/zxll/index.html',
        cjwtll:false,
        title:'',
        content:''
      }
    },
    created() {
      this.getData();
    },
    methods: {
      clickTable(row) {
          window.location.href = this.detailurl+"?WZID="+row.UUID;
      },
      getData() {
          let self = this;
          let params = {
              pageSize: 4,
              tableid: tableIds[this.tableid],
              filter:{'是否公开':'是'}
          }
          if (this.selectedId === 'zxzx') {
            this.moreurl = this.tabs[0].moreurl;
              getZxzx(params).then(data => {
                  data.data.DataList.length = data.data.DataList.length > 4 ? 4 : data.data.DataList.length
                  self.zxzxtable = data.data.DataList;
              });
          } else if (this.selectedId === 'tsjb') {
            this.moreurl = this.tabs[1].moreurl;            
              getTsjb(params).then(data => {
                  data.data.DataList.length = data.data.DataList.length > 4 ? 4 : data.data.DataList.length
                  self.tsjbtable = data.data.DataList;
              });
          } else if (this.selectedId === 'yjfk') {
            this.moreurl = this.tabs[2].moreurl;            
              getYjfk(params).then(data => {
                  data.data.DataList.length = data.data.DataList.length > 4 ? 4 : data.data.DataList.length
                  self.yjfktable = data.data.DataList;
              });
          } else if (this.selectedId === 'zxpj') {
            this.moreurl = this.tabs[3].moreurl;            
              getZxpj(params).then(data => {
                  data.data.DataList.length = data.data.DataList.length > 4 ? 4 : data.data.DataList.length
                  self.zxpjtable = data.data.DataList;
              });
          } else if (this.selectedId === 'cjwt') {
            this.moreurl = this.tabs[4].moreurl;          
              getCjwt(params).then(data => {
                  data.data.DataList.length = data.data.DataList.length > 4 ? 4 : data.data.DataList.length
                  self.cjwttable = data.data.DataList;
              });
          }  
      },
      getCjwt2(row, event, column){
          this.cjwtll=true;
          this.title = row.问题;
          this.content = row.解答;    
      },
      getTime(row, event,column) {
          return getTime(column,'yy-MM-dd');
      },
      selectItem(id) {
        this.selectedId = id;
      },
      // tab切换
      toogle(val) { 
          this.selectedId = val.id;
          this.tabId = val.title;
          this.ownerColname = val.ownerColname,
          this.detailurl = val.detailurl,
          this.tableid = val.tableid;
          this.getData();
      }
    }
  }
</script>

<style scoped>
/**
 * 智慧辽源-政务服务-首页-市民心声
 * css belong to smxs.vue
 * author:kxc
 * 2017-08-10
 */
  .zwfw-smxs{
    min-width:100%;
    height:510px;
  }
  .zwfw-smxs__title img {
    vertical-align: bottom;
  }
  .zwfw-smxs__title{
    width:100%;
    height:50px;
    line-height:50px;
    border-bottom:5px solid #ededed;
  }
  .zwfw-smxs__title div{
    width:120px;
    height:50px;
    border-bottom:5px solid #3d96e6;
  }
  .zwfw-smxs__title span{
    font-family:"Microsoft YaHei";
    font-weight:bold;
    font-size:18px;
    color:#000000;
  }
  .zwfw-smxs__title img{
    margin-bottom:10px;
  }
  .zwfw-smxs__list{
    width:100%;;
    height:125px;
    background:#eef6fb;
    margin-top:10px;
  }

  .zwfw-smxs__list li{
    display:block;
    float:left;
    margin: 25px 34px;
  }
  .zwfw-smxs__list li img,.zwfw-smxs__list li span{
    display:block;
  }
  .zwfw-smxs__table {
    margin-top: 20px;
    height:300px;
  }
  .zwfw-smxs__table__tab{
    width:100%;
    height:44px;
    background:#ededed;
  }
  .zwfw-smxs__table__tab span{
    width:128px;
    height:44px;
    line-height:44px;
    font-family:"Microsoft YaHei";
    font-weight:bold;
    font-size:16px;
    color:#000000;
    display:block;
    float:left;
    text-align:center;
  }
  .zwfw-smxs__table__tab a{
    float: right;
    line-height:44px;
    color:#000000;
    text-align:center;
    margin-right: 30px;
  }
  .zwfw-smxs__table__tab li:hover{
    cursor:pointer;
  }
  .zwfw-smxs__table__tab .zwfw-smxs__tab--selected{
    background:#3d96e6;
    color:#ffffff;
  }
  .zwfw-smxs__table__content{
    width:658px;
    height:250px;
  }
  .zwfw-smxs__table__content {
    font-family:"Microsoft YaHei";
    font-size:16px;
    color:#000000;
  }
  .zwfw-smxs__icon {
    display: block;
    width: 52px;
    height: 52px;
  }
  .zwfw-smxs__icon__zxzx{
    background: url('./img/list-pic1-1.png') no-repeat;
  }
  .zwfw-smxs__list__select .zwfw-smxs__icon__zxzx,
  .zwfw-smxs__icon__zxzx:hover {
    background: url('./img/list-pic1-2.png') no-repeat;
  }
  .zwfw-smxs__icon__tsjb {
    background: url('./img/list-pic2-1.png') no-repeat;
  }
  .zwfw-smxs__list__select .zwfw-smxs__icon__tsjb,
  .zwfw-smxs__icon__tsjb:hover {
    background: url('./img/list-pic2-2.png') no-repeat;
  }
  .zwfw-smxs__icon__yjfk {
    background: url('./img/list-pic3-1.png') no-repeat;
  }
  .zwfw-smxs__list__select .zwfw-smxs__icon__yjfk,
  .zwfw-smxs__icon__yjfk:hover {
    background: url('./img/list-pic3-2.png') no-repeat;
  }
  .zwfw-smxs__icon__zxpj{
    background: url('./img/list-pic4-1.png') no-repeat;
  }
  .zwfw-smxs__list__select .zwfw-smxs__icon__zxpj,
  .zwfw-smxs__icon__zxpj:hover {
    background: url('./img/list-pic4-2.png') no-repeat;
  }
  .zwfw-smxs__icon__cjwt {
    background: url('./img/list-pic5-1.png') no-repeat;
  }
  .zwfw-smxs__list__select .zwfw-smxs__icon__cjwt,
  .zwfw-smxs__icon__cjwt:hover {
    background: url('./img/list-pic5-2.png') no-repeat;
  }
  .question-title{font-size:20px;text-align: center;}
  .question-content{font-size:15px;margin: 20px 0px;text-indent: 2em;}
</style>
<style>
/**
 * 智慧辽源-政务服务-首页-市民心声
 * css belong to index.vue
 * author:kxc
 * 2017-08-10
 */
  .zwfw-smxs__table__content .el-table {
    font-family:"Microsoft YaHei";
    font-size:15px;
    color: #505050;
  }
  .zwfw-smxs__table__content .el-table th {
    background-color: #fff;
    font-weight: bold;
  }
  .zwfw-smxs__table__content .el-table th>.cell {
    background-color: #fff;
  }
  .zwfw-smxs__table__content .el-table__body tr,
  .zwfw-smxs__table__content .el-table__header tr {
    height: 44px;
    line-height: 44px;
  }
  .el-tooltip__popper {
    font-size: 14px !important;
  }
  .zwfw-smxs__table__content .el-table__empty-block{
    min-height: 176px;
    font-size:0;
    background:url("/static/img/data-null.png") no-repeat center center;
  }
  .zwfw-smxs__table .el-table__body-wrapper tr{cursor:pointer;}
  .zxpjtable .el-table__body-wrapper tr{cursor:auto;}
</style>