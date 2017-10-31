<!-- 
    添加文章中心表单模板
    作者：李文达Leo
    日期：2017.8.2
 -->
<template>
    <div class="edui" >
        <div class="edui-editor-title">
            <div :class="['titlediv',{'titlediv-close':!open}] ">
                <el-form :model="form" :rules="rules"  ref="form" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="文章标题" required>
                        <el-col :span="20">
                            <el-input v-model="form.文章标题" size="small"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item  label=" " >
                        <el-checkbox v-model="nrbtchecked">内容标题</el-checkbox>
                        <el-checkbox v-model="dbtchecked">短标题</el-checkbox> 
                        <el-checkbox v-model="fbtchecked">副标题</el-checkbox>
                        <el-checkbox v-model="ytchecked">引题</el-checkbox>
                    </el-form-item>
                    <el-form-item label="内容标题" v-show="nrbtchecked">
                        <el-input v-model="form.内容标题" size="small" class="el-col-20"></el-input>
                    </el-form-item>
                    <el-form-item label="短标题" prop="短标题" v-show="dbtchecked">
                        <el-input v-model="form.短标题" size="small" class="el-col-20"></el-input>
                    </el-form-item>
                    <el-form-item label="副标题" prop="副标题" v-show="fbtchecked">
                        <el-input v-model="form.副标题" size="small" class="el-col-20"></el-input>
                    </el-form-item>
                    <el-form-item label="引题" prop="引题" v-show="ytchecked">
                        <el-input v-model="form.引题" size="small" class="el-col-20"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="作者" prop="作者">
                                <el-input v-model="form.作者" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="编辑" prop="编辑">
                                <el-input v-model="form.编辑" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="来源" prop="来源">
                        <el-col :span="20">
                            <el-input v-model="form.来源" size="small"></el-input>
                        </el-col>
                    </el-form-item>
                    
                    <!--el-form-item label="标签" prop="标签">
                        <el-col :span="20">
                            <el-input v-model="form.标签" size="small" title="标签是文章的另一种分类,系统可以按照标签提取文章;在文章标签管理中维护" ></el-input>
                        </el-col>
                        <el-col :span="4">
                            <span class="shuzhinamespan">【选择标签】</span>
                        </el-col>
                    </el-form-item-->
                    <el-form-item label="标题图" prop="标题图">
                        <el-col :span="15" v-if="!uploadFlag">
                            <el-input v-model="form.标题图" size="small" readonly></el-input>
                        </el-col>
                        <el-col :span="4" v-if="uploadFlag">
                            <el-input v-model="form.标题图" size="small" readonly></el-input>
                        </el-col>
                        <el-col :span="12" v-if="uploadFlag">
                            <input  type="file" @change="getFile($event)">
                            <el-button type="primary" icon="upload" size="mini" @click="saveImg($event)">上传</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" icon="upload" size="mini" v-if="!uploadFlag" @click="uploadFlag=true">上传图片</el-button>
                            <el-button type="danger" icon="circle-cross" size="mini" v-if="uploadFlag" @click="uploadFlag=false">取消</el-button>
                            <el-button type="primary" icon="picture" size="mini" @click="previewImg" >预览</el-button>
                        </el-col>
                    </el-form-item> 
                    <el-form-item label="跳转链接" prop="跳转链接">
                        <el-col :span="20">
                            <el-input v-model="form.跳转链接" size="small"></el-input>
                        </el-col>
                        <el-col :span="4" class="edui__col--r">
                            <el-checkbox v-model="tzdzchecked">添加</el-checkbox>
                        </el-col>
                    </el-form-item>  
                    <el-form-item label="关键字" prop="关键字" >
                        <el-col :span="20">
                            <el-input v-model="form.关键字" size="small"  ></el-input>
                        </el-col>
                        <!--el-col :span="4">
                            <el-checkbox v-model="gjzchecked">自动提取</el-checkbox>
                        </el-col-->
                    </el-form-item>
                    <!--el-form-item label="内容摘要" prop="内容摘要" >
                        <el-col :span="20">
                            <el-input type="textarea"  :rows="2" placeholder="" :readonly="zynrchecked" v-model="form.内容摘要">
                        </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox v-model="zynrchecked">自动提取</el-checkbox>
                        </el-col>
                    </el-form-item-->
                    <el-form-item  v-for="field in customFields" :label="field.ZDMC" :prop="field.YLZD" :key="field.ZDMC" :rules="defaultRules[field.MRZ]">
                        <el-input v-if="field.ZDLX === '文本框'" v-model="form[field.YLZD]" size="small" class="el-col-20" ></el-input>
                        <el-input v-if="field.ZDLX === '多行文本'" type="textarea"  :rows="2" v-model="form[field.YLZD]" class="el-col-20"></el-input>
                        <el-checkbox-group v-if="field.ZDLX === '复选框'" v-model="form[field.YLZD]">
                            <el-checkbox v-for="itemCheckBox in field.MRZ.split('|')" :label="itemCheckBox" :key="itemCheckBox"></el-checkbox>
                        </el-checkbox-group>
                        <el-radio-group v-if="field.ZDLX === '单选框'" v-model="form[field.YLZD]">
                            <el-radio v-for="itemCheckBox in field.MRZ.split('|')" :label="itemCheckBox" :key="itemCheckBox"></el-radio>
                        </el-radio-group>
                        <el-select v-if="field.ZDLX === '下拉框'" v-model="form[field.YLZD]" placeholder="请选择"size="small" >
                            <el-option v-for="itemSelect in field.MRZ.split('|')" :key="itemSelect" :label="itemSelect" :value="itemSelect"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="page-component-up" @click="changeOpen">
                    <i :class="open ? 'el-icon-minus' : 'el-icon-plus'" :title="open ? '收起' : '展开'"></i>
                </div>
            </div>
        </div>
        <div class="edui-editor-con">
            <v-ueidtor :defaultMsg="defaultMsg" :config="config" :id="ue" ref="ue"></v-ueidtor>
        </div>
        <el-dialog :title="componentsinfo.title"  :visible.sync="componentsinfo.show" :size="componentsinfo.size" :modal-append-to-body="false">
            <div class="previewImg"><img :src="'data:image/png;base64,' + imgUrl"></div>
        </el-dialog>
    </div>
