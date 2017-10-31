<template>
<div class="bmfw-left">
    <div class="bmfw-nav-title">
        <span :class="{ hover: anzhuti}" @click="changeHoverzt">按主题</span>
        <span :class="{ hover: anbumen}" @click="changeHoverbm">按部门</span>
    </div>
    <ul class="clr bmfw-nav-con" id="bmfw-nav" v-show="anzhuti">
        <li :key="zt.id" v-for="zt in zhuti" class="bmfwNavConH" :class="{ bmfwNavConHH: zt.isSelected }" @click="leftClick(zt.id)">
            <a :class="{ vchangecolor: zt.isSelected }" :href="zt.link"><span :style="zt.vbgposition"></span><b>{{zt.text}}</b></a>
        </li>
    </ul>
    <ul class="clr bmfw-nav-con" id="bmfw-nav2" v-show="anbumen">
        <li :key="zt.id" v-for="zt in bumen" class="bmfwNavConH" :class="{ bmfwNavConHH: zt.isSelected }" @click="leftClick(zt.id)">
            <a :class="{ vchangecolor: zt.isSelected }" :href="zt.link"><span :style="zt.vbgposition"></span><b>{{zt.text}}</b></a>
        </li>
    </ul>
</div>
</template>

<script>
import Vue from 'vue';
window.grfreventBus = new Vue();
export default{
    data(){
        return{
            anzhuti: true,
            anbumen: false,
            zhuti: [
                { id: 1,text: '婚育收养',isSelected: true,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 0;' },
                { id: 2,text: '房屋租赁',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px 0;' },
                { id: 3,text: '劳动就业',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -30px;' },
                { id: 4,text: '就医保健',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -30px;' },
                { id: 5,text: '教育服务',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -60px;' },
                { id: 6,text: '场馆设施',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -60px;' },
                { id: 7,text: '交通出行',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -90px;' },
                { id: 8,text: '社会保险',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -90px;' },
                { id: 9,text: '福利救助',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -120px;' },
                { id: 10,text: '公共安全',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -120px;' },
                { id: 11,text: '司法公正',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -150px;' },
                { id: 12,text: '纳税缴费',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -150px;' },
                { id: 13,text: '创新就业',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -180px;' },
                { id: 14,text: '气象环保',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -180px;' },
                { id: 15,text: '证件办理',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -210px;' },
                { id: 16,text: '三农服务',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -210px;' },
                { id: 17,text: '机构名录',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -240px;' },
                { id: 18,text: '其他',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -240px;' }
            ],
            bumen: [
                { id: 11,text: '司法公正',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -150px;' },
                { id: 12,text: '纳税缴费',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -150px;' },
                { id: 13,text: '创新就业',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -180px;' },
                { id: 14,text: '气象环保',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -180px;' },
                { id: 15,text: '证件办理',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -210px;' },
                { id: 16,text: '三农服务',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -210px;' },
                { id: 17,text: '机构名录',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -240px;' },
                { id: 1,text: '婚育收养',isSelected: true,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 0;' },
                { id: 2,text: '房屋租赁',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px 0;' },
                { id: 3,text: '劳动就业',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -30px;' },
                { id: 4,text: '就医保健',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -30px;' },
                { id: 5,text: '教育服务',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -60px;' },
                { id: 6,text: '场馆设施',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -60px;' },
                { id: 7,text: '交通出行',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -90px;' },
                { id: 8,text: '社会保险',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -90px;' },
                { id: 9,text: '福利救助',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: 0 -120px;' },
                { id: 10,text: '公共安全',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -120px;' },
                { id: 18,text: '其他',isSelected: false,link: 'javascript:void(0)',vclickbg: '',vbgposition: 'background-position: -40px -240px;' }
            ]
        }
    },
    methods:{
        changeHoverzt: function(){
            this.anzhuti=true;
            this.anbumen=false;
        },
        changeHoverbm: function(){
            this.anbumen=true;
            this.anzhuti=false;
        },
        leftClick: function(val){
            //点击左边的加上样式bmfwNavConHH
            for(let i=0;i < this.zhuti.length;i++){
                this.zhuti[i].isSelected=false;
                this.bumen[i].isSelected=false;
                if(this.zhuti[i].id === val){
                    this.zhuti[i].isSelected=true;
                }
                if(this.bumen[i].id === val){
                    this.bumen[i].isSelected=true;
                }
            }
            grfreventBus.$emit("getLeftId",val)
        }
    }
}
</script>

<style scoped>
.bmfw{
    .width: 100%;
    position: relative;
    padding-top: 30px;
}
.bg1{
    width: 158px;
    height: 255px;
    position: absolute;
    left: 0;
    top: 20%;
}
.bg2{
    width: 95px;
    height: 151px;
    position: absolute;
    right: 0;
    top: 30%;
}
.bg3{
    width: 275px;
    height: 295px;
    position: absolute;
    right: 0;
    bottom: 0;
}
.center{
    width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 4;
    padding-bottom: 30px;
}

.bmfw-left {
    float: left;
    overflow: hidden;
    width: 240px;
    border: 1px solid #dfdfdf;
    border-top: 2px solid #4490d3;
}

.bmfw-nav-title {
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    text-align: center;
    color: #4490d3;
    background-color: #fff;
    font-size: 16px;
}
.bmfw-nav-title span{
    display: block;
    width: 120px;
    height: 100%;
    float: left;
    cursor: pointer;
    box-sizing: border-box;
}
.bmfw-nav-title .hover{background-color: #4490d3;color: #fff;}
.bmfw-nav-title span:first-child{border-right: 1px solid #ebebeb;}
.bmfw-nav-title b {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 16px;
    position: relative;
    top: 4px;
}

.bmfw-nav-con li {
    display: block;
    float: left;
}

.bmfwNavConH span {
    display: block;
    width: 40px;
    height: 30px;
    margin: 0 auto 2px;
    background: url(./img/sprit.png) no-repeat;
}

.bmfwNavConH:hover span,.bmfwNavConHH span {
    background: url(./img/sprit2.png) no-repeat;
}

.bmfwNavConH a:hover,.vchangecolor {
    color: #4490d3;
}

.bmfw-nav-con li a .k2 {
    background-position: -40px 0;
}

.bmfw-nav-con li a .k3 {
    background-position: 0px -30px;
}

.bmfw-nav-con li a .k4 {
    background-position: -40px -30px;
}

.bmfw-nav-con li a .k5 {
    background-position: 0px -60px;
}

.bmfw-nav-con li a .k6 {
    background-position: -40px -60px;
}

.bmfw-nav-con li a .k7 {
    background-position: 0px -90px;
}

.bmfw-nav-con li a .k8 {
    background-position: -40px -90px;
}

.bmfw-nav-con li a .k9 {
    background-position: 0 -120px;
}

.bmfw-nav-con li a .k10 {
    background-position: -40px -120px;
}

.bmfw-nav-con li a .k11 {
    background-position: 0 -150px;
}

.bmfw-nav-con li a .k12 {
    background-position: -40px -150px;
}

.bmfw-nav-con li a .k13 {
    background-position: 0 -180px;
}

.bmfw-nav-con li a .k14 {
    background-position: -40px -180px;
}

.bmfw-nav-con li a .k15 {
    background-position: 0 -210px;
}

.bmfw-nav-con li a .k16 {
    background-position: -40px -210px;
}

.bmfw-nav-con li a .k17 {
    background-position: 0 -240px;
}

.bmfw-nav-con li a .k18 {
    background-position: -40px -240px;
}

.bmfw-nav-con {
    width: 242px;
    margin-right: -2px;
}

.bmfw-nav-con a {
    width: 120px;
    height: 60px;
    text-align: center;
    line-height: 14px;
    display: block;
    border-bottom: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    font-size: 12px;
    padding-top: 5px;
}
.bmfw-nav-con li:first-child a,.bmfw-nav-con li:nth-child(2) a{
   border-top: 1px solid #ebebeb;
}
.bmfw-right {
    padding-left: 240px;
}

.bmfw-right .frbs-list-detail {
    margin-top: 0;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #ebebeb;
}

.frbs-list-detail-h {
    display: block;
}

.bmfw-list-con {
    margin-top: 8px;
    overflow: hidden;
    padding-top: 10px;
    border-top: 1px dotted #ebebeb;
}

.bmfw-list-con li {
    display: block;
    float: left;
    padding: 4px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
    border: 1px solid #5babf0;
    color: #5babf0;
}

.bmfw-list-con li:hover {
    background: #5babf0;
    color: #fff;
}

.frbs-right-title {
    margin-left: 20px;
    border-bottom: 2px solid #e2e4ea;
    position: relative;
}

.frbs-right-title h2 {
    border-left: 4px solid #4d8ed9;
    padding: 0 10px;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: #4d8ed9;
}

.frbs-right-title p {
    position: absolute;
    right: 10px;
    top: 1px;
    font-size: 12px;
}

.frbs-list {
    margin-left: 20px;
}

.frbs-list-detail {
    border: 1px solid #ebebeb;
    margin-top: 15px;
    padding: 10px 0 10px 10px;
}

.frbs-list-detail-h {
    padding: 10px 0 0 10px;
}

.frbs-list-title {
    padding: 0 20px;
    font-size: 18px;
    position: relative;
    color: #5babf0;
}

.frbs-list-title span {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 0;
}

.frbs-list-detail-h .frbs-list-title span {
}

.frbs-list-detail-h .frbs-list-con {
    display: block;
}

.frbs-list-con {
    display: none;
    padding-top: 8px;
}

.frbs-list-con li {
    display: block;
    border-top: 1px solid #ebebeb;
    padding: 4px 0 4px 30px;
}

.frbs-list-con p {
    line-height: 24px;
}

.frbs-list-btngroup {
    font-size: 0;
    padding: 4px 0;
    height: 22px;
}

.frbs-list-btngroup a {
    display: inline-block;
    font-size: 14px;
    padding: 0px 8px;
    border: 1px solid #4d8ed9;
    border-radius: 3px;
    color: #4d8ed9;
    margin-right: 5px;
}
</style>