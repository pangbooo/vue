/**
 * 多页面通用面包屑
 * 参数：
 *     1.调用时需要传递页面id(通常为页面文件名)参数【page】 例：page="shfw-jffw" 
 *     2.各级追加参数【params】,支持异步 例：params: [{ id: 'shfw-jffw', val: 'UUID=5'}] id--页面id， val--url中“?”后*的内容
 *     3.是否显示返回按钮【backbutton】 boolean型参数  true-显示 false-隐藏
 * author:kxc
 * 2017-08-11
 * 上次修改：2017-09-15  修改内容：屏蔽面包屑末端点击链接，支持params参数异步传值
 */
<template>
  <div class="idt__crumbs">
    <el-breadcrumb separator=">">
      <span class="el-breadcrumb__item">当前位置：</span>
      <el-breadcrumb-item v-for="(item,index) in adress" :key="item.id" >
        <a v-if="index !== adress.length - 1" :href="item.path + (item.params.val ? '?' + item.params.val : '')">{{item.title}}</a>
        <span v-else>{{item.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <a v-if="backbutton" class="idt__back" :href="backData.path + (backData.params.val ? '?' + backData.params.val : '')"></a>
  </div>
</template>

<script>
  import structure from '@/api/structure.js';
  export default {
    props: {
      page: {
        type: String
      },
      params: {
        type: Array,
        default() {
          return []
        }
      },
      backbutton: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        breadcrumbs: [],
        backData: {}
      }
    },
    created () {
      this.breadcrumbs = [];
      this.initData(this.page);
      this.appendParams();
      this.backData = this.breadcrumbs[1];
    },
    computed: {
      adress() {
        return this.breadcrumbs.reverse();
      }
    },
    watch: {
      params: {
        handler() {
          this.appendParams();
        },
        deep: true
      },
      page(){
        this.breadcrumbs = [];
        this.initData(this.page);
        this.appendParams();
      }
    },
    methods: {
      initData(pageId) {
        structure.forEach((item, index) => {
          if (item.id === pageId) {
            this.breadcrumbs.push(item);
            this.initData(item.pid);
          }
        });
      },
      appendParams() {
        this.breadcrumbs.forEach((item, index) => {
          this.params.forEach((param, i) => {
            if (item.id === param.id) {
              item.title = param.displayName ? param.displayName : item.title;
              item.params = param;
            }
          });
        })
      }
    }
  }
</script>

<style scoped>
/**
 * 通用面包屑
 * css belong to breadcrumb.vue
 * author:kxc
 * 2017-08-11
 */
  .idt__crumbs{
    position: relative;
    /* margin: 10px 0; */
  }
  .idt__crumbs .el-breadcrumb{
      height:46px;
      line-height: 46px;
      background: url("./img/location.png") no-repeat 6px 14px;
      padding-left: 30px;
      font-size: 15px;
  }
  .idt__back {
    position: absolute;
    top: 12px;
    right: 0;
    width: 66px;
    height: 23px;
    background: url("./img/return.png") no-repeat;
  }
</style>