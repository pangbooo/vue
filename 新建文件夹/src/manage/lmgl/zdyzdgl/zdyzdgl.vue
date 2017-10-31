/*    栏目管理下的自定义字段管理
        作者：马日
        QQ： 995401608
        tel：13478470501
        时间： 2017年8月10日
*/
<template>
    <div class="zdyzdgl" id="zdyzdgl">
        <div class="zdyzdgl__table">
            <div class="zdyzdgl__table--btn">
                <div class="zdyzdgl__table--btn__wrap">
                    <el-button type="primary" size="small" icon="plus" @click="add">添加</el-button>
                    <el-button type="primary" size="small" icon="delete2" @click="deletezd">删除</el-button>                
                    <el-button type="primary" size="small" icon="d-caret" @click="showpx">排序</el-button>                
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="zdyzdgl__table__table">
                <idttable @rowDblclick="rowDblclick" :paginationshow="paginationshow" :height="height" :page_size="page_size" ref="multipleTable" @sortChange="sortChange"  :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange"></idttable>
            </div>
        </div>
        <div class="zdyzdgl__footer" v-show="hiden">
            <div class="zdyzdgl__footer--btn">
                <el-button type="primary" size="small" icon="check" @click="savezdyzd()">保存</el-button>                        
            </div>
        </div>
        <el-dialog title="字段排序" :visible.sync="pxshow" @close="zdyzdpx=''">
            <span class="zdyzdgl__tip">选中节点可上移或下移，完成后保存即可</span>
                <div v-for="item in zdyzdsortList" :key="item.UUID">
                    <el-radio class="radio" v-model="zdyzdpx" :label="item.UUID">{{ item.ZDMC }}</el-radio>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="shangyi">上移</el-button>
                    <el-button @click="xiayi">下移</el-button>
                    <el-button @click="cancelzdyzdpx">取消</el-button>
                    <el-button type="primary" @click="savezdyzdpx">确定</el-button>
                </div>
        </el-dialog>
        <el-dialog title="添加字段" :visible.sync="showdj" @close="cancelformdj">
            <el-form :model="formdj" ref="formdj" :rules="formdjrule">
                <div class="zdyzdgl__dialog">
                    <el-form-item label="显示名称" :label-width="dialoFormWidth" prop="XSM">
                        <el-input v-model="formdj.XSM" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog">
                    <el-form-item label="字段类型" :label-width="dialoFormWidth" prop="LX">
                        <el-select v-model="formdj.LX" class="zdyzdgl__dialog__select" @change="watchformdjlx">
                            <el-option label="文本框" value="文本框"></el-option>
                            <el-option label="单选框" value="单选框"></el-option>
                            <el-option label="复选框" value="复选框"></el-option>
                            <el-option label="下拉框" value="下拉框"></el-option>
                            <el-option label="多行文本" value="多行文本"></el-option>
                            <el-option label="附件上传" value="附件上传"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog" v-show="djwblxshow">
                    <el-form-item label="文本类型" :label-width="dialoFormWidth" prop="MRZ">
                        <el-select v-model="formdj.MRZ" class="zdyzdgl__dialog__select">
                            <!-- <el-option label="手机号" value="/^1[3|5|8][0-9]\d{4,8}$/"></el-option>
                            <el-option label="邮箱" value="/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/"></el-option>
                            <el-option label="电话号" value="/^0\d{2,3}-?\d{7,8}$/"></el-option>
                            <el-option label="正整数" value="/^[0-9]*$/"></el-option>
                            <el-option label="小数" value="/^\d+(\.\d{1,2})?$/"></el-option>
                            <el-option label="其他" value=""></el-option> -->
                            <el-option label="手机号" value="手机号"></el-option>
                            <el-option label="邮箱" value="邮箱"></el-option>
                            <el-option label="电话号" value="电话号"></el-option>
                            <el-option label="正整数" value="正整数"></el-option>
                            <el-option label="小数" value="小数"></el-option>
                            <el-option label="其他" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog" v-show="!djwblxshow">
                    <el-form-item label="默认值" :label-width="dialoFormWidth" prop="MRZ">
                        <el-input v-model="formdj.MRZ" placeholder="多个默认值请用|分隔" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog" v-show="hiden">
                    <el-form-item label="预留字段" :label-width="dialoFormWidth" prop="YLZD">
                        <el-input v-model="formdj.YLZD" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog">
                    <el-form-item label="是否为检索字段" :label-width="dialoFormWidth" prop="SFWJSX">
                        <el-radio-group v-model="formdj.SFWJSX">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog">
                    <el-form-item label="显示顺序" :label-width="dialoFormWidth" prop="XSSX">
                        <el-input v-model="formdj.XSSX" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button icon="close" @click="cancelformdj">取 消</el-button>
                <el-button type="primary" icon="check" @click="saveformdj('formdj')">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改字段" :visible.sync="showxg">
            <el-form :model="formxg" ref="formxg" :rules="formxgrule">
                <div class="zdyzdgl__dialog">
                    <el-form-item label="显示名称" :label-width="dialoFormWidth" prop="ZDMC">
                        <el-input v-model="formxg.ZDMC" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog">
                    <el-form-item label="字段类型" :label-width="dialoFormWidth" prop="ZDLX">
                        <el-select v-model="formxg.ZDLX" class="zdyzdgl__dialog__select">
                            <el-option label="文本框" value="文本框"></el-option>
                            <el-option label="单选框" value="单选框"></el-option>
                            <el-option label="复选框" value="复选框"></el-option>
                            <el-option label="下拉框" value="下拉框"></el-option>
                            <el-option label="多行文本" value="多行文本"></el-option>
                            <el-option label="附件上传" value="附件上传"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog" v-if="formxg.ZDLX === '文本框'">
                    <el-form-item label="文本类型" :label-width="dialoFormWidth" prop="MRZ">
                        <el-select v-model="formxg.MRZ" class="zdyzdgl__dialog__select">
                            <!-- <el-option label="手机号" value="/^1[3|5|8][0-9]\d{4,8}$/"></el-option>
                            <el-option label="邮箱" value="/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/"></el-option>
                            <el-option label="电话号" value="/^0\d{2,3}-?\d{7,8}$/"></el-option>
                            <el-option label="正整数" value="/^[0-9]*$/"></el-option>
                            <el-option label="小数" value="/^\d+(\.\d{1,2})?$/"></el-option>
                            <el-option label="其他" value=""></el-option> -->
                            <el-option label="手机号" value="手机号"></el-option>
                            <el-option label="邮箱" value="邮箱"></el-option>
                            <el-option label="电话号" value="电话号"></el-option>
                            <el-option label="正整数" value="正整数"></el-option>
                            <el-option label="小数" value="小数"></el-option>
                            <el-option label="其他" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog" v-if="formxg.ZDLX !== '文本框'">
                    <el-form-item label="默认值" :label-width="dialoFormWidth" prop="MRZ">
                        <el-input v-model="formxg.MRZ" placeholder="多个默认值请用|分隔" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div class="zdyzdgl__dialog">
                    <el-form-item label="是否为检索字段" :label-width="dialoFormWidth" prop="SFWJSX">
                        <el-radio-group v-model="formxg.SFWJSX">
                            <el-radio label="是" value="是"></el-radio>
                            <el-radio label="否" value="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button icon="close" @click="showxg = false">取 消</el-button>
                <el-button type="primary" icon="check" @click="savexgzd('formxg')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import idttable from "@/components/table/table.vue"

