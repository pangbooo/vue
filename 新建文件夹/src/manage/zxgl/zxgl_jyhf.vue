/** 
 * 文档描述: 建议回复
 * 作者: 杨闯 
 * 创建时间: 2017-10-12 10:53:27 
 * 最后修改人: 杨闯 
 * 最后修改时间: 2017-10-12 10:53:27 
 */
<template>
<div>
    <div class="center">
        <el-form ref="ruleForm" class="form" :model="ruleForm" :inline="true">
            <el-form-item label="建议标题" class="title">
                <el-input v-model="ruleForm.title" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="受理单位" class="name">
                <el-input v-model="ruleForm.regiondw" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="建议内容" class="content">
                <el-input :rows="3"  resize="none" type="textarea" v-model="ruleForm.content" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="您的姓名" class="name">
                <el-input v-model="ruleForm.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="您的电话" class="phone">
                <el-input v-model.number="ruleForm.phone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="您的邮箱" class="qqaddress">
                <el-input v-model="ruleForm.qqaddress" :disabled="true"></el-input>  
            </el-form-item>
            <el-form-item label="您的性别" class="sex">
                <el-input v-model="ruleForm.sex" :disabled="true"></el-input>  
            </el-form-item>
            <el-form-item label="答复方式" class="answer">
                <el-input v-model="ruleForm.answer" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="是否公开" class="yesNo">
                <el-input v-model="ruleForm.yesNo" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="回复人" class="address">
                <el-input v-model="ruleForm.replypeople"></el-input>
            </el-form-item>
            <el-form-item label="是否采纳" class="cn">
                <el-radio-group v-model="ruleForm.cn">
                    <el-radio v-for="(item,index) in sfgk" :key="index" :label="item.text"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="回复内容" class="content">
                <el-input :rows="3"  resize="none" type="textarea" v-model="ruleForm.replycontent"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="success" @click="submitForm('ruleForm')">提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
                <el-button class="reset" type="warning" @click="resetForm">关&nbsp;&nbsp;&nbsp;&nbsp;闭</el-button>
            </el-form-item>
            <!-- <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                size="tiny">
                <span>您确定要执行重置操作吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false,resetForm('ruleForm')">确 定</el-button>
                </span>
            </el-dialog> -->
        </el-form>
    </div>
</div>     
</template>

<script>
import { queryString } from '@/lib/publicFun.js';
import getjyll from '@/services/common/zxts/wyjy/jyll';
import { tableIds } from '@/api/tableId.js';
import { webSaveMyForm } from '@/api/manage.js'
import { getTime } from '@/lib/publicFun.js';
export default {
    data() {
        return{
            uuid: '',
            ruleForm: {
                title: '',
                content: '',
                name: '',
                company: '',
                phone: '',
                address: '',
                answer: '',
                yesNo: '',
                replypeople: '',
                replycontent: '',
                cn: '',
            },
            dialogVisible: false,
            sfgk:[
                {id:1,text:"是",value:"是"},
                {id:2,text:"否",value:"否"} 
            ]
        }
    },
    created() {
        this.uuid = queryString('UUID');
        this.getjyll();
    },
    methods: {
        getjyll(){
            let params = {
                  tableId:tableIds.在线建议,
                  uuid: this.uuid,
                  isll: true
            };
            getjyll(params).then(res=>{
                if(res.status === "success"){
                    this.ruleForm.name=res.data.您的姓名;
                    this.ruleForm.regiondw=res.data.单位名称;
                    this.ruleForm.title=res.data.建议标题;
                    this.ruleForm.phone=res.data.您的电话;
                    this.ruleForm.content=res.data.建议内容;
                    this.ruleForm.qqaddress=res.data.您的邮箱;
                    this.ruleForm.sex=res.data.您的性别;
                    this.ruleForm.answer=res.data.答复方式;
                    this.ruleForm.yesNo=res.data.是否公开;
                    this.ruleForm.replypeople=res.data.回复人;
                    this.ruleForm.replycontent=res.data.回复内容;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        submitForm(formName) {
            this.uuid = queryString('UUID');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        tableId: tableIds.在线建议,
                        ownerColname: '登记人账户',
                        params: {
                            UUID: this.uuid,
                            回复人: this.ruleForm.replypeople,
                            回复内容: this.ruleForm.replycontent,
                            是否采纳: this.ruleForm.cn,
                            回复时间: getTime(),
                        }
                    }
                    webSaveMyForm(param).then(res => {
                        if (res.status === 'success') {
                            this.$message.success('恭喜您，提交成功！');
                            this.$router.push({path:'/wyjy'});
                        } else {
                            this.$message.error('提交失败!');
                        }
                    }).catch(res => {
                        this.$message.error('网络连接异常，请检查网络连接！');
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            // this.ruleForm.replypeople = '';
            // this.ruleForm.replycontent = '';
            this.$router.push({path:'/wyjy'});
        },
    }
}
</script>

<style>
.center{width:80%;margin: 0px auto;}
.el-form-item{width: 100%;}
.name,.select,.phone,.yesNo,.answer,.title,.sex,.qqaddress,.address,.cn{width: 48%;}
.content{width: 100%;}
.content .el-form-item__label{width: 9.6%;}
.content .el-form-item__content{width: 88.1%;}
.el-form-item__content{width: 80%;}
.el-form-item__label{width: 20%;}
.el-button+.el-button{margin-left: 100px;}
.submit{margin-left: 42%;}
.el-input.is-disabled .el-input__inner{color:#000;}
.el-textarea.is-disabled .el-textarea__inner{color:#000;}
</style>
