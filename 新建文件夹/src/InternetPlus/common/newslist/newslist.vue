/** 
 * 文档描述: 互联网+政务 新闻列表
 * 作者: 孔祥超 
 * 创建时间: 2017-09-20 11:23:08 
 * 最后修改人: 孔祥超 
 * 最后修改时间: 2017-09-20 11:23:08 
 * 点击链接待完善
 */

<template>
    <div>
        <div class="newslist" v-if=" total > 0">
            <ul class="newslist__list" v-for="(item, index) in dataList" :key="item.UUID">
                <li class="newslist__item clr">
                    <div class="newslist__item__date">
                        <div class="newslist__item__date--day">
                            <span>{{item.FBSJ ? new Date(item.FBSJ * 1).pattern('dd') : ''}}</span>
                        </div>
                        <div class="newslist__item__date--mon">
                            <span>{{item.FBSJ ? new Date(item.FBSJ * 1).pattern('MM') : ''}}</span>
                        </div>
                    </div>
                    <div class="newslist__item__content">
                        <div class="newslist__item__content__title"><a :href="childpath">{{item.WZBT}}</a></div>
                        <div class="newslist__item__content__text">
                            <span>{{item.NRZY}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <idt-pagination :currentPage="currentPage" :totalPage="total" :pageSize="pageSize" @size-change="sizeChange" @current-change="currentChange" class="pagePos"></idt-pagination>
        </div>
        <div class="newslist__null" v-else>
            <img src="/static/img/data-null.png" alt="">
        </div>
    </div>
</template>

<script>
import pagination from '@/components/pagination';
import { webGetWZGrid } from '@/api/common.js';
export default {
    props: {
        lmid: {
            type: String,
            default: '1'
        },
        childpath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            dataList: [],
            currentPage: 1,
            total: 0,
            pageSize: 10
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let params = {
                LMID: this.lmid,
                nowPage: this.currentPage,
                pageSize: this.pageSize
            };
            webGetWZGrid(params).then(res => {
                // console.log(res)
                if (res.status === 'success') {
                    this.dataList = res.data.DataList;
                    this.total = res.data.totalRows;
                }
            });
        },
        sizeChange(val) {
            this.pageSize = val;
            this.getData();
        },
        currentChange(val) {
            this.currentPage = val;
            this.getData();
        }
    },
    components: {
        'idt-pagination': pagination
    }
}
</script>

<style scoped>
/**
 * css belong to newslist.vue
 */
/*newslist start*/
.newslist {
    width: 100%;
    max-width: 1000px;
    margin:auto;
    font-family: "microsoft yahei";
    overflow: hidden;
}
.newslist__list {
    list-style: none;
    padding-right: 5px;
}

.newslist__list .newslist__item {
    margin-bottom: 15px;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    height: 100px;
}

.newslist__item>div {
    margin: 20px 0 0 0;
    overflow: hidden;
    line-height:normal;
}
.newslist__item .newslist__item__date {
    width: 10%;
    min-width: 70px;
    float: left;
    border-right: 3px solid #999;

}
.newslist__item .newslist__item__content {
    float: left;
    width: 86%;
    padding: 0 10px;
}
.newslist__item__date--day {
    font-size: 32px;
    text-align: center;
    color: #666666;
}
.newslist__item__date--mon {
    font-size: 14px;
    text-align: center;
    color: #999999;
}

.newslist__item__content__title{
    font-size: 14px;
    margin-left: 12px;
    line-height: 25px;
    color: #444444;
    cursor: pointer;
}
.newslist__item__content__title a{
    width: 100%;
    transition: .5s;
}
.newslist__item__content__title a:hover {
    color: #3a8ad1;
}
.newslist__item__content__text{
    font-size: 12px;
    margin-left: 12px;
    color: #666666;
}

.pagePos{
    text-align: center;
    padding: 10px 0 20px 0;
}
/*newslist end*/
.newslist__null {
    height: 100px;
    line-height: 75px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
}
</style>
