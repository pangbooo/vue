/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import {getForm} from '@/api/common.js';
var getWZData;

if (staticApi.staticApi) {
      getWZData = (params) => {
            let param = {};
            let tableId = '47c2c4885d778155015d81d10ab00021';
            param.tableId = tableId;
            param.uuid = params.UUID;
            return getForm(param);
      };
} else {
    getWZData = (params) => {
        return axios.post('/getWZData.view', qs.stringify(params)).then(res => {
            let newData = res.data;
            return newData;
        });
    };
}
export default getWZData;
