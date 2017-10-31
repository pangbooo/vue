<template>
<!--
作者：马日
手机：13478470501
时间：2017年8月31日
模块：栏目管理列表 ----todo
-->
<div>
<div class="tree__wrap">
    <tree :data="tree" :setting="setting" :skin="skin" v-on:onClick="treeNodeClick" v-on:afterTreeInit="afterTreeInit"></tree>  
</div>
<div class="lmgl__wrap">
    <div class="lmgl__nav">
        <el-tabs v-model="navSelected" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="栏目管理">
                <lmgllb :lmid="tempuuid"></lmgllb>
            </el-tab-pane>
            <el-tab-pane label="属性">
                <sx :lmid="tempuuid"></sx>
            </el-tab-pane>
            <el-tab-pane label="自定义字段管理">
                <zdyzdgl :lmid="tempuuid"></zdyzdgl>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</div>
</template>

<script>
import tree from '@/components/tree/tree.vue';
import lmgllb from './lmgllb/lmgllb.vue';
// import sx from './sx/sx.vue';

import getLmgl from '@/services/manage/lmgl/getLmgl.js';
import djLmgl from '@/services/manage/lmgl/djLmgl.js';
import getWebLmqx from '@/services/manage/lmgl/getLmqx.js';
import kscjLmgl from '@/services/manage/lmgl/kscjLmgl.js';
import xgLmmc from '@/services/manage/lmgl/xgLmmc.js';
import sortlm from '@/services/manage/lmgl/sortlm.js';
import pastelm from '@/services/manage/lmgl/pastelm.js';
import deleteLmmc from '@/services/manage/lmgl/deleteLmmc.js';
import getTree from '@/services/manage/lmgl/getTree.js';
import getSX from '@/services/manage/lmgl/getSX.js';
import getFwkz from '@/services/manage/lmgl/getFwkz.js';
import savejsqx from '@/services/manage/lmgl/savejsqx.js';
import saveipkz from '@/services/manage/lmgl/saveipkz.js';
import saveSX from '@/services/manage/lmgl/saveSX.js';
// import getzdyzd from '@/services/lmgl/getzdyzd.js';
// import savezdyzd from '@/services/lmgl/savezdyzd.js';
import getPX from '@/services/manage/lmgl/getPX.js';

