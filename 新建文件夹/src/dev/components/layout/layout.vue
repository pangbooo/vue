<template>
  <div class="lyrow" :name="name" :ref="name" :data="layoutdata">
    <slot name="close"></slot>
    <slot name="move"></slot>
    <div class="preview"><input type="text" :value="layoutdatatostring" class="form-control"></div>
    <div class="view">
      <layoutcontainer :componentsinfo="componentsinfo" :layoutdata="layoutdata"></layoutcontainer>
    </div>
  </div>
</template>

<script>
  import layoutcontainer from './layoutcontainer.vue';
  export default {
    props: { 
      componentsinfo: { 
        type: Array
      },
      name: {
        type: String
      }
    },
    data() {
      return {
        layoutdata: []
      }
    },
    created(){
      this.layoutdata = this.$store.state.dev.baseLayoutArray[this.name].layoutdata;
    },computed: {
      layoutdatatostring() {
        return this.layoutdata.join('-');
      }
    },components: {
      layoutcontainer
    }
  }
</script>

<style scoped>
  
</style>