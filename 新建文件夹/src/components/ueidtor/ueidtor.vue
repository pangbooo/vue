/** 通用ueidtor
* 这是一个通用富编辑器组件，支持多种风格展示。
* 使用ueidtor保证编辑器的多功能性和高效性。
* 当前使用版本ueidtor v1.4.3.3， API文档：http://ueditor.baidu.com/doc/
* 作者：李文达leo
* 创建时间：2017-08-2
* 最后编辑时间：2017-08-2
**/
<template>
  <div class="editor_wrap">
		<script :id="id" type="text/plain"></script>
	</div>
</template>

<script>
  export default {
    name: 'UEidtor',
    data() {
      return {
        ueidtorObject: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    watch:{
      defaultMsg:function(){
        this.createUe();
      }
    },
    mounted(){
         this.ueidtorObject = UE.getEditor(this.id, this.config); // 初始化UE
    },
    methods: {
      createUe: function () {
          const _this = this;

          if(!this.ueidtorObject){
            this.ueidtorObject = UE.getEditor(this.id, this.config); // 初始化UE
          }
          setTimeout(function(){
            _this.ueidtorObject.setContent(_this.defaultMsg);
          },1000);
         
          this.ueidtorObject.addListener("ready", function () {
            // alert(_this.defaultMsg);
          
          });
      },
      getUEContent: function () { // 获取内容方法
        return this.ueidtorObject.getContent()
      }
    },
    destroyed() {
      this.ueidtorObject.destroy();
    }
  };
</script>

<style>
</style>