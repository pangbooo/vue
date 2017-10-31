/* 
    描述：办件详细
    作者：李文达
    创建时间：2017年9月25日
    最后修改人：李文达
    最后修改时间：2017年9月25日
*/
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="bmfw__path">
        <idt-breadcrumb :page="page" ></idt-breadcrumb>
    </div>
    <div class="container-bg">
    	<div class="zxlb-left">
            <idt-personInfo></idt-personInfo>
        </div> 
        <div class="bjgsdetail__contain">
            <div class="bjgsdetail__title">
                <h3 class="bjgsdetail__mark sq1">信息</h3>
            </div>
            <dl class="bjgsdetail__dl">
               <dt>办件流水号：</dt><dd>{{dllist.办件流水号}}</dd>
               <dt>许可类型：</dt><dd>{{dllist.许可类型}}</dd>
               <dt class="bjgsdetail__clr">事项名称：</dt><dd class="bjgsdetail__col3">{{dllist.事项名称}}<a :href="'/qlqd/xzqlqddetail/index.html?WZID='+dllist.MATTERID" class="bjgsdetail__sxmc" title="查看事项详情"></a></dd>
               <dt class="bjgsdetail__clr">分项名称：</dt><dd class="bjgsdetail__col3">{{dllist.分项名称}}</dd>
               <dt class="bjgsdetail__clr">办理主体：</dt><dd>{{dllist.办理主体}}</dd>
               <dt>承诺办结时间：</dt><dd>{{dllist.承诺办结时间 ? getTime(dllist.承诺办结时间):''}}</dd>
               <dt class="bjgsdetail__clr">受理时间：</dt><dd>{{dllist.受理时间 ? getTime(dllist.受理时间):'未受理'}}</dd>
            </dl>
            <div class="bjgsdetail__title">
                <h3 class="bjgsdetail__mark sq2">办理日志</h3>
            </div>    
            <div class="bjgsdetail__mark--con clr">
                <div class="bjgsdetail__mark--step bjgsdetail__step-fin" v-for="(item,index) in dllist.flowlist" :key="index">
                    <div class="bjgsdetail__step-icon">{{index+1}}</div>
                    <h3>{{item.HJMC}}</h3>
                    <p>办理人：{{item.BLR}}</p>
                    <p>办理时间：{{item.BLSJ ? getTime(item.BLSJ):''}}</p>
                    <p>办理意见：<span>{{item.BLYJ}}</span></p>
                </div>
                <div class="bjgsdetail__mark--step">
                    <div class="bjgsdetail__step-icon">···</div>
                    <h3>办结</h3>
                </div>
            </div>
            <div class="bjgsdetail__title">
                <h3 class="bjgsdetail__mark sq3">办理结果</h3>
            </div>
            <div class="bjgsdetail__table">
              <el-table ref="wdzztable" :data="dllist.bljglist">
                <el-table-column prop="LX" label="类型" width="120" align="center"></el-table-column>
                <el-table-column prop="MC" label="名称"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template scope="scope">
                    <el-button size="mini" @click="handleLook(scope.$index, scope.row)" class="bjgsdetail__table--look"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtpersonInfo from '@/InternetPlus/user/personcenter/personInfo';

