<template>
	<div class="zwfwlb_list">
        <div v-show="listdata.length!==0">
            <ul class="zwfwlb_list--ul">
                <li v-for="(item,index) in listdata" :key="item.UUID">
                    <a :href="url+'&WZID='+item.UUID">
                        <p class="nbr">{{item.WZBT}}</p>
                        <span>{{item.XXSJ | formatDate}}</span>
                    </a>
                </li>
            </ul>
            <div class="zwfwlb_list--page">
                <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="totalRow" :page-size="pageSize" class="handle-page">
                </el-pagination>
            </div>
        </div>
        <div v-show="listdata.length===0" class="zwfwlb_list--info">
           <img src="/static/img/data-null.png" alt="">
        </div>
	</div>
</template>

<script>
import {getTime} from '@/lib/publicFun';
export default{
	name:'zwfwlb_list',
	props: {
        listdata: {
            type: Array,
            default(){
                return [];
            }
        },
        curpage: {
            type: Number,
            default(){
                return 0;
            }
        },
        totalRow: {
            type: Number,
            default(){
                return 14;
            }
        },
        pageSize: {
            type: Number,
            default(){
                return 10;
            }
        },
        url: {
            type: String,
            default(){
                return "/zwfw/zwfwdetail/index.html";
            }
        }
    },
    data() {
        return {
		}
    },
    filters: {
        formatDate:function(time){
            return getTime(time);
        }
    },
    methods: {
        handleCurrentChange:function (val) {
            this.$emit("change-curpage",val);
        }
    }
}
</script>

<style scoped>
/*  李文达 游在辽源列表-列表模块css */
.zwfwlb_list{
	width: 100%;
    margin-bottom: 20px;
    height: 770px;
}
.zwfwlb_list--ul{
    margin: 0px 16px;
    height: 720px;
}
.zwfwlb_list--ul li {
    width: 100%;
}
.zwfwlb_list--ul a{
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px dashed #e1dfda;
    background: url(/static/zhly/label.png) no-repeat 2px 20px;
    box-sizing:border-box;
    padding-left: 28px;
}
.zwfwlb_list--ul a:hover{
    color: #3c95e5;
}
.zwfwlb_list--ul p{
    float: left;
    width: 80%;
}
.zwfwlb_list--ul span{
    float: right;
    width: 20%;
    text-align: right;
}
.zwfwlb_list--page{text-align: right;margin-top: 20px;}
.zwfwlb_list--info{text-align: center;padding-top: 20px}
</style>