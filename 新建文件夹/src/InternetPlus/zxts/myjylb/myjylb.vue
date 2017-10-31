/** 
 * 文档描述: 我的建议列表
 * 作者: 杨闯 
 * 创建时间: 2017-09-21 18:43:50 
 * 最后修改人: 杨闯 
 * 最后修改时间: 2017-09-21 18:43:50 
 */
<template>
<!-- 建议列表 -->
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="location">
        <idt-breadcrumb :page="page"></idt-breadcrumb>
        <a class="zxlb-right-wyzx" href="../../zxts/jydj/index.html">建议登记</a>
    </div>
    <div class="center">    
        <div class="zxlb-left">
            <idt-personInfo></idt-personInfo>
        </div> 
        <div class="zxlb-right" v-show="jylb.length!==0">
            <ul>
                <li v-for="(item,index) in jylb" :key="index">
                    <a :href="'/zxts/myjyll/index.html?WZID='+item.UUID">
                    <div class="zxlb-right-title" :title="item.单位名称">{{item.单位名称}}</div>
                    <div class="zxlb-right-content">
                        <h3 class="nbr">{{item.建议标题}}</h3>
                        <div class="zxlb-right-content-time">
                            <span>建议时间：{{item.time}}</span>
                            <span>答复方式：{{item.答复方式}}</span>
                            <span>建议姓名：{{item.您的姓名}}</span>
                            <span>是否采纳：{{item.yesNo}}</span>
                        </div>
                    </div>
                    </a>
                </li>
            </ul>  
            <div class="zxlb-page">
                <div class="zxlb-page-location"> 
                    <idt-pagination :currentPage="currentPage" :totalPage="totalPage" :pageSize="pageSize" @current-change="currentChange" @size-change="sizeChange" class="pagePos" ></idt-pagination> 
                </div>
            </div>
        </div>
        <div class="zwsj" v-show="jylb.length===0">
            <img src="/static/img/data-null.png">
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>
</template>
<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtpagination from '@/components/pagination/index.vue';
import idtwzqd from '../wzqd/wzqd.vue';
import idtpersonInfo from '@/InternetPlus/user/personcenter/personInfo';
import getWdjy from '@/services/common/sp_xmglb/xmglb_list_jianyi.js';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import { tableIds } from '@/api/tableId.js';
import { getTime } from '@/lib/publicFun';
export default{
    data() {
        return {
            currentPage:1,
            totalPage:10,
            pageSize:10,
            nowPage:'1',
            jylb:[],
            page:'myjylb',
        }
    },
    components:{
        'idt-header':idtheader,
        'idt-footer':idtfooter,
        'idt-navbar':idtnavbar,
        'idt-breadcrumb':idtbreadcrumb,
        'idt-personInfo':idtpersonInfo,
        'idt-pagination': idtpagination,
        'idt-floatbar': floatbar
    },
    created() {
        this.getWdjy();
    },
    methods:{
        Time(arry){
            for(let k = 0;k < arry.length; k++){
                var time=getTime(arry[k].添加时间);
                var time_HF=getTime(arry[k].回复时间);
                arry[k].time = time.split(' ')[0];
            }
        },
        getWdjy(){
            let params = {
                  tableid:tableIds.在线建议,
                  ownerColname: '登记人账户',
                  nowPage : this.currentPage,
                  pageSize : this.pageSize
            };
            getWdjy(params).then(res=>{
                if(res.status === "success"){
                    this.jylb = res.data.DataList;
                    this.totalPage = res.data.totalRows;
                    this.Time(this.jylb);
                    for(let i=0;i<this.jylb.length;i++){
                        if(this.jylb[i].回复内容==""){
                            this.jylb[i].yesNo = '未被采纳'; 
                        }else{
                            this.jylb[i].yesNo = '已被采纳'; 
                        }
                    }
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        currentChange: function(val){
            this.currentPage = val;
            this.getWdjy();
        },
        sizeChange: function(val){
            this.pageSize = val;
            this.getWdjy();
        },
    }
}
</script>
<style scoped>
/* 建议列表样式 */
.center{width: 1260px;margin: 0px auto;}
.center::after{content: '';display: block;clear:both;}
.location{margin:0px auto;width: 1260px;height: 50px;position:relative;}
/* 建议左侧样式 */
.zxlb-left{width:240px;float: left;}
/* 建议列表右侧列表样式 */
.zxlb-right{width: 1000px;float: right;overflow:hidden;}
.zxlb-right-wyzx{display:block;width:100px;height: 32px;border: 1px solid #2aa0ff;border-radius: 5px;
text-align: center;line-height: 32px;float:right;position:absolute;right:0px;top:8px;background: #2aa0ff;color:#fff;}
.zxlb-right-wyzx:hover{ border: 1px solid #fb781e; background:#fb781e}
.zxlb-right li:first-child{margin:0px;}
.zxlb-right li{ cursor: pointer; width: 998px;height: 58px;border:1px solid #ccc;border-radius:8px;margin-top:10px;}
.zxlb-right li:hover{ background: #eef1f6}
.zxlb-right li:hover .zxlb-right-content a{ color: #0073da}
.zxlb-right-title{width:120px;height:40px; line-height:40px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;border-right: 1px solid #797671;float:left;margin: 9px 0px;
text-align: center;font-size: 15px;font-weight: bold;padding:0px 18px;}
.zxlb-right-content{float: left;padding:10px 0 0 0; width:820px;}
.zxlb-right-content h3{margin: 0px 0px 0px 20px;font-size: 16px;color:#333;}
.zxlb-right-content-time{ text-align:right}
.zxlb-right-content-time span{color:#666; padding: 10px;}
/* .zxlb-page{width:1000px;background: #ccc;margin: 30px 0 40px 0;} */
.zxlb-page-location{float: right;}
.zwsj{width:998px;height:80px;border:1px solid #ddd;line-height:65px;text-align: center;float: right;overflow:hidden;}
</style>