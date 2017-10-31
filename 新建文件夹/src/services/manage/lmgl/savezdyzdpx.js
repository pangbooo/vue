/**
 * 保存栏目排序
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { commonSort } from '@/api/common.js';

var savezdyzdpx;

if (staticApi.staticApi) {
    savezdyzdpx = (params) => {
        if (!params) {
            params = {};
        }
        let param = {};
        let tableId = '47c2c4885e07b711015e2753479b0126';
        param.tableId = tableId;
        param.uuids = params.arr;
        // console.log(param);
        return commonSort(param);
    };
} else {
    savezdyzdpx = (params) => {
        return axios.post('/savezdyzdpx.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default savezdyzdpx;
