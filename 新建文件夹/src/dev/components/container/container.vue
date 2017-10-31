<template>
  <div>
      <component v-for="item in componentsinfo" :key="item.id" v-if="item.name" :name="item.name" v-bind:is="item.name.indexOf('layout')> -1 ? 'layout' : 'common'" :componentsinfo="item.componentsinfo" :displayname="item.displayname" :index="item.idx" :id="item.id" :styledata="item.styledata">
        <a href="javascript:void(0);" class="remove label label-danger" @click="deleteself(item.id)" slot="close"><i class="glyphicon-remove glyphicon"></i> 删除</a>
        <span class="drag label label-default" slot="move"><i class="glyphicon glyphicon-move"></i> 拖动</span>
        <a href="javascript:void(0);" class="btn-edit label label-primary" @click="editself(item)" slot="edit"><i class="glyphicon-edit glyphicon"></i> 编辑</a>
      </component>
  </div>
</template>

<script>
  export default {
    props: {
      componentsinfo: {
        type: Array
      }
    },
    data() {
      return {
        parentId: ''
      }
    },
    mounted() {
      let self=this;
      this.parentVal=this.$parent;
      $(this.$parent.$el).find(".column").sortable({
        opacity: .35,
        connectWith: ".column",
        handle: ".drag",
        start(event, ui) {
        },
        update: function( event, ui ) {
          let name = ui.item.attr('name');
          let displayname = ui.item.attr('displayname');
          let styledata = eval('(' + ui.item.attr('styledata') + ')');
          let id = ui.item.attr('id');
          let pid = $(this).attr('id');
          let index = ui.item.index();
          if(self.$store.state.dev.newObject.flag) { // 新增
            console.log('newItem');
            if (ui.item.parent('.ui-sortable')[0]===this) {// 新增至本层
              console.log('新增至本层');
              let componentId = name + '-com-' + new Date().getTime();
              if (self.$store.state.dev.newObject.type == 'layout') {
                let layoutArr = ui.item.attr('data').split(',');
                let layoutId = name + '-lay-' + new Date().getTime();
                let layoutitem = {};
                for (let i = 0, len = layoutArr.length; i < len; i ++) {
                  layoutitem = {
                    id: layoutId + i,
                    pid: componentId,
                    idx: i
                  }
                  self.$store.commit('insertContainer', layoutitem);
                }
              }
              let componentitem = {
                id: componentId,
                pid: pid,
                name: name,
                displayname: displayname,
                styledata: {},
                idx: index
              };
              self.$store.commit('insertComponent', componentitem);
              ui.item.remove();
              self.$store.commit('refresh');
            } else {
              console.log('非新增至本层1');
            }
          } else { // 排序
            console.log('容器内部触发');
            console.log("layout12=========")
            console.log(ui.item.index());
            let componentitem = {
                id: id,
                pid: pid,
                name: name,
                displayname: displayname,
                styledata: styledata,
                idx: index
              };
              console.log(componentitem);
              self.$store.commit('insertComponent', componentitem);
              self.$store.commit('refresh');
          }
        }
      })
      $(".sidebar-nav .lyrow").draggable({
        connectToSortable: ".demo",
        helper: "clone",
        handle: ".drag",
        drag: function(ev, el) {
          el.helper.width(400);
          self.$store.commit('setNewObject', {flag: true, type: 'layout'});
        },
        stop: function(ev, el) {
          self.$store.commit('setNewObject', {flag: false, type: ''});
        }
      });
      $(".sidebar-nav .box").draggable({
        connectToSortable: ".column",
        helper: "clone",
        handle: ".drag",
        drag: function(ev, el) {
          el.helper.width(400);
          self.$store.commit('setNewObject', {flag: true, type: 'component'});
        },
        stop: function(ev, el) {
          self.$store.commit('setNewObject', {flag: false, type: ''});
        }
      });
    },
    methods: {
      deleteself(id) {
        this.$store.commit('deleteComponent', {id});
      },
      editself(obj) {
        
        $('#settingPanel').fadeIn();
        console.log($('#'+obj.id).find('.view'));
        let $el = $('#'+obj.id).find('.view');
        console.log(this.$el);
        let componentinfo = {
          id: obj.id,
          name: obj.name,
          displayname: obj.displayname,
          styledata: obj.styledata,
          idx: obj.idx
        }
        this.$store.commit('setComponentSetting', componentinfo);
      }
    },
    components: {
       'layout': resolve => { require(['../layout/layout.vue'], resolve) }, 'layoutcontainer': resolve => { require(['../layout/layoutcontainer.vue'], resolve) }, 'common': resolve => { require(['../common/common.vue'], resolve) }
    }
  }
</script>

<style scoped>
  
</style>