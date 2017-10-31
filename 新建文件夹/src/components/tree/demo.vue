<template>
  <div>
		<tree :data="data" :setting="setting" :skin="skin" v-on:onClick="treeNodeClick" v-on:afterTreeInit="afterTreeInit"></tree>
	</div>
</template>

<script>
  import tree from '@/components/tree/tree.vue';
  export default {
    data() {
      return {
        data: [
          { id: 1, pId: 0, name: '父节点A', open: true},
          { id: 11, pId: 1, name: '叶子节点1'},
          { id: 12, pId: 1, name: '叶子节点2'},
          { id: 13, pId: 1, name: '叶子节点3'},
          { id: 2, pId: 0, name: '父节点B', open: true},
          { id: 21, pId: 2, name: '叶子节点1'},
          { id: 22, pId: 2, name: '叶子节点2'},
          { id: 23, pId: 2, name: '叶子节点3'},
          { id: 3, pId: 0, name: '父节点C', open: true },
          { id: 31, pId: 3, name: '叶子节点1'},
          { id: 32, pId: 3, name: '叶子节点2'},
          { id: 33, pId: 3, name: '叶子节点3'}
        ],
        setting: {
          data: {
            simpleData: {
              enable: true
            }
          }
        },
        skin: 'metroStyle'
      }
    },
    mounted() {
     
    },
    methods: {
      treeNodeClick(event, treeId, treeNode, clickFlag) {
        console.log(1);
        console.log(arguments);
      },
      afterTreeInit(treeObject){
        console.log(treeObject);
      }
    },
    components: {
      tree
    }
  };
</script>

<style scoped>
</style>