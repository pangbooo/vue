/*
 * @文档描述: 通知公告-列表页
 * @参数: 无
 * @作者: 孔祥超 
 * @创建时间: 2017-09-21 18:46:47 
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-09-25 17:28:37
 */

<template>
    <div class="tzgg">
        <idt-header></idt-header>
        <idt-navbar></idt-navbar>
        <div class="tzgg__wrap"> 
            <idt-breadcrumb :page="page"></idt-breadcrumb>
            <div class="tzgg__content clr">
                <div class="tzgg__content__list"> 
                    <idt-newslist :lmid="lmid" :childpath="childpath"></idt-newslist>
                </div>
                <div class="tzgg__content__siderbar">
                    <idt-xwzxsiderbar></idt-xwzxsiderbar>
                </div>
            </div>
        </div>
        <idt-footer></idt-footer>
    </div>
</template>

<script>
import header from '@/InternetPlus/common/header/header';
import navbar from '@/InternetPlus/common/navbar/navbar';
import breadcrumb from '@/components/breadcrumb/breadcrumb';
import newslist from '@/InternetPlus/common/newslist/newslist';
import xwzxsiderbar from '@/InternetPlus/xwzx/xwzxsiderbar/xwzxsiderbar';
import footer from '@/InternetPlus/common/footer/footer';
export default {
    data() {
        return {
            page: 'xwzx_tzgg_tzgglb',
            lmid: '1',
            childpath: '/xwzx/tzgg/tzggdetail/index.html'
        }
    },
    components: {
        'idt-header': header,
        'idt-footer': footer,
        'idt-newslist': newslist,
        'idt-xwzxsiderbar': xwzxsiderbar,
        'idt-navbar': navbar,
        'idt-breadcrumb': breadcrumb
    }
}
</script>

<style scoped>
/**
 css belong to tzgg.vue
 */
 .tzgg__wrap {
     width: 1260px;
     margin: 0 auto;
     background: url('/static/img/bg.jpg');
 }
 .tzgg__content {
     width: 1000px;
     margin: 0 auto;
     height: auto;
 }
 .tzgg__content__list {
     width: 750px;
     float: left;
 }
 .tzgg__content__siderbar {
     float: left;
     padding-top: 60px;
 }

</style>
