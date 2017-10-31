/**
 * 删除文章
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { deleteData } from '@/api/common.js';
var delWz;

if (staticApi.staticApi) {
    delWz = (params) => {
        let param = {};
        let tableId = '47c2c4885d778155015d81d10ab00021';
        param.tableId = tableId;
        param.uuids = params.uuids;
        console.log(param);
        return deleteData(param);
    };
} else {
    delWz = (params) => {
        return axios.post('/delWz.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default delWz;
