/* 
    描述：用户中心中的代办列表组件-接受参数:activedTab 用于控制选项卡显示 
    作者：kxc
    创建时间：2017年7月5日
    最后修改人：李文达
    最后修改时间：2017年9月22日
*/
<template>
    <div class="waitDealWrap">
        <ul class="waitDealWrap__nav clr">
            <li v-for="(tab, index) in tabs" :class="activedTab === tab.id ? 'waitDealWrap__nav--checked' : ''" @click="toogle(tab)">
                {{tab.title}}
            </li>
        </ul>
        <div class="waitDealWrap__nav--con">
            <div v-for="tab in tabs" :class="'tablelist_'+tab.id" v-if="activedTab === tab.id">
                <div class="waitDealWrap__nav--tabletitle">
                    <span class="center-top-span" v-if="tab.id==='wdbj'">办理中&nbsp;{{dbyb.ZBJ}}</span>
                    <span class="center-top-span1" v-if="tab.id==='wdbj'">已办结&nbsp;{{dbyb.BJJ}}</span>
                    <a :href="moreurl" class="waitDealWrap__more">更多>></a>
                </div>
                <div class="waitDealWrap__nav--table">
                    <el-table ref="wdbjtable" :data="wdbjtable" v-show="tab.id==='wdbj'" @row-dblclick="dbclick" tooltip-effect="light">
                        <el-table-column prop="XH" label="序号" width="70" :formatter="getbjXh" align="center"></el-table-column>
                        <el-table-column prop="办件名称" label="办件名称" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="INSERT_DATE" label="申报时间" width="120" align="center"  :formatter="getTime"></el-table-column>
                        <el-table-column prop="BLLX" label="分类状态" width="120" align="center" ></el-table-column>
                        <el-table-column label="评分" width="200" align="right">
                          <template scope="scope">
                            <el-button size="mini" @click="evaluate(scope.$index, scope.row)" v-if="!scope.row.PJJG">评价</el-button>
                            <el-rate v-else class="waitDealWrap__pj" v-model="scope.row.PJJG" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled></el-rate>
                          </template>
                        </el-table-column>
                        <el-table-column label="快递" width="70" align="center">
                          <template scope="scope">
                            <el-button size="mini" @click="kuaiDi(scope.$index, scope.row)" :disabled="scope.row['快递单号']">查看</el-button >
                          </template>
                        </el-table-column>
                    </el-table>
                    <el-table ref="wdzxtable" :data="wdzxtable" v-show="tab.id==='wdzx'" @row-dblclick="dbclick" tooltip-effect="light">
                        <el-table-column prop="XH" label="序号" width="70" :formatter="getzxXh" align="center"></el-table-column>
                        <el-table-column prop="单位名称" label="部门" width="150"></el-table-column>
                        <el-table-column prop="咨询标题" label="咨询标题" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="咨询时间" label="咨询时间" width="120" align="center"  :formatter="getTime"></el-table-column>
                        <el-table-column label="操作" width="120" align="right">
                          <template scope="scope">
                            <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                    <el-table ref="wdtstable" :data="wdtstable" v-show="tab.id==='wdts'" @row-dblclick="dbclick" tooltip-effect="light">
                        <el-table-column prop="XH" label="序号" width="70" :formatter="gettsXh" align="center"></el-table-column>
                        <el-table-column prop="被投诉单位" label="部门" width="150"></el-table-column>
                        <el-table-column prop="投诉标题" label="投诉标题" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="添加时间" label="投诉时间" width="120"  align="center"  :formatter="getTime"></el-table-column>
                        <el-table-column label="操作" width="120" align="right">
                          <template scope="scope">
                            <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                    <el-table ref="wdjctable" :data="wdjctable" v-show="tab.id==='wdjc'" @row-dblclick="dbclick" tooltip-effect="light">
                        <el-table-column prop="XH" label="序号" width="70" :formatter="getjcXh" align="center"></el-table-column>
                        <el-table-column prop="单位名称" label="部门" width="150"></el-table-column>
                        <el-table-column prop="JCBT" label="纠错标题" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="JCSJ" label="纠错时间" width="120"  align="center"  :formatter="getTime"></el-table-column>
                        <el-table-column label="操作" width="120" align="right">
                          <template scope="scope">
                            <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                    <el-table ref="wdjytable" :data="wdjytable" v-show="tab.id==='wdjy'" @row-dblclick="dbclick" tooltip-effect="light">
                        <el-table-column prop="XH" label="序号" width="70" :formatter="getjyXh" align="center"></el-table-column>
                        <el-table-column prop="单位名称" label="部门" width="150"></el-table-column>
                        <el-table-column prop="建议标题" label="建议标题" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="添加时间" label="建议时间" width="120"  align="center"  :formatter="getTime"></el-table-column>
                        <el-table-column label="操作" width="120" align="right">
                          <template scope="scope">
                            <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                    <el-table ref="wdcltable" :data="wdcltable" v-show="tab.id==='wdcl'" @row-dblclick="dbclick" tooltip-effect="light">
                        <el-table-column prop="XH" label="序号" width="70" :formatter="getzzXh" align="center"></el-table-column>
                        <el-table-column prop="CLMC" label="材料名称" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="ZZSJ" label="提交时间" width="120"  align="center"  :formatter="getTime"></el-table-column>
                        <el-table-column label="操作" width="120" align="right">
                          <template scope="scope">
                            <el-button size="mini" @click="lookWdcl(scope.$index, scope.row)">查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <el-dialog title="办件评价" :visible.sync="dialogFormVisible" size="small" class="waitDealWrap__dialog">
            <dl>
                <dt>请对本次服务进行打分:</dt>
                <dd>
                    <el-rate class="waitDealWrap__pj"
                        v-model="pjtable.pf"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']" show-text :texts="['失望','不满意','一般','满意','非常满意']">
                    </el-rate>
                </dd>
                <dt>请对本次服务进行评价:</dt>
                <dd>
                    <el-input type="textarea" :rows="3" :autosize="{minRows:3,maxRows:6}" placeholder="默认五分好评" v-model="pjtable.pj"></el-input>
                </dd>
            </dl>
            <div slot="footer" class="dialog-footer">
              <el-button @click="canclePj()">取 消</el-button>
              <el-button type="primary" @click="savePj()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="wdcl.title" :visible.sync="wdclVisible" size="small" class="waitDealWrap__dialog">
            <img :src="'/static/img/'+wdcl.img" alt="" class="wdclimg">
        </el-dialog>
    </div>