</template>

<script>
import ueidtor from '@/components/ueidtor/ueidtor';
import upload from '@/components/upload/upload';
import {uploadFile, webDownload} from '@/api/common.js';
import {tableIds} from '@/api/tableId.js';
let Base64 = require('js-base64');
if(!Base64.decode){
  Base64 = Base64.Base64;
}
    export default {
        name: 'maincontent',
        components: {
            'v-ueidtor': ueidtor,
            'upload': upload
        },
        props: {
            lmmc: {
                type: String,
                default: ''
            },
            customFields: {
                type: Array,
                default() {
                    return [];
                }
            },
            form: {
                type: Object,
                default() {
                    return {
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
                        文章内容: '',
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
                    }
                }
            }
        },
        data () {
            var checkCel = (rule, value, callback) => {
                if (value && !/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
                    return callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            var checkTel = (rule, value, callback) => {
                if (value && !/^0\d{2,3}-\d{7,8}|\d{7,8}$/.test(value)) {
                    return callback(new Error('请输入正确的电话号码'));
                } else {
                    callback();
                }
            };
            var checkNum = (rule, value, callback) => {
                if (value && !/^[1-9][0-9]*$/.test(value)) {
                    return callback(new Error('请输入正整数'));
                } else {
                    callback();
                }
            };
            var checkFloat = (rule, value, callback) => {
                if (value && !/^(-?\d+)(\.\d+)?$/.test(value)) {
                    return callback(new Error('请输入小数'));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    文章标题: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' }
                    ]
                },
                defaultRules: {
                    邮箱: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
                    手机号: [{validator: checkCel, trigger: 'blur,change'}],
                    电话号: [{validator: checkTel, trigger: 'blur,change'}],
                    正整数: [{validator: checkNum, trigger: 'blur,change' }],
                    小数: [{validator: checkFloat, trigger: 'blur,change' }]
                },
                componentsinfo: {
                    id: '',
                    name: '',
                    title: '',
                    size: '',
                    show: false
                },
                uploadFlag: false,
                imgUrl: '',
                file: '',
                nrbtchecked:false,// 内容标题checked
                dbtchecked:false,// 短标题checked
                fbtchecked:false,// 副容标题checked
                ytchecked:false,// 引题checked
                tzdzchecked:false,//跳转地址
                defaultMsg: '',
                config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 350
                },
                ue: "ue", // 不同编辑器必须不同的id
                open:true
            }
        },
        watch: {
           form: {
                handler: function() {
                var strResult = this.form.文章内容.replace(/\s/g, "+"); 
                this.defaultMsg = Base64.decode(strResult);
               },
               deep: true
           }
        },
        methods: {
            changeOpen () {
                this.open = !this.open; 
            },
            previewImg() {
                let params = {};
                params = {
                    uuid: this.form.标题图ID,
                    tableId: tableIds.文章管理,
                    isBase64: true
                }
                webDownload(params).then(res => {
                    console.log(res);
                    this.imgUrl = res.data.img;
                });
                this.componentsinfo = {
                    id: '',
                    name: 'upload',
                    title: '图片预览',
                    size: 'small',
                    show: true
                }
            },
            getUEContent() {
                this.form.文章内容 = this.$refs.ue.getUEContent();
            },
            getFile(event) {
                this.file = event.target.files[0];
            },
            saveImg(event) {
                event.preventDefault();
                this.$emit('saveWz');
                if (this.file) {
                    let formData = new FormData();
                    formData.append('tableId', tableIds.文章管理);
                    formData.append('ATTACH_ID', this.form.UUID);
                    formData.append('FIELDNAME', 'fj');
                    formData.append('file', this.file);
                    this.form.标题图 = this.file.name;
                    uploadFile(formData).then(res => {
                        if(res.status == "success"){
                            this.form.标题图ID = res.data.uuid;
                            this.uploadFlag = false;
                            this.file = '';
                            this.$message.success('上传成功');
                            
                        }
                    });
                } else {
                    this.$message.error('请选择图片文件');
                }
                  
            }
        } 
    }
