/* 
    描述：办件公示
    作者：马丽欣
    创建时间：2017年9月20日
    最后修改人：马丽欣
    最后修改时间：2017年9月21日
*/
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="container-bg">
        <div class="bmfw__path">
            <idt-breadcrumb :page="page" ></idt-breadcrumb>
        </div>
        <idt-bjgslist></idt-bjgslist>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtbjgslist from '@/InternetPlus/wsbs/bjgs/bjgslist';

export default {
    data() {
        return {
            page:'bjgslb',
            totalPage:30,
            currentPage:1,
            pageSize:10
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar':idtnavbar,
        'idt-footer': idtfooter,
        'idt-bjgslist': idtbjgslist,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-floatbar': floatbar
    },
    created:function() {
    },
    methods: {
        currentChange: function(val){
            this.currentPage = val
           
        },
        
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.container-bg{
    width: 1260px;
    margin:0 auto;
    background: url("./img/bg.jpg");
    
}

.container {
    width: 1000px;
    margin: 0 auto;
    font-family: "microsoft yahei";
}
.container::after{
    display: block;
    content: '';
    clear: both;
}

.search-div{
    position: relative;
}
.search-div .search-fun{
    margin:35px 0 25px 0;
    overflow: hidden;
}

.search-fun a{
    text-decoration: none;
    position: relative;
}
.search-fun .keyword{
    display: inline-block;
    font-size: 14px;
    color: #666;
    height: 36px;
    line-height: 36px;
    margin-left: 10px;
    float: left;
}
.search-fun .search-con{
    width: 425px;
    height: 34px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    overflow: hidden;
    float: left;
    margin-left: 15px;
}
.search-fun::after{
    content: '';
    display: block;
    clear: both;
}
.search-fun .search-text{
    color: #666;
    width: 350px;
    line-height: 34px;
    height: 34px;
    border: none;
    font-size: 12px;
    text-indent: 0.5em;
    float: left;
    display: block;
    box-sizing: border-box;
}
.search-fun .search-btn{
    color: #FFFFFF;
    width: 75px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background: #3a8ad1;
    cursor: pointer;
    border: 0;
    box-sizing: border-box;
}

.search-fun .dept,.time{
    float: left;
    height: 32px;
    line-height: 32px;
    margin-left: 20px;
    width: 158px;
    background: #ffffff;
    border: 1px solid #c9c9c9;
    font-size: 14px;
    color: #666;
    padding-right: 50px;
    border-radius: 3px;
    cursor: pointer;
}
.search-fun .dept{
    background: url("./img/down.png") 130px 11px no-repeat ;
}
.search-fun .time{
    background: url("./img/date.png") 130px 8px no-repeat;
}
.dept:hover{
    opacity: 0.8;
    border-color: #3a8ad1;
    color: #3a8ad1;
}
.time:hover{
    opacity: 0.8;
    border-color: #3a8ad1;
    color: #3a8ad1;
}
.search-btn:hover{
    opacity: 0.8;
    
}
.tab{
    width: 100%;
    border-collapse: collapse;
}
.thead th{
    height: 55px;
    vertical-align: middle;
}
.tab-list td{
    height: 50px;
    text-align: center;
    vertical-align: middle;
    padding:0 5px 0 5px;
}
.tab .tab-list tr:hover{
    background: #73B1E0;
    color: #FFF;
}
.tab .thead{
    background: #3a8ad1;
    color: #FFFFFF;
    font-size:16px;
}
.tab .tab-list{
    font-size: 14px;
    color: #666;
}

.tab .c1{
    width: 200px;
}
.tab .c2{
    width: 100px;
}
.tab .c3{
    width: 250px;
}
.tab .c4{
    width: 200px;
}
.tab .c5{
}
.tab .c6{
}
.tab-list{
    color: #666;
    font-size: 14px;
}
.tab-list tr:nth-child(odd){
    background: #ffffff;
}
.tab-list tr:nth-child(even){
    background: #fafbfb;
}
#pagination{
    float: right;
    margin-bottom: 40px;
}
/*tab end*/
.input-box{
    float: left;
    margin-left: 10px;
}
</style>
