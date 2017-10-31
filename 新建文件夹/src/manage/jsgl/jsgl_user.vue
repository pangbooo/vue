<template>
  <div class="jsgl-user">
    <div class="jsgl-user__wrap">
      <div class="jsgl-user__wrap__tips">
        <span class="jsgl-user__wrap__tips--text">* 此处是说明</span>
      </div>
      <div class="jsgl-user__wrap__tree">
        <tree :data="treeData" :setting="treeSetting"  v-on:onClick="treeNodeClick" v-on:afterTreeInit="afterTreeInit"></tree>
      </div>
      <div class="jsgl-user__wrap__form__btn">
        <el-button type="primary" icon="check" @click="save()">保存</el-button>
        <el-button type="danger" icon="close" @click="close()">关闭</el-button>                                 
      </div>
    </div>
  </div>
</template>

<script>
  import tree from '@/components/tree/tree.vue';
  import getDeptPersonTree from '@/services/manage/jsgl/getDeptPersonTree';

  import bindUser from '@/services/manage/jsgl/bindUser';
  export default {
    props: {
      form: {
        type: Object,
        default() {
          return {
            XH: ''
          }
        }
      }
    },
    data() {
      return {
        treeData: [],
        temptree: '',
        treeSetting: {
          data: {
            simpleData: {
              enable: true
            }
          },
          check: {
            enable: true
          }
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      afterTreeInit(treeObject) {
        this.temptree = treeObject;
      },
      close() {
        this.$emit('close');
      },
      getData() {
        getDeptPersonTree({gwid: this.form.XH}).then(res => {
          if(res.status === "success"){
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].PID === "47c2c4f9235aa97f01235aa97f7c0000"){
                let b = {
                  id: res.data[i].ID,
                  pId: res.data[i].PID,
                  name: res.data[i].NAME,
                  checked: res.data[i].checked,
                  ntype: res.data[i].NTYPE,
                  open: true
                };
                this.treeData.push(b);    
              }else{
                let a = {
                  id: res.data[i].ID,
                  pId: res.data[i].PID,
                  name: res.data[i].NAME,
                  ntype: res.data[i].NTYPE,
                  checked: res.data[i].checked
                };
                this.treeData.push(a);
              }
            }
          }else{
            this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(data => {
            this.$message.error('网络连接异常，请检查网络！');
        });           
      },
      save() {
        let userids = [];
        let nodes = this.temptree.getCheckedNodes(true);
        nodes.forEach((item, index) => {
          if (item.ntype === 'user') {
            userids.push(item.id);
          }
        });
        let params = {
          gwid: this.form.XH,
          userids: userids
        }
        bindUser(params).then(res => {
          if (res.status === 'success') {
            this.$message.success('保存成功！');
          } else {
            this.$message.error('服务器异常，请联系管理员！');
          }
        })
      },
      treeNodeClick() {

      }
    },
    components: {
      tree
    }
  }
</script>

<style scoped>
  .jsgl-user {
    height: 435px;
    overflow: auto;
    width: 100%;
  }
  .jsgl-user__wrap {
    margin: 0 auto;
    width: 90%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 10px 30px 50px;
  }
  .jsgl-user__wrap:hover {
    box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);
  }
  .jsgl-user__wrap__tips {
    width: 180px;
    height: 36px;
    line-height: 36px;
  }
  .jsgl-user__wrap__tips--text {
    padding: 5px;
    color: #6495ED;
  }
  .jsgl-user__wrap__form {
    margin: 20px auto;
    width: 70%;
    min-width: 530px;
  }
  .jsgl-user__wrap__form__btn {
    text-align: center;
  }
  
</style>