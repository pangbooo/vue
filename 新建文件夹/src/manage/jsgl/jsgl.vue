<template>
  <div class="jsgl">
    <div class="jsgl__wrap">
      <div class="jsgl__content">
        <div class="jsgl__content__list">
          <idttable @rowDblclick="rowDblclick"  :page_size="page_size" ref="multipleTable" @sortChange="sortChange"  :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange">
            <div slot="buttonHandlers">
              <el-button v-for="btn in navBtns" :key="btn.key" :type="btn.type" :data-key="btn.key" :disabled="btn.disable" :icon="btn.icon" @click="btn.click">{{ btn.label }}</el-button>
              <el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">
              </el-input>
            </div>
          </idttable>
          <el-dialog :title="componentsinfo.title + ' （当前角色：' + componentsinfo.form.MC + ')'"  :visible.sync="componentsinfo.show" :size="componentsinfo.size" @close="dialogClose">
            <components :is="componentsinfo.name" :form="componentsinfo.form"  @close="dialogClose" @save="dialogSave"></components>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import idttable from "@/components/table/table.vue";
  import getJsglGrid from "@/services/manage/jsgl/getJsglGrid.js";
  import deletePost from '@/services/manage/jsgl/deletePost.js';
  export default {
    data() {
      return {
        navBtns: [
          { key: 1, label: '添加', type: 'primary', disable: false, icon: 'plus', click:this.add},
          { key: 2, label: '删除', type: 'danger', disable: false, icon: 'delete2', click:this.delete}
        ],
        // tableData: {},
        totalRow: 0,
        select_cate: '',
        select_word: '',
        fields: {
          fielddata: [
            {fieldname:'MC',width:'180',showname:'角色名称',sortable:true},
            {fieldname:'XXMS',width:'320',showname:'角色描述',sortable:true}
          ],
          opertions: {showname:'操作',width:'', align:'center',buttons:[{name:'用户',type:'primary',icon:'setting',size: 'small', script:'',handler:'editUser',handlerargs:'scope.row'},{name:'栏目',type:'primary',icon:'document',size: 'small',script:'',handler:'editDoc',handlerargs:'scope.row'},/*{name:'操作集',type:'primary',icon:"menu",size: 'small',script:'',handler:'editOption',handlerargs:'scope.row.UUID'},*/{name:'编辑',type:'primary',icon:"edit",size: 'small',handler:'editRole',handlerargs:'scope.row'}]}
        },
        tableData: {},
        componentsinfo: {
          form: '',
          name: '',
          title: '',
          size: '',
          show: false
        },
        cur_page: 1,
        totalRow: 1,
        page_size: 15,
        multipleSelection: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      add() {
        // this.$router.push({path: '/manage/jsgl_new'});
        this.componentsinfo = {
          form: {XH: '',MC: '',XXMS: ''},
          name: 'jsgl_new',
          title: '新增角色',
          size: 'small',
          show: true
        }
      },
      delete() {
        let args = [];
        for(let i=0;i < this.multipleSelection.length;i++){
            args.push(this.multipleSelection[i].XH);
        }
        let params = { xh: args };
        deletePost(params).then(res => {
            if(res.status === "success"){
                this.$message.success('删除成功！');
                this.getData();
            }else{
                this.$message.error('服务器异常，请联系管理员！');
            }
        }).catch(res => {
            this.$message.error('网络连接异常，请检查网络！');
        });
      },
      dialogClose() {
        this.componentsinfo.show = false;
        this.getData();
        setTimeout(() => {
          this.componentsinfo = {
            form: '',
            name: '',
            title: '',
            size: '',
            show: false
          }
        }, 500)
      },
      dialogSave() {
        this.componentsinfo.show = false;
      },
      editDoc(row) {
        this.componentsinfo = {
          form: row,
          name: 'jsgl_doc',
          title: '栏目权限',
          size: 'full',
          show: true
        }
      },
      editOption(row) {
        this.componentsinfo = {
          form: row,
          name: 'jsgl_option',
          title: '角色操作集',
          size: 'large',
          show: true
        }
      },
      editRole(row) {
        this.componentsinfo = {
          form: row,
          name: 'jsgl_new',
          title: '编辑角色',
          size: 'small',
          show: true
        }
      },
      editUser(row) {
        this.componentsinfo = {
          form: row,
          name: 'jsgl_user',
          title: '绑定用户',
          size: 'small',
          show: true
        }
      },
      getData() {
        let params = {
          nowPage: this.cur_page,
          pageSize: this.page_size,
        };
        getJsglGrid(params).then(res => {
          if (res.status === 'success') {
            this.tableData = res.data;
          } else{
            this.$message.error('服务器异常，请联系管理员！');                        
          }
        });
      },
      getXh(row, column) {
        return ((this.cur_page - 1) * this.page_size + this.tableData.indexOf(row) + 1);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val){
        this.cur_page = val;
        this.getData();
      },
      rowDblclick() {
        
      },
      sortChange() {

      }
    },
    components: {
      idttable,
      'jsgl_new' : resolve => { require(['./jsgl_new.vue'], resolve) },
      'jsgl_user' : resolve => { require(['./jsgl_user.vue'], resolve) },
      'jsgl_doc' : resolve => { require(['./jsgl_doc.vue'], resolve) },
      'jsgl_option' : resolve => { require(['./jsgl_option.vue'], resolve) }
    }
  }
</script>

<style scoped>
  .jsgl__content__btn {
    text-align: right;
  }
  .jsgl__content__list {
    margin-top: 10px;
  }
</style>