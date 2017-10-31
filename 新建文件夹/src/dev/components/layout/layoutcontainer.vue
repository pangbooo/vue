<template>
  <div class="row clearfix">
      <container v-for="(item, index) in componentsinfo" :key="item.id" :componentsinfo="item.container" :id="item.id" :class="['col-md-' + layoutdata[index], 'column']"></container>
  </div>
</template>

<script>
  import container from '../container/container.vue';
  export default {
    props: {
      componentsinfo: {
        type: Array
      },
      layoutdata: {
        type: Array
      }
    },
    components: {
       container
    }
  }
</script>

<style scoped>
  
</style>