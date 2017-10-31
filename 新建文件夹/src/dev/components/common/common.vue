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
      'headerpage': resolve => { require(['@/InternetPlus/common/header/header'], resolve) },
      'footerpage': resolve => { require(['@/InternetPlus/common/footer/footer'], resolve) },
      'bt': resolve => { require(['./bt.vue'], resolve) },
      'searchpage': resolve => { require(['@/InternetPlus/common/searchpage/searchpage'], resolve) },
      'pagination': resolve => { require(['@/components/pagination'], resolve) },
      'xzqlqdleft': resolve => { require(['@/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft'], resolve) },
      'xzqlqdright': resolve => { require(['@/InternetPlus/qlqd/xzqlqd/xzqlqdlbright'], resolve) },
      'idt-importnews': resolve => { require(['@/InternetPlus/index/import-news'], resolve) },
      'idt-hotsearch': resolve => { require(['@/InternetPlus/index/hot-search'], resolve) },
      'idt-focusnews': resolve => { require(['@/InternetPlus/index/focus-news'], resolve) },
      'idt-centernav': resolve => { require(['@/InternetPlus/index/center-nav'], resolve) }
    }
  }
</script>

<style>
  
</style>