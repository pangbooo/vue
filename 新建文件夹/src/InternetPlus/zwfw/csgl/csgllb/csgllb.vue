/*  李文达 城市管理 2017.08.23  */
<template>
<div>
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="csgllb__warp">
        <div class="csgllb__left">
            <div class="csgl_left--wysb"></div>
            <div class="csgl_left--sjlb">
                <div class="csgl_left--sjlb--title">事件类别</div>
                <div class="csgl_left--sjlb--content">
                    <ul>
                        <li v-for="(item,index) in subnav" :key="index" :class="item.class">
                            <a href="javascript:;" :class="['yc',{csgl_left__h:item.checked}]" @click="changeSlideBar(item)">{{item.title}}</a>
                            <ul class="csgl_left--sjlb--twoNav" v-show="item.checked">
                                <li v-for="(item2,index) in item.children" :key="index">
                                    <a href="javascript:;">{{item2.title}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="csgl_left--sjjb">
                <div class="csgl_left--sjjb--title">事件级别</div>
                <div class="csgl_left--sjjb--content">
                    <a href="javascript:;" v-for="(item,index) in level" :key="index">{{item.title}}</a>
                </div>
            </div>
            <div class="csgl_left--cljg">
                <div class="csgl_left--cljg--title">处理结果</div>
                <div class="csgl_left--cljg--content">
                    <a href="javascript:;" v-for="(item,index) in result" :key="index">{{item.title}}</a>
                </div>
            </div>
       </div>
       <div class="csgllb__right">
            <div class="csgllb__path">
                <v-path page="csgllb"></v-path>
                <div class="csgl_right--top--search">
                    <input type="text" placeholder="请输入关键词">
                    <a href="#"></a>
                </div>
            </div>
            <ul class="csgl_right--content">
                <li v-for="(item,index) in list" :key="index">
                    <p class="csgl_right--content--sjlx">事件类型：<span>{{item.type}}</span><span :class="item.resultclass">{{item.result}}</span></p>

                    <p class="csgl_right--content--sjjb">事件级别：<span>{{item.level}}</span></p>
                    <p class="csgl_right--content--sjdz">事件地址：<span class="csgl_right--content--wz">{{item.addr}}</span></p>
                    <p class="csgl_right--content--sj">{{item.time}}</p>
                    <hr>
                    <a href="" class="csgl_right--content--sjbt">{{item.info}}</a>
                </li>
            </ul>
            <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="page.totalPage" :page-size="page.pageSize" class="csgllb__handle-page">
            </el-pagination>
       </div>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
import header from '@/InternetPlus/common/header/header.vue';
import navbar from '@/InternetPlus/common/navbar/navbar.vue';
import footer from '@/InternetPlus/common/footer/footer.vue';
import breadcrumb from '@/components/breadcrumb/breadcrumb.vue';

import getsubnav from '@/services/InternetPlus/zwfw/csgl/csgllb/subnav';
import getlevel from '@/services/InternetPlus/zwfw/csgl/csgllb/level';
import getresult from '@/services/InternetPlus/zwfw/csgl/csgllb/result';
import getlist from '@/services/InternetPlus/zwfw/csgl/csgllb/list';

export default{
	components:{
        'v-header':header,
        'v-nav':navbar,
        'v-footer':footer,
        'v-path': breadcrumb,
    },
    data() {
        return {
            subnav:[],
            level:[],
            result:[],
            list:[],

            uuid: '',
            lmid: '',
            page:{
                currentPage: 1,
                totalPage: undefined,
                pageSize: 10
            }
        }
    },
    created () {
        this.getSlideNav();
        this.getList();
        this.getLevel();
        this.getResult();
    },
    methods: {
        curSlideBar: function () {
            for(let i=0;i<this.slidebarnav.length;i++){
                this.slidebarnav[i].checked = false;
                if(this.slidebarnav[i].uuid == this.uuid){
                    this.lmdm = this.slidebarnav[i].lmdm;
                    this.slidebarnav[i].checked = true;
                }
            }
        },
        changeCurpage: function (val) {
            this.page.currentPage = val
            this.getListData()
        },
        changeSlideBar: function (item) {
            for(let i=0;i<this.subnav.length;i++){
                this.subnav[i].checked = false;
            }
            item.checked = true;
        },
        getLevel: function () {
            getlevel().then(data => {
                this.level = data.result;
            })
        },
        getResult: function () {
            getresult().then(data => {
                this.result = data.result;
            })
        },
        getSlideNav: function () {
            getsubnav().then(data => {
                
                this.subnav = data.result;
                
                if(this.uuid !== ''){
                    this.curSlideBar();
                }
            })
        },
        getList: function () {
            let param = {
                uuid : this.uuid,
                currentPage: this.page.currentPage,
                totalPage: this.page.totalPage,
                pageSize: this.page.pageSize
            }
            getlist(param).then(data => {
                this.list = data.result.DataList;
                this.page.totalPage = data.result.totalRows;
            })
        },
        handleCurrentChange(){

        },
        queryString: function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            let regexS = "[\\?&]" + name + "=([^&#]*)";
            let regex = new RegExp(regexS);
            let results = regex.exec(window.location.search);
            if(results == null) {
                return "";
            }
            else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        }
    }
}
</script>

