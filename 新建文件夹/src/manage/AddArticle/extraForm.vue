<!-- 
    添加文章模板
    作者：李文达Leo
    日期：2017.8.2
 -->
<template>
    <div>
        <div class="panel">
            <div class="panel-head" >
                <i class="el-icon-setting"></i>
                基本属性
            </div>
            <div class="panel-body" >
                <div class="tywz__extraform_subtile" ><i class="el-icon-time"></i> 发布日期</div>
                <table align="center" cellpadding="1" cellspacing="0" class="panel-body-tablenr" >
                    <tbody>
                        <tr>
                            <td width="33%" style="text-align:center">发布时间</td>
                            <td width="67%"> 
                            <el-date-picker 
                              class="tywz__extraform__Wdate"
                              v-model="form.发布时间"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy-MM-dd"
                              @change="dateChangefbsj">
                            </el-date-picker>
                            </td>
                        </tr>
                        <tr v-show="false">
                            <td width="33%" style="text-align:center">下线时间</td>
                            <td width="67%"> 
                            <el-date-picker 
                              class="tywz__extraform__Wdate"
                              v-model="form.下线时间"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy-MM-dd"
                              @change="dateChangexxsj">
                            </el-date-picker>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="tywz__extraform_subtile"><i class="el-icon-warning"></i> 显示位置/重要性</div>
                <table align="center" cellpadding="1" cellspacing="0" class="panel-body-tablenr">
                    <tbody>
                    <tr>
                        <td colspan="2" style="padding:0 8px;">
                        重要性 <input type="text" size="2" maxlength="8" class="editText" v-model="form.重要性">　
                        <span style="color:#ff8000">数值越小越重要</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding:0 8px;">
                            <el-checkbox v-model="form.是否置顶" true-label="1" false-label="0">是否置顶</el-checkbox>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="tywz__extraform_subtile"><i class="el-icon-edit"></i> 点击次数设置</div>
                <table align="center" cellpadding="1" cellspacing="0" class="panel-body-tablenr">
                    <tbody>
                    <tr>
                        <td width="33%" style="text-align:center">点击次数</td>
                        <td width="67%">
                            <input type="text" maxlength="20" class="editText" v-model="form.点击率">
                        </td>
                    </tr> 
                    </tbody>
                </table>
                <div class="tywz__extraform_subtile"><i class="el-icon-time"></i> 访问设置</div>
                <table align="center" cellpadding="1" cellspacing="0" class="panel-body-tablenr">
                    <tbody>
                    <tr>
                        <td width="33%" nowrap="" align="center" style="padding:0 8px;"><el-checkbox v-model="form.评论标识" true-label="0" false-label="1">禁止评论</el-checkbox></td>
                        <td width="67%">
                            <label style="vertical-align:middle;color:#ff8000">是否关闭评论功能</label>
                        </td>
                    </tr>
                    </tbody>
                </table> 
                <div class="tywz__extraform_subtile"><i class="el-icon-upload2"></i> <span>投递<span style="color:#555" > (当前栏目:{{lmmc}})</span></span></div>
                <table align="center" cellpadding="1" cellspacing="0" class="panel-body-tablenr">
                    <tbody>
                    <tr>
                        <div id="containerdiv" class="panel-body-tablenr">
                            <table cellpadding="0" cellspacing="0" class="panel-body-tablenr" align="center">
                                <tbody>
                                <tr v-for="(item, index) in wztd">
                                    <td width="10%" style="text-align:center;">
                                        <span :class="['el-checkbox__input',item.checked?'is-checked':'']" title="取消选中则不再投递" @click="wztdcheckbox(item)">
                                            <span class="el-checkbox__inner"></span>
                                        </span>
                                    </td>
                                    <td width="90%">
                                        {{item.value}}
                                        <span style="cursor:default;color:#8AB114 ;" title="如果您对此栏目有直接发布权限，则直接发布，如果没有则需要审核。">[发]</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding:0 8px;">
                            <input type="button" class="tywz__tjtd--btn" value="添加投递" @click="addtjtd">
                        </td>
                    </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'rightNav',
        props: {
            lmmc: {
                type: String,
                default: ''
            },
            form: {
                type: Object,
                default() {
                    return {
                        发布时间: '',
                        下线时间: '',
                        重要性: 10,
                        点击率: '',
                        是否置顶: true,
                        是否显示: '',
                        评论标识: false
                    }
                }
            }
        },
        data () {
            return {
                // 基本属性
                zdks:'',// 置顶开始时间
                zdjs:'',// 置顶结束时间
                ttks:'',// 头条开始时间
                ttjs:'',// 头条结束时间
                djcs:20,// 点击次数
                dqlm:'图片新闻',// 当前栏目
                wztd:[{
                        'key':'1',
                        'value':'当前站点>>政务公开',
                        'checked':true
                    },{
                        'key':'2',
                        'value':'当前站点>>电子政务',
                        'checked':true
                    }],//文章投递
                // 其他设置
                isjzpl:false,// 禁止评论checkbox
                isjzkb:false,// 禁止拷贝checkbox
                issfjm:false,// 禁止加密checkbox
                ipxz:0,// ip限制
                ipxzoptions:[{
                        'value':0,
                        'text':'任意ip'
                    },{
                        'value':1,
                        'text':'管理员ip'
                    }],
                isfwkz:false,// 访问控制checkbox
                fwcy:[],// 访问成员
                xgwz:'',// 相关文章
            }
        },
        created () {
            this.form.发布时间 = new Date().getTime();
        },
        methods: {
            // 添加访问成员
            addfwcy: function(){
                
            },
            // 添加投递
            addtjtd: function(){
                
            },
            // 基本属性tab
            changeIsJbsx: function(val){
                this.isjbsx = val
            },
            //发布时间、置顶时间、头条时间
            dateChangefbsj: function(val){
                this.fbsj = val
            },
            dateChangexxsj: function(val){
                this.xxsj = val
            },
            
            // 设置相关文章 
            setxgwz: function(){

            },
            // 改变文章投递选中状态
            wztdcheckbox: function(item){
                item.checked = !item.checked;
            }
        }
    }
