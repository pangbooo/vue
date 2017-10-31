<!-- 
    添加文章模板
    作者：李文达Leo
    日期：2017.7.25
 -->
<template>
    <div class="tjwz__wrapper">
        <div class="tjwz__topnav">
            <table cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td width="75%">
                        <input type="button" value="新增下一条" class="funButton">
                        <font color="#AE9B9B">|</font>
                        <input type="button" value="一键导入" id="autoImport_button" title="一键导入" class="funButton">

                        <font color="#AE9B9B">|</font>
                        <input type="button" value="弹出预览" class="funButton"title="保存文章(暂存，提交审核，发布均可)后可预览" disabled="">

                        <font color="#AE9B9B">|</font>
                        <input type="button" value="暂存" id="_saveBtn" title="暂时保存文章，供以后编辑处理" class="funButton">

                        <input type="button" value="发布文章" id="pub_button" title="发表这篇文章" class="funButton" @click="fabuwenzhang"> 
                    </td>
                    <td align="right">
                          <input disabled="disabled" type="button" class="funButton" value="上条" title="上一篇文章">
                          <input disabled="disabled" type="button" value="下条" title="下一篇文章" class="funButton">
                          <font color="#AE9B9B">|</font>
                          <input type="button" class="funButton" value="关闭" title="关闭" @click="closeDelog">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" value="弹出预览" class="funButton" title="保存文章(暂存，提交审核，发布均可)后可预览" disabled="">

                        <input type="button" value="审核记录" title="审核记录" class="funButton" >
                        <font color="#AE9B9B">&nbsp;|&nbsp;</font>
                         
                        <input type="button" value="保存修改" title="保存修改后文章" class="funButton">
                            
                        <input type="button" value="立即审核" title="审核文章" class="funButton">
                    </td>
                    <td align="right">
                        <input type="button" class="funButton" value="关闭" title="关闭" @click="closeDelog">
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="tjwz__main">
            <div class="tjwz__mainbg">
                <v-main ref='vmain'></v-main>
            </div>
        </div>
        <div class="tywz__sidenav">
            <v-sidenav ref='vsidenav'></v-sidenav>
        </div>
    </div>
</template>

<script>
import rightnav from '@/manage/AddArticle/rightnav';
import maincontent from '@/manage/AddArticle/maincontent';

import tjwz from '@/services/tjwz/tjwz';

    export default {
        name: 'UE',
        components: {
            'v-sidenav': rightnav,
            'v-main': maincontent
        },
        props:{
            dataUuid: {
                type:String,
                default:'1234343'
            } 
        },
        data () {
            return {
                data:{}
            }
        },
        methods: {
            // 关闭添加文章弹窗
            closeDelog: function(){
                this.$emit("close-Window",false)
            },
            fabuwenzhang: function(){
                let wzgl = this.$store.state.wzgl.end;
                let obj = {
                    uuid:wzgl.uuid,
                    wzbt:wzgl.wzbt,
                    nrbt:wzgl.nrbtchecked === true ? wzgl.getUEContent() : '',
                    dbt:wzgl.dbtchecked === true ? wzgl.dbt : '',
                    fbt:wzgl.fbtchecked === true ? wzgl.fbt : '',
                    yt:wzgl.ytchecked === true ? wzgl.yt : '',
                    zz:wzgl.zz,
                    bj:wzgl.bj,
                    ly:wzgl.ly,
                    tzlj:wzgl.tzdz,
                    bq:wzgl.bq,
                    gjz:wzgl.gjz,
                    nrzy:wzgl.zynr,
                    sfxs:wzgl.sfxschecked === true ? wzgl.sfxs : '',
                    fbsj:wzgl.fbsj,
                    xxsj:wzgl.xxsj,
                    zyx:wzgl.zyx,
                    djl:wzgl.djcs,
                    sfzd:wzgl.zdchecked === true ? "是":"否"
                };
                
                let _self = this;

                if(wzgl.wzbt===''){
                    return _self.$message.error('标题没写哦');
                } else if(wzgl.gjz==='') {
                    return _self.$message.error('关键字没写哦');
                } else if(wzgl.zynr==='') {
                    return _self.$message.error('内容摘要没写哦');
                } else {
                    tjwz(obj).then(data => {
                        if(data.status == 'success' && data.result == 'true'){
                            this.$message({
                                message: '提交成功，2秒后自动跳转',
                                type: 'success',
                                duration: 2000,
                                onClose: function(){
                                  _self.$emit("close-Window",false)
                                }
                              });
                        }else{
                            this.$message.error('服务器故障，请联系管理员处理！');
                        }
                    })
                }
            },
        }
    }
</script>

<style type="text/css">
    body{
        min-width: 1100px;
    }
    /*leo 添加文章css  */
    .tjwz__wrapper{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
    }
    .tjwz__topnav{
       padding: 0 5px; 
    }
    .tjwz__topnav table{
        width:100%;
        border:0;
    }
    .tjwz__topnav tr{
        height: 30px;
    }
    .tjwz__topnav td{
       vertical-align: middle; 
    }
    .tjwz__topnav .funButton {
        height: 24px;
        font-size: 12px;
        background: #4db3ff;
        border:none;
        color: #fff;
        border-radius: 3px;
        padding: 2px 4px;
        cursor: pointer;
    }
    .tjwz__topnav .funButton:hover{
        background-color:#1d90e6; 
    }
    .tjwz__main{
        position: absolute;
        right: 255px;
        left: 0px;
        top: 30px;
        bottom: 0px;
        width: auto;
        overflow: auto;
        background-color: #FFFFFF;
        padding-left: 5px;
        _padding-right: 5px;
    }
    .tywz__sidenav{
        position: absolute;
        top: 30px;
        right: 0px;
        bottom: 0px;
        width: 250px;
        _height: 97%;
        overflow-x: hidden;
        overflow: auto;
        background-color: #F9F9F9;
        z-index: 2;
        padding-right: 4px;
        _padding-right: 0px;
    }
    .tjwz__mainbg{
        min-width: 900px;
        background: #535353;
        overflow: auto;
        width: 100%;
        height: 100%;
    }
</style>


