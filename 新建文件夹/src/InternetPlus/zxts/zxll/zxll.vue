/** 
 * 文档描述: 咨询浏览
 * 作者: 杨闯
 * 创建时间: 2017-09-21 18:44:14 
 * 最后修改人: 李文达 
 * 最后修改时间: 2017-10-06 
 */
<template>
<!-- 咨询浏览 -->
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="location">
        <idt-breadcrumb :page="page"></idt-breadcrumb>
    </div>
    <div class="center">
        <div class="zxlb-left">
            <idt-wzqd :items="items"></idt-wzqd>
        </div>
        <div class="zxlb-right">
            <div class="zxlb-right-title">咨询浏览</div>
            <h2 class="line">咨询内容</h2>
            <div class="zxll-zxbt"><label>咨询标题：</label><span class="title">{{zxll.咨询标题}}</span></div>
            <div class="zxll-zxsx"><label>咨询部门：</label><span>{{zxll.单位名称}}</span></div>
            <div class="zxll-zxsj"><label>咨询时间：</label><span>{{nowTime(zxll.咨询时间)}}</span></div>
            <div class="zxll-fwcs"><label>访问次数：</label><span>{{zxll.浏览数?zxll.浏览数:0}}</span></div>
            <div class="zxll-zxnr"><label>咨询内容：</label><span>{{zxll.咨询内容}}</span></div>
            <h2 class="line">回复内容</h2>
            <div class="zxll-hfsj" v-if="zxll.回复内容"><label>回复时间：</label><span>{{zxll.回复内容?nowTime(zxll.回复时间):'未回复'}}</span></div>
            <div class="zxll-hfdw" v-if="zxll.回复内容"><label>回复单位：</label><span>{{zxll.回复内容?zxll.单位名称:'未回复'}}</span></div>
            <div class="zxll-hfnr"><label>回复内容：</label><span>{{zxll.回复内容?zxll.回复内容:'未回复'}}</span></div>
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
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtwzqd from '../wzqd/wzqd.vue';
import getzxll from '@/services/common/zxts/wyzx/zxll';
import { queryString } from '@/lib/publicFun.js';
import { getTime } from '@/lib/publicFun.js';
import { tableIds } from '@/api/tableId.js';
export default{
    data() {
        return {
            zxll:[],
            page:'zxll',
            uuid:'',
            items: [
                // 当前页 就把isSelected写成true
                { UUID: '1' ,isSelected: true, LINK: '/zxts/zxlb/index.html' ,CLASS: 'container_left_nav_logo1',TEXT: '在线咨询' },
                { UUID: '2' ,isSelected: false, LINK: '/zxts/tslb/index.html' ,CLASS: 'container_left_nav_logo2',TEXT: '投诉举报' },
                { UUID: '3' ,isSelected: false, LINK: '/zxts/jylb/index.html' ,CLASS: 'container_left_nav_logo3',TEXT: '意见反馈' },
                { UUID: '4' ,isSelected: false, LINK: '/wsbs/pjlb/index.html' ,CLASS: 'container_left_nav_logo4',TEXT: '在线评价' },
                { UUID: '5' ,isSelected: false, LINK: '/zxts/cjwt/index.html' ,CLASS: 'container_left_nav_logo5',TEXT: '常见问题' }
            ]
        }
    },
    components:{
        'idt-header':idtheader,
        'idt-footer':idtfooter,
        'idt-navbar':idtnavbar,
        'idt-breadcrumb':idtbreadcrumb,
        'idt-wzqd':idtwzqd,
        'idt-floatbar': floatbar
    },
    created() {
        this.uuid = queryString('WZID');
        this.getzxll();
    },
    methods:{
        nowTime(time){
            return getTime(time,'yy-MM-dd');
        },
        getzxll(){
            let params = {
                  tableId:tableIds.在线咨询,
                  uuid: this.uuid,
                  isll: true
            };
            getzxll(params).then(res=>{
                if(res.status === "success"){
                    this.zxll = res.data;
                    if(res.data.回复时间 == " "||res.data.回复时间 == null){
                        this.zxll.回复时间 = "未回复";
                    }
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
    }
}
</script>
<style scoped>
/* 咨询浏览样式 */
.center{width: 1260px;margin: 10px auto;overflow:hidden; color:#333}
.center .zxlb-right{border:1px solid #ccc;font-size:14px; width: 1000px; padding:0  0 50px 0;float: right;overflow:hidden;}
.center .zxlb-right .zxlb-right-title{ line-height:42px; font-size:18px; background: #4476A7; color: #fff; margin: 0; padding: 0 80px 0 20px; height: 42px; line-height: 42px;}
.center .zxlb-right div{margin:5px 0px;width:100%;padding:5px;color:#48576c;}
.center .zxlb-right div .title {color:#007ecb; font-weight:bold}
.center .zxlb-right h2.line{ border-bottom:solid 2px #4476a7;  font-size: 18px; line-height:40px; margin:30px;}
.location{margin:0px auto;width: 1260px;height: 50px;}
.center .zxll-fwcs{margin:5px 0px;padding:5px;border:none;}
.center .zxll-close{margin:5px 0px;font-size:16px;padding:5px; float:right; border:none; text-align:right;}
.center .zxlb-right label{ width:20%; display:inline-block; text-align:right;vertical-align:top; padding-right:10px;   }
.center .zxlb-right span{ width:66%; display:inline-block}
/* 投诉列表左侧样式 */
.zxlb-left{width:240px;float: left;}
</style>