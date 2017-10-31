/*
 * @文档描述: 阳光政务权利清单-行政权力清单详细页之前
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-10-12 14:17:27 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-12 16:48:53
 */
<template>
    <div>
        <idt-header ref="idtheader"></idt-header>
        <idt-navbar></idt-navbar>
        <div class="xzqlqddetail" id="xzqlqddetail">
            <div class="xzqlqddetail__shixiang">
                <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
                <div class="xzqlqddetail__shixiang__botline"></div>
                <div class="xzqlqddetail__shixiang__wrap">
                    <div class="xzqlqddetail__shixiang__title" :title="obj.职权名称">{{ obj.职权名称 }}</div>
                    <div class="xzqlqddetail__shixiang__btn">
                        <el-button type="primary" @click="toXzqlqdDetail"><img class="xzqlqddetail__shixiang__title__btn__img" src="./img/办事指南.png">办事指南</el-button>
                    </div>
                    <div style="clear: both;"></div>
                    <table class="xzqlqddetail__shixiang__table">
                        <tr class="xzqlqddetail__shixiang__row">
                            <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">事项编号</td>
                            <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.职权编码 }}</td>
                        </tr>
                        <tr class="xzqlqddetail__shixiang__row">
                            <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">事项类型</td>
                            <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.职权类别 }}</td>
                        </tr>
                        <tr class="xzqlqddetail__shixiang__row">
                            <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">责任主体</td>
                            <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.责任主体 }}</td>
                        </tr>
                        <tr class="xzqlqddetail__shixiang__row">
                            <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">问责依据</td>
                            <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.问责依据 }}</td>
                        </tr>
                        <tr class="xzqlqddetail__shixiang__row">
                            <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">职权依据</td>
                            <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.职权依据 }}</td>
                        </tr>
                        <tr class="xzqlqddetail__shixiang__row">
                            <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop--bz">备注</td>
                            <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__contenttop--bz">{{ obj.备注 }}</td>
                        </tr>
                    </table>
                    <div class="xzqlqddetail__xuanxiangka">
                        <div class="xzqlqddetail__xuanxiangka__title">
                            <img src="./img/初始化流程视图.png">流程图
                        </div>
                        <img class="xzqlqddetail__xuanxiangka__img" :src="obj.流程图 ? 'data:image/jpeg;base64,' + obj.流程图 : '/static/img/img-null.png'" alt="流程图加载失败">
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
import xzqlqddetail from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqddetail.js';
import { tableIds } from '@/api/tableId.js';

let Base64 = require('js-base64');
if (!Base64.decode) {
    Base64 = Base64.Base64;
}

