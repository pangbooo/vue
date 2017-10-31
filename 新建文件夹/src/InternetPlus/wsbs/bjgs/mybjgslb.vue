/* 
    描述：我的办件列表
    作者：马丽欣
    创建时间：2017年9月20日
    最后修改人：李文达
    最后修改时间：2017年10月6日
*/
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="container-bg">
        <div class="bmfw__path">
            <idt-breadcrumb :page="page"></idt-breadcrumb>
        </div>
        <div class="container">
        <div class="zxlb-left">
                <idt-personInfo></idt-personInfo>
        </div> 
        <div class="tab-con">
            <div class="search-div">
                <div class="search-fun">
                    <div class="input-box">
                        <el-select v-model="value" placeholder="部门" @change="getData()">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                            v-for="item in options"
                            :key="item.ZJ"
                            :label="item.DWMC"
                            :value="item.DWMC">
                            </el-option>
                        </el-select>
                    </div>
                    <span class="keyword">关键词</span>
                    <div class="search-con">
                        <input class="search-text" type="text" v-model="keyword" placeholder="请输入受理部门/受理事项名称/受理时间/申报人(单位)进行查询" @keyup.enter="chooseGJZ2($event)" />
                        <input type="button" class="search-btn" value="搜 索"  @click="chooseGJZ()" />
                    </div>
                </div>
            </div>
            <el-table :data="list"  tooltip-effect="light"  @row-dblclick="dbclick" style="width: 100%">
                <el-table-column class="c2" prop="受理部门" label="受理部门" :show-overflow-tooltip="true" width="150px"> </el-table-column>
                <el-table-column class="c3" prop="办件名称" label="办件名称" :show-overflow-tooltip="true" > </el-table-column>
                <el-table-column class="c6" prop="BLLX" label="办件状态" :show-overflow-tooltip="true" width="120px"> </el-table-column>
                <el-table-column label="评分" width="200" align="right">
                  <template scope="scope">
                    <el-button size="mini" @click="evaluate(scope.$index, scope.row)" v-if="!scope.row.PJJG">评价</el-button>
                    <el-rate v-else class="waitDealWrap__pj" v-model="scope.row.PJJG" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled></el-rate>
                  </template>
                </el-table-column>
                <el-table-column label="快递" width="70" align="center">
                  <template scope="scope">
                    <el-button size="mini" @click="kuaiDi(scope.$index, scope.row)" :disabled="scope.row['快递单号']">查看</el-button >
                  </template>
                </el-table-column>
            </el-table>
            <div class="page-go" v-show="list.length!==0">
                <idt-pagination :currentPage="currentPage" :totalPage="totalPage" :pageSize="pageSize" @current-change="currentChange" @size-change="sizeChange" class="pagePos" ></idt-pagination>
            </div>
        </div> 
    </div>
    <el-dialog title="办件评价" :visible.sync="dialogFormVisible" size="small" class="waitDealWrap__dialog">
        <dl>
            <dt>请对本次服务进行打分:</dt>
            <dd>
                <el-rate class="waitDealWrap__pj"
                    v-model="pjtable.pf"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']" show-text :texts="['失望','不满意','一般','满意','非常满意']">
                </el-rate>
            </dd>
            <dt>请对本次服务进行评价:</dt>
            <dd>
                <el-input type="textarea" :rows="3" :autosize="{minRows:3,maxRows:6}" placeholder="默认五分好评" v-model="pjtable.pj"></el-input>
            </dd>
        </dl>
        <div slot="footer" class="dialog-footer">
          <el-button @click="canclePj()">取 消</el-button>
          <el-button type="primary" @click="savePj()">确 定</el-button>
        </div>
    </el-dialog>
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
import idtpagination from '@/components/pagination/index.vue';
import idtpersonInfo from '@/InternetPlus/user/personcenter/personInfo';
import { tableIds } from '@/api/tableId';
import { webSaveMyForm,checkWhetherAppraise } from '@/api/manage.js';
import getWdbj from '@/services/common/sp_xmglb/xmglb_list_banjian.js';
import getBumen from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import { getTime } from '@/lib/publicFun';

