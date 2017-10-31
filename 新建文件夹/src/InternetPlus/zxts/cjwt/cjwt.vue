/** 
 * 文档描述: 常见问题列表
 * 作者: 杨闯 
 * 创建时间: 2017-09-21 18:43:50 
 * 最后修改人: 杨闯
 * 最后修改时间: 2017-10-09
 */
<template>
<!-- 常见问题 -->
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="location">
        <idt-breadcrumb :page="page"></idt-breadcrumb>
    </div>
    <div class="center">
        <div class="pjlb__content__left">
            <idt-wzqd :items="items"></idt-wzqd>
        </div>
        <div class="zxlb-right">
            <div class="zxlb-top">
                <el-form ref="ruleForm" :model="ruleForm" label-width="75px" :inline="true">
                    <el-form-item label="权力部门" prop="interest">
                        <el-select @change="getcjwt()" class="interest" v-model="ruleForm.interest" placeholder="请选择权力部门">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="(item,index) in qlbm" :key="index" :label="item.DWMC" :value="item.DWMC"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字" prop="name">
                        <el-input class="name" v-model="ruleForm.name" placeholder="常见问题名称"  @keyup.enter.native="chooseGJZ2($event)"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit" type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <ul class="zxlb-right--ul" v-show="cjwt.length!==0">
                 <!-- @click="dialogTableVisible=true,getDate(index)" -->
                <li v-for="(item,index) in cjwt" :key="index">
                    <a :href="'../../zxts/wtll/index.html?WZID='+item.UUID">
                    <div class="zxlb-right-title" :title="item.单位名称">{{item.单位名称}}</div>
                    <div class="zxlb-right-content">
                        <h3 class="nbr">{{item.问题}}</h3>
                        <div class="zxlb-right-content-answer">
                            <span>{{item.解答}}</span>
                        </div>
                    </div>
                    </a>
                </li>
            </ul>  
            <!-- <el-dialog title="问题浏览" :visible.sync="dialogTableVisible">
                <div class="question-title">{{title}}</div>
                <div class="question-content">{{content}}</div>
            </el-dialog> -->
            <div class="zxlb-page" v-show="cjwt.length!==0">
                <div class="zxlb-page-location"> 
                    <idt-pagination :currentPage="currentPage" :totalPage="totalPage" :pageSize="pageSize" @current-change="currentChange" @size-change="sizeChange" class="pagePos" ></idt-pagination>
                </div>
            </div>
            <div class="zwsj" v-show="cjwt.length===0">
                <img src="/static/img/data-null.png">
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
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtpagination from '@/components/pagination/index.vue';
import idtwzqd from '@/InternetPlus/zxts/wzqd/wzqd.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';

