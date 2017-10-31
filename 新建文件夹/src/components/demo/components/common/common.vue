<template>
  <div class="box box-element" :name="name" :displayname="displayname" :styledata="styledata" :ref="name">
    <slot name="close"></slot>
    <slot name="move"></slot>
    <slot name="edit"></slot>
    <span slot="configuration"></span>
    <div class="preview" slot="name">{{displayname}}</div>
    <div class="view" :style="styledata">
      <component :name="name" v-bind:is="name" ></component>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String
      },
      displayname: {
        type: String
      },
      styledata: {
        type: Object
      }
    },
    data() {
      return {
      }
    },
    methods: {
      
    },
    components: {
      'headerpage': resolve => { require(['@/components/headerpage/headerpage'], resolve) },
      'footerpage': resolve => { require(['@/components/common/footerpage'], resolve) },
      'bt': resolve => { require(['./bt.vue'], resolve) },
      'searchpage': resolve => { require(['@/components/searchpage/searchpage'], resolve) },
      'pagination': resolve => { require(['@/components/common/pagination'], resolve) },
      'xzqlqdleft': resolve => { require(['@/components/xzqlqdleft'], resolve) },
      'xzqlqdright': resolve => { require(['@/components/xzqlqdright'], resolve) }
    }
  }
</script>

<style>
  
</style>