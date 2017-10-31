/*
 * @文档描述: 栏目管理下的属性
 * @参数: lmid
 * @作者: rita.ma 
 * @创建时间: 2017-10-13 09:26:28 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-13 10:43:46
 */

<template>
<div>
    <el-form ref="formsx" :rules="savesxrule" :model="formsx" label-width="120px">
        <div class="sx__form">
            <el-form-item label="显示名称" prop="LMMC">
                <el-input v-model="formsx.LMMC"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip">显示在网站导航上的名称，最多由200个字符组成</span>
            <el-form-item label="栏目代码" prop="LMDM">
                <el-input v-model="formsx.LMDM"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip">首页栏目的栏目代码必须为index</span>
            <el-form-item label="栏目图标" prop="LMTB">
                <el-input v-model="formsx.LMTB"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip">用于设置栏目的图标</span>
            <el-form-item label="栏目描述" prop="LMMS">
                <el-input v-model="formsx.LMMS"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip">用于设置栏目的介绍</span>
            <el-form-item label="导航显示" prop="DHXS">
                <el-select v-model="formsx.DHXS" placeholder="请选择导航显示" class="sx__form__select">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <span class="lmgl__sx__tip">用于设置栏目是否在导航栏显示</span>
            <el-form-item label="主模板" v-if="jblxshow" prop="ZMB">
                <el-input v-model="formsx.ZMB" icon="document" :on-icon-click="selectZMB"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip" v-if="jblxshow">首页栏目的模板必须是/index.jsp<a class="sx__tip--editor" href="javascript:void(0)">编辑模板</a></span>
            <el-form-item label="文章内容页" v-if="jblxshow">
                <el-input v-model="formsx.WZNRY" icon="document" :on-icon-click="selectZMB" placeholder="默认模板：/content.jsp"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip" v-if="jblxshow">显示栏目文章内容的模板</span>                                
            <el-form-item label="组图内容页" v-if="jblxshow">
                <el-input v-model="formsx.ZTNRY" icon="document" :on-icon-click="selectZMB" placeholder="上级栏目、首页栏目未设置对应模板，默认模板也未设置"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip" v-if="jblxshow">显示栏目组图内容的模板,若不使用组图类文章则无需设置</span>                                
            <el-form-item label="全文检索结果页" v-if="jblxshow">
                <el-input v-model="formsx.QWJSY" icon="document" :on-icon-click="selectZMB" placeholder="默认模板：/ssjgy.jsp "></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip" v-if="jblxshow">显示全文检索到的文章</span>
            <el-form-item label="链接" v-if="ljlxshow" prop="ZMB">
                <el-input v-model="formsx.ZMB" icon="document" :on-icon-click="selectZMB"></el-input>
            </el-form-item>
            <span class="lmgl__sx__tip" v-if="ljlxshow">录入或选择本栏目指向的链接地址</span>
            <el-form-item label="所属部门" prop="SSBM">
                <el-select v-model="formsx.SSBM" placeholder="请选择" class="sx__form__select">
                    <el-option v-for="(item,index) in ssbm" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <span class="lmgl__sx__tip">设定本栏目的资料属于哪个部门<br>未设定时继承上级栏目的设定<br>部门在“站群管理->用户与组织->组织机构”处维护</span>
            <el-form-item>
                <el-button @click="resetForm('formsx')">重置</el-button>
                <el-button type="primary" @click="saveSX('formsx')">保存</el-button>            
            </el-form-item>
        </div>
    </el-form>
</div>
</template>

<script>
import getSX from '@/services/manage/lmgl/getSX.js';

export default {
    data() {
        return {
            formsx: {
                LMMC: '',
                LMDM: '',
                LMTB: '',
                LMMS: '',
                DHXS: '',
                SSBM: '',
                ZMB: '',
                WZNRY: '',
                ZTNRY: '',
                QWJSY: '',


            },
            ssbm: [
                { label: '未设定所属部门', value: '' }
            ],
            savesxrule: {

            },
            ljlxshow: false,
            jblxshow: false,
        }
    },
    props: { 
        lmid: {
            type: String,
            default: ''
        }
    },
    watch: {
        lmid(val,oldVal){
            if(val){
                this.getData(val);
            }
        }
    },
    created() {

    },
    methods: {
        getData(val){
            getSX({ uuid: val }).then(res => {
                if(res.status === "success"){
                    console.log(res);
                    if(res.data[0].LMLX === "链接"){
                        this.ljlxshow = true;
                        this.jblxshow = false;
                        this.formsx = res.data[0];
                    }else if(res.data[0].LMLX === "基本"){
                        this.ljlxshow = false;
                        this.jblxshow = true;
                        this.formsx = res.data[0];                        
                    }else{
                        this.ljlxshow = false;
                        this.jblxshow = false;
                        this.formsx = res.data[0];
                    }
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络 ！');
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        saveSX(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    return false;
                }
            });
        },
        selectZMB(){
            this.$message.error('功能待开发');
        }
    },
    components: {

    }
}
</script>

<style scoped>
.sx__form{
    width: 500px;
    margin: 0 auto
}
.lmgl__sx__tip{
    margin-left: 120px;
    margin-top: -15px;
    margin-bottom: 15px;
    display: block;
    color: #ff8e49;
}
</style>