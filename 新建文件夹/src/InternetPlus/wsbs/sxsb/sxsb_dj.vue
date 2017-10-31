/** 
 * 文档描述: 网上办事-事项申报
 * 作者: rita.ma 
 * 创建时间: 2017-09-21 16:41:45 
 * 最后修改人: rita.ma 
 * 最后修改时间: 2017-09-21 16:41:45 
 */

<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="sxsbdj" id="sxsbdj">
        <div class="sxsbdj__content">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            <div class="sxsbdj__content__wrap">
                <!-- <div class="sxsbdj__left">
                    <idt-personinfo></idt-personinfo>
                </div> -->
                <div class="sxsbdj__right">
                    <div class="sxsbdj__right__title">在线申报</div>
                    <ul class="sxsbdj__right__prograss">
                        <li :class="active === 1 ? 'sxsbdj__right__prograss__li--active' : ''">申报信息</li>
                        <li :class="active === 2 ? 'sxsbdj__right__prograss__li--active' : ''">提交材料</li>
                        <li :class="active === 3 ? 'sxsbdj__right__prograss__li--active' : ''">申报告知</li>
                        <li class="sxsbdj__right__prograss__lastli" :class="active === 4 ? 'sxsbdj__right__prograss__li--active' : ''">完成</li>
                    </ul>
                    <div v-show="progress1">
                        <div class="sxsbdj__right__sxjbinfo">
                            <div class="sxsbdj__right__sxjbinfo__title">事项基本信息</div>
                            <el-row class="sxsbdj__right__sxjbinfo__row">
                                <el-col :span="4" class="sxsbdj__right__sxjbinfo__head">事项名称：</el-col>
                                <el-col :span="8" class="contentoverflow sxsbdj__right__sxjbinfo__content" :title="obj.职权名称">{{ obj.职权名称 }}</el-col>
                                <el-col :span="4" class="sxsbdj__right__sxjbinfo__head">事项编码：</el-col>
                                <el-col :span="8" class="sxsbdj__right__sxjbinfo__content">{{ obj.职权编码 }}</el-col>
                            </el-row>
                            <el-row class="sxsbdj__right__sxjbinfo__row">
                                <el-col :span="4" class="sxsbdj__right__sxjbinfo__head">受理单位：</el-col>
                                <el-col :span="8" class="sxsbdj__right__sxjbinfo__content">{{ obj.单位名称 }}</el-col>
                                <el-col :span="4" class="sxsbdj__right__sxjbinfo__head">承诺期限：</el-col>
                                <el-col :span="8" class="sxsbdj__right__sxjbinfo__content">{{ obj.承诺时限 }}</el-col>
                            </el-row>
                            <el-row class="sxsbdj__right__sxjbinfo__row">
                                <el-col :span="4" class="sxsbdj__right__sxjbinfo__head">咨询电话：</el-col>
                                <el-col :span="8" class="sxsbdj__right__sxjbinfo__content">{{ obj.联系电话 }}</el-col>
                                <el-col :span="4" class="sxsbdj__right__sxjbinfo__head">办事地点：</el-col>
                                <el-col :span="8" class="sxsbdj__right__sxjbinfo__content">{{ obj.办理地点 }}</el-col>
                            </el-row>
                        </div>
                        <div class="sxsbdj__right__grinfo">
                            <div v-if="userType === '个人'" class="sxsbdj__right__grinfo__title sxsbdj__right__grinfo__titlebottom">个人基本信息</div>
                            <div v-if="userType === '法人'" class="sxsbdj__right__grinfo__title sxsbdj__right__grinfo__titlebottom">企业基本信息</div>
                            <el-form :model="formdj" :rules="userType === '个人' ? rules : rules2" ref="ruleForm" label-width="125px" class="demo-ruleForm">
                                <el-row>
                                    <el-col v-if="userType === '法人'" :span="24">
                                        <el-form-item label="企业名称" prop="申请单位/人">
                                            <el-input v-model="formdj['申请单位/人']"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col v-if="userType === '法人'" :span="12">
                                        <el-form-item label="法人姓名" prop="法定代表人">
                                            <el-input v-model="formdj['法定代表人']"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col v-if="userType === '个人'" :span="12">
                                        <el-form-item label="申报人姓名" prop="申请单位/人">
                                            <el-input v-model="formdj['申请单位/人']"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="身份证号" prop="身份证">
                                            <el-input v-model="formdj.身份证"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col v-if="userType === '法人'" :span="12">
                                        <el-form-item label="联系人姓名" prop="办事人姓名">
                                            <el-input v-model="formdj.办事人姓名"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="手机" prop="移动电话">
                                            <el-input v-model="formdj.移动电话"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col v-if="userType === '法人'" :span="12">
                                        <el-form-item label="联系人身份证" prop="身份证号">
                                            <el-input v-model="formdj.身份证号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col v-if="userType === '法人'" :span="12">
                                        <el-form-item label="联系人电话" prop="固定电话">
                                            <el-input v-model="formdj.固定电话" placeholder="xxxx-xxxxxxx"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="邮编" prop="邮编">
                                            <el-input v-model="formdj.邮编"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="是否邮寄" prop="是否邮寄">
                                            <el-radio-group v-model="formdj.是否邮寄">
                                                <el-radio label="是"></el-radio>
                                                <el-radio label="否"></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col v-if="userType === '个人'" :span="12">
                                        <el-form-item label="通讯地址" prop="地址">
                                            <el-input v-model="formdj.地址"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col v-if="userType === '法人'" :span="24">
                                        <el-form-item label="通讯地址" prop="地址">
                                            <el-input v-model="formdj.地址"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="备注" prop="备注">
                                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="formdj.备注" ></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="sxsbdj__right__grinfo__btn">
                                    <el-button @click="resetformdj('ruleForm')" type="primary">重置</el-button>
                                    <el-button @click="oneToTwo('ruleForm')" type="primary">下一步</el-button>
                                </el-row>
                            </el-form>
                        </div>
                    </div>
                    <div class="sxsbdj__right__table" v-show="progress2">
                        <el-table ref="singleTable" :data="obj.cllist" tooltip-effect="light" style="width: 100%">
                            <el-table-column type="index" label="序号" width="70"></el-table-column>
                            <el-table-column show-overflow-tooltip label="材料名称">
                                <template scope="scope">
                                    <span v-if="scope.row.saved" class="sxsbdj__tjcl__clmc--file" @click="fujianDownload">{{ scope.row.MATERIAL_NAME }}</span>
                                    <span v-else class="sxsbdj__tjcl__clmc">{{ scope.row.MATERIAL_NAME }}</span>
                                    <img v-if="scope.row.saved" class="sxsbdj__tjcl__clmc__icon" src="./img/对号.png">
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="105">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.saved" size="small" @click="showUpload(scope.$index,scope.row)" type="primary">上传附件</el-button>
                                    <el-button v-if="scope.row.saved && !scope.row.online" size="small" @click="showUpload(scope.$index,scope.row)" type="primary">重新上传</el-button>
                                    <el-button v-if="scope.row.saved && scope.row.online" size="small" @click="showUpload(scope.$index,scope.row)" type="primary">材料确认</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row class="sxsbdj__right__tjcl__btn">
                            <el-button @click="returnOne" type="primary">上一步</el-button>
                            <el-button @click="twoToThree" type="primary">下一步</el-button>
                        </el-row>
                    </div>
                    <div class="sxsbdj__right__sbgz" v-show="progress3">
                        <!-- <div class="sxsbdj__right__sbgz__title">申报告知书</div> -->
                        <div class="sxsbdj__right__sbgz__content">
                            <h1>申请通知书</h1>
                            <span class="sxsbdj__right__sbgz__content__sqrxm">{{formdj['申请单位/人']}}：</span>
                            <div class="sxsbdj__right__sbgz__content__sqrnr">
                                你（单位）提出的
                                <span class="sxsbdj__right__sbgz__content__sqsxmc">{{ obj.职权名称 }}</span>
                                申请和所提供的材料，已经提交给相关负责人员。我们会依据相关法律法规对材料内容进行审核，审核后
                                决定是否予以受理，处理结果会公布在该网站上，请您留意查收。
                            </div>
                            <img class="sxsbdj__right__sbgz__content__ewm" src="./img/二维码.png" alt="图片加载失败">
                            <div class="sxsbdj__right__sbgz__content__ewmnr">
                                <p>查询编号：<span>940325</span></p>
                                <p>查询密码：<span>931217</span></p>
                                <p>请牢记您的查询编号、密码</p>
                                <p>可扫描二维码查看办件进度</p>
                            </div>
                            <div class="sxsbdj__right__sbgz__content__foot">
                                {{new Date(parseInt(formdj.事项提交时间)).pattern('yyyy')}}年 {{new Date(parseInt(formdj.事项提交时间)).pattern('MM')}}月 {{new Date(parseInt(formdj.事项提交时间)).pattern('dd')}}日
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                        <el-row class="sxsbdj__right__grinfo__btn">
                            <el-button @click="returnTwo" type="primary">上一步</el-button>
                            <el-button @click="ThreeToFour" type="primary">下一步</el-button>
                        </el-row>
                    </div>
                    <div class="sxsbdj__right__finish" v-show="progress4">
                        <img src="./img/finish.png" alt="图片加载失败，但是您已经办理完毕">
                        <div class="sxsbdj__right__finish__tip">提交完成，请耐心等待回复。</div>
                    </div>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
    <idt-loginmessage v-if="dialogVisible" @quickLogin="showLogin"></idt-loginmessage>
    <idt-quicklogin v-if="logindialogVisible" @loginSuccess="loginSuccess"></idt-quicklogin>
    <el-dialog title="文件上传" :visible.sync="uploadVisible" @close="closeUpload">
        <el-tabs type="border-card" class="sxsbdj__cltj__fileupload">
            <el-tab-pane label="在线管理">
                <div class="sxsbdj__cltj__zxgl clr">
                    <div class="sxsbdj__cltj__zxgl__preview">
                        <img :src="presrc" class="sxsbdj__cltj__zxgl__img--pre" title="孙辉身份证">
                        
                        <i class="el-icon-circle-check sxsbdj__cltj__zxgl__icon"></i>
                        <span class="sxsbdj__cltj__zxgl__title">{{prems}}</span>
                    </div>
                    <ul class="sxsbdj__cltj__zxgl__list">
                        <li :class="{'selected': IDcard}">
                            <img @click="previewFile(0)" src="./img/孙辉身份证.jpg" class="sxsbdj__cltj__zxgl__img" title="孙辉身份证">
                            <i class="el-icon-circle-check sxsbdj__cltj__zxgl__icon"></i>
                        </li>
                        <li :class="{'selected': yylicense}">
                            <img @click="previewFile(1)" src="./img/营业执照-正本.jpg" class="sxsbdj__cltj__zxgl__img" title="营业执照-正本">
                            <i class="el-icon-circle-check sxsbdj__cltj__zxgl__icon"></i>
                        </li>
                    </ul>
                </div>
                <!-- <div class="sxsbdj__cltj__zxgl" :class="{'selected': IDcard}">
                    <img @click="selectFile(0)" src="./img/孙辉身份证.jpg" class="sxsbdj__cltj__zxgl__img" title="孙辉身份证">
                    <i class="el-icon-circle-check sxsbdj__cltj__zxgl__icon"></i>
                    <span class="sxsbdj__cltj__zxgl__title">孙辉身份证.jpg</span>
                </div>
                <div class="sxsbdj__cltj__zxgl" :class="{'selected': yylicense}">
                    <img @click="selectFile(1)" src="./img/营业执照-正本.jpg" class="sxsbdj__cltj__zxgl__img" title="营业执照-正本">
                    <i class="el-icon-circle-check sxsbdj__cltj__zxgl__icon"></i>
                    <span class="sxsbdj__cltj__zxgl__title">营业执照-正本.jpg</span>                    
                </div> -->
                <div class="sxsbdj__tjcl__btn">
                    <el-button @click="fujianUploadOnline(vindex,vobj)" type="primary">确定</el-button>
                    <el-button @click="closeUpload" type="primary">取消</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="本地上传">
                <div v-if="file.length === 0" class="sxsbdj__tjcl__upload">
                    <input type="file" class="sxsbdj__right__table__file" @change="getFile($event)" />                    
                    <el-button type="primary" icon="upload">请选择上传的文件</el-button>
                </div>
                <ul class="sxsbdj__tjcl__filelist" v-show="file.length > 0">
                    <li v-for="(item,index) in file" :key="index">
                        <i class="el-icon-document sxsbdj__tjcl__filelist__doc"></i>
                        <span class="sxsbdj__tjcl__filelist__filename" :title="item.name">{{ item.name }}</span>
                        <i class="el-icon-circle-check sxsbdj__tjcl__filelist__check"></i>
                        <i class="el-icon-close sxsbdj__tjcl__filelist__delete" @click="deleteFile(index)"></i>
                    </li>
                </ul>
                <div v-show="file.length > 0" class="sxsbdj__tjcl__btn">
                    <el-button @click="fujianUpload(vindex,vobj)" type="primary">上传</el-button>
                    <el-button @click="closeUpload" type="primary">取消</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="文件搜索">
                <div class="sxsbdj__filesearch">
                    <el-input placeholder="请输入搜索内容" v-model="vsearch">
                        <el-button slot="append" icon="search" @click="searchFile"></el-button>
                    </el-input>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>

