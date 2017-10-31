<template>
  <div class="jsgl-new">
    <div class="jsgl-new__wrap">
      <div class="jsgl-new__wrap__form">
        <el-form ref="form" :rules="formRule" :model="form" label-width="120px">
          <el-form-item label="角色名称" prop="MC">
            <el-input v-model="form.MC" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="XXMS">
            <el-input type="textarea" v-model="form.XXMS" placeholder="请输入角色描述"></el-input>
          </el-form-item>
          <div class="jsgl-new__wrap__form__btn">
            <el-button type="primary" icon="check" @click="save()">保存</el-button>
            <el-button type="danger" icon="close" @click="close()">关闭</el-button>                                 
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import insertOrUpdatePost from '@/services/manage/jsgl/insertOrUpdatePost.js';
  export default {
    props: {
      form: {
        type: Object,
        default() {
          return {
            XH: '',
            MC: '',
            XXMS: ''
          }
        }
      }
    },
    data() {
      return {
        formRule: {
          MC: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          XXMS: [
            { required: true, message: '请输入角色描述', trigger: 'blur' }
          ]
        },
      }
    },
    created() {
      
    },
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
        this.$refs.form.validate((valid) => {
          if (valid) {
              insertOrUpdatePost(this.form).then(res => {
                if (res.status === 'success') {
                  this.$message.success('保存成功！');
                  this.close();
                } else {
                  this.$message.error('服务器异常，请联系管理员！');                        
                }
              });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .jsgl-new {
    height: 435px;
    overflow: auto;
    width: 100%;
  }
  .jsgl-new__wrap {
    margin: 0 auto;
    width: 90%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 10px 0 50px;
  }
  .jsgl-new__wrap:hover {
    box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);
  }
  .jsgl-new__wrap__form {
    margin: 20px auto;
    width: 70%;
    min-width: 530px;
  }
  .jsgl-new__wrap__form__btn {
    text-align: center;
  }
  
</style>