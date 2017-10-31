/* 五张清单
   马日
   tel：13478470501
   qq：995401608
   2017年8月22日
*/
<template>
<div class="wzqd_container_left">
    <div class="wzqd_container_left_tittle clr">
        <h1 :class="[struct.CLASS]"></h1>
        <span class="wzqd_container_tittle">{{ struct.TITLE }}</span>
    </div>
    <div class="wzqd_container_left_nav">
        <ul class="clr">
            <li v-for="item in items" :key="item.UUID" :class="{ 'selected':item.isSelected }" @mouseover="changeSelect(item)" @mouseout="returnSelect(item)">
                <a :href="item.LINK" >
                    <h1 :class="item.CLASS"></h1>
                    <span :class="item.TEXT.length > 6 ? 'wzqd_container_left_nav_text2':'wzqd_container_left_nav_text1'">{{ item.TEXT }}</span>
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
        struct:{
            default: {},
            type: Object
        },
        items:{
            default: [],
            type: Array 
        }
    },
    methods: {
        changeSelect(val){
            this.$emit('changeSelect',val);
        },
        returnSelect(val){
            this.$emit('returnSelect',val);
        }
    },
    mounted() {
        
    },
    components: {
        
    }
}
</script>

<style scoped>
/*内容区域*/ 

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
	background:url("./img/left-nav-bg1.png") no-repeat;
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
.wzqd_container_left_nav li span{
	font-family:"Microsoft YaHei";
	font-size:20px;
	font-weight:bold;
	color:#ffffff;
	display:block;
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