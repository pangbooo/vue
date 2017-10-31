<!-- 没用到 leo -->
<template>
	<!-- <v-lylx :title="data.titledata" :listdata="data.listdata"></v-lylx> -->
    <component 
    :is="componentId" 
    :listdata="data.listdata" 
    v-on:change-curpage="changeCurpage"
    :curpage="param.currentPage"
    :totalRow="param.totalPage"
    :pageSize="param.pageSize">
    </component>
</template>

<script>
import list from './list';

import getlist from '@/services/InternetPlus/yzlylb/yzlylist';

export default{
    name:'yzlylist-vm',
    components:{
        'v-list':list
    },
    data() {
        return {
        	data:{
                listdata:[]
            },
            componentId:'',
            param:{
                currentPage: 1,
                totalPage: undefined,
                pageSize: 16
            }
		}
    },
    created () {
        this.getdata()
    },
    methods: {
        changeCurpage: function (val) {
            this.param.currentPage = val
            this.getdata()
        },
        getdata: function () {
            getlist(this.param).then(data => {
                this.data = data.result
                this.componentId = 'v-list'
            })
        }
    }
}
</script>

<style>

</style>