import { getSxInfo } from '@/api/manage.js';
import { getTime,queryString } from '@/lib/publicFun.js';
export default {
    data() {
        return {
            page:'mybjgsdetail',
            dllist:{},
            tablelist:[],
            WZID:''
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar':idtnavbar,
        'idt-footer': idtfooter,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-floatbar': floatbar,
        'idt-personInfo':idtpersonInfo,
    },
    created:function() {
        this.WZID = queryString("WZID");
        this.getData()
    },
    filters:{
        getTime:function(val){
           return getTime(val,'yy-MM-dd');
        }
    },
    methods: {
        handleLook(){

        },
        getData(){
            let params = {
                uuid : this.WZID
            }
            getSxInfo(params).then(res=>{
                this.dllist = res.data;
            })
        },
        getTime:function(val){
           return getTime(val,'yy-MM-dd');
        }
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.container-bg{
    width: 1260px;
    margin:0 auto  20px;
    overflow:hidden;
}
.bmfw__path{
    width: 1260px;
    margin:0 auto;
}
.zxlb-left{width:240px;float: left;}
.bjgsdetail__contain{width: 1000px;float: right;}
.bjgsdetail__dl{
    overflow: hidden;
    width: 98%;
    margin: 10px auto 20px;
}
.bjgsdetail__dl dt{
    font-weight: bold;
    font-size: 15px;
    color: #333;
}
.bjgsdetail__dl dt,.bjgsdetail__dl dd{
    float: left;
    padding: 8px 0;
    vertical-align: middle;
    display: block;
    line-height: 32px;
}
.bjgsdetail__dl dt{
    width: 12%;
    text-align: right;
}
.bjgsdetail__dl dd{
    width: 38%;
}
.bjgsdetail__dl .bjgsdetail__col3{
    width: 88%;
}
.bjgsdetail__dl .bjgsdetail__clr{
    clear: left;
}
.bjgsdetail__sxmc{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(img/wen.png) no-repeat;
    background-size: 24px;
    position: relative;
    top: 8px;
    left: 5px;
}
.bjgsdetail__sxmc:hover{
    background: url(img/wen2.png) no-repeat;
    background-size: 24px;
}
.bjgsdetail__title{
    border-bottom: 1px solid #ccc;
}
.bjgsdetail__mark{
    font-size: 18px;
    line-height: 36px;
    width: 80px;
    padding-left: 40px;
    border-bottom: 2px solid #3f96e7;
}
.sq1{background: url(img/sq1.png) 10px center no-repeat;}
.sq2{background: url(img/sq2.png) 10px center no-repeat;}
.sq3{background: url(img/sq3.png) 10px center no-repeat;}

.bjgsdetail__mark--con{
    width: 100%;
    margin:20px 0 30px;
}
.bjgsdetail__mark--step{
    float: left;
    width: 20%;
    position: relative;
    text-align: center;
}
.bjgsdetail__mark--step:after{
    content: "";
    display: block;
    width: 50%;
    height: 5px;
    background: url(./img/line2.png) center right no-repeat;
    position: absolute;
    left: -25%;
    top:22px;
}
.bjgsdetail__step-fin:after{
    background: url(./img/line.png) center right no-repeat;
}
.bjgsdetail__mark--step:first-child:after{
    display: none;
}
.bjgsdetail__mark--step:nth-child(5n+1):after{
    width: 25%;
    left: 0%;
}
.bjgsdetail__step-icon{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    color: #000;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 auto;
}
.bjgsdetail__step-fin .bjgsdetail__step-icon{
    color: #fff;
    background: url(./img/step.png ) no-repeat;
}
.bjgsdetail__mark--step h3{
    font-size: 18px;
    padding: 10px 0 5px;
}
.bjgsdetail__mark--step span{
    color: #fa791e;
}
.bjgsdetail__table{
    margin: 20px 0 30px;
}
.bjgsdetail__table th{
    word-wrap: normal;
    line-height: 30px;
    padding: 8px 0;
}
.bjgsdetail__table tr{
    border-bottom: 1px solid #dfe6ec;
}
.bjgsdetail__table tr:nth-child(2n+1){
   background-color: #eef1f6;
}
.bjgsdetail__table td, .bjgsdetail__table th {
    height: 40px;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
    text-align: center; 
}
.bjgsdetail__contain td:nth-child(4){
    text-align: left;
}
.bjgsdetail__table--look{
    border:none;
    width: 26px;
    height: 16px;
    background: url(./img/eye.png) center no-repeat;
    background-size: contain;
}
</style>
