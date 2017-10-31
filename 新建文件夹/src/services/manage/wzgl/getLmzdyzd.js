/**
 * 获取栏目自定义字段
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getLmzdyzdList } from '@/api/common.js';
var getLmzdyzd;

if (staticApi.staticApi) {
    getLmzdyzd = (params) => {
        return getLmzdyzdList(params);
    };
} else {
    getLmzdyzd = (params) => {
        return axios.post('/getLmzdyzdList.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default getLmzdyzd;
