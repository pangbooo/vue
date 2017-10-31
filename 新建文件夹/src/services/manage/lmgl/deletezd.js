/**
 * 保存自定义字段--增加字段
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { deleteData } from '@/api/common.js';
var deletezd;

if (staticApi.staticApi) {
    deletezd = (params) => {
        let param = {};
        let tableId = '47c2c4885e07b711015e2753479b0126';
        param.tableId = tableId;
        param.uuids = params.uuids;
        return deleteData(param);
    };
} else {
    deletezd = (params) => {
        return axios.post('/deletezd.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default deletezd;
