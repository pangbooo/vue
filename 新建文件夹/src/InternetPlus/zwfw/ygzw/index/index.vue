/*
 * @文档描述: 阳光政务-index
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-29 08:49:21 
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-10-16 14:04:33
 */

<template>
  <div class="sy-ygzw"> 
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <!-- 内容区域 -->
    <div class = "container clr">
      <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
      <!-- 左侧导航 -->
      <!-- <div class="container_left">
        <wzqd :struct="wzqdstruct" :items="wzqditems" v-on:changeSelect="changeSelect" @returnSelect="returnSelect"></wzqd>
      </div> -->
      <!-- 左侧导航结束 -->
      <!-- 右侧区域 -->
      <div class="container_right">
        <!-- 按类别分类 -->
        <div class="container_right_groupByType">
          <div class="container_right_groupByType_tittle clr">
            <h1 class="container_right_groupByType_tittle_h1"></h1>
            <span class="container_tittle">按类别分类</span>
          </div>
          <div class="container_right_groupByType_content">
            <ul class="clr">
              <li v-for="lb in leibiecontent" :key="lb.UUID" @click="toXzqllbBylb(lb.TEXT)" :class="lb.CLASS">{{ lb.TEXT }}</li>
            </ul>
          </div>
        </div>
        <!-- 按类别分类结束 -->
        <!-- 按部门分类 -->
        <div class="container_right_groupByDept">
          <div class="container_right_groupByDept_tittle clr">
            <h1></h1>
            <span class="container_tittle">按部门分类</span>
          </div>
          <div class="container_right_groupByDept_content">
            <div class="container_right_groupByDept_content_top">
              <ul class="clr fenleiByBumen">
                <li v-for="(item,index) in zfbmitems" :key="item.DWMC" :class="{ 'fenleiByBumen__paddingright--none': (index+1)%4 === 0 }" @click="toXzqllbBybm(item.DWMC)">{{item.DWMC}}</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 按部门分类结束 -->
      </div>
      <!-- 右侧区域结束 -->
      
    </div>
	  <!-- 内容区域结束 -->
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
  </div>
</template>

<script>
  import header from '@/InternetPlus/common/header/header.vue';
  import navbar from '@/InternetPlus/common/navbar/navbar.vue';
  import footer from '@/InternetPlus/common/footer/footer.vue';
  import wzqd from '@/InternetPlus/zwfw/ygzw/wzqd/wzqd.vue';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';

