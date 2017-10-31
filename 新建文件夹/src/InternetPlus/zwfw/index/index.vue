/**
 * 智慧辽源-政务服务-首页
 * author:kxc
 * 2017-08-09
 */
<template>
  <div class="sy-zwfw">
    <idt-header></idt-header>
    <div class="sy-zwfw__navbar">
      <idt-navbar></idt-navbar>
    </div>
    <div class="sy-zwfw__container">
      <el-row>
        <el-col :span="13">
          <div class="sy-zwfw__smxs clr">
            <idt-smxs></idt-smxs>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="sy-zwfw__ygzw clr">
            <idt-ygzw></idt-ygzw>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-for="(item, index) in slidebarnav"  :key="item.uuid" :span="index % 2 === 0 ? 13 : 11" :class="'sy-zwfw--col' + index % 2 === 0 ? 1 : 2" >
          <div class="sy-zwfw__news clr">
            <idt-news :lmmc="item.lmmc" :puuid="urluuid" :uuid="item.uuid" :titleclass="item.lmicon"></idt-news>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="sy-footer">
      <idt-footer></idt-footer>
    </div>
    <idt-floatbar></idt-floatbar>
  </div>
</template>

<script>
  import header from '@/InternetPlus/common/header/header.vue';
  import navbar from '@/InternetPlus/common/navbar/navbar.vue';
  import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
  import footer from '@/InternetPlus/common/footer/footer.vue';
  import smxs from './smxs.vue';
  import ygzw from './ygzw.vue';
  import news from './news.vue';

  import getslidebar from '@/services/InternetPlus/zwfw/index/slidebar';
  import { LMIDS } from '@/api/lmManage.js';
  import { queryString } from '@/lib/publicFun.js';

  export default {
    data() {
      return {
        urluuid: LMIDS.阳光政务,
        slidebarnav:[]
      }
    },
    created() {
      this.getuuid();
      // this.getSlideBarData()
    },
    mounted() {
      
    },
    methods: {
      getuuid(){
        // this.urluuid = '1';
        this.getSlideBarData();
      },
      getSlideBarData() {
        let a = [ {lmid:LMIDS.政策动态,lmicon:'1'},{lmid:LMIDS.法律法规,lmicon:'2'},{lmid:LMIDS.规章制度,lmicon:'3'},{lmid:LMIDS.通知通告,lmicon:'4'} ]
        // console.log(a);
        let params = { puuid: this.urluuid, level: 1 };
        getslidebar(params).then(data => {
          if(data.code === "idt-oApp-5000"){
            for(let j=0;j<a.length;j++){
              for(let i=0;i<data.data.length;i++){
                if(data.data[i].uuid === a[j].lmid){
                  data.data[i].lmicon = a[j].lmicon;
                  this.slidebarnav.push(data.data[i]);
                }
              }
            }
          }else{
            this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(data =>{
            this.$message.error('网络连接异常，请检查网络！')
        });
      }
    },
    components: {
      'idt-header': header,
      'idt-navbar': navbar,
      'idt-floatbar': floatbar,
      'idt-footer': footer,
      'idt-smxs': smxs,
      'idt-ygzw': ygzw,
      'idt-news': news
    }
  }
</script>

<style scoped>
/**
 * 政务服务-首页
 * css belong to index.vue
 * author:kxc
 * 2017-08-09
 */
  .sy-zwfw img {
    vertical-align: bottom;
  } 
  .sy-zwfw__navbar {
    width: 100%;
    background: #4c4b4a;
  }
  .sy-zwfw__container {
    position:relative;
    width:1250px;
    /* min-height:1000px; */
    background:#FFFFFF;
    margin:0 auto 20px auto;
  }
  .sy-zwfw .el-col-13 {
    padding-right: 20px;
  }
  .sy-zwfw .el-col-11 {
    padding-left: 20px;
  }
  .sy-zwfw__news {
    width: 100%;
  }
</style>