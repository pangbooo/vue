<!--
    组件名称：行政权力清单右边
    作者：马日
    手机：13478470501
    QQ：995401608
-->
<template>
<div>
    <div class="right">
        <div class="title title-h">省发展改革委</div>
        <div class="first">
            <select class="sxlx" id="sxlx">
                <option v-for="opt in depright.myoptions" v-bind:value="opt.value">{{opt.text}}</option>
            </select>
            <input type="text" name="search" id="search" placeholder="Search">
            <a class="mine sousuo" href="javascript:void(0)">搜索</a>
            <a class="mine ggfw" href="javascript:void(0)">公共服务</a>
        </div>
        <div class="second" id="quickfind">
            <a class="secondA mine" v-for="xz in depright.xzs" @click="changeList(xz.id)" v-bind:key="xz.id" v-bind:href="xz.link">{{xz.text}}({{xz.amount}})</a>
        </div>
        <ul class="third" id="lists">
            <li v-for="myli in list" v-bind:key="myli.id">
                <a class="mine" v-bind:href="myli.link">{{myli.text}}</a>
            </li>
        </ul>
        <pagination :currentPage="currentPage" :totalPage="totalPage" :pageSize="pageSize"  class="pagePos"></pagination>   
    </div>
</div>
</template>

<script>
import getXzqlrightJson from '@/services/getXzqlrightJson';
import pagination from "@/components/common/pagination";
export default{
    data() {
        return {
            currentPage:3,
            totalPage:50,
            pageSize:10,
            depright:{},
            lists:[],
            list:[],
            index:0
        }
    },
    components: {
        pagination
    },
    created: function(){
        let self=this;
        getXzqlrightJson().then(res => {
    	 	this.depright = res
            this.lists = this.depright.lists
            // console.log(this.lists)
            this.list=this.lists[0]
            // console.log(this.list)
    	})
        eventBus.$on("changeId",function(id){
            self.index=id-1
            self.list=self.lists[self.index]
            // console.log(this.index)
        })
    },
    methods:{
        changeList: function(a){
            this.index=parseInt(a)+18
            // console.log(this.index)
            this.list=this.lists[this.index]
        }
    }
}
</script>

<style scoped>
/*  马日  */
@charset "utf-8";
.right {
    padding-left: 300px;
    border-radius: 2px;
}

.title {
    color: #5495cf;
    font-size: 16px;
    line-height: 2em;
    border-bottom: 2px solid #5495CF;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 40px;
    background: url(./img/packup.png) 99% center no-repeat;
    padding-bottom: 10px;
}

.title-h {
    background: url(./img/unfold.png) 99% center no-repeat;
}

.title img {
    position: absolute;
    margin-top: -5px;
    margin-left: 415px;
}

.first {
    width: 580px;
    margin-top: 20px;
    margin-left: 15px;
}

.sxlx {
    width: 115px;
    height: 31px;
    border-radius: 2px;
    border-color: #c9c9c9;
    box-sizing: border-box;
}

#search {
    width: 255px;
    height: 31px;
    box-sizing: border-box;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border: 1px solid #c9c9c9;
    margin-left: 10px;
    padding-left: 8px;
}

.sousuo {
    background-color: #5495CF;
    padding: 6px 14px;
    color: #ffffff;
    margin-left: -5px;
    border-top: 1px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
}

.ggfw {
    background-color: #5495CF;
    padding: 6px 14px;
    color: #ffffff;
    margin-left: 10px;
    margin-top: 1px;
    border-radius: 2px;
}

.second {
    margin-top: 20px;
    margin-left: 15px;
    overflow: hidden;
}

.secondA {
    float: left;
    display: block;
    color: #b0b0b0;
    border: 1px solid #b0b0b0;
    padding: 5px 2px;
    border-radius: 3px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 4px 8px;
}

.third {
    margin-left: 15px;
    padding-bottom: 20px;
}

.third li {
    display: block;
    padding-left: 20px;
    background: url(./img/icon_state.png) 0px 22px no-repeat;
    border-bottom: 1px solid #D7D7D7;
}

.third a {
    display: block;
    line-height: 32px;
    height: 32px;
    font-size: 14px;
    padding-right: 40px;
    background: url(./img/packup.png) 99% center no-repeat;
    padding: 10px 0;
}

.down {
    position: absolute;
    margin-top: 0px;
    margin-left: 165px;
}

.ym {
    position: absolute;
    margin-left: 225px;
    margin-top: 680px;
}

.ys {
    padding: 5px 8px;
}

.dqys {
    background-color: #02A9F5;
    color: #FFFFFF;
}

.pre {
    margin-right: 5px;
}

.next {
    margin-left: 5px;
}

.sx {
    color: #000000;
}
.mine:hover{
    color: #777;
}
.mine:hover,.mine:active{
    outline: 0;
}
</style>