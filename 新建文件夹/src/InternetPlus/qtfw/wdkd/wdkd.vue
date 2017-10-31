/** 
 * 文档描述: 
 * 作者: 杨闯 
 * 创建时间: 2017-09-21 18:43:50 
 * 最后修改人: 杨闯 
 * 最后修改时间: 2017-09-21 18:43:50 
 */
<template>
<!-- 我的快递 -->
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="shfw__kdcx">
        <div class="shfw__kdcx__search">
            <span class="kdcx__search_icon"></span>
            <input class="kdcx__search_input" placeholder="输入您的快递单号,在800+快递中为您智能查询。" type="text" v-model="number" @keypress.enter="search()">
            <input class="kdcx__search__btn" type="button" value="立即查询" @click="search()">
        </div>
        <div class="shfw__kdcx__con">
            <h3>
                <span v-html="kdTitle" v-if="kdTitle!==''"></span>
                <span v-if="kdTitle==''">快递名称</span>
                <span class="line">|</span>
                <span class="icon icon--gw">官网</span>
                <span class="icon icon--tel">电话：<i>95544</i></span>
            </h3>
            <table cellspacing="0">
                <tbody>
                <tr v-if="kdTitle!==''">
                    <th class="time" width="20%" align="center">时间<i></i></th>
                    <th class="address" align="left">地点和跟踪进度</th>
                </tr>
                <tr v-for="(item,index) in wdkd" :key="index" :class="index===0?'active':''">
                    <td class="time" align="center">
                        <div>{{item.time}}</div>
                    </td>
                    <td class="address" align="left">
                        <i class="icon"></i>
                        <span>{{item.context}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <p class="kdcx__con__tip" v-if="kdTitle!==''">快递有问题？请先拨打<a href="javascript:;">快递公司电话</a>，若不能解决还可以拨打<a href="javascript:;">到国家邮政总局申诉</a>哦</p>
            <p class="kdcx__con__phone" v-if="kdTitle==''">快递有问题？请先拨打<a href="javascript:;">快递公司电话</a>，若不能解决还可以拨打<a href="javascript:;">到国家邮政总局申诉</a>哦</p>
        </div>
    </div>
    <idt-footer></idt-footer>
</div>
</template>
<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import getwdkd from '@/services/InternetPlus/qtfw/wdkd/wdkd';
export default{
    data() {
        return {
            page:'wdkd',
            wdkd:[],
            kdTitle:'',
            number:"",
        }
    },
    components:{
        'idt-header':idtheader,
        'idt-footer':idtfooter,
        'idt-navbar':idtnavbar,
    },
    created() {
        // this.getwdkd();
    },
    methods:{
        search(){
            if(this.number.replace(/(^\s*)|(\s*$)/g, "")==''||isNaN(this.number)){
                this.$message.error('快递公司参数异常：单号不存在或者已经过期');
            }else{
                this.getwdkd();
            }
        },
        getwdkd(){
            let params = {
                  num: this.number,
            };
            getwdkd(params).then(res=>{
                if(res.status === "success"){
                    if(res.data.message=='ok'){
                        this.$message.success('恭喜您查询成功');
                        this.kdTitle = res.data.comMap.COMNAME;
                        this.wdkd = res.data.data;
                    }else{
                        this.$message.error('快递公司参数异常：单号不存在或者已经过期');
                    }
                }else{
                    this.$message.error('快递公司参数异常：单号不存在或者已经过期');
                }
            })
        },
    }
}
</script>
<style scoped>
/* 我的快递样式 */
.center{width: 1160px;margin: 0px auto 25px;}
.center::after{content: '';display: block;clear:both;}
.shfw__kdcx{ width:100%;overflow:hidden; background:url(./img/bg.jpg) no-repeat;}   
.shfw__kdcx .shfw__kdcx__search{width:1250px; margin:20px auto; height:60px; background:#fff;}
.shfw__kdcx__search .kdcx__search_icon{ width:60px; height:60px; background:url(./img/icon.png) 20px -1075px; display:block; float:left;}
.shfw__kdcx__search .kdcx__search_input{ float:left; border:none; border-left:1px solid #d2d2d2; width:990px; padding-left:10px; height:60px; line-height:60px; color:#3f96e6; font-size:20px; box-shadow:inset 0 0 10px #eaeaea; }
.shfw__kdcx__search .kdcx__search__btn{ width:186px; height:60px; line-height:60px; background:url(./img/icon.png) 20px -1138px #ff6600; color:#fff; font-size:24px; padding-left:40px; cursor:pointer; float:right;border:none;}
.shfw__kdcx__con{ background:#fff; width:1250px; height:auto; overflow:hidden; margin:10px auto;}
.shfw__kdcx__con h3{height:53px; line-height:50px; background:url(./img/icon.png) 0 -1295px; color:#828282; padding-left:60px; font-size:14px;}
.shfw__kdcx__con h3 span{padding-left:20px; }
.shfw__kdcx__con h3 span.icon{margin:0 20px; background:url(./img/icon.png) no-repeat;}
.shfw__kdcx__con h3 span.icon--gw{ background-position:2px -1250px;}
.shfw__kdcx__con h3 span.icon--tel{ background-position:-50px -1250px;}
.shfw__kdcx__con h3 a.closed{width:17px; height:17px; float:right; display:block; margin:18px 24px 0 0; background:url(./img/icon.png) 0 -1214px;}
.shfw__kdcx__con table th td{ line-height:64px;}
.shfw__kdcx__con table th,.shfw__kdcx__con table td{ height:64px; vertical-align:middle}
.shfw__kdcx__con table{ width:100%;  color:#828282;}
.shfw__kdcx__con th{ color:#5a5a5a; font-size:16px;line-height:64px; font-weight:normal;}
.shfw__kdcx__con .time div{width:84px; padding:0 33px; text-align:center;}
.shfw__kdcx__con .address{ position:relative; padding-left:25px; width:500px;  height:64px; }
.shfw__kdcx__con td.address{border-left:1px solid #d2d2d2;} 
.shfw__kdcx__con table th.time i{width:15px; height:18px; display:inline-block; margin-left:10px; background:url(./img/icon.png) 0 -1369px;}
.shfw__kdcx__con table tr.active{ color:#ff7800}
.shfw__kdcx__con table td.address .icon{width:21px; height:21px; display:block; position:absolute; left:-8px; top:24px;  background:url(./img/icon.png) 0 -1477px no-repeat;}
.shfw__kdcx__con table tr.active td.address .icon{left:-11px;background-position:0 -1406px; height:45px; top:0;}
.shfw__kdcx__con table tr:last-child td.address .icon{ background-position:0 -1521px; height:45px; }
.shfw__kdcx__con .kdcx__con__tip{height:50px; line-height:50px; text-align:center; color:#828282;border-top:1px dashed #d2d2d2;}
.shfw__kdcx__con .kdcx__con__closed{border-top:1px solid #e2e2e2; height:42px;  text-align:center;}
.shfw__kdcx__con .kdcx__con__tip a{ color:#3278e6;}
.shfw__kdcx__con .kdcx__con__closed a{line-height:42px; color:#ff7800;}
.shfw__kdcx__con .kdcx__con__phone{height:50px; line-height:50px; text-align:center; color:#828282;border-top:1px dashed #d2d2d2;padding: 100px 0px;}
.shfw__kdcx__con .kdcx__con__phone a{ color:#3278e6;}
</style>