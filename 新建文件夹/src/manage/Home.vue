<template>
    <div class="wrapper">
        <div class="sidebar-wrap">
            <v-sidebar></v-sidebar>
        </div>
        <div class="content-warp">
            <div class="header">
                <v-head></v-head>
            </div>
            <div class="pagecontent-warp">
                <transition name="move" mode="out-in"><router-view></router-view></transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        }
    }
</script>

<style type="text/css">
    .sidebar-wrap{
        display: block;
        position: absolute;
        width: 260px;
        left: 0;
        top: 0;
        bottom:0;
        background: #3388cb url(./img/sidebar-bg.png) bottom left no-repeat;
    }
    .content-warp{
        background-color: #f6f6f6;
        padding-left: 260px;
        box-sizing: border-box;
        height: 100%;
    }
    .pagecontent-warp{
        margin: 10px;
        background-color: #fff;
        box-shadow: 0 0 8px #ccc;
        padding: 20px;
        height: calc(100% - 130px);
        overflow-y: auto;
    }
    .handle-del {
        border-radius: 10px;
        color: #fff;
        background-color: #94c0e2;
        border-color: #94c0e2;
    }
    .handle-del:hover{
        border-color: #50bfff;
        background-color: #fff;
    }
    .handle-select {
        width: 120px;
    }
    .el-input__inner,.handle-search{
        /*border-radius: 10px;*/
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .handle-select .el-input__inner,.handle-input .el-input__inner{
        background-color: #f9f9f9;
    }
    .handle-table{
        border: none;
    }
    .handle-table::after{
        background-color: #fff;
    }
    .el-table--border td, .el-table--border th {
        border-right: none;
    }
    .handle-page .el-icon-arrow-left:before {
        content: "上一页";
    }
    .handle-page .el-icon{
        color: #000;
    }
    .handle-page .el-icon-arrow-right:before {
        content: "下一页";
    }
    .handle-page .btn-next,.handle-page .btn-prev,.handle-page .el-pager li{
        border:none;
        margin: 0 4px;
        border-radius: 4px;
        min-width: 24px;
        height: 24px;
        line-height: 24px;
    }
</style>