<style scoped>
/*  李文达 城市管理 2017.08.23  */
.csgllb__warp{
    width: 1250px;
    margin: 20px auto;
    overflow: hidden;
}
.csgllb__left{
    float: left;
    width: 280px;
}
.csgllb__right{
    float: right;
    width: 942px;
}
.csgl_left--wysb{width: 280px;height: 65px;background: url("./img/wysb.png") no-repeat;}
.csgl_left--sjlb{width: 280px;margin-top:10px;}
.csgl_left--sjlb--title{width: 280px;height: 50px;background: #0095e5;text-align: center;line-height: 50px;font-size: 20px;color: #fff;}
.csgl_left--sjlb--content{width:278px;border: 1px solid #dddad5;}
.csgl_left--sjlb--content>ul{margin-top: 10px;padding-bottom: 10px;}
.csgl_left--sjlb--content>ul>li{list-style: none;width: 280px;text-indent: 60px;position: relative;border-bottom: 1px solid #dddad5;}
.csgl_left--sjlb--content>ul>li:last-child{border-bottom: none;}
.yc{width:280px;height:40px;font-size: 16px;color: #383838;text-decoration: none;line-height: 40px;display: block;background: url("./img/jty.png") no-repeat 235px 10px;}
.xcgg{background: url("./img/xcgg1.png") no-repeat 28px 12px;}
.tfsj{background: url("./img/tfsj1.png") no-repeat 28px 12px;}
.yllh{background: url("./img/yllh1.png") no-repeat 28px 12px;}
.sggl{background: url("./img/sggl1.png") no-repeat 28px 12px;}
.fwtd{background: url("./img/fwtd1.png") no-repeat 28px 12px;}
.kzbj{background: url("./img/kzbj1.png") no-repeat 28px 12px;}
.dljt{background: url("./img/dljt1.png") no-repeat 28px 12px;}
.gyss{background: url("./img/gyss1.png") no-repeat 28px 12px;}
.srhj{background: url("./img/srhj1.png") no-repeat 28px 12px;}
.kzsj{background: url("./img/kzsj1.png") no-repeat 28px 12px;}
.jmzx{background: url("./img/jmzx1.png") no-repeat 28px 12px;}
.qtbj{background: url("./img/qtbj1.png") no-repeat 28px 12px;}
.csgl_left--sjlb--twoNav{margin: 0px 0px 20px 60px;}
.csgl_left--sjlb--twoNav::after{content: '';display: block;clear: left;}
.csgl_left--sjlb--twoNav li{list-style: none;width:100px;float: left;text-indent: 0px;margin: 2px 0px;}
.csgl_left--sjlb--twoNav a{font-size: 14px;text-decoration: none;color: #383838;}
.csgl_left--sjjb{width: 280px;height: 112px;}
.csgl_left--sjjb--title{width: 280px;height: 50px;background: #0095e5;line-height: 50px;text-align: center;font-size: 20px;color: #fff;margin-top: 24px;}
.csgl_left--sjjb--content{width: 278px;height: 68px;border: 1px solid #dddad5;line-height: 68px;}
.csgl_left--sjjb--content a{text-decoration: none;color: #383838;margin: 0px 0px 0px 40px;}
.csgl_left--cljg{width: 280px;}
.csgl_left--cljg--title{width: 280px;height: 50px;background: #0095e5;line-height: 50px;text-align: center;font-size: 20px;color: #fff;margin-top: 30px;}
.csgl_left--cljg--content{width: 278px;height: 68px;border: 1px solid #dddad5;line-height: 68px;}
.csgl_left--cljg--content a{text-decoration: none;color: #383838;margin: 0px 0px 0px 30px;}
.csgllb__path{border-bottom: 5px solid #0095e5;width: 100%;position: relative;}

.csgl_right--top--search{position: absolute;right: 0; top:0;}
.csgl_right--top--search input{width: 220px;height: 28px;border: 1px solid #d6d3ce;border-top-left-radius: 5px;border-bottom-left-radius: 5px;float: left;margin-top: 10px;text-indent: 20px;}
.csgl_right--top--search a{width: 38px;height: 28px;display: block;background: url("img/ss.png") no-repeat;float: right;margin-top: 10px;}
.csgl_right--content li{width:942px;height: 130px;list-style: none;padding: 10px 5px;position: relative;}
.csgl_right--content hr{border: 1px dashed #e1dfda;margin: 16px 0px;width: 905px;}
.csgl_right--content--sjbt{text-decoration: none;color: #383838;margin-top: 20px;}
.csgl_right--content--sjlx{margin: 10px 0px 0px;}
.csgl_right--content--sjjb{margin: 5px 0px;}
.csgl_right--content--sj{position: absolute;right: 50px;top: 50px;}
.csgl_right--content--wz{background: url("img/wzzb.png") no-repeat 0px 4px;text-indent: 20px;display: inline-block;}
.csgl_right--content--ypd{background: #ff7600;font-size: 12px;padding: 2px 4px;color: #fff;border-radius: 5px;margin-left: 20px;}
.csgl_right--content--yja{background: #00c62f;font-size: 12px;padding: 2px 4px;color: #fff;border-radius: 5px;margin-left: 20px;}
.csgl_right--content--dla{background: #0095e5;font-size: 12px;padding: 2px 4px;color: #fff;border-radius: 5px;margin-left: 20px;}
.csgllb__handle-page{text-align: right;margin-top:20px; }
.csgl_left__h{color: #0095e5;background: url(img/jtx.png) no-repeat 230px 15px;}
</style>