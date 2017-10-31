/** 通用tree
* 这是一个通用“树”组件，支持多种风格展示。
* 使用zTree保证树的多功能性和高效性。
* 当前使用版本zTree v3.5.29， API文档：http://www.treejs.cn/v3/api.php
* 作者：孔祥超
* 创建时间：2017-07-26
* 最后编辑时间：2017-07-31
**/
<template>
  <div class="zTree_wrap">
		<ul :id="id" class="ztree"></ul>
    <component :name="skin" v-bind:is="skin" ></component>
	</div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        default: 'zTree'
      },
      data: {
        type: Array,
        default(){
          return [];
        }
      },
      setting: {
        type: Object,
        default(){
          return {};
        }
      },
      skin: {
        type: String,
        default: 'metroStyle'
      }
    },
    data() {
      return {
        treeObject: {}
      }
    },
    mounted() {
      require('@/lib/zTree/js/jquery.ztree.core.min.js');
      require('@/lib/zTree/js/jquery.ztree.excheck.min.js');
      this.initTree();
    },
    watch: {
      data: {
        handler: function() {
          this.initTree();
        },
        deep: true
      },
      setting: {
        handler: function() {
          this.initTree();
        },
        deep: true
      }
    },
    methods: {
      initTree() {
        $.fn.zTree.destroy('#' + this.id);
        this.treeObject = $.fn.zTree.init($('#' + this.id), this.settingInit, this.data);
        this.$emit('afterTreeInit', this.treeObject);
      },
      onClick(event, treeId, treeNode, clickFlag) {
        this.$emit('onClick', event, treeId, treeNode, clickFlag);
      },
      onDblClick(event, treeId, treeNode) {
        this.$emit('onDblClick', event, treeId, treeNode);
      },
      onCheck(event, treeId, treeNode) {
        this.$emit('onCheck', event, treeId, treeNode);
      }
    },
    computed: {
      settingInit() {
        this.setting.callback = {
          onClick: this.onClick,
          onDblClick: this.onDblClick,
          onCheck: this.onCheck
        }
        return this.setting;
      }
    },
    components: {
      'zTreeStyle': resolve => { require(['./skin/zTreeStyle'], resolve) }, 
      'metroStyle': resolve => { require(['./skin/metroStyle'], resolve) },
    }
  };
</script>

<style>
</style>