export default {
    data() {
        return {
            page: 'xzqlqddetailygzw',
            params: [],
            wzid: '',
            obj: {}
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
        this.getuuid();
    },
    methods: {
        getuuid() {
            this.wzid = queryString('WZID');
            this.getdata();
        },
        getdata() {
            xzqlqddetail({ uuid: this.wzid }).then(res => {
                if (res.status === 'success') {
                    this.obj = res.data;
                    console.log(res.data);
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            })
        },
        toXzqlqdDetail() {
            window.location.href = "/qlqd/xzqlqddetail/index.html?WZID=" + this.obj.UUID;
        }
    }
}

</script>

<style scoped>
/* 
    css belong to xzqlqd_detail.vue
*/

.xzqlqddetail {
    width: 1260px;
    margin: 0 auto;
}

.xzqlqddetail__shixiang {
    width: 1250px;
    margin: 0 auto;
    background: url(./img/background.jpg) no-repeat;
    background-size: 100% 100%;
}

.xzqlqddetail__shixiang__texttop{
    height: 32px;
    line-height: 32px;
    color: #666666;
    border: 1px solid #cccccc;
}

.xzqlqddetail__shixiang__headtop {
    background: #eef5fc;
    text-align: center;
    width: 205px;
    vertical-align: middle;    
}

.xzqlqddetail__shixiang__head {
    background: #eef5fc;
    text-align: center;
}

.xzqlqddetail__shixiang__contenttop {
    padding-left: 10px;
    overflow-y: auto;
    width: 1040px;
}

.xzqlqddetail__shixiang__content {
    text-indent: 10px;
    overflow-y: auto;
}

.xzqlqddetail__shixiang__row .xzqlqddetail__shixiang__zqmc {
    height: 70px;
}

.xzqlqddetail__shixiang__text {
    height: 32px;
    line-height: 30px;
    color: #666666;
    border: 1px solid #e4e4e4;
}

.xzqlqddetail__shixiang__title {
    width: fit-content;
    max-width: 840px;
    height: 60px;
    line-height: 60px;
    color: #3a8ad1;
    font-size: 24px;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
}

.xzqlqddetail__shixiang__btn {
    margin: 0 10px 10px 0;
    width: 120px;
    float: right;
}

.xzqlqddetail__shixiang__title__btn__img{
    width: 16px;
    vertical-align: middle;
    margin-right: 10px;
}

.xzqlqddetail__xuanxiangka {
    margin: 30px 0 50px;
    border: 1px solid #cdcdcd;
    text-align: center;    
}

.xzqlqddetail__zhiquanyijv {
    text-align: center;
}

.xzqlqddetail__shixiang__row .xzqlqddetail__shixiang__content__sfyj {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.xzqlqddetail__shixiang__headtop--zxzx{
    width: 100px;
    color: #666666;
    border: 1px solid #cccccc;
    text-align: center;
    height: 30px;
    line-height: 30px;
}

.xzqlqddetail__shixiang__headtop--parent{
    border-left: none;
    border-top: none;    
}

.xzqlqddetail__shixiang__headtop--child{
    border-left: none;
    border-bottom: none;    
}

.xzqlqddetail__shixiang__headtop--sxmc{
    background: #eef5fc;
    text-align: center;
    width: 205px;
    color: #666666;
    border: 1px solid #cccccc;
    vertical-align: middle;
}

.xzqlqddetail__shixiang__headtop__content{
    height: 30px;
    line-height: 30px;
    border: 1px solid #cccccc;
    color: #666666;
    padding-left: 10px;
    width: 935px;
}

.xzqlqddetail__shixiang__headtop--parentcontent{
    border-top: none;
    border-right: none;
}

.xzqlqddetail__shixiang__headtop--childcontent{
    border-bottom: none;
    border-right: none;
}

.xzqlqddetail__shixiang__contenttop--sxmc{
    border: 1px solid #ccc;
}

.xzqlqddetail__shixiang__texttop--bz{
    height: 60px;
    max-height: 60px;
    color: #666666;
    border: 1px solid #cccccc;
}

.xzqlqddetail__shixiang__contenttop--bz{
    border: 1px solid #cccccc;
    color: #666666;
    line-height: 30px;
}

.xzqlqddetail__shixiang__title__bszn{
    float: right;
    margin-right: 10px;
}

.xzqlqddetail__shixiang__botline{
    width: 100%;
    border-top: 1px solid #cbcbcb;
}

.xzqlqddetail__shixiang__wrap{
    width: 1000px;
    margin: 20px auto;
}

.xzqlqddetail__xuanxiangka__title{
    font-size: 21px;
    color: #399aff;
    text-align: center;
    border-bottom: 1px solid #cdcdcd;
    padding: 10px;
    background-color: #eef4fc;
}

.xzqlqddetail__xuanxiangka__title img{
    vertical-align: text-bottom;
    margin-right: 10px;
}

.xzqlqddetail__shixiang__table:hover,.xzqlqddetail__xuanxiangka:hover{
    box-shadow: 0px 0px 10px 1px #bfcbd9;
}
.xzqlqddetail__xuanxiangka__img{
    width: 100%;
    height: auto;
}
</style>
