/**
 * 政务服务详细
 * author:李文达Leo
 * 2017-08-14
 */
<template>
<div class="zwfw-lb">
    <v-header></v-header>
    <v-navbar></v-navbar>
    <div class="zwfw-lb__conwarp">
        <div class="zwfw-lb__crumbs">
            <v-path page="zwfw_detail" :params="params" :backbutton="true"></v-path>
        </div>
        <div class="zwfw-lb__s1 clr">
            <div class="zwfw-lb__s1--left"> 
                <div class="zcdt__l__box">
                    <h2 class="zcdt__zcfw">政策服务</h2>
                    <ul class="zcdt__zcfw__list">
                        <li :class="['zcdt__zcfw__li',{'zcdt--active':item.checked}]" v-for="(item,index) in slidebarnav" :key="index" @click="changeSlideBar(item)">
                            <a href="javascript:;">
                                <span :class="['zcdt__zcfw__icon','zcdt__zcfw__icon--'+(index+1)]"></span>
                                {{item.lmmc}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="zcdt__l__box">
                    <h2 class="zcdt__top">点击排行</h2>
                    <ul class="zcdt__top__list">
                        <li class="zcdt__top__li" v-for="(item,index) in rank" :key="index">
                            <a :href="'/zwfw/zwfwdetail/index.html?UUID=' + uuid + '&WZID='+ item.UUID" class="nbr">
                                <span class="zcdt__top__icon">{{index+1}}</span>
                                 {{item.WZBT | subString}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="zwfw-lb__s1--right"><v-detail :articledata="articleobj"></v-detail></div>
        </div>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
import header from '@/InternetPlus/common/header/header.vue';
import navbar from '@/InternetPlus/common/navbar/navbar.vue';
import footer from '@/InternetPlus/common/footer/footer.vue';
import path from '@/components/breadcrumb/breadcrumb.vue';
import detail from './detail/detail';

import getdetail from '@/services/InternetPlus/zwfw/zwfwdetail/zwfwdetail';
import getrank from '@/services/InternetPlus/zwfw/zwfwlb/rank';

import {queryString,subString} from '@/lib/publicFun';
import { LMIDS } from '@/api/lmManage';
import { tableIds } from '@/api/tableId';

export default{
	components:{
        'v-header':header,
        'v-navbar':navbar,
        'v-footer':footer,
        'v-path': path,
        'v-detail':detail,
    },
    data() {
        return {
            articleobj:{},
            slidebarnav:[
                {
                    lmid:'',
                    lmmc:'政策动态',
                    titleclass:'1',
                    checked:true
                },{
                    lmid:'64c0100f8c8f11e790e09f7e6761c297',
                    lmmc:'法律法规',
                    titleclass:'',
                    checked:false
                },{
                    lmid:'524d176e8c9111e7aa6effc3b6d1539e',
                    lmmc:'规章制度',
                    titleclass:'',
                    checked:false
                },{
                    lmid:'011a31be8e4911e78f91c7ba380bf93b',
                    lmmc:'通知通告',
                    titleclass:'',
                    checked:false
                }
            ],
            rank:[],
            uuid:'',
            lmid:'',
            lmnum:1,
            wzid:'',
            params:[],
            page:{
                pageSize:10
            },
            tableid:"文章管理"
        }
    },
    created () {
        this.uuid = queryString("UUID");
        this.lmid = queryString("LMID");
        this.wzid = queryString("WZID");
        this.getTableid();
        this.getLmid();
        this.getrankData();
        this.curSlideBar();
        this.getArticleData();
        this.params = [
            { id: 'zwfw', val: 'UUID='+this.uuid},
            { id: 'zwfw-zwfw_lb', val: 'UUID='+this.uuid+'&LMID='+this.lmid+'&LMNUM='+this.lmnum},
            { id: 'zwfw_detail', val: 'UUID='+this.uuid+'&LMID='+this.lmid+'&WZID='+this.wzid+'&LMNUM='+this.lmnum}
        ]
    },
    filters: {
        subString:function(time){
            return subString(time,12);
        }
    },
    methods: {
        curSlideBar: function () {
            for(let i=0;i<this.slidebarnav.length;i++){
                this.slidebarnav[i].checked = false;
                if(this.slidebarnav[i].lmid == this.lmid){
                    this.slidebarnav[i].checked = true;
                }
            }
        },
        changeSlideBar: function (item) {
            window.location.href = '/zwfw/zwfwlb/index.html?UUID='+this.uuid+'&LMID='+item.lmid+'&LMNUM=1';
        },
        getArticleData: function () {
            let params = {}
            params.tableId = this.tableid;
            params.uuid = this.wzid;

            getdetail(params).then(data => {
                this.articleobj = data.data
            })
        },
        getrankData: function () {
            let param = {
                puuid : this.uuid,
                size: this.page.pageSize
            }
            getrank(param).then(data => {
                this.rank = data.data;
            })
        },
        getLmid: function () {
            for(let i=0;i<this.slidebarnav.length;i++){
                for(let v in LMIDS){
                    if(v == this.slidebarnav[i].lmmc){
                        this.slidebarnav[i].lmid = LMIDS[v];
                    }
                }
            } 
        },
        getTableid: function () {
            for(let v in tableIds){
                if(v == this.tableid){
                    this.tableid = tableIds[v];
                }
            }
        }
    }
}
</script>

<style scoped>
/*  李文达 政务服务模块css  */
.zwfw__s1,.zwfw-lb__s1{
    width: 100%;
}
.zwfw-lb__conwarp{
    width: 1250px;
    margin: 0 auto;
}
.zwfw-lb__s1--left{
    float: left;
    width: 26.08%;
}
.zwfw-lb__s1--right{
    float: right;
    width: 73.92%;
    border: 1px solid #e1dfda;
    box-sizing:border-box;
    margin-bottom: 20px;
}
/*  李文达 政务服务模块css-slidebar模块css  */
.zcdt__l__box{ width: 74%;padding:10px 18px; margin-bottom:20px; border:1px solid #ddd;}
.zcdt__l__box h2{ height:44px; line-height:44px; background:url(./img/icon.png) no-repeat; padding-left:48px; color:#fff; font-size:18px; font-weight:bold; border-bottom:5px solid #3d96e6; color:#3d96e6; font-weight:bold;}
h2.zcdt__zcfw{ background-position:2px -46px;}
h2.zcdt__top{ background-position:2px -374px;}
.zcdt__zcfw__list{ margin-top:10px;}
.zcdt__zcfw__li{ height:52px; border-bottom:1px solid #ddd;}
.zcdt__zcfw__li.zcdt--active,.zcdt__zcfw__li:hover{ color:#fa791e}
.zcdt__zcfw__li:last-child{ border:none}
.zcdt__zcfw__li a{ line-height:52px; height:52px; display:block; background:url(./img/icon.png) 220px -420px no-repeat; font-size:18px;}
.zcdt__zcfw__icon{ width:22px; height:22px; display:block; float:left; background:url(./img/icon.png) no-repeat; margin:15px 20px 0 2px;}
.zcdt__zcfw__icon--1{ background-position:0 -128px;}
.zcdt__zcfw__icon--2{ background-position:0 -195px;}
.zcdt__zcfw__icon--3{ background-position:0 -256px;}
.zcdt__zcfw__icon--4{ background-position:0 -322px;}

.zcdt--active .zcdt__zcfw__icon--1,.zcdt__zcfw__li:hover .zcdt__zcfw__icon--1{ background-position:-104px -128px;}
.zcdt--active .zcdt__zcfw__icon--2,.zcdt__zcfw__li:hover .zcdt__zcfw__icon--2{ background-position:-104px -195px;}
.zcdt--active .zcdt__zcfw__icon--3,.zcdt__zcfw__li:hover .zcdt__zcfw__icon--3{ background-position:-104px -256px;}
.zcdt--active .zcdt__zcfw__icon--4,.zcdt__zcfw__li:hover .zcdt__zcfw__icon--4{ background-position:-104px -322px;}

.zcdt__top__list{ margin-top:10px;}
.zcdt__top__li{ height:40px;}
.zcdt__top__li a{ font-size:14px; line-height:40px;}
.zcdt__top__icon{ width:22px; height:22px; display:block; float:left; background:#8b8b8b; margin:10px 15px 0 0px; color:#fff; font-size:12px; border-radius:50%; line-height:22px; text-align:center;}
.zcdt__top__li:first-child .zcdt__top__icon{ background:#ff3b3b;}
.zcdt__top__li:nth-child(2) .zcdt__top__icon{ background:#fa7b21;}
.zcdt__top__li:nth-child(3) .zcdt__top__icon{ background:#00b709;}
</style>