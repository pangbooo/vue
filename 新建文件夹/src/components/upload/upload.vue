<template>
      <div>
            <form>
                  <input type="file" @change="getFile($event)">
                  <button @click="submitForm($event)">提交</button>
            </form>

      </div>
</template>

<script>
import {uploadFile} from '@/api/common.js';
export default {
      props: {
            tableId: {
                  type: String
            },
            attachId:{
                  type: String
            },
            FIELDNAME:{
                   type: String,
                   default:'fj'
            }
      },
      data() {
            return {
                  file: '',
            }
      }, methods: {
            getFile(event) {
                  this.file = event.target.files[0];
                  console.log(this.file);
            },
            submitForm(event) {
                  event.preventDefault();
                  let formData = new FormData();
                  formData.append('tableId', this.tableId);
                  formData.append('ATTACH_ID', this.attachId);
                  formData.append('FIELDNAME', this.FIELDNAME);
                  formData.append('file', this.file);
                  uploadFile(formData).then(res => {
                  if(res.status == "success"){
                        this.$message.success('上传成功');
                  }
            });
          }


      }
}
</script>

<style>

</style>
