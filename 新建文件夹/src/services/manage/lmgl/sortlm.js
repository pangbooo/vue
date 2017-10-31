/**
 * 保存栏目排序
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { commonSort } from '@/api/common.js';

var sortlm;

if (staticApi.staticApi) {
    // 这里要判断是复制还是剪切
    sortlm = (params) => {
        if (!params) {
            params = {};
        }
        let param = {};
        let tableId = '47c2c4885d778155015d81c97b310016';
        param.tableId = tableId;
        param.uuids = params.arr;
        // console.log(param);
        return commonSort(param);
    };
} else {
    sortlm = (params) => {
        return axios.post('/sortlm.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default sortlm;
