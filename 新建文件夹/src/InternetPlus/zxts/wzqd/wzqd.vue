/* 五张清单
   马日
   tel：13478470501
   qq：995401608
   2017年8月22日
*/
<template>
<div class="wzqd_container_left">
    <div class="zcdt__l__box">
        <h2 class="zcdt__zcfw">市民心声</h2>
        <ul class="zcdt__zcfw__list">
            <li :class="['zcdt__zcfw__li',{'zcdt--active':item.isSelected}]" v-for="item in items" :key="item.UUID">
                <a :href="item.LINK">
                    <span :class="[item.CLASS]" class="zcdt__zcfw__list__span"></span>
                    {{item.TEXT}}
                </a>
            </li>
        </ul>
    </div>
</div> 
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props:{
        items: {
            type: Array,
            default(){
                return []
            }
        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    components: {
        
    }
}
</script>

<style scoped>
/*内容区域*/ 
.zcdt__l__box{ width: 200px;padding:10px 18px; margin-bottom:20px; border:1px solid #ddd;}
.zcdt__l__box h2{ height:44px; line-height:44px; background:url(./img/title-bg1.png) no-repeat 5px; padding-left:48px; color:#fff; font-size:18px; font-weight:bold; border-bottom:5px solid #3d96e6; color:#3d96e6; font-weight:bold;}
.zcdt__zcfw{ background-position:2px -46px;}
.zcdt__zcfw__list{ margin-top:10px;}
.zcdt__zcfw__list span{
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: text-top;
}
.zcdt__zcfw__li:hover .container_left_nav_logo1,.zcdt__zcfw__list .zcdt--active .container_left_nav_logo1{
    background:url(./img/在线咨询2.png) no-repeat;    
}
.zcdt__zcfw__li:hover .container_left_nav_logo2,.zcdt__zcfw__list .zcdt--active .container_left_nav_logo2{
    background:url(./img/投诉举报2.png) no-repeat;    
}
.zcdt__zcfw__li:hover .container_left_nav_logo3,.zcdt__zcfw__list .zcdt--active .container_left_nav_logo3{
    background:url(./img/意见反馈2.png) no-repeat;        
}
.zcdt__zcfw__li:hover .container_left_nav_logo4,.zcdt__zcfw__list .zcdt--active .container_left_nav_logo4{
    background:url(./img/在线评价2.png) no-repeat;        
}
.zcdt__zcfw__li:hover .container_left_nav_logo5,.zcdt__zcfw__list .zcdt--active .container_left_nav_logo5{
    background:url(./img/常见问题2.png) no-repeat;        
}
.zcdt__zcfw__li{ padding-left: 10px;height:52px; border-bottom:1px solid #ddd;}
.zcdt__zcfw__li.zcdt--active,.zcdt__zcfw__li:hover{ color:#fa791e}
.zcdt__zcfw__li:last-child{ border:none}
.zcdt__zcfw__li a{
    line-height:52px; 
    height:52px; 
    display:block;
    font-size:18px;    
}
.zcdt__zcfw__li .container_left_nav_logo1{ 
    width: 25px; 
    height:25px; 
    display:inline-block; 
    background:url(./img/在线咨询1.png) no-repeat;
    font-size:18px;
}
.zcdt__zcfw__li .container_left_nav_logo2{ 
    width: 25px;     
    height:25px; 
    display:inline-block; 
    background:url(./img/投诉举报1.png) no-repeat;
    font-size:18px;
}
.zcdt__zcfw__li .container_left_nav_logo3{ 
    width: 25px;     
    height:25px; 
    display:inline-block; 
    background:url(./img/意见反馈1.png) no-repeat;
    font-size:18px;
}
.zcdt__zcfw__li .container_left_nav_logo4{ 
    height:25px; 
    width: 25px;     
    display:inline-block; 
    background:url(./img/在线评价1.png) no-repeat;
    font-size:18px;
}
.zcdt__zcfw__li .container_left_nav_logo5{ 
    width: 25px; 
    height:25px; 
    display:inline-block;
    background:url(./img/常见问题1.png) no-repeat;
    font-size:18px;
}
.wzqd_container_left_tittle{
	width:254px;
	height:50px;
}
.container_left_tittle_h1{
	width:28px;
	height:28px;
	background:url("./img/title-bg1.png") no-repeat;
	margin:13px 7px 0 0;
	float:left;
}
.wzqd_container_left_nav{
	width:254px;
	height:auto;
}
.wzqd_container_left_nav li{
	width:254px;
	height:84px;
	/* background:url("./img/left-nav-bg1.png") no-repeat; */
	margin:10px 0;
}
.wzqd_container_left_nav li:hover{
	cursor:pointer;
}
.wzqd_container_left_nav li h1{
	width:43px;
	height:43px;
	float:left;
	margin:20px;	
}
.container_left_nav_logo1{
	background:url("./img/icon.png") no-repeat;
    background-position:0 -128px;
}
.container_left_nav_logo2{
	background:url("./img/icon.png") no-repeat;
    background-position:0 -195px;
}
.container_left_nav_logo3{
	background:url("./img/icon.png") no-repeat;
    background-position:0 -256px;
}
.container_left_nav_logo4{
	background:url("./img/icon.png") no-repeat;
    background-position:0 -322px;
}
.container_left_nav_logo5{
	background:url("./img/icon.png") no-repeat;
    background-position:0 -322px;
}
.wzqd_container_left_nav li span{
	font-family:"Microsoft YaHei";
	font-size:20px;
	font-weight:bold;
	color:#ffffff;
	/* display:block; */
	width:130px;
	float:left;
}
.wzqd_container_left_nav_text1{
	line-height:84px;
}
.wzqd_container_left_nav_text2{
	margin-top:15px;
	line-height:25px;
}
.wzqd_container_left_nav .selected{
	background:url("./img/left-nav-bg2.png") no-repeat;
}

/*版块标题共用字体样式*/
.wzqd_container_tittle{
	font-family:"Microsoft YaHei";
	font-size:20px;
	font-weight:bold;
	color:#010101;
	line-height:50px;
}
</style>