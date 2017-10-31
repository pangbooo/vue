/**
 * 智慧辽源-搜索-获取检索数据
 * author:kxc
 * 2017-09-12
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import {getListByKey} from '@/api/common.js';
var getDataList;

if (staticApi.staticApi) {
    getDataList = (params) => {
        return getListByKey(params);
    };
} else {
    getDataList = (params) => {
        return axios.post('getDataList.view').then(res => res.getDataList);
    };
}
export default getDataList;
