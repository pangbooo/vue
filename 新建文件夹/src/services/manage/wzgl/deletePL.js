/**
 * 删除文章
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { deleteData } from '@/api/common.js';
var delPL;

if (staticApi.staticApi) {
    delPL = (params) => {
        let param = {};
        let tableId = '47c2c4885e07b711015e08b7993d0030';
        param.tableId = tableId;
        param.uuids = params.uuids;
        console.log(param);
        return deleteData(param);
    };
} else {
    delPL = (params) => {
        return axios.post('/delWz.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default delPL;
