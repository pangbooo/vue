/*
 * @文档描述: 阳光政务-->行政权力清单列表右面
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-10-12 14:05:23 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-12 14:30:35
 */

<template>
<div>
    <div class="xzqlqd__right">
        <div class="xzqlqd__title xzqlqd__title-h"></div>
        <div class="xzqlqd__second" v-show="searchlist&&searchlist.length>0">
            <el-button :plain="true" type="info" @click="chooseLX('')" :class="['',select === '' ?'xzqlqd__second-button' : '']">全部({{sum}})</el-button>
            <el-button :plain="true" type="info" v-for="(xz,index) in searchlist" :key="index" @click="chooseLX(xz.SXLX)" :class="['xzqlqd__second__icon--' + xz.SXLXJP  , select === xz.SXLX ? 'xzqlqd__second-button' : '']">{{xz.SXLX}}({{xz.ZS}})</el-button>
        </div>
        <div class="xzqlqd__first">
            <el-input placeholder="请输入关键字" v-model="search" @keyup.enter.native="chooseGJZ2($event)">
                <el-button slot="append" icon="search" @click="chooseGJZ()" ></el-button>
            </el-input>
        </div>
        <div v-show="list&&list.length>0">
            <ul class="xzqlqd__third clr">
                <li v-for="(myli,index) in list" v-bind:key="index" :class="[{'xzqlqd__third--down':myli.CHECKED},{'xzqlqd__third--is':myli.ZXLIST}]">
                    <div v-if="myli.ZXLIST">
                        <h3 @click="changeList(myli)"  class="mine nbr" :title="myli.MATTER_DXMC">{{myli.MATTER_DXMC}}</h3>
                        <el-rate :title="'综合评价：' + myli.AVG + '分'" disabled-void-color="#c0c0c0" v-model="myli.AVG" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']" ></el-rate>
                        <div class="xzqlqd__third--listbox" v-show='myli.CHECKED'>
                            <div class="xzqlqd__third__sublist" v-for="(myli2,index) in myli.ZXLIST" v-bind:key="index">
                                <a class="xzqlqd__third--a mine nbr" :href="detaillUrl+'&WZID='+myli2.UUID" :title="myli2.MATTER_ZXMC">{{myli2.MATTER_ZXMC}}</a>
                                <el-rate :title="'综合评价：' + myli2.AVG + '分'" disabled-void-color="#c0c0c0" v-model="myli2.AVG" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']" ></el-rate>
                            </div>
                        </div>
                    </div>
                    <div class="xzqlqd__third--not" v-else>
                        <a class=" mine nbr" :href="detaillUrl+'&WZID='+myli.UUID" :title="myli.MATTER_DXMC">{{myli.MATTER_DXMC}}</a>
                        <el-rate :title="'综合评价：' + myli.AVG + '分'" disabled-void-color="#c0c0c0" v-model="myli.AVG" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']" ></el-rate>
                    </div>
                </li>
            </ul>
            <idt-page :currentPage="currentPage" :totalPage="totalPage" :pageSize="pageSize" @current-change="currentChange" @size-change="sizeChange" class="xzqlqd__page"></idt-page>
        </div>
        <div class="nullinfo" v-if="list&&list.length===0">
            <img src="/static/img/data-null.png" alt="">
        </div>
    </div>
</div>
</template>

<script>
import idtpage from '@/components/pagination/index.vue';

import xzqlqdlbright from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbright';
import { queryString } from '@/lib/publicFun';

