<!--
    组件名称：行政权力清单左边
    作者：马日
    手机：13478470501
    QQ：995401608
-->
<template>
<div>
    <div class="left">
        <div class="heading">
            <img v-bind:src="depleft.depnameimg">
            <span>{{depleft.depname}}</span>
        </div>
        <div class="foot" id="leftnav">
            <a v-for="dep in depleft.deps" v-on:click="toRight(dep.id)" v-bind:key="dep.id" v-bind:href="dep.link">{{dep.text}}({{dep.amount}})</a>
        </div>	
    </div>
</div>
</template>

<script>
import getXzqlleftJson from '@/services/getXzqlleftJson';
import Vue from 'vue';
window.eventBus = new Vue();
export default{
    data() {
        return {
            depleft:{}
        }
    },
    created: function(){
        getXzqlleftJson().then(res => {
    	 	this.depleft = res
    	})
    },
    methods: {
        toRight: function(id){
            eventBus.$emit("changeId",id)
        }
    }
}
</script>

<style scoped>
   /*  马日  */
.left {
    float: left;
    width: 290px;
    display: inline-block;
    border: 1px solid #E7E7E7;
    margin-bottom: 30px;
}

.heading {
    color: #5495cf;
    padding: 18px 0px 18px 80px;
    border-top: 2px solid #5495CF;
    border-bottom: 1px solid #E7E7E7;
    margin-bottom: 10px;
}

.heading img {
    margin-right: 8px;
    width: 24px;
}

.heading span {
    font-size: 18px;
    line-height: 24px;
}

.foot {
    overflow: hidden;
}

.foot a {
    display: block;
    float: left;
    width: 125px;
    line-height: 32px;
    border-bottom: 1px solid #E7E7E7;
    font-size: 12px;
    color: #666666;
    padding-left: 20px;
}

.foot a:hover {
    background-color: #5495CF;
    color: #fff;
}

.tableTr td {
    width: 142px;
    padding-left: 20px;
}

.hs {
    color: #000000;
}
</style>