/* 
    描述：负面清单列表
    作者：马丽欣
    创建时间：2017年9月26日
    最后修改人：马丽欣
    最后修改时间：2017年9月26日
*/
<template>
<div>
    <div class="fmqd__con clr">
      <!-- 投资领域begin-->
        <div class="fmqd__con__box fmqd__con__tzly fl">
          <div class="fmqd__con__box__title bold">投资领域</div>
            <div class="fmqd__con__box__nr">
              <ul>
                  <li v-for="item in Tzly" :key="item.uuid" @click="changeTzly(item)">
                    <a :class="item.checked?'fmqd__box__active':''" href="javascript:;">{{item.name}}</a>
                       
                  </li>
                </ul>
            </div>
        </div>
        <!-- 投资领域end-->
        <!-- 类别begin-->
        <div class="fmqd__con__box fmqd__con__lb fl">
            <div class="fmqd__con__box__title bold">类别</div>
            <div class="fmqd__con__box__nr">
              <ul>
                  <li v-for="item in Lb" :key="item.uuid" @click="changeLb(item)">
                    <a :class="item.checked?'fmqd__box__active':''" href="javascript:;">{{item.name}}</a>
                  </li>
                </ul>
            </div>
        </div>
        <!-- 类别end-->
        <!-- 内容begin-->
        <div class="fmqd__con__box fmqd__con__nr fl">
          <div class="fmqd__con__box__title bold">内容</div>
            <div class="fmqd__con__box__nr">
              <dl>
                  <dd>
                      <label>国家核准</label>
                      <span class="fmqd__con__nr__text">{{content.GJBZ}}</span>
                  </dd>
                  <dd>
                      <label>市级核准</label>
                      <span class="fmqd__con__nr__text">{{content.SJBZ}}</span>
                  </dd>
                  <dd>
                      <label>县级核准</label>
                      <span class="fmqd__con__nr__text">{{content.SXBZ}}</span>
                  </dd>
              </dl>
            </div>
        </div>
        <!-- 内容end-->
      </div>
</div>
</template>
<script>
import { getFmqdTzly,getFmqdlb,getFmqd } from '@/api/common';
import { tableIds } from '@/api/tableId';
export default{
  data() {
        return {
            Tzly: [],
            Lb:[],
            content:{},
            tzly:'',
            lb:''
        }
    },
    components: {
    },
    created: function(){
        this.getFmqdTzly();
    },
    methods:{
        getFmqdTzly: function(){
            getFmqdTzly().then(res => {
            console.log(res);
            this.Tzly = res.data;
            for(let i = 0; i<res.data.length;i++){
                this.Tzly[i] = {
                    name : res.data[i],
                    checked : false
                };
            }
            this.Tzly[0].checked = true;
            this.getFmqdLb();
            });
        },
        getFmqdLb: function(){
            let params = {};
            if(this.tzly == ""){
                params.tzly = this.Tzly[0].name;
            }else{
                params.tzly = this.tzly;
            }
            getFmqdlb(params).then(res => {
                console.log(res);
                this.Lb = res.data;
                for(let i = 0; i<res.data.length;i++){
                    this.Lb[i] = {
                        name : res.data[i],
                        checked : false
                    };
                }
                this.Lb[0].checked = true;
                this.getFmqd();
            });
        },
        getFmqd: function(){
            let params = {};
            if(this.tzly == ""){
                params.tzly = this.Tzly[0].name;
            }else{
                params.tzly = this.tzly;
            }
            if(this.lb == ""){
                params.lb = this.Lb[0].name;
            }else{
                params.lb = this.lb;
            }
            getFmqd(params).then(res => {
                console.log(res);
                this.content = res.data;
            })
        },
        changeTzly: function(item){
            for(let i = 0; i<this.Tzly.length;i++){
                this.Tzly[i].checked = false;
            }
            item.checked = true;
            this.tzly = item.name;
            this.getFmqdLb();
        },
        changeLb: function(item){
            for(let i = 0; i<this.Lb.length;i++){
                this.Lb[i].checked = false;
            }
            item.checked = true;
            this.lb = item.name;
            this.getFmqd();
        },
        
    }
}
</script>

<style scoped>
 .fmqd__con{ width:100%; margin:28px 0 32px;}
  .fmqd__con__box{padding:20px 12px 8px 12px; margin-right:36px; height:588px; border:1px solid #dbeafa; background:#f5f8fb;}
  .fmqd__con__box__title{ padding-left:40px;height:27px; line-height:27px; background:url(./img/icon.png) no-repeat; font-size:20px; }
  .fmqd__con__box__nr{ margin-top:13px; height:546px; background:#fff; border:1px solid #dbeafa;}
  .fmqd__con__box__nr ul{ margin:8px;}
  .fmqd__con__box__nr a{ width:auto; line-height:35px;height:35px; display:block; padding-left:5px; }
  .fmqd__con__box__nr a.fmqd__box__active{ background:url(./img/icon_arrow.png) right #3c95e5; color:#fff}
  /* 投资领域 */
  .fmqd__con__tzly{ width:228px;}
  .fmqd__con__tzly .fmqd__con__box__title{ background-position:0 -105px;}
  /* 类别 */
  .fmqd__con__lb{ width:332px;}
  .fmqd__con__lb .fmqd__con__box__title{ background-position:0 -189px;}
  /* 内容 */
  .fmqd__con__nr{ width:539px; margin-right:0;}
  .fmqd__con__nr .fmqd__con__box__title{ background-position:0 -279px;}
  .fmqd__con__nr dl{margin:8px;}
  .fmqd__con__nr dd{ line-height:26px; margin-top:25px;}
  .fmqd__con__nr label{ color:#186fbe; display:inline-block; vertical-align:top}
  .fmqd__con__nr__text{width:433px; display:inline-block;}
</style>
