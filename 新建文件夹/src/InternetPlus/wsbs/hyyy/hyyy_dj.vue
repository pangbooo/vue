/** 
 * 文档描述: 网上办事-婚姻预约
 * 作者: rita.ma 
 * 创建时间: 2017-09-21 16:42:18 
 * 最后修改人: rita.ma 
 * 最后修改时间: 2017-09-21 16:42:18 
 */

<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="hyyydj" id="hyyydj">
        <div class="hyyydj__content">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            <div class="hyyydj__content__line"></div>
            <div class="hyyydj__content__progress">
                <el-steps :space="150" align-center :active="active" finish-status="success">
                    <el-step title="阅读协议"></el-step>
                    <el-step title="选择登记机关"></el-step>
                    <el-step title="选择日期时间"></el-step>
                    <el-step title="填写双方信息"></el-step>
                    <el-step title="完成">完成</el-step>
                </el-steps>
            </div>
            <div class="hyyydj__content__progress__div" v-show="progress1">
                <span class="hyyydj__content__progress__div__title">姻登记网上预约协议</span>
                <p>1. 网上预约需提前 2 至 30 天。</p>
                <p>2. 对于因自然灾害、电力通讯或其他设施故障或者其他原因，致使预约服务延迟或未能履行的，婚姻登记机关不承担任何责任。</p>
                <p>3. 任何单位和个人不得恶意修改、变更预约服务的有关程序和内容，或利用网上预约进行有偿服务，否则由此引起的一切损   后果，要承担相应的法律责任。</p>
                <p>4. 预约单仅供当事人使用，否则无效。</p>
                <p>5. 同意预约并不等于同意受理、同意登记。预约当事人须亲自到婚姻登记机关办理婚姻登记，按照有关规定提供相应的证件和材料，并按照法定程序办理。不符合条件或者材料不全的，婚姻登记机关有权不予办理。</p>
                <p>6. 预约是为了方便当事人合理地做出登记安排、避开登记高峰，提前录入数据，减少办理时间，提高工作效率。预约时间不代表办结时间点，但保证当天登记完成，逾期未办理者预约自动取消。</p>
                <p>7 本协议的解释权归婚姻登记机关</p>
                <div class="hyyydj__content__progress__div__check">
                    <el-checkbox v-model="checked">我同意以上协议</el-checkbox>
                </div>
                <div class="hyyydj__content__progress__div__sure">
                    <el-button @click="oneToTwo" type="primary">下一步</el-button>
                </div>
            </div>
            <div class="hyyydj__content__progress__div" v-show="progress2">
				<span class="hyyydj__content__progress__div__title">选择登记机关</span>
				<p>您选择的登记机关应为男女双方其中一方常住户口所在地的婚姻登记机关。</p>
                <div class="hyyydj__content__progress__div__select">
                    <span>选择所属设区市：</span>
                    <el-select v-model="formdj.ssdq" @change="lookssdq" placeholder="请选择">
                        <el-option v-for="item in vareaopts" :key="item.text" :label="item.text" :value="item.text"></el-option>
                    </el-select>
                </div>
                <div class="hyyydj__content__progress__div__select">
                    <span>选择婚姻登记机关：</span>
                    <el-select v-model="formdj.djjg" placeholder="请选择">
                        <el-option v-for="item in vjgopts" :key="item.text" :label="item.text" :value="item.text"></el-option>
                    </el-select>
                </div>
				<p>&nbsp;申请在淳安县民政局办理结婚登记必须满足下列条件:</p><p></p>
				<p>1.男女双方至少有一方常住户口在淳安县。</p>
				<p>2.男女双方共同到婚姻登记处提出申请。</p>
				<p>3.当事人男年满 22 周岁，女年满 20 周岁。</p>
				<p>4.当事人双方均无配偶(未婚、离婚、丧偶)。</p>
				<p>5.当事人双方没有直系血亲和三代以内旁系血亲关系。</p>
				<p>6.未患有医学上认为不应当结婚的疾病。双方自愿结婚。</p>
				<p>7.提供相应的证件和材料。</p>

				<p class="hyyydj__content__progress__div__blue">温馨提醒：</p>
				<p>办公时间 周一至周五 （国定节假日除外）</p>
				<p class="hyyydj__content__progress__div__blue">联系电话：</p>
				<p>0411——12345678</p>
				<div class="hyyydj__content__progress__div__btngroup">
                    <el-button @click="vreturnOne" type="primary">上一步</el-button>
                    <el-button @click="twoToThree" type="primary">下一步</el-button>
				</div>
			</div>
            <div class="hyyydj__content__progress__div" v-show="progress3">
				<span class="hyyydj__content__progress__div__datepickhead">选择日期时间:</span>
				<div class="hyyydj__content__progress__div__datepick">
					<el-date-picker v-model="formdj.djrq" type="date" @change="dateChange" :picker-options="disableBeforeToday" placeholder="选择日期"></el-date-picker>
				</div>
				<div class="hyyydj__content__progress__div__yysj">
                    <el-row class="hyyydj__content__progress__div__yysjrow">
                        <el-col :span="6" class="hyyydj__content__progress__div__yysjcol">
                            <el-radio class="radio" v-model="formdj.djsjd" label="上午">上午</el-radio>
                        </el-col>
                        <el-col :span="14" class="hyyydj__content__progress__div__yysjcoltwo">08：30-11：30</el-col>
                    </el-row>
                    <el-row class="hyyydj__content__progress__div__yysjrow hyyydj--bordertopnone">
                        <el-col :span="6" class="hyyydj__content__progress__div__yysjcol">
                            <el-radio class="radio" v-model="formdj.djsjd" label="下午">下午</el-radio>
                        </el-col>
                        <el-col :span="14" class="hyyydj__content__progress__div__yysjcoltwo">13：30-16：30</el-col>
                    </el-row>
				</div>
				<div class="hyyydj__content__progress__div__btngroup">
                    <el-button @click="vreturnTwo" type="primary">上一步</el-button>
                    <el-button @click="threeToFour" type="primary">下一步</el-button>
				</div>
			</div>
            <div class="hyyydj__content__progress__divfour" v-show="progress4">
                <el-form :model="formdj" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">                
                    <div class="hyyydj__content__progress__div__info hyyydj__content__progress__div__man">
                        <span class="hyyydj__content__progress__divfour__title">男方信息</span>
                        <el-form-item label="姓名" prop="mxm">
                            <el-input v-model="formdj.mxm" class="hyyydj__content__progress__div__input"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号码" prop="msfzh">
                            <el-input v-model="formdj.msfzh" class="hyyydj__content__progress__div__input"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="mcsrq">
                            <el-date-picker type="date" @change="dateChangem" v-model="formdj.mcsrq" placeholder="选择出生日期" style="width:250px"></el-date-picker>                            
                        </el-form-item>                        
                        <el-form-item label="民族" prop="mmz">
                            <el-select v-model="formdj.mmz" placeholder="请选择民族" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in mzs" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职业" prop="mzy">
                            <el-select v-model="formdj.mzy" placeholder="请选择职业" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in zys" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职业参考表" prop="mzyckb">
                            <el-select v-model="formdj.mzyckb" placeholder="请选择职业参考表" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in zyckbs" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="文化程度" prop="mwhcd">
                            <el-select v-model="formdj.mwhcd" placeholder="请选择文化程度" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in whcds" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="婚姻状况" prop="mhyzk">
                            <el-select v-model="formdj.mhyzk" placeholder="请选择婚姻状况" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in hyzks" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="常住户口所在地" required>
                            <el-row class="hyyydj__content__progress__div__row">
                                <el-col :span="24">                                
                                    <el-form-item prop="msheng">
                                        <el-select v-model="formdj.msheng" placeholder="请选择户口所在省" class="hyyydj__content__progress__div__input">                                    
                                            <el-option v-for="mz in shengs" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>                                    
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="hyyydj__content__progress__div__row">
                                <el-col :span="24">
                                    <el-form-item prop="mshi">
                                        <el-select v-model="formdj.mshi" placeholder="请选择户口所在市" class="hyyydj__content__progress__div__input">                                    
                                            <el-option v-for="mz in shis" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>                                    
                                        </el-select>
                                    </el-form-item>
                                </el-col>                                
                            </el-row>
                            <el-row class="hyyydj__content__progress__div__row">
                                <el-col :span="24">
                                    <el-form-item prop="mqu">
                                        <el-select v-model="formdj.mqu" placeholder="请选择户口所在区" class="hyyydj__content__progress__div__input">    
                                            <el-option v-for="mz in qus" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>                                    
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item prop="mjiedao">
                                        <el-input type="textarea" placeholder="请输入户口所在街道" v-model="formdj.mjiedao" class="hyyydj__content__progress__div__input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="msjh">
                            <el-input v-model="formdj.msjh" class="hyyydj__content__progress__div__input"></el-input>
                        </el-form-item>
                    </div>
                    <div class="hyyydj__content__progress__div__info hyyydj__content__progress__div__woman">
                        <span class="hyyydj__content__progress__divfour__title">女方信息</span>
                        <el-form-item label="姓名" prop="wxm">
                            <el-input v-model="formdj.wxm" class="hyyydj__content__progress__div__input"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号码" prop="wsfzh">
                            <el-input v-model="formdj.wsfzh" class="hyyydj__content__progress__div__input"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="wcsrq">
                            <el-date-picker type="date" @change="dateChangew" v-model="formdj.wcsrq" placeholder="选择出生日期" style="width:250px"></el-date-picker>                            
                        </el-form-item>                        
                        <el-form-item label="民族" prop="wmz">
                            <el-select v-model="formdj.wmz" placeholder="请选择民族" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in mzs" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职业" prop="wzy">
                            <el-select v-model="formdj.wzy" placeholder="请选择职业" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in zys" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职业参考表" prop="wzyckb">
                            <el-select v-model="formdj.wzyckb" placeholder="请选择职业参考表" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in zyckbs" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="文化程度" prop="wwhcd">
                            <el-select v-model="formdj.wwhcd" placeholder="请选择文化程度" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in whcds" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="婚姻状况" prop="whyzk">
                            <el-select v-model="formdj.whyzk" placeholder="请选择婚姻状况" class="hyyydj__content__progress__div__input">
                                <el-option v-for="mz in hyzks" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="常住户口所在地" required>
                            <el-row class="hyyydj__content__progress__div__row">
                                <el-col :span="24">                                
                                    <el-form-item prop="wsheng">
                                        <el-select v-model="formdj.wsheng" placeholder="请选择户口所在省" class="hyyydj__content__progress__div__input">                                    
                                            <el-option v-for="mz in shengs" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>                                    
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="hyyydj__content__progress__div__row">
                                <el-col :span="24">
                                    <el-form-item prop="wshi">
                                        <el-select v-model="formdj.wshi" placeholder="请选择户口所在市" class="hyyydj__content__progress__div__input">                                    
                                            <el-option v-for="mz in shis" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>                                    
                                        </el-select>
                                    </el-form-item>
                                </el-col>                                
                            </el-row>
                            <el-row class="hyyydj__content__progress__div__row">
                                <el-col :span="24">
                                    <el-form-item prop="wqu">
                                        <el-select v-model="formdj.wqu" placeholder="请选择户口所在区" class="hyyydj__content__progress__div__input">                                    
                                            <el-option v-for="mz in qus" :key="mz.text" :label="mz.text" :value="mz.text"></el-option>                                    
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item prop="wjiedao">
                                        <el-input type="textarea" placeholder="请输入户口所在街道" v-model="formdj.wjiedao" class="hyyydj__content__progress__div__input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="wsjh">
                            <el-input v-model="formdj.wsjh" class="hyyydj__content__progress__div__input"></el-input>
                        </el-form-item>
                    </div>
                </el-form>                
				<div class="hyyydj__content__progress__div__btngroupfour">
                    <el-button @click="vreturnThree" type="primary">上一步</el-button>
                    <el-button @click="fourToFive('ruleForm')" type="primary">下一步</el-button>
				</div>
			</div>
            <div class="hyyydj__content__progress__divfive" v-show="progress5">
                <img src="./img/finish.png" height="137" width="139" alt="图片加载失败，但是您已经预约成功！">
				<span class="hyyydj__content__progress__divfive__tip">
                    请于
                    <span class="hyyydj__content__progress__divfive__tip--highlight">{{formdj.djrq}}{{formdj.djsjd}}({{djsjd}})</span>
                    携带好材料到
                    <span class="hyyydj__content__progress__divfive__tip--highlight">{{formdj.djjg}}</span>
                    办理。
                </span>
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
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';

