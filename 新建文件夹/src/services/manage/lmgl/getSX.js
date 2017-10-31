/**
 * 获取栏目树
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { dbgetList } from '@/api/common.js';
var getSX;

if (staticApi.staticApi) {
      getSX = (params) => {
        let param = {};
        param['script'] = 'getLM';
        param['replaceMap'] = { developer: 'hlwj' };
        param['args'] = [params.uuid];
        return dbgetList(param);
      };
} else {
    getSX = (params) => {
        return axios.post('/getSX.view', qs.stringify(params)).then(res => {
            let newData = {
                result: [],
                status: 'success'
            };
            for (let i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].UUID === params.uuid) {
                    newData.result.push(res.data.result[i]);
                } else {}
            }
            return newData;
        });
    };
}
export default getSX;
