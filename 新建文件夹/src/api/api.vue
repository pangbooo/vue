/** 
 * 文档描述: 前端接口API
 * 作者: 孔祥超 
 * 创建时间: 2017-09-21 16:14:22 
 * 最后修改人: 孔祥超 
 * 最后修改时间: 2017-09-21 16:14:22 
 */
<template>
    <div class="webAPI">
    <p class="title">倚天互联网+政务服务前端接口</p>
        <ul>
             <li class="api" v-for="(item,index) in items" :key="index">
                <div class="api__title" @click="change(item)">
                    <a>{{item.id}}</a>
                    <span class="title--apidesc">{{item.apidesc}}</span>
                </div>
                <div class="api__content" v-show='item.checked'>
                    <p>备注：</p><span>{{item.apidesc}}</span>
                    <p>参数：</p>
                    <table class="api__content--para" rules="rows" cellpadding="5px;">
                        <tr>
                          <th>参数</th>
                          <th>描述</th>
                          <th>数据类型</th>
                        </tr>
                        <tr v-for="(item2,index) in item.para" :key="index">
                          <td>{{item2.name}}</td>
                          <td>{{item2.desc}}</td>
                          <td>{{item2.datatype}}</td>
                        </tr>
                    </table>
                    <p>模型架构：
                        <el-button @click="show(item.id)">显示结果</el-button>
                    </p>
                </div>
            </li> 
        </ul>
        <el-dialog title="显示结果" :visible.sync="dialogVisible">
            <pre>{{code}}</pre>
        </el-dialog>
    </div>
</template>

<script>
import axios from '@/config/axios/axios';
import qs from 'qs';
import api from './api.js';

export default {

    data() {
        return {
            code: null,
            dialogVisible: false,
            items:[],
            src:''
        }
    },
    created(){
       this.getApi();
    },
    methods: {
        show(itemid) {
            this.src='/'+itemid;
            let self = this;
            $.get(self.src, function(data,status){
                self.code = JSON.stringify(data, null, 4);
                self.dialogVisible = true;
            }); 
        },
        getApi(){
            this.items=api;
        },
        change(item){
            for (let i=0; i<this.items.length; i++) {
                this.items[i].checked=false;
            }
             item.checked=!item.checked;
        }     
    }
}
</script>

<style>
/*通用*/
.webAPI{margin: 10px auto;width: 1000px;}
.title{padding-bottom: 20px;font-size: 20px;}
li{list-style: none;}
a{color: black;text-decoration: underline;cursor: pointer;}

/*其他*/
.api{width: 980px;border: 1px #C3E8D1 solid;background-color:#E7F6EC;margin-bottom: 5px;padding: 5px;}
.api__title{height: 30px;line-height: 30px;clear: both;}
.title--apidesc{float: right;color: #10A54A;}
.api__content{border-top:1px #C3E8D1 solid;}
.api__content p{color: #10A54A;padding: 5px;}
.api__content span{padding: 5px;}
.api__content iframe{margin: 10px; background-color: #FFFFDD;width: 956px;}
.api__content--para{width: 957px;border-bottom: 1px #7A6666 solid;margin: 10px;font-size: 2px;color: #7A6666;}
.api__content--para tr{border-bottom: 1px #7A6666 solid;}
.el-dialog__body{overflow: hidden;}
</style>
