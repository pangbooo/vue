<template>
    <!--
            作者：李文达Leo
            手机：15040481637
            时间：2017年8月1日
            模块：内容维护列表
            -->
    <div>
        <div class="nrwh__content__btn">
            <el-button v-for="nb in navBtn" type="primary" :key="nb.key" v-if="lmqx.XGQX" :disabled="nb.disable" @click="btnclick(nb.lable)">{{ nb.lable }}</el-button>
        </div>
        <div class="nrwh__content__list">
            <el-table ref="multipleTable" :data="contentList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @cell-dblclick="showArticleWindow">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column  label="标题">
                    <template scope="scope">
                        <el-button v-if="scope.row.SFTJ=='1'" type="danger" size="mini" class="nrwh__recommend">荐</el-button><span class="">{{ scope.row.WZBT }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ZYX" label="重要性" width="100" align="center"></el-table-column>
                <el-table-column prop="FBSJ" label="发布日期" width="120" align="center"></el-table-column>
                <el-table-column prop="XXSJ" label="下线日期" width="120" align="center"></el-table-column>
            </el-table>
        </div>
        <!-- 组件 -->
        <div class="vddArticle__wrap">
            <v-addArticle v-if="isAddArticle" @close-Window="closeArticleWindow" ref="editor" :lmid="uuid" :lmmc="lmmc" :uuid="wzuuid" @reload-Window="reloadArticleWindow"></v-addArticle>
        </div>
    </div>
</template>

<script>
import addArticle from "@/manage/AddArticle/AddArticle"

import getNianTie from '@/services/manage/wzgl/getNianTie.js';
import delWz from '@/services/manage/wzgl/delWz.js';
import tuijianfn from '@/services/manage/wzgl/tuijian.js';
import canceltuijianfn from '@/services/manage/wzgl/canceltuijian.js';
export default {
    data() {
        return {
            navBtn: [
                { key: 1, lable: "新增", disable: false },
                { key: 2, lable: "撤稿", disable: true },
                { key: 3, lable: "复制", disable: true },
                { key: 4, lable: "剪切", disable: true },
                { key: 5, lable: "黏贴", disable: true },
                { key: 6, lable: "推荐", disable: true },
                { key: 7, lable: "取消推荐", disable: true },
            ],
            multipleSelection: [],
            fuzhi: false,
            fuzhiArr: [],
            jianqie: false,
            jianqieArr: [],
            isAddArticle: false,
            wzuuid: ''
        }
    },
    props: {
        contentList: {
            type: Array,
            default: []
        },
        uuid: {
            type: String,
            default: ''
        },
        lmmc: {
            type: String,
            default: ''
        },
        lmqx: {
            type: Object
        }
    },
    computed: {

    },
    components: {
        'v-addArticle': addArticle
    },
    watch: {
        fuzhi: function(val, oldVal) {
            if (val === true) {
                this.navBtn[4].disable = false;
            }
        },
        jianqie: function(val, oldVal) {
            if (val === true) {
                this.navBtn[4].disable = false;
            }
        },
        contentList: {
            handler: function() {
                for (let i = 0; i < this.contentList.length; i++) {
                    this.contentList[i].FBSJ = this.format(this.contentList[i].FBSJ);
                    this.contentList[i].XXSJ = this.format(this.contentList[i].XXSJ);
                }
            },
            deep: true
        }
    },
    methods: {
        add0(m) { return m < 10 ? '0' + m : m },
        format(shijianchuo) {
            //shijianchuo是整数，否则要parseInt转换
            let time = new Date(shijianchuo);
            let y = time.getFullYear();
            let m = time.getMonth() + 1;
            let d = time.getDate();
            // let h = time.getHours();
            // let mm = time.getMinutes();
            // let s = time.getSeconds();
            return y + '-' + this.add0(m) + '-' + this.add0(d);
        },
        btnclick: function(val) {
            if (val === "新增") {
                this.showArticleWindow();
            } else if (val === "撤稿") {
                this.cheGao();
            } else if (val === "复制") {
                this.fuZhi();
            } else if (val === "剪切") {
                this.jianQie();
            } else if (val === "黏贴") {
                this.nianTie();
            } else if (val === "保存重要性") {
                this.zhongYaoXing();
            } else if (val === "推荐") {
                this.tuijian();
            } else if (val === "取消推荐") {
                this.canceltuijian();
            }
        },
        tuijian: function() {
            let args = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                args.push([this.multipleSelection[i].UUID]);
            }
            let params = { uuids: args };
            tuijianfn(params).then(res => {
                if (res.status === "success") {
                    this.$message.success('操作成功！');
                    this.$emit('reloadGrid');
                }
            });
        }, canceltuijian: function() {
            let args = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                args.push([this.multipleSelection[i].UUID]);
            }
            let params = { uuids: args };
            canceltuijianfn(params).then(res => {
                if (res.status === "success") {
                    this.$message.success('操作成功！');
                    this.$emit('reloadGrid');
                }
            });
        },
        cheGao: function(argument) {
            console.log("撤稿+" + this.uuid + this.multipleSelection);
            let args = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                args.push(this.multipleSelection[i].UUID);
            }
            let params = { uuids: args };
            delWz(params).then(res => {
                if (res.status === "success") {
                    this.$message.success('删除成功！');
                    this.$emit('reloadGrid');
                } else {
                    this.$message.error('删除失败，请联系管理员！');
                }
            });
        },
        closeArticleWindow: function(val) {
            this.isAddArticle = val;
            console.log(1);
            this.$emit('reloadGrid');
        },
        fuZhi: function(argument) {
            this.fuzhi = true
            this.jianqie = false
            this.fuzhiArr = this.multipleSelection
        },
        //在栏目管理表格复选框改变时
        handleSelectionChange: function(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
            if (this.multipleSelection.length > 0) {
                this.navBtn[1].disable = false;
                this.navBtn[2].disable = false;
                this.navBtn[3].disable = false;
                this.navBtn[5].disable = false;
                this.navBtn[6].disable = false;
                if (this.fuzhi !== false || this.jianqie !== false) {
                    this.navBtn[4].disable = false;
                }
            } else {
                this.navBtn[1].disable = true;
                this.navBtn[2].disable = true;
                this.navBtn[3].disable = true;
                this.navBtn[4].disable = true;
                this.navBtn[5].disable = true;
                this.navBtn[6].disable = true;
            }
        },
        jianQie: function(argument) {
            this.jianqie = true
            this.fuzhi = false
            this.jianqieArr = this.multipleSelection
        },
        nianTie: function(argument) {
            let param = {
                uuid: this.uuid
            }
            if (this.fuzhi) {
                param.dataarr = this.fuzhiArr
            } else {
                param.dataarr = this.jianqieArr
            }
            getNianTie(param).then(data => {
                this.contentList = data.result.DataList;
                this.fuzhi = false
                this.jianqie = false
                this.navBtn[4].disable = true;
                this.$message({
                    message: '成功',
                    type: 'success',
                    duration: 2000
                });
            })
        },
        reloadArticleWindow() {
            let self = this;
            this.isAddArticle = false
            this.wzuuid = '';
            let timer = setInterval(function() {
                console.log(self)
                if (!self.$refs.editor) {
                    self.isAddArticle = true
                    clearInterval(timer);
                }
            }, 10);
        },
        showArticleWindow: function(rowData) {
            // console.log(rowData);
            this.wzuuid = rowData ? rowData.UUID : '';
            this.isAddArticle = true
        },
        zhongYaoXing: function(argument) {
            this.isAddArticle = true
            allpartPlgl(param).then(data => {
                this.contentList = data.result.DataList;
            })
        }
    }
}
</script>

<style scoped>
.nrwh__content__btn {
    margin-bottom: 10px;
}
.nrwh__recommend {
    margin-right: 8px;
    padding: 2px;
}
</style>