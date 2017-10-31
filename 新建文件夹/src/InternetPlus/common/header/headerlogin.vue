<!-- 
	header上面 登录、注册/个人中心 切换组件
	判断用户信息显示 登录、注册/个人中心。
	以后该处需要继续扩展
	作者：李文达
	2017-7-7
 -->
<template>
	<div class="fr clr">
		<div class="hd-login clr" v-if="user.yhmc != ''">
			欢迎{{user.displayName}},点击进入
			<a class="use-cen" href="javascript:void(0)">
				用户中心
			</a>
		</div>
		<div class="hd-login clr" v-else>
			<a class="use-lo" href="javascript:void(0)">
				登录
			</a>
			<span class="use-line">|</span>
			<a class="use-lo" href="javascript:void(0)">
				注册
			</a>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			user: {
				yhmc: ''
			}
		}
	}, created() {
		this.user = this.$store.getters.getUser;
	}
}
</script>

<style scoped>
/*  
	李文达 头部登录选项组件样式
*/
.hd-login {
	float: right;
	padding: 41px 0;
}

.use-cen {
	display: inline-block;
	height: 20px;
	line-height: 20px;
	color: #0073da;
}

.use-lo,
.use-line {
	color: #0073da;
}

.use-line {
	padding: 0 10px;
}

.use-lo:hover {
	text-decoration: underline;
}

.banner-section {
	position: relative;
	width: 1260px;
	margin: 0 auto;
}
</style>
