/** 
 * 文档描述: 我的收藏列表
 * 作者: 杨闯 
 * 创建时间: 2017-09-21 18:43:50 
 * 最后修改人: 李文达 
 * 最后修改时间: 2017-10-5 
 */
<template>
<!-- 我的收藏列表 -->
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="location">
        <idt-breadcrumb :page="page"></idt-breadcrumb>
    </div>
    <div class="center">    
        <div class="zxlb-left">
            <idt-personInfo></idt-personInfo>
        </div> 
        <div class="zxlb-right" v-show="wdsc.length!==0">
            <ul>
                <li v-for="(item,index) in wdsc" :key="index">
                    <a :href="'/qlqd/xzqlqddetail/index.html?WZID='+item.ZJ" :title="'大项' + item.DX + '，子项：' + item.ZX">
                        <div class="zxlb-right-title" :title="item.BMMC">{{item.BMMC}}</div>
                        <div class="zxlb-right-content">
                            <div class="zxlb-right-content__title">
                                {{item.DX}}
                                <span v-if="item.ZX">({{item.ZX}})</span>
                            </div>
                            <div class="zxlb-right-content-time">
                                <span>发布时间：{{nowTime(item.INSERT_DATE)}}</span>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>  
            <div class="zxlb-page">
                <div class="zxlb-page-location">
                    <idt-pagination :currentPage="nowPage" :totalPage="totalPage" :pageSize="pageSize" @current-change="currentChange" @size-change="sizeChange" class="pagePos" ></idt-pagination>
                </div>
            </div>
        </div>
        <div class="zwsj" v-show="wdsc.length===0">
            <img src="/static/img/data-null.png">
        </div>
    </div>
    <idt-footer></idt-footer>
</div>
</template>
<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtpersonInfo from '@/InternetPlus/user/personcenter/personInfo';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtpagination from '@/components/pagination/index.vue';

import { getMyFavorites } from '@/api/manage';
import { tableIds } from '@/api/tableId.js';
import { getTime } from '@/lib/publicFun.js';
export default{
    data() {
        return {
            totalPage:100,
            pageSize:10,
            nowPage:1,
            wdsc:[],
            page:'wdsclb'
        }
    },
    components:{
        'idt-header':idtheader,
        'idt-footer':idtfooter,
        'idt-navbar':idtnavbar,
        'idt-breadcrumb':idtbreadcrumb,
        'idt-personInfo':idtpersonInfo,
        'idt-pagination': idtpagination,
    },
    created() {
        this.getwdsc();
    },
    methods:{
        nowTime(time){
            return getTime(time);
        },
        getwdsc(){
            let params = {
                tableid : tableIds.我的收藏,
                nowPage : this.nowPage,
                pageSize : this.pageSize,
                ownerColname : "收藏人"
            };
            getMyFavorites(params).then(res=>{
                if(res.status === "success"){
                    for(let i=0;i<res.data.DataList.length;i++){
                        let arr = res.data.DataList[i].BT.split('###');
                        res.data.DataList[i].BMMC = arr[2];
                        res.data.DataList[i].DX = arr[0];
                        res.data.DataList[i].ZX = arr[1];
                    }
                    this.wdsc = res.data.DataList;
                    this.totalPage = res.data.totalRows;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        currentChange: function(val){
            this.nowPage = val;
            this.getwdsc();
        },
        sizeChange: function(val){
            this.pageSize = val;
            this.getwdsc();            
        },
    }
}
</script>
<style scoped>
/* 我的收藏列表样式 */
.center{width: 1260px;margin: 0px auto;}
.center::after{content: '';display: block;clear:both;}
.location{margin:0px auto;width: 1260px;height: 50px;}
.top-pic{width: 1260px;height:70px;margin:0px auto;background:#0b98e0;text-align: center;}
/* 我的收藏列表左侧样式 */
.zxlb-left{width:240px;float: left;}
/* 我的收藏列表右侧列表样式 */
.zxlb-right{width: 1000px;float: right;overflow:hidden;}
.zxlb-right-wyzx{display:block;width:138px;height: 38px;border: 1px solid #797979;border-radius: 5px;
text-align: center;line-height: 38px;float:right;margin:10px 0px;}
.zxlb-right li:first-child{margin:0px;}
.zxlb-right li{width: 998px;height: 58px;border:1px solid #ccc;border-radius:8px;margin-top:10px;position:relative;}
.zxlb-right li:hover{background: #eef1f6;}
.zxlb-right a{overflow: hidden;}
.zxlb-right-title{width:156px;height:40px;border-right: 1px solid #797671;float:left;margin: 9px 0px;
text-align: center;line-height: 40px;font-size: 16px;font-weight: bold;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.zxlb-right-content{float: left;padding-top:9px;width: 800px;}
.zxlb-right-content__title{margin: 0px 0px 0px 20px;font-size: 16px;color:#333;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:block;width: 660px;}
.zxlb-right-content-time{text-align: right;padding-top: 4px;}
.zxlb-right-content-time span{color:#666;}
.zxlb-right-content-time span:first-child{margin-left: 40px;}
/* .zxlb-page{width:1000px;background: #ccc;margin: 30px 0 40px 0;} */
.zxlb-page-location{float: right;}
.zwsj{width:998px;height:80px;border:1px solid #ddd;line-height:65px;text-align: center;float: right;overflow:hidden;}
</style>