</div>    
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header.vue';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';
import loginmessage from '@/InternetPlus/common/loginmessage/loginmessage.vue';
import quicklogin from '@/InternetPlus/common/quicklogin/quicklogin';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';

import { queryString,downloadFile } from '@/lib/publicFun.js';
import { tableIds } from '@/api/tableId.js';
import { webUpload,webDownload,webCommonFileList } from '@/api/common.js';
import { webApplyMatter } from '@/api/manage.js';
import { tokenWhetherPast,getUserAndCompanyManagerInfo } from '@/api/manage.js';
import xzqlqddetail from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqddetail.js';
import { checkMobile,checkIDCard } from '@/lib/verify.js'

let Base64 = require('js-base64');
if(!Base64.decode){
  Base64 = Base64.Base64;
}

export default {
    data() {
        var validategddh = (rule, value, callback) => {
            let idCard = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
            if(idCard.test(this.formdj.固定电话)){
                callback();                
            }else{
                callback(new Error('联系人电话号码有误！请重新输入!'));
            }
        };
        var validateyzbm = (rule, value, callback) => {
            let idCard = /^[a-zA-Z0-9]{3,12}$/;
            if(idCard.test(this.formdj.邮编)){
                callback();                
            }else{
                callback(new Error('邮政编码有误！请重新输入!'));
            }
        };
        return {
            page: 'sxsbdj',
            params: [],
            active: 1,
            progress1: true,
            progress2: false,
            progress3: false,
            progress4: false,
            formdj:{
                UUID: '',
                BLLX: '待受理',
                '申请单位/人': '',
                '身份证': '',
                '办事人姓名': '',
                '移动电话': '',
                '身份证号': '',
                '固定电话': '',
                '邮编': '',
                '是否邮寄': '是',
                '地址': '',
                '备注': '',
                '事项提交时间': '',
                '办件流水号': '',
                '预受理/代申请时间': '',
                '受理方式': '网上',
                '法定代表人': ''
            },
            rules:{
                '申请单位/人': [
                    { required: true, message: '请输入申报人姓名', trigger: 'blur' }
                ],
                '身份证': [
                    { required: true, fieldName:'申报人身份证号', validator: checkIDCard, trigger: 'blur' },
                ],
                '移动电话': [
                    { required: true, fieldName:'申报人手机', validator: checkMobile, trigger: 'blur' },
                ],
                '邮编': [
                    { required: true, message: '请输入邮编', trigger: 'blur' },
                    { validator: validateyzbm, trigger: 'blur' }
                ],
                '是否邮寄': [
                    { required: true, message: '请选择是否邮寄', trigger: 'change' }
                ],
                '地址': [
                    { required: true, message: '请输入通讯地址', trigger: 'blur' }
                ],
                '备注': [
                    { required: false, message: '请输入备注', trigger: 'blur' }
                ]
            },
            rules2:{
                // '申请单位/人': [
                //     { required: true, message: '请输入企业名称', trigger: 'blur' }
                // ],
                // '法定代表人': [
                //     { required: true, message: '请输入法人姓名', trigger: 'blur' }                    
                // ],
                // '身份证': [
                //     { required: true, fieldName:'法人身份证号', validator: checkIDCard, trigger: 'blur' },
                // ],
                // '办事人姓名': [
                //     { required: true, message: '请输入联系人姓名', trigger: 'blur' }
                // ],
                // '移动电话': [
                //     { required: true, fieldName:'联系人手机号', validator: checkMobile, trigger: 'blur' },
                // ],
                // '身份证号': [
                //     { required: true, fieldName:'联系人身份证号', validator: checkIDCard, trigger: 'blur' },
                // ],
                // '固定电话': [
                //     { required: true, message: '请输入联系人电话', trigger: 'blur' },
                //     { validator: validategddh, trigger: 'blur' }
                // ],
                // '邮编': [
                //     { required: true, message: '请输入邮编', trigger: 'blur' },
                //     { validator: validateyzbm, trigger: 'blur' }
                // ],
                // '是否邮寄': [
                //     { required: true, message: '请选择是否邮寄', trigger: 'change' }
                // ],
                // '地址': [
                //     { required: true, message: '请输入通讯地址', trigger: 'blur' }
                // ],
                // '备注': [
                //     { required: false, message: '请输入备注', trigger: 'blur' }
                // ]
            },
            obj:{},
            file: [],
            uuidList: [],
            wzid: '',
            userType: '个人',
            dialogVisible: false,
            logindialogVisible: false,
            uploadVisible: false,
            vindex: 0,
            vobj: {},
            vsearch: '',
            IDcard: true,
            yylicense: false,
            onlineFileKey: null,
            radio: false,
            presrc: '/static/img/孙辉身份证.jpg',
            prems: '孙辉身份证.jpg'
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar': idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-footer': idtfooter,
        'idt-loginmessage': loginmessage,
        'idt-quicklogin': quicklogin,
        'idt-floatbar': idtfloatbar
    },
    created() {
        tokenWhetherPast().then(res => {
            this.dialogVisible = res.status !== 'success' ? true : false;
        });
        this.getsxinfo();
        this.judgeUserType();
    },
    methods: {
        loginSuccess(){
            this.judgeUserType();
        },
        judgeUserType(){
            this.userType = JSON.parse(localStorage.idt_App_personInfo).zw === '市民'? '个人':'法人';
            getUserAndCompanyManagerInfo().then(res => {
                if(res.status === 'success'){
                    // console.log(res);
                    this.formdj['申请单位/人'] = res.data.ZSXM;
                    this.formdj['身份证'] = res.data.SFZH;
                    this.formdj['移动电话'] = res.data.SJH;
                    this.formdj['地址'] = res.data.YJDZ;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        showUpload(index, row){
            this.uploadVisible = true;
            this.vindex = index;
            this.vobj = row;
            if(row.online && row.saved){
                if(row.onlineurl === '/static/img/孙辉身份证.jpg'){
                    this.previewFile(0);
                }else{
                    this.previewFile(1);
                }
            }
            event.stopPropagation();
        },
        getsxinfo(){
            this.wzid = queryString('WZID');
            this.params = [
                { id: 'xzqlqdlb', val: '' },
                { id: 'xzqlqddetail', val: 'WZID=' + this.wzid }
            ]
            xzqlqddetail({ uuid: this.wzid }).then(res => {
                if(res.status === 'success'){
                    this.obj = res.data;
                    this.initMatterInfo(this.formdj, this.obj);
                    for(let i=0;i<this.obj.cllist.length;i++){
                        this.$set(this.obj.cllist[i],'saved',false);
                        this.$set(this.obj.cllist[i],'online',false);
                        this.$set(this.obj.cllist[i],'onlineurl','');
                        if(this.obj.cllist[i].MATERIAL_NAME.indexOf('身份证') > -1){
                            this.obj.cllist[i].saved = true;
                            this.obj.cllist[i].online = true;
                            this.obj.cllist[i].onlineurl = '/static/img/孙辉身份证.jpg';
                        }
                        if(this.obj.cllist[i].MATERIAL_NAME.indexOf('营业执照') > -1){
                            this.obj.cllist[i].saved = true;
                            this.obj.cllist[i].online = true;
                            this.obj.cllist[i].onlineurl = '/static/img/营业执照-正本.jpg';
                        }
                    }
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        initMatterInfo(form,obj) {
            form['事项ID'] = obj.UUID;
            form['事项编号'] = obj.职权编码;
            form['事项名称(大项)'] = obj.职权名称;
            form['分项名称(小项)'] = obj.子项名;
            form['事项类型'] = obj.职权类别;
            form['办件类型'] = obj.办件类型;
            form['申请者类型'] = this.userType;
            form['审批单位代码编号'] = obj.单位简称;
            form['审批单位'] = obj.单位名称;
            form['承诺时限(工作日)'] = obj.承诺时限;
            form['管辖地代码'] = obj.地区编码;
            form['管辖地名称'] = obj.地区名称;
            form['审批单位ID'] = obj.单位简称;
            form['办理主体'] = obj.责任主体;
            form['办理部门'] = obj.实施主体;
        },
        resetformdj(formName){
            this.$refs[formName].resetFields();
        },
        oneToTwo(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.formdj['事项提交时间'] = this.formdj['预受理/代申请时间'] = new Date().getTime();
                    let param = {
                        matterUuid: this.wzid,
                        params: this.formdj
                    }
                    webApplyMatter(param).then(res => {
                        if(res.status === 'success'){
                            this.formdj.UUID = res.data.UUID;
                            this.active = 2;
                            this.progress1 = false;
                            this.progress2 = true;
                            webCommonFileList({tableId: tableIds.权力事项办理表, uuid: this.formdj.UUID}).then(res => {
                                if(res.status === 'success'){
                                    for(let i=0;i<res.data.length;i++){
                                        this.uuidList.push(res.data[i].UUID);
                                    }
                                }else{
                                    this.$message.error('服务器异常，请联系管理员！');                                    
                                }
                            }).catch(res => {
                                this.$message.error('网络连接异常，请检查网络连接！');
                            });
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(res => {
                        this.$message.error('网络连接异常，请检查网络连接！');
                    });
                } else {
                    return false;
                }
            });
        },
        fujianUpload(index, row){
            let formData = new FormData();
            let arr = this.file[0].name.split('.');
            let fileType = arr[arr.length-1];
            let localStroe = JSON.parse(localStorage.getItem('idt_App_personInfo'));
            formData.append('tableId', tableIds.权力事项办理表);
            formData.append('ATTACH_ID', this.formdj.UUID);
            formData.append('FIELDNAME', 'fj');
            formData.append('FILENAME', row.MATERIAL_NAME + '.' + fileType);
            formData.append('file', this.file[0]);
            formData.append('others', JSON.stringify({ "USERNAME": localStroe.zh, "USERREALNAME": localStroe.username }));
            formData.append('UUID', this.uuidList[index]);
            webUpload(formData).then(res => {
                if(res.status === 'success'){
                    this.obj.cllist[index].saved = true;
                    this.obj.cllist[index].blobuuid = res.data.uuid;
                    this.uuidList[index] = res.data.uuid;
                    this.$message.success('上传成功！');
                    this.obj.cllist[index].online = false;
                    this.closeUpload();
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        fujianUploadOnline(index, row){
            this.obj.cllist[index].online = true;
            this.obj.cllist[index].saved = true;
            if(this.onlineFileKey === 0){
                this.obj.cllist[index].onlineurl = '/static/img/孙辉身份证.jpg';                
            }else{
                this.obj.cllist[index].onlineurl = '/static/img/营业执照-正本.jpg';
            }
            this.closeUpload();
        },
        fujianDownload(row, event){
            // console.log(row);
            if(row.saved){
                if(row.online){
                    // console.log(row.onlineurl);
                    window.open(row.onlineurl);
                }else{
                    downloadFile(tableIds.权力事项办理表,row.blobuuid);
                }
            }else{
                this.$message.error('您还没上传材料，请上传材料！');
            }
        },
        fujianDelete(index, row){
            alert(row.MATERIAL_NAME);
            this.obj.cllist[index].saved = false;            
        },
        returnOne(){
            this.active = 1;
            this.progress1 = true;
            this.progress2 = false;
        },
        twoToThree(){
            this.active = 3;            
            this.progress2 = false;
            this.progress3 = true;
        },
        returnTwo(){
            this.active = 2;
            this.progress2 = true;
            this.progress3 = false;
        },
        ThreeToFour(){
            this.active = 4;
            this.progress3 = false;
            this.progress4 = true;
        },
        getFile(event) {
            this.$set(this.file,0,event.target.files[0]);
        },
        showLogin() {
            this.dialogVisible = false;
            this.logindialogVisible = true;
        },
        closeUpload(){
            this.uploadVisible = false;
            this.file.length = 0;
            this.vsearch = '';
            this.IDcard = false;
            this.yylicense = false;
        },
        deleteFile(index){
            this.file.splice(index,1);
        },
        searchFile(){
            this.vsearch;
            this.$message.warning('功能待完善');
        },
        selectFile(key){
            this.onlineFileKey = key;
                        
            if(key === 0){
                this.IDcard = true;
            }else{
                this.yylicense = true;
            }
        },
        previewFile(val) {
            this.onlineFileKey = val;
            this.IDcard = false;
            this.yylicense = false;
            if (val === 0) {
                this.prems = '孙辉身份证.jpg';
                this.presrc = '/static/img/孙辉身份证.jpg';
                this.IDcard = true;
            } else {
                this.prems = '营业执照-正本.jpg';
                this.presrc = '/static/img/营业执照-正本.jpg';
                this.yylicense = true;
            }
        }
    }
}

</script>

<style scoped>
/* 
    css belong to sxsb_dj.vue
*/
.sxsbdj__cltj__zxgl {
    width: 100%;
}
.sxsbdj__cltj__zxgl__preview {
    position: relative;
    float: left;
    width: 78%;
    height: 320px;
    background-color: #808080;
    padding: 10px 0;
}
.sxsbdj__cltj__zxgl__img--pre {
    display: block;
    width: auto;
    height: 100%;
    margin: 0 auto;
}
ul.sxsbdj__cltj__zxgl__list {
    float: left;
    margin-left: 20px;
}

.sxsbdj__cltj__zxgl__list li {
    width: 100px;
    margin: 10px 0;
    border: 1px solid #ccc;
    cursor: pointer;
    position: relative;
}
.sxsbdj__cltj__zxgl__list li:hover {
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1), 0 4px 8px 0 rgba(0,0,0,0.2);
}
.sxsbdj__cltj__zxgl__list li.selected {
    border: 1px solid #808080;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1), 0 4px 8px 0 rgba(0,0,0,0.2);
}
.sxsbdj__cltj__zxgl__list li .radio {
    position: absolute;
    bottom: 0;
    right: -8px;
}
.sxsbdj{
    width: 1260px;
    margin: 0 auto;
}
.sxsbdj__content{
    width: 1250px;
    margin: 0 auto;
}
.sxsbdj__content__wrap{
    width: 1000px;
    margin: 0 auto 15px auto;    
}
.sxsbdj__left{
    width: 230px;
    float: left;    
}
.sxsbdj__right{
    width: 100%;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    min-height: 380px;
}
.sxsbdj__right:hover {
    box-shadow: 0 0 8px 0 rgba(204, 204, 204, 0.5), 0 2px 4px 0 rgba(204, 204, 204, 0.58);
}
.sxsbdj__right__title{
    height: 47px;
    line-height: 47px;
    padding-left: 20px;
    color: #0073da;
    font-size: 16px;
    border-bottom: 3px solid #0073da;
    cursor: default;    
}
.sxsbdj__right__prograss{
    cursor: default;
    width: 850px;
    height: 40px;
    margin: 10px auto;
}
.sxsbdj__right__prograss li{
    cursor: default;
    width: 195px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #3498db;
    color: #ffffff;
    float: left;
    margin-right: 20px;
    position: relative;
}
.sxsbdj__right__prograss li::before{
    content: "";
    position: absolute;
    border: 0 solid #3498db;
    border-width: 20px 15px;
    left: -8%;
    border-left-color: transparent;
}
.sxsbdj__right__prograss li::after{
    content: "";
    position: absolute;
    border: 0 solid #3498db;
    border-width: 20px 15px;
    left: 100%;
    border-color: transparent;
    border-left-color: #3498db;
}
.sxsbdj__right__prograss .sxsbdj__right__prograss__li--active::after{
    border-left-color: #1abc9c;
}
.sxsbdj__right__prograss .sxsbdj__right__prograss__li--active::before{
    border-color: #1abc9c;
    border-left-color: transparent;    
}
.sxsbdj__right__prograss li:last-child{
    border-radius: 0 4px 4px 0;
    margin-right: 0;
}
.sxsbdj__right__prograss li:first-child{
    border-radius: 4px 0 0 4px;
    border-right: 1px solid;
}
.sxsbdj__right__prograss li:first-child::before{
    content: "";
    border-width: 0;
    left: -10%;
}
.sxsbdj__right__prograss li:last-child::after{
    content: "";
    border-width: 0;
    left: -10%;
}
.sxsbdj__right__prograss .sxsbdj__right__prograss__li--active{
    background-color: #1abc9c;
}
.sxsbdj__right__sxjbinfo{
    width: 850px;
    margin: 0 auto;
    border-bottom: 1px solid #ececec;
    padding: 30px 0;
}
.sxsbdj__right__sxjbinfo__title,.sxsbdj__right__grinfo__title,.sxsbdj__right__sbgz__title{
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    font-weight: bold;
    color: #4b9ee8;
    padding-left: 20px;
}
.sxsbdj__right__grinfo__titlebottom{
    margin-bottom: 20px;
}
.sxsbdj__right__sxjbinfo__row{
    padding: 5px 0;
}
.sxsbdj__right__sxjbinfo__head{
    text-align: right;
}
.sxsbdj__right__sxjbinfo__content{
    text-indent: 1em;
}
.sxsbdj__right__grinfo{
    width: 850px;
    margin: 0 auto;
    padding: 30px 0;
}
.sxsbdj__right__grinfo__btn{
    width: 165px;
    margin: 20px auto;
}
.sxsbdj__right__tjcl__btn{
    width: 170px;
    margin: 20px auto;
}
.sxsbdj__right__table{
    width: 850px;
    margin: 20px auto;
}
.sxsbdj__right__finish,.sxsbdj__right__sbgz{
    width: 675px;
    margin: 5px auto;
}
.sxsbdj__right__finish{
    text-align: center;
    padding: 80px 0;
}
.sxsbdj__right__finish__tip{
    font-size: 24px;
    color: #ccc;
    margin-top: 25px;
}
.contentoverflow{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.sxsbdj__right__sbgz__content{
    margin-bottom: 50px;
}
.sxsbdj__right__sbgz__content h1{
    width: 100px;
    height: 20px;
    font-size: 17px;
    font-weight: 600;
    margin: 20px auto 40px auto;
}
.sxsbdj__right__sbgz__content__sqrxm{
    line-height: 25px;    
}
.sxsbdj__right__sbgz__content__sqrnr{
    line-height: 25px;
    text-indent: 2em;
}
.sxsbdj__right__sbgz__content__foot{
    float: left;
    margin-top: 140px;
    margin-left: 140px;
}
.sxsbdj__right__table__file{
    width: 165px;
    height: 36px;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    font-size: 0;
}
.sxsbdj__right__sbgz__content__sqsxmc{
    color: #3498db;
}
.sxsbdj__tjcl__upload{
    position: relative;
    height: 36px;
    width: 165px;
    margin: 10px auto;
}
.sxsbdj__tjcl__filelist{
    width: 300px;
    margin: 10px auto;
}
.sxsbdj__tjcl__filelist li{
    cursor: pointer;
    height: 20px;
}
.sxsbdj__tjcl__filelist__check{
    margin-top: 3px;
    float: right;
    color: #13ce66;
}
.sxsbdj__tjcl__filelist li:hover{
    background-color: #eef1f6;
}
.sxsbdj__tjcl__filelist li:hover span{
    color: #20a0fd;    
}
.sxsbdj__tjcl__filelist li:hover .sxsbdj__tjcl__filelist__check{
    display: none;
}
.sxsbdj__tjcl__filelist__delete{
    display: none;
}
.sxsbdj__tjcl__filelist li:hover .sxsbdj__tjcl__filelist__delete{
    display: block;
    margin-top: 3px;
    margin-right: 5px;
    float: right;
    width: 10px;
    transform: scale(.7);
    color: #717d8d;
}
.sxsbdj__tjcl__filelist li:hover .sxsbdj__tjcl__filelist__delete:hover{
    color: #000;    
}
.sxsbdj__tjcl__btn{
    width: 135px;
    margin: 30px auto 0 auto;
}
.sxsbdj__filesearch{
    width: 400px;
    margin: 10px auto;
}
.sxsbdj__tjcl__clmc--file{
    cursor: pointer;
}
.sxsbdj__tjcl__clmc--file:hover{
    color: #20a0fd;
}
.sxsbdj__tjcl__clmc__icon{
    vertical-align: text-bottom;
}
/* .sxsbdj__cltj__zxgl{
    width: 180px;
    height: 180px;
    border: 1px dashed #bbb;
    cursor: pointer;
    margin: 5px 15px;
    display: inline-block;
    position: relative;
} */
.sxsbdj__cltj__zxgl__img{
    width: 100px;
    height: 60px;
}
/* .sxsbdj__cltj__zxgl:hover,.selected{
    border: 1px solid #20a0fd;
} */
.sxsbdj__cltj__fileupload{
    margin-top: -15px;
    min-height: 200px;
}
.sxsbdj__cltj__zxgl__icon{
    display: none;
}
.selected .sxsbdj__cltj__zxgl__icon{
    display: inline;
    position: absolute;
    font-size: 20px;
    color: #13ce66;
    right: 5px;
    bottom: 5px;
    z-index: 1;
}
.sxsbdj__cltj__zxgl__title{
    position: absolute;
    right: 0;
    bottom: 0;
    display: inline-block;
    padding: 0 10px 0 20px;
    height: 0;
    color: #000000b0;
    background-color: #d1dbe5;
    line-height: 30px;
    text-align: center;
    opacity: 0;
    border-top-left-radius: 10px;
}
.sxsbdj__cltj__zxgl:hover .sxsbdj__cltj__zxgl__title{
    opacity: 1;
    height: 30px;
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);    
}
.sxsbdj__tjcl__filelist__doc{
    vertical-align: super;
}
.sxsbdj__tjcl__filelist__filename{
    width: 265px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.sxsbdj__right__sbgz__content__ewm{
    width: 100px;
    height: 100px;
    margin-left: 40px;
    margin-top: 35px;
    float: left;
}
.sxsbdj__right__sbgz__content__ewmnr{
    float: left;
    margin-top: 35px;
    margin-left: 30px;
    font-size: 15px;
}
.sxsbdj__right__sbgz__content__ewmnr p{
    margin-bottom: 5px;
}
.sxsbdj__right__sbgz__content__ewmnr span{
    color: #20a0fd;
}
</style>
