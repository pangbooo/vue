/*  内容检索详情页面
    孔祥超
    时间：2017年9月12日
*/
<template>
<div>
    <vheader></vheader>
    <vnavbar></vnavbar>
    <div class="searchdetail" id="searchdetail">
        <div class="searchdetail__header">
            <div class="searchdetail__breadcrumb">
                <vbreadcrumb :page="page" :backbutton="backbutton" :params="params"></vbreadcrumb>
            </div>
        </div>
        <div class="container">
			<div class="container_tittle clr">
				<h1></h1>
				<span>内容详情</span>
			</div>
			<div class="container_content">
				<v-detail :articledata="searchdetail"></v-detail>
			</div>
		</div>
        <div style="clear: both;"></div>
    </div>
    <vfooter></vfooter>
</div>
</template>

<script></script>
<script>
import vheader from '@/InternetPlus/common/header/header.vue';
import vnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import vbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import vfooter from '@/InternetPlus/common/footer/footer.vue';
import detail from '@/InternetPlus/zwfw/zwfw_detail/detail/detail';
import {getArticle} from '@/api/common.js';
import { tableIds } from '@/api/tableId';

export default{
	components:{
        vheader,vnavbar,vbreadcrumb,vfooter,
        'v-detail':detail
    },
    data() {
        return {
			page: 'searchdetail',
			backbutton: true,
            search: '',
            searchdetail:{},
            params:[],
            UUID:'',
            WZID:'',
            LMNUM: 1,
            tableid:'文章管理'
        }
    },
    created(){
        this.UUID = this.queryString("UUID");
        this.WZID = this.queryString("WZID");
        this.LMNUM = this.queryString("LMNUM");
        this.search = this.queryString("keyword");
    	this.getWZXX();
    	this.params = [
            { id: 'searchlist', val: 'LMNUM='+this.LMNUM+'&keyword='+this.search},
        ]
    },
    mounted(){
        
    },
    methods: {
        getWZXX(){
            if(location.search.indexOf('?') !== -1){
                let params = { 
                    uuid: this.WZID,
                    tableId : tableIds[this.tableid]
                };
                getArticle(params).then(res =>{
                    if(res.status === "success"){
                        this.searchdetail = res.data;
                    } else {
                        this.$message.error('服务器异常，请联系管理员！');
                    }
                }).catch(res => {
                    this.$message.error('网络连接异常，请检查网络！');
                });
            }else{
                this.$message.error('服务器异常，请联系管理员！');
            }
        },
		queryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			var r = decodeURI(window.location.search).substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
    }
}
</script>

<style scoped>
.searchdetail{
    width: 1250px;
    margin: 0 auto;
}

/*内容区域*/
.container{
	width:1250px;
	min-height:800px;
	margin: 0 auto;
}
.container_tittle{
	width:100%;
	height:40px;
	border-bottom:6px solid #3d96e8;
	line-height:40px;
}
.container_tittle h1{
	width:32px;
	height:32px;
	margin-right:10px;
	margin-top:3px;
	background:url("./img/title3.png");
	float:left;
}
.container_tittle span{
	font-family:"Microsoft YaHei";
	font-weight:bold;
	font-size:20px;
	color:#000000;
}
.container_content{
	width:100%;
	min-height:800px;
	border:1px solid #dddddd;
	border-top:none;
    margin-bottom: 10px;
}
.title{
	width:100%;
	height:95px;
	line-height:95px;
	text-align:center;
}
.title h1{
	font-family:"Microsoft YaHei";
	font-weight:bold;
	font-size:30px;
	color:#000000;
}
.info{
	width:870px;
	height:46px;
	line-height:46px;
	margin:0 auto;
	border-bottom:1px dashed #ff883e;
}
.info span{
	font-family:"Microsoft YaHei";
	font-size:16px;
	color:#333333;
}
.info .info__spanhead{
    color: #fa791e;
}
.info__spantime{
    margin-right: 30px;
}
.con{
	width:870px;
	height:auto;
	margin:20px auto 0 auto;
}
.con img{
	margin-bottom:20px;
}
.con__p{
	font-family:"Microsoft YaHei";
	font-size:16px;
	color:#333333;
	margin-bottom:20px;
	line-height:30px;
}
.info__bdshare{
    display: inline-block;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
</style>