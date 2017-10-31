/** 
 * 文档描述: 新闻文章详情页
 * 作者: 孔祥超 
 * 创建时间: 2017-09-20 14:09:50 
 * 最后修改人: 孔祥超 
 * 最后修改时间: 2017-09-20 14:09:50 
 */
<template>
    <div class="news__container">
        <div class="news__content-con">
            <div>
                <h1 class="news__content-title">{{data.文章标题}}</h1>
            </div>
            <div class="news__content" v-html="data.文章内容">
            </div>
        </div>
        <div class="news__more hidden">
            <div class="before">上一篇:<a href=""></a></div>
            <div class="after">下一篇:<a href=""></a></div>
        </div>
    </div>
</template>

<script>
import { tableIds } from '@/api/tableId.js';
import { getForm } from '@/api/common.js';
let Base64 = require('js-base64');
if(!Base64.decode){
  Base64 = Base64.Base64;
}
export default {
    props: {
        uuid: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            data: {}
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let params = {
                tableId: tableIds.文章管理,
                uuid: this.uuid
            }
            getForm(params).then(res => {
                console.log(res);
                if (res.status === 'success') {
                    this.data = res.data;
                    this.data.文章内容 = Base64.decode(this.data.文章内容.replace(/\s/g, "+")); 
                }
            });
        }
    },
    components: {
    }, 
};
</script>

<style scoped>
/*
css belong to newsdetail.vue
*/
.news__container {
    width: 1000px;
    min-height: 340px;
    margin: auto;
    font-family: "microsoft yahei";
    overflow-x: hidden; 
    overflow-y: auto; 
}
.news__container::after{
    display: block;
    content: '';
    clear: both;
}
.news__content-con{
    margin: 30px 0;
}

.news__content-title{
    font-size: 25px;
    text-align: center;
    line-height: 50px;
    color: #444;
}
.news__content{
    font-size: 16px;
    color: #666;
    line-height: 2;
}
.news__more {
    margin-bottom: 40px;

    overflow: hidden;
    color: #666666;
}
.news__more .before{
    float: left;
    margin-left: 20px;
}
.news__more .after{
    float: right;
    margin-right:20px;
}
.hidden{
    display: none;
}
</style>
