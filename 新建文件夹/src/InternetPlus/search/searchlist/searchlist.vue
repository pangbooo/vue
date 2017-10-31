/*  关键字检索结果页面
    孔祥超
    时间：2017年9月12日
*/
<template>
<div>
    <vheader></vheader>
    <vnavbar></vnavbar>
    <div class="search" id="search">
        <div class="search__header">
            <div class="search__breadcrumb">
                <vbreadcrumb :page="page" :params="params" :backbutton="true"></vbreadcrumb>
            </div>
        </div>
        <div class="container_content">
			<div class="container_content_tittle clr">
				<h1></h1>
				<span>检索结果</span>
				<div class="container_content_tittle_search">
					
                    <el-input placeholder="请输入查询关键字" v-model="search" @keyup.enter.native="handleIconClick">
						<el-button slot="append" icon="search" @click="handleIconClick"></el-button>
					</el-input>
				</div>
			</div>
			<!-- 内容区域-列表 -->
			<div class="container_content_list" >
				<ul class="clr" v-if="total > 0">
					<li v-for="item in items" :key="item.UUID" >
						<div class="list__title">
							<i class="list__link__icon">■</i>
							<h1 class="list__link__title"><span class="list__link__title--1">所属栏目：【</span><span class="list__link__title--2" :title="item.NAME">{{ item.NAME }}</span><span class="list__link__title--3">】</span></h1>
							<a class="list__link" :title="item.WZBT" :href="encodeURI('/search/searchdetail/index.html?UUID=' + UUID + '&WZID=' + item.UUID + '&LMNUM=' + nowpage + '&keyword=' + search)" v-html="item.WZBT.replace(search,'<em>'+search+'</em>')"></a>
							<span class="list__time ">{{item.FBSJ ? new Date(item.FBSJ * 1).pattern('yyyy-MM-dd') : ''}}</span>
						</div>
						
					</li>
				</ul>
				<div v-else class="container_content_list--null"><p>很抱歉，没有找到和“<em>{{lastKey}}</em>”相匹配的结果。您可以尝试更换检索词，重新检索。</p></div>
			</div>
			<!-- 内容区域-列表结束 -->
			<!-- 页码选择 -->
			<div class="container_content_pageSelector">
				<el-pagination class="container__fanye" :total="total" :current-page="nowpage" :page-size="pagesize" @current-change="handleCurrentChange" layout="total,prev,pager,next"></el-pagination>
			</div>
			<!-- 页码选择结束 -->
		</div>
    </div>
    <vfooter></vfooter>
</div>
</template>

<script>
import vheader from '@/InternetPlus/common/header/header.vue';
import vnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import vbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import vfooter from '@/InternetPlus/common/footer/footer.vue';

import getDataList from '@/services/InternetPlus/search/getDataList';

import { lMIDS } from '@/api/lmManage';

export default{
	components:{
        vheader,vnavbar,vbreadcrumb,vfooter
    },
    data() {
        return {
            page: 'searchlist',
            nowpage: 1,
            pagesize: 10,
            total: 2,
			search: '',
			lastKey: '',
			zdbmxw:{
	      		TITLE:'',
	      		CONTENT:'',
	      		UUID:''
	      	},
            items: [],
            UUID:'',
	      	LMID:'',
	    	WZID:'',
	    	LMNUM:1,
	    	params:[],
        }
	},
	computed: {
		
	},
    created(){
		this.lastKey = this.search = this.queryString("keyword");
		this.LMNUM = this.queryString("LMNUM")
		if(this.LMNUM !== null){
			this.nowpage = this.LMNUM*1;
		}
        this.getData();
    },
    methods: {
		queryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			var r = decodeURI(window.location.search).substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
        handleIconClick(){
			if (!$.trim(this.search)) {
				this.$message.error('请输入搜索内容');
          		this.search = '';
			} else {
				this.lastKey = this.search;
        		this.getData();  
			}
        },
        handleCurrentChange(val){
			this.nowpage = val;
        	this.getData();			
		},
		getData(){
    		let params = {
    			searchKey: this.search,
    			nowPage:this.nowpage,
    			pageSize:this.pagesize
    		}
    		getDataList(params).then(res => {
				if (res.status === 'success') {
					this.items = res.data.DataList
    				this.total = res.data.totalRows;
				} else {
					this.$message.error('服务器异常，请联系管理员！');
				}
    		})
    	}
    }
}
</script>

<style scoped>
.search{
    width: 1250px;
    margin: 0 auto;
}
.container_content{
	width:1250px;
	min-height:800px;
}

.container_content_tittle{
	width:1250px;
	height:40px;
	border-bottom:6px solid #3d96e8;
	line-height:40px;
}
.container_content_tittle h1{
	width:32px;
	height:32px;
	margin-right:10px;
	margin-top:3px;
	background:url("./img/title3.png");
	float:left;
}
.container_content_tittle > span{
	font-family:"Microsoft YaHei";
	font-weight:bold;
	font-size:20px;
	color:#000000;
}
.container_content_tittle_search{
	width:342px;
	height:41px;
	float:right;
}
/*内容区域-列表*/
.container_content_list {
	margin-top: 10px;
	width:1248px;
	border:1px dashed #00a0e9;
	border-radius:2px;
}
.container_content_list li{
	font-family:"Microsoft YaHei";
	line-height:35px;
	width: 90%;
	margin: 10px auto;
	border-bottom: 1px dashed #c3dbe8;
}
.container_content_list ul{
	width: 100%;
	counter-reset:count;
	margin:25px auto;
}
.list__title {
	width: 100%;
	height: 40px;
}
.container_content_list .list__link__icon{
	float: left;
	display: block;
	color:#3d96e8;
	margin-right:20px;
}

.container_content_list li a:hover {
	color: #00a0e9;
}
.container_content_list li a:visited {
	color: #551a8b;
}
.container_content_list--null {
	height: 260px;
	text-align: center;
	padding-top: 100px;
}
.container_content_list--null p {
	font-size: 16px;
}
.list__time {
	display: block;
	float: right;
	font-size: 14px;
	color: #999;
	width: 150px;
	text-align: right;
	padding-right: 10px;
}
.list__link {
	display: block;
	float: left;
	width: 740px;
	font-family:"Microsoft YaHei";
	font-size:16px;
	color:#000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.list__link__title {
	float: left;
	width: 180px;
	font-size: 14px;
	text-align: left;
}
.list__link__title--1 {
	float: left;
}
.list__link__title--2 {
	float: left;
	width: 70px;
	text-align: center;
	color: #0066cc;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.list__link__title--3 {
	float: left;
}

/*页码选择*/ 
.container_content_pageSelector{
	margin:15px auto;
}
.container__fanye{
	text-align: right;
}
</style>
<style>
.container_content em {
	color: #c00;
}
</style>