import getzdyzd from '@/services/manage/lmgl/getzdyzd.js';
import saveformdj from '@/services/manage/lmgl/saveformdj.js';
import saveformxg from '@/services/manage/lmgl/saveformxg.js';
import deletezd from '@/services/manage/lmgl/deletezd.js';
import savezdyzdpx from '@/services/manage/lmgl/savezdyzdpx.js';

export default {
    data() {
        var validateXSSX = (rule, value, callback) => {
            let yhm = /^[0-9]{1,5}$/;
            if(yhm.test(this.formdj.XSSX)){
                return callback();
            }else{
                return callback(new Error('只能输入数字'));
            }
        };
        return {
            dialoFormWidth: '150px',
            showdj: false,
            showxg: false,
            pxshow: false,
            hiden: false,
            djwblxshow: true,
            xgwblxshow: false,
            // form: {
            //     UUID: '',
            //     BM: '',
            //     BNBM: '',
            //     SM: ''
            // },
            zdyzdsortList: [],
            zdyzdpx: '',
            formdjrule :{
                XSM: [
                    { required: true, message: '请输入显示名', trigger: 'blur' }
                ],
                LX: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                MRZ: [
                    { required: false, message: '请输入默认值', trigger: 'blur' }
                ],
                XSSX: [
                    { required: true, message: '请输入显示顺序', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在1到5个字符', trigger: 'blur' },
                    { validator: validateXSSX, trigger: 'blur' }
                ],
                SFWJSX: [
                    { required: true, message: '请选择是否为检索项', trigger: 'change' }
                ],
                YLZD: [
                    { required: false, message: '请输入预留字段', trigger: 'blur' }
                ]
            },
            formxgrule :{
                ZDMC: [
                    { required: true, message: '请输入显示名', trigger: 'blur' }
                ],
                ZDLX: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                SFWJSX: [
                    { required: true, message: '请选择是否为检索项', trigger: 'change' }
                ],
                MRZ: [
                    { required: false, message: '请输入默认值', trigger: 'blur' }
                ]
            },
            formdj: {
                // UUID: '',
                XSM: '',
                ZDM: '默认字段名',
                LX: '文本框',
                MRZ: '',
                XSSX: '',
                YLZD: '',
                SFWJSX: '否',
                PUUID: ''
            },
            formxg: {
                ZDMC: '',
                ZDLX: '',
                MRZ: '',
                SFWJSX: ''
            },
            fields: {
                fielddata:[
                    {fieldname:'ZDMC',width:'200',showname:'显示名',sortable:false},
                    {fieldname:'ZDLX',width:'100',showname:'类型',sortable:false},
                    {fieldname:'MRZ',width:'230',showname:'默认值',sortable:false},
                    {fieldname:'PX',width:'100',showname:'显示顺序',sortable:false}
                ],
                opertions:{
                    showname:'操作',
                    width:'',
                    buttons:[
                        { name:'修改',type:'primary',size:"mini",icon:"edit",script:"",handler:'xiugaiziduan',handlerargs:''}
                    ]
                }
            },
            // tableData: {
            //     DataList:[
                                
            //     ]
            // },
            height: '',
            order: [],
            paginationshow: false,
            page_size: 10,
            nowpage: 1,
            totalRow: 10,
            tableData: {
                DataList: []
            }
        }
    },
    props: { 
        pUUID : {
            default: '',
            type: String
        }
    },
    watch: {
        
    },
    created() {
        this.getzdyzd();
    },
    methods: {
        watchformdjlx(){
            if(this.formdj.LX === '文本框'){
                this.djwblxshow = true;
            }else{
                this.djwblxshow = false;                
            }
        },
        watchformxglx(){
            if(this.formxg.ZDLX === '文本框'){
                alert();
                this.xgwblxshow = true;
            }else{
                this.xgwblxshow = false;                
            }
        },
        rowDblclick(){

        },
        sortChange(){

        },
        handleCurrentChange(val){

        },
        getzdyzd(){
            let params = {
                uuid: this.pUUID
                // 匹配自定义字段表中的栏目id
            };
            // console.log(params);
            getzdyzd(params).then(res => {
                // console.log(res);
                if(res.code === "idt-oApp-5000"){
                    // this.FormHeader = res.result.FormHeader;
                    this.tableData.DataList = res.data;
                    // this.tableData.DataList.sort(this.createCompareFunction());
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络！');
            });
        },
        showpx(){
            this.pxshow = true;
            this.zdyzdsortList = this.tableData.DataList;
            // console.log(this.zdyzdsortList);
        },
        xiugaiziduan(row){
            for(let opt in row){
                this.formxg[opt] = row[opt];
            }
            // console.log(this.formxg);
            this.showxg = true;
        },
        cancelzdyzdpx(){
            this.zdyzdpx = '';
            this.pxshow = false;
        },
        savezdyzdpx(){
            this.order.length = 0;
            for(let i=0;i<this.zdyzdsortList.length;i++){
                this.order.push(this.zdyzdsortList[i].UUID)
            }
            let params = { arr: this.order };
            // console.log(params.arr);
            savezdyzdpx(params).then(res => {
                if(res.code === "idt-oApp-5000"){
                    this.pxshow = false;
                    this.$message.success('保存字段排序成功！');
                    this.getzdyzd();
                }else{
                    this.$message.error('服务器异常，请联系管理员！');                        
                }
            }).catch(res =>{
                this.$message.error('网络连接异常，请检查网络！')
            });
        },
        shangyi(){
            if(this.zdyzdpx === ''){
                this.$message.error('请选择要移动的字段');
            }else if(this.zdyzdpx === this.zdyzdsortList[0].UUID){
                this.$message.error('已经是第一个了，不能再上移了！');
            }else{
                for(let i=1;i<this.zdyzdsortList.length;i++){
                    if(this.zdyzdpx === this.zdyzdsortList[i].UUID){
                        let arr = this.zdyzdsortList.splice(i,1);
                        this.zdyzdsortList.splice(i-1,0,arr[0]);
                        // this.tableData.DataList[i].XSSX = this.tableData.DataList[i].XSSX + this.tableData.DataList[i-1].XSSX;
                        // this.tableData.DataList[i-1].XSSX = this.tableData.DataList[i].XSSX - this.tableData.DataList[i-1].XSSX;
                        // this.tableData.DataList[i].XSSX = this.tableData.DataList[i].XSSX - this.tableData.DataList[i-1].XSSX;
                    }else{

                    }
                }
            } 
        },
        xiayi(){
            if(this.zdyzdpx === ''){
                this.$message.error('请选择要移动的字段');
            }else if(this.zdyzdpx === this.zdyzdsortList[this.zdyzdsortList.length-1].UUID){
                this.$message.error('已经是最后一个了，不能再下移了！');
            }else{
                for(let i=this.zdyzdsortList.length-2;i>=0;i--){
                    if(this.zdyzdpx === this.zdyzdsortList[i].UUID){
                        let arr = this.zdyzdsortList.splice(i,1);
                        this.zdyzdsortList.splice(i+1,0,arr[0]);
                        // this.tableData.DataList[i].XSSX = this.tableData.DataList[i].XSSX + this.tableData.DataList[i+1].XSSX;
                        // this.tableData.DataList[i+1].XSSX = this.tableData.DataList[i].XSSX - this.tableData.DataList[i+1].XSSX;
                        // this.tableData.DataList[i].XSSX = this.tableData.DataList[i].XSSX - this.tableData.DataList[i+1].XSSX;
                    }else{

                    }
                }
            }
        },
        // 根据字段大小，对对象进行排序
        // createCompareFunction(){
        //     return function(object1,object2){
        //         var value1 = object1.XSSX;
        //         var value2 = object2.XSSX;
        //         if(value1<value2){
        //             return -1;
        //         } else if(value1>value2){
        //             return 1;
        //         }else{
        //             return 0;
        //         }
        //     }
        // },
        savexgzd(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    // for(let i=0;i < this.tableData.DataList.length;i++){
                    //     if(this.tableData.DataList[i].UUID === this.formxg.UUID){
                    //         for(let opt in this.formxg){
                    //             this.tableData.DataList[i][opt] = this.formxg[opt];
                    //         }
                    //         break;
                    //     } else {

                    //     }
                    // }
                    // console.log(this.formxg);
                    saveformxg(this.formxg).then(res => {
                        if(res.code === "idt-oApp-5000"){
                            this.$message.success('修改自定义字段成功！');
                            this.showxg = false;
                            this.getzdyzd();
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');                        
                        }
                    }).catch(res =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                } else {
                    return false;
                }
            });
        },
        saveformdj(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.formdj.PUUID = this.pUUID;
                    this.formdj.YLZD = '字段' + (this.tableData.DataList.length+1);
                    // console.log(this.formdj);
                    saveformdj(this.formdj).then(res => {
                        if(res.code === "idt-oApp-5000"){
                            this.$message.success('新建自定义字段成功！'); 
                            this.showdj = false;
                            this.$refs[formName].resetFields();
                            this.getzdyzd();
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');                        
                        }
                    }).catch(data =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                } else {
                    return false;
                }
            });
        },
        cancelformdj(){
            this.$refs['formdj'].resetFields();
            this.showdj = false;
        },
        savezdyzd(){
            // this.$emit('savezdyzd',this.tableData.DataList);
        },
        add(){
            if(this.tableData.DataList.length>=15){
                this.$message.error('已经15个字段，不能添加！');
            }else{
                this.showdj = true;
                this.formdj.XSSX = this.tableData.DataList[this.tableData.DataList.length-1].PX * 1 + 1;
                // console.log(this.tableData.DataList);
            }
        },
        deletezd(){
            let multipleSelection = this.$refs.multipleTable.multipleSelection;
            // console.log(multipleSelection);
            let params = { uuids:[] };
            for(let i=0;i < multipleSelection.length;i++){
                params.uuids.push(multipleSelection[i].UUID);
            }
            deletezd(params).then(res => {
                if(res.code === "idt-oApp-5000"){
                    this.$message.success('删除字段成功！');
                    this.getzdyzd();                    
                }else{
                    this.$message.error('服务器异常，请联系管理员！');                        
                }
            }).catch(data =>{
                this.$message.error('网络连接异常，请检查网络！')
            });
        }
    },
    watch: {
        
    },
    components: {
        idttable
    }
}
</script>

<style scoped>
.zdyzdgl{
    height: 100%;
}
.zdyzdgl__header{
    margin: 0 10%;
}
.zdyzdgl__header--form{
    display: inline-block;
}
.zdyzdgl__header--sm{
    width: 590px;
}
.zdyzdgl__table{
    margin-top: 0px;
}
.zdyzdgl__table--btn{
    height: 10px;
}
.zdyzdgl__table--btn__wrap{
    float: right;
    margin-right: 50px;
}
.zdyzdgl__footer{
    width: 100%;
    margin-top: 10px;
}
.zdyzdgl__footer--btn{
    margin-left: 45%;
}
.zdyzdgl__dialog{
    width: 500px;
}
.zdyzdgl__dialog__select{
    width: 350px;
}
.zdyzdgl__tip{
    display: block;
    color: #ff8000;
    margin-top: -15px;
    margin-bottom: 15px;
}
</style>