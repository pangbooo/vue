<template>
    <!--
    作者：李文达Leo
    手机：15040481637
    时间：2017年8月1日
    模块：文章管理列表
    -->
<div>
    <div class="tree__wrap">
        <component :is="AddArticle" :data="tree" :setting="setting" :skin="skin" v-on:onClick="treeNodeClick" v-on:afterTreeInit="afterTreeInit"></component>   
    </div>
    <div class="wzgl__wrap">
        <div class="wzgl__nav">
            <el-tabs v-model="navSelected" type="border-card" @tab-click="navChange">
                <el-tab-pane v-for="nd in navData" v-if="(nd.name=='内容维护')||(lmqx.XGQX)" :label="nd.label" :name="nd.name" :key="nd.name"></el-tab-pane>
                <div class="wzgl__content">
                    <v-nrwh v-if="navSelected === '内容维护'" :contentList='wzglContentList' :uuid="tempuuid" :lmmc="lmmc" @reloadGrid="reloadGrid" :lmqx="lmqx"></v-nrwh>
                    <v-plgl v-if="navSelected === '评论管理'"  @reloadGrid="reloadGrid" :contentList='wzglContentList' :uuid="tempuuid" :lmmc="lmmc" :typePingLun="typePingLun" @typePingLun-change="typePingLunChange"></v-plgl>
                    <!--<v-gdwz v-if="navSelected === '归档文章'" :contentList='wzglContentList' :uuid="tempuuid" :lmmc="lmmc"></v-gdwz>-->
                    <div class="wzgl__content__page">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalpage">
                        </el-pagination>
                    </div>
                </div>
            </el-tabs>
        </div>
    </div>
</div>
</template>

