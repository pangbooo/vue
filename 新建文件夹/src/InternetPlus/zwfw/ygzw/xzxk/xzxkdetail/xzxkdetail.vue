/*  行政许可清单详情
	马日
	tel：13478470501
	qq：995401608
	2017年8月17日
*/
<template>
<div>
    <vheader></vheader>
    <navbar></navbar> 
    <div class="qddetail" id="qddetail">
		<div class="qddetail__container clr">
			<div class="qddetail_location clr">
				<breadcrumb :page="page" :backbutton="true"></breadcrumb>
			</div>
		</div>
        <div class="qddetail__menu fl">
            <wzqd :struct="wzqdstruct" :items="wzqditems" v-on:changeSelect="changeSelect" @returnSelect="returnSelect"></wzqd>
        </div>
        <div class="qddetail_container">
        <div class="form-table-con">
            <div class="form-title">
                <span>{{content.TITLE}}</span>
                <div class="nav-fun" v-show="anniuShow">
                    <span><a href="javascript:void(0)">在线办理</a></span>
                    <span><a href="javascript:void(0)">查看评价</a></span>
                    <span><a href="javascript:void(0)">我要咨询</a></span>
                    <span><a href="javascript:void(0)">我要收藏</a></span>
                </div>
            </div>
            <form action="" class="form">
                <table class="form-table" border="1">
                    <tbody><tr>
                        <td class="form-text"><div>职权编码</div></td>
                        <td class="form-value">{{content.ZQBM}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>职权类型</div></td>
                        <td class="form-value">{{content.ZQLX}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div class="row-2">职权名称</div></td>
                        <td>
                            <div class="sub">
                                <div class="sub-text">总项</div>
                                <div class="form-value sub-value">{{content.ZX}}</div>
                            </div>
                            <div class="sub">
                                <div class="sub-text">子项</div>
                                <div class="form-value sub-value">{{content.ZiX}}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>责任主体</div></td>
                        <td class="form-value">{{content.ZRZT}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>实施主体</div></td>
                        <td class="form-value">{{content.SSZT}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>办理地点</div></td>
                        <td class="form-value">{{content.BLDD}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>法定期限</div></td>
                        <td class="form-value">{{content.FDQX}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>承诺期限</div></td>
                        <td class="form-value">{{content.CNQX}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>联系电话</div></td>
                        <td class="form-value">{{content.LXDH}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>监督电话</div></td>
                        <td class="form-value">{{content.JDDH}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>问责依据</div></td>
                        <td class="form-value">{{content.WZYJ}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>责任事项</div></td>
                        <td class="form-value">{{content.ZRSX}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>备注</div></td>
                        <td class="form-value">{{content.BZ}}</td>
                    </tr>
                </tbody></table>
            </form>
        </div>

        <div class="tab-con">
            <div class="tab-nav">
                <span @click="changeTabshow1()"><a class="nav-btn btn-jbxx" :class="{ 'active' : tabshow1 }" href="javascript:">基本信息</a></span>
                <span @click="changeTabshow2()"><a class="nav-btn btn-xsyj" :class="{ 'active' : tabshow2 }" href="javascript:">行使依据</a></span>
                <span @click="changeTabshow3()"><a class="nav-btn btn-qllct" :class="{ 'active' : tabshow3 }" href="javascript:">权力流程图</a></span>
                <span @click="changeTabshow4()"><a class="nav-btn btn-bgxz" :class="{ 'active' : tabshow4 }" href="javascript:">表格下载</a></span>
                <span @click="changeTabshow5()"><a class="nav-btn btn-sqcl" :class="{ 'active' : tabshow5 }" href="javascript:">申请材料</a></span>
            </div>

            <div class="tab tab-jbxx" v-show="tabshow1">
                <table class="form-table" border="1">
                    <tbody><tr>
                        <td class="form-text"><div id="sltj">受理条件</div></td>
                        <td class="form-value" v-html="jbxx.SLTJ"></td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>是否收费</div></td>
                        <td class="form-value">{{jbxx.SFSF}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>收费依据</div></td>
                        <td class="form-value">{{jbxx.SFYJ}}</td>
                    </tr>
                    <tr>
                        <td class="form-text"><div>收费标准</div></td>
                        <td class="form-value">{{jbxx.SFBZ}}</td>
                    </tr>
                </tbody></table>
            </div>
            <div class="tab tab-xsyj" v-show="tabshow2" v-html="xsyj.CONTENT"></div>
            <div class="tab tab-qllct" v-show="tabshow3">
                <img :src="qllct.SRC" alt="图片加载失败">
            </div>
            <div class="tab tab-bgxz" v-show="tabshow4">
                <a v-for="bgxz in bgxzs" :key="bgxz.UUID" :href="'javascript:void(0)?UUID='+bgxz.UUID">{{bgxz.TITLE}}</a>
            </div>
            <div class="tab tab-sqcl" v-show="tabshow5">
                <table class="form-table">
                    <tbody>
                        <tr>
                            <td class="form-text">
                                <div>序号</div>
                            </td>
                            <td class="form-value" id="clsm">材料说明</td>
                        </tr>
                        <tr v-for="(sqcl,index) in sqcls" :key="sqcl.UUID">
                            <td class="form-text">
                                <div>{{index+1}}</div>
                            </td>
                            <td class="form-value">{{sqcl.CONTENT}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

	</div>
    <vfooter></vfooter>
</div>
</template>

<script>
import vheader from '@/InternetPlus/common/header/header.vue'
import navbar from '@/InternetPlus/common/navbar/navbar.vue'
import breadcrumb from '@/components/breadcrumb/breadcrumb.vue'
import vfooter from '@/InternetPlus/common/footer/footer.vue'

import wzqd from '@/InternetPlus/zwfw/ygzw/wzqd/wzqd.vue';

import fwzqdstruct from '@/services/InternetPlus/zwfw/ygzw/wzqdstruct.js';
import fwzqditems from '@/services/InternetPlus/zwfw/ygzw/wzqditems.js';
import getContent from '@/services/InternetPlus/zwfw/ygzw/xzxk/getContent.js';
import getJbxx from '@/services/InternetPlus/zwfw/ygzw/xzxk/getJbxx.js';
import getXsyj from '@/services/InternetPlus/zwfw/ygzw/xzxk/getXsyj.js';
import getQllct from '@/services/InternetPlus/zwfw/ygzw/xzxk/getQllct.js';
import getBgxz from '@/services/InternetPlus/zwfw/ygzw/xzxk/getBgxz.js';
import getSqcl from '@/services/InternetPlus/zwfw/ygzw/xzxk/getSqcl.js';

export default {
    mounted() {
      
    },
    data() {
        return {
            page: 'xzxkdetail',
            wzqdstruct:{},
            wzqditems:[],
            content:{},
            jbxx:{},
            xsyj:{},
            qllct:{},
            bgxzs:[],
            sqcls:[],
            tempuuid: '',
            anniuShow: false,
            tabshow1: true,
            tabshow2: false,
            tabshow3: false,
            tabshow4: false,
            tabshow5: false
        }
    },
    components: {
        vheader,vfooter,navbar,breadcrumb,wzqd
    },
    created() {
        this.getTempuuid();
        this.getwzqdstruct();
        this.getwzqditems();
    },
    methods: {
        getTempuuid(){
            if(window.location.search.indexOf('?') > -1){
                this.tempuuid = window.location.search.substring(6);
                this.getContent();
                this.getJbxx();
                this.getXsyj();
                this.getQllct();
                this.getBgxz();
                this.getSqcl();
            }else{
                this.$message.error('数据异常，请联系管理员！');
            }
        },
        changeTabshow1(){
            this.tabshow1 = true;
            this.tabshow2 = false;
            this.tabshow3 = false;
            this.tabshow4 = false;
            this.tabshow5 = false;            
        },
        changeTabshow2(){
            this.tabshow1 = false;
            this.tabshow2 = true;
            this.tabshow3 = false;
            this.tabshow4 = false;
            this.tabshow5 = false;            
        },
        changeTabshow3(){
            this.tabshow1 = false;
            this.tabshow2 = false;
            this.tabshow3 = true;
            this.tabshow4 = false;
            this.tabshow5 = false;            
        },
        changeTabshow4(){
            this.tabshow1 = false;
            this.tabshow2 = false;
            this.tabshow3 = false;
            this.tabshow4 = true;
            this.tabshow5 = false;            
        },
        changeTabshow5(){
            this.tabshow1 = false;
            this.tabshow2 = false;
            this.tabshow3 = false;
            this.tabshow4 = false;
            this.tabshow5 = true;            
        },
        getwzqdstruct(){
            let params = {};
            fwzqdstruct(params).then(res => {
                if(res.status === 'success'){
                    this.wzqdstruct = res.result;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        getwzqditems(){
            let params = {};
            fwzqditems(params).then(res => {
                if(res.status === 'success'){
                    this.wzqditems = res.resultList;                  
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        changeSelect(val){
            for(let i=0;i<this.wzqditems.length;i++){
                if(val.UUID === this.wzqditems[i].UUID){
                    this.wzqditems[i].isSelected = true;
                }else{
                    this.wzqditems[i].isSelected = false;            
                }
            }
        },
        returnSelect(val){
            for(let i=0;i<this.wzqditems.length;i++){
                this.wzqditems[i].isSelected = false;            
            }
        },
        getContent(){
            let params = { uuid: this.tempuuid };
            getContent(params).then(res => {
                if(res.status === 'success'){
                    this.content = res.result;                  
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        getJbxx(){
            let params = { puuid: this.tempuuid };
            getJbxx(params).then(res => {
                if(res.status === 'success'){
                    this.jbxx = res.result;                  
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        getXsyj(){
            let params = { puuid: this.tempuuid };
            getXsyj(params).then(res => {
                if(res.status === 'success'){
                    this.xsyj = res.result;                  
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        getQllct(){
            let params = { puuid: this.tempuuid };
            getQllct(params).then(res => {
                if(res.status === 'success'){
                    this.qllct = res.result;                  
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        getBgxz(){
            let params = { puuid: this.tempuuid };
            getBgxz(params).then(res => {
                if(res.status === 'success'){
                    this.bgxzs = res.resultList;                  
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        getSqcl(){
            let params = { puuid: this.tempuuid };
            getSqcl(params).then(res => {
                if(res.status === 'success'){
                    this.sqcls = res.resultList;                  
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        }
    }
}
</script>

<style scoped>

.qddetail{
    width: 1250px;
    margin: 0 auto;
    overflow: auto;
}
.qddetail__container{
	position:relative;
	width:100%;
    height: auto;
	background:#FFFFFF;
	margin:0 auto 20px auto;
}
.qddetail_location{
	width:100%;
	height:45px;
	line-height:45px;
    display: inline-block;
}
.qddetail_return{
    background: url('./img/return.png') no-repeat;
	width: 85px;
	height: 30px;
	float: right;
	display: inline-block;
	margin-top: 25px;
    cursor: pointer;
}
.qddetail__menu{ width:20%;}
.qddetail__menu__title{padding-left:40px;height:27px; line-height:27px; background:url(./img/icon.png) 0 -279px no-repeat; font-size:20px; }

.qddetail__menu label{ vertical-align:middle}
.qddetail_container {
    width: 70%;
    margin: 0 auto;
    font-family: "microsoft yahei";
    float: right;
    border: 1px solid #e8e8e8;
    padding: 0 30px;
}
.qddetail_container::after{
    display: block;
    content: '';
    clear: both;
}


.qddetail_container .form-table-con{
    width: 100%;
    margin:10px auto 0;

}
.qddetail_container .tab-con{
    width: 100%;
    margin: 10px auto 0;
}
/*======================================================*/
.form-table-con .form-title{
    width: 100%;
    height: 70px;
    line-height: 70px;
    color: #3a8ad1;
    font-size: 24px;
    position: relative;
}
.form-table-con .form-title .nav-fun{
    position: absolute;
    top: 5px;
    right: 20px;
}
.form-table-con .form-title a{
    width: 75px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    padding: 5px 10px;
    color: #ffffff;
    font-size: 14px;
    background: #3a8ad1;
    line-height: 20px;
    border-radius: 4px;
}
.form-title a:hover{
    opacity: .8;
}
.form-table-con .form{
    width: 100%;
}
.form table {
    width: 100%;
    border: 1px solid #f2f2f2;
    border-collapse: collapse;
    color: #666;
    font-size: 12px;
}

.form-table .form-text{
    width: 15%;
    padding: 1px;
    vertical-align: middle;
}
.form-text>div{
    text-align: center;
    background: #eef5fc;
    height: 30px;
    line-height: 30px;
}
.form-text .row-2{
    height: 65px;
    line-height: 65px;
}
.form-table .form-value{
    background: #fbfbfb;
    vertical-align: middle;
    width: 84%;
    /* text-indent: 2em; */
    padding-left: 20px;
}
.form-table .sub{
    width: 100%;
    height: 30px;
    line-height: 30px;
}
.form-table .sub::after{
    content: '';
    display: block;
    clear: both;
}
.sub  div.sub-text{
    border: 1px solid #fafafb;
    background: #ffffff;
    width: 10%;
    text-align: center;
    display: inline-block;
}
.sub  div.sub-value{
    border-collapse: collapse;
    background: #ffffff;
    display: inline-block;    
}
.form-table .form-input{
    box-sizing: border-box;
    border:none;
    height:30px;
    line-height: 30px;
    width: 100%;
    font-size: 12px;
    color: #666;
    text-indent: 0.5em;
    vertical-align: middle;
}
/*======================================================*/

.tab-con .tab-nav{
    height: 42px;
    width: 100%;
    border-bottom:1px solid #ebebeb;
}
.tab-con .tab{
    margin: 20px 0 40px;
    color: #555;
    font-size: 12px;
    letter-spacing: 1px;

}
.tab-nav span:first-child{
    margin-left: 20px;
}
.tab-nav span{
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
}
.tab-nav .nav-btn{
    display: inline-block;
    text-decoration: none;
    text-align: center;
    color: #555;
    width: 100px;
    height: 40px;
    line-height: 40px;
}
.nav-btn:hover{
    color: #4794d9;
}

.active{
    border-top:2px solid #4794d9;
    border-left:1px solid #ebebeb;
    border-right:1px solid #ebebeb;
    border-bottom: 1px solid #ffffff;
    background: #FFFFFF;
    color: #4794d9;
}
#sltj{
    height: 56px;
    line-height: 56px;
}
#clsm{
    text-align: center;
}

.container_left{
  width:254px;
  height:auto;
  float:left;
}
.container_left_tittle{
  width:254px;
  height:50px;
}
.container_left_tittle h1{
  width:28px;
  height:28px;
  background:url("./img/title-bg1.png") no-repeat;
  margin:13px 7px 0 0;
  float:left;
}
.container_left_nav{
  width:254px;
  height:auto;
}
.container_left_nav li{
  width:254px;
  height:84px;
  background:url("./img/left-nav-bg1.png") no-repeat;
  margin:10px 0;
}
.container_left_nav li:hover{
  cursor:pointer;
}
.container_left_nav li h1{
  width:43px;
  height:43px;
  float:left;
  margin:20px;  
}
.container_left_nav_logo1{
  background:url("./img/leftnav-logo1.png") no-repeat;
}
.container_left_nav_logo2{
  background:url("./img/leftnav-logo2.png") no-repeat;
}
.container_left_nav_logo3{
  background:url("./img/leftnav-logo3.png") no-repeat;
}
.container_left_nav_logo4{
  background:url("./img/leftnav-logo4.png") no-repeat;
}
.container_left_nav_logo5{
  background:url("./img/leftnav-logo5.png") no-repeat;
}
.container_left_nav li span{
  font-family:"Microsoft YaHei";
  font-size:20px;
  font-weight:bold;
  color:#ffffff;
  display:block;
  width:130px;
  float:left;
}
.container_left_nav_text1{
  line-height:84px;
}
.container_left_nav_text2{
  margin-top:15px;
  line-height:25px;
}
.container_left_nav .selected{
  background:url("./img/left-nav-bg2.png") no-repeat;
}
.container_left_nav .selected2{
  background:url("./img/left-nav-bg2.png") no-repeat;
}
</style>