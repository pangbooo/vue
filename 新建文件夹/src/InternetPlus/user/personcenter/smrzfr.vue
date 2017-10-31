/* 
    描述：个人中心-法人实名认证
    作者：李文达
    创建时间：2017年10月7日
    最后修改人：李文达
    最后修改时间：2017年10月7日
*/
<template>
  <div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="pcnenter__center">
      <idt-breadcrumb :page="page"></idt-breadcrumb>
      <div class="pcnenter__left">
        <idt-personInfo></idt-personInfo>
      </div>
      <div class="smrz-right">
        <h3 class="smrz-right--title">请完善以下信息确保实名认证通过：</h3>
        <div class="tab">
          <el-form :model="company" ref="company" label-width="220px">
            <el-form-item prop="qylx" label="企业类型">
              <el-select v-model="company.qylx" placeholder="企业类型" class="item-select">
              <el-option
                  v-for="item in qyfrList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="qymc" label="企业名称">
              <el-input v-model="company.qymc" placeholder="企业名称"></el-input>
            </el-form-item>
            <el-form-item prop="xydm" label="企业工商注册/统一社会信用代码">
              <el-input v-model="company.xydm" placeholder="企业工商注册/统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item prop="qyfzr" label="企业负责人">
              <el-input v-model="company.qyfzr" placeholder="企业负责人"></el-input>
            </el-form-item>
            <el-form-item prop='qyfzrmz' label="企业负责人民族">
              <el-select v-model="company.qyfzrmz" placeholder="企业负责人民族" class="item-select">
              <el-option
                  v-for="item in nationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="qyfzrsfz" label="企业负责人身份证号">
              <el-input v-model="company.qyfzrsfz" placeholder="企业负责人身份证号"></el-input>
            </el-form-item>
            <el-form-item prop="yjdz" label="邮寄地址">
              <el-input v-model="company.yjdz" placeholder="邮寄地址"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="xyzsList">
                <el-button size="small" type="primary">上传企业工商注册统一社会信用证书</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="" >
              <el-button type="primary" @click="login('company')">提交</el-button>
              <el-button @click="resetForm('company')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
  </div>
</template>

<script>
  import idtheader from '@/InternetPlus/common/header/header.vue';
  import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
  import idtfooter from '@/InternetPlus/common/footer/footer.vue';
  import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
  import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
  import personInfo from '@/InternetPlus/user/personcenter/personInfo';

  export default { 
    components: {
      'idt-header': idtheader,
      'idt-navbar':idtnavbar,
      'idt-footer': idtfooter,
      'idt-breadcrumb': idtbreadcrumb,
      'idt-personInfo': personInfo, 
      'idt-floatbar': floatbar
    },
    data() {
      return {
        page:'smrzfr',
        qyfrList: [
          {
            value: '事业单位',
            label: '事业单位'
          }, {
            value: '行政单位',
            label: '行政单位'
          }, {
            value: '社团',
            label: '社团'
          }, {
            value: '民非',
            label: '民非'
          }, {
            value: '基金会',
            label: '基金会'
          }, {
            value: '养老机构',
            label: '养老机构'
          }, {
            value: '律师事务所',
            label: '律师事务所'
          }, {
            value: '其他非企业法人',
            label: '其他非企业法人'
          }
        ],
        checkList:['身份证','银行'],
        checkList2:[],
        nationList:[
          {
            value: '汉族',
            label: '汉族'
          }, {
            value: '满族',
            label: '满族'
          }, {
            value: '藏族',
            label: '藏族'
          }, {
            value: '回族',
            label: '回族'
          }
        ],
        company: {
          qylx:'',
          qymc:'',
          xydm:'',
          qyfzr:'',
          qyfzrmz:'',
          qyfzrsfz:'',
          yjdz:'',
          ktfs:'网上注册',
          zhzt:'登记'
        },
        bankList:[
          {
            value: '中国工商银行',
            label: '中国工商银行'
          }, {
            value: '中国建设银行',
            label: '中国建设银行'
          }, {
            value: '中国农业银行',
            label: '中国农业银行'
          }, {
            value: '中国银行',
            label: '中国银行'
          }, {
            value: '花旗银行',
            label: '花旗银行'
          }
        ],
        xyzsList:[]
      }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            let _self = this;
            
          }
        })
      },
      handleRemove() {

      },
      handlePreview() {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
.tab {
  width: 740px;
  margin: auto;
  padding-top: 20px;
}
.smrz-right--title{font-size: 16px;font-weight: bold;line-height: 2em;padding:31px 100px 0}
.el-disable{
  background: #bfcbd9;
  cursor: not-allowed;
}
.pcnenter__center{width: 1260px;margin:0 auto 20px;overflow: hidden;}
.pcnenter__left{float: left;}
.smrz-right{float: right;width: 1000px;overflow: hidden;border:1px dashed #ccc;}
</style>
<style>
  .tab .el-input{
    width: 413px;
  }
</style>
