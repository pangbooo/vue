/* 
    描述：办件公示列表
    作者：马丽欣
    创建时间：2017年9月20日
    最后修改人：马丽欣
    最后修改时间：2017年9月20日
*/
<template>
<div>
    <div class="container">
        <div class="search-div">
            <div class="search-fun">
                <div class="input-box">
                    <el-date-picker v-model="daterange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions" @change="searchDate"></el-date-picker>
                </div>
                <div class="input-box">
                    <el-select v-model="value" placeholder="部门" @change="getData()">
                        <el-option
                        v-for="item in options"
                        :key="item.ZJ"
                        :label="item.DWMC"
                        :value="item.DWJC">
                        </el-option>
                    </el-select>
                </div>
                <span class="keyword">关键词</span>
                <div class="search-con">
                    <input class="search-text" type="text" v-model="keyword" placeholder="请输入办件编号/受理事项名称/申报人(单位)进行查询" @keyup.enter="chooseGJZ2($event)" />
                    <input type="button" class="search-btn" value="搜 索"  @click="chooseGJZ()" />
                </div>
            </div>
        </div>
        <div class="tab-con">
            <el-table :data="list"  tooltip-effect="light"  @row-dblclick="dbclick"  style="width: 100%" class="idt-table">
                <el-table-column align="center" width="200px" prop="办件流水号" label="办件编号" :show-overflow-tooltip="true" ></el-table-column>
                <el-table-column align="center" width="180px" prop="审批单位" label="受理部门" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="事项名称(大项)" label="受理事项名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column width="300px" prop="申请单位/人" label="申请人/单位" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column align="center" width="150px" prop="time" label="受理日期" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column align="center" width="100px" prop="BLLX" label="办件状态" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </div>
        <idt-pagination :currentPage="currentPage" :totalPage="totalPage" :pageSize="pageSize" @current-change="currentChange" @size-change="sizeChange" class="pagePos" v-show="list.length!==0"></idt-pagination> 
    </div>
</div>
</template>

<script>
import idtpagination from '@/components/pagination/index.vue';
import { tableIds } from '@/api/tableId';
import bjgslist from '@/services/common/sp_xmglb/xmglb_list.js';
import getBumen from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import { getTime } from '@/lib/publicFun';

export default{
    data() {
        return {
            currentPage:1,
            totalPage:10,
            pageSize:10,
            nowPage:'1',
            filter:'',
            options: [{
                DWJC:'',
                DWMC:'全部'
            }],
            value: '',
            keyword:'',
            list:[],
            date_start:'',
            date_end:'',
            daterange: '',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
                },
        }
    },
    components: {
        'idt-pagination': idtpagination,
    },
    props:{
       
    },
    created: function(){
        this.getBumen();
        this.getData();
    },
    watch:{
        
    },
    methods:{
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
                
                filter: {}
            }
            if(this.keyword){
                params.searchKeyFields = ['事项名称(大项)','申请单位/人','办件流水号'];
                params.filter["searchKey"] = this.keyword;
            }
            this.value ? params.filter["审批单位ID"] = this.value:'';
            
            if(this.date_start != '' || this.date_end != ''){
               params.filter["INSERT_DATE"] ='#'+this.date_start+'-#'+this.date_end;
            }
            bjgslist(params).then(res => {
                this.list = res.data.DataList;
                this.Time(this.list);
                this.totalPage = res.data.totalRows
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
            this.getData();
        },
        sizeChange: function(val){
            this.pageSize = val;
            this.getData();
        },
        chooseGJZ: function(){
            this.getData();
        },
        chooseGJZ2: function(ev){
            if(ev.keyCode==13){
                this.getData();
            }
        },
        searchDate(val) {
            if (val) {
                let dateArr = val.split(' - ');
                console.log(typeof(dateArr[0]));
                this.date_start = dateArr[0].replace(/-/g,'/');
                this.date_end= dateArr[1].replace(/-/g,'/');
            } else {
                this.date_start = this.date_end = '';
            }
            this.getData();
        },
        dbclick(row, event){
            window.location.href = "../bjgsdetail/index.html?WZID="+row.UUID;
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    width: 1260px;
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
    float: right;
    margin: 0 0 10px 0;
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
.tab-con {
    min-height: 490px;
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
.input-box .line{
    color:#666;
}
.nullinfo img{display:block;margin:70px auto;}
.pagePos{
    text-align: right;
    padding:20px 0;
}
</style>
