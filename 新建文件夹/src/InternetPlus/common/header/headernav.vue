<!-- 
    header上面 导航 组件
    
    以后该处需要继续扩展
    作者：李文达
    2017-7-7
 -->
<template>
	<ul class="nav clr">
        <li v-for="item in content">
        	<span class="nav-btn-con">
	        	<a :href="item.url">{{item.title}}</a>
	        	<span class="sep-line">|</span>
        	</span>
        </li>
    </ul>
</template>

<script>

// import getHeaderNavJson from '@/services/getHeaderNavJson'

export default {
    data() {
    	return {
    		content:[
                {
                    "title": "首页",
                    "url": "/main"
                },
                {
                    "title": "个人办事",
                    "url": "/grbs"
                },
                {
                    "title": "法人办事",
                    "url": "/frbs"
                },
                {
                    "title": "公共服务",
                    "url": "javascript:;"
                },
                {
                    "title": "便民服务",
                    "url": "javascript:;"
                },
                {
                    "title": "阳光政务",
                    "url": "javascript:;"
                },
                {
                    "title": "数据共享",
                    "url": "javascript:;"
                }
            ]
    	}
    },
   	props: {},
	created: function(){
    	// getHeaderNavJson({}).then(res => {
    	//  	this.content = res
    	// })
    }

}
</script>

<style scoped>
/*  
	李文达 头部导航选项样式
*/
.nav {
    display: block;
    float: left;
    margin-left: 60px;
}

.nav li {
    display: block;
    float: left;
}

.nav a {
    width: 80px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
}
.nav a:hover{
    color: #5588CB;
    border-bottom:1px solid #5588CB;
}
.nav-btn-con{
    text-align: center;
    width: 90px;
    display: block;
    position: relative;
    height: 30px;
    line-height: 30px;
    margin:36px 0;
}
.sep-line{
    float: right;
}
</style>
