/*
 * @文档描述: 新闻中心侧边栏栏目文章
 * @参数: lmmc, lmid, path
 * @作者: 孔祥超 
 * @创建时间: 2017-09-22 09:15:11 
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-09-22 10:42:50
 */
<template>
    <div class="siderbar-news">
        <div class="siderbar-news__title">
            <span class="siderbar-news__title__text">{{lmmc}}</span>
            <a class="siderbar-news__title__more" :href="path ? path : 'javascript:void(0)'" title="更多"></a>
        </div>
        <div class="siderbar-news__content">
            <img class="siderbar-news__content__preimg" v-if="dataList.imgUrl" :src="'data:image/png;base64,' + dataList.imgUrl" alt=""></img>
            <div class="siderbar-news__content__title">{{dataList.WZBT}}</div>
            <div class="siderbar-news__content__nrzy">{{dataList.NRZY}}</div>
        </div>
    </div>
</template>

<script>
import { webGetWZGrid, webDownload } from '@/api/common.js';
import { tableIds } from '@/api/tableId.js';
export default {
    props: {
        lmmc: {
            type: String,
            default: ''
        },
        lmid: {
            type: String,
            default: ''
        },
        path: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            dataList: {
                WZBT: '',
                NRZY: '',
                imgUrl: ''
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let params = {
                LMID: this.lmid
            };
            webGetWZGrid(params).then(res => {
                if (res.status === 'success') {
                    this.dataList = res.data.DataList[0];
                    if (this.dataList.BTTID) {
                        let params = {
                            uuid: this.dataList.BTTID,
                            tableId: tableIds.文章管理,
                            isBase64: true
                        }
                        webDownload(params).then(res => {
                            if (res.status === 'success') {
                                this.dataList.imgUrl = res.data.img;
                            }
                        });
                    }
                }
            });
        }
    }
}
</script>

<style scoped>
/*
css belong to siderbarnews.vue
*/
.siderbar-news {
    margin-top: 15px;
}
.siderbar-news__title {
    padding: 0 0 8px 30px;
    border-bottom: 1px solid #ccc;
    background: url('./img/icon_state.png') no-repeat 10px 8px;
}
.siderbar-news__title__text {
    display: inline-block;
    font-size: 14px;
    color: #444;
}
.siderbar-news__title__more {
    display: inline-block;
    float: right;
    height: 10px;
    width: 20px;
    margin-top: 8px;
    background: url('./img/rightClick.png') no-repeat;
}
.siderbar-news__content {
    width: 100%;
    color: #888;
    font-size: 12px;
    margin-top: 10px;
    /* line-height: 1.25em; */
}
.siderbar-news__content__preimg {
    width: 80px;
    height: 60px;
    float: left;
    margin-right: 8px;
}
.siderbar-news__content__title {
    color: #333;
}
</style>
