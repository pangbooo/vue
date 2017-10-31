/*
 * @文档描述: 查看我的评价
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-25 19:54:28 
 * @Last Modified by: 李文达
 * @Last Modified time: 2017-10-07
 */
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="ckpj" id="ckpj">
        <div class="ckpj__content">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            <div class="ckpj__content__left">
                <idt-personInfo></idt-personInfo>
            </div>
            <div class="ckpj__content__div">
                <h1>{{ title }}</h1>
                <div class="ckpj__content__div__pingfen">综合评分：
                    <div class="ckpj__content__div__pingfen__rate">
                        <el-rate v-model="rateValue" disabled-void-color="#c0c0c0" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                    </div>
                </div>
                <div class="ckpj__content__div__manyidu">满意度：
                    <span class="ckpj__content__div__manyidu__bule">{{ zonghemanyidu }}%</span>
                </div>
                <div style="clear: both;"></div>
                <div class="ckpj__content__div__pingfenbar">
                    <el-row class="ckpj__content__div__pingfenbar__row">
                        <el-col :span="12">
                            <span class="ckpj__content__div__head">非常满意</span>
                            <div class="ckpj__content__div__bar">
                                <div id="ckpj__content__div__bar__verypleasure"></div>
                            </div>
                            <span class="ckpj__content__div__percentpingfen ckpj__content__div--verypleasure">{{ verypleasure }}%</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="ckpj__content__div__head">满意</span>
                            <div class="ckpj__content__div__bar">
                                <div id="ckpj__content__div__bar__pleasure"></div>
                            </div>
                            <span class="ckpj__content__div__percentpingfen ckpj__content__div--pleasure">{{ pleasure }}%</span>
                        </el-col>
                    </el-row>
                    <el-row class="ckpj__content__div__pingfenbar__row">
                        <el-col :span="12">
                            <span class="ckpj__content__div__head">一般</span>
                            <div class="ckpj__content__div__bar">
                                <div id="ckpj__content__div__bar__justsoso"></div>
                            </div>
                            <span class="ckpj__content__div__percentpingfen ckpj__content__div--justsoso">{{ justsoso }}%</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="ckpj__content__div__head">不满意</span>
                            <div class="ckpj__content__div__bar">
                                <div id="ckpj__content__div__bar__unpleasure"></div>
                            </div>
                            <span class="ckpj__content__div__percentpingfen ckpj__content__div--unpleasure">{{ unpleasure }}%</span>
                        </el-col>
                    </el-row>
                    <el-row class="ckpj__content__div__pingfenbar__row">
                        <el-col :span="12">
                            <span class="ckpj__content__div__head">失望</span>
                            <div class="ckpj__content__div__bar">
                                <div id="ckpj__content__div__bar__disappointment"></div>
                            </div>
                            <span class="ckpj__content__div__percentpingfen ckpj__content__div--disappointment">{{ disappointment }}%</span>
                        </el-col>
                    </el-row>
                </div>
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

import { queryString } from '@/lib/publicFun.js';
// import { LMIDS } from '@/api/lmManage.js';
import { tableIds } from '@/api/tableId.js';
import { getPjjgsx } from '@/api/common.js'
import xzqlqddetail from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqddetail.js';