</script>

<style type="text/css">
    /*leo 添加文章css  */
    .tjwz__mainbg .edui-editor-title {
        margin: 20px auto;
        width: 90%;
        background: #f8f8f8;
        color: #333;
        -moz-box-shadow: 4px 4px 10px #292929;
        -webkit-box-shadow: 4px 4px 10px #292929;
        box-shadow: 4px 4px 10px #292929;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .tjwz__mainbg .edui-editor-con{
        margin-left: 5%;
        width: 90%;
        margin-bottom: 20px;
        box-shadow: 4px 4px 10px #292929;
    }
    .tjwz__mainbg .titlediv {
        height: 100%;
        position: relative;
        padding: 20px 30px 10px;
        background-color: #f8f8f8;
        border-radius: 5px;
        border-bottom-right-radius: 15px;
        overflow: hidden;
    }
    .tjwz__mainbg .titlediv-close{
        height: 154px;
        overflow: hidden;
    }
    .edui .el-form-item {
        margin-bottom: 4px;
    }
    .edui .el-form-item.is-error {
        margin-bottom: 14px;
    }
    .edui .el-input__inner {
        border-radius: 5px;
    }
    .edui .el-col {
        padding-left: 20px;
    }
    .edui .el-form-item .el-col:first-child,
    .edui .el-row .el-col:first-child {
        padding-left: 0;
    }
    .edui__btt {
        position: absolute;
        top: 150px;
        right: 10px;
    }
    .edui .el-col-12 {
        width: 50%;
    }
    .edui .el-col-20 {
        width: 83.33333%;
    }
    .previewImg img{
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
    .page-component-up{
        background-color: #58b7ff;
        position: absolute;
        right: -35px;
        bottom: -35px;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        cursor: pointer;
        opacity: .6;
        transition: .3s
    }
    .page-component-up i{
        color:#fff;
        display:block;
        line-height:42px;
        text-align:left;
        padding-left: 11px;
        font-size:18px;
    }
    .page-component-up:hover{
        opacity:1
    }
</style>


