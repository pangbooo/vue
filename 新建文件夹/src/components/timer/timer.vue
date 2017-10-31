<!-- 
    时间组件，暂未使用

    以后该处需要继续扩展
    作者：李文达
    2017-7-7
 -->
<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期"
      @change="changeValue"
      >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      };
    },
    motheds: {
        changeValue(val){
            this.$emit("change-value",this.value)
        }
    }
  };
</script>