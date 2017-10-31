/*
 * @文档描述: 责任清单列表
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-26 11:29:35 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-05 14:21:31
 */

<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="zrqdlb" id="zrqdlb">
        <div class="zrqdlb__content">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            <div class="zrqdlb__content__wrap">
                <div class="zrqdlb__content__left">
                    <div class="zrqdlb__content__left__title">
                        <img src="./img/bm.png" alt="图片加载失败">按部门
                    </div>
                    <!-- <ul class="zrqdlb__content__left__content">
                        <li v-for="item in bmlist" @click="selectBm(item)" :key="item.DWJC" :class="{'zrqdlb__content__left__content--active': item.flag}">{{item.DWMC}}</li>
                    </ul> -->
                    <div class="xzqlqd__foot">
                        <a v-for="(item,index) in bmlist" @click="selectBm(item)" :key="index" :class="['nbr',{xzqlqd__foot__hover:item.flag}]" href="javascript:void(0);" :title="item.DWMC">{{item.DWMC}}</a>
                        <img v-if="bmlist.length === 0" src="/static/img/data-null.png" alt="无数据">
                    </div>
                </div>
                <div class="zrqdlb__content__right">
                    <div class="zrqdlb__content__left__title">
                        <img src="./img/right.png" alt="图片加载失败">{{ filter.DWMC }}
                    </div>
                    <ul class="zrqdlb__content__right__content">
                        <li v-for="item in zrqdList" :key="item.部门名称">
                            <div class="zrqdlb__content__right__content__shugang"></div>
                            <div class="zrqdlb__content__right__content__content">{{ item.部门职责 }}</div>
                            <img class="zrqdlb__content__right__content__img" src="./img/jtgzsx.png" alt="图片载入失败">
                        </li>
                        <li v-if="zrqdList.length === 0" class="zrqdlb__content__right__content--none">
                            <img src="/static/img/data-null.png" alt="暂无数据">
                        </li>
                    </ul>
                    <div class="zrqdlb__content__right__pagination">
                        <idt-pagination :currentPage="nowPage" :totalPage="totalRows" :pageSize="pageSize" @size-change="changePageSize" @current-change="changeNowpage"></idt-pagination>
                    </div>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtpagination from '@/components/pagination/index.vue';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';

import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft.js';
import zrqdlb from '@/services/InternetPlus/qlqd/zrqd/zrqdlb.js';
import { tableIds } from '@/api/tableId.js';

export default{
    components:{
        'idt-header': idtheader,
        'idt-navbar':idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-pagination': idtpagination,
        'idt-footer': idtfooter,
        'idt-floatbar': idtfloatbar
    },
    data() {
        return {
            page:'zrqdlb',
            params: [],
            bmlist: [],
            nowPage: 1,
            pageSize: 10,
            totalRows: 100,
            filter: {},
            zrqdList: []
        }
    },
    created(){
        this.getBmList();
    },
    methods:{
        getBmList(){
            xzqlqdlbleft().then(res => {
                if(res.status === 'success'){
                    this.bmlist = res.data;
                    for(let i=0;i<this.bmlist.length;i++){
                        this.$set(this.bmlist[i],'flag',false);
                    }
                    this.bmlist[0].flag = true;
                    this.filter = { DWMC: this.bmlist[0].DWMC };
                    this.getBmzrList();
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        selectBm(obj){
            this.filter = { DWMC: obj.DWMC };            
            for(let i=0;i<this.bmlist.length;i++){
                if(this.bmlist[i].DWMC === obj.DWMC){
                    this.bmlist[i].flag = true;
                }else{
                    this.bmlist[i].flag = false;                    
                }
            }
            this.getBmzrList();
        },
        getBmzrList(){
            let params = {
                tableid: tableIds.责任清单,
                nowPage: this.nowPage,
                pageSize: this.pageSize,
                filter: this.filter
            };
            zrqdlb(params).then(res => {
                if(res.status === 'success'){
                    // console.log(res);
                    this.zrqdList = res.data.DataList;
                    this.totalRows = res.data.totalRows;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        changeNowpage(val){
            this.nowPage = val;
            this.getBmzrList();            
        },
        changePageSize(val){
            this.pageSize = val;
            this.getBmzrList();            
        },
    }
}
</script>

<style scoped>
/* 
    css belong to pjlb.vue
*/
.zrqdlb{
    width: 1260px;
    margin: 0 auto;
}
.zrqdlb__content{
    width: 1250px;
    margin: 0 auto;
}
.zrqdlb__content__left{
    width: 290px;
    margin-bottom: 20px;
    float: left;
}
.zrqdlb__content__left__title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    font-size: 20px;
    border-bottom: 3px solid #3c97e6;
}
.zrqdlb__content__left__title img{
    height: 22px;
    width: 22px;
    margin: 0 20px;
    vertical-align: text-top;
}
.zrqdlb__content__left__content{
    width: 100%;
    background-color: #f1f6fa;
    /* padding: 15px 20px; */
}
.zrqdlb__content__left__content li{
    width: 100%;
    height: 20px;
    cursor: pointer;
    background: url(./img/hg.png) no-repeat 0 center;
    padding: 5px 0 5px 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.zrqdlb__content__left__content li:hover,.zrqdlb__content__left__content--active{
    color: #fa791e;
}
.zrqdlb__content__right{
    margin-bottom: 20px;
    width: 940px;
    float: right;    
}
.zrqdlb__content__right__content li{
    width: 100%;
    height: 110px;
    border: 1px solid #dedede;
    margin: 20px 0;
}
.zrqdlb__content__right__content__shugang{
    width: 10px;
    height: 100%;
    background-color: #3c97e6;
    float: left;
}
.zrqdlb__content__right__content__content{
    width: 740px;
    height: 75px;
    margin: 15px;
    float: left; 
    font-size: 16px;
    line-height: 25px;
    overflow: hidden;
}
.zrqdlb__content__right__content__img{
    float: right;
    margin-top: 24px;
    margin-right: 35px;
    cursor: pointer;
}
.zrqdlb__content__right__pagination{
    width: 575px;
    float: right;
}
.zrqdlb__content__right__content .zrqdlb__content__right__content--none{
    width: 100%;
    height: 50px;
    text-align: center;
}

.xzqlqd__foot {
    overflow: hidden;
    border: 1px solid #dedede;
    border-top: none;
}

.xzqlqd__foot a {
    display: block;
    float: left;
    width: 124px;
    line-height: 32px;
    border-bottom: 1px solid #E7E7E7;
    font-size: 14px;
    color: #666666;
    padding: 0 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.xzqlqd__foot a:hover ,.xzqlqd__foot .xzqlqd__foot__hover {
    background-color: #5495CF;
    color: #fff;
}

.xzqlqd__tableTr td {
    width: 142px;
    padding-left: 20px;
}

.xzqlqd__hs {
    color: #000000;
}
.xzqlqd__foot img{
    width: 200px;
    margin: 0 auto;
    display: block;
}
</style>