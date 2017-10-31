/* 
    描述：个人中心
    作者：李文达
    创建时间：2017年9月21日
    最后修改人：李文达
    最后修改时间：2017年9月21日
*/
<template>
<div>
  <idt-header></idt-header>
  <idt-navbar></idt-navbar>
  <div class="pcnenter__center">
    <div class="pcnenter____path">
        <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
    </div>
    <div class="pcnenter__wrap">
      <idt-personInfo></idt-personInfo>
      <div class="pcnenter__contain">
        <div class="pcnenter__myCollections">
          <idt-myCollections></idt-myCollections>
        </div>
        <idt-waitDealList></idt-waitDealList>
        <div class="pcnenter__bottom--section">
          <div class="pcnenter__service--title">推荐服务</div>
          <div class="pcnenter__service--con">
              <a href="javascript:;">我的补助</a>
              <a href="javascript:;">我的社保</a>
              <a href="javascript:;">我的公积金</a>
              <a href="javascript:;">房屋权属证明</a>
              <a href="javascript:;">我的签名</a>
          </div>
          <div class="pcnenter__msg">
            <div class="pcnenter__msg--title">我的消息</div>
            <div class="pcnenter__msg--con">
              <a href="">已读:&nbsp;&nbsp;&nbsp;1条</a>
              <a href="">未读:&nbsp;&nbsp;&nbsp;2条</a>
            </div>
            <img src="./img/94.png" class="img-a">
            <img src="./img/95.png" class="img-b">
            <img src="./img/54.png" class="img-c">
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <idt-footer></idt-footer>
  <idt-floatbar></idt-floatbar>
  </div>
</template>

<script>
    import idtheader from '@/InternetPlus/common/header/header.vue';
    import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
    import idtfooter from '@/InternetPlus/common/footer/footer.vue';
    import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
    import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
    import personInfo from '@/InternetPlus/user/personcenter/personInfo';
    import waitDealList from '@/InternetPlus/user/personcenter/waitDealList';
    import myCollections from '@/InternetPlus/user/personcenter/myCollections';

    import { queryString } from '@/lib/publicFun.js';
    import { LMIDS } from '@/api/lmManage.js';
    export default {
        components: {
            'idt-header': idtheader,
            'idt-navbar':idtnavbar,
            'idt-footer': idtfooter,
            'idt-breadcrumb': idtbreadcrumb,
            'idt-personInfo': personInfo, 
            'idt-waitDealList': waitDealList, 
            'idt-myCollections': myCollections,
            'idt-floatbar': floatbar
        },
        data() {
            return {
                page:'personcenter',
                UUID:''
            }
        },
        created() {
            queryString('UUID') ? this.UUID = queryString('UUID') : this.UUID = '2';
            this.params = [
                { id: 'xzqlqdlb', val: 'UUID=' + this.UUID },
            ];
        }
  }
</script>

<style scoped> 
/*personcenter.vue*/
.banner_1 {
    height: 70px;
    background: url(./img/banner_1.jpg) no-repeat center #0b98df;
    position: relative;
}
.pcnenter__center{
    width: 1260px;
    margin: 0 auto 30px; 
}
.pcnenter__wrap{
    width: 100%;
    overflow: hidden; 
}
.pcnenter__contain{
    width: 1012px;
    margin-left: 13px;
    float: left;
}
.pcnenter__myCollections{
    width: 100%;
    background-color: #f3f3f3;
    position: relative;
}
.pcnenter__bottom--section{
    width: 100%;
    margin-top: 30px;
    overflow: hidden;
}
.pcnenter__service--title{
    width: 28px;
    height: 132px;
    text-align: center;
    float: left;
    background: url(./img/lbx.png) repeat-y;
    font-size: 16px;
    color: #fefefe;
    line-height: 33px;
}

.pcnenter__service--con{
    width: 700px;
    float: left;
    margin-left: 20px;
    background-color: #f9f9f9;
    padding:10px 0;
}
.pcnenter__service--con a{
    width: 84px;
    height: 30px;
    margin-left: 45px;  
    padding-top: 80px;
    float: left;
    font-size: 14px;
    color: #4d5052;
    text-align: center;
    background: url(./img/bz.png) center 20px no-repeat;
}
.pcnenter__service--con a:nth-child(2){
    background: url(./img/sb.png) center 20px no-repeat;
}
.pcnenter__service--con a:nth-child(3){
    background: url(./img/gjj.png) center 20px no-repeat;
}
.pcnenter__service--con a:nth-child(4){
    background: url(./img/fc.png) center 20px no-repeat;
}
.pcnenter__service--con a:nth-child(5){
    background: url(./img/qm.png) center 20px no-repeat;
}
.pcnenter__service--con a:hover{text-decoration: underline;}
.pcnenter__msg{
    background-color: #f9f9f9;
    width: 245px;
    height: 130px;
    float: right;
    overflow: hidden;
}
.pcnenter__msg--title{
    width: 29px;
    height: 124px;
    text-align: center;
    margin-top: 4px;
    margin-left: 8px;
    float: left;
    background: url(./img/dbx2.png) repeat-y;
    font-size: 16px;
    color: #5b5c5e;
    line-height: 31px;
}

.pcnenter__msg--con{
    margin-left: 57px;
}
.pcnenter__msg--con{
    float: left;
}
.pcnenter__msg--con a{display: block;color: #666769;margin-top: 30px;}
.pcnenter__msg--con a:hover{color: #20a0ff;}
</style>
<style>
    .el-table__body-wrapper .el-table__row{cursor: pointer;}
</style>