export default{
    components:{
        'idt-page':idtpage
    },
    data() {
        return {
            currentPage:1,
            totalPage:0,
            pageSize:10,
            list:[],
            search:'',
            searchlist:[],
            select:'',
            detaillUrl:'',
            UUID:'',
            sum:0,
            workup:true,
            FLMC:'',
            firsttime:true
        }
    },
    props:{
        bmid:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    created: function(){
        this.detaillUrl = '/qlqd/xzqlqdbeforedetail/index.html?fwlb='+this.title;

    },
    watch:{
        bmid: function() {
            this.workup = true;
            if(this.firsttime){
                queryString("FLMC",true) ? this.select = queryString("FLMC",true):this.select = '';
                this.firsttime = false;
            }else{
                this.select = '';
            }
            this.getData();
        }
    },
    methods:{
        getData: function(a){
            let params = {
                nowPage: this.currentPage,
                pageSize: this.pageSize,
                filter: {}
            }

            this.bmid ? params.filter["单位名称"] = this.bmid:'';

            if(!this.workup){
                this.select ? params.filter["职权类别"] = this.select:'';
                this.search ? params.filter["searchKey"] = this.search:'';
            }
            
            xzqlqdlbright(params).then(res => {
                if (res.status === "success") {
                    this.list = res.data.DataList;
                    if(this.workup){
                        this.searchlist = res.data.Matter_sxlxtj
                        this.sum = 0;
                        for(let i = 0; i < this.searchlist.length; i++){
                            this.searchlist[i].SXLXJP = this.searchlist[i].SXLX === '行政许可' ? 'xzxk' : this.searchlist[i].SXLX === '行政处罚' ? 'xzcf' : this.searchlist[i].SXLX === '行政征收' ? 'xzzs' : this.searchlist[i].SXLX === '行政强制' ? 'xzqz' : this.searchlist[i].SXLX === '行政确认' ? 'xzqr' : this.searchlist[i].SXLX === '行政裁决' ? 'xzcj' : this.searchlist[i].SXLX === '行政征收' ? 'xzzs' : this.searchlist[i].SXLX === '行政给付' ? 'xzjf' : this.searchlist[i].SXLX === '行政奖励' ? 'xzjl' : this.searchlist[i].SXLX === '其他权力' ? 'qtql' : '';
                            this.sum += this.searchlist[i].ZS*1
                        }
                        this.workup = false;
                    }
                    for(let i = 0;i < res.data.DataList.length; i++ ){
                        this.$set(this.list[i],'CHECKED',false);
                    }
                    this.totalPage = res.data.totalRows
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data =>{
                this.$message.error('getData异常，请检查网络！')
            })
        },
        changeList: function(item){
            item.CHECKED = !item.CHECKED
        },
        showSublist(item, boolean) {
            item.CHECKED = boolean;
        },
        chooseLX: function(val){
            this.select = val;
            this.search = '';
            this.getData();
        },
        currentChange: function(val){
            this.currentPage = val;
            this.getData();
        },
        chooseGJZ: function(){
            this.getData();
        },
        chooseGJZ2: function(ev){
            if(ev.keyCode==13){
                this.getData();
            }
        },
        sizeChange: function(val){
            this.pageSize = val;
            this.getData();
        },
        queryString: function(){
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    }
}
</script>

<style>
/*  xzqlqdlbright.html  */
.xzqlqd__right {
    padding-left: 300px;
    border-radius: 2px;
}

.xzqlqd__title {
    color: #5495cf;
    font-size: 16px;
    line-height: 2em;
    border-bottom: 2px solid #5495CF;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 40px;
    padding-bottom: 1px;
}

.xzqlqd__title img {
    position: absolute;
    margin-top: -5px;
    margin-left: 415px;
}

.xzqlqd__first {
    margin: 10px 15px;
}
.xzqlqd__right .el-input-group{
    width: 540px;
    margin-right: 20px;
}
.xzqlqd__right .el-select .el-input {
    width: 110px;
}

.xzqlqd__second {
    margin:20px 10px 0;
    overflow: hidden;
}
.xzqlqd__second .el-button--info.xzqlqd__second-button{
    background: #fff;
    border-color: #50bfff;
    color: #50bfff;
}
.xzqlqd__secondA {
    float: left;
    display: block;
    color: #b0b0b0;
    border: 1px solid #b0b0b0;
    padding: 5px 2px;
    border-radius: 3px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 4px 8px;
}

.xzqlqd__third {
    margin-left: 15px;
    padding-bottom: 20px;
}

.xzqlqd__third li {
    float: left;
    width: 100%;
    height: auto;
    padding-left: 20px;
    border-bottom: 2px solid #D7D7D7;
    background: url(./img/icon_state.png) 10px 22px no-repeat;
}
.xzqlqd__third--listbox {
    height: auto;
    background-color: rgba(243, 243, 243, 1);
    float: left;
    /* border-radius: 10px; */
    width: 98%;
    padding: 0 10px;
}
.xzqlqd__third__sublist {
    float: left;
    width: 100%;
    height: auto;
    border-top: 1px dashed #ccc;
}
.xzqlqd__third .xzqlqd__third--is{
    background: url(./img/jia.png) 10px 18px no-repeat;
}
.xzqlqd__third h3,.xzqlqd__third .xzqlqd__third--not>a{
    float: left;
    width: 750px;
    line-height: 32px;
    font-size: 16px;
    padding: 10px 0px 10px 20px;
    box-sizing:border-box;
    color: #1f2d3d;
    cursor: pointer;
}
.xzqlqd__third h3:hover {
    color: #ef6f15;
}
.xzqlqd__third li .el-rate {
    float: right;
    margin-right: 30px;
    line-height: 3;
}
.xzqlqd__third .el-rate .el-rate__icon {
    font-size: 14px;
}
.xzqlqd__third .xzqlqd__third--down{background: url(./img/jian.png) 10px 18px no-repeat}
.xzqlqd__third li>a{background: none;}
.xzqlqd__third--a{
    float: left;
    width: 730px;
    line-height: 32px;
    height: 32px;
    font-size: 16px;
    padding: 10px 0 10px 30px;
    background: url(./img/icon_state.png) 10px 22px no-repeat;
    color: #1f2d3d;
}
.xzqlqd__third a:hover{color: #5babf0;}
.xzqlqd__down {
    position: absolute;
    margin-top: 0px;
    margin-left: 165px;
}

.xzqlqd__ym {
    position: absolute;
    margin-left: 225px;
    margin-top: 680px;
}

.xzqlqd__ys {
    padding: 5px 8px;
}

.xzqlqd__dqys {
    background-color: #02A9F5;
    color: #FFFFFF;
}

.xzqlqd__pre {
    margin-right: 5px;
}

.xzqlqd__next {
    margin-left: 5px;
}

.xzqlqd__sx {
    color: #000000;
}
.nullinfo img{display:block;margin:70px auto;}
.xzqlqd__right .xzqlqd__page{
    text-align: right;
    padding-bottom: 20px;
}
.xzqlqd__second .el-button,.xzqlqd__second .el-button+.el-button {
    margin:0 5px 8px; 
} 
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzxk {
    padding-left: 30px;
    background: url(./img/icon_xzxk.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzcf {
    padding-left: 30px;
    background: url(./img/icon_xzcf.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzcj {
    padding-left: 30px;
    background: url(./img/icon_xzcj.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzjf {
    padding-left: 30px;
    background: url(./img/icon_xzjf.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzjl {
    padding-left: 30px;
    background: url(./img/icon_xzjl.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzqr {
    padding-left: 30px;
    background: url(./img/icon_xzqr.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzqz {
    padding-left: 30px;
    background: url(./img/icon_xzqz.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--xzzs {
    padding-left: 30px;
    background: url(./img/icon_xzzs.png) no-repeat !important;
    background-size: 65% !important;
}
.xzqlqd__second .el-button--info.xzqlqd__second__icon--qtql {
    padding-left: 30px;
    background: url(./img/icon_qtql.png) no-repeat !important;
    background-size: 65% !important;
}
</style>