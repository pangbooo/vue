/*
 * @文档描述: 评价列表
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-22 15:49:22 
 * @Last Modified by: 李文达
 * @Last Modified time: 2017-10-09
 */
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="pjlb" id="pjlb">
        <div class="pjlb__content">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            <div class="pjlb__content__left">
                <idt-wzqd :items="items"></idt-wzqd>
            </div>
            <div class="pjlb__content__right">
                <ul>
                    <li v-for="(item,index) in tableData" :key="index">
                        <!-- <a :href="'/wsbs/ckpj/index.html?WZID='+item.XMBH"> -->
                            <div class="zxlb-right-title" :title="item.DWMC">{{item.DWMC}}</div>
                            <div class="zxlb-right-content">
                               <h3>{{item.XMMC}}<span v-if="item.ZXMC">({{item.ZXMC}})</span></h3>
                                <div class="zxlb-right-content-time">
                                    <span>环节：{{item.PJHJ}}</span>
                                    <span>评价次数：{{item.PJCS}}</span>
                                    <span>评价结果：
                                        <el-rate :title="item.PJZJ +'分'" v-model="item.PJZJ" disabled-void-color="#c0c0c0" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                                    </span>
                                </div>
                            </div>
                        <!-- </a> -->
                    </li>
                </ul>  
                <div class="pjlb__content__pagination">
                    <idt-pagination :currentPage="nowPage" :totalPage="totalRows" :pageSize="pageSize" @size-change="changePageSize" @current-change="changeNowpage"></idt-pagination>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div style="clear: both;"></div>            
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>    
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header.vue';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';
import idtpagination from '@/components/pagination/index.vue';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtwzqd from '@/InternetPlus/zxts/wzqd/wzqd.vue';

import { tableIds } from '@/api/tableId.js';
import pjlb from '@/services/InternetPlus/qlqd/xzqlqd/pjlb.js';
import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft.js';