// import {makePy} from './js/pinying.js';
export default {
    data(){
        return {
            componentId: '',
            AddArticle: '',
            tree: [],
            setting: {
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            },
            skin: 'metroStyle',
            lmglContentList: [],
            lmglsortList: [],
            lmglshow: true,
            fwkzshow: false,
            fwkzljshow: false,
            sxshow: false,
            lmglXjlm: false,
            lmglxjjblm: false,
            lmglxjljlm: false,
            lmglFwqx: 1,
            lmglFwqxshow: false,
            lmglFwjs: [],
            lmglFwip: [],
            lmpx: '',
            multipleSelection: [],
            fwkzIp: [
                { value: '',label: '任意IP' }
            ],
            lmglJs: [
                { value: '超级管理员',label: '超级管理员' },
                { value: '管理员',label: '管理员' },
                { value: '普通用户',label: '普通用户' }
            ],
            navBtn: [
                { key: 1,lable: "新建栏目",disable: false },
                { key: 2,lable: "快速新建栏目",disable: false },
                { key: 3,lable: "重命名",disable: true },
                { key: 4,lable: "删除",disable: true },
                { key: 5,lable: "复制",disable: true },
                { key: 6,lable: "剪切",disable: true },
                { key: 7,lable: "粘贴",disable: true },
                { key: 8,lable: "排序",disable: false }
            ],
            navSelected: '0',
            ljlxshow1: false,
            sx: {
                GJZ: "图片",
                LJDZ: "/list.jsp",
                ZMB: "/list.jsp",
                LMDM: "wzsy",
                LMLX: "基本",
                LMMC: "网站首页",
                QWJSY: "",
                SSBM: "电子政务事业部",
                UUID: "07371B363829438B845C893A165C08E5",
                WZKZZD: "未定义扩展字段",
                WZNRY: "",
                ZTNRY: "",
                LMTB: "",
                LMMS: "",
                DHXS: ""
            },
            xjjblm: {
                xsmc: '',
                lmdm: '',
                gjz: '',
                wzkzzd: '',
                zmb: '',
                yymb: '',
                zt: '显示',
                wznry: '',
                ztnry: '',
                qwjsy: '',
                ssbm: '电子政务事业部',
                jsqx: '1',
                js: '',
                ipkz: '',
                LMTB: '',
                LMMS: '',
                DHXS: ''
            },
            xjljlm: {
                xsmc: '',
                lmdm: '',
                lj: '',
                LMTB: '',
                LMMS: '',
                DHXS: ''
            },
            kscjlm: {
                lmmcz: '',
                lmzmb: ''
            },
            xglmmc: {
                xsmc: '',
                lmdm: ''
            },
            kscjlmVisible: false,
            lmpxVisible: false,
            xglmmcVisible: false,
            yymbshow: false,
            ljlxshow: false,
            wzkzzd: [
                { label: '未定义扩展字段',value: '未定义扩展字段' }
            ],
            ssbm: [
                { label: '未设定所属部门',value: '' },
                { label: '电子政务事业部',value: '电子政务事业部' },
                { label: '研发中心A',value: '研发中心A' },
                { label: '研发中心B',value: '研发中心B' }
            ],
            ljlx: '基本',
            currentPage: 1,
            pageSize: 10,
            totalpage: 10,
            xjjbmbrule: {
                xsmc: [
                    { required: true, message: '请输入显示名称', trigger: 'blur' }
                ],
                lmdm: [
                    { required: true, message: '请输入栏目代码', trigger: 'blur' }
                ],
                gjz: [
                    { required: false, message: '请输入关键字', trigger: 'blur' }
                ],
                wzkzzd: [
                    { required: false, message: '请输入文章扩展字段', trigger: 'blur' }
                ],
                zmb: [
                    { required: true, message: '请输入主模板', trigger: 'blur' }
                ],
                yymb: [
                    { required: false, message: '', trigger: 'blur' }
                ],
                LMTB: [
                    { required: true, message: '请输入栏目图标', trigger: 'blur' }
                ],
                LMMS: [
                    { required: true, message: '请输入栏目描述', trigger: 'blur' }
                ],
                DHXS: [
                    { required: true, message: '请选择是否在导航栏显示', trigger: 'change' }
                ]
            },
            xjljmbrule: {
                xsmc: [
                    { required: true, message: '请输入显示名称', trigger: 'blur' }
                ],
                lmdm: [
                    { required: true, message: '请输入栏目代码', trigger: 'blur' }
                ],
                lj: [
                    { required: true, message: '请输入链接', trigger: 'blur' }
                ],
                LMTB: [
                    { required: true, message: '请输入栏目图标', trigger: 'blur' }
                ],
                LMMS: [
                    { required: true, message: '请输入栏目描述', trigger: 'blur' }
                ],
                DHXS: [
                    { required: true, message: '请选择是否在导航栏显示', trigger: 'change' }
                ]
            },
            savesxrule: {
                LMMC: [
                    { required: true, message: '请输入显示名称', trigger: 'blur' }
                ],
                LMDM: [
                    { required: true, message: '请输入栏目代码', trigger: 'blur' }
                ],
                GJZ: [
                    { required: false, message: '请输入关键字', trigger: 'blur' }
                ],
                wzkzzd: [
                    { required: false, message: '请输入文章扩展字段', trigger: 'blur' }
                ],
                ZMB: [
                    { required: true, message: '请输入主模板', trigger: 'blur' }
                ],
                yymb: [
                    { required: false, message: '', trigger: 'blur' }
                ],
                SSBM: [
                    { required: true, message: '请选择所属部门', trigger: 'change' }
                ],
                LMTB: [
                    { required: true, message: '请输入栏目图标', trigger: 'blur' }
                ],
                LMMS: [
                    { required: true, message: '请输入栏目描述', trigger: 'blur' }
                ],
                DHXS: [
                    { required: true, message: '请选择是否在导航栏显示', trigger: 'change' }
                ]
            },
            kscjlmrule: {
                lmmcz: [
                    { required: true, message: '请输入栏目名称组', trigger: 'blur' }
                ],
                lmzmb: [
                    { required: true, message: '请输入栏目主模板', trigger: 'blur' }
                ]
            },
            xglmmcrule: {
                xsmc: [
                    { required: true, message: '栏目名称不能为空！', trigger: 'blur' }
                ],
                lmdm: [
                    { required: true, message: '栏目代码不能为空！', trigger: 'blur' }
                ],
            },
            tempuuid: '',
            tempTid: '',
            //复制剪切的时候，临时存放uuid，状态为0就是复制，状态为1就是剪切
            jianqieban: {
                status: 0,
                content: []
            },
            order: [],
            temptree: {},
            tableData: {
                DataList: [
                    // { UUID:'3ce4d5368d4c11e78b920bd6ba5315d4',ZDMC:'1427',ZDLX:'单选框',MRZ:'1427',PX:'1427' },
                    // { UUID:'a645cd898d4d11e78b920bd6ba5315d4',ZDMC:'1437',ZDLX:'文本框',MRZ:'1437',PX:'1437' },
                    // { UUID:'e80d98aa8d4e11e78b920bd6ba5315d4',ZDMC:'1446',ZDLX:'下拉框',MRZ:'1446',PX:'1446' }
                ]
            }
        }
    },
    created() {
        let self = this;
        this.getLeftTree().then(function(){
            let node = self.temptree.getNodesByFilter(function (node) {
                return node.level === 0;
            }, true);
            self.tempuuid = node.id;
            console.log(self.tempuuid);
            self.tempTid = node.tId;
            self.temptree.selectNode(self.temptree.getNodeByTId(self.tempTid));
            // self.getData(self.tempuuid);
        });
    },
    mounted() {

    },
    methods: {
        handleClick(){
            // console.log(this.navSelected);
        },
        moveup(){
            if(this.lmpx === ""){
                this.$message.error('请选择移动的栏目');
            }else if(this.lmpx === this.lmglsortList[0].UUID){
                this.$message.error('已经是第一个栏目，无法向上移动');                
            }else{
                for(let i=1;i<this.lmglsortList.length;i++){
                    if(this.lmpx === this.lmglsortList[i].UUID){
                        let arr = this.lmglsortList.splice(i,1);
                        this.lmglsortList.splice(i-1,0,arr[0]);
                    }else{

                    }
                }
            }
        },
        movedown(){
            if(this.lmpx === ""){
                this.$message.error('请选择移动的栏目');
            }else if(this.lmpx === this.lmglsortList[this.lmglsortList.length-1].UUID){
                this.$message.error('已经是最后一个栏目，无法向下移动');                
            }else{
                for(let i=this.lmglsortList.length-2;i>=0;i--){
                    if(this.lmpx === this.lmglsortList[i].UUID){
                        let arr = this.lmglsortList.splice(i,1);
                        this.lmglsortList.splice(i+1,0,arr[0]);
                    }else{

                    }
                }
            }
        },
        cancellmpx(){
            this.lmpxVisible = false;
            this.lmpx = '';
        },
        // 根据字段大小，对对象进行排序
        // createCompareFunction(){
        //     return function(object1,object2){
        //         let value1 = object1.XSSX;
        //         let value2 = object2.XSSX;
        //         if(value1<value2){
        //             return -1;
        //         } else if(value1>value2){
        //             return 1;
        //         }else{
        //             return 0;
        //         }
        //     }
        // },
        // 自定义字段管理组件添加了字段之后 再查一遍数据
        // afterAddEdit(){
        //     this.getzdyzd();
        // },
        // savezdyzd(val1){
        //     // console.log(val);
        //     // console.log(val1);
        //     let params = { arr: val1 };
        //     savezdyzd(params).then(data => {
        //         if(data.status === "success" && data.result === "true"){
        //             this.$message.success('保存成功！');
        //         }else{
        //             this.$message.error('服务器异常，请联系管理员！');
        //         }
        //     }).catch(data => {
        //         this.$message.error('网络连接异常，请检查网络！');
        //     });
        // },
        treeNodeClick(event, treeId, treeNode, clickFlag) {
            this.tempuuid = treeNode.id;
            this.tempTid = treeNode.tId;
            // this.getData(this.tempuuid);
            this.navSelected = '0';
            // this.lmglshow = true;
            // this.fwkzshow = false;
            // this.fwkzljshow = false;
            // this.sxshow = false;
            // this.lmglXjlm = false;
            // this.lmglxjjblm = false;
            // this.lmglxjljlm = false;
            // this.componentId = '';
        },
        afterTreeInit(treeObject){
            this.temptree = treeObject;
        },
        getData(val){
            let params = { 
                nowPage: this.currentPage,
                pageSize: this.pageSize,
                puuid: val
            };
            getLmgl(params).then(data => {
                // console.log(data);
                if(data.code === "idt-oApp-5000"){
                    this.lmglContentList = data.data.DataList;
                    this.totalpage = data.data.totalRows;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data => {
                this.$message.error('网络连接异常，请检查网络111！');
            });
        },
        //获取左边树的数据
        getLeftTree(){
            let params = {};
            return getTree(params).then(res => {
                // console.log(JSON.stringify(res));
                if(res.status === "success"){
                    for(let i=0;i<res.data.length;i++){
                        if(res.data[i].PUUID === "root"){
                            this.tempuuid = res.data[i].UUID;
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
                    }
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data => {
                this.$message.error('网络连接异常，请检查网络！');
            });        
        },
        //新建基本模板时，输入名称获取汉语拼音首字母
        //还要检验栏目代码的唯一性，如果重复解决方法待定
        getjbLmdm(){
            // alert('外部引入的js不对');
            this.xjjblm.xsmc=this.xjjblm.xsmc.trim();
            // this.xjjblm.lmdm = makePy(this.xjjblm.xsmc);
        },
        //新建链接模板时，输入名称获取汉语拼音首字母
        //还要检验栏目代码的唯一性，如果重复解决方法待定
        getljLmdm(){
            this.xjljlm.xsmc=this.xjljlm.xsmc.trim();
            // this.xjljlm.lmdm = makePy(this.xjljlm.xsmc);
        },
        //修改模板名称时，输入名称获取汉语拼音首字母
        //还要检验栏目代码的唯一性，如果重复解决方法待定
        xglmmcgetlmdm(){
            this.xglmmc.xsmc=this.xglmmc.xsmc.trim();
            // this.xglmmc.lmdm = makePy(this.xglmmc.xsmc);
        },
        handleIconClick(e) {
            alert(e);
        },
        handleSizeChange(val){
            return;
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getData(this.tempuuid);
        },
        //访问控制数据
        getfwkz(){
            let params = { uuid: this.tempuuid };
            getFwkz(params).then(res => {
                if(res){
                    this.ljlx = res.LMLX;
                    if(this.ljlx === '基本' && this.navSelected === 'second'){
                        this.fwkzshow = true;
                        this.fwkzljshow = false;
                    }else if(this.ljlx === '链接' && this.navSelected === 'second'){
                        this.fwkzshow = false;
                        this.fwkzljshow = true;
                    }else{
                        alert('链接类型有误！');
                    }
                    this.lmglFwqx = parseInt(res.JSQX);
                    this.lmglFwjs = [];
                    if(res.JS.indexOf(',') === -1){
                        this.lmglFwjs.push(res.JS);
                    }else{
                        this.lmglFwjs = res.JS.split(',');
                    }
                    this.lmglFwip = [];
                    if(res.IPKZ.indexOf(',') === -1){
                        this.lmglFwip.push(res.IPKZ);
                    }else{
                        this.lmglFwip = res.IPKZ.split(',');
                    }
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络 ！');
            });        
        },
        //点击导航栏函数
        navChange(tab, event) {
            if(this.navSelected === 'first'){
                this.lmglshow = true;
                this.fwkzshow = false;
                this.fwkzljshow = false;
                this.sxshow = false;
                this.lmglXjlm = false;
                this.lmglxjjblm = false;
                this.lmglxjljlm = false;
                this.componentId = '';
            }else if(this.navSelected === 'second'){
                this.cancelXjjblm('xjjblm');
                this.cancelXjljlm('xjljlm');
                this.lmglshow = false;
                this.sxshow = false;
                this.lmglXjlm = false;
                this.lmglxjjblm = false;
                this.lmglxjljlm = false;
                this.getfwkz();
                this.componentId = '';                
            }else if(this.navSelected === 'fourth'){
                this.cancelXjjblm('xjjblm');
                this.cancelXjljlm('xjljlm');
                this.fwkzshow = false;
                this.fwkzljshow = false;
                this.lmglshow = false;
                this.sxshow = false;
                this.lmglXjlm = false;
                this.lmglxjjblm = false;
                this.lmglxjljlm = false;
                this.componentId = 'zdyzdgl';
                // this.getzdyzd();
                // alert('自定义字段管理');
            }else{
                this.componentId = '';                
                let params ={
                    uuid: this.tempuuid
                };
                getSX(params).then(res => {
                    if(res.code === "idt-oApp-5000"){
                        if(res.data[0].LMLX === "基本"){
                            this.ljlxshow = false;
                            this.sx = res.data[0];
                            // console.log(res.data[0]);
                        }else{
                            this.ljlxshow = true;
                            this.sx = res.data[0];
                            this.sx.LJDZ = this.sx.ZMB;
                            // console.log(res.data[0]);                            
                        }
                    }else{
                        this.$message.error('服务器异常，请联系管理员！');
                    }
                }).catch(res => {
                    this.$message.error('网络异常，请检查网络 ！');
                });
                this.cancelXjjblm('xjjblm');
                this.cancelXjljlm('xjljlm');
                this.lmglshow = false;
                this.fwkzshow = false;
                this.fwkzljshow = false;
                this.sxshow = true;
                this.lmglXjlm = false;
                this.lmglxjjblm = false;
                this.lmglxjljlm = false;
            }
        },
        //在栏目管理表格复选框改变时
        handleSelectionChange(val){
            this.multipleSelection = val;
            if(this.multipleSelection.length > 0){
                this.navBtn[3].disable = false;
                this.navBtn[4].disable = false;
                this.navBtn[5].disable = false;
                if(this.multipleSelection.length === 1){
                    this.navBtn[2].disable = false;

                }else{
                    this.navBtn[2].disable = true;
                }
            }else{
                this.navBtn[2].disable = true;
                this.navBtn[3].disable = true;
                this.navBtn[4].disable = true;
                this.navBtn[5].disable = true;
            }
        },
        // getzdyzd(){
        //     let params = {
        //         uuid: this.tempuuid
        //         // 匹配自定义字段表中的栏目id
        //     }
        //     getzdyzd(params).then(res => {
        //         // console.log(res);
        //         if(res.code === "idt-oApp-5000"){
        //             // this.FormHeader = res.result.FormHeader;
        //             this.tableData.DataList = res.data;
        //             // this.tableData.DataList.sort(this.createCompareFunction());
        //         }else{
        //             this.$message.error('服务器异常，请联系管理员！');
        //         }
        //     }).catch(res => {
        //         this.$message.error('网络异常，请检查网络！');
        //     });
        // },
        //点击新建栏目那一排的按钮
        clickBtn(e) {
            let a;
            if(e.target.nodeName === 'SPAN'){
                if(e.target.parentNode.getAttribute('disabled') === 'disabled'){
                    return;
                }else{
                    a = e.target.parentNode.getAttribute('data-key');
                }
            }else if(e.target.nodeName === 'BUTTON'){
                a = e.target.getAttribute('data-key');
            }else{
                return;
            }
            if(a === '1'){
                this.lmglshow = false;
                this.lmglXjlm = true;
            }else if(a === '2'){
                this.kscjlmVisible = true;
            }else if(a === '3'){
                this.xglmmcVisible = true;
                this.xglmmc.xsmc = this.multipleSelection[0].lmmc;
                this.xglmmc.lmdm = this.multipleSelection[0].lmdm;
            }else if(a === '4'){
                let args = [];
                for(let i=0;i < this.multipleSelection.length;i++){
                    args.push(this.multipleSelection[i].UUID);
                }
                let params = { uuids: args };
                deleteLmmc(params).then(res => {
                    if(res.code === "idt-oApp-5000"){
                        this.$message.success('删除成功！');
                        this.tree = [];
                        let self = this;
                        this.getLeftTree().then(function(){
                            let a = self.temptree.getNodeByTId(self.tempTid);
                            self.temptree.selectNode(a);
                            self.getData(a.id);
                        });
                    }else{
                        this.$message.error('服务器异常，请联系管理员！');
                    }
                }).catch(res => {
                    this.$message.error('网络连接异常，请检查网络！');
                });
            }else if(a === '5'){
                this.jianqieban.status = 0;
                for(let i=0;i < this.multipleSelection.length;i++){
                    this.jianqieban.content.push([this.multipleSelection[i].UUID]);
                }
                this.$message.success('已经成功复制，请选择栏目进行粘贴！');
                this.navBtn[6].disable = false;
            }else if(a === '6'){
                this.jianqieban.status = 1;
                for(let i=0;i < this.multipleSelection.length;i++){
                    this.jianqieban.content.push([this.multipleSelection[i].UUID]);
                }
                this.$message.success('已经成功剪切，请选择栏目进行粘贴！');
                this.navBtn[6].disable = false;
            }else if(a === '7'){
                let params ={
                    puuid: this.tempuuid,
                    uuids: this.jianqieban.content,
                    status: this.jianqieban.status
                };
                pastelm(params).then(res => {
                    if(res.status === "success" && res.result === "true"){
                        this.$message.success('粘贴成功！');
                        this.navBtn[6].disable = true;
                    }else{
                        this.$message.error('服务器异常，请联系管理员！');
                    }
                }).catch(data =>{
                    this.$message.error('网络连接异常，请检查网络！')
                });
            }else{
                // this.lmglsortList = this.lmglContentList;
                let self = this;
                this.getPX().then(function(){
                    self.lmpxVisible = true;
                    console.log(self.lmglsortList);                    
                });
            }
        },
        //获取排序
        getPX(){
            let params = { puuid: this.tempuuid };
            return getPX(params).then(res => {
                if(res.code === "idt-oApp-5000"){
                    this.lmglsortList = res.data;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data =>{
                this.$message.error('网络连接异常，请检查网络！')
            });
        },
        //点击新建栏目中取消按钮
        cancelXj(){
            this.lmglshow = true;
            this.lmglXjlm = false;
        },
        //新建基本栏目
        turnxjjblm(){
            this.lmglXjlm = false;
            this.lmglxjjblm = true;
        },
        //新建链接栏目
        turnxjljlm(){
            this.lmglXjlm = false;
            this.lmglxjljlm = true;    
        },
        // 新建对接栏目
        turndjlm(){
            this.$message.warning('对接栏目，等待开放！');
        },
        //保存新建的基本栏目
        saveXjjblm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {           
                    let params = this.xjjblm;               
                    params.lmlx="基本";
                    params.puuid=this.tempuuid;
                    djLmgl(params).then(res => {
                        if(res.code === "idt-oApp-5000"){
                            this.lmglshow = true;
                            this.lmglxjjblm = false;
                            this.$message.success('新建基本栏目成功！');
                            this.$refs[formName].resetFields();
                            this.tree = [];
                            let self = this;
                            this.getLeftTree().then(function(){
                                let a = self.temptree.getNodeByTId(self.tempTid);
                                self.temptree.selectNode(a);
                                self.getData(a.id);
                            });
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(data =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                } else {
                    return false;
                }
            });
        },
        //保存新建的链接栏目            
        saveXjljlm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //登记链接栏目时，传一个参数，类型为链接栏目
                    let params = this.xjljlm;
                    params.zmb = this.xjljlm.lj;
                    params.gjz = '';
                    params.wzkzzd = '';
                    params.yymb = '';
                    params.lmlx = "链接";
                    params.zt = "显示";
                    params.wznry = '';
                    params.ztnry = '';
                    params.qwjsy = '';
                    params.ssbm = '电子政务事业部';
                    params.js = '';
                    params.jsqx = '';
                    params.ipkz = '';
                    params.puuid = this.tempuuid;
                    djLmgl(params).then(res => {
                        if(res.code === "idt-oApp-5000"){
                            this.lmglshow = true;
                            this.lmglxjljlm = false;
                            this.$message.success('新建链接栏目成功！');
                            this.$refs[formName].resetFields();
                            this.tree = [];
                            let self = this;
                            this.getLeftTree().then(function(){
                                let a = self.temptree.getNodeByTId(self.tempTid);
                                self.temptree.selectNode(a);
                                self.getData(a.id);
                            });
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');                        
                        }
                    }).catch(data =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                }else{
                    return false;
                }
            });
        },
        //取消新建基本栏目
        cancelXjjblm(formName){
            this.lmglshow = true;
            this.lmglxjjblm = false;
            this.$refs[formName].resetFields();
        },
        //取消新建链接栏目
        cancelXjljlm(formName){
            this.lmglshow = true;
            this.lmglxjljlm = false;
            this.$refs[formName].resetFields();
        },
        //保存快速创建栏目
        savekscjlm(val){
            this.$refs[val].validate((valid) => {
                if (valid) {
                    this.kscjlm.lmmcz = this.kscjlm.lmmcz.trim();
                    let arr = this.kscjlm.lmmcz.split(",");
                    let params1 = [];
                    for(let i=0;i<arr.length;i++){
                        params1.push([arr[i],'','','基本',this.kscjlm.lmzmb,'显示','','','','','电子政务事业部','1','','',this.tempuuid]);
                    }
                    let params = { args: params1 };
                    kscjLmgl(params).then(res => {
                        if(res.status === "success" && res.result === "true"){
                            this.kscjlmVisible = false;
                            this.$message.success('快速创建基本栏目成功！');
                            this.$refs[val].resetFields();
                            this.tree = [];
                            let self = this;
                            this.getLeftTree().then(function(){
                                let a = self.temptree.getNodeByTId(self.tempTid);
                                self.temptree.selectNode(a);
                                self.getData(a.id);
                            });
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');                        
                        }
                    }).catch(data =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                }else{
                    return false;
                }
            });
        },
        //取消快速创建栏目
        cancelkscjlm(val){
            this.$refs[val].resetFields();                
            this.kscjlmVisible = false;
        },
        //保存重命名
        saveXglmmc(val){
            this.$refs[val].validate((valid) => {
                if (valid) {
                    let params = {
                        uuid: this.multipleSelection[0].UUID,
                        lmmc: this.xglmmc.xsmc,
                        lmdm: this.xglmmc.lmdm
                    };
                    xgLmmc(params).then(res => {
                        if(res.code = "idt-oApp-5000" && res.data === "true"){
                            this.xglmmcVisible = false;
                            this.$message.success('修改栏目名称成功！');
                            this.tree = [];
                            let self = this;
                            this.getLeftTree().then(function(){
                                let a = self.temptree.getNodeByTId(self.tempTid);
                                self.temptree.selectNode(a);
                                self.getData(a.id);
                            });
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');                        
                        }
                    }).catch(data =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                }else{
                    return false;
                }
            });
        },
        //保存栏目排序
        //这块的栏目排序还需要维护一下，到底怎么与数据库交互
        savelmpx(){
            this.order.length = 0;
            for(let i=0;i<this.lmglsortList.length;i++){
                this.order.push(this.lmglsortList[i].UUID)
            }
            // console.log(this.order);
            let params = { arr: this.order };
            sortlm(params).then(res => {
                if(res.code === "idt-oApp-5000"){
                    // console.log(res);
                    this.lmpxVisible = false;
                    this.$message.success('修改栏目排序成功！');
                    this.tree = [];                    
                    let self = this;
                    this.getLeftTree().then(function(){
                        let a = self.temptree.getNodeByTId(self.tempTid);
                        self.temptree.selectNode(a);
                        self.getData(a.id);
                    });
                }else{
                    this.$message.error('服务器异常，请联系管理员！');                        
                }
            }).catch(res =>{
                this.$message.error('网络连接异常，请检查网络！')
            });
        },
        //保存角色权限
        savejsqx(){
            let temp;
            if(this.lmglFwqx === 3){
                if(this.lmglFwjs.length === 0){
                    temp = "";
                }else{
                    temp = this.lmglFwjs.join(",");
                }
            }else{
                temp = "";
            }
            let params = {
                uuid: this.tempuuid,
                lmglFwqx: this.lmglFwqx,
                lmglFwjs: temp
            };
            savejsqx(params).then(res => {
                if(res.status === "success" && res.result === "true"){
                    this.$message.success('角色权限保存成功！');
                }else{
                    this.$message.error('服务器异常，请联系管理员！');                        
                }
            }).catch(data =>{
                this.$message.error('网络连接异常，请检查网络！')
            });
        },
        //保存ip控制
        saveipkz(){
            let temp;
            if(this.lmglFwip.length === 0){
                temp = "";
            }else{
                temp = this.lmglFwip.join(",");
            }
            let params = {
                uuid: this.tempuuid,
                lmglFwip: temp
            };
            saveipkz(params).then(res => {
                alert();
                if(res.status === "success" && res.result === "true"){
                    this.$message.success('角色权限保存成功！');
                }else{
                    this.$message.error('服务器异常，请联系管理员！');                        
                }
            }).catch(data =>{
                this.$message.error('网络连接异常，请检查网络！')
            });
        },
        //保存属性
        saveSX(val){
            this.$refs[val].validate((valid) => {
                if (valid) {
                    let params = this.sx;
                    params.uuid=this.tempuuid;
                    // let temp = this.
                    saveSX(params).then(res => {
                        if(res.code === "idt-oApp-5000"){
                            this.$message.success('栏目属性保存成功！');
                            this.tree = [];
                            let self = this;
                            this.getLeftTree().then(function(){
                                let a = self.temptree.getNodeByTId(self.tempTid);
                                self.temptree.selectNode(a);
                                self.getData(a.id);
                                self.tempuuid = a.id;
                            });
                            this.navSelected = 'first';
                            this.lmglshow = true;
                            this.fwkzshow = false;
                            this.fwkzljshow = false;
                            this.sxshow = false;
                            this.lmglXjlm = false;
                            this.lmglxjjblm = false;
                            this.lmglxjljlm = false;
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');                        
                        }
                    }).catch(data =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                } else {
                    return false;
                }
            });
        },
        //监听主模板的变化情况
        checkzmb(){
            if(this.xjjblm.zmb !== ''){
                this.yymbshow = true;
            }else{
                this.yymbshow = false;
                this.xjjblm.yymb = '';
            }
        }
    },
    watch: {
        //检测访问控制中的角色浏览权限控制的变化
        lmglFwqx: {
            handler: function(val, oldVal){
                if(this.lmglFwqx === 3){
                    this.lmglFwqxshow = true;
                }else{
                    this.lmglFwqxshow = false;
                }
            }
        },
        //监听访问控制下的角色控制下的角色变化
        lmglFwjs: {
            handler: function(val, oldVal){
                if(this.lmglFwjs.length === 1){
                    if(this.lmglFwjs[0] === ""){
                        this.lmglFwjs = [];
                    }else{
                        return;
                    }
                }else{
                    return;
                }
            },
            deep: true
        },
        //监听访问控制下的IP控制的变化
        lmglFwip: {
            handler: function(val, oldVal){
                if(this.lmglFwip.length === 1){
                    return;
                }else if(this.lmglFwip.length === 0){
                    this.lmglFwip.push('');
                }else{
                    for(let i=0;i < this.lmglFwip.length;i++){
                        if(this.lmglFwip[i] === ''){
                            this.lmglFwip.splice(i,1);
                        }else{}
                    }
                }
            },
            deep: true
        }
    },
    components: {
        tree,lmgllb,
        sx: resolve => require(['./sx/sx.vue'], resolve),
        zdyzdgl: resolve => require(['./zdyzdgl/zdyzdgl.vue'], resolve),
    }
}
</script>

<style scoped>
/*
作者：马日
手机：13478470501
时间：2017年7月25日16:50:08
模块：栏目管理列表
*/
.tree__wrap{
    width: 17%;
    height: 500px;
    float: left;
    overflow: auto;
}
.lmgl__wrap{
    width: 83%;
    height: auto;
    display: inline-block;
}
.lmgl__content{
    height: 100%;
    overflow: auto;
    width: 100%;
}
.lmgl__fwkz{
    height: 100%;
    overflow: auto;
    width: 100%;
}
.lmgl__content__btn{
    margin-bottom: 10px;
}
.fwkz__ul{
    margin-bottom: 10px;
}
.fwkz__jsll{
    border: 1px solid #3388cb;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    margin-bottom: 10px;
}
.fwkz__xzjs{
    margin: 10px 0;
}
.fwkz__select{
    display: inline-block;
    margin-right: 10px;
}
.fwkz__ipkz{
    border: 1px solid #3388cb;
    margin-top: 10px;
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
}
.fwkz__ipkz__tip{
    color: #c2222c;
}
.lmgl__fwkzlj{
    height: 430px;
}
.lmgl__fwkzlj p{
    color: #000000;
    font-size: 20px;
    font-weight: bold;
}
.lmgl__sx__tip{
    display: block;
    color: #ff8000;
    margin-left: 120px;
    margin-top: -15px;
    margin-bottom: 10px;
}
.lmgl__sx__tip .sx__tip--editor{
    color: #0000ff;
    cursor: pointer;
    margin: 0px 15px;
}
.sx__form__save{
    margin-left: 50px;
}
.sx__form__select{
    width: 410px;
}
.save__tip{
    margin-top: -25px;
}
.lmgl__xjlm{
    height: 430px;
}
.lmgl__xjlm__wrap{
    width: 100%;
    height: 60px;
    background-color: #fafafa;
    position: relative;
    cursor: pointer;
}
.lmgl__xjlm__wrap:hover{
    background-color: #f6f6f6;
}
.lmgl__xjlm__jblm{
    width: 200px;
    height: 60px;
    display: inline-block;
    background: url(./img/app_news.gif) center no-repeat;
}
.lmgl__xjlm__lj{
    width: 200px;
    height: 60px;
    display: inline-block;        
    background: url(./img/app_link.gif) center no-repeat;
}
.lmgl__xjlm__tip{
    height: 60px;
    line-height: 60px;
    position: absolute;
    margin-left: 5px;
}
.lmgl__xjlm__btn{
    margin-top: 5px;
}
.lmgl__xjjblm{
    height: 435px;
    overflow: auto;
    width: 100%;
}
.lmgl__xjljlm{
    width: 100%;
    height: 280px;
    overflow: auto;
}
.kscjlm__tip{
    display: block;
    color: #ff8000;
    margin-top: -15px;
    margin-bottom: 15px;
}
.lmgl__content__list{
    overflow: hidden;
}
</style>