<template>
  <div class="jsgl-option">
    <div class="jsgl-option__wrap">
      <div class="jsgl-option__wrap__tree">
        <div class="jsgl-option__wrap__tree--title">
          <el-tag>完整操作</el-tag>
        </div>
        <tree :data="treeDataAll" :setting="treeSettingAll"  v-on:onClick="treeNodeClickAll" id="treeAll" v-on:afterTreeInit="afterTreeInitAll"></tree>
      </div>
      <div class="jslg-option__wrap__btn">
        <ul>
          <li>
            <el-button type="primary" icon="arrow-right" size="mini" @click="addOption"></el-button>
          </li>
          <li>
            <el-button type="primary" icon="arrow-left" size="mini" @click="removeOption"></el-button>
          </li>
        </ul>
      </div>
      <div class="jsgl-option__wrap__tree">
        <div class="jsgl-option__wrap__tree--title">
          <el-tag>选中操作</el-tag>
        </div>
        <tree :data="treeData" :setting="treeSetting"  v-on:onClick="treeNodeClick" id="tree" v-on:afterTreeInit="afterTreeInit"></tree>
      </div>
      <div class="jsgl-option__wrap__edit">
        <div class="jsgl-option__wrap__edit--title">
          <el-tag>编辑操作</el-tag>
        </div>
        <optionedit></optionedit>
      </div>
      <div class="jslg-option__wrap__btn--bottom">
        <el-button type="primary" icon="check" @click="save()">保存</el-button>
        <el-button type="danger" icon="close" @click="close()">关闭</el-button>                                 
      </div>
    </div>
  </div>
</template>

<script>
  import tree from '@/components/tree/tree.vue';
  import optionedit from './jsgl_optionEdit.vue';

  import removeOption from '@/services/manage/jsgl/removeOption.js';
  
  export default {
    data() {
      return {
        treeDataAll: [
          { id: 0, pId: '', name: '繁峙县', nocheck: true, open: true},
          { id: 1, pId: 0, name: '行政权力库', open: true},
          { id: 11, pId: 1, name: '组织管理'},
          { id: 12, pId: 1, name: '事项登记'},
          { id: 13, pId: 1, name: '我的待办'},
          { id: 14, pId: 1, name: '权力管理'},
          { id: 15, pId: 1, name: '提速率'},
          { id: 16, pId: 1, name: '审改追溯'},
          { id: 2, pId: 0, name: '权力运行平台', open: true},
          { id: 21, pId: 2, name: '我的待办'},
          { id: 22, pId: 2, name: '事项办理'},
          { id: 23, pId: 2, name: '通知公告'},
          { id: 3, pId: 0, name: '权力监察平台', open: true },
          { id: 31, pId: 3, name: '事前监察'},
          { id: 32, pId: 3, name: '预警预期'},
          { id: 33, pId: 3, name: '统计分析'}
        ],
        treeSettingAll: {
          data: {
            simpleData: {
              enable: true
            }
          },
          check: {
            enable: true
          }
        },
        treeData: [
          { id: 0, pId: '', name: '角色操作', nocheck: true, open: true}
        ],
        treeSetting: {
          data: {
            simpleData: {
              enable: true
            }
          },
          check: {
            enable: true
          }
        },
        treeObjAll: null,
        treeObj: null
      }
    },
    methods: {
      addOption() {
        let nodes = this.treeObjAll.getCheckedNodes(true);
        for (let i = 0, lenNodes = nodes.length; i < lenNodes; i ++) {
          let hasNode = false;
          for (let j = 0, lenTreeData = this.treeData.length; j < lenTreeData; j ++) {
            if (nodes[i].id === this.treeData[j].id) {
              hasNode = true;
              break;
            }
          }
          if (!hasNode) {
            this.treeData.push({
              id: nodes[i].id,
              pId: nodes[i].pId,
              name: nodes[i].name,
              open: true
            })
          }
        }
      },
      afterTreeInit(obj) {
        this.treeObj = obj;
      },
      afterTreeInitAll(obj) {
        this.treeObjAll = obj;
      },
      close() {
        this.$emit('close');
      },
      removeOption() {
        let nodes = this.treeObj.getCheckedNodes(true);
        let params = {args: []};
        for (let i = 0, lenNodes = nodes.length; i < lenNodes; i ++) {
          if (nodes[i].check_Child_State !== 1) {
            params.args.push(nodes[i].id);
          }
        }
        removeOption (params).then(data => {
          if (data.status == "success") {
            this.$message.success("删除成功!");
          } else {
            this.$message.error("删除失败!");
          }
        });
      },
      save() {
        this.$emit('save');
      },
      treeNodeClick() {

      },
      treeNodeClickAll() {

      }
    },
    components: {
      tree, optionedit
    }
  }
</script>

<style scoped>
  .jsgl-option {
    min-height: 435px;
    overflow: auto;
    width: 100%;
  }
  .jsgl-option__wrap {
    margin: 0 auto;
    width: 98%;
    height: 400px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 10px 0 50px;
  }
  .jsgl-option__wrap:hover,
  .jsgl-option__wrap__tree:hover,
  .jsgl-option__wrap__edit:hover {
    box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);
  }
  
  .jsgl-option__wrap__tree {
    float: left;
    margin: 5px;
    width: 22%;
    border: 1px solid #ccc;
    height: 380px;
    border-radius: 4px;
    overflow: auto;
  }
  .jsgl-option__wrap__tree--title,
  .jsgl-option__wrap__edit--title {
    padding: 5px;
  }
  .jslg-option__wrap__btn {
    position: relative;
    float: left;
    width: 30px;
    height: 380px;
  }
  .jslg-option__wrap__btn > ul {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 24px;
    height: 70px;
  }
  .jslg-option__wrap__btn > ul > li {
    margin: 10px 0;
  }
  .jsgl-option__wrap__edit {
    float: left;
    width: 48%;
    margin: 5px;
    border: 1px solid #ccc;
    height: 380px;
    border-radius: 4px;
  }
  .jslg-option__wrap__btn--bottom {
    text-align: center;
    clear: both;
  }
</style>