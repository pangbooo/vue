<template>
  <div class="jsgl-optionEdit">
    <div class="jsgl-optionEdit__wrap">
      <div class="jsgl-optionEdit__wrap__form">
        <el-form ref="jsgl_optionEdit"  :model="option" label-width="100px" >
          <el-form-item label="节点名称：" prop="JDMC">
            <el-col :span="12">
              <el-input v-model="option.JDMC" size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="打开模板：" prop="DKMB" >
            <el-col :span="8">
              <el-input v-model="option.DKMB" size="small"></el-input>
            </el-col>
            <el-col :span="2">
              &nbsp;
            </el-col>
            <el-col :span="11">
              <el-radio-group v-model="option.MBLX">
                <el-radio label="模板"></el-radio>
                <el-radio label="正文"></el-radio>
                <el-radio label="自定义"></el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label=" " prop="type">
            <el-checkbox-group v-model="option.type">
              <el-checkbox label="不同步" name="type" ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="排序字段：" prop="PXZD" >
            <el-col :span="12">
              <el-input v-model="option.PXZD" size="small"></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-checkbox-group v-model="option.type">
                <el-checkbox label="不同步" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
          <el-form-item label="过滤条件：" prop="GLTJ" >
            <el-col :span="12">
              <el-input type="textarea" v-model="option.GLTJ" ></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-checkbox-group v-model="option.type">
                <el-checkbox label="不同步" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
          <el-form-item label="权限：" prop="type">
            <el-checkbox-group v-model="option.type">
              <el-checkbox label="添加" name="type"></el-checkbox>
              <el-checkbox label="删除" name="type"></el-checkbox>
              <el-checkbox label="导入资料库" name="type"></el-checkbox>
              <el-checkbox label="归入档案库" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label=" " prop="type">
            <el-checkbox-group v-model="option.type">
              <el-checkbox label="不同步" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="jsgl-optionEdit__wrap__form__btn">
            <el-button type="primary" icon="check" size="mini" @click="save()">应用</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        option: {}
      }
    },
    created() {

    },
    methods() {

    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 2px;
  }
  .jsgl-optionEdit__wrap__form {
    font-size: 12px !important;
  }
  .jsgl-optionEdit__wrap__form__btn {
    text-align: right;
    padding-right: 30px;
  }
</style>