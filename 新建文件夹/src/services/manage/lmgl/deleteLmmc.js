/**
 * 删除栏目
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { deleteData } from '@/api/common.js';
var deleteLmmc;

if (staticApi.staticApi) {
    deleteLmmc = (params) => {
        let param = {};
        let tableId = '47c2c4885d778155015d81c97b310016';
        param.tableId = tableId;
        param.uuids = params.uuids;
        return deleteData(param);
    };
} else {
    deleteLmmc = (params) => {
        return axios.post('/deleteLmmc.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default deleteLmmc;
