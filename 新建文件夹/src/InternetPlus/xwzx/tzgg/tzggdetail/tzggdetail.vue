/*
 * @文档描述: 通知公告-详情页
 * @参数: 无
 * @作者: 孔祥超 
 * @创建时间: 2017-09-22 11:40:00 
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-09-25 17:28:46
 */
<template>
    <div class="tzggdetail">
        <idt-header></idt-header>
        <idt-navbar></idt-navbar>
        <div class="tzggdetail__wrap"> 
            <idt-breadcrumb :page="page"></idt-breadcrumb>
            <idt-newsdetail :lmid="lmid"></idt-newsdetail>
        </div>
        <idt-footer></idt-footer>
    </div>
</template>

<script>
import header from '@/InternetPlus/common/header/header';
import navbar from '@/InternetPlus/common/navbar/navbar';
import breadcrumb from '@/components/breadcrumb/breadcrumb';
import newsdetail from '@/InternetPlus/common/newsdetail/newsdetail';
import xwzxsiderbar from '@/InternetPlus/xwzx/xwzxsiderbar/xwzxsiderbar';
import footer from '@/InternetPlus/common/footer/footer';
export default {
    data() {
        return {
            page: 'xwzx_tzgg_tzggdetail',
            lmid: '1'
        }
    },
    components: {
        'idt-header': header,
        'idt-footer': footer,
        'idt-newsdetail': newsdetail,
        'idt-xwzxsiderbar': xwzxsiderbar,
        'idt-navbar': navbar,
        'idt-breadcrumb': breadcrumb
    }
}
</script>

<style scoped>
/**
 css belong to tzggdetail.vue
 */
 .tzggdetail__wrap {
     width: 1260px;
     margin: 0 auto;
     background: url('/static/img/bg.jpg');
 }
 .tzggdetail__content {
     width: 1000px;
     margin: 0 auto;
     height: auto;
 }
 .tzggdetail__content__list {
     width: 750px;
     float: left;
 }
 .tzggdetail__content__siderbar {
     float: left;
     padding-top: 60px;
 }

</style>
