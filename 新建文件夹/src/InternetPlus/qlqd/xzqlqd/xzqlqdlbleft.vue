/* 
    描述：行政权力清单-部门列表
    作者：李文达
    创建时间：2017年9月20日
    最后修改人：李文达
    最后修改时间：2017年9月20日
*/
<template>
<div>
    <div class="xzqlqd__left">
        <div class="xzqlqd__heading">
            <img src="/static/img/list.png">
            <span>部门列表</span>
        </div>
        <div class="xzqlqd__foot">
            <a :class="['nbr',{xzqlqd__foot__hover:this.choosed === ''}]" href="javascript:;" @click="toRightALl('')">全部({{sum}})</a>
            <a v-for="(item,index) in list" @click="toRight(item)" :key="index" v-if="list&&list.length>0" :class="['nbr',{xzqlqd__foot__hover:item.CHECKED}]" href="javascript:;">
            {{item.DWMC}}({{item.ZJ}})
            </a>
            <div class="nullinfo" v-if="list&&list.length===0"><img src="/static/img/data-null.png" alt=""></div>
        </div>	
    </div>
</div>
</template>

<script>
import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import { queryString } from '@/lib/publicFun';

export default{
    data() {
        return {
            list:[],
            choosed:null,
            sum:0,
            sxlx:''
        }
    },
    created: function(){
        this.choosed = queryString("BMMC",true);
        this.sxlx = queryString("fwlb");
        let params = {}
        this.sxlx==="ggfw" ? params.sxlx = '公共服务' : '';

        xzqlqdlbleft(params).then(res => {
            if (res.status === "success") {
                for(let i = 0;i < res.data.length; i++ ){
                    if(res.data[i].DWMC){
                        this.list.push(res.data[i])
                    }
                }

                let l = 0;
                
                for(let i = 0;i < this.list.length; i++ ){
                    this.sum += this.list[i].ZJ*1
                    this.$set(this.list[i],'CHECKED',false);
                    if(this.choosed === this.list[i].DWMC){
                        this.list[i].CHECKED = true;
                        l++;
                    }
                }
                if(l===0){
                    this.choosed = '';
                }
                
                this.$emit("changeId",this.choosed)
            } else {
                this.$message.error('服务器异常，请联系管理员！');
            } 
    	}).catch(data =>{
            this.$message.error('xzqlqdlbleft异常，请检查网络！')
        })
    },
    methods: {
        toRight: function(item){
            for(let i = 0;i < this.list.length; i++ ){
                this.list[i].CHECKED = false;
            }
            item.CHECKED = true;
            this.choosed = item.DWMC;
            this.$emit("changeId",this.choosed)
        },
        toRightALl: function(item){
            for(let i = 0;i < this.list.length; i++ ){
                this.list[i].CHECKED = false;
            }
            this.choosed = item;
            this.$emit("changeId",this.choosed)
        }
    }
}
</script>

<style scoped>
 /*xzqlqdlbleft.vue*/
.xzqlqd__left {
    float: left;
    width: 290px;
    display: inline-block;
    border: 1px solid #E7E7E7;
    margin-bottom: 30px;
}

.xzqlqd__heading {
    color: #5495cf;
    padding: 18px 0px 18px 80px;
    border-top: 2px solid #5495CF;
    border-bottom: 1px solid #E7E7E7;
}

.xzqlqd__heading img {
    margin-right: 8px;
    width: 24px;
}

.xzqlqd__heading span {
    font-size: 18px;
    line-height: 24px;
}

.xzqlqd__foot {
    overflow: hidden;
}

.xzqlqd__foot a {
    display: block;
    float: left;
    width: 125px;
    line-height: 32px;
    border-bottom: 1px solid #E7E7E7;
    font-size: 14px;
    color: #666666;
    padding: 0 10px;
}
.xzqlqd__foot a:first-child{
    width: 100%;
    padding: 0;
    text-align: center;
}
.xzqlqd__foot a:hover ,.xzqlqd__foot .xzqlqd__foot__hover {
    background-color: #5495CF;
    color: #fff;
}

.xzqlqd__tableTr td {
    width: 142px;
    padding-left: 20px;
}

.xzqlqd__hs {
    color: #000000;
}
.nullinfo img{display:block;margin:10px auto;}
</style>