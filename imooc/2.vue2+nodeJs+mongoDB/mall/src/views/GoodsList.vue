<template>
	<div>
		这是商品列表<br/>
		<!-- <span>商品id：{{$route.params.goodsId}}</span><br/> -->
		<!-- <span>用户： {{$route.params.name}}</span> -->
		<div>
			<router-link to="/goods/title">显示商品标题</router-link>
			<router-link to="/goods/image">显示商品图片</router-link>
			<router-link v-bind:to="{name:'cart',params:{cartId:'123'}}">跳转到购物车页面</router-link>
			<button @click="jump">button-跳转到购物车页面</button>
		</div>
		<div>
			<router-view ></router-view>
		</div>
	</div>
</template>

<style type="text/css"></style>
<script type="text/javascript">
	export default {
		data(){
			
		},
		methods : {
			jump(){
				// this.$router.push('/cart')
				this.$router.push( {path:'/cart',query: { goodsId: '123' }})
			}
		}
	}
</script>