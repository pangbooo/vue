<!-- 没用到leo -->
<template>
	<!-- <v-lylx :title="data.titledata" :listdata="data.listdata"></v-lylx> -->
    <component :is="componentId" :articledata="data.articledata" ></component>
</template>

<script>
import detail from './detail';

import getdetail from '@/services/InternetPlus/yzlydetail/yzlydetail';

export default{
    name:'yzly_detail-vm',
    components:{
        'v-detail':detail
    },
    data() {
        return {
        	data:{
                articledata:{}
            },
            componentId:''
		}
    },
    created () {
        this.getdata()
    },
    methods: {
        getdata: function () {
            getdetail().then(data => {
                this.data = data.result
                this.componentId = 'v-detail'
            })
        }
    }
}
</script>

<style>

</style>