</script>

<style type="text/css">
    /*leo 添加文章css  */
    
    .tywz__extraform .panel {
        border: 1px solid #ccc;
        background: #ffffff;
        margin-left: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        overflow: hidden;
    }
    .tywz__extraform .panel-head {
        height: 28px;
        line-height: 28px;
        color: #FFF;
        font-weight: bolder;
        padding-left: 5px;
        cursor: pointer;
        background-color: #8391a5;
        font-size: 16px;
    }
    .tywz__extraform .panel-top-right {
        text-align: right;
        height: 24px;
        padding-left: 20px;
        cursor: pointer;
        margin-top: 1.5px;
    }
    .tywz__extraform_subtile{
        font-size: 14px;
        font-weight: bold;
        color: #1f2d3d;
        padding: 8px;
    }
    .tywz__extraform .panel-body-tablenr {
        width:100%;
        background: #f8f8f8;
        font-size: 14px;
        color: #666666;
        line-height: 28px;
        border: none;
    }
    .tywz__extraform .tywz__extraform__Wdate{
        width: 138px;
        box-sizing:border-box;
    }
    .tywz__extraform__Wdate .el-input__inner{
        border-radius: 2px;
        height: 20px;
    }
    .tywz__extraform .editText {
        height: 20px;
        border: 1px solid #D2EEC6;
        font-size: 12px;
        outline-width: medium;
        margin:0 5px;
        outline-color: #9DDA83;
        border-radius: 4px;
    }
    .tywz__extraform .el-checkbox__inner{
        width: 16px;
        height: 16px;
    }
    .tywz__tjtd--btn{
        cursor:pointer;
        border:none;
        width:100px;
        height:21px;
        background-color:#4db3ff;
        border-radius:4px;
        color:#fff;
        text-align:center;
    }
    .tywz__extraform .disabled{
        cursor: not-allowed;
    }
</style>


