/**
 * 智慧辽源-生活服务-行政许可列表
 * author:李文达leo
 * 2017-08-17
 */
<template>
  <div class="xzxklb">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="xzxklb_wrap">
      <v-path :page="page"></v-path>
      <div class="xzxklb_con">
        <div class="xzxk__menu fl">
          <wzqd :struct="wzqdstruct" :items="wzqditems" v-on:changeSelect="changeSelect" @returnSelect="returnSelect"></wzqd>
        </div>
        <div class="xzxk__list--wrap">
          <div class="xzxk__list--title">行政许可</div>
          <el-table
            :data="tableData"
            style="width: 100%"
            @cell-dblclick="dbClick">
            <el-table-column
              prop="DW"
              label="单位"
              width="220"
              align="center">
            </el-table-column>
            <el-table-column
              prop="SXBH"
              label="事项编号"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="SXMC"
              label="事项名称"
              align="center">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="totalRow" :page-size="pageSize" class="handle-page">
          </el-pagination>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from '@/InternetPlus/common/header/header.vue'
  import nav from '@/InternetPlus/common/navbar/navbar.vue'
  import breadcrumb from '@/components/breadcrumb/breadcrumb.vue'
  import footer from '@/InternetPlus/common/footer/footer.vue'
  import wzqd from '@/InternetPlus/zwfw/ygzw/wzqd/wzqd.vue';

  import fwzqdstruct from '@/services/InternetPlus/zwfw/ygzw/wzqdstruct.js';
  import fwzqditems from '@/services/InternetPlus/zwfw/ygzw/wzqditems.js';
  import fwzqdlist from '@/services/InternetPlus/zwfw/ygzw/wzqdlist.js';

  export default{
    components: {
      'v-header': header,
      'v-nav': nav,
      'v-path': breadcrumb,
      'v-footer': footer,wzqd
    },
    mounted() {
      $(function(){
        var leftNav =$(".container_left_nav");
        leftNav.on("mouseover","li",function(){
          // var index = $(this).index();
          $(this).addClass("selected").siblings().removeClass("selected");
        });
      });
    },
    data(){
      return {
        area: [],
        page:"xzxklb",
        totalRow:24,
        pageSize:10,
        wzqdstruct:{},
        wzqditems:[],
        tableData:[]
      }
    },
    created() {
      this.getwzqdstruct();
      this.getwzqditems();
      this.getwzqdlist();
    },
    methods: {
      handleCurrentChange(){

      },
      dbClick(row){
        // console.log(row);
        window.location.href = "/zwfw/ygzw/xzxk/xzxkdetail/index.html?UUID="+row.UUID;
      },
      getwzqdstruct(){
        let params = {};
        fwzqdstruct(params).then(res => {
          if(res.status === 'success'){
              this.wzqdstruct = res.result;                  
          }else{
              this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(res => {
            this.$message.error('网络异常，请检查网络！');
        });
      },
      getwzqdlist(){
        let params = {};
        fwzqdlist(params).then(res => {
          if(res.status === 'success'){
              this.tableData = res.data;                  
          }else{
              this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(res => {
            this.$message.error('网络异常，请检查网络！');
        });
      },
      getwzqditems(){
        let params = {};
        fwzqditems(params).then(res => {
          if(res.status === 'success'){
              this.wzqditems = res.resultList;                  
          }else{
              this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(res => {
            this.$message.error('网络异常，请检查网络！');
        });
      },
      changeSelect(val){
        for(let i=0;i<this.wzqditems.length;i++){
          if(val.UUID === this.wzqditems[i].UUID){
            this.wzqditems[i].isSelected = true;
          }else{
            this.wzqditems[i].isSelected = false;            
          }
        }
      },
      returnSelect(val){
        for(let i=0;i<this.wzqditems.length;i++){
          this.wzqditems[i].isSelected = false;            
        }
      }
    }
  }
</script>

<style scoped>
/**
 * 智慧辽源-生活服务-行政许可列表
 * author:lwd
 * 2017-08-17
 */
  .footer .link a{ color:#8b8b8b}
  /* 负面清单 */
  .xzxklb_wrap{width:1250px;margin:0 auto; font-size:16px;}
  .xzxklb_con{width: 100%;overflow: hidden; border-top: 4px solid #3d96e6;padding-top: 20px;padding-bottom: 30px;}
 /* 行政许可 */
  .xzxk{ width:100%; margin:20px 0;}
  .xzxk__menu{ width:251px;}
  .xzxk__menu__title{padding-left:40px;height:27px; line-height:27px; background:url(./img/icon.png) 0 -279px no-repeat; font-size:20px; }
  
  .xzxk__menu label{ vertical-align:middle}
  .xzxk__list--wrap{
    width: 960px;
    float: right;
  }
  .handle-page{text-align: right;padding: 20px;}
  .xzxk__list--title{
    border-bottom: 4px solid #3d96e6;
    line-height: 27px;
    font-size: 20px;  
    padding-bottom: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }

.container_left{
  width:254px;
  height:auto;
  float:left;
}
.container_left_tittle{
  width:254px;
  height:50px;
}
.container_left_tittle h1{
  width:28px;
  height:28px;
  background:url("./img/title-bg1.png") no-repeat;
  margin:13px 7px 0 0;
  float:left;
}
.container_left_nav{
  width:254px;
  height:auto;
}
.container_left_nav li{
  width:254px;
  height:84px;
  background:url("./img/left-nav-bg1.png") no-repeat;
  margin:10px 0;
}
.container_left_nav li:hover{
  cursor:pointer;
}
.container_left_nav li h1{
  width:43px;
  height:43px;
  float:left;
  margin:20px;  
}
.container_left_nav_logo1{
  background:url("./img/leftnav-logo1.png") no-repeat;
}
.container_left_nav_logo2{
  background:url("./img/leftnav-logo2.png") no-repeat;
}
.container_left_nav_logo3{
  background:url("./img/leftnav-logo3.png") no-repeat;
}
.container_left_nav_logo4{
  background:url("./img/leftnav-logo4.png") no-repeat;
}
.container_left_nav_logo5{
  background:url("./img/leftnav-logo5.png") no-repeat;
}
.container_left_nav li span{
  font-family:"Microsoft YaHei";
  font-size:20px;
  font-weight:bold;
  color:#ffffff;
  display:block;
  width:130px;
  float:left;
}
.container_left_nav_text1{
  line-height:84px;
}
.container_left_nav_text2{
  margin-top:15px;
  line-height:25px;
}
.container_left_nav .selected{
  background:url("./img/left-nav-bg2.png") no-repeat;
}
.container_left_nav .selected2{
  background:url("./img/left-nav-bg2.png") no-repeat;
}
</style>