import getcjwt from '@/services/common/zxts/cjwt/wtlb';
import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import { tableIds } from '@/api/tableId.js';
export default{
    data() {
        return {
            currentPage:1,
            totalPage:10,
            pageSize:10,
            nowPage:'1',
            dialogTableVisible: false,
            cjwt:[],
            qlbm:[],
            title:'',
            content:'',
            page:'cjwt',
            interest:[],
            ruleForm: {
                name:'',
                interest:''
            }, 
            items: [
                { UUID: '1' ,isSelected: false, LINK: '/zxts/zxlb/index.html' ,CLASS: 'container_left_nav_logo1',TEXT: '在线咨询' },
                { UUID: '2' ,isSelected: false, LINK: '/zxts/tslb/index.html' ,CLASS: 'container_left_nav_logo2',TEXT: '投诉举报' },
                { UUID: '3' ,isSelected: false, LINK: '/zxts/jylb/index.html' ,CLASS: 'container_left_nav_logo3',TEXT: '意见反馈' },
                { UUID: '4' ,isSelected: false, LINK: '/wsbs/pjlb/index.html' ,CLASS: 'container_left_nav_logo4',TEXT: '在线评价' },
                { UUID: '5' ,isSelected: true, LINK: '/zxts/cjwt/index.html' ,CLASS: 'container_left_nav_logo5',TEXT: '常见问题' }
            ]  
        }
    },
    components:{
        'idt-header':idtheader,
        'idt-footer':idtfooter,
        'idt-navbar':idtnavbar,
        'idt-breadcrumb':idtbreadcrumb,
        'idt-floatbar': floatbar,
        'idt-pagination': idtpagination,
        'idt-wzqd': idtwzqd
    },
    created() {
        this.getcjwt();
        this.xzqlqdlbleft();
    },
    methods:{
        currentChange: function(val){
            this.currentPage = val;
            this.getcjwt();
        },
        chooseGJZ2: function(ev){
            if(ev.keyCode==13){
                 this.getcjwt();
            }
        },
        getDate(index){
            this.getcjwt();
            this.title = this.cjwt[index].问题;
            this.content = this.cjwt[index].解答;
        },
        getcjwt(){
            let params = {
                tableid:tableIds.常见问题,
                nowPage : this.nowpage,
                pageSize : this.pagesize,
                filter: {}
            };

            this.ruleForm.interest ? params.filter["单位名称"] = this.ruleForm.interest:'';
            this.ruleForm.name ? params.filter["searchKey"] = this.ruleForm.name:'';

            getcjwt(params).then(res=>{
                if(res.status === "success"){
                    this.cjwt = res.data.DataList;
                    this.totalPage = res.data.totalRows;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        sizeChange: function(val){
            this.pageSize = val;
            this.getcjwt();
        },
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getcjwt();
                } else {
                    console.log('error submit!!');  
                    return false;
                }
            });
        },
        // 获取部门
        xzqlqdlbleft(){
            xzqlqdlbleft().then(res => {
                if (res.status === "success") {
                    for(let i=0; i<res.data.length; i++){
                        if(res.data[i].DWMC){
                            this.qlbm.push(res.data[i])
                        }
                    }
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                } 
            }).catch(data =>{
                this.$message.error('xzqlqdlbleft异常，请检查网络！')
            })
        },
    }
}
</script>
<style>
/* 常见问题样式 */
.center{width: 1260px;margin: 0px auto 10px;}
.center::after{content: '';display: block;clear:both;}
.location{margin:0px auto;width: 1260px;height: 50px;}
.top-pic{width: 1260px;height:70px;margin:0px auto;background:#0b98e0;text-align: center;}

.pjlb__content__left{
    /* width: 300px; */
    float: left;
}
.zxlb-right{
    width: 1000px;
    float: right;    
    position: relative;
}
.zxlb-top{position: absolute;right:0;top:-55px;}
.zxlb-top .el-form--inline .el-form-item,.zxlb-top .el-form--inline .el-form-item__content{
    vertical-align: baseline;
}

.zxlb-right--ul li:first-child{margin:0px;}
.zxlb-right--ul li{height: 58px;border:1px solid #ccc;border-radius:8px;margin-top:10px;cursor: pointer;}
.zxlb-right--ul li:hover{ background: #eef1f6;}
.zxlb-right-title{width:120px;height:40px; line-height:40px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;border-right: 1px solid #797671;float:left;margin: 9px 0px;
text-align: center;font-size: 15px;font-weight: bold;padding:0px 18px;}
.zxlb-right-title:hover{cursor: pointer;}
.zxlb-right-content{float: left;padding:10px 0;width: 800px;}
.zxlb-right-content h3{margin-left:20px;font-size: 16px;color:#333;text-align: left;}
/* .zxlb-right-content span{color:#666;padding-left: 15px;} */
.zxlb-right-content-answer{text-indent:20px;width: 800px;height:20px;margin-left:20px;color:#666;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.zxlb-page{text-align: right;}
.interest,.name,.submit{margin:12px 0px;}
.question-title{font-size:20px;text-align: center;}
.question-content{font-size:15px;margin: 20px 0px;text-indent: 2em;}
.zwsj{width:998px;height:80px;border:1px solid #ddd;line-height:65px;text-align: center;}
</style>