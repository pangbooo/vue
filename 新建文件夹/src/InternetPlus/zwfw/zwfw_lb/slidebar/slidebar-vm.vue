<template>
	<!-- <v-slidebar :title="data.titledata" :listdata="data.listdata"></v-slidebar> -->
    <v-slidebar :title="data.titledata" :listdata="data.listdata"></v-slidebar>
</template>

<script>
import slidebar from './slidebar';

// import getslidebar from '@/services/zhly/yzlylb/slidebar';

export default{
    name:'slidebar-vm',
    components:{
        'v-slidebar':slidebar
    },
    data() {
        return {
        	data:{
                listdata:[
                    {
                        uuid:'4',
                        lmmc:'政策动态',
                        lmdm: 'zcdt',
                        titleclass:'1',
                        link:'',
                        checked:true
                    },{
                        uuid:'64c0100f8c8f11e790e09f7e6761c297',
                        lmmc:'法律法规',
                        lmdm: 'flfg',
                        titleclass:'2',
                        link:'',
                        checked:false
                    },{
                        uuid:'524d176e8c9111e7aa6effc3b6d1539e',
                        lmmc:'规章制度',
                        lmdm: 'gzzd',
                        titleclass:'3',
                        link:'',
                        checked:false
                    },{
                        uuid:'011a31be8e4911e78f91c7ba380bf93b',
                        lmmc:'通知通告',
                        lmdm: 'tztg',
                        titleclass:'4',
                        link:'',
                        checked:false
                    }
                ]
            },
            id:'2',
            lmid:'',
            wzid:''
		}
    },
    created () {
        // this.getdata()
    },
    methods: {
        getdata() {
            getslidebar(this.UUID).then(data => {
                this.data = data.result
                this.componentId = 'v-slidebar'
            })
        }
    }
}
</script>

<style>

</style>