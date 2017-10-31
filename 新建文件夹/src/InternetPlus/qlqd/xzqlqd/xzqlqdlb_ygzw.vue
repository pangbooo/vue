/*
 * @文档描述: 阳光政务-->行政权力清单
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-10-12 13:58:05 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-12 14:29:38
 */
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="bmfw">
        <div class="bmfw__wrap">
            <div class="bmfw__path">
                <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            </div>
            <div class="bmfw__content">
                <idt-xzqlqdlbleft @changeId="changeBM"></idt-xzqlqdlbleft>
                <idt-xzqlqdlbright :bmid="BMMC" :title="fwlb"></idt-xzqlqdlbright>
            </div>
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtfooter from '@/InternetPlus/common/footer/footer';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtxzqlqdlbleft from '@/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import idtxzqlqdlbright from '@/InternetPlus/qlqd/xzqlqd/xzqlqdlbrightygzw';

import { queryString } from '@/lib/publicFun.js';
import { LMIDS } from '@/api/lmManage.js';
export default{
    components:{
        'idt-header': idtheader,
        'idt-navbar':idtnavbar,
        'idt-footer': idtfooter,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-xzqlqdlbleft': idtxzqlqdlbleft,
        'idt-xzqlqdlbright': idtxzqlqdlbright,
        'idt-floatbar': floatbar
    },
    data() {
        return {
            page:'xzqlqdlbygzw',
            BMMC:null,
            params:[],
            fwlb:''
        }
    },
    created(){
        this.fwlb = queryString("fwlb")
        
        let title = '';
        if(queryString("fwlb") === 'grbs'){
            title = '个人办事'
        } else if(queryString("fwlb") === 'frbs') {
            title = '法人办事'
        } else if(queryString("fwlb") === 'ggfw') {
            title = '公共服务'
        } else {
            title = null
        }

        this.params = [ { id: 'xzqlqdlb', displayName:title}];
    },
    methods:{
        changeBM: function (val) {
            this.BMMC = val;
        }
    }
}
</script>

<style scoped>
/*xzqlqdlb.vue*/
.bmfw {
    width: 100%;
    position: relative;
    /* background: url(./img/bg.jpg) center no-repeat; */
}
.bmfw__wrap {
    width: 1260px;
    margin: 0 auto;
}

.bmfw__content {
    width: 100%;
    overflow: hidden;
}
</style>