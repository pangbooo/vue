/**
 * 智慧辽源-搜索-获取检索文章
 * author:kxc
 * 2017-09-12
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import {getListByKey} from '@/api/common.js';
var getWz;

if (staticApi.staticApi) {
    getWz = (params) => {
        return getListByKey(params);
    };
} else {
    getWz = (params) => {
        return axios.post('getWz.view').then(res => res.getWz);
    };
}
export default getWz;
