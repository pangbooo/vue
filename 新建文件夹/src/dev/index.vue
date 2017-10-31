<template>
  <div id="idtLayout" class="edit">
    <div class="navbar navbar-inverse navbar-fixed-top navbar-layoutidt">
      <div class="navbar-header">
        <button data-target="navbar-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
          <span class="glyphicon-bar"></span>
          <span class="glyphicon-bar"></span>
          <span class="glyphicon-bar"></span>
        </button>
        <a class="navbar-brand" href="javascript:void(0);">倚天可视化布局<span class="label label-default">BETA</span></a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav" id="menu-layoutidt">
          <li>
            <div class="btn-group" data-toggle="buttons-radio">
              <button type="button" id="edit" class="active btn btn-xs btn-primary"><i class="glyphicon glyphicon-edit "></i> 编辑</button>
              <button type="button" class="btn btn-xs btn-primary" id="devpreview"><i class="glyphicon-eye-close glyphicon"></i> 布局编辑</button>
              <button type="button" class="btn btn-xs btn-primary" id="sourcepreview"><i class="glyphicon-eye-open glyphicon"></i> 预览</button>
            </div>
            <!--div class="btn-group">	
              <button type="button" class="btn btn-xs btn-primary" id="button-download-modal" data-target="#downloadModal" href="template/download.html" role="button" data-toggle="modal"><i class="glyphicon-chevron-down glyphicon"></i> 源码</button>
              <button class="btn btn-xs btn-primary" id="button-share-modal" href="template/saveLayout.html" role="button" data-toggle="modal" data-target="#shareModal"><i class="glyphicon-share glyphicon"></i> 保存</button>
              <button class="btn btn-xs btn-primary" href="#clear" id="clear" ><i class="glyphicon-trash glyphicon"></i> 清空</button>
            </div-->
          </li>
        </ul>
      </div><!--/.navbar-collapse -->
    </div><!--/.navbar-fixed-top -->
	  <div class="container">
		  <div class="row">
	      <div class="">
          <div class="sidebar-nav"> 
            <ul class="nav nav-list accordion-group">
              <li class="nav-header">
                <i class="glyphicon-plus glyphicon"></i>  布局设置
                <div class="pull-right popover-info">
                  <i class="glyphicon glyphicon-question-sign"></i> 
                  <div class="popover fade right">
                    <div class="arrow"></div> 
                    <h3 class="popover-title">提示：</h3> 
                    <div class="popover-content">在这里设置网站的布局, 包含多种排版形式，可任意组合多种不同的排版布局风格。 </div>
                  </div> 
                </div> 
              </li>
              <li class="rows" id="estRows">
                <container :componentsinfo="getLayout" ></container>
              </li>
            </ul>
            <ul class="nav nav-list accordion-group">
              <li class="nav-header">
                <i class="glyphicon glyphicon-plus"></i> 功能组件
                <div class="pull-right popover-info">
                  <i class="glyphicon glyphicon-question-sign "></i> 
                  <div class="popover fade right">
                    <div class="arrow"></div> 
                    <h3 class="popover-title">提示：</h3> 
                    <div class="popover-content">这里提供了一系列基本元素，包含的各类功能组件，可任意组合搭配出您喜欢的排版形式。       </div>
                  </div> 
                </div>
              </li>
              <li class="boxes" id="elmBase">
                <container :componentsinfo="getBaseComponents" ></container>
              </li>
            </ul>
          </div>
	      </div>
        <div class="baselayout">
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label">12栏基本布局</span>
              12栏基本布局
              <!-- <container :componentsinfo="getLayout" ></container> -->
            </el-tab-pane>
            <el-tab-pane label="经典布局">经典布局</el-tab-pane>
            <el-tab-pane label="我的布局">我的布局</el-tab-pane>
          </el-tabs>
        </div>
        <!--内容区域 开始-->
        <div class="">
          <container :componentsinfo="getRootCompontents" v-on:componentSetting="componentSetting" class="demo" id="root"></container>
        </div>
        <!--内容区域 结束-->
        <div id="download-layout">
          <!-- 可编辑内容区域 开始 -->
          <div class="container"></div>
          <!-- 可编辑内容区域 结束 -->
        </div>
      </div><!--/row-->
    </div><!--/.fluid-container-->
    <div class="modal fade" id="downloadModal" tabindex="-1" role="dialog" aria-labelledby="downloadModalLabel" aria-hidden="true"></div>
    <div class="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true"></div>
    <div class="modal fade" id="feedbackModal" tabindex="-1" role="dialog" aria-labelledby="feedbackModalLabel" aria-hidden="true"></div>
    <div class="setting panel panel-primary navbar-fixed-bottom" id="settingPanel">
      <div class="panel-heading ">
        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
        <span>组件设置面板</span>
        <a class="panel-close" @click="closePanel()"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
      </div>
      <div class="panel-body">
        <div class="setting-content">
          <div><span>组件名称：{{getComponentSetting.displayname}}</span></div>
          <div>
            <ul class="setting-ul ">
              <li class="col-md-3">
                   <div class="setting-row">
                   <span>对齐方式：</span>
                  <div class="btn-group btn-group-sm" role="group" >
                    <button type="button" class="btn btn-default">居左</button>
                    <button type="button" class="btn btn-default">居中</button>
                    <button type="button" class="btn btn-default">居右</button>
                  </div>
                </div>
                <div class="setting-row"><label class="  ">容器宽度：<input type="text" class="form-control form-inline" >容器高度：<input type="text" class="form-control form-inline" >&nbsp;&nbsp;</label></div>
                <label class="form-label">背景图：</label>
              </li>
              <li class="col-md-5">
                <label class="form-label">边距设置：</label>
                <label class="form-label">外边距（px）：
                  <span>上<input type="text" class="form-control form-inline" ></span>
                  <span>右<input type="text" class="form-control form-inline" ></span>
                  <span>下<input type="text" class="form-control form-inline" ></span>
                  <span>左<input type="text" class="form-control form-inline" ></span>
                </label>
                <label class="form-label">内边距（px）：
                  <span>上<input type="text" class="form-control form-inline" ></span>
                  <span>右<input type="text" class="form-control form-inline" ></span>
                  <span>下<input type="text" class="form-control form-inline" ></span>
                  <span>左<input type="text" class="form-control form-inline" ></span>
                </label>
              </li>
              <li class="col-md-4">
                <label class="form-label">边框设置：</label>
                <label class="form-label">宽度（px）：<input type="text" class="form-control form-inline" >
                颜色：<input type="text" class="form-control form-inline" >
                </label>
                <label class="form-label">类型：
                  <div class="btn-group btn-group-sm" role="group" >
                    <button type="button" class="btn btn-default">实线</button>
                    <button type="button" class="btn btn-default">点线</button>
                    <button type="button" class="btn btn-default">虚线</button>
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import container from './components/container/container.vue';
  require('@/dev/skin/js/jquery.min.js');
  require('@/dev/skin/js/jquery-ui.min.js');
  require('@/dev/skin/js/jquery.ui.touch-punch.min.js');
  require('@/dev/skin/js/bootstrap.min.js');
  
  

  export default {
    data() {
      return {
        componentinfo: {
          id: '',
          name: '',
          style: []
        },
        resultCom: [],
        resultLayout: [],
        newflag: false
      }
    },
    mounted() {
      let self = this;
      let scripts3 = require('@/dev/skin/js/scripts.min.js');
      $("#root").sortable({
        connectWith: ".column",
        opacity: .35,
        handle: ".drag",
        start: function(event, ui) {
          console.log('start');
          console.log(ui.item.index());
        },
        update: function( event, ui ) {
          console.log('update start');
          let pid = $(this).attr('id');
          let name = ui.item.attr('name');
          let displayname = ui.item.attr('displayname');
          let styledata = eval('(' + ui.item.attr('styledata') + ')');
          let id = ui.item.attr('id');
          let index = ui.item.index();
          if(self.$store.state.dev.newObject.flag) { // 新增
            console.log('newItem');
            if (ui.item.parent('.ui-sortable')[0]===this) {// 新增至底层
              console.log('新增至底层');
              let componentId = name + '-com-' + new Date().getTime();
              if (self.$store.state.dev.newObject.type == 'layout') {
                let layoutId = name + '-lay-' + new Date().getTime();
                let layoutArr = ui.item.attr('data').split(',');
                let layoutidtem = {};
                for (let i = 0, len = layoutArr.length; i < len; i ++) {
                  layoutidtem = {
                    id: layoutId + i,
                    pid: componentId,
                    idx: i
                  }
                  self.$store.commit('insertContainer', layoutidtem);
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
              console.log('非新增至底层');
            }
          } else { // 排序
            console.log('orderItem');
            console.log(index);
            if (ui.item.parent('.ui-sortable')[0]===this) {// 底层排序
              console.log('底层排序');
              console.log(ui.item)
              let componentitem = {
                id: id,
                pid: pid,
                name: name,
                displayname: displayname,
                styledata: styledata,
                idx: index
              };
              self.$store.commit('insertComponent', componentitem);
              self.$store.commit('refresh');
            } else {
              console.log('非底层排序');
            }
          } 
        }
      });
    },
    methods: {
      componentSetting(id) {
        alert(id);
      },
      closePanel() {
        $('#settingPanel').fadeOut();  
      }
    }, 
    computed:{
      getComponentSetting() {
        console.log(this.$store.getters)
        return this.$store.getters.getComponentSetting;
      },
      getRootCompontents(){
        return this.$store.getters.getRootcomponentsArray;
      },
      getLayout(){
        return this.$store.state.dev.LayoutArray;
      },
      getBaseComponents() {
        return this.$store.state.dev.baseComponentsArray;
      }
    },
    components: {
      container 
    }
  }
</script>

<style>
  @import "skin/css/bootstrap.min.css";
  @import "skin/css/layoutidt.css";
  @import "skin/css/default.css";
  @import "skin/css/base.css";
  @import "skin/css/list.css";
  @import "skin/css/content.css";
</style>
<style scoped>
.baselayout {
  position: fixed;
  top: 40px;
  left: 185px;
  width: calc(100% - 190px);
  height: auto;
  /* background-color: #ccc; */
}
</style>

/ ** 
移动情况：
一. 新增类：
  1. 新增至根面板
  2. 新增至已有容器（一级或多级内部）
二. 排序类：
  1. 同级排序
  2. 跨容器排序
*/