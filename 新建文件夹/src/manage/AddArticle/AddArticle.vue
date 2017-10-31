<!-- 
    添加文章模板
    作者：李文达Leo
    日期：2017.7.25
 -->
<template>
    <div class="tjwz__wrapper" >
        <div class="tjwz__topnav">
            <el-row>
                <el-col :span="18">
                    <el-button-group>
                        <el-button type="primary" size="small" icon="plus" @click="newWz">新增下一条</el-button>
                        <!--el-button type="primary" size="small" icon="circle-check">一键导入</el-button-->
                        <!--el-button type="primary" size="small" icon="view">弹出预览</el-button-->
                        <el-button type="success" size="small" icon="check" @click="saveWz">暂存</el-button>
                        <el-button type="warning" size="small" icon="upload2" @click="publishWz">发布</el-button>
                    </el-button-group>
                    <el-button type="primary" size="small" >立即审核</el-button>
                        <!--el-button type="primary" size="small" >审核记录</el-button-->
                </el-col>
                <el-col :span="6" align="right">
                    <el-button type="danger" size="small" icon="close" @click="closeDelog">关闭</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="tjwz__main">
            <div class="tjwz__mainbg">
                <v-main ref='vmain' :form="form" :customFields="customFields" v-on:saveWz="saveWz" :lmmc="lmmc"></v-main>
            </div>
        </div>
        <div class="tywz__extraform">
            <v-extraform ref='vextraform' :form="extraForm" :lmmc="lmmc"></v-extraform>
        </div>
    </div>
</template>

<script>
import extraform from '@/manage/AddArticle/extraForm';
import mainForm from '@/manage/AddArticle/mainForm';

