<template>
	<!-- 需要有个根元素 -->
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>Goods</span>
			<!-- <span slot='test'>test</span> -->
		</nav-bread>
		<div class="accessory-result-page accessory-page">
		  <div class="container">
		    <div class="filter-nav">
		      <span class="sortby">Sort by:</span>
		      <a href="javascript:void(0)" class="default cur">Default</a>
		      <a href="javascript:void(0)" class="price" @click="sortGoods()">Price 
		      	<svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}">
		      		<use xlink:href="#icon-arrow-short"></use>
	      		</svg>
		      </a>
		      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
		    </div>
		    <div class="accessory-result">
		      <!-- filter -->
		      <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}" >
		        <dl class="filter-price">
		          <dt>Price:</dt>
		          <dd><a href="javascript:void(0)" :class="{cur : priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
		          <dd v-for="(price,index) in priceFilter">
		          <a href="javascript:void(0)" v-bind:class="{cur: priceChecked==index}" @click="setPriceFilter(index)">
		          	{{price.startPrice}} - {{price.endPrice}}
		          </a>
		          </dd>
		        </dl>
		      </div>

		      <!-- search result accessories list -->
		      <div class="accessory-list-wrap">
		        <div class="accessory-list col-4">
		          <ul>
		            <li v-for="(item,index) in goodsList">
		              <div class="pic">
		                <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
		              </div>
		              <div class="main">
		                <div class="name">{{item.productName}}</div>
		                <div class="price">{{item.salePrice}}</div>
		                <div class="btn-area">
		                  <a href="javascript:;" class="btn btn--m" @click='addCart(item.productId)'>加入购物车</a>
		                </div>
		              </div>
		            </li>
		          </ul>
		          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
				  	<!-- <span v-show='loading'>加载更多</span> -->
				  	<img src="./../assets/loading-spin.svg" v-show='loading'>
				</div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
		<!-- Modal组件 -->
		<!-- <modal v-bind:mdShow="mdShow">
			<p slot='message'>
				请先登录，否则无法加入到购物车
			</p>
			<div slot='btnGroup'>
				<a class="btn btn-m">关闭</a>
			</div>
		</modal> -->
		<!-- 遮罩层 -->
		<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
		<nav-footer></nav-footer>
	</div>
</template>
<style type="text/css">
	.btn:hover{
		background-color: #ffdfdf;
		transition: all .3s; 
	}
</style>
<script>
	import './../assets/css/base.css'
	import './../assets/css/product.css'
	import NavHeader from '@/components/NavHeader.vue'
	import NavFooter from '@/components/NavFooter.vue'
	import NavBread from '@/components/NavBread.vue'
	// import Modal from '@/components/Modal.vue'
	import axios from 'axios'
	import qs from 'qs';
	export default{
		data(){
			return {
				goodsList : [],
				sortFlag : true,
				page : 1,
				pageSize : 8,
				priceFilter : [
					{
						startPrice : 0.00,
						endPrice : 100.00
					},
					{
						startPrice : 100.00,
						endPrice : 500.00,
					},
					{
						startPrice : 500.00,
						endPrice : 1000.00
					},
					{
						startPrice : 1000.00,
						endPrice : 5000.00
					}
				],
				priceChecked : 'all',
				filterBy : false,
				overLayFlag : false,
				busy:true,
				loading : true,
				mdShow : false
			}
		},
		components:{
			// NavHeader : NavHeader
			NavHeader,
			NavFooter,
			NavBread,
			// Modal
		},
		mounted : function () {
			this.getGoodsList();
		},
		methods : {
			getGoodsList(flag){ 
				//flag 数据是拼接（true）还是全部加载（false）
				var param = {
					page : this.page,
					pageSize : this.pageSize,
					sort : this.sortFlag ? 1 : -1,
					priceLevel : this.priceChecked
				}
				this.loading = true;
				axios.get('/goods/list',{
					params : param
				}).then((response)=>{
					this.loading = false;
					var res = response.data;
					if (res.status == '0') {
						if (flag) {
							this.goodsList = this.goodsList.concat(res.result.list)
							if (res.result.count==0) {
								this.busy = true
							}else{
								this.busy = false
							}
						}else{
							this.goodsList = res.result.list;
							this.busy = false;
						}
					}else{
						this.goodsList = [];
					}
				})
			},
			sortGoods(){
				this.sortFlag = !this.sortFlag;
				this.page = 1;
				this.getGoodsList();
			},
			loadMore(){
				// this.busy = true
				setTimeout(() => {
					this.page++;
			        this.getGoodsList(true);
			        // this.busy = false; 
			    }, 500);
			},
			addCart(productId){
				axios.post('/goods/addCart',qs.stringify({
					productId : productId
				})).then((response) => {
					var res = response.data;
					if (res.status == '0') {
						alert('加入成功');
					}else{
						alert('msg' + res.msg)
						// this.mdShow = true
					}
				})
			},
			setPriceFilter : function(index){
				this.priceChecked = index;
				this.page = 1;
				this.getGoodsList();
				this.closePop();
			},
			showFilterPop : function(){
				this.filterBy = true;
				this.overLayFlag = true
			},
			closePop : function(){
				this.filterBy = false;
				this.overLayFlag = false
			}
		}
	}
</script>