export default {
    data() {
        return {
            page: 'pjlb',
            params: [],
            dwmc: '全部',
            hj: '',
            pjjg: '',
            dwmcoptions: [],
            hjoptions: [
                { text: '全部', value: '' },
                { text: '咨询', value: '1' },
                { text: '受理', value: '2' },
                { text: '审核', value: '3' },
                { text: '审批', value: '4' },
                { text: '办结', value: '5' }
            ],
            pjjgoptions: [
                { text: '全部', value: '' },
                { text: '非常满意', value: '5' },
                { text: '满意', value: '4' },
                { text: '一般', value: '3' },
                { text: '不满意', value: '2' },
                { text: '失望', value: '1' }
            ],
            tableData: [],
            nowPage: 1,
            pageSize: 10,
            totalRows: 100,
            filter: {},
            items: [
                { UUID: '1' ,isSelected: false, LINK: '/zxts/zxlb/index.html' ,CLASS: 'container_left_nav_logo1',TEXT: '在线咨询' },
                { UUID: '2' ,isSelected: false, LINK: '/zxts/tslb/index.html' ,CLASS: 'container_left_nav_logo2',TEXT: '投诉举报' },
                { UUID: '3' ,isSelected: false, LINK: '/zxts/jylb/index.html' ,CLASS: 'container_left_nav_logo3',TEXT: '意见反馈' },
                { UUID: '4' ,isSelected: true, LINK: '/wsbs/pjlb/index.html' ,CLASS: 'container_left_nav_logo4',TEXT: '在线评价' },
                { UUID: '5' ,isSelected: false, LINK: '/zxts/cjwt/index.html' ,CLASS: 'container_left_nav_logo5',TEXT: '常见问题' }
            ]
        }
    },
    computed: {
        
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar': idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-footer': idtfooter,
        'idt-pagination': idtpagination,
        'idt-floatbar': idtfloatbar,
        'idt-wzqd': idtwzqd
    },
    created() {
        this.getBmlist();
        this.getpjlbdata();
    },
    methods: {
        getBmlist(){
            xzqlqdlbleft().then(res => {
                if(res.status === 'success'){
                    this.dwmcoptions = res.data;
                    this.dwmcoptions.unshift({DWMC: '全部'});
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            })
        },
        getpjlbdata(){
            let params = {
                tableid: tableIds.办件评价,
                nowPage: this.nowPage,
                pageSize: this.pageSize,
                filter: this.filter
            };
            pjlb(params).then(res => {
                if(res.status === 'success'){
                    // console.log(res);
                    if(res.data.DataList.length > 0){
                        for(let i=0;i<res.data.DataList.length;i++){
                            res.data.DataList[i].PJZJ = res.data.DataList[i].PJZJ * 1;
                        }                        
                    }
                    this.tableData = res.data.DataList;
                    this.totalRows = res.data.totalRows;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            })
        },
        changeNowpage(val){
            this.nowPage = val;
            this.getpjlbdata();            
        },
        changePageSize(val){
            this.pageSize = val;
            this.getpjlbdata();            
        },
        getDataByDwmc(){
            if(this.filter.DWMC){
                if(this.dwmc === '全部'){
                    delete this.filter.DWMC;
                }else{
                    this.filter.DWMC = this.dwmc;
                }
            }else{
                if(this.dwmc !== '全部'){
                    this.filter.DWMC = this.dwmc;                    
                }
            }
            this.getpjlbdata();
        },
        getDataByPjhj(){
            if(this.filter.PJHJ){
                if(this.hj === ''){
                    delete this.filter.PJHJ;
                }else{
                    this.filter.PJHJ = this.hj;
                }
            }else{
                if(this.hj !== ''){
                    this.filter.PJHJ = this.hj;                    
                }
            }
            this.getpjlbdata();
        },
        getDataByPjjg(){
            if(this.filter.PJJG){
                if(this.pjjg === ''){
                    delete this.filter.PJJG;
                }else{
                    this.filter.PJJG = this.pjjg;
                }
            }else{
                if(this.pjjg !== ''){
                    this.filter.PJJG = this.pjjg;                    
                }
            }
            this.getpjlbdata();
        },
        getXh(row, column) {
            return ((this.nowPage - 1) * this.pageSize + this.tableData.indexOf(row) + 1);
        },
        formatterhj(row, column, cellValue){
            switch(row.PJHJ){
                case '1':
                    return '咨询';
                    break;
                case '2':
                    return '受理';
                    break;
                case '3':
                    return '审核';
                    break;
                case '4':
                    return '审批';
                    break;
                case '5':
                    return '办结';
                    break;
                default:
                    break;
            }
        }
    }
}

</script>

<style scoped>
/* 
    css belong to pjlb.vue
*/
.pjlb{
    width: 1260px;
    margin: 0 auto;
}
.pjlb__content{
    width: 1250px;
    margin: 0 auto;
}
.pjlb__content__left{
    /* width: 300px; */
    float: left;
}
.pjlb__content__right{
    width: 1000px;
    float: right;    
}
.pjlb__content__line{
    width: 100%;
    border-top: 1px solid #cccccc;
}
.pjlb__content__select{
    width: 500px;
    float: right;
}
.pjlb__content__select__dwmc{
    width: 150px;
    margin: 15px 10px;
}
.pjlb__content__select__hj{
    width: 120px;
    margin: 15px 10px;
}
.pjlb__content__select__pjjg{
    width: 150px;
    margin: 15px 10px;
}
.pjlb__content__pagination{
    width: 575px;
    float: right;
    margin: 10px 0;
}
.pjlb__content__right{width: 1000px;float: right;overflow:hidden;}
.zxlb-right-wyzx{display:block;width:138px;height: 38px;border: 1px solid #797979;border-radius: 5px;
text-align: center;line-height: 38px;float:right;position:absolute;right:0px;top:5px;}
.zxlb-right-wyzx:hover{ border: 1px solid #0073da; color:#0073da}
.pjlb__content__right li:first-child{margin:0px;}
.pjlb__content__right li{width: 998px;overflow: hidden;border:1px solid #ccc;border-radius:8px;margin-top:20px;}
.pjlb__content__right li:hover{ background: #eef1f6}
.pjlb__content__right li:hover .zxlb-right-content a{ color: #0073da}
.zxlb-right-title{width:120px;height:40px; line-height:40px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;float:left;margin: 9px 0px;text-align: center;font-size: 15px;font-weight: bold;padding:0px 18px;}
.zxlb-right-content{float: left;margin:10px 0; width:820px;border-left: 1px solid #797671;}
.zxlb-right-content h3{margin: 0px 0px 0px 20px;font-size: 16px;color:#333;}
.zxlb-right-content-time{ text-align:right}
.zxlb-right-content-time span{color:#666; padding-left: 15px;display: inline-block;}
.pjlb__content__pagination{text-align: right;}
.zxlb-right-content-time .el-rate{float: right;position: relative;top: -2px;}
</style>