import { tableIds } from '@/api/tableId.js';
import { saveFormService } from '@/api/common.js'
import { checkMobile,checkIDCard } from '@/lib/verify.js'
export default {
    data() {
        var validateMidCard = (rule, value, callback) => {
            let idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            if(idCard.test(this.formdj.msfzh)){
                callback();                
            }else{
                callback(new Error('男方身份证号码有误！请重新输入!'));
            }
        };
        var validateWidCard = (rule, value, callback) => {
            let idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            if(idCard.test(this.formdj.wsfzh)){
                callback();                
            }else{
                callback(new Error('女方身份证号码有误！请重新输入!'));
            }
        };
        var validateMsjh = (rule, value, callback) => {
            let idCard = /^1[3,5,8]\d{9}$/;
            if(idCard.test(this.formdj.msjh)){
                callback();                
            }else{
                callback(new Error('女方手机号码有误！请重新输入!'));
            }
        };
        var validateWsjh = (rule, value, callback) => {
            let idCard = /^1[3,5,8]\d{9}$/;
            if(idCard.test(this.formdj.wsjh)){
                callback();                
            }else{
                callback(new Error('女方手机号码有误！请重新输入!'));
            }
        };
        return {
            page: 'hyyydj',
            params: [],
            active: 0,
            checked: false,
            progress1: true,
            progress2: false,
            progress3: false,
            progress4: false,
            progress5: false,
            formdj:{
                ssdq: "",
				djjg: "",
				djrq: "",
				djsjd: "",
				mxm: "",
				msfzh: "",
				mcsrq: "",
				mmz: "",
				mzy: "",
				mzyckb: "",
				mwhcd: "",
				mhyzk: "",
				//省市区街道合在一起为户口所在地
				msheng: "",
				mshi: "",
				mqu: "",
				mjiedao: "",
				msjh: "",
				wxm: "",
				wsfzh: "",
				wcsrq: "",
				wmz: "",
				wzy: "",
				wzyckb: "",
				wwhcd: "",
				whyzk: "",
				wsheng: "",
				wshi: "",
				wqu: "",
				wjiedao: "",
				wsjh: ""
            },
            rules:{
                mxm: [
                    { required: true, message: '请输入男方姓名', trigger: 'blur' }
                ],
				msfzh: [
                    { required: true,fieldName:'男方身份证号', validator: checkIDCard, trigger: 'blur' }
                ],
				mcsrq: [
                    { required: true, message: '请选择男方出生日期', trigger: 'change' }
                ],
				mmz: [
                    { required: true, message: '请选择男方民族', trigger: 'change' }
                ],
				mzy: [
                    { required: true, message: '请选择男方职业', trigger: 'change' }
                ],
				mzyckb: [
                    { required: true, message: '请选择男方职业参考表', trigger: 'change' }
                ],
				mwhcd: [
                    { required: true, message: '请选择男方文化程度', trigger: 'change' }
                ],
				mhyzk: [
                    { required: true, message: '请选择男方婚姻状况', trigger: 'change' }
                ],
				msheng: [
                    { required: true, message: '请选择男方户口所在省', trigger: 'change' }
                ],
				mshi: [
                    { required: true, message: '请选择男方户口所在市', trigger: 'change' }
                ],
				mqu: [
                    { required: true, message: '请选择男方户口所在区', trigger: 'change' }
                ],
				mjiedao: [
                    { required: true, message: '请输入男方户口所在街道', trigger: 'blur' }
                ],
				msjh: [
                    { required: true, fieldName: '男方手机号码',validator: checkMobile, trigger: 'blur' }
                ],
                wxm: [
                    { required: true, message: '请输入女方姓名', trigger: 'blur' }
                ],
				wsfzh: [
                    { required: true, fieldName: '女方身份证号', validator: checkIDCard,trigger: 'blur' }
                ],
				wcsrq: [
                    { required: true, message: '请选择女方出生日期', trigger: 'change' }
                ],
				wmz: [
                    { required: true, message: '请选择女方民族', trigger: 'change' }
                ],
				wzy: [
                    { required: true, message: '请选择女方职业', trigger: 'change' }
                ],
				wzyckb: [
                    { required: true, message: '请选择女方职业参考表', trigger: 'change' }
                ],
				wwhcd: [
                    { required: true, message: '请选择女方文化程度', trigger: 'change' }
                ],
				whyzk: [
                    { required: true, message: '请选择女方婚姻状况', trigger: 'change' }
                ],
				wsheng: [
                    { required: true, message: '请选择女方户口所在省', trigger: 'change' }
                ],
				wshi: [
                    { required: true, message: '请选择女方户口所在市', trigger: 'change' }
                ],
				wqu: [
                    { required: true, message: '请选择女方户口所在区', trigger: 'change' }
                ],
				wjiedao: [
                    { required: true, message: '请输入女方户口所在街道', trigger: 'blur' }
                ],
				wsjh: [
                    { required: true, fieldName: '女方手机号码',validator: checkMobile, trigger: 'blur' },
                ]
            },
            vareaopts:[
				{ text: "沈阳" },
				{ text: "大连" },
            ],
            vjgopts: [],
            vjgoptssy:[
				{ text: "沈河区民政局婚姻登记处" },
				{ text: "大东区民政局婚姻登记处" },
				{ text: "于洪区民政局婚姻登记处" },
				{ text: "铁西区民政局婚姻登记处" },
				{ text: "皇姑区民政局婚姻登记处" },
				{ text: "沈北新区民政局婚姻登记处" }
            ],
            vjgoptsdl:[
				{ text: "中山区民政局婚姻登记处" },
				{ text: "沙河口区民政局婚姻登记处" },
				{ text: "甘井子区民政局婚姻登记处" },
				{ text: "高新区民政局婚姻登记处" },
				{ text: "旅顺口区区民政局婚姻登记处" }
            ],
            mzs:[
				{ text: "汉族" },
				{ text: "满族" },
				{ text: "回族" },
				{ text: "维吾尔族" },
				{ text: "赫哲族" },
				{ text: "布依族" },
				{ text: "土家族" },
				{ text: "蒙古族" },
				{ text: "白族" },
				{ text: "傣族" }
			],
            zys:[
				{text:"国家机关"},
				{text:"工人"},
				{text:"农民"},
				{text:"商人"},
				{text:"其他"}
			],
			zyckbs:[
				{text:"个体"},
				{text:"务农"},
				{text:"公务员"}
			],
			whcds:[
				{text:"小学"},
				{text:"中学"},
				{text:"高中"},
				{text:"中专"},
				{text:"大专"},
				{text:"大学本科"},
				{text:"研究生"},
				{text:"博士及以上"}
			],
			hyzks:[
				{text:"未婚"},
				{text:"丧偶"},
				{text:"离异"}
			],
			shengs:[
				{text:"辽宁省"},
				{text:"吉林省"},
				{text:"黑龙江省"}
			],
			shis:[
				{text:"沈阳市"},
				{text:"大连市"},
				{text:"葫芦岛市"}
			],
			qus:[
				{text:"中山区"},
				{text:"西岗区"},
				{text:"沙河口区"},
				{text:"甘井子区"},
				{text:"旅顺口区"}
			],
            disableBeforeToday: {
          		disabledDate(time) {
            		return time.getTime() < Date.now() - 8.64e7;
         		}
            },
            djsjd: ''
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar': idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-footer': idtfooter,
        'idt-floatbar': idtfloatbar
    },
    created() {
        
    },
    methods: {
        dateChange(val){
            this.formdj.djrq = val;
        },
        dateChangem(val){
			this.formdj.mcsrq = val;
		},
        dateChangew(val){
			this.formdj.wcsrq = val;
		},
        oneToTwo(){
			if(this.checked){
				this.active = 1;
				this.progress1 = false;
				this.progress2 = true;
			}else{
				this.$message.error('请点击我同意！');
			}
        },
        vreturnOne(){
			this.active = 0;
			this.progress1 = true;
			this.progress2 = false;
        },
        twoToThree(){
			if(this.formdj.ssdq && this.formdj.djjg){
                this.active = 2;
				this.progress2 = false;
				this.progress3 = true;
			}else{
				this.$message.error("请选择所属地区和登记机关！");
			}
		},
        vreturnTwo(){
			this.active = 1;
			this.progress2 = true;
			this.progress3 = false;
		},
        threeToFour(){
			if(this.formdj.djrq && this.formdj.djsjd){
                this.active = 3;
				this.progress3 = false;
				this.progress4 = true;
			}else{
				this.$message.error('请选择预约的日期和时间段！');				
			}
		},
        vreturnThree(){
			this.active = 2;
			this.progress3 = true;
			this.progress4 = false;
		},
        fourToFive(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        tableId: tableIds.婚姻登记预约管理表,
                        params: { 所属地区: this.formdj.ssdq, 婚姻登记机关: this.formdj.djjg, 登记日期: this.formdj.djrq, 登记时间段: this.formdj.djsjd, 男方姓名: this.formdj.mxm, 男方身份证号: this.formdj.msfzh, 男方出生日期: this.formdj.mcsrq, 男方民族: this.formdj.mmz, 男方职业: this.formdj.mzy, 男方职业参考表: this.formdj.mzyckb, 男方文化程度: this.formdj.mwhcd, 男方婚姻状况: this.formdj.mhyzk, 男方户口所在地: this.formdj.msheng + this.formdj.mshi + this.formdj.mqu + this.formdj.mjiedao, 男方手机号: this.formdj.msjh, 女方姓名: this.formdj.wxm, 女方身份证号: this.formdj.wsfzh, 女方出生日期: this.formdj.wcsrq, 女方民族: this.formdj.wmz, 女方职业: this.formdj.wzy, 女方职业参考表: this.formdj.wzyckb, 女方文化程度: this.formdj.wwhcd, 女方婚姻状况: this.formdj.whyzk, 女方户口所在地: this.formdj.wsheng + this.formdj.wshi + this.formdj.wqu + this.formdj.wjiedao, 女方手机号: this.formdj.wsjh }
                    }
                    saveFormService(param).then(res => {
                        if(res.status === 'success'){
                            this.active = 5;
                            this.progress4 = false;
                            this.progress5 = true;
                            if(this.formdj.djsjd === '上午'){
                                this.djsjd = '08：30-11：30';
                            }else{
                                this.djsjd = '13：30-16：30';
                            }
                            // this.$message.success('恭喜您，登记成功！');
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(res => {
                        this.$message.error('网络连接异常，请检查网络连接！');
                    })
                } else {
                    return false;
                }
            });
        },
        lookssdq(){
            this.formdj.djjg = '';
            if(this.formdj.ssdq === '沈阳'){
                this.vjgopts = this.vjgoptssy;
            }
            if(this.formdj.ssdq === '大连'){
                this.vjgopts = this.vjgoptsdl;
            }
        }
    }
}

