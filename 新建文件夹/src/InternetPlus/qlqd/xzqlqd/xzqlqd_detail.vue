/** 
 * 文档描述: 权利清单-行政权力清单详细页
 * 作者: rita.ma 
 * 创建时间: 2017-09-21 16:42:40 
 * 最后修改人: rita.ma 
 * 最后修改时间: 2017-09-21 16:42:40 
 */

<template>
    <div>
        <idt-header ref="idtheader"></idt-header>
        <idt-navbar></idt-navbar>
        <div class="xzqlqddetail" id="xzqlqddetail">
            <div class="xzqlqddetail__shixiang">
                <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
                <el-row class="xzqlqddetail__shixiang__title__row">
                    <el-col class="xzqlqddetail__shixiang__title" :title="obj.职权名称" :span="16">{{ obj.职权名称 }}</el-col>
                    <el-col class="xzqlqddetail__shixiang__title__btn" :span="8">
                        <el-button type="primary" @click="toSxsbdj" size="small">在线办理</el-button>
                        <el-button type="primary" @click="toCkpj" size="small">查看评价</el-button>
                        <el-button type="primary" @click="toWyzx" size="small">我要咨询</el-button>
                        <el-button type="primary" @click="saveMyCollection" v-if="!disabled" :disabled="disabled" size="small">我要收藏</el-button>
                        <el-button type="primary" @click="saveMyCollection" v-else :disabled="disabled" size="small">已收藏</el-button>
                    </el-col>
                </el-row>
                <table class="xzqlqddetail__shixiang__table">
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">事项编码</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.职权编码 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">事项类型</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.职权类别 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row--sxmc">
                        <td class="xzqlqddetail__shixiang__headtop--sxmc">事项名称</td>
                        <td class="xzqlqddetail__shixiang__contenttop--sxmc">
                            <tr>
                                <td class="xzqlqddetail__shixiang__headtop--zxzx xzqlqddetail__shixiang__headtop--parent">总项</td>
                                <td class="xzqlqddetail__shixiang__headtop__content xzqlqddetail__shixiang__headtop--parentcontent">{{ obj.职权名称 }}</td>
                            </tr>
                            <tr>
                                <td class="xzqlqddetail__shixiang__headtop--zxzx xzqlqddetail__shixiang__headtop--child">子项</td>
                                <td class="xzqlqddetail__shixiang__headtop__content xzqlqddetail__shixiang__headtop--childcontent">{{ obj.子项名 }}</td>
                            </tr>
                        </td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">责任主体</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.责任主体 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">实施机构</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.实施主体 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">办理地点</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.办理地点 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">法定办结时限</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.法定期限 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">承诺办结时限</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.承诺时限 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">咨询电话</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.联系电话 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">监督电话</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.投诉电话 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">问责依据</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.问责依据 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop">责任依据</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__texttop">{{ obj.责任依据 }}</td>
                    </tr>
                    <tr class="xzqlqddetail__shixiang__row">
                        <td class="xzqlqddetail__shixiang__headtop xzqlqddetail__shixiang__texttop--bz">备注</td>
                        <td class="xzqlqddetail__shixiang__contenttop xzqlqddetail__shixiang__contenttop--bz">{{ obj.备注 }}</td>
                    </tr>
                </table>
                <div class="xzqlqddetail__xuanxiangka">
                    <el-tabs type="border-card">
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '行政裁决'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">裁决条件</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">裁决种类</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">裁决收费及依据</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text xzqlqddetail__shixiang__content__sfyj" :title="obj.收费依据" :span="20">{{ obj.收费依据 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">收费标准</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.收费标准 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">裁决程序</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.裁决程序 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '行政许可' || obj.职权类别 === '其他权力'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">受理条件</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">是否收费</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">收费依据</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text xzqlqddetail__shixiang__content__sfyj" :title="obj.收费依据" :span="20">{{ obj.收费依据 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">收费标准</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.收费标准 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '行政给付'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">给付条件</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">给付类型</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">给付标准</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text xzqlqddetail__shixiang__content__sfyj" :title="obj.是否收费" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">给付期限</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.收费标准 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '行政征收'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">征收条件/程序</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">征收类型</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">征收标准</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text xzqlqddetail__shixiang__content__sfyj" :title="obj.是否收费" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '行政奖励'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">受理条件</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">是否收费</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">收费依据</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text xzqlqddetail__shixiang__content__sfyj" :title="obj.收费依据" :span="20">{{ obj.收费依据 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">收费标准</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.收费标准 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '便民服务'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">受理条件</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">是否收费</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">收费依据</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text xzqlqddetail__shixiang__content__sfyj" :title="obj.收费依据" :span="20">{{ obj.收费依据 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">收费标准</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.收费标准 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '行政强制'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">强制条件</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">强制种类及执行方式</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">强制期限</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text xzqlqddetail__shixiang__content__sfyj" :title="obj.收费依据" :span="20">{{ obj.收费依据 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" v-if="obj.职权类别 === '行政处罚'">
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">处罚种类</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.审批条件 }}</el-col>
                            </el-row>
                            <el-row class="xzqlqddetail__shixiang__row">
                                <el-col class="xzqlqddetail__shixiang__head xzqlqddetail__shixiang__text" :span="4">自由裁量</el-col>
                                <el-col class="xzqlqddetail__shixiang__content xzqlqddetail__shixiang__text" :span="20">{{ obj.是否收费 }}</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="设定依据">
                            <div v-html="obj.职权依据"></div>
                            <div v-if="!obj.职权依据" class="xzqlqddetail__zhiquanyijv">
                                <img src="./img/data-null.png" alt="暂无数据">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="权力流程图">
                            <img class="xzqlqddetail__shixiang__row__lct" :src="obj.流程图 ? 'data:image/jpeg;base64,' + obj.流程图 : '/static/img/img-null.png'" alt="流程图加载失败">
                        </el-tab-pane>
                        <el-tab-pane label="申请材料">
                            <el-table ref="singleTable" :data="obj.cllist" tooltip-effect="light" highlight-current-row style="width: 100%">
                                <el-table-column type="index" label="序号" width="70"></el-table-column>
                                <el-table-column property="MATERIAL_NAME" show-overflow-tooltip label="材料名称" width=""></el-table-column>
                                <el-table-column property="MATERIAL_ATTR" show-overflow-tooltip label="材料来源" width="100"></el-table-column>
                                <el-table-column property="MATERIAL_OUTLINE" show-overflow-tooltip label="材料说明" width="230"></el-table-column>
                                <el-table-column label="操作" width="120">
                                    <template scope="scope">
                                        <el-button :disabled="!scope.row.MATERIAL_UUID" size="small" type="primary" @click="fujianDownload(scope.row)">附件下载</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <idt-footer></idt-footer>
        <idt-floatbar></idt-floatbar>
        <idt-quicklogin v-if="logindialogVisible" :back="false" @loginSuccess="loginSuccess"></idt-quicklogin>
    </div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header.vue';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import quicklogin from '@/InternetPlus/common/quicklogin/quicklogin';

import { queryString,downloadFile } from '@/lib/publicFun.js';
import xzqlqddetail from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqddetail.js';
import { webDownload } from '@/api/common.js';
import { checkMyFavorites, webSaveMyForm } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';

let Base64 = require('js-base64');
if (!Base64.decode) {
    Base64 = Base64.Base64;
}

export default {
    data() {
        return {
            page: 'xzqlqddetail',
            params: [],
            wzid: '',
            obj: {},
            disabled: false,
            logindialogVisible: false,
            title:''
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar': idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-footer': idtfooter,
        'idt-quicklogin': quicklogin,
        'idt-floatbar': idtfloatbar
    },
    created() {
        this.getuuid();

        if(queryString("fwlb") === 'grbs'){
            this.title = '个人办事'
        } else if(queryString("fwlb") === 'frbs') {
            this.title = '法人办事'
        } else if(queryString("fwlb") === 'ggfw') {
            this.title = '公共服务'
        } else {
            this.title = null
        }

        this.params = [
            { id: 'xzqlqdlb', displayName:this.title,val:'fwlb='+queryString("fwlb")}
        ];
    },
    methods: {
        getuuid() {
            this.wzid = queryString('WZID');
            this.getdata();
            // this.checkSelection();
        },
        getdata() {
            xzqlqddetail({ uuid: this.wzid }).then(res => {
                if (res.status === 'success') {
                    // console.log(res);
                    // res.data.职权依据 = Base64.decode(res.data.职权依据);
                    this.obj = res.data;
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            })
        },
        fujianDownload(row) {
            downloadFile(tableIds.材料基本信息表,row.MATERIAL_UUID);
        },
        toSxsbdj() {
            // if (localStorage.getItem('idt_App_token')) {
                window.location.href = "/wsbs/sxsbdj/index.html?WZID=" + this.obj.UUID;
            // } else {
            //     this.$message.error('您未登录，2秒后跳转到登录页，请登录');
            //     setTimeout(() => {
            //         window.location.href = "/user/login/index.html";
            //     }, 2000);
            // }
        },
        toCkpj() {
            window.location.href = "/wsbs/ckpj/index.html?WZID=" + this.obj.UUID;
        },
        toWyzx() {
            if (localStorage.getItem('idt_App_token')) {
                window.location.href = "/zxts/wyzx/index.html?WZID=" + this.obj.UUID;
            } else {
                this.$message.error('您未登录，2秒后跳转到登录页，请登录');
                setTimeout(() => {
                    window.location.href = "/user/login/index.html";
                }, 2000);
            }
        },
        saveMyCollection() {
            this.checkSelection().then(data => {
                if (!this.disabled) {
                    let params = {
                        tableId: tableIds.我的收藏,
                        ownerColname: '收藏人',
                        params: { 表名: tableIds.事项基本信息, 对应主键: this.obj.UUID }
                    };
                    webSaveMyForm(params).then(res => {
                        if (res.status === 'success') {
                            this.$message.success('收藏成功！');
                            this.disabled = true;
                        } else {
                            
                        }
                    })
                }
                
            });
            
            
        },
        loginSuccess() {
            this.saveMyCollection();
        },
        checkSelection() {
            if (!this.disabled) {
                let params = {
                    tableId: tableIds.事项基本信息,
                    uuid: this.wzid
                };
                return checkMyFavorites(params).then(res => {
                    if (res.status === 'success') {
                        if (!res.data.UUID) {
                            this.disabled = false;
                        } else {
                            this.disabled = true;
                        }
                    } else {
                        this.logindialogVisible = true;
                    }
                })
            }
            
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
    height: 60px;
    line-height: 60px;
    color: #3a8ad1;
    font-size: 24px;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.xzqlqddetail__shixiang__title__btn {
    margin-top: 15px;
    float: right;
}

.xzqlqddetail__xuanxiangka {
    margin: 30px 0 50px;
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
.xzqlqddetail__shixiang__row__lct{
    width: 100%;
    height: auto;
}
</style>