import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft.js';
  // import fleibiecontent from '@/services/InternetPlus/zwfw/ygzw/leibiecontent.js';
  // import fszfbgs from '@/services/InternetPlus/zwfw/ygzw/szfbgs.js';
  // import fszfgzbm from '@/services/InternetPlus/zwfw/ygzw/szfgzbm.js';
  // import fwzqditems from '@/services/InternetPlus/zwfw/ygzw/wzqditems.js';
  // import fwzqdstruct from '@/services/InternetPlus/zwfw/ygzw/wzqdstruct.js';
  // import fzszdw from '@/services/InternetPlus/zwfw/ygzw/zszdw.js';

  export default {
    data(){
      return {
        page: 'ygzw_qlqd',
        params: [],
        wzqdstruct:{ "UUID":"1","TITLE":"五张清单","CLASS":"container_left_tittle_h1" },
        wzqditems:[
          {"UUID":"1","TEXT":"权力清单","CLASS":"container_left_nav_logo1","isSelected":false,"LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"2","TEXT":"责任清单","CLASS":"container_left_nav_logo2","isSelected":false,"LINK":"/zwfw/ygzw/zrqdlb/index.html"},
          {"UUID":"3","TEXT":"企业资产负面清单","CLASS":"container_left_nav_logo3","isSelected":false,"LINK":"/zwfw/ygzw/fmqd/index.html"},
          {"UUID":"4","TEXT":"财务资金管理专项清单","CLASS":"container_left_nav_logo4","isSelected":false,"LINK":"/zwfw/ygzw/zxqd/bmys/index.html"},
          {"UUID":"5","TEXT":"公共服务清单","CLASS":"container_left_nav_logo5","isSelected":false,"LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"}
        ],
        leibiecontent:[
          {"UUID":"1","CLASS":"container_right_groupByType_content_xzxk","TEXT":"行政许可","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"2","CLASS":"container_right_groupByType_content_xzcf","TEXT":"行政处罚","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"3","CLASS":"container_right_groupByType_content_xzqz","TEXT":"行政强制","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"4","CLASS":"container_right_groupByType_content_xzzs","TEXT":"行政征收","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"5","CLASS":"container_right_groupByType_content_xzjf","TEXT":"行政给付","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"0","CLASS":"container_right_groupByType_content_xzjc","TEXT":"行政检查","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},          
          {"UUID":"7","CLASS":"container_right_groupByType_content_xzqr","TEXT":"行政确认","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"8","CLASS":"container_right_groupByType_content_xzjl","TEXT":"行政奖励","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
          {"UUID":"6","CLASS":"container_right_groupByType_content_xzcj","TEXT":"行政裁决","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},          
          {"UUID":"9","CLASS":"container_right_groupByType_content_qtql","TEXT":"其他权力","LINK":"/zwfw/ygzw/xzxk/xzxklb/index.html"},
        ],
        zfbmitems:[],
        bmmc: '',
        flmc: ''
        // szfgzbm:[],
        // zszdw:[]
      }
    },
    created() {
      this.getBmList();
        // this.getwzqdstruct();
        // this.getwzqditems();
        // // this.getleibiecontent();
        // this.getszfbgs();
        // this.getszfgzbm();
        // this.getzszdw();
    },
    methods: {
      getBmList(){
            xzqlqdlbleft().then(res => {
                if(res.status === 'success'){
                  // console.log(res.data);
                  this.zfbmitems = res.data;
                }else{
                  this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        toXzqllbBybm(val){
          this.bmmc = val;
          let tempurl = '/qlqd/xzqlqdlbygzw/index.html?BMMC=' + this.bmmc + '&FLMC=' + this.flmc;
          // console.log(encodeURI(tempurl));
          window.location.href = encodeURI(tempurl);
        },
        toXzqllbBylb(val){
          this.flmc = val;
          let tempurl = '/qlqd/xzqlqdlbygzw/index.html?BMMC=' + this.bmmc + '&FLMC=' + this.flmc;
          // console.log(encodeURI(tempurl));
          window.location.href = encodeURI(tempurl);
        },
      // getzszdw(){
      //   let params = {};
      //   fzszdw(params).then(res => {
      //     if(res.status === 'success'){
      //         this.zszdw = res.resultList;                  
      //     }else{
      //         this.$message.error('服务器异常，请联系管理员！');
      //     }
      //   }).catch(res => {
      //       this.$message.error('网络异常，请检查网络！');
      //   });
      // },
      // getszfgzbm(){
      //   let params = {};
      //   fszfgzbm(params).then(res => {
      //     if(res.status === 'success'){
      //         this.szfgzbm = res.resultList;                  
      //     }else{
      //         this.$message.error('服务器异常，请联系管理员！');
      //     }
      //   }).catch(res => {
      //       this.$message.error('网络异常，请检查网络！');
      //   });
      // },
      // getszfbgs(){
      //   let params = {};
      //   fszfbgs(params).then(res => {
      //     if(res.status === 'success'){
      //         this.szfbgs = res.resultList;                  
      //     }else{
      //         this.$message.error('服务器异常，请联系管理员！');
      //     }
      //   }).catch(res => {
      //       this.$message.error('网络异常，请检查网络！');
      //   });
      // },
      // getleibiecontent(){
      //   let params = {};
      //   fleibiecontent(params).then(res => {
      //     if(res.status === 'success'){
      //         this.leibiecontent = res.resultList;                  
      //     }else{
      //         this.$message.error('服务器异常，请联系管理员！');
      //     }
      //   }).catch(res => {
      //       this.$message.error('网络异常，请检查网络！');
      //   });
      // },
      // getwzqditems(){
      //   let params = {};
      //   fwzqditems(params).then(res => {
      //     if(res.status === 'success'){
      //         this.wzqditems = res.resultList;                  
      //     }else{
      //         this.$message.error('服务器异常，请联系管理员！');
      //     }
      //   }).catch(res => {
      //       this.$message.error('网络异常，请检查网络！');
      //   });
      // },
      // getwzqdstruct(){
      //   let params = {};
      //   fwzqdstruct(params).then(res => {
      //     if(res.status === 'success'){
      //         this.wzqdstruct = res.result;                  
      //     }else{
      //         this.$message.error('服务器异常，请联系管理员！');
      //     }
      //   }).catch(res => {
      //       this.$message.error('网络异常，请检查网络！');
      //   });
      // },
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
      }
    },
    mounted() {
      
    },
    components: {
      'idt-header':header,
      'idt-navbar':navbar,
      'idt-footer':footer,wzqd,
      'idt-floatbar': idtfloatbar,
      'idt-breadcrumb': idtbreadcrumb
    }
  }
</script>

<style >
  /*内容区域*/ 
.container{
	position:relative;
	width:1250px;
	/* min-height:1000px; */
	background:#FFFFFF;
	margin: 0 auto 20px auto;
}
/*左侧导航*/ 
.container_left{
	width:254px;
	height:auto;
	float:left;
}
/*右侧区域*/ 
.container_right{
	width:960px;
	height:auto;
	/* float:right; */
  margin: 0 auto;
  border: 1px solid #dfdfdf;
  padding: 0 30px;
}
/*按类别分类*/ 
.container_right_groupByType{
	width:960px;
	height:auto;
	/* margin-bottom:20px; */
}
.container_right_groupByType_tittle{
	width:960px;
	height:50px;
	border-bottom:5px solid #3c95e5;
}
.container_right_groupByType_tittle_h1{
	width:28px;
	height:28px;
	background:url("./img/title-bg2.png") no-repeat;
	margin:13px 7px 0 0;
	float:left;
}
.container_right_groupByType_content{
	width:960px;
	height:auto;
	/* margin-top:20px; */
}
.container_right_groupByType_content li{
	width:160px;
	height:66px;
	line-height:66px;
	font-family:"Microsoft YaHei";
	font-size:18px;
	font-weight:bold;
	color:#000000;
	box-sizing:border-box;
	-ms-box-sizing: border-box; 
	-moz-box-sizing: border-box;
	padding-left:73px;
	margin:10px 15px;
	border:1px solid #dedede;
	border-radius:1px;
	float:left;
}
.container_right_groupByType_content li:hover{
  box-shadow:0 0 8px 0 #ccc, 0 2px 4px 0 #ccc;
	cursor:pointer;
}
.container_right_groupByType_content_xzxk{
	background:url("./img/top_bg1.png");
}
.container_right_groupByType_content_xzcf{
	background:url("./img/top_bg2.png");
}
.container_right_groupByType_content_xzqz{
	background:url("./img/top_bg3.png");
}
.container_right_groupByType_content_xzzs{
	background:url("./img/top_bg4.png");
}
.container_right_groupByType_content_xzjf{
	background:url("./img/top_bg5.png");
}
.container_right_groupByType_content_xzcj{
	background:url("./img/top_bg6.png");
}
.container_right_groupByType_content_xzqr{
	background:url("./img/top_bg7.png");
}
.container_right_groupByType_content_xzjl{
	background:url("./img/top_bg8.png");
}
.container_right_groupByType_content_qtql{
	background:url("./img/top_bg9.png");
}
.container_right_groupByType_content_xzjc{
	background:url("./img/top_bg10.png");
}
/*按部门分类*/ 
.container_right_groupByDept{
	width:960px;
	height:auto;
}
.container_right_groupByDept_tittle{
	width:960px;
	height:50px;
	border-bottom:5px solid #3c95e5;
}
.container_right_groupByDept_tittle h1{
	width:28px;
	height:28px;
	background:url("./img/title-bg3.png") no-repeat;
	margin:13px 7px 0 0;
	float:left;
}
.container_right_groupByDept_content{
	width:960px;
	/* min-height:800px; */
	/* margin:30px 0; */
}
.container_right_groupByDept_content > div{
	margin:10px 0;
}
.container_right_groupByDept_content_top{
	width:960px;
	height:auto;
	/* border:1px solid #dfdfdf; */
}
.container_right_groupByDept_content_middle{
	width:960px;
	height:auto;
	border:1px solid #dfdfdf;
}
.container_right_groupByDept_content_bottom{
	width:960px;
	height:auto;
	border:1px solid #dfdfdf;
}
.container_right_groupByDept_content ul{
	margin-left:35px;
}
.container_right_groupByDept_content li {
	width:110px;
	line-height:35px;
  padding-right: 160px;
	font-family:"Microsoft YaHei";
	font-size:16px;
	color:#000000;
	list-style-image:url("./img/list-style.png");
	float:left;
}
.container_right_groupByDept_content h1{
	width:130px;
	height:30px;
	line-height:30px;
	font-family:"Microsoft YaHei";
	font-size:18px;
	font-weight:bold;
	color:#3c95e5;
	margin-top:-19px;
	margin-left:20px;
	text-align:center;
	background:#ffffff;
}
/*版块标题共用字体样式*/
.container_tittle{
	font-family:"Microsoft YaHei";
	font-size:20px;
	font-weight:bold;
	color:#010101;
	line-height:50px;
}
.fenleiByBumen li{
  cursor: pointer;
}
.fenleiByBumen li:hover{
  color: #ff8e40;
}
.fenleiByBumen .fenleiByBumen__paddingright--none{
  padding-right: 0;
}
</style>