</template>
<script>
import idttable from '@/components/table/table.vue';

import getWdbj from '@/services/common/sp_xmglb/xmglb_list_banjian.js';
import getWdzx from '@/services/common/sp_xmglb/xmglb_list_zixun.js';
import getWdts from '@/services/common/sp_xmglb/xmglb_list_tousu.js';
import getWdjc from '@/services/common/sp_xmglb/xmglb_list_jiucuo.js';
import getWdjy from '@/services/common/sp_xmglb/xmglb_list_jianyi.js';
import getWdcl from '@/services/common/sp_xmglb/xmglb_list_cailiao.js';

import { webSaveMyForm,checkWhetherAppraise } from '@/api/manage.js';
import { getBjtjByUser } from '@/api/common.js';
import { getTime } from '@/lib/publicFun.js';
import { tableIds } from '@/api/tableId.js';
import { deleteData } from '@/api/common.js'
export default {
    components:{
        'idt-table':idttable
    },
    data() {
        return {
            tabs: [{
                id: 'wdbj',
                title: '我的办件',
                actived: false,
                tableid: '权力事项办理表',
                ownerColname: '注册账户',
                moreurl:'/wsbs/mybjgslb/index.html',
                detialurl:'/wsbs/mybjgsdetail/index.html',
            }, {
                id: 'wdzx',
                title: '我的咨询',
                actived: true,
                tableid: '在线咨询',
                ownerColname: '登记人账户',
                moreurl:'/zxts/myzxlb/index.html',
                detialurl:'/zxts/myzxll/index.html',
            }, {
                id: 'wdts',
                title: '我的投诉',
                actived: false,
                tableid: '在线投诉',
                ownerColname: '登记人账户',
                moreurl:'/zxts/mytslb/index.html',
                detialurl:'/zxts/mytsll/index.html',
            }, {
                id: 'wdjc',
                title: '我的纠错',
                actived: false,
                tableid: '在线纠错',
                ownerColname: '登记人账户',
                moreurl:'',
                detialurl:'',
            }, {
                id: 'wdjy',
                title: '我的建议',
                actived: false,
                tableid: '在线建议',
                ownerColname: '登记人账户',
                moreurl:'/zxts/myjylb/index.html',
                detialurl:'/zxts/myjyll/index.html',
            }, {
                id: 'wdcl',
                title: '我的材料',
                actived: false,
                tableid: '我的材料',
                ownerColname: '登记人账户',
                moreurl:'',
                detialurl:'',
            }],
            colument: [{
                id: 'xh',
                title: '序号'
            }, {
                id: 'bjmc',
                title: '办件名称'
            }, {
                id: 'slbm',
                title: '受理部门'
            }, {
                id: 'sbsj',
                title: '申报时间'
            }, {
                id: 'zt',
                title: '状态'
            }],
            tableData: {},
            total:0,
            pageSize: 4,
            currentPage: 1,
            activedTab: 'wdbj',
            ownerColname: '注册账户',
            tableid: '权力事项办理表',
            wdbjtable:[],
            wdzxtable:[],
            wdtstable:[],
            wdjctable:[],
            wdjytable:[],
            wdcltable:[
            {
                ZZSJ: 1507357324000,
                CLMC: '身份证件',
                img:'sfz.jpg'
            },{
                ZZSJ: 1507357324000,
                CLMC: '营业执照',
                img:'yyzz.jpg'
            }
            ],
            dbyb:{
                ZBJ:0,
                BJJ:0
            },
            moreurl:'/wsbs/mybjgslb/index.html',
            detialurl:'/wsbs/mybjgsdetail/index.html',
            dialogFormVisible: false,
            pjtable:{
               pf:5,
               pj:'' 
            },
            pjbjbh: '',
            pjhj: '',
            wdclVisible:false,
            wdcl:{
                title:'',
                img:''
            }
        }
    },
    created() {
        this.getDate();
        getBjtjByUser().then(data => {
          this.dbyb = data.data;
        });
    },
    methods: {
        dbclick(row, event){
            window.location.href = this.detialurl+"?WZID="+row.UUID;
        },
        canclePj(){
            this.dialogFormVisible = false;
            this.pjtable.pf = 5;
        },
        savePj(){
            let username = JSON.parse(localStorage.getItem("idt_App_personInfo")).username;

            let params = {
                tableId:tableIds.办件评价,
                ownerColname: '评价人账户',
                params:{"办件uuid":this.pjbjbh,"评价结果":this.pjtable.pf,"评价人":username,"评价意见":this.pjtable.pj,"评价环节":this.pjhj}
            }
            webSaveMyForm(params).then(res=>{
                if (res.status="success") {
                    this.dialogFormVisible = false;
                    this.getDate();
                }
            })
        },
        evaluate(index, row){
            this.dialogFormVisible = true,
            this.pjbjbh = row.UUID;
            this.pjhj = row.BLLX;
        },
        getDate: function(tabid,colname,obj) {
            let self = this;
            let params = {
                nowPage: this.currentPage,
                pageSize: this.pageSize,
                tableid: tableIds[this.tableid],
                ownerColname: this.ownerColname
            }

            if (this.activedTab === 'wdzx') {
                getWdzx(params).then(data => {
                    self.wdzxtable = data.data.DataList;
                    self.total = data.data.totalRows;
                });
            } else if (this.activedTab === 'wdts') {
                getWdts(params).then(data => {
                    self.wdtstable = data.data.DataList;
                    self.total = data.data.totalRows;
                });
            } else if (this.activedTab === 'wdjc') {
                getWdjc(params).then(data => {
                    self.wdjctable = data.data.DataList;
                    self.total = data.data.totalRows;
                });
            } else if (this.activedTab === 'wdjy') {
                getWdjy(params).then(data => {
                    self.wdjytable = data.data.DataList;
                    self.total = data.data.totalRows;
                });
            } else if (this.activedTab === 'wdcl') {
                getWdcl(params).then(data => {
                    // self.wdcltable = data.data.DataList;
                    self.total = data.data.totalRows;
                });
            } else {
                getWdbj(params).then(data => {
                    self.wdbjtable = data.data.DataList;
                    self.total = data.data.totalRows;

                    for(let i = 0; i<data.data.DataList.length; i++){
                        self.wdbjtable[i].PJJG = +self.wdbjtable[i].PJJG
                        // let params = {
                        //     bjuuid:data.data.DataList[i].UUID
                        // }
                        // checkWhetherAppraise(params).then(res=>{
                        //     if(res.status === "success"){
                        //         if(res.data.UUID){
                        //             self.$set(self.wdbjtable[i],'isPj',true)
                        //             self.$set(self.wdbjtable[i],'pjxj',res.data.PJJG*1)
                        //         }else{
                        //             self.$set(self.wdbjtable[i],'isPj',false)
                        //         }
                        //     }
                        // })
                    }
                });
            }    
        },
        // 序号格式化
        getbjXh(row, column, cellValue) {
            return ((this.currentPage - 1) * this.pageSize + this.wdbjtable.indexOf(row) + 1);
        },
        getzxXh(row, column, cellValue) {
            return ((this.currentPage - 1) * this.pageSize + this.wdzxtable.indexOf(row) + 1);
        },
        gettsXh(row, column, cellValue) {
            return ((this.currentPage - 1) * this.pageSize + this.wdtstable.indexOf(row) + 1);
        },
        getjcXh(row, column, cellValue) {
            return ((this.currentPage - 1) * this.pageSize + this.wdjctable.indexOf(row) + 1);
        },
        getjyXh(row, column, cellValue) {
            return ((this.currentPage - 1) * this.pageSize + this.wdjytable.indexOf(row) + 1);
        },
        getzzXh(row, column, cellValue) {
            return ((this.currentPage - 1) * this.pageSize + this.wdcltable.indexOf(row) + 1);
        },
        getTime(row, column,cellValue) {
            return getTime(cellValue,'yy-MM-dd');
        },
        getTitle(row, column, cellValue){
            str = row['分项名称(小项)'] ? row['事项名称(大项)']+'('+row['分项名称(小项)']+')' : row['事项名称(大项)'];
            return str;
        },
        // page切换
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getDate();
        },
        handleLook(index, row){
            window.location.href = this.detialurl + '?WZID=' + row.UUID;
        },
        // tab切换
        toogle(val) { 
            this.activedTab = val.id;
            this.currentPage = 1;
            this.ownerColname = val.ownerColname,
            this.tableid = val.tableid;
            this.moreurl = val.moreurl;
            this.detialurl = val.detialurl;
            this.getDate();
        },
        lookWdcl(index, row){
            this.wdcl.title = row.title;
            this.wdcl.img = row.img;
            this.wdclVisible = true;
        },
        kuaiDi(index, row){
            // console.log(row)
            window.location.href = '/qtfw/wdkd/index.html' + '?WZID=' + row.快递单号;
        }

    }
}
</script>
<style>
/*waitDealList.vue*/
.waitDealWrap{margin-top: 20px;}
.waitDealWrap__nav{
    width: 100%;
}
.waitDealWrap__nav li{
    float: left;
    height: 30px;
    width: 115px;
    background: url(./img/bj2.png) 10px no-repeat;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
.waitDealWrap__nav .waitDealWrap__nav--checked{
    color: #fff;
    background: url(./img/6.png) 10px no-repeat;
}
.waitDealWrap__nav li:hover{
    color: #5b5c5e;
    background: url(./img/6.png) 10px no-repeat;
}
.waitDealWrap__nav--con{
    margin-top: 20px;
    border: 1px solid #D4d4d4;
}
.waitDealWrap__nav--tabletitle{
    height: 40px;
    background-color: #f0f7f8;
}
.center-top-span {
    position: relative;
    left: 22px;
    top: 9px;
    color: #5b5c5e;
    font-size: 14px;
}

.center-top-span1 {
    position: relative;
    left: 40px;
    top: 9px;
    color: #5b5c5e;
    font-size: 14px;
}
.waitDealWrap__nav--table .el-table{
    border: none;
}
.waitDealWrap__more{
    float: right;
    line-height: 40px;
    padding-right: 20px;
}
.waitDealWrap__nav--table .el-button+.el-button {
    margin-left: 0px;
}
.waitDealWrap__pj{padding-top:6px;}
.waitDealWrap__pj .el-rate__text{vertical-align: bottom;}
.waitDealWrap__dialog .el-dialog__body {padding-bottom: 20px;}
.waitDealWrap__dialog h3{font-size: 16px;line-height: 32px;text-align: center;padding-bottom: 10px;}
.waitDealWrap__dialog dl{margin: 0 auto;}
.waitDealWrap__dialog dt{width: 200px;line-height: 32px;font-weight: bold;float: left;clear: left;}
.waitDealWrap__dialog dd{display:block;margin: 10px auto;}
.wdclimg{display: block;width: 100%;}
</style>
