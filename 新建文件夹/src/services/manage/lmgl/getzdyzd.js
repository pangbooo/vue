/**
 * 获取栏目的访问控制
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getLmzdyzdList } from '@/api/common.js';

var getzdyzd;

if (staticApi.staticApi) {
    getzdyzd = (params) => {
        if (!params) {
            params = {};
        }
        let param = {};
        param.lmid = params.uuid;
        return getLmzdyzdList(param);
    };
} else {
    getzdyzd = (params) => {
        return axios.post('/getzdyzd.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default getzdyzd;
