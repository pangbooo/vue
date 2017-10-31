/*
 * @文档描述: 未登录信息提醒
 * @参数: back Boolean型 取消是否返回上一页 true(默认) 返回  false 不返回
 * @参数: message String型 自定义提示信息
 * @作者: 孔祥超 
 * @创建时间: 2017-09-29 15:56:59 
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-09-30 08:32:29
 */
<template>
    <div>
        <el-dialog :custom-class="'loginmessage__dialog'" top="30%" :visible.sync="dialogVisible" size="tiny" :close-on-press-escape="false" :show-close="false" :close-on-click-modal="false" :lock-scroll="true">
            <div class="loginmessage">
                <el-alert title="注册成功,但尚未实名认证" type="success" :description="message" show-icon :closable="false"></el-alert>
                <div class="loginmessage__btn">
                    <el-button type="info" @click="quickLogin()">前往认证</el-button>
                    <el-button @click="closeDialog">稍后再说</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        back: {
            type: Boolean,
            default: true
        },
        message: {
            type: String,
            default: '是否立即前往实名认证？也可稍后前往个人中心自行认证。'
        }
    },
    data() {
        return {
            dialogVisible: true
        }
    },
    methods: {
        closeDialog() {
            this.dialogVisible = false;
            if(localStorage.getItem("history")){
                window.location.href = localStorage.getItem("history");
                localStorage.setItem("history",'');
            }else{
                window.location.href = '/';
            }
        },
        quickLogin() {
            this.$emit('quickLogin', true);
        }
    }
}
</script>

<style scoped>
.loginmessage__btn {
    margin-top: 20px;
    text-align: center;
}
</style>
<style>
.loginmessage__dialog .el-dialog__body {
    padding: 10px 20px 20px;
}
</style>

