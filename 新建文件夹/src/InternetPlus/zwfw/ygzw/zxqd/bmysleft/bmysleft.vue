/* 
    描述：部门预算左侧
    作者：马丽欣
    创建时间：2017年9月26日
    最后修改人：马丽欣
    最后修改时间：2017年9月26日
*/
<template>
<div>
    <div class="bmys_left">
        <div class="bmys_left--top">专项类型</div>
        <div class="bmys_left--center">
          <ul>
            <li v-for="zx in zxlxs" :key="zx.UUID" :class="{ 'bmys_left--center__li': zx.isselect }">
                <a :href="zx.LINK" :class="{ 'bmys_left--select': zx.isselect }">{{ zx.TEXT }}</a>
            </li>
          </ul>
        </div>
        <div class="bmys_left--bottom">
          <p>
            部门预算专项是指省级行政事业单位为完成特定的行政工作任务或事业发展目标设定的，需要在预算年度中进行分配的专项资金。
          </p>
        </div>
      </div>
</div>
</template>

<script>
export default{
    data(){
      return {
        activeName:'',
        zxlx: '',
        zxlxs: [
            { TEXT: '部门预算专项',UUID:'1',isselect: true,LINK:'/zwfw/ygzw/zxqd/bmys/index.html' },
            { TEXT: '转移支付专项',UUID:'2',isselect: false,LINK:'/zwfw/ygzw/zxqd/zyzf/index.html' }
        ]
      }
    },
}
</script>
<style scoped>

  .bmys_left {
    width: 292px;
    height: auto;
    float: left;
  }

  .bmys_left--top {
    width: 292px;
    height: 94px;
    border-top: 6px solid #ff6e00;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    line-height: 94px;
    text-indent: 70px;
    background: #0095e4 url("img/pay.png") no-repeat 32px 34px;
  }
  .bmys_left--center .bmys_left--center__li{
    background: #f1f6f9 url("img/pay-list1.png") no-repeat 32px 20px;    
  }

  .bmys_left--bottom {
    width: 292px;
    border-top: 10px solid #ff6e00;
    margin-top: 20px;
    background: #f1f6f9;
  }

  .bmys_left--bottom p {
    padding: 30px 25px;
    text-indent: 2em;
    line-height: 200%;
    text-align: justify;
  }
.bmys_left--center > ul > li {
    width: 292px;
    list-style: none;
    line-height: 60px;
    border-bottom: 1px solid #b5e4ff;
    text-indent: 72px;
    background: #f1f6f9 url("img/paylist.png") no-repeat 34px 21px;
  }

  .bmys_left--center > ul > li > a {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: #000000;
    width: 292px;
    height: 60px;
    display: block;
  }
  .bmys_left--center .bmys_left--select{
    color: #ff6e00;
  }
</style>