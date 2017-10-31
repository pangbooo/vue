/**
 * 推荐文章
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { updateArticleTJ } from '@/api/common.js';
var canceltuijian;

if (staticApi.staticApi) {
    canceltuijian = (params) => {
         let param = {};
        // let tableId = '47c2c4885d778155015d81d10ab00021';
        // param.tableId = tableId;
        // param.uuids = params.uuids;
        param['script'] = 'cancaltuijian';
        param['replaceMap'] = { 'developer': 'hlwj' };
        param.args = params.uuids;
        return updateArticleTJ(param);
    };
} else {
    canceltuijian = (params) => {
        return axios.post('/delWz.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default canceltuijian;
