<template>
	<div class="zwfw_detail">
        <div class="zwfw_detail--title">
            <h1>{{articledata.文章标题}}</h1>
        </div>
        <div class="zwfw_detail--info">
            <span>发布日期：{{articledata.发布时间 | formatDate}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{articledata.来源?'来源：'+articledata.来源:''}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作者：{{articledata.作者}}</span>
            <div class="bdsharebuttonbox">
                <a href="#" class="bds_more" data-cmd="more"></a>
                <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
            </div>
        </div>
        <div class="zwfw_detail--con" v-html="articlcon">
            
        </div>
	</div>
</template>

<script>
import {getTime} from '@/lib/publicFun';
let Base64 = require('js-base64');
if(!Base64.decode){
  Base64 = Base64.Base64;
}
export default{
	name:'zwfwlb_list',
	props: {
        articledata: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    data() {
        return {
           articlcon:'' 
		}
    },
    watch:{
        articledata: function (){
            let html = this.articledata.文章内容.replace(/\s/g, "+"); 
            this.articlcon = Base64.decode(html);
        }
    },
    mounted() {
        window._bd_share_config = {
            "common":{
                "bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"
            },
            "share":{}
        };
        (document.getElementsByTagName('head')[0]||body).appendChild(document.createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5);
    },
    filters: {
        formatDate:function(time){
            return  getTime(time);
        }
    }
}
</script>

<style scoped>
/*  李文达 政务新闻详细css */
.zwfw_detail{
	width: 100%;
    margin-bottom: 20px;
    padding: 20px 0;
}
.zwfw_detail--title {
    width: 100%;
    line-height: 1.4em;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    padding: 10px 0;
    color: #000000;
}
.zwfw_detail--info {
    width: 96%;
    height: 46px;
    line-height: 46px;
    margin: 0 auto;
    border-bottom: 1px dashed #ff883e;
    position: relative;
}
.bdsharebuttonbox{
    position: absolute;
    right: 0;
    top: 12px;
}
.zwfw_detail--info span {
    font-size: 16px;
    color: #333333;
}
.zwfw_detail--info img {
    float: right;
}
.zwfw_detail--con {
    width: 96%;
    height: auto;
    margin: 20px auto 0 auto;
}
</style>