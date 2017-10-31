/*  责任清单列表
	马日
	tel：13478470501
	qq：995401608
	2017年8月14日
*/
<template>
<div>
    <vheader></vheader>
    <navbar></navbar> 
    <div class="zrqdlb" id="zrqdlb">
		<div class="zrqdlb__container clr">
			<div class="zrqdlb_location clr">
				<breadcrumb :page="page" :backbutton="backbutton"></breadcrumb>
			</div>
            <div style="clear:both;"></div>            
		</div>
        <div class="zrqdlb_main zrqdlb_center zrqdlb_top clr"> 
        <!--zrqdlb_column开始-->
            <div class="zrqdlb_column left">
                <div class="zrqdlb_column_title"><div class="zrqdlb_column_title1"><img src="/static/img/bumen.png"></div><div class="zrqdlb_column_title2">按部门</div></div>
                <div class="zrqdlb_column_content">
                    <a href="#" v-for="item in databys">{{item.TEXT}}</a>
                    <div style="clear:both;"></div>
                </div>
            </div>
        <!--zrqdlb_column结束-->
        <!--zrqdlb_column_list开始-->
        <div class="zrqdlb_column_list right">
        <div class="zrqdlb_column_title"><div class="zrqdlb_column_title1"><img src="/static/img/column_list.png"></div><div class="zrqdlb_column_title2">市公安局</div></div>
        <ul class="zrqdlb_column_list_ul">
        <li v-for="item in datalists"><p>{{item.TEXT}}</p><a href="#"><img src="/static/img/column_list_li.png"></a></li>
        <div style="clear:both;"></div>
        </ul>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="nowpage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <div style="clear: both;"></div>
        </div>
        <!--zrqdlb_column_list结束-->
        </div>
	</div>
    <vfooter></vfooter>
</div>
</template>

<script>
import vheader from '@/InternetPlus/common/header/header.vue';
import navbar from '@/InternetPlus/common/navbar/navbar.vue';
import vfooter from '@/InternetPlus/common/footer/footer.vue';
import breadcrumb from '@/components/breadcrumb/breadcrumb.vue';


import getZrqdlbl from '@/services/InternetPlus/zwfw/ygzw/zrqd/zrqdlbl';
import getZrqdlbr from '@/services/InternetPlus/zwfw/ygzw/zrqd/zrqdlbr';

export default {
    data() {
        return {
            page: 'zrqdlb',
            backbutton: true,
            nowpage: 1,
            pagesize: 10,
            total: 100,
            databys:[],
            datalists:[]
        }
    },
    components: {
        vheader,vfooter,navbar,breadcrumb
    },
    created() {
        this.getData();
    },
    methods: {
        handleSizeChange(){

        },
        handleCurrentChange(val){
            this.nowpage = val;
        },
        getData() {
            getZrqdlbl().then(data => {
              this.databys = data.result
            });
            getZrqdlbr().then(data => {
              this.datalists = data.result
            })
      }
    }
}
</script>

<style scoped>
.zrqdlb_center{ margin:0 auto;}
.zrqdlb_top{ margin-top:20px;}
.left{ float:left;}
.right{ float:right;}
.jiacu{ font-weight:bold;}

.zrqdlb{
    width: 1250px;
    margin: 0 auto;
}
.zrqdlb__container{
	position:relative;
	width:100%;
    height: auto;
	background:#FFFFFF;
	margin:0 auto 20px auto;
}
.zrqdlb_location{
	width:100%;
	height:45px;
	line-height:45px;
    display: inline-block;
}
.zrqdlb_main{ width:100%;}
.zrqdlb_web_home-add{ width:1250px; height:40px; line-height:40px;}
.web_home-add_left{ float:left; padding-left:25px; height:40px; background-image:url(./img/add.png); background-repeat:no-repeat; background-position:left center; color:#333333; font-size:16px;}
.web_home-add_left a{ color:#333333;}
.web_home-add_right{ float:right; width:65px; color:#3b98e6;height:30px; line-height:30px; text-align:center; background-image:url(./img/end.png); background-repeat: no-repeat; background-position:5px center; margin-top:5px;}
.web_home-add_right a{color:#3b98e6; font-weight:bold; width:70px; padding-left:10px; height:30px; float:left;}

.zrqdlb_column{ width:252px;}
.zrqdlb_column_title{ width:100%; height:45px; border-bottom:4px #3c97e6 solid; font-size:20px;}
.zrqdlb_column_title1{ width:55px; height:35px; float:left; text-align:center; padding-top:10px;}
.zrqdlb_column_title2{ width:160px; height:40px; line-height:35px; float:left; padding-top:5px; font-weight:bold;}
.zrqdlb_column_content{ width:222px; padding:15px; background:#f1f6fa;}
.zrqdlb_column_content a{ width:207px; height:30px; line-height:30px; padding-left:15px; float:left; background-image:url(./img/column_content.png); background-repeat:no-repeat; background-position:left center; color:#2d2c2c; font-size:14px; overflow:hidden;}
.zrqdlb_column_content a:hover{	color: #ff9805;	text-decoration: underline;}

.zrqdlb_column_list{ width:958px;}
.zrqdlb_column_list_ul{ width:958px;}
.zrqdlb_column_list_ul li{ width:905px; border-bottom:1px #dedede solid;border-right:1px #dedede solid;border-top:1px #dedede solid;border-left:12px #3d96e6 solid; padding:10px 20px; height:90px; line-height:30px; font-size:16px; margin-top:20px;}
.zrqdlb_column_list_ul li p{ width:750px; float:left;}
.zrqdlb_column_list_ul li a{ width:89px; float:right; margin-top:15px;}

/*分页*/
.pagination {text-align: center; line-height: 25px; MARGIN: 20px 0px 10px; float:right;}

</style>