export default {
    data() {
        return {
            page: 'myckpj',
            params: [],
            wzid: '',
            title: '',
            rateValue: 4.2,
            verypleasure: '0',
            pleasure: '0',
            justsoso: '0',
            unpleasure: '0',
            disappointment: '0'
        }
    },
    computed: {
        zonghemanyidu(){
            return parseInt(this.verypleasure) + parseInt(this.pleasure);
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
        this.getsxinfo();
    },
    methods: {
        getsxinfo(){
            this.wzid = queryString('WZID');
            this.params = [
                { id: 'xzqlqdlb', val: '' },
                { id: 'xzqlqddetail', val: 'WZID=' + this.wzid }
            ];
            xzqlqddetail({ uuid: this.wzid }).then(res => {
                if(res.status === 'success'){
                    this.title = res.data.职权名称;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
            getPjjgsx({ matterid: this.wzid }).then(res => {
                if(res.status === 'success'){
                    this.rateValue = res.data.avg.AVG;
                    if(res.data.sum.length > 0){
                        let sum = 0;
                        for(let j=0;j<res.data.sum.length;j++){
                            sum += res.data.sum[j].PFJGZJ;
                        }
                        for(let i=0;i<res.data.sum.length;i++){
                            if(res.data.sum[i].PJJG === '5'){
                                this.verypleasure = parseInt(res.data.sum[i].PFJGZJ / sum * 100);
                                let verypleasureBar = document.getElementById('ckpj__content__div__bar__verypleasure');
                                verypleasureBar.style.width = this.verypleasure + '%';
                            }
                            if(res.data.sum[i].PJJG === '4'){
                                this.pleasure = parseInt(res.data.sum[i].PFJGZJ / sum * 100);
                                let pleasureBar = document.getElementById('ckpj__content__div__bar__pleasure');
                                pleasureBar.style.width = this.pleasure + '%';
                            }
                            if(res.data.sum[i].PJJG === '3'){
                                this.justsoso = parseInt(res.data.sum[i].PFJGZJ / sum * 100);
                                let justsosoBar = document.getElementById('ckpj__content__div__bar__justsoso');
                                justsosoBar.style.width = this.justsoso + '%';
                            }
                            if(res.data.sum[i].PJJG === '2'){
                                this.unpleasure = parseInt(res.data.sum[i].PFJGZJ / sum * 100);
                                let unpleasureBar = document.getElementById('ckpj__content__div__bar__unpleasure');
                                unpleasureBar.style.width = this.unpleasure + '%';
                            }
                            if(res.data.sum[i].PJJG === '1'){
                                this.disappointment = parseInt(res.data.sum[i].PFJGZJ / sum * 100);
                                let disappointmentBar = document.getElementById('ckpj__content__div__bar__disappointment');
                                disappointmentBar.style.width = this.disappointment + '%';
                            }
                        }
                    }else{
                        let verypleasureBar = document.getElementById('ckpj__content__div__bar__verypleasure');
                        verypleasureBar.style.width = this.verypleasure + '%';
                        let pleasureBar = document.getElementById('ckpj__content__div__bar__pleasure');
                        pleasureBar.style.width = this.pleasure + '%';
                        let justsosoBar = document.getElementById('ckpj__content__div__bar__justsoso');
                        justsosoBar.style.width = this.justsoso + '%';
                        let unpleasureBar = document.getElementById('ckpj__content__div__bar__unpleasure');
                        unpleasureBar.style.width = this.unpleasure + '%';
                        let disappointmentBar = document.getElementById('ckpj__content__div__bar__disappointment');
                        disappointmentBar.style.width = this.disappointment + '%';
                    }
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                console.log(res);
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
    }
}

</script>

<style scoped>
/* 
    css belong to pjlb.vue
*/
.ckpj{
    width: 1260px;
    margin: 0 auto;
}
.ckpj__content{
    width: 1260px;
    margin: 0 auto;
    overflow: hidden;
}
.ckpj__content__left{
    float: left;
}
.ckpj__content__div{
    width: 1000px;float: right;overflow:hidden;  
}
.ckpj__content__div h1{
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #666;
    font-size: 24px;
    max-width: 750px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 45px auto 25px auto;
}
.ckpj__content__div__manyidu{
    color: #666;
    width: 130px;
    float: right;
}
.ckpj__content__div__manyidu__bule{
    color: #3a8ad1;
}
.ckpj__content__div__pingfen{
    color: #666;
    width: 300px;
    float: right;    
}
.ckpj__content__div__pingfen__rate{
    display: inline-block;
}
.ckpj__content__div__pingfenbar{
    width: 950px;
    margin: 30px auto 100px auto;
}
.ckpj__content__div__head{
    color: #666;
    width: 80px;
    display: inline-block;
    text-align: right;
    padding-right: 20px;
}
.ckpj__content__div__bar{
    display: inline-block;
    width: 300px;
    border: 1px solid #e6e6e6;
    height: 10px;
    border-radius: 5px;
}
.ckpj__content__div__percentpingfen{
    color: #666;
    display: inline-block;
    width: 50px;
    text-align: right;
}
#ckpj__content__div__bar__verypleasure{
    height: 100%;
    width: 0;
    background-color: #b8b504;
    border-radius: 5px;    
}
#ckpj__content__div__bar__pleasure{
    height: 100%;
    width: 0;
    background-color: #3e95db;
    border-radius: 5px;    
}
#ckpj__content__div__bar__justsoso{
    height: 100%;
    width: 0;
    background-color: #ed90c6;
    border-radius: 5px;
}
#ckpj__content__div__bar__unpleasure{
    height: 100%;
    width: 0;
    background-color: #e1313d;
    border-radius: 5px;
}
#ckpj__content__div__bar__disappointment{
    height: 100%;
    width: 0;
    background-color: #845b5d;
    border-radius: 5px;
}
.ckpj__content__div__pingfenbar__row{
    margin: 10px 0;
}
.ckpj__content__div--verypleasure{
    color: #b8b504;
}
.ckpj__content__div--pleasure{
    color: #3e95db;
}
.ckpj__content__div--justsoso{
    color: #ed90c6;
}
.ckpj__content__div--unpleasure{
    color: #e1313d;
}
.ckpj__content__div--disappointment{
    color: #845b5d;
}
</style>
