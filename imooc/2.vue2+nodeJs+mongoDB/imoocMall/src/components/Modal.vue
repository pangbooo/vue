<template>
	<div>
		<div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
		  	<div class="md-modal-inner">
				<div class="md-top">
					<button class="md-close" @click="closeLoginModal"></button>
				</div>				
				<div class="md-contnet">
					<div class="confirm-tips">
						<slot name='message'></slot>
					</div>
					<div class="btn-wrap">
						<slot name='btnGroup'></slot>
					</div>
			</div>
		  </div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:["mdShow"],
		data(){
			return{
				msg : '123'
			}
		}
		
	}
</script>