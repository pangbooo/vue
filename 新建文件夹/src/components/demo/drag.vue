<template>
  <div class="wrap">
    <!--div class="header">
      header
    </div-->
    <div class="sider">
      <box></box>
    </div>
    <div class="content" @mouseenter="highlight">
      <component v-for="item in componentsdata" :componentsinfo="item.componentsinfo" :key='item.name' v-bind:is="item.name"></component > 
    </div>
  </div>
</template>

<script>
  import box from './box'
  import box1 from './box1'
  export default {
    data() {
      return {
        componentsdata: [
          {name: 'box1'}
        ]
      }
    },
    methods: {
      highlight() {
        console.log(11);
      }
    },
    components: {
      box, box1
    }
  }
</script>

<style>
  @import  './css/style.css'
</style>