</script>

<style scoped>
/* 
    css belong to hyyy_dj.vue
*/
.hyyydj{
    width: 1260px;
    margin: 0 auto;
}
.hyyydj__content{
    width: 1250px;
    margin: 0 auto;
    background: url(./img/background.jpg) no-repeat;
    background-size: 100% 100%;
}
.hyyydj__content__line{
    width: 100%;
    border-top: 1px solid #c1c1c1;
}
.hyyydj__content__progress{
    width: 635px;
    margin: 20px auto;    
}
.hyyydj__content__progress__div{
    width: 500px;
    margin: 0 auto;
}
.hyyydj__content__progress__div__title{
    font-size: 18px;
    color: #3a8ad1;
    display: block;
    margin: 0 auto 20px auto;
    width: 175px;
}
.hyyydj__content__progress__div p{
    font-size: 12px;
    color: #666666;
}
.hyyydj__content__progress__div__check{
    width: 125px;
    margin: 20px auto;
}
.hyyydj__content__progress__div__sure{
    width: 85px;
    margin: 20px auto;
}
.hyyydj__content__progress__div__select{
    margin: 10px 0;
}
.hyyydj__content__progress__div__select span{
    width: 130px;
    display: inline-block;
}
.hyyydj__content__progress__div .hyyydj__content__progress__div__blue{
    font-weight: bold;
    padding-top: 20px;
    color: #3a8ad1;
}
.hyyydj__content__progress__div__btngroup{
    width: 165px;
    margin: 20px 70px;
}
.hyyydj__content__progress__div__datepickhead{
    display: inline-block;
}
.hyyydj__content__progress__div__datepick{
    display: inline-block;
}
.hyyydj__content__progress__div__yysj{
    width: 350px;
    margin: 30px 0;
}
.hyyydj__content__progress__div__yysjrow{
    height: 40px;
    border: 1px solid #cccccc;
    line-height: 40px;
    padding-left: 30px;
}
.hyyydj__content__progress__div__yysjcol{
    border-right: 1px solid #cccccc;
}
.hyyydj__content__progress__div__yysjcoltwo{
    padding-left: 30px;
}
.hyyydj--bordertopnone{
    border-top: none;
}
.hyyydj__content__progress__divfour{
    width: 885px;
    margin: 10px auto;
}
.hyyydj__content__progress__div__info{
    display: inline-block;
}
.hyyydj__content__progress__div__man{
    border-right: 1px solid #cccccc;
    width: 440px;    
}
.hyyydj__content__progress__div__woman{
    width: 380px;
    margin-left: 15px;
}
.hyyydj__content__progress__divfour__title{
    font-size: 18px;
    color: #3a8ad1;
    display: block;
    margin: 20px auto;
    width: 75px;
}
.hyyydj__content__progress__div__input{
    width: 250px;
}
.hyyydj__content__progress__div__row{
    margin-bottom: 20px;
}
.hyyydj__content__progress__div__btngroupfour{
    width: 165px;
    margin: 20px auto;
}
.hyyydj__content__progress__divfive{
    text-align: center;
    padding: 50px 0;
}
.hyyydj__content__progress__divfive__tip{
    display: block;
    font-size: 18px;
    margin-top: 30px;
}
.hyyydj__content__progress__divfive__tip--highlight{
    color: #5babf0;
}
</style>
