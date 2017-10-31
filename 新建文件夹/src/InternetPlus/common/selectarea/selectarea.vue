/*
 * 地区选择组件
 * @Author: kong 
 * @Date: 2017-09-19 17:05:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-19 20:22:43
 */
<template>
    <ul class="selectarea__wrap clr">
        <li>
            <a href="javascript:;" class="selectarea__link">省直单位</a>
            <div class="selectarea__shengdw">
                <h4>省直部门</h4>
                <div class="selectarea__shengdw-con" id="selectarea__shengdw" >
                    <a v-for="item in shengz" :key="item.id" :href="item.url" class="selectarea__nava" :data-uuid="item.id">{{item.title}}</a>
                </div>
            </div>
        </li>
        <li><a href="javascript:;" class="selectarea__link">市、区、县</a>
            <div class="selectarea__shengdw selectarea__shidw">
                <div class="selectarea__part">
                    <div class="selectarea__part-left">市</div>
                    <div class="selectarea__part-right" id="shi">
                        <a v-for="(item,index) in area.shi" :key="item.id" @mouseover="changeshi(index)">{{item.title}}</a>
                    </div>
                </div>
                <div class="selectarea__part">
                    <div class="selectarea__part-left">区</div>
                    <div class="selectarea__part-right" id="qu">
                        <a v-for="(item,index) in area.qu" :key="item.id" @mouseover="changequ(index)">{{item.title}}</a>
                    </div>
                </div>
                <div class="selectarea__part">
                    <div class="selectarea__part-left">街道</div>
                    <div class="selectarea__part-right" id="jie">
                        <a v-for="(item,index) in area.jie" :key="item.id" :href="item.url">{{item.title}}</a>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import areaData from './areaData.js';
export default {
    data() {
        return {
            shengz: areaData.shengz,
            area: {
                shi: [],
                qu: [],
                jie: []
            }
        }
    },
    created() {
        this.area.shi = areaData.area
	 	this.area.qu = areaData.area[0].children
	 	this.area.jie = areaData.area[0].children[0].children
    },
    methods: {
       changeshi: function(index) {
       		this.area.qu = this.area.shi[index].children
       },
       changequ: function(index) {
       		this.area.jie = this.area.qu[index].children
       }
    }
}
</script>

<style scoped>
/**
 * css belong to selectarea.vue
 */
.selectarea__wrap {
    display: block;
    float: left;
    margin-left: 60px;
}

.selectarea__wrap li {
    display: block;
    float: left;
    margin-right: 20px;
    position: relative;
}

.selectarea__link{
    display: block;
    padding-right: 20px;
    position: relative;
    height: 100px;
    line-height: 100px;
}

.selectarea__link:before {
    content: "";
    position: absolute;
    right: 0;
    top: 41px;
    width: 20px;
    height: 20px;
    background: url(./img/san.png) center no-repeat;
}

.selectarea__link:hover:before {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    /* IE 9 */
    -webkit-transform: rotate(180deg);
    /* Safari and Chrome */
    -o-transform: rotate(180deg);
    /* Opera */
    -moz-transform: rotate(180deg);
}
.selectarea__wrap li:hover .selectarea__shengdw{display: block;}
.selectarea__shengdw{
    display: none;
    position: absolute;
    top:100px;
    left: 0;
    z-index: 99999;
    width: 650px;
    border:1px solid #f5f5f5;
    border-radius: 5px;
    margin-left: -20px;
}
.selectarea__shengdw:before{
    content: "";
    position: absolute;
    top: -30px;
    left: 35px;
    border-bottom: 15px solid #f5f5f5;  
    border-left: 15px solid transparent;  
    border-right: 15px solid transparent;  
    border-top: 15px solid transparent;  
    height: 0;
}
.selectarea__shengdw h4{
    height: 32px;
    line-height: 32px;
    background-color: #f5f5f5;
    padding:0 20px;
}
.selectarea__shengdw-con{
    padding: 10px;
    overflow: hidden;
    background-color: #fff;
}
.selectarea__nava{
    display: block;
    float: left;
    width: 20%;
    text-align: center;
    line-height: 28px;
}
.selectarea__nava:hover{color: #0073da;}
.selectarea__shidw{padding:0 20px;background-color: #fff;}
.selectarea__part{width: 100%;overflow: hidden;border-top: 1px solid #ccc;padding: 8px 0;}
.selectarea__part:first-child{border: 0;}
.selectarea__part-left{width: 10%;line-height: 32px;color: #0073da;float: left;text-align: center;}
.selectarea__part-right{float: right;width: 90%;}
.selectarea__part-right a{display: block;float: left;padding:0 8px;height: 32px;line-height: 32px;}
.selectarea__part-right a:hover{background-color: #0073da;color: #fff;}
</style>
