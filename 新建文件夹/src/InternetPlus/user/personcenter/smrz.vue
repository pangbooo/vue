/* 
    描述：个人中心-实名认证
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
          <el-form :model="user" ref="user" label-width="120px">
            <el-form-item prop='sjh' label="手机号" >
              <el-input v-model="user.sjh" placeholder="请填写有效的手机号"></el-input>
            </el-form-item>
            <el-form-item prop='dxcode' class="item-yzm" label="短信验证码">
              <el-input id="checkCode" class="item-yzm2" v-model="user.dxcode" placeholder="短信验证码"></el-input>
              <el-button type="primary" class="send-dxyzm" @click="sendDXcode">{{codemess}}</el-button>
            </el-form-item>
            <el-form-item prop='zsxm' label="真实姓名">
              <el-input v-model="user.zsxm" placeholder="真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="请选择验证方式">
              <el-checkbox-group v-model="checkList" @change="changeRenZheng">
                <el-checkbox label="身份证"></el-checkbox>
                <el-checkbox label="社保卡"></el-checkbox>
                <el-checkbox label="银行"></el-checkbox>
                <el-checkbox label="视频认证"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="checkList2" @change="changeRenZheng2">
                <el-checkbox label="支付宝"></el-checkbox>
              </el-checkbox-group>
              <p style="color:red;">*身份证、社保卡、银行卡 、视频认证任选其中两项认证，如果选择支付宝单独一项即可认证</p>
            </el-form-item>
            <el-form-item v-show="checkList.indexOf('身份证')!=-1" :prop="checkList.indexOf('身份证')!=-1?'sfzh':''" label="身份证号">
              <el-input v-model="user.sfzh" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item v-show="checkList.indexOf('社保卡')!=-1" :prop="checkList.indexOf('社保卡')!=-1?'sbhm':''" label="社保号">
              <el-input v-model="user.sbhm" placeholder="社保号"></el-input>
            </el-form-item>
            <el-form-item v-show="checkList.indexOf('银行')!=-1" :prop="checkList.indexOf('银行')!=-1?'khh':''" label="选择银行">
              <el-select v-model="user.khh" placeholder="选择银行" class="item-select">
              <el-option
                  v-for="item in bankList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="checkList.indexOf('银行')!=-1" :prop="checkList.indexOf('银行')!=-1?'yhkh':''" label="银行卡号">
              <el-input v-model="user.yhkh" placeholder="银行卡号"></el-input>
            </el-form-item>
            <el-form-item v-show="checkList2.indexOf('支付宝')!=-1" :prop="checkList.indexOf('支付宝')!=-1?'zfb':''" label="支付宝">
              <el-input v-model="user.zfb" placeholder="支付宝"></el-input>
            </el-form-item>
            <el-form-item prop='yjdz' label="邮寄地址">
              <el-input v-model="user.yjdz" placeholder="邮寄地址"></el-input>
            </el-form-item>
            <el-form-item prop='dzyx' label="电子邮箱">
              <el-input v-model="user.dzyx" placeholder="电子邮箱"></el-input>
            </el-form-item>
            <el-form-item prop='mz' label="民族">
              <el-select v-model="user.mz" placeholder="民族" class="item-select">
              <el-option
                  v-for="item in nationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop='mz' label="">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="sfzList">
                <el-button size="small" type="primary">点击上传身份证照片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="" >
              <el-button type="primary" @click="login('user')">提交</el-button>
              <el-button @click="resetForm('user')">重置</el-button>
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
        page:'smrz',
        grzc: true,
        user: {
          sjh: '',
          dxcode: '',
          ktfs:'网上注册',
          zhzt:'登记',
          zsxm:'',
          sfzh:'',
          sbhm:'',
          khh:'',
          yhkh:'',
          zfb:'',
          yjdz:'',
          dzyx:'',
          mz:''
        },
        codemess:"获取验证码",
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
        sfzList:[],
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
      },
      changeRenZheng(val) {
        if(val.length>0){
          this.checkList2 = []
        }
        if(val.length==3){
          this.checkList.splice(0,1)
        }
      },
       sendDXcode() {
        sendDXcode().then(data => {
            console.log(data.status)
            this.codemess = "成功，请查看手机"
        });
      },
      changeRenZheng2(val) {
        if(val.length>0){
          this.checkList = []
        }
      }
    }
  }
</script>

<style scoped>
.tab {
  width: 640px;
  margin: auto;
  padding-top: 20px;
}
.smrz-right--title{font-size: 16px;font-weight: bold;line-height: 2em;padding:40px 100px 0}
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