import tjwz from '@/services/manage/tjwz/tjwz';
import saveData from '@/services/manage/wzgl/saveWz';
import getWZData from '@/services/manage/wzgl/getWZData';
import getLmzdyzd from '@/services/manage/wzgl/getLmzdyzd';
let Base64 = require('js-base64');
if(!Base64.decode){
  Base64 = Base64.Base64;
}
    export default {
        name: 'AddArticle',
        components: {
            'v-extraform': extraform,
            'v-main': mainForm
        },
        props:{
            lmid: {
                type:String,
                default:''
            },
            lmmc: {
                type:String,
                default:''
            },
            uuid: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                customFields: [],
                checkBoxFields: [],
                form: {
                    UUID: '',
                    文章标题: '',
                    内容标题: '',
                    短标题: '',
                    副标题: '',
                    标题图: '',
                    标题图ID: '',
                    引题: '',
                    作者: '',// 作者、编辑、来源
                    编辑: '',
                    来源: '',
                    跳转链接: '',
                    标签: '',// 标签、关键字
                    关键字: '',
                    内容摘要: '',
                    是否显示: '1', // 默认1显示
                    是否置顶: '0', // 默认0不置顶
                    重要性: 10,
                    点击率: '',
                    发布时间: new Date().getTime(),
                    下线时间: '',
                    文章内容: '',
                    评论标识: '0', // 默认0禁止评论
                    附件: '',
                    字段1: '',
                    字段2: '',
                    字段3: '',
                    字段4: '',
                    字段5: '',
                    字段6: '',
                    字段7: '',
                    字段8: '',
                    字段9: '',
                    字段10: '',
                    字段11: '',
                    字段12: '',
                    字段13: '',
                    字段14: '',
                    字段15: ''
                },
                extraForm: {
                    发布时间: '',
                    下线时间: '',
                    重要性: 10,
                    点击率: '',
                    是否置顶: '0',
                    是否显示: '1',
                    评论标识: '0',
                }
            }
        },
        created() {
            if (this.uuid) {
                this.initForm().then(() => {
                    this.initCustomFields();
                });
            } else {
                this.initCustomFields();
            }
            
        },
        methods: {
            // 关闭添加文章弹窗
            closeDelog: function(){
                this.$emit("close-Window",false)
            },
            initForm() {
                return getWZData({UUID: this.uuid}).then(res => {
                    if(res.status == 'success'){
                        this.form = $.extend({},this.form,res.data);
                        for (let obj in this.extraForm) {
                            this.extraForm[obj] = this.form[obj];
                        }
                    }else{
                        this.$message.error('服务器故障，请联系管理员处理！');
                    }
                }).catch(res => {
                    this.$message.error('网络连接异常，请检查网络！');
                });
            },
            initCustomFields() {
                getLmzdyzd({lmid: this.lmid}).then(res => {
                    if(res.status == 'success'){
                        this.customFields = res.data;
                        for(let i = 0 , len = this.customFields.length; i < len; i ++) {
                            if (this.customFields[i].ZDLX === '复选框') {
                                this.form[this.customFields[i].YLZD] = this.form[this.customFields[i].YLZD] === '' ? [] : this.form[this.customFields[i].YLZD].split(',');
                                this.checkBoxFields.push(this.customFields[i].YLZD);
                            }
                        }
                    }else{
                        this.$message.error('服务器故障，请联系管理员处理！');
                    }
                });
            },
            newWz() {
                this.$emit('reload-Window');
            },
            saveWz() {
                let vmain = this.$refs.vmain;
                vmain.$refs.form.validate((valid) => {
                if (valid) {
                   vmain.getUEContent();
                    let mainForm = vmain.form;
                    mainForm.文章内容 = Base64.encode(mainForm.文章内容);
                    for (let i = 0, len = this.checkBoxFields.length; i < len; i ++) {
                        mainForm[this.checkBoxFields[i]] = mainForm[this.checkBoxFields[i]].toString();
                    }
                    let params = Object.assign(this.form, mainForm, this.$refs.vextraform.form);
                    saveData(params, [this.lmid]).then(res => {
                        if(res.status === "success"){
                            this.$message.success('保存成功！');
                            this.form.UUID = res.data.UUID;
                            for (let i = 0, len = this.checkBoxFields.length; i < len; i ++) {
                                mainForm[this.checkBoxFields[i]] = mainForm[this.checkBoxFields[i]].split(',');
                            }
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(res => {
                        this.$message.error('网络连接异常，请检查网络！');
                    });
                    }
                });
                
            },
            publishWz: function(){
                this.form.发布时间 = new Date().getTime();
                this.saveWz();
            },
        }
    }
</script>

<style type="text/css">
    body{
        min-width: 1100px;
    }
    /*leo 添加文章css  */
    .tjwz__wrapper{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #f1f1f1;
    }
    .tjwz__topnav{
       padding: 5px; 
    }
    .tjwz__topnav table{
        width:100%;
        border:0;
    }
    .tjwz__topnav tr{
        height: 30px;
    }
    .tjwz__topnav td{
       vertical-align: middle; 
    }
    .tjwz__topnav .funButton {
        height: 24px;
        font-size: 12px;
        background: #4db3ff;
        border:none;
        color: #fff;
        border-radius: 3px;
        padding: 2px 4px;
        cursor: pointer;
    }
    .tjwz__topnav .funButton:hover{
        background-color:#1d90e6; 
    }
    .tjwz__main{
        position: absolute;
        right: 255px;
        left: 0px;
        top: 36px;
        bottom: 0px;
        width: auto;
        overflow: auto;
        background-color: #FFFFFF;
        padding-left: 5px;
        _padding-right: 5px;
    }
    .tywz__extraform{
        position: absolute;
        top: 36px;
        right: 0px;
        bottom: 0px;
        width: 250px;
        _height: 97%;
        overflow-x: hidden;
        overflow: auto;
        background-color: #F9F9F9;
        z-index: 2;
        padding-right: 4px;
        _padding-right: 0px;
    }
    .tjwz__mainbg{
        min-width: 900px;
        background: #535353;
        overflow: auto;
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
</style>