export default {
    data() {
        return {
            page:'mybjgslb',
            totalPage:30,
            currentPage:1,
            pageSize:10,
            nowPage:'1',
            filter:'',
            options: [],
            value: '',
            keyword:'',
            list:[],
            date_start:'',
            date_end:'',
            date:'',
            dialogFormVisible: false,
            pjtable:{
               pf:5,
               pj:'' 
            },
            pjbjbh: '',
            pjhj: '',
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar':idtnavbar,
        'idt-footer': idtfooter,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-floatbar': floatbar,
        'idt-pagination': idtpagination,
        'idt-personInfo':idtpersonInfo,
    },
    created:function() {
        this.getBumen();
        this.getData();
    },
    methods: {
         getBumen: function(){
            getBumen().then(res => {
                for(let i = 0;i < res.data.length; i++ ){
                    if(res.data[i].DWMC){
                        this.options.push(res.data[i])
                    }
                }
            });
        },
        getData: function(){
            let params = {
                tableid : tableIds.权力事项办理表,
                nowPage: this.currentPage,
                pageSize: this.pageSize,
                searchKeyFields:this.searchKeyFields,
                ownerColname: '注册账户',
                filter: {}
            }
            this.value ? params.filter["审批单位"] = this.value:'';
            this.keyword ? params.filter["searchKey"] = this.keyword:'';

            getWdbj(params).then(res => {
                this.list = res.data.DataList;
                this.Time(this.list);
                this.totalPage = res.data.totalRows;

                for(let i = 0; i<res.data.DataList.length; i++){
                    this.list[i].PJJG = +this.list[i].PJJG
                }
            })
        },
        Time(arry){
            for(let k = 0;k < arry.length; k++){
                var time=getTime(arry[k].INSERT_DATE);
                arry[k].time = time.split(' ')[0];
            }
        },
        currentChange: function(val){
            this.currentPage = val;
            this.getData()
        },
        sizeChange: function(val){
            this.pageSize = val;
            this.getData()
        },
        chooseGJZ: function(){
            this.getData();
        },
        chooseGJZ2: function(ev){
            if(ev.keyCode==13){
                this.getData();
            }
        },
        getTime(date){
          this.date_start = date;
        },
        getTime2(date){
          this.date_end= date;
        },
        dbclick(row, event){
            window.location.href = "../mybjgsdetail/index.html?WZID="+row.UUID;
        },
        evaluate(index, row){
            this.dialogFormVisible = true,
            this.pjbjbh = row.UUID;
            this.pjhj = row.BLLX;
        },
        kuaiDi(index, row){
            // console.log(row)
            window.location.href = '/qtfw/wdkd/index.html' + '?WZID=' + row.快递单号;
        },
        canclePj(){
            this.dialogFormVisible = false;
            this.pjtable.pf = 5;
        },
        savePj(){
            let username = JSON.parse(localStorage.getItem("idt_App_personInfo")).username;

            let params = {
                tableId:tableIds.办件评价,
                ownerColname: '评价人账户',
                params:{"办件uuid":this.pjbjbh,"评价结果":this.pjtable.pf,"评价人":username,"评价意见":this.pjtable.pj,"评价环节":this.pjhj}
            }
            webSaveMyForm(params).then(res=>{
                if (res.status="success") {
                    this.dialogFormVisible = false;
                    this.getData();
                }
            })
        }
    },
}
</script>

<style scoped>
*{margin: 0;padding: 0;}
.tab-con{width:1000px;float:right;overflow:hidden;}
.zxlb-left{width:240px;float: left;margin:0px 0px 10px;}
.container-bg{width: 1260px;margin:0 auto;background: url("./img/bg.jpg");}
.container {width: 1000px;margin: 0 auto;font-family: "microsoft yahei";}
.container::after{display: block;content: '';clear: both;}
.search-div{position: relative;}
.search-div .search-fun{margin:0px 0px 10px;overflow: hidden;}
.search-fun a{text-decoration: none;position: relative;}
.search-fun .keyword{display: inline-block;font-size: 14px;color: #666;height: 36px;line-height: 36px;margin-left: 10px;float: left;}
.search-fun .search-con{width: 425px;height: 34px;border: 1px solid #c9c9c9;border-radius: 5px;overflow: hidden;float: left;margin-left: 15px;}
.search-fun::after{content: '';display: block;clear: both;}
.search-fun .search-text{color: #666;width: 350px;line-height: 34px;height: 34px;border: none;font-size: 12px;text-indent: 0.5em;float: left;display: block;box-sizing: border-box;}
.search-fun .search-btn{color: #FFFFFF;width: 75px;height: 34px;line-height: 34px;text-align: center;background: #3a8ad1;cursor: pointer;border: 0;box-sizing: border-box;}
.search-fun .dept,.time{float: left;height: 32px;line-height: 32px;margin-left: 20px;width: 158px;background: #ffffff;border: 1px solid #c9c9c9;font-size: 14px;color: #666;padding-right: 50px;border-radius: 3px;cursor: pointer;}
.search-fun .dept{background: url("./img/down.png") 130px 11px no-repeat ;}
.search-fun .time{background: url("./img/date.png") 130px 8px no-repeat;}
.dept:hover{opacity: 0.8;border-color: #3a8ad1;color: #3a8ad1;}
.time:hover{opacity: 0.8;border-color: #3a8ad1;color: #3a8ad1;}
.search-btn:hover{opacity: 0.8;}
.tab{width: 1000px;border-collapse: collapse;float:right;}
.thead th{height: 55px;vertical-align: middle;}
.tab .tab-list tr:hover{background: #73B1E0;color: #FFF;}
.tab .thead{background: #3a8ad1;color: #FFFFFF;font-size:16px;}
.tab .tab-list{font-size: 14px;color: #666;}
.tab .c1{width: 200px;}
.tab .c2{width: 100px;}
.tab .c3{width: 250px;}
.tab .c4{width: 200px;}
.tab-list{color: #666;font-size: 14px;}
.tab-list tr:nth-child(odd){background: #ffffff;}
.tab-list tr:nth-child(even){background: #fafbfb;}
#pagination{float: right;margin-bottom: 40px;}
.page-go{width:1000px;height:50px;float:right;margin: 10px 0px;}
/*tab end*/
.container {width: 1260px;margin: 0 auto;font-family: "microsoft yahei";}
.container::after{display: block;content: '';clear: both;}
.search-div{position: relative;}
.search-fun a{text-decoration: none;position: relative;}
.search-fun .keyword{display: inline-block;font-size: 14px;color: #666;height: 36px;line-height: 36px;margin-left: 10px;float: left;}
.search-fun .search-con{width: 425px;height: 34px;border: 1px solid #c9c9c9;border-radius: 5px;overflow: hidden;float: left;margin-left: 15px;}
.search-fun::after{content: '';display: block;clear: both;}
.search-fun .search-text{color: #666;width: 350px;line-height: 34px;height: 34px;border: none;font-size: 12px;text-indent: 0.5em;float: left;display: block;box-sizing: border-box;}
.search-fun .search-btn{color: #FFFFFF;width: 75px;height: 34px;line-height: 34px;text-align: center;background: #3a8ad1;cursor: pointer;border: 0;box-sizing: border-box;}
.search-fun .dept,.time{float: left;height: 32px;line-height: 32px;margin-left: 20px;width: 158px;background: #ffffff;border: 1px solid #c9c9c9;font-size: 14px;color: #666;padding-right: 50px;border-radius: 3px;cursor: pointer;}
.search-fun .dept{background: url("./img/down.png") 130px 11px no-repeat ;}
.search-fun .time{background: url("./img/date.png") 130px 8px no-repeat;}
.dept:hover{opacity: 0.8;border-color: #3a8ad1;color: #3a8ad1;}
.time:hover{opacity: 0.8;border-color: #3a8ad1;color: #3a8ad1;}
.search-btn:hover{opacity: 0.8; }
.thead th{height: 55px;vertical-align: middle;}
.tab-list td{height: 50px;text-align: center;vertical-align: middle;padding:0 5px 0 5px;}
.tab .tab-list tr:hover{background: #73B1E0;color: #FFF;}
.tab .thead{background: #3a8ad1;color: #FFFFFF;font-size:16px;}
.tab .tab-list{font-size: 14px;color: #666;}
.tab-list{color: #666;font-size: 14px;}
.tab-list tr:nth-child(odd){background: #ffffff;}
.tab-list tr:nth-child(even){background: #fafbfb;}
#pagination{float: right;margin-bottom: 40px;}
/*tab end*/
.input-box{float: left;}
.input-box .line{color:#666;}
.nullinfo img{display:block;margin:70px auto;}
.pagePos{text-align: right;padding:20px 0;}
.waitDealWrap__pj{padding-top:6px;}
.waitDealWrap__pj .el-rate__text{vertical-align: bottom;}
.waitDealWrap__dialog .el-dialog__body {padding-bottom: 20px;}
.waitDealWrap__dialog h3{font-size: 16px;line-height: 32px;text-align: center;padding-bottom: 10px;}
.waitDealWrap__dialog dl{margin: 0 auto;}
.waitDealWrap__dialog dt{width: 200px;line-height: 32px;font-weight: bold;float: left;clear: left;}
.waitDealWrap__dialog dd{display:block;margin: 10px auto;}
</style>
<style>
    .el-table__body-wrapper .el-table__row {
        cursor: pointer;
    }
</style>