<script>
import tree from '@/components/tree/tree.vue';
import nrwh from '@/manage/wzgl/nrwh.vue';
import plgl from '@/manage/wzgl/plgl.vue';
import gdwz from '@/manage/wzgl/gdwz.vue';
import getWebLmqx from '@/services/manage/lmgl/getLmqx.js';
// import getwzgl from '@/services/wzgl/getwzgl.js';
import getTree from '@/services/manage/lmgl/getTree.js';
import getNrwh from '@/services/manage/wzgl/getWzlb.js';
import getPlgl from '@/services/manage/wzgl/getPlgl.js';
import getGdwz from '@/services/manage/wzgl/getGdwz.js';
import { getTime } from '@/lib/publicFun.js'
import allpartPlgl from '@/services/manage/wzgl/allpartPlgl.js';
    export default {
        data(){
            return {
                AddArticle: '',
                tree: [],
                setting: {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                },
                lmqx: {"LLQX":0,"SHQX":0,"WZTJ":0,"XGQX":0,"TJQX":0,"ZDQX":0,"SCQX":0}, //栏目权限
                skin: 'metroStyle',
                wzglContentList:[],
                nrwhshow: true,
                plglshow: false,
                gdwzshow: false,
                navSelected: '内容维护',
                navData: [
                    { name: "内容维护",label: "内容维护" },
                    { name: "评论管理",label: "评论管理" },
                    { name: "归档文章",label: "归档文章" }
                ],
                currentPage: 1,
                pageSize: 10,
                totalpage: 10,
                temptree: {},
                tempuuid: '',
                nodeId: '',
                lmmc: '',
                typePingLun:''

            }
        },
        created() {
            this.getLeftTree().then(() => {
                this.reloadGrid();
            });
        },
        mounted() {
            $(function() {
                $('.tree__wrap, .wzgl__wrap').height($('.pagecontent-warp').height() - 10);
                $('.wzgl__content').height($('.pagecontent-warp').height()-42-30 -10);
            });
        },
        components: {
            tree,
            'v-nrwh':nrwh,
            'v-plgl':plgl,
            'v-gdwz':gdwz,
        },
        methods: {
            afterTreeInit(treeObject){
                this.temptree = treeObject;
            },
            getLmqx(val){
            var self = this;
            let params = {};
            params.lmid = val;
            getWebLmqx(params).then(res => {
                for(let prop in res.data){
                    this.lmqx[prop]=res.data[prop];
                }
                if(this.lmqx.LLQX=='1'){
                   this.getData(val);
                }
            });
        },
            getData(val){
                let params = { 
                    nowPage: this.currentPage,
                    pageSize: this.pageSize,
                    puuid: this.tempuuid
                };
                if(this.navSelected === "评论管理"){
                    // getPlgl(params).then(res => {
                    //     if(res.status === "success"){
                    //         this.wzglContentList = res.data.DataList;
                    //         this.totalpage = res.data.totalRows;
                    //     }else{
                    //         this.$message.error('服务器异常，请联系管理员！');                            
                    //     }
                    // }).catch(res => {
                    //     this.$message.error('网络连接异常，请检查网络！');
                    // });
                let param = {
                    lmid: this.tempuuid,
                    nowPage: this.currentPage,
                    pageSize: this.pageSize,
                    sh:this.typePingLun
                }
                    allpartPlgl(param).then(data => {
                    this.wzglContentList = [];
                    this.totalpage = data.data.totalRows;
                    for(let item of data.data.DataList){
                        item.INSERT_DATE = getTime(item.INSERT_DATE);
                        this.wzglContentList.push(item);
                    }
                });
                } else if(this.navSelected === "归档文章"){
                    getGdwz(params).then(res => {
                        if(res.status === "success"){
                            this.wzglContentList = res.data.DataList;
                            this.totalpage = res.data.totalRows;
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');                            
                        }
                    }).catch(data => {
                        this.$message.error('网络连接异常，请检查网络！');
                    });
                } else {
                    getNrwh(params).then(res => {
                        if(res.status === "success"){
                            this.wzglContentList = res.data.DataList;
                            this.totalpage = res.data.totalRows;
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(res => {
                        this.$message.error('网络连接异常，请检查网络！');
                    });
                }
                
            },
        
            //获取左边树的数据
            getLeftTree(){
                let params = {};
                return getTree(params).then(res => {
                    if(res.status === "success"){
                        for(let i=0;i<res.data.length;i++){
                            if(res.data[i].PUUID === "root"){
                                let b = {
                                    id: res.data[i].UUID,
                                    pId: res.data[i].PUUID,
                                    name: res.data[i].LMMC,
                                    open: true
                                };
                                this.tree.push(b);    
                            }else{
                                let a = {
                                    id: res.data[i].UUID,
                                    pId: res.data[i].PUUID,
                                    name: res.data[i].LMMC
                                };
                                this.tree.push(a);
                            }
                            this.AddArticle='tree';
                        }
                    }else{
                        this.$message.error('服务器异常，请联系管理员！');
                    }
                }).catch(data => {
                    this.$message.error('网络连接异常，请检查网络！');
                });           
            },
            handleIconClick(e) {
                alert(e);
            },
            handleSizeChange(val){
                return;
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.getData();
            },
            typePingLunChange(val){
                this.typePingLun = val;
                this.getData();
            },
            //点击导航栏函数
            navChange(tab, event) {
                this.currentPage = 1;
                this.getData();
            },
            reloadGrid() {
                if (!this.nodeId) {
                    let node = this.temptree.getNodesByFilter(function (node) {
                    return node.level === 0;
                    }, true);
                    this.tempuuid = node.id;
                    this.lmmc = node.name;
                    this.nodeId = node.tId;
                }
                this.temptree.selectNode(this.temptree.getNodeByTId(this.nodeId));
                // this.getData(this.tempuuid);
                this.getLmqx(this.tempuuid);
            },
            treeNodeClick(event, treeId, treeNode, clickFlag) {
                this.tempuuid = treeNode.id;
                // this.getData();
                this.getLmqx(this.tempuuid);
            },
        }
    }
</script>

<style scoped>
    /*
    作者：李文达
    手机：15040481637
    时间：2017年8月1日
    模块：文章管理列表
    */
    .tree__wrap{
        /* display: inline-block; */
        width: 19%;
        float: left;
        overflow: auto;
        background: #eef1f6;
        border: 1px solid #d1dbe5;
        box-shadow: 0 2px 3px 0 rgba(0,0,0,.12), 0 0 5px 0 rgba(0,0,0,.04)
    }
    .wzgl__wrap{
        width: 79.5%;
        height: auto;
        display: inline-block;
        margin-left: 1%;
    }
    .wzgl__content{
        height: 410px;
        overflow: auto;
        width: 100%;
    }
    .wzgl__content__btn{
        margin-bottom: 10px;
    }
    .wzgl__content__page{
        float: right;
        margin-top: 5px;
        margin-left: 5px;
    }
    .wzgl__content__list{
        overflow: hidden;
    }
</style>