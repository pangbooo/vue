/*
 * @文档描述: 新闻中心侧边栏
 * @参数: 无
 * @作者: 孔祥超 
 * @创建时间: 2017-09-21 19:11:00
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-09-22 10:37:51
 */
<template>
    <div class="xwzxsiderbar">
        <ul>
            <li v-for="btn in btnData" :key="btn.id">
                <a :href=" btn.path ? btn.path : 'javascript:void(0)'" class="xwzxsiderbar__btn">
                    <span :class="['xwzxsiderbar__btn__bg', btn.id + '__bg']"></span>
                    <span :class="['xwzxsiderbar__btn__text', btn.id + '__icon']">{{btn.text}}</span>
                </a>
            </li>
        </ul>
        <div v-for="news in newslist" :key="news.id">
            <idt-siderbarnews :lmmc="news.lmmc" :lmid="news.lmid" :path="news.path"></idt-siderbarnews>
        </div>
    </div>
</template>

<script>
import siderbarnews from './siderbarnews';
import { LMIDS } from '@/api/lmManage.js'
export default {
    data() {
        return {
            btnData: [
                { id: 'help', text: '使用帮助', path: '' },
                { id: 'work', text: '工作动态', path: '' }
            ],
            newslist: [
                { lmid: LMIDS.政策解读, lmmc: '政策解读', path: '' },
                { lmid: LMIDS.工作动态, lmmc: '工作动态', path: '' }
            ]
        }
    },
    components: {
        'idt-siderbarnews': siderbarnews
    }
}
</script>

<style scoped>
/* 
    css belong to xwzxsiderbar.vue
*/
.xwzxsiderbar {
    width: 230px;
    margin-left: 20px;
    height: auto;
}
.xwzxsiderbar li {
    margin-bottom: 15px;
}

.xwzxsiderbar__btn {
    width: 230px;
    height: 55px;
    display: block;
    position: relative;
    line-height: 55px;
    color: #fff;
}
.xwzxsiderbar__btn__bg {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    transform: skew(10deg);
    z-index: 0;
}
.xwzxsiderbar__btn__text {
    display: block;
    font-size: 18px;
    height: 100%;
    position: relative;
    padding-left: 95px;
}
.help__bg {
    background-color: #ff6738;
}
.help__icon {
    background: url('./img/help.png') no-repeat 50px 15px;
}
.work__bg {
    background-color: #36b72c;
}
.work__icon {
    background: url('./img/zcfg.png') no-repeat 50px 15px;
}
</style>
