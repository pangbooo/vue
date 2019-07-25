<template>
	<div :class="$style.red">
		TodoList
	</div>
</template>

<script>
export default {
	mounted: function () {
    	console.log('process.env.NODE_ENV',process.env.NODE_ENV)
  	}
}
</script>

<style module>
.red {
	color: red;
	display: flex
}
</style>
