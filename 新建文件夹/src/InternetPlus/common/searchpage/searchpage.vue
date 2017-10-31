<!-- 
    内页header下方banner+search组件

    以后该处需要继续扩展
    作者：李文达
    2017-7-7
 -->
<template>
	<div class="banner bannerpage-bg" :class="isfirst ? 'banner--first' : '' ">
        <div class="search-con">
            <input type="text" class="search-text" v-model="content" />
            <input type="button" class="search-btn" value="搜索" @click="search">
        </div>
    </div>
</template>

<script>

export default {
    data() {
    	return {
    		content:""
    	}
    },
   	props: {
           isfirst: {
               type: Boolean,
               default: false
           }
       },
    methods: {
        search:function () {
            alert("没有找到结果")
        }
    }
}
</script>

<style scoped>
/*  
	李文达 page页搜索组件样式
*/
.bannerpage-bg{
    background:url(./img/banner.jpg) no-repeat;
}
.banner{
    margin:0 auto;
    width: 1260px;
    height: 286px;
    position: relative;
}
.banner.banner--first {
    height: 355px;
    background:url(./img/bannerfirst.jpg) no-repeat;
}
.search-con{
    width: 300px;
    height: 28px;
    position: absolute;
    right: 5%;
    top: 5%;
    border: 1px solid #2473c1;
    border-radius: 5px;
    overflow: hidden;
}
.search-con::after{
    content: '';
    display: block;
    clear: both;
}
.search-text{
    float: left;
    display: block;
    width: 250px;
    height: 28px;
    border: none;
    background: rgba(256, 256, 256, .6);
    padding-left: 8px;
    line-height: 28px;
    color: #fff;
    box-sizing: border-box;
}
.search-btn{
    width: 50px;
    height: 28px;
    background-color: #3c94eb;
    color: #fff;
    text-align: center;
    